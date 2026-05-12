/**
 * Gappy Studio — Smooth scroll for anchor links
 * Adjusts for the fixed header height.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector('[data-header]');
      const headerH = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;

      window.scrollTo({
        top: y,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      // Close mobile menu if open
      const mobile = document.querySelector('[data-nav-mobile]');
      const toggle = document.querySelector('[data-menu-toggle]');
      if (mobile && mobile.classList.contains('is-open')) {
        mobile.classList.remove('is-open');
        mobile.setAttribute('aria-hidden', 'true');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
