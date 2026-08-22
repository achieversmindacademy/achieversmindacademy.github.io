/* ==========================================================
   ACHIEVERS MIND ACADEMY — SERVICES SCRIPTS
   Accordion (PBB90 modules), programme-nav scroll spy.
   ========================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Accordions (.acc) — one open at a time ---------- */
    var accItems = Array.prototype.slice.call(document.querySelectorAll('.acc-item'));
    accItems.forEach(function (item) {
      var btn = item.querySelector('.acc-btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        accItems.forEach(function (other) {
          other.classList.remove('open');
          var b = other.querySelector('.acc-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
    /* Open the first module by default */
    if (accItems.length && accItems[0].querySelector('.acc-btn')) {
      accItems[0].classList.add('open');
      accItems[0].querySelector('.acc-btn').setAttribute('aria-expanded', 'true');
    }

    /* ---------- Programme quick-nav scroll spy ---------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.prog-nav a[href^="#"]'));
    if (navLinks.length && 'IntersectionObserver' in window) {
      var map = {};
      navLinks.forEach(function (a) {
        var id = a.getAttribute('href').slice(1);
        var sec = document.getElementById(id);
        if (sec) map[id] = a;
      });

      function setActive(id) {
        navLinks.forEach(function (a) {
          a.classList.toggle('active', !!id && a.getAttribute('href') === '#' + id);
        });
      }

      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-38% 0px -55% 0px' });

      Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });

      /* Clear the highlight when scrolled back above the first section */
      var firstSec = document.getElementById(navLinks[0].getAttribute('href').slice(1));
      if (firstSec) {
        window.addEventListener('scroll', function () {
          if (window.scrollY < firstSec.offsetTop - 160) setActive(null);
        }, { passive: true });
      }
    }
  });
})();
