/* ═══════════════════════════════════════════════
   STATS PAGE — script.js
   ═══════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════
   INTRO LANGUAGE CYCLING ANIMATION
   Slot-machine that slows to a stop, then reveals page
   ═══════════════════════════════════════════════ */
(function initIntro() {
  const overlay  = document.getElementById('introOverlay');
  const langEl   = document.getElementById('introLang');
  const barFill  = document.getElementById('introBarFill');
  if (!overlay || !langEl) return;

  /* Languages in cycle order */
  const LANGS = [
    'Python', 'JavaScript', 'Lua', 'C++', 'Bash',
    'Node.js', 'React', 'C', 'HTML', 'CSS',
    'Python', 'JavaScript', 'Lua', 'C++', 'Python'
  ];

  /* Timing schedule — starts fast, slows down (ms between swaps) */
  const SCHEDULE = [
    80, 80, 90, 90, 100, 110, 130, 160,
    200, 260, 340, 450, 600
  ];

  let idx = 0;

  function swapLang(speed) {
    langEl.classList.add('swap');
    setTimeout(() => {
      langEl.textContent = LANGS[idx % LANGS.length];
      langEl.classList.remove('swap');
      idx++;
    }, speed * 0.45);
  }

  /* Progress bar fills over total duration */
  const totalDuration = SCHEDULE.reduce((a, b) => a + b, 0) + 700;
  barFill.style.transition = `width ${totalDuration}ms linear`;
  setTimeout(() => { barFill.style.width = '100%'; }, 80);

  /* Run through schedule */
  let elapsed = 0;
  SCHEDULE.forEach((delay, i) => {
    elapsed += delay;
    setTimeout(() => swapLang(delay), elapsed);
  });

  /* Final settle + slide out */
  elapsed += 700;
  setTimeout(() => {
    langEl.textContent = 'Python'; // settle on top language
    langEl.classList.remove('swap');
  }, elapsed);

  setTimeout(() => {
    overlay.classList.add('exit');
    setTimeout(() => overlay.remove(), 1000);
  }, elapsed + 500);
})();

/* ═══════════════════════════════════════════════
   PROJECTS DATA (inlined — no server needed)
   ═══════════════════════════════════════════════ */
const PROJECTS_DATA = [
  { id: 1,  title: "XN PROTECT",          subtitle: "Advanced Anti-Raid Bot",                  description: "Full-featured Discord Anti-Raid bot with auto-mod, raid protection, logging, and slash commands. Serves 1M+ members across multiple servers (12k+).", category: "discord",  languages: ["JavaScript","Node.js"],         year: 2025, link: "https://xnprotect.com",              featured: true  },
  { id: 2,  title: "XN MUSIC",            subtitle: "High-Fidelity Audio Bot",                 description: "Lossless audio streaming Discord bot with queue management, Spotify/SoundCloud integration, and custom equalizer built with discord.js v14.",        category: "discord",  languages: ["JavaScript","Node.js"],         year: 2026, link: "https://music.xnprotect.com",        featured: false },
  { id: 3,  title: "OCEANUS XN",          subtitle: "Economy & Gambling System",               description: "Discord economy bot with currency, shop, jobs, and gambling mini-games. Redis-backed for high-performance multi-guild support.",                      category: "discord",  languages: ["JavaScript","Node.js"],         year: 2026, link: "https://oceanus.xnprotect.com",      featured: false },
  { id: 4,  title: "Vyrox Store",         subtitle: "Digital Store.",                          description: "Vyrox is a marketplace specialized in offering high-quality digital products and services, with a constantly growing catalog for all users.",           category: "web",      languages: ["JavaScript","Node.js","React"],  year: 2026, link: "https://vyrox.org",                  featured: true  },
  { id: 5,  title: "XN TICKET",           subtitle: "Support/Tickets Bot (Free)",              description: "Completely free ticket bot and fully customizable to your liking.",                                                                                    category: "discord",  languages: ["JavaScript","Node.js"],         year: 2026, link: "#",                                  featured: true  },
  { id: 6,  title: "XN HOSTING",          subtitle: "Free Bots/Webs/Minecraft Hosting",        description: "Totally free hosting to make your projects come true.",                                                                                               category: "hosting",  languages: ["Node.js","JavaScript"],         year: 2026, link: "https://host.xnprotect.com",         featured: true  },
  { id: 7,  title: "EbixCloud",           subtitle: "E-Commerce Storefront",                   description: "EbixCloud offers hosting solutions in a high-performance data center, with secure infrastructure, low latency, and high availability.",                category: "hosting",  languages: ["React","Node.js"],              year: 2026, link: "https://ebixcloud.com",              featured: true  },
  { id: 8,  title: "Nexora",              subtitle: "Artificial intelligence.",                 description: "Nexora is an AI that is being created, optimized, and trained in Uruguay.",                                                                           category: "webs",     languages: ["Python","HTML","CSS"],          year: 2026, link: "#",                                  featured: true  },
  { id: 9,  title: "Akiomae Apps",        subtitle: "Web and Bot Services",                    description: "Akiomae API offers a fast and reliable API with multiple services for developers.",                                                                    category: "webs",     languages: ["Javascript","Node.js"],         year: 2026, link: "https://api.akiomae.xyz/",           featured: true  },
  { id: 10, title: "CryBot",              subtitle: "Bot exclusively created for the famous cry.", description: "CryBot is a project developed by kzred and me, made exclusively for cry.",                                                                        category: "discord",  languages: ["Javascript","Node.js"],         year: 2024, link: "https://discord.gg/DKmFZXM9vd",     featured: true  },
  { id: 11, title: "Duels Testing",       subtitle: "Network Topology Scanner",                description: "CLI tool for passive network reconnaissance. Ethical use only.",                                                                                       category: "roblox",   languages: ["lua"],                          year: 2026, link: "https://discord.com/invite/mxm",    featured: true  },
  { id: 12, title: "PhishDetect",         subtitle: "URL Phishing Analyzer",                   description: "ML-powered tool to detect phishing URLs using natural language features and WHOIS metadata. 96% accuracy on benchmark dataset.",                      category: "hacking",  languages: ["Python"],                       year: 2025, link: "#",                                  featured: false },
  { id: 13, title: "PayloadKit",          subtitle: "CTF Exploit Toolkit",                     description: "Collection of custom exploits and payloads for CTF competitions.",                                                                                     category: "hacking",  languages: ["Python","C","Bash"],            year: 2024, link: "#",                                  featured: false },
  { id: 14, title: "CloudBypass",         subtitle: "Cloudflare WAF & Bot Protection Bypass",  description: "Research tool that bypasses Cloudflare's WAF. For authorized pentesting only.",                                                                       category: "hacking",  languages: ["Python","JavaScript"],          year: 2025, link: "#",                                  featured: true  },
  { id: 15, title: "RBXPwn",              subtitle: "Roblox Anti-Cheat Bypass",                description: "Proof-of-concept bypass for Roblox's Hyperion anti-cheat engine. Educational / CTF use only.",                                                       category: "hacking",  languages: ["C++","C","Python"],             year: 2025, link: "#",                                  featured: false },
  { id: 16, title: "VaultGuard",          subtitle: "AES-256 Password Vault",                  description: "Zero-knowledge local password manager with AES-256 encryption, PBKDF2 key derivation, and CLI + web UI.",                                            category: "cybersec", languages: ["Python","HTML","CSS"],          year: 2025, link: "#",                                  featured: true  },
  { id: 17, title: "PortSentinel",        subtitle: "Intrusion Detection System",              description: "Real-time port-scan detection daemon written in C. Fires alerts on SYN floods, port sweeps, and suspicious packet bursts.",                           category: "cybersec", languages: ["C","Bash"],                     year: 2025, link: "#",                                  featured: false },
  { id: 18, title: "CryptoShell",         subtitle: "Encrypted Terminal Wrapper",              description: "Bash wrapper that encrypts shell history, environment variables, and command outputs at rest.",                                                         category: "cybersec", languages: ["Bash","Python"],                year: 2024, link: "#",                                  featured: false },
  { id: 19, title: "Vyrox Executor",      subtitle: "Script executor with hub",                description: "Script executor with hub, sandbox Lua, auto-inject and UNC compatibility",                                                                            category: "roblox",   languages: ["C++","Lua"],                    year: 2026, link: "https://vyrox.org",                  featured: true  },
  { id: 20, title: "therealcry",          subtitle: "Cry Developer.",                          description: "I am currently working for cry, a Spanish TikToker/streamer",                                                                                         category: "social",   languages: [],                               year: 2026, link: "https://www.tiktok.com/@therealcry", featured: true  },
  { id: 21, title: "SpreenDMC",           subtitle: "EX Spreen Mod.",                          description: "I've worked with Spreen, one of the most famous streamers in Argentina.",                                                                             category: "social",   languages: [],                               year: 2026, link: "https://www.tiktok.com/@spreenbro",  featured: true  },
  { id: 22, title: "Steal a Brainrot",    subtitle: "EX Steal a Brainrot Staff/Tester",        description: "I was part of the Steal a Brainrot team on Roblox as a Staff Tester.",                                                                               category: "roblox",   languages: ["Lua"],                          year: 2025, link: "https://discord.com/invite/brainrots", featured: true }
];

/* ═══════════════════════════════════════════════
   STATS — computed from inline data (no fetch)
   ═══════════════════════════════════════════════ */
let statsData = null;

function fetchStats() {
  statsData = computeStatsFromProjects(PROJECTS_DATA);
  renderAll(statsData);
}

function computeStatsFromProjects(projects) {
  const total = projects.length;
  const langMap = {};
  projects.forEach(p => p.languages.forEach(lang => {
    langMap[lang] = (langMap[lang] || 0) + 1;
  }));

  const languages = Object.entries(langMap)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  const catMap = {};
  projects.forEach(p => {
    if (!catMap[p.category]) catMap[p.category] = { count: 0, featured: 0, langs: new Set() };
    catMap[p.category].count++;
    if (p.featured) catMap[p.category].featured++;
    p.languages.forEach(l => catMap[p.category].langs.add(l));
  });

  const categories = Object.entries(catMap).map(([name, d]) => ({
    name,
    count: d.count,
    featured: d.featured,
    percentage: Math.round((d.count / total) * 100),
    languages: [...d.langs]
  })).sort((a, b) => b.count - a.count);

  const years = projects.map(p => p.year);
  const metrics = {
    total,
    featured: projects.filter(p => p.featured).length,
    yearStart: Math.min(...years),
    yearEnd: Math.max(...years),
    totalLangs: Object.keys(langMap).length,
    totalCats: Object.keys(catMap).length,
    topLanguage: languages[0]?.name || ''
  };

  return { metrics, languages, categories, projects };
}

/* ═══════════════════════════════════════════════
   RENDER ALL
   ═══════════════════════════════════════════════ */
function renderAll({ metrics, languages, categories, projects }) {
  renderMetrics(metrics);
  renderLangBars(languages, metrics.total);
  renderDonut(languages, metrics.total);
  renderCatTable(categories);
  renderAllTable(projects);

  /* Set last-updated */
  const now = new Date();
  document.getElementById('lastUpdated').textContent =
    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/* ── Metrics ──────────────────────────────────── */
function renderMetrics(m) {
  animateCounter(document.getElementById('mTotal'),    m.total);
  animateCounter(document.getElementById('mFeatured'), m.featured);
  animateCounter(document.getElementById('mLangs'),    m.totalLangs);
  document.getElementById('mYears').textContent = `${m.yearStart}–${m.yearEnd}`;
}

function animateCounter(el, target) {
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    const dur   = 1400;
    const start = performance.now();
    (function step(now) {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target);
      if (p < 1) requestAnimationFrame(step);
    })(start);
    obs.unobserve(el);
  }, { threshold: 0.5 });
  obs.observe(el);
}

/* ── Language Bars ────────────────────────────── */
function renderLangBars(languages, total) {
  const container = document.getElementById('langBars');
  if (!container) return;

  container.innerHTML = languages.map(lang => `
    <div class="lang-bar-row fade-up">
      <div class="lang-bar-header">
        <span class="lang-bar-name">${lang.name}</span>
        <span class="lang-bar-count">${lang.count} / ${total} projects</span>
      </div>
      <div class="lang-bar-track">
        <div class="lang-bar-fill" data-w="${(lang.count / total) * 100}"></div>
      </div>
      <div class="lang-bar-pct">${lang.percentage}% of total</div>
    </div>
  `).join('');

  /* Animate bars on scroll */
  const fills = container.querySelectorAll('.lang-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.w + '%';
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));

  /* Fade-up rows */
  container.querySelectorAll('.lang-bar-row').forEach((row, i) => {
    row.style.transitionDelay = i * 60 + 'ms';
    setTimeout(() => {
      const obs2 = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add('visible');
          obs2.unobserve(entries[0].target);
        }
      }, { threshold: 0.2 });
      obs2.observe(row);
    }, 0);
  });
}

/* ── Donut Chart (SVG) ───────────────────────── */
function renderDonut(languages, total) {
  const svg    = document.getElementById('langDonut');
  const topEl  = document.getElementById('topLangName');
  const cntEl  = document.getElementById('topLangCount');
  const pctEl  = document.getElementById('topLangPct');
  if (!svg) return;

  const r = 48, cx = 60, cy = 60;
  const circumference = 2 * Math.PI * r;

  /* Build segments */
  const GREYS = ['#f5f5f0', '#d0d0ca', '#888880', '#444440', '#222220', '#444440', '#888880', '#d0d0ca', '#f5f5f0', '#222220'];
  let segments = '';
  let offset   = 0;

  /* Background ring */
  segments += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1a1a18" stroke-width="14"/>`;

  languages.forEach((lang, i) => {
    const pct  = lang.count / total;
    const dash = pct * circumference;
    const gap  = circumference - dash;
    const col  = GREYS[i % GREYS.length];

    segments += `
      <circle
        cx="${cx}" cy="${cy}" r="${r}"
        fill="none"
        stroke="${col}"
        stroke-width="14"
        stroke-dasharray="${dash} ${gap}"
        stroke-dashoffset="${-offset}"
        class="donut-seg"
        data-label="${lang.name}"
        data-pct="${lang.percentage}">
        <title>${lang.name}: ${lang.percentage}%</title>
      </circle>`;
    offset += dash;
  });

  svg.innerHTML = segments;

  /* Animate segments */
  const segs = svg.querySelectorAll('.donut-seg');
  segs.forEach((s, i) => {
    s.style.transition = `stroke-dasharray 1.2s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1)`;
  });

  /* Top language info */
  if (languages[0]) {
    topEl.textContent = languages[0].name;
    cntEl.textContent = `${languages[0].count} project${languages[0].count !== 1 ? 's' : ''}`;
    pctEl.textContent = `${languages[0].percentage}%`;
  }
}

/* ── Category Table ───────────────────────────── */
const CAT_EMOJI = { discord: '🤖', webs: '🌐', roblox: '🎮', hacking: '🔓', cybersec: '🛡️', hosting: '☁️', social: '📱' };

function renderCatTable(categories) {
  const tbody = document.getElementById('catTableBody');
  if (!tbody) return;

  tbody.innerHTML = categories.map(cat => `
    <tr>
      <td>
        <span class="cat-badge ${cat.name}">
          ${CAT_EMOJI[cat.name] || ''} ${capitalize(cat.name)}
        </span>
      </td>
      <td class="align-right" style="font-family:'JetBrains Mono',monospace;font-weight:700;">${cat.count}</td>
      <td class="align-right" style="color:var(--grey-400);">
        ${cat.featured > 0 ? `<span class="feat-star on">★</span> ${cat.featured}` : '—'}
      </td>
      <td class="align-right">
        <div class="share-bar-wrap">
          <div class="share-bar">
            <div class="share-bar-fill" data-w="${cat.percentage}"></div>
          </div>
          <span class="share-pct">${cat.percentage}%</span>
        </div>
      </td>
      <td>
        ${cat.languages.map(l => `<span class="lang-pill">${l}</span>`).join('')}
      </td>
    </tr>
  `).join('');

  /* Animate share bars */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.share-bar-fill').forEach(f => {
        f.style.width = f.dataset.w + '%';
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  obs.observe(tbody);
}

/* ── Full Projects Table (sortable + searchable) ── */
let sortCol  = 'id';
let sortDir  = 'asc';
let allProjs = [];
let filtered = [];

function renderAllTable(projects) {
  allProjs = projects;
  filtered = [...projects];
  drawTable();
}

function drawTable() {
  const tbody  = document.getElementById('allTableBody');
  const footer = document.getElementById('tableFooter');
  if (!tbody) return;

  tbody.innerHTML = filtered.map((p, i) => `
    <tr>
      <td style="font-family:'JetBrains Mono',monospace;color:var(--grey-600);">${String(p.id).padStart(2, '0')}</td>
      <td>
        <div style="font-weight:600;">${p.title}</div>
        <div style="font-size:0.75rem;color:var(--grey-600);">${p.subtitle}</div>
      </td>
      <td><span class="cat-badge ${p.category}">${CAT_EMOJI[p.category] || ''} ${capitalize(p.category)}</span></td>
      <td>${p.languages.map(l => `<span class="lang-pill">${l}</span>`).join('')}</td>
      <td class="align-right" style="font-family:'JetBrains Mono',monospace;">${p.year}</td>
      <td class="align-right">
        <span class="feat-star ${p.featured ? 'on' : ''}">${p.featured ? '★' : '☆'}</span>
      </td>
    </tr>
  `).join('');

  if (footer) footer.textContent = `Showing ${filtered.length} of ${allProjs.length} projects`;
}

/* Sorting */
document.querySelectorAll('.stats-table th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortCol = col;
      sortDir = 'asc';
    }
    /* Update header classes */
    document.querySelectorAll('.stats-table th.sortable').forEach(h => {
      h.classList.remove('sort-asc', 'sort-desc');
    });
    th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');

    filtered.sort((a, b) => {
      let va = a[sortCol], vb = b[sortCol];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    drawTable();
  });
});

/* Search */
const searchInput = document.getElementById('tableSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    filtered = allProjs.filter(p =>
      p.title.toLowerCase().includes(q)       ||
      p.subtitle.toLowerCase().includes(q)    ||
      p.category.toLowerCase().includes(q)    ||
      p.description.toLowerCase().includes(q) ||
      p.languages.some(l => l.toLowerCase().includes(q))
    );
    drawTable();
  });
}

/* ── Shared: Cursor ───────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .metric-card, th.sortable').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ── Shared: Navbar ───────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.classList.add('dark');
  document.body.classList.add('dark-section');

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    const hero = document.querySelector('.stats-hero');
    if (hero) {
      const past = window.scrollY > hero.offsetHeight - 80;
      nav.classList.toggle('dark', !past);
      document.body.classList.toggle('dark-section', !past);
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Shared: Mobile menu ──────────────────────── */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
  });
  menu.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* ── Shared: Parallax ─────────────────────────── */
(function initParallax() {
  const bgText = document.querySelector('.hero-bg-text');
  if (!bgText) return;
  window.addEventListener('scroll', () => {
    bgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.25}px))`;
  }, { passive: true });
})();

/* ── Utilities ────────────────────────────────── */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Init ─────────────────────────────────────── */
fetchStats();
