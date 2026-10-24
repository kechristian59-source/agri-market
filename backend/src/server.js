import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import pg from 'pg';
import { z } from 'zod';
import { registerOrderRoutes } from './orders-routes.js';

const {Pool}=pg;
const app=express();
const allowedOrigins=(process.env.CORS_ORIGIN||'').split(',').map(s=>s.trim()).filter(Boolean);
app.use(cors({origin:(origin,callback)=>{if(!origin||process.env.NODE_ENV!=='production'&&!allowedOrigins.length||allowedOrigins.includes(origin))return callback(null,true);return callback(new Error('CORS_ORIGIN_NOT_ALLOWED'));}}));
app.use(express.json({ limit: '1mb' }));
const PORT=Number(process.env.PORT||4000);
const JWT_SECRET=process.env.JWT_SECRET;
const pool=process.env.DATABASE_URL?new Pool({connectionString:process.env.DATABASE_URL}):null;
if(process.env.NODE_ENV==='production'&&(!process.env.DATABASE_URL||!JWT_SECRET||JWT_SECRET.length<32))throw new Error('Production requires DATABASE_URL and JWT_SECRET of at least 32 characters');
function normalizePhone(value){const raw=String(value||'').trim().replace(/[\s()-]/g,'');if(/^0[0-9]{9}$/.test(raw))return `+250${raw.slice(1)}`;if(/^250[0-9]{9}$/.test(raw))return `+${raw}`;if(/^\+?[1-9][0-9]{7,14}$/.test(raw))return raw.startsWith('+')?raw:`+${raw}`;return raw}
const signupSchema=z.object({fullName:z.string().trim().min(2).max(160),phone:z.string().min(7).transform(normalizePhone).refine(v=>/^\+[1-9][0-9]{7,14}$/.test(v),'INVALID_PHONE'),email:z.string().email().optional().or(z.literal('')).transform(v=>v?v.toLowerCase():v),password:z.string().min(8).max(200),role:z.enum(['producer','buyer','processor'])});
function hashOtp(code){return crypto.createHash('sha256').update(code).digest('hex')}
function otpMatches(code, expected){const actual=Buffer.from(hashOtp(code));const saved=Buffer.from(String(expected||''));return actual.length===saved.length&&crypto.timingSafeEqual(actual,saved)}
async function deliverOtp(phone, code) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const serviceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (sid && token && (from || serviceSid)) {
    const body = new URLSearchParams({ To: phone, Body: `Agri Market verification code: ${code}. It expires in 5 minutes.` });
    if (serviceSid) body.set('MessagingServiceSid', serviceSid); else body.set('From', from);
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body
    });
    if (!response.ok) throw new Error(`SMS_PROVIDER_ERROR_${response.status}`);
    return { channel: 'sms' };
  }
  if (process.env.NODE_ENV === 'production') throw new Error('SMS_PROVIDER_NOT_CONFIGURED');
  console.info(`[DEV ONLY] Agri Market OTP for ${phone}: ${code}`);
  return { channel: 'development', developmentCode: code };
}
function tokenFor(u){if(!JWT_SECRET)throw new Error('JWT_SECRET_NOT_CONFIGURED');return jwt.sign({sub:u.id,role:u.role},JWT_SECRET,{expiresIn:'7d'})}
async function auth(req,res,next){try{const h=req.headers.authorization||'';const t=h.startsWith('Bearer ')?h.slice(7):'';if(!t||!JWT_SECRET)return res.status(401).json({error:'UNAUTHORIZED'});req.auth=jwt.verify(t,JWT_SECRET);next()}catch{return res.status(401).json({error:'INVALID_SESSION'})}}
function requireDb(req,res,next){if(!pool)return res.status(503).json({error:'DATABASE_NOT_CONFIGURED'});next()}
function requireAdmin(req,res,next){if(req.auth?.role!=='admin')return res.status(403).json({error:'ADMIN_REQUIRED'});next()}
app.get('/health',async(req,res)=>{if(!pool)return res.json({ok:true,database:'not_configured',version:'12.3.0'});try{await pool.query('select 1');res.json({ok:true,database:'connected',version:'12.3.0'})}catch{res.status(503).json({ok:false,database:'unavailable'})}});
app.post('/api/auth/signup',requireDb,async(req,res)=>{const p=signupSchema.safeParse(req.body);if(!p.success)return res.status(400).json({error:'INVALID_INPUT'});const d=p.data;try{const exists=await pool.query('select id from users where phone=$1 or ($2<>\'\' and email=$2)',[d.phone,d.email||'']);if(exists.rowCount)return res.status(409).json({error:'ACCOUNT_ALREADY_EXISTS'});const hash=await bcrypt.hash(d.password,12);const r=await pool.query(`insert into users(role,full_name,phone,email,password_hash) values($1,$2,$3,$4,$5) returning id,role,full_name,phone,email,verified`,[d.role,d.fullName,d.phone,d.email||null,hash]);res.status(201).json({user:r.rows[0],message:'ACCOUNT_CREATED_REQUEST_OTP'})}catch(e){res.status(500).json({error:'DATABASE_ERROR'})}});
app.post('/api/auth/request-otp',requireDb,async(req,res)=>{
  const phone=normalizePhone(req.body?.phone); const purpose=String(req.body?.purpose||'signup');
  if(phone.length<7||!['signup','login','reset'].includes(purpose))return res.status(400).json({error:'INVALID_INPUT'});
  try {
    const u=await pool.query('select id,verified from users where phone=$1',[phone]);
    if(!u.rowCount)return res.json({ok:true,message:'IF_ACCOUNT_EXISTS_OTP_SENT'});
    if(purpose==='signup' && u.rows[0].verified)return res.status(409).json({error:'ACCOUNT_ALREADY_VERIFIED'});
    const recent=await pool.query("select count(*)::int as n from otp_codes where phone=$1 and created_at > now()-interval '15 minutes'",[phone]);
    if(recent.rows[0].n>=3)return res.status(429).json({error:'OTP_RATE_LIMIT'});
    const code=crypto.randomInt(100000,1000000).toString();
    const delivery=await deliverOtp(phone,code);
    await pool.query('update otp_codes set consumed_at=now() where phone=$1 and purpose=$2 and consumed_at is null',[phone,purpose]);
    await pool.query(`insert into otp_codes(user_id,phone,code_hash,purpose,expires_at) values($1,$2,$3,$4,now()+interval '5 minutes')`,[u.rows[0].id,phone,hashOtp(code),purpose]);
    res.json({ok:true,message:delivery.channel==='sms'?'OTP_SENT':'DEVELOPMENT_OTP_CREATED',...(delivery.developmentCode?{developmentCode:delivery.developmentCode}: {})});
  } catch(e) { if(String(e.message).includes('SMS_PROVIDER_NOT_CONFIGURED'))return res.status(503).json({error:'SMS_PROVIDER_NOT_CONFIGURED'}); return res.status(502).json({error:'OTP_DELIVERY_FAILED'}); }
});
app.post('/api/auth/verify-otp',requireDb,async(req,res)=>{const phone=normalizePhone(req.body?.phone),code=String(req.body?.code||''),purpose=String(req.body?.purpose||'signup');if(phone.length<7||!/^\d{6}$/.test(code)||!['signup','login','reset'].includes(purpose))return res.status(400).json({error:'INVALID_INPUT'});const q=await pool.query(`select id,user_id,code_hash,expires_at,attempts from otp_codes where phone=$1 and purpose=$2 and consumed_at is null order by created_at desc limit 1`,[phone,purpose]);if(!q.rowCount)return res.status(400).json({error:'INVALID_OR_EXPIRED_OTP'});const o=q.rows[0];if(new Date(o.expires_at)<=new Date()||o.attempts>=5)return res.status(400).json({error:'INVALID_OR_EXPIRED_OTP'});await pool.query('update otp_codes set attempts=attempts+1 where id=$1',[o.id]);if(!otpMatches(code,o.code_hash))return res.status(400).json({error:'INVALID_OR_EXPIRED_OTP'});await pool.query('update otp_codes set consumed_at=now() where id=$1',[o.id]);if(purpose==='signup'||purpose==='login')await pool.query("update users set verified=true,verification_status='Verified',updated_at=now() where id=$1",[o.user_id]);res.json({ok:true,message:'OTP_VERIFIED'})});
app.post('/api/auth/login',requireDb,async(req,res)=>{const identifier=String(req.body?.phone||'').trim(),phone=identifier.includes('@')?identifier.toLowerCase():normalizePhone(identifier),password=String(req.body?.password||'');const q=await pool.query('select id,full_name,phone,email,role,verified,password_hash from users where phone=$1 or lower(email)=lower($1) limit 1',[phone]);if(!q.rowCount||!(await bcrypt.compare(password,q.rows[0].password_hash)))return res.status(401).json({error:'INVALID_CREDENTIALS'});const u=q.rows[0];if(!u.verified)return res.status(403).json({error:'OTP_VERIFICATION_REQUIRED'});try{res.json({token:tokenFor(u),user:{id:u.id,fullName:u.full_name,phone:u.phone,email:u.email,role:u.role,verified:u.verified}})}catch{res.status(503).json({error:'AUTH_NOT_CONFIGURED'})}});
app.post('/api/auth/reset-password',requireDb,async(req,res)=>{
  const phone=normalizePhone(req.body?.phone),code=String(req.body?.code||''),password=String(req.body?.newPassword||'');
  if(phone.length<7||!/^\d{6}$/.test(code)||password.length<8)return res.status(400).json({error:'INVALID_INPUT'});
  const client=await pool.connect();
  try {
    await client.query('begin');
    const q=await client.query(`select id,user_id,code_hash,expires_at,attempts from otp_codes where phone=$1 and purpose='reset' and consumed_at is null order by created_at desc limit 1 for update`,[phone]);
    if(!q.rowCount){await client.query('rollback');return res.status(400).json({error:'INVALID_OR_EXPIRED_OTP'});}
    const o=q.rows[0];
    if(new Date(o.expires_at)<=new Date()||o.attempts>=5||!otpMatches(code,o.code_hash)){await client.query('update otp_codes set attempts=attempts+1 where id=$1',[o.id]);await client.query('commit');return res.status(400).json({error:'INVALID_OR_EXPIRED_OTP'});}
    const hash=await bcrypt.hash(password,12);
    await client.query('update users set password_hash=$1,updated_at=now() where id=$2',[hash,o.user_id]);
    await client.query('update otp_codes set consumed_at=now() where id=$1',[o.id]);
    await client.query('commit');res.json({ok:true,message:'PASSWORD_RESET'});
  } catch { await client.query('rollback');res.status(500).json({error:'PASSWORD_RESET_FAILED'}); } finally {client.release();}
});
app.get('/api/auth/me',requireDb,auth,async(req,res)=>{const q=await pool.query('select id,full_name,phone,email,role,verified,verification_status from users where id=$1',[req.auth.sub]);if(!q.rowCount)return res.status(404).json({error:'USER_NOT_FOUND'});const u=q.rows[0];res.json({id:u.id,fullName:u.full_name,phone:u.phone,email:u.email,role:u.role,verified:u.verified,verificationStatus:u.verification_status})});
app.get('/api/admin/me',requireDb,auth,requireAdmin,async(req,res)=>{const q=await pool.query('select id,full_name,phone,email,role,verified,verification_status from users where id=$1',[req.auth.sub]);if(!q.rowCount)return res.status(404).json({error:'USER_NOT_FOUND'});res.json(q.rows[0])});
app.get('/api/admin/users',requireDb,auth,requireAdmin,async(req,res)=>{const q=await pool.query('select id,full_name,phone,email,role,verified,verification_status,created_at from users order by created_at desc');res.json(q.rows)});
app.get('/api/products',requireDb,async(req,res)=>{try{const q=await pool.query("select p.id,p.product_name,p.quantity,p.unit,p.price,p.province,p.district,p.sector,p.cell,p.village,p.availability,p.quality,p.harvest_date,p.description,p.status,p.created_at,u.full_name as seller,u.phone as seller_phone from products p left join users u on u.id=p.owner_user_id where p.status='Available' order by p.created_at desc");res.json(q.rows)}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
app.get('/api/admin/products',requireDb,auth,requireAdmin,async(req,res)=>{const q=await pool.query('select id,product_name,quantity,unit,price,province,district,sector,availability,quality,status,created_at from products order by created_at desc');res.json(q.rows)});
app.get('/api/buyer-requests',requireDb,auth,async(req,res)=>{const q=await pool.query('select id,product_name,quantity,unit,location,max_price,needed_date,quality,requirements,status from buyer_requests where status=\'Open\' order by created_at desc');res.json(q.rows)});
const processorSchema=z.object({name:z.string().min(2).max(180),crop:z.string().min(2).max(100),location:z.string().max(180).optional().default(''),contact:z.string().max(180).optional().default(''),processedProducts:z.array(z.string().max(100)).max(30).optional().default([]),notes:z.string().max(2000).optional().default(''),verified:z.boolean().optional().default(false)});
app.get('/api/processors',requireDb,async(req,res)=>{try{const q=await pool.query('select id,name,crop,location,contact,processed_products as "processedProducts",notes,verified,created_at from processing_companies where verified=true order by name');res.json(q.rows)}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
app.get('/api/admin/processors',requireDb,auth,requireAdmin,async(req,res)=>{const q=await pool.query('select id,name,crop,location,contact,processed_products as "processedProducts",notes,verified,created_at,updated_at from processing_companies order by created_at desc');res.json(q.rows)});
app.post('/api/admin/processors',requireDb,auth,requireAdmin,async(req,res)=>{const p=processorSchema.safeParse(req.body);if(!p.success)return res.status(400).json({error:'INVALID_INPUT'});const d=p.data;try{const q=await pool.query(`insert into processing_companies(name,crop,location,contact,processed_products,notes,verified) values($1,$2,$3,$4,$5,$6,$7) returning id,name,crop,location,contact,processed_products as "processedProducts",notes,verified,created_at`,[d.name,d.crop,d.location,d.contact,d.processedProducts,d.notes,d.verified]);res.status(201).json(q.rows[0])}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
app.put('/api/admin/processors/:id',requireDb,auth,requireAdmin,async(req,res)=>{const p=processorSchema.safeParse(req.body);if(!p.success)return res.status(400).json({error:'INVALID_INPUT'});const d=p.data;try{const q=await pool.query(`update processing_companies set name=$1,crop=$2,location=$3,contact=$4,processed_products=$5,notes=$6,verified=$7,updated_at=now() where id=$8 returning id,name,crop,location,contact,processed_products as "processedProducts",notes,verified,updated_at`,[d.name,d.crop,d.location,d.contact,d.processedProducts,d.notes,d.verified,req.params.id]);if(!q.rowCount)return res.status(404).json({error:'NOT_FOUND'});res.json(q.rows[0])}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
app.delete('/api/admin/processors/:id',requireDb,auth,requireAdmin,async(req,res)=>{try{const q=await pool.query('delete from processing_companies where id=$1 returning id',[req.params.id]);if(!q.rowCount)return res.status(404).json({error:'NOT_FOUND'});res.json({ok:true})}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
const productSchema=z.object({product_name:z.string().min(2).max(180),quantity:z.coerce.number().positive(),unit:z.string().min(1).max(40),price:z.coerce.number().nonnegative(),province:z.string().min(2),district:z.string().min(2),sector:z.string().min(2),cell:z.string().min(1),village:z.string().min(1),availability:z.string().min(1),quality:z.string().min(1),harvest_date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),description:z.string().max(2000).default('')});
app.post('/api/products',requireDb,auth,async(req,res)=>{if(req.auth.role!=='producer')return res.status(403).json({error:'PRODUCER_REQUIRED'});const p=productSchema.safeParse(req.body);if(!p.success)return res.status(400).json({error:'INVALID_INPUT'});const d=p.data;try{const q=await pool.query(`insert into products(owner_user_id,product_name,quantity,unit,price,province,district,sector,cell,village,availability,quality,harvest_date,description) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) returning *`,[req.auth.sub,d.product_name,d.quantity,d.unit,d.price,d.province,d.district,d.sector,d.cell,d.village,d.availability,d.quality,d.harvest_date,d.description]);res.status(201).json(q.rows[0])}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
app.put('/api/products/:id',requireDb,auth,async(req,res)=>{
  if(req.auth.role!=='producer' && req.auth.role!=='admin')
    return res.status(403).json({error:'PRODUCER_REQUIRED'});
  const p=productSchema.safeParse(req.body);
  if(!p.success)return res.status(400).json({error:'INVALID_INPUT'});
  const d=p.data;
  try{
    const q=await pool.query(
      `update products set product_name=$1,quantity=$2,unit=$3,price=$4,province=$5,district=$6,sector=$7,cell=$8,village=$9,availability=$10,quality=$11,harvest_date=$12,description=$13
       where id=$14 and ($15='admin' or owner_user_id=$16) returning *`,
      [d.product_name,d.quantity,d.unit,d.price,d.province,d.district,d.sector,d.cell,d.village,d.availability,d.quality,d.harvest_date,d.description,req.params.id,req.auth.role,req.auth.sub]
    );
    if(!q.rowCount)return res.status(404).json({error:'NOT_FOUND'});
    res.json(q.rows[0]);
  }catch{
    res.status(500).json({error:'DATABASE_ERROR'});
  }
});
app.delete('/api/products/:id',requireDb,auth,async(req,res)=>{try{const q=await pool.query(`delete from products where id=$1 and ($2='admin' or owner_user_id=$3) returning id`,[req.params.id,req.auth.role,req.auth.sub]);if(!q.rowCount)return res.status(404).json({error:'NOT_FOUND'});res.json({ok:true})}catch{res.status(500).json({error:'DATABASE_ERROR'})}});
registerOrderRoutes(app, pool, auth, requireDb);
app.listen(PORT,()=>console.log(`Agri Market API on ${PORT}`));
