/**
 * Gappy Studio — Scroll Animation
 * IntersectionObserver-based reveal system.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    const targets = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    // Chat-mock special trigger
    const chatMock = document.querySelector('.chat-mock');
    if (chatMock) {
      const chatObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              chatMock.classList.add('is-visible');
              chatObserver.unobserve(chatMock);
            }
          });
        },
        { threshold: 0.3 }
      );
      chatObserver.observe(chatMock);
    }

    // Team stat card
    const statCard = document.querySelector('.team__stat-card');
    if (statCard) {
      const statObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              statCard.classList.add('is-revealed');
              statObserver.unobserve(statCard);
            }
          });
        },
        { threshold: 0.2 }
      );
      statObserver.observe(statCard);
    }

    // Parallax (subtle) for team image
    const parallax = document.querySelectorAll('[data-parallax]');
    if (parallax.length && !prefersReducedMotion) {
      let ticking = false;
      const update = () => {
        parallax.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top < vh && rect.bottom > 0) {
            const progress = (vh - rect.top) / (vh + rect.height);
            const offset = (progress - 0.5) * 40;
            const img = el.querySelector('img');
            if (img) {
              img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
            }
          }
        });
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
