/**
 * Gappy Studio — Main UI behaviors
 * - Sticky header scroll state
 * - Mobile menu toggle
 * - Language switch UI
 */
(function () {
  'use strict';

  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    let ticking = false;
    const update = () => {
      if (window.scrollY > 100) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const mobile = document.querySelector('[data-nav-mobile]');
    if (!toggle || !mobile) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      mobile.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
        mobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'メニューを開く');
        mobile.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  function initLangSwitch() {
    document.querySelectorAll('.lang-switch').forEach((group) => {
      const buttons = group.querySelectorAll('.lang-switch__btn');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
        });
      });
    });
  }

  function init() {
    initHeader();
    initMobileMenu();
    initLangSwitch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
