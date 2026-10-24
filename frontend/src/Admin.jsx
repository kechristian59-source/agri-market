import { useEffect, useMemo, useState } from 'react';
import './admin.css';

const KEYS = { processors: 'agriMarketProcessingData', products: 'agriMarketProducts', notices: 'agriMarketAdminNotices' };
const seedProcessors = [
  { id: 'proc-tomato', name: 'SORWATOM Ltd', crop: 'Tomato', location: 'Kigali, Rwanda', processedProducts: ['Tomato paste', 'Tomato sauce'], contact: '', notes: 'Confirm current operating status and intake requirements before referral.' },
  { id: 'proc-cassava', name: 'Kinazi Cassava Plant Ltd', crop: 'Cassava', location: 'Ruhango, Rwanda', processedProducts: ['Cassava flour', 'Starch'], contact: '', notes: 'Confirm current operating status and intake requirements before referral.' },
  { id: 'proc-rice', name: 'Mukunguri Rice Promotion & Investment Company Ltd', crop: 'Rice', location: 'Rwanda', processedProducts: ['Milled rice', 'Rice bran'], contact: '', notes: 'Confirm current operating status and intake requirements before referral.' },
  { id: 'proc-maize', name: 'Local maize millers', crop: 'Maize', location: 'Multiple districts', processedProducts: ['Maize flour', 'Animal feed'], contact: '', notes: 'Example directory entry; replace with verified local details.' },
];
function readJson(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
const emptyProcessor = { name: '', crop: 'Tomato', location: '', processedProducts: [], contact: '', notes: '' };

function SecureAdmin() {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('agriMarketUser') || 'null'); } catch { return null; } });
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState('processors');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ name: '', crop: '', location: '', contact: '', processedProducts: '', notes: '', verified: false });
  const loadData = async () => {
    const [u, p, c] = await Promise.all([window.agriMarketApi.adminUsers(), window.agriMarketApi.adminProducts(), window.agriMarketApi.adminProcessors()]);
    setUsers(u); setProducts(p); setProcessors(c);
  };
  useEffect(() => {
    if (!user) return;
    window.agriMarketApi.adminMe().then(() => loadData()).catch((e) => { setError(`Admin session yanze: ${e.message}`); setUser(null); window.agriMarketAuth.logout(); });
  }, [user?.id]);
  const login = async (e) => {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const result = await window.agriMarketAuth.login(phone.trim(), password);
      if (result.user.role !== 'admin') { window.agriMarketAuth.logout(); throw new Error('Iyi konti ntabwo ari Admin.'); }
      setUser(result.user); setPassword('');
    } catch (e) { setError(e.message || 'Login yanze.'); }
    finally { setBusy(false); }
  };
  const logout = () => { window.agriMarketAuth.logout(); setUser(null); setUsers([]); setProducts([]); setProcessors([]); };
  const saveProcessor = async (e) => {
    e.preventDefault(); setBusy(true); setError('');
    const payload = { ...form, processedProducts: String(form.processedProducts || '').split(',').map((v) => v.trim()).filter(Boolean) };
    try {
      if (editingId) await window.agriMarketApi.updateProcessor(editingId, payload); else await window.agriMarketApi.createProcessor(payload);
      setForm({ name: '', crop: '', location: '', contact: '', processedProducts: '', notes: '', verified: false }); setEditingId(''); await loadData();
    } catch (e) { setError(e.message || 'Ntibyashobotse kubika.'); }
    finally { setBusy(false); }
  };
  const editProcessor = (p) => { setEditingId(p.id); setForm({ name: p.name || '', crop: p.crop || '', location: p.location || '', contact: p.contact || '', processedProducts: (p.processedProducts || []).join(', '), notes: p.notes || '', verified: Boolean(p.verified) }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const deleteProcessor = async (id) => { if (!confirm('Urashaka gusiba iyi company muri database?')) return; try { await window.agriMarketApi.deleteProcessor(id); await loadData(); } catch (e) { setError(e.message); } };
  const deleteProduct = async (id) => { if (!confirm('Urashaka gusiba iki gicuruzwa muri database?')) return; try { await window.agriMarketApi.deleteProduct(id); await loadData(); } catch (e) { setError(e.message); } };
  if (!user || user.role !== 'admin') return <div className="admin-shell"><main className="admin-main"><section className="admin-welcome"><div><p className="eyebrow">AGRIMARKET · SECURE ADMIN</p><h1>Admin login</h1><p>Injira ukoresheje konti ya Admin yakozwe muri backend.</p></div></section>{error && <div className="admin-status">{error}</div>}<section className="admin-panel"><form className="admin-form" onSubmit={login}><label>Telefone cyangwa email<input value={phone} onChange={e => setPhone(e.target.value)} autoComplete="username" required /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label><button disabled={busy} type="submit">{busy ? 'Birakorwa...' : 'Injira nka Admin'}</button></form><p className="muted">Admin nyayo ikora gusa iyo backend na database byashyizwe online kandi VITE_API_BASE_URL yashyizwe muri GitHub Variables.</p><a href="./index.html">← Subira muri app</a></section></main></div>;
  const filteredProcessors = processors.filter(p => `${p.name} ${p.crop} ${p.location}`.toLowerCase().includes(query.toLowerCase()));
  const filteredProducts = products.filter(p => `${p.product_name} ${p.district} ${p.province}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="admin-shell"><header className="admin-top"><a className="admin-brand" href="./index.html"><span className="admin-logo">🌱</span><span>Agri Market<small>SECURE ADMIN</small></span></a><div className="admin-top-actions"><span>{user.fullName || user.full_name || 'Admin'}</span><button onClick={logout}>Sohoka</button></div></header><main className="admin-main"><section className="admin-welcome"><div><p className="eyebrow">CONTROL CENTRE</p><h1>Admin dashboard</h1><p>Amakuru ahindurwa muri PostgreSQL kandi agaragarira abakoresha bose.</p></div></section>{error && <div className="admin-status">{error}</div>}<section className="admin-stats"><article><span>Users</span><strong>{users.length}</strong></article><article><span>Products</span><strong>{products.length}</strong></article><article><span>Processors</span><strong>{processors.length}</strong></article><article><span>Mode</span><strong>API</strong></article></section><nav className="admin-tabs">{[['processors','Abatunganya umusaruro'],['products','Ibicuruzwa'],['users','Abakoresha']].map(([id,label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => { setTab(id); setError(''); }}>{label}</button>)}</nav>{tab === 'processors' && <div className="admin-grid"><section className="admin-panel"><h2>{editingId ? 'Hindura company' : 'Ongeraho company'}</h2><form className="admin-form" onSubmit={saveProcessor}><label>Izina<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label><label>Igihingwa<input value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })} required /></label><label>Aho iherereye<input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></label><label>Telefone / email<input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} /></label><label>Ibicuruzwa bitunganywa (koma)<input value={form.processedProducts} onChange={e => setForm({ ...form, processedProducts: e.target.value })} /></label><label>Inyandiko<textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows="3" /></label><label><input type="checkbox" checked={form.verified} onChange={e => setForm({ ...form, verified: e.target.checked })} /> Amakuru yagenzuwe</label><button disabled={busy} type="submit">{editingId ? 'Bika impinduka' : 'Ongeraho'}</button>{editingId && <button type="button" onClick={() => { setEditingId(''); setForm({ name: '', crop: '', location: '', contact: '', processedProducts: '', notes: '', verified: false }); }}>Hagarika</button>}</form></section><section className="admin-panel"><div className="admin-list-heading"><h2>Directory ({processors.length})</h2><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Shakisha..." /></div>{filteredProcessors.map(p => <article className="admin-record" key={p.id}><div><strong>{p.name}</strong><p>{p.crop} · {p.location}</p><small>{(p.processedProducts || []).join(', ')}</small><small>{p.verified ? 'Yagenzuwe' : 'Ntiremezwa'}</small></div><div className="record-actions"><button onClick={() => editProcessor(p)}>Hindura</button><button className="danger" onClick={() => deleteProcessor(p.id)}>Siba</button></div></article>)}</section></div>}{tab === 'products' && <section className="admin-panel"><div className="admin-list-heading"><h2>Ibicuruzwa ({products.length})</h2><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Shakisha..." /></div>{filteredProducts.map(p => <article className="admin-record" key={p.id}><div><strong>{p.product_name}</strong><p>{p.district}, {p.province} · {p.price} RWF</p><small>{p.quantity} {p.unit} · {p.status}</small></div><button className="danger" onClick={() => deleteProduct(p.id)}>Siba</button></article>)}</section>}{tab === 'users' && <section className="admin-panel"><h2>Abakoresha ({users.length})</h2>{users.map(u => <article className="admin-record" key={u.id}><div><strong>{u.full_name}</strong><p>{u.phone} · {u.role}</p><small>{u.email || 'Nta email'} · {u.verification_status}</small></div></article>)}</section>}<footer className="admin-footer">Agri Market · Admin server-side · <a href="./index.html">Subira muri app</a></footer></main></div>;
}

function LocalAdmin() {
  const [tab, setTab] = useState('overview');
  const [processors, setProcessors] = useState(() => readJson(KEYS.processors, null) || readJson('agriMarketProcessingSeed', null) || []);
  const [products, setProducts] = useState(() => readJson(KEYS.products, []));
  const [notices, setNotices] = useState(() => readJson(KEYS.notices, []));
  const [processorForm, setProcessorForm] = useState(emptyProcessor);
  const [editingId, setEditingId] = useState('');
  const [noticeText, setNoticeText] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!localStorage.getItem(KEYS.processors)) {
      fetch(`${import.meta.env.BASE_URL}data/processingData.json`).then(r => r.ok ? r.json() : []).then(data => {
        if (!localStorage.getItem(KEYS.processors) && Array.isArray(data)) setProcessors(data.map((p, i) => ({ ...p, id: p.id || `processor-${i + 1}`, location: p.location || p.district || 'Rwanda', contact: p.contact || '', notes: p.notes || '' })));
      }).catch(() => {});
    }
  }, []);
  useEffect(() => { localStorage.setItem(KEYS.products, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(KEYS.notices, JSON.stringify(notices)); }, [notices]);

  const filteredProducts = useMemo(() => products.filter(p => `${p.name} ${p.category} ${p.location} ${p.seller}`.toLowerCase().includes(query.toLowerCase())), [products, query]);
  const filteredProcessors = useMemo(() => processors.filter(p => `${p.name} ${p.crop} ${p.location}`.toLowerCase().includes(query.toLowerCase())), [processors, query]);
  const saveProcessor = (e) => {
    e.preventDefault();
    if (!processorForm.name.trim() || !processorForm.crop.trim()) { setStatus('Shyiramo izina n’igihingwa.'); return; }
    const record = { ...processorForm, id: editingId || `processor-${Date.now()}`, name: processorForm.name.trim(), processedProducts: Array.isArray(processorForm.processedProducts) ? processorForm.processedProducts : String(processorForm.processedProducts || '').split(',').map(s => s.trim()).filter(Boolean) };
    const nextProcessors = editingId ? processors.map(p => p.id === editingId ? record : p) : [record, ...processors];
    setProcessors(nextProcessors); localStorage.setItem(KEYS.processors, JSON.stringify(nextProcessors));
    setProcessorForm(emptyProcessor); setEditingId(''); setStatus('Amakuru y’umutunganya umusaruro yabitswe kuri browser iyi.');
  };
  const editProcessor = (p) => { setEditingId(p.id); setProcessorForm({ ...emptyProcessor, ...p, processedProducts: Array.isArray(p.processedProducts) ? p.processedProducts.join(', ') : p.processedProducts || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const removeProcessor = (id) => { if (window.confirm('Urashaka gusiba iyi company?')) { const nextProcessors = processors.filter(p => p.id !== id); setProcessors(nextProcessors); localStorage.setItem(KEYS.processors, JSON.stringify(nextProcessors)); } };
  const removeProduct = (product) => { if (window.confirm('Urashaka gusiba uyu musaruro?')) { const nextProducts = products.filter(p => p !== product); setProducts(nextProducts); localStorage.setItem(KEYS.products, JSON.stringify(nextProducts)); } };
  const addNotice = (e) => { e.preventDefault(); if (!noticeText.trim()) return; setNotices(prev => [{ id: Date.now(), text: noticeText.trim(), createdAt: new Date().toISOString() }, ...prev]); setNoticeText(''); setStatus('Itangazo ryabitswe muri workspace ya admin.'); };
  const exportData = () => { const data = { exportedAt: new Date().toISOString(), processors, products, notices }; const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = `agri-market-admin-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(url); };
  const importData = async (e) => { const file = e.target.files?.[0]; if (!file) return; try { const data = JSON.parse(await file.text()); if (Array.isArray(data.processors)) { setProcessors(data.processors); localStorage.setItem(KEYS.processors, JSON.stringify(data.processors)); } if (Array.isArray(data.products)) setProducts(data.products); if (Array.isArray(data.notices)) setNotices(data.notices); setStatus('Backup yinjijwe neza.'); } catch { setStatus('Iyo file si backup ya Agri Market yemewe.'); } e.target.value = ''; };

  return <div className="admin-shell">
    <header className="admin-top"><a className="admin-brand" href="./index.html"><span className="admin-logo">🌱</span><span>Agri Market<small>ADMIN WORKSPACE · PROTOTYPE</small></span></a><div className="admin-top-actions"><a href="./index.html">← Fungura app</a><button onClick={exportData}>Download backup</button></div></header>
    <main className="admin-main">
      <section className="admin-welcome"><div><p className="eyebrow">CONTROL CENTRE</p><h1>Admin dashboard</h1><p>Genzura amakuru y’ingenzi ya Agri Market utahinduye source code.</p></div><div className="prototype-warning">⚠️ Prototype: amakuru abikwa muri browser ukoresha gusa. Ntabwo ari admin security ya production.</div></section>
      <section className="admin-stats"><article><span>Ibicuruzwa</span><strong>{products.length}</strong><small>Byabonetse muri browser</small></article><article><span>Abatunganya umusaruro</span><strong>{processors.length}</strong><small>Directory records</small></article><article><span>Amatangazo</span><strong>{notices.length}</strong><small>Admin workspace</small></article><article><span>NISR dataset</span><strong>2025</strong><small>Read-only source file</small></article></section>
      <nav className="admin-tabs">{[['overview','Incamake'],['processors','Abatunganya umusaruro'],['products','Ibicuruzwa'],['notices','Amatangazo'],['backup','Backup / Restore']].map(([id,label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => { setTab(id); setStatus(''); }}>{label}</button>)}</nav>
      {status && <div className="admin-status" role="status">{status}</div>}
      {tab === 'overview' && <section className="admin-panel"><h2>Murakaza neza mu gice cy’ubuyobozi</h2><p>Ushobora gucunga directory y’inganda, gukuraho ibicuruzwa byashyizwe muri browser, gushyiraho amatangazo no kubika backup.</p><div className="admin-quick-actions"><button onClick={() => setTab('processors')}>+ Ongeraho umutunganya umusaruro</button><button onClick={() => setTab('products')}>Genzura ibicuruzwa</button><button onClick={() => setTab('backup')}>Kubika / kugarura backup</button></div><h3>Ibyo ugomba kwitondera</h3><ul><li>Amakuru y’amasoko abikwa muri browser imwe; ntabwo ahita aboneka ku bandi bakoresha.</li><li>Ntushyire amakuru y’ibanga cyangwa credentials muri frontend.</li><li>Kugira admin nyayo kuri production, huza iyi interface na backend API irinda admin role.</li></ul></section>}
      {tab === 'processors' && <div className="admin-grid"><section className="admin-panel"><h2>{editingId ? 'Hindura company' : 'Ongeraho company / processor'}</h2><form className="admin-form" onSubmit={saveProcessor}><label>Izina rya company<input value={processorForm.name} onChange={e => setProcessorForm({ ...processorForm, name: e.target.value })} required /></label><label>Igihingwa<input value={processorForm.crop} onChange={e => setProcessorForm({ ...processorForm, crop: e.target.value })} placeholder="Tomato, Cassava, Rice..." required /></label><label>Aho iherereye<input value={processorForm.location || ''} onChange={e => setProcessorForm({ ...processorForm, location: e.target.value })} placeholder="District / Province" /></label><label>Telefone / Email<input value={processorForm.contact || ''} onChange={e => setProcessorForm({ ...processorForm, contact: e.target.value })} /></label><label>Ibicuruzwa bitunganywa (bitandukanyijwe na koma)<input value={Array.isArray(processorForm.processedProducts) ? processorForm.processedProducts.join(', ') : processorForm.processedProducts || ''} onChange={e => setProcessorForm({ ...processorForm, processedProducts: e.target.value })} placeholder="Flour, juice, dried fruit" /></label><label>Inyandiko / ibyo kwitondera<textarea value={processorForm.notes || ''} onChange={e => setProcessorForm({ ...processorForm, notes: e.target.value })} rows="3" /></label><div className="admin-form-actions"><button type="submit">{editingId ? 'Bika impinduka' : 'Ongeraho'}</button>{editingId && <button type="button" className="light" onClick={() => { setEditingId(''); setProcessorForm(emptyProcessor); }}>Hagarika</button>}</div></form></section><section className="admin-panel"><div className="admin-list-heading"><h2>Directory ({processors.length})</h2><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Shakisha..." /></div>{filteredProcessors.map(p => <article className="admin-record" key={p.id || p.name}><div><strong>{p.name}</strong><p>{p.crop} · {p.location || 'Ahantu ntihagaragajwe'}</p><small>{(p.processedProducts || []).join ? p.processedProducts.join(', ') : p.processedProducts}</small>{p.contact && <small>☎ {p.contact}</small>}</div><div className="record-actions"><button onClick={() => editProcessor(p)}>Hindura</button><button className="danger" onClick={() => removeProcessor(p.id)}>Siba</button></div></article>)}{!filteredProcessors.length && <p className="empty-state">Nta records zihari. Ongeraho company ya mbere.</p>}</section></div>}
      {tab === 'products' && <section className="admin-panel"><div className="admin-list-heading"><div><h2>Ibicuruzwa ({products.length})</h2><p>Ibicuruzwa bibitswe muri browser iyi.</p></div><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Shakisha izina, category, location..." /></div>{filteredProducts.map((p, i) => <article className="admin-record" key={p.id || `${p.name}-${i}`}><div><strong>{p.name || 'Product'}</strong><p>{p.category || 'Category not set'} · {p.location || 'Location not set'}</p><small>{p.price || 'Nta giciro'} · Seller: {p.seller || 'Nta seller'}</small></div><button className="danger" onClick={() => removeProduct(p)}>Siba</button></article>)}{!filteredProducts.length && <p className="empty-state">Nta bicuruzwa bihari muri browser iyi.</p>}</section>}
      {tab === 'notices' && <section className="admin-panel"><h2>Amatangazo y’ubuyobozi</h2><form className="admin-form" onSubmit={addNotice}><label>Ubutumwa bw’itangazo<textarea rows="3" value={noticeText} onChange={e => setNoticeText(e.target.value)} placeholder="Andika itangazo..." required /></label><button type="submit">Tangaza muri workspace</button></form><div className="admin-record-list">{notices.map(n => <article className="admin-record" key={n.id}><div><strong>{n.text}</strong><small>{new Date(n.createdAt).toLocaleString()}</small></div><button className="danger" onClick={() => setNotices(prev => prev.filter(item => item.id !== n.id))}>Siba</button></article>)}</div></section>}
      {tab === 'backup' && <section className="admin-panel"><h2>Backup / Restore</h2><p>Kuramo backup y’amakuru ya Admin na products ziri muri browser, cyangwa usubizeho backup wabanje kubika.</p><div className="backup-actions"><button onClick={exportData}>⬇ Download JSON backup</button><label className="upload-button">⬆ Restore JSON backup<input type="file" accept="application/json,.json" onChange={importData} /></label></div><p className="muted">NISR dataset ni source file nini, ntabwo ishyirwa muri iyi backup. Bika kandi kopi y’umushinga kuri GitHub.</p></section>}
      <footer className="admin-footer">Agri Market · NISR agricultural data prototype · <a href="./index.html">Back to app</a></footer>
    </main>
  </div>;
}

export default function Admin() {
  return import.meta.env.VITE_API_BASE_URL ? <SecureAdmin /> : <LocalAdmin />;
}
