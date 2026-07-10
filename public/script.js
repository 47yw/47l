/* ═══════════════════════════════════════════
   LIAM PORTFOLIO — script.js
   ═══════════════════════════════════════════ */

'use strict';

/* ── Custom Cursor ──────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button, .project-item, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ── Navbar scroll behaviour ────────────────── */
(function initNavbar() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function update() {
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', scrolled);

    // Detect dark section under nav
    const darkSections = document.querySelectorAll('.hero, .section-dark');
    let onDark = false;
    darkSections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= 60 && r.bottom >= 0) onDark = true;
    });
    nav.classList.toggle('dark', onDark);
    document.body.classList.toggle('dark-section', onDark);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Mobile menu ────────────────────────────── */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* ── Intersection Observer — fade-up ────────── */
(function initFadeUp() {
  const targets = document.querySelectorAll(
    '.section-header, .about-grid, .project-item, .skill-column, .contact-inner, .stat'
  );
  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
})();

/* ── Skill bars animate on view ─────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.getAttribute('data-w');
        e.target.style.width = w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => obs.observe(f));
})();

/* ── Counter animation ──────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const dur    = 1400;
      const start  = performance.now();
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(step);
      })(start);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => obs.observe(n));
})();

/* ── Contact form — full validation ────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('formSubmitBtn');
  if (!form) return;

  /* Discord Webhook URL — embedded for static hosting */
  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1518773857144672269/he4wvir9vHPP06EeXkE7dsU4rpIBP9Waoj7bB5H4Pzv0XL14J2lR5_mbMsQdJJrS8Y0o';

  /* Helpers */
  function showError(input, msg) {
    input.classList.add('input-error');
    let errEl = input.parentElement.querySelector('.form-error-msg');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'form-error-msg';
      input.parentElement.appendChild(errEl);
    }
    errEl.textContent = msg;
  }

  function clearError(input) {
    input.classList.remove('input-error');
    const errEl = input.parentElement.querySelector('.form-error-msg');
    if (errEl) errEl.remove();
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function validateAll() {
    const name    = document.getElementById('nameInput');
    const email   = document.getElementById('emailInput');
    const message = document.getElementById('messageInput');
    let valid = true;

    clearError(name); clearError(email); clearError(message);

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.'); valid = false;
    } else if (name.value.trim().length < 2) {
      showError(name, 'Name must be at least 2 characters.'); valid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'Please enter your email address.'); valid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.'); valid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Please write a message.'); valid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters.'); valid = false;
    }

    return valid;
  }

  /* Clear errors on input */
  ['nameInput', 'emailInput', 'messageInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(el));
  });

  /* Submit */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateAll()) {
      /* Shake the button */
      btn.classList.add('btn-shake');
      setTimeout(() => btn.classList.remove('btn-shake'), 500);
      return;
    }

    const originalBtnText = btn.textContent;
    btn.textContent = window.translate ? window.translate('contact.form.sending') : 'Sending…';
    btn.disabled    = true;

    const name    = document.getElementById('nameInput').value;
    const email   = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '📩 New Contact Message',
            color: 3447003,
            fields: [
              { name: 'Name',    value: name,    inline: true },
              { name: 'Email',   value: email,   inline: true },
              { name: 'Message', value: message }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });

      if (!response.ok) throw new Error('Webhook failed: ' + response.status);

      form.reset();
      btn.textContent = originalBtnText;
      btn.disabled    = false;
      success.textContent = window.translate ? window.translate('contact.form.success') : '✓ Message sent! I\'ll be in touch soon.';
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 6000);
    } catch (err) {
      console.error('Contact submit error:', err);
      btn.textContent = originalBtnText;
      btn.disabled = false;
      success.textContent = window.translate ? window.translate('contact.form.error') : 'Failed to send message. Please try again.';
      success.classList.add('show', 'error');
      setTimeout(() => success.classList.remove('show', 'error'), 6000);
    }
  });
})();

/* ── Smooth parallax on hero bg text ────────── */
(function initParallax() {
  const bgText = document.querySelector('.hero-bg-text');
  if (!bgText) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bgText.style.transform = `translate(-50%, calc(-50% + ${y * 0.3}px))`;
  }, { passive: true });
})();

/* ── Project items — add cursor text on hover ── */
(function initProjectHover() {
  const items = document.querySelectorAll('.project-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      // Placeholder — replace with real project links
      console.log('Project clicked:', item.querySelector('.project-title').textContent);
    });
  });
})();
