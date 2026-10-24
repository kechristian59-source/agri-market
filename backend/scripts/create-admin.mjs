import pg from 'pg';
import bcrypt from 'bcryptjs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const { Pool } = pg;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
const rl = readline.createInterface({ input, output });
const phone = (await rl.question('Admin phone: ')).trim();
const email = (await rl.question('Admin email (optional): ')).trim();
const fullName = (await rl.question('Admin full name: ')).trim();
const password = await rl.question('Admin password (hidden input is not available in this terminal): ');
rl.close();
if (!phone || !fullName || password.length < 12) throw new Error('Phone, full name and a password of at least 12 characters are required');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
try {
  const hash = await bcrypt.hash(password, 12);
  await pool.query(`insert into users(role,full_name,phone,email,password_hash,verified,verification_status)
    values('admin',$1,$2,$3,$4,true,'Verified')
    on conflict (phone) do update set role='admin', full_name=excluded.full_name, email=excluded.email, password_hash=excluded.password_hash, verified=true, verification_status='Verified', updated_at=now()`,
    [fullName, phone, email || null, hash]);
  console.log('Admin account created/updated successfully.');
} finally { await pool.end(); }
