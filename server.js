const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const https   = require('https');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function postJson(url, data) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(parsed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ statusCode: res.statusCode, body });
        } else {
          reject(new Error(`Discord webhook failed ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

app.use(cors());
app.use(express.json());

/* ── Static files ──────────────────────────── */
app.use(express.static(path.join(__dirname)));

/* ── API: GET /api/projects ─────────────────
   Query params:
     ?category=discord|webs|roblox|hacking|cybersec
     ?language=javascript|python|lua|html|css|react|bash|c
   Both can be combined. Omit for all.
─────────────────────────────────────────────── */
app.get('/api/projects', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'projects.json');
  const raw      = fs.readFileSync(dataPath, 'utf8');
  let   projects = JSON.parse(raw);

  const { category, language } = req.query;

  if (category && category !== 'all') {
    projects = projects.filter(p => p.category === category);
  }
  if (language && language !== 'all') {
    projects = projects.filter(p =>
      p.languages.map(l => l.toLowerCase()).includes(language.toLowerCase())
    );
  }

  res.json({ total: projects.length, projects });
});

/* ── API: GET /api/stats ─────────────────────
   Returns computed statistics from all projects:
   language usage, category breakdown, global metrics.
─────────────────────────────────────────────── */
app.get('/api/stats', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'projects.json');
  const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const total    = projects.length;

  /* Language frequency */
  const langMap = {};
  projects.forEach(p => {
    p.languages.forEach(lang => {
      langMap[lang] = (langMap[lang] || 0) + 1;
    });
  });
  const languages = Object.entries(langMap)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  /* Category frequency */
  const catMap = {};
  projects.forEach(p => {
    if (!catMap[p.category]) catMap[p.category] = { count: 0, featured: 0, langs: new Set() };
    catMap[p.category].count++;
    if (p.featured) catMap[p.category].featured++;
    p.languages.forEach(l => catMap[p.category].langs.add(l));
  });
  const categories = Object.entries(catMap).map(([name, d]) => ({
    name,
    count:    d.count,
    featured: d.featured,
    percentage: Math.round((d.count / total) * 100),
    languages: [...d.langs]
  })).sort((a, b) => b.count - a.count);

  /* Global metrics */
  const years   = projects.map(p => p.year);
  const metrics = {
    total,
    featured:  projects.filter(p => p.featured).length,
    yearStart: Math.min(...years),
    yearEnd:   Math.max(...years),
    totalLangs: Object.keys(langMap).length,
    totalCats:  Object.keys(catMap).length,
    topLanguage: languages[0]?.name || ''
  };

  res.json({ metrics, languages, categories, projects });
});

/* ── Contact endpoint ───────────────────────── */
app.post('/api/contact', async (req, res) => {
  if (!WEBHOOK_URL) {
    return res.status(500).json({ error: 'Webhook URL not configured.' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing name, email, or message.' });
  }

  try {
    await postJson(WEBHOOK_URL, {
      embeds: [{
        title: 'New Contact Message',
        color: 3447003,
        fields: [
          { name: 'Name', value: name, inline: true },
          { name: 'Email', value: email, inline: true },
          { name: 'Message', value: message }
        ],
        timestamp: new Date().toISOString()
      }]
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Contact webhook error:', err);
    res.status(502).json({ error: 'Failed to send message.' });
  }
});

/* ── Serve proyect page ─────────────────────── */
app.get('/proyect', (req, res) => {
  res.sendFile(path.join(__dirname, 'proyect', 'index.html'));
});

/* ── Serve stats page ───────────────────────── */
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'stats', 'index.html'));
});

/* ── Fallback → main portfolio ──────────────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  🖤  Liam Portfolio running at http://localhost:${PORT}`);
  console.log(`  📁  Projects API at http://localhost:${PORT}/api/projects\n`);
});
