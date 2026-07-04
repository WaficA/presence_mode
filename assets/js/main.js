/* AetherMind — main.js */

(function () {
  'use strict';

  /* ── NAV SCROLL ───────────────────────────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU ──────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .privacy-card');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el, i) => {
      if (el.classList.contains('privacy-card') && !el.dataset.delay) {
        el.dataset.delay = i * 60;
      }
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── ACTIVE NAV LINK ──────────────────────────────────── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath === '' || currentPath === '/'))) {
      link.classList.add('active');
    }
  });

  /* ── WAITLIST FORM ────────────────────────────────────── */
  const form = document.getElementById('waitlist-form');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      if (!email) return;

      submitBtn.textContent = 'Submitting…';
      submitBtn.disabled = true;

      try {
        await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });
      } catch (_) {
        /* fail silently — endpoint placeholder */
      }

      form.style.display = 'none';
      if (successEl) {
        successEl.classList.add('visible');
      }
    });
  }

  /* ── ROADMAP TIMELINE TOGGLE ─────────────────────────── */
  const timelineHeaders = document.querySelectorAll('.timeline-header');
  timelineHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!isExpanded));
      const detailId = header.getAttribute('aria-controls');
      const detail = detailId ? document.getElementById(detailId) : null;
      if (detail) {
        detail.classList.toggle('collapsed', isExpanded);
      }
    });
  });

})();
