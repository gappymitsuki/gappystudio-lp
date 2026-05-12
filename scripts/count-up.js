/**
 * Gappy Studio — Count-up animation
 * Animates numerical values from 0 to data-count-to when the element enters view.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function formatNumber(value, decimals) {
    if (decimals > 0) return value.toFixed(decimals);
    // Insert thousands separator for >= 1000 if no decimals
    return Math.round(value).toLocaleString('en-US');
  }

  function animate(el) {
    const target = parseFloat(el.dataset.countTo);
    const decimals = parseInt(el.dataset.countDecimals || '0', 10);
    const suffix = el.dataset.countSuffix || '';
    const duration = parseInt(el.dataset.countDuration || '1400', 10);

    if (Number.isNaN(target)) return;

    if (prefersReducedMotion) {
      el.textContent = formatNumber(target, decimals) + suffix;
      return;
    }

    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutExpo(progress);
      const value = target * eased;
      el.textContent = formatNumber(value, decimals) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target, decimals) + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  function init() {
    const targets = document.querySelectorAll('[data-count-up]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
