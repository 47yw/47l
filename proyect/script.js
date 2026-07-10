/* ═══════════════════════════════════════════════
   PROJECTS PAGE — script.js
   Data is inlined directly — no server needed
   ═══════════════════════════════════════════════ */

'use strict';

/* ── State ──────────────────────────────────── */
let activeCat     = 'all';
let activeLang    = 'all';

/* ── DOM refs ───────────────────────────────── */
const grid       = document.getElementById('proyGrid');
const emptyState = document.getElementById('emptyState');
const countEl    = document.getElementById('projectCount');
const resultEl   = document.getElementById('filterResultCount');
const clearBtn   = document.getElementById('clearFilters');
const emptyReset = document.getElementById('clearFiltersBtn');

/* ═══════════════════════════════════════════════
   PROJECTS DATA (inlined — no fetch needed)
   ═══════════════════════════════════════════════ */
const allProjects = [
  {
    id: 1,
    title: "XN PROTECT",
    subtitle: "Advanced Anti-Raid Bot",
    description: "Full-featured Discord Anti-Raid bot with auto-mod, raid protection, logging, and slash commands. Serves 1M+ members across multiple servers (12k+).",
    category: "discord",
    languages: ["JavaScript", "Node.js"],
    year: 2025,
    link: "https://xnprotect.com",
    featured: true
  },
  {
    id: 2,
    title: "XN MUSIC",
    subtitle: "High-Fidelity Audio Bot",
    description: "Lossless audio streaming Discord bot with queue management, Spotify/SoundCloud integration, and custom equalizer built with discord.js v14.",
    category: "discord",
    languages: ["JavaScript", "Node.js"],
    year: 2026,
    link: "https://music.xnprotect.com",
    featured: false
  },
  {
    id: 3,
    title: "OCEANUS XN",
    subtitle: "Economy & Gambling System",
    description: "Discord economy bot with currency, shop, jobs, and gambling mini-games. Redis-backed for high-performance multi-guild support.",
    category: "discord",
    languages: ["JavaScript", "Node.js"],
    year: 2026,
    link: "https://oceanus.xnprotect.com",
    featured: false
  },
  {
    id: 4,
    title: "Vyrox Store",
    subtitle: "Digital Store.",
    description: "Vyrox is a marketplace specialized in offering high-quality digital products and services, with a constantly growing catalog for all users.",
    category: "web",
    languages: ["JavaScript", "Node.js", "React"],
    year: 2026,
    link: "https://vyrox.org",
    featured: true
  },
  {
    id: 5,
    title: "XN TICKET",
    subtitle: "Support/Tickets Bot (Free)",
    description: "Completely free ticket bot and fully customizable to your liking.",
    category: "discord",
    languages: ["JavaScript", "Node.js"],
    year: 2026,
    link: "#",
    featured: true
  },
  {
    id: 6,
    title: "XN HOSTING",
    subtitle: "Free Bots/Webs/Minecraft Hosting",
    description: "Totally free hosting to make your projects come true.",
    category: "hosting",
    languages: ["Node.js", "JavaScript"],
    year: 2026,
    link: "https://host.xnprotect.com",
    featured: true
  },
  {
    id: 7,
    title: "EbixCloud The datacenter you need.",
    subtitle: "E-Commerce Storefront",
    description: "EbixCloud offers hosting solutions in a high-performance data center, with secure infrastructure, low latency, and high availability, ideal for servers, applications, and projects that require stability and speed.",
    category: "hosting",
    languages: ["React", "Node.js"],
    year: 2026,
    link: "https://ebixcloud.com",
    featured: true
  },
  {
    id: 8,
    title: "Nexora",
    subtitle: "Artificial intelligence.",
    description: "Nexora is an AI that is being created, optimized, and trained in Uruguay.",
    category: "webs",
    languages: ["Python", "HTML", "CSS"],
    year: 2026,
    link: "#",
    featured: true
  },
  {
    id: 9,
    title: "Akiomae Apps",
    subtitle: "Web and Bot Services",
    description: "Akiomae API offers a fast and reliable API with multiple services for developers, providing optimized endpoints, high availability, and easy integration via API Key, ideal for bots, apps, and project automation.",
    category: "webs",
    languages: ["Javascript", "Node.js"],
    year: 2026,
    link: "https://api.akiomae.xyz/",
    featured: true
  },
  {
    id: 10,
    title: "CryBot",
    subtitle: "Bot exclusively created for the famous cry.",
    description: "CryBot is a project developed by kzred and me, made exclusively for cry: https://www.tiktok.com/@therealcry",
    category: "discord",
    languages: ["Javascript", "Node.js"],
    year: 2024,
    link: "https://discord.gg/DKmFZXM9vd",
    featured: true
  },
  {
    id: 11,
    title: "Duels Testing (In Progress).",
    subtitle: "Network Topology Scanner",
    description: "CLI tool for passive network reconnaissance. Discovers hosts, open ports, OS fingerprints, and generates visual topology maps. Ethical use only.",
    category: "roblox",
    languages: ["lua"],
    year: 2026,
    link: "https://discord.com/invite/mxm",
    featured: true
  },
  {
    id: 12,
    title: "PhishDetect",
    subtitle: "URL Phishing Analyzer",
    description: "ML-powered tool to detect phishing URLs using natural language features and WHOIS metadata. 96% accuracy on benchmark dataset.",
    category: "hacking",
    languages: ["Python"],
    year: 2025,
    link: "#",
    featured: false
  },
  {
    id: 13,
    title: "PayloadKit",
    subtitle: "CTF Exploit Toolkit",
    description: "Collection of custom exploits and payloads for CTF competitions. Includes buffer overflow templates, shellcode generators, and SQLi bypasses.",
    category: "hacking",
    languages: ["Python", "C", "Bash"],
    year: 2024,
    link: "#",
    featured: false
  },
  {
    id: 14,
    title: "CloudBypass",
    subtitle: "Cloudflare WAF & Bot Protection Bypass",
    description: "Research tool that bypasses Cloudflare's WAF, browser integrity check, and Turnstile CAPTCHA using TLS fingerprint spoofing and headless browser emulation. For authorized pentesting only.",
    category: "hacking",
    languages: ["Python", "JavaScript"],
    year: 2025,
    link: "#",
    featured: true
  },
  {
    id: 15,
    title: "RBXPwn",
    subtitle: "Roblox Anti-Cheat Bypass",
    description: "Proof-of-concept bypass for Roblox's Hyperion anti-cheat engine. Uses DLL injection and memory patching techniques to hook internal rendering calls. Educational / CTF use only.",
    category: "hacking",
    languages: ["C++", "C", "Python"],
    year: 2025,
    link: "#",
    featured: false
  },
  {
    id: 16,
    title: "VaultGuard",
    subtitle: "AES-256 Password Vault",
    description: "Zero-knowledge local password manager with AES-256 encryption, PBKDF2 key derivation, and CLI + web UI. Never sends data to a server.",
    category: "cybersec",
    languages: ["Python", "HTML", "CSS"],
    year: 2025,
    link: "#",
    featured: true
  },
  {
    id: 17,
    title: "PortSentinel",
    subtitle: "Intrusion Detection System",
    description: "Real-time port-scan detection daemon written in C. Fires alerts on SYN floods, port sweeps, and suspicious packet bursts. <2ms detection latency.",
    category: "cybersec",
    languages: ["C", "Bash"],
    year: 2025,
    link: "#",
    featured: false
  },
  {
    id: 18,
    title: "CryptoShell",
    subtitle: "Encrypted Terminal Wrapper",
    description: "Bash wrapper that encrypts shell history, environment variables, and command outputs at rest. Drop-in replacement for bash with GPG back-end.",
    category: "cybersec",
    languages: ["Bash", "Python"],
    year: 2024,
    link: "#",
    featured: false
  },
  {
    id: 19,
    title: "Vyrox Executor",
    subtitle: "Script executor with hub",
    description: "Script executor with hub, sandbox Lua, auto-inject and UNC compatibility",
    category: "roblox",
    languages: ["C++", "Lua"],
    year: 2026,
    link: "https://vyrox.org",
    featured: true
  },
  {
    id: 20,
    title: "therealcry",
    subtitle: "Cry Developer.",
    description: "I am currently working for cry, a Spanish TikToker/streamer",
    category: "social",
    languages: [],
    year: 2026,
    link: "https://www.tiktok.com/@therealcry",
    featured: true
  },
  {
    id: 21,
    title: "SpreenDMC",
    subtitle: "EX Spreen Mod.",
    description: "I've worked with Spreen, one of the most famous streamers in Argentina.",
    category: "social",
    languages: [],
    year: 2026,
    link: "https://www.tiktok.com/@spreenbro",
    featured: true
  },
  {
    id: 22,
    title: "Steal a Brainrot",
    subtitle: "EX Steal a Brainrot Staff/Tester",
    description: "I was part of the Steal a Brainrot team on Roblox as a Staff Tester, helping to spot bugs, test new features, and give feedback to improve the gaming experience before updates were released.",
    category: "roblox",
    languages: ["Lua"],
    year: 2025,
    link: "https://discord.com/invite/brainrots",
    featured: true
  }
];

/* ═══════════════════════════════════════════════
   INIT — load data immediately (no fetch needed)
   ═══════════════════════════════════════════════ */
function fetchProjects() {
  countEl.textContent = allProjects.length;
  renderProjects(allProjects);
}

/* ═══════════════════════════════════════════════
   FILTER LOGIC
   ═══════════════════════════════════════════════ */
function getFiltered() {
  return allProjects.filter(p => {
    const catMatch  = activeCat  === 'all' || p.category === activeCat;
    const langMatch = activeLang === 'all' ||
      p.languages.map(l => l.toLowerCase()).includes(activeLang.toLowerCase());
    return catMatch && langMatch;
  });
}

function updateLangButtons() {
  /* Which languages appear in current category filter? */
  const catFiltered = activeCat === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeCat);

  const available = new Set(
    catFiltered.flatMap(p => p.languages.map(l => l.toLowerCase()))
  );

  document.querySelectorAll('#langFilters .filter-btn').forEach(btn => {
    const lang = btn.dataset.lang;
    if (lang === 'all') { btn.classList.remove('disabled'); return; }
    btn.classList.toggle('disabled', !available.has(lang));
  });
}

function applyFilters() {
  const filtered = getFiltered();
  updateLangButtons();
  renderProjects(filtered);
  updateStatus(filtered.length);
  updateClearBtn();
}

function updateStatus(count) {
  resultEl.textContent = `${count} project${count !== 1 ? 's' : ''}`;
}

function updateClearBtn() {
  const isDefault = activeCat === 'all' && activeLang === 'all';
  clearBtn.style.display = isDefault ? 'none' : 'inline';
}

/* ═══════════════════════════════════════════════
   RENDER CARDS
   ═══════════════════════════════════════════════ */
const CAT_LABELS = {
  discord:  '🤖 Discord',
  webs:     '🌐 Webs',
  roblox:   '🎮 Roblox',
  hacking:  '🔓 Hacking',
  cybersec: '🛡️ Cybersec',
  hosting:  '☁️ Hosting',
  social:   '📱 TikTok/IG',
};

function renderProjects(projects) {
  grid.innerHTML = '';

  if (projects.length === 0) {
    emptyState.style.display = 'flex';
    grid.style.display       = 'none';
    return;
  }
  emptyState.style.display = 'none';
  grid.style.display       = 'grid';

  projects.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = `proy-card cat-${p.category}${p.featured ? ' featured' : ''}`;
    card.setAttribute('id', `card-${p.id}`);
    card.style.animationDelay = `${Math.min(i, 8) * 60}ms`;

    card.innerHTML = `
      <div class="card-img-container">
        <img src="/assets/projects/project${p.id}/cover.png" alt="${p.title}" class="card-img" style="display:none;" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" />
        <div class="card-img-placeholder">
          <span>${p.title.charAt(0)}</span>
        </div>
      </div>
      <div class="card-top">
        <span class="card-num">${String(p.id).padStart(2, '0')}</span>
        <span class="card-cat">${CAT_LABELS[p.category] || p.category}</span>
      </div>
      <div>
        <h2 class="card-title">${p.title}</h2>
        <p class="card-subtitle">${p.subtitle}</p>
      </div>
      <p class="card-desc">${p.description}</p>
      <div class="card-langs">
        ${p.languages.map(l => `<span class="lang-tag">${l}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="card-year">${p.year}</span>
        <a href="${p.link}" class="card-link" aria-label="View ${p.title}">↗</a>
      </div>
    `;

    /* Hover cursor */
    card.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));

    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   FILTER BUTTONS — EVENT LISTENERS
   ═══════════════════════════════════════════════ */
document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat  = btn.dataset.cat;
    activeLang = 'all'; // Reset lang when category changes
    document.querySelectorAll('#langFilters .filter-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('langAll').classList.add('active');
    applyFilters();
  });
});

document.querySelectorAll('#langFilters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    document.querySelectorAll('#langFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeLang = btn.dataset.lang;
    applyFilters();
  });
});

clearBtn.addEventListener('click', resetFilters);
emptyReset.addEventListener('click', resetFilters);

function resetFilters() {
  activeCat  = 'all';
  activeLang = 'all';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('catAll').classList.add('active');
  document.getElementById('langAll').classList.add('active');
  applyFilters();
}

/* ═══════════════════════════════════════════════
   SHARED COMPONENTS (cursor, navbar, mobile menu)
   ═══════════════════════════════════════════════ */

/* Custom Cursor */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .proy-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* Navbar */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  // Start dark (hero is black)
  nav.classList.add('dark');
  document.body.classList.add('dark-section');

  function update() {
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', scrolled);
    // Hero height approx
    const hero = document.querySelector('.proy-hero');
    if (hero) {
      const past = window.scrollY > hero.offsetHeight - 80;
      nav.classList.toggle('dark', !past);
      document.body.classList.toggle('dark-section', !past);
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();

  /* Sticky filter shadow */
  const filterSec = document.querySelector('.filter-section');
  window.addEventListener('scroll', () => {
    if (!filterSec) return;
    filterSec.classList.toggle('shadow', window.scrollY > filterSec.offsetTop);
  }, { passive: true });
})();

/* Mobile menu */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
  });
  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* Parallax on hero bg text */
(function initParallax() {
  const bgText = document.querySelector('.hero-bg-text');
  if (!bgText) return;
  window.addEventListener('scroll', () => {
    bgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.25}px))`;
  }, { passive: true });
})();

/* ── Init ───────────────────────────────────── */
fetchProjects();
