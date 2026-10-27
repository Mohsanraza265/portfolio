/* Minimal dependency-free API server. Run `node server.js` in production. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 4000;
const STORE = path.join(__dirname, 'src', 'data', 'portfolio.json');
const PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-before-deploying';
const SECRET = process.env.SESSION_SECRET || 'development-session-secret-change-me';
const sessions = new Map();
const read = () => JSON.parse(fs.readFileSync(STORE, 'utf8'));
const write = (data) => { const temp = `${STORE}.tmp`; fs.writeFileSync(temp, JSON.stringify(data, null, 2)); fs.renameSync(temp, STORE); };
const json = (res, status, body) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
const body = (req) => new Promise((resolve, reject) => { let data = ''; req.on('data', (c) => { data += c; if (data.length > 1000000) reject(new Error('Payload too large')); }); req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { reject(new Error('Invalid JSON')); } }); });
const cookie = (req) => (req.headers.cookie || '').split(';').reduce((a, v) => { const [k, ...x] = v.trim().split('='); if (k) a[k] = x.join('='); return a; }, {});
const authorized = (req) => { const token = cookie(req).portfolio_session; const session = token && sessions.get(token); return session && session.expires > Date.now(); };
const id = () => crypto.randomUUID();
const normalizeProject = (p) => ({ id: p.id || id(), title: String(p.title || '').trim(), slug: String(p.slug || '').trim(), description: String(p.description || '').trim(), image: String(p.image || ''), technologies: Array.isArray(p.technologies) ? p.technologies : [], category: p.category, liveUrl: String(p.liveUrl || ''), githubUrl: String(p.githubUrl || ''), featured: Boolean(p.featured), order: Number(p.order || 0), published: Boolean(p.published), updatedAt: new Date().toISOString() });
const validProject = (p) => p.title && p.slug && p.description && ['React / Next.js', 'WordPress', 'Webflow', 'Vue.js'].includes(p.category);

http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const url = new URL(req.url, `http://${req.headers.host}`); const parts = url.pathname.split('/').filter(Boolean);
  try {
    if (url.pathname === '/api/health') return json(res, 200, { ok: true });
    if (url.pathname === '/api/auth/login' && req.method === 'POST') {
      const { password } = await body(req); const supplied = Buffer.from(String(password)); const expected = Buffer.from(PASSWORD);
      if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) return json(res, 401, { error: 'Invalid password.' });
      const token = crypto.createHmac('sha256', SECRET).update(`${id()}${Date.now()}`).digest('base64url'); sessions.set(token, { expires: Date.now() + 1000 * 60 * 60 * 12 });
      res.setHeader('Set-Cookie', `portfolio_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200`); return json(res, 200, { ok: true });
    }
    if (url.pathname === '/api/auth/logout' && req.method === 'POST') { sessions.delete(cookie(req).portfolio_session); res.setHeader('Set-Cookie', 'portfolio_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); return json(res, 200, { ok: true }); }
    if (url.pathname === '/api/auth/session') return json(res, 200, { authenticated: true });
    const data = read();
    if (url.pathname === '/api/portfolio' && req.method === 'GET') return json(res, 200, { skills: data.skills, experience: data.experience, projects: data.projects.filter((p) => p.published).sort((a,b) => a.order - b.order), settings: data.settings });
    if (!url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Not found' });
    if (url.pathname === '/api/admin/data' && req.method === 'GET') return json(res, 200, data);
    if (url.pathname === '/api/admin/settings' && req.method === 'PUT') { data.settings = { ...data.settings, ...(await body(req)) }; write(data); return json(res, 200, data.settings); }
    const collection = parts[2]; const index = data[collection];
    if (!Array.isArray(index) || !['projects', 'skills', 'experience'].includes(collection)) return json(res, 404, { error: 'Not found' });
    if (req.method === 'POST') { let item = await body(req); item = collection === 'projects' ? normalizeProject(item) : { ...item, id: item.id || id() }; if (collection === 'projects' && !validProject(item)) return json(res, 422, { error: 'Title, slug, description, and a valid category are required.' }); index.push(item); write(data); return json(res, 201, item); }
    const itemId = parts[3]; const at = index.findIndex((item) => item.id === itemId); if (at < 0) return json(res, 404, { error: 'Item not found.' });
    if (req.method === 'PUT') { let item = { ...index[at], ...(await body(req)), id: itemId }; item = collection === 'projects' ? normalizeProject(item) : item; if (collection === 'projects' && !validProject(item)) return json(res, 422, { error: 'Required project fields are missing.' }); index[at] = item; write(data); return json(res, 200, item); }
    if (req.method === 'DELETE') { index.splice(at, 1); write(data); return json(res, 200, { ok: true }); }
    return json(res, 405, { error: 'Method not allowed.' });
  } catch (error) { return json(res, 400, { error: error.message || 'Request failed.' }); }
}).listen(PORT, () => console.log(`Portfolio API listening on ${PORT}`));
