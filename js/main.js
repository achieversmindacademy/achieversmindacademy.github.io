/* ==========================================================
   ACHIEVERS MIND ACADEMY — MAIN SCRIPT (minimal, no deps)
   ========================================================== */

/* ------------------------------------------------------------------
   INTEGRATION CONFIG
   ------------------------------------------------------------------
   FORM_ENDPOINT    — set to your form backend (Formspree, FormSubmit,
                      your own API...) that accepts JSON POST:
                      { name, phone, child, age, location, language, source, message }
                      Leave empty until connected. While empty, the form
                      shows an honest notice instead of pretending to send.

   WHATSAPP_NUMBER  — official business WhatsApp number in international
                      format, digits only, e.g. '60123456789'.
                      Leave empty until provided; all WhatsApp buttons
                      stay hidden until a number is configured.

   FACEBOOK_URL     — official Facebook page URL. Hidden until provided.

   Instagram / TikTok URLs are derived from the official handles
   supplied by the academy (@achievers.mind.academy).
   ------------------------------------------------------------------ */
var AMA_CONFIG = {
  FORM_ENDPOINT: '',
  WHATSAPP_NUMBER: '',
  FACEBOOK_URL: '',
  INSTAGRAM_URL: 'https://www.instagram.com/achievers.mind.academy',
  TIKTOK_URL: 'https://www.tiktok.com/@achievers.mind.academy'
};

(function () {
  'use strict';

  var CFG = AMA_CONFIG;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Nav: scrolled state ---------- */
    var nav = document.querySelector('.nav');
    function onScroll() {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Mobile nav toggle ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        links.classList.toggle('open');
      });
      links.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') links.classList.remove('open');
      });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Lightbox ---------- */
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><img alt="">';
    var lbImg = lb.querySelector('img');
    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.classList.add('open');
    }
    function closeLightbox() { lb.classList.remove('open'); }
    lb.addEventListener('click', closeLightbox);
    lb.querySelector('.lb-close').addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
    document.querySelectorAll('.photo-grid img, .split-media img').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
      });
    });
    document.body.appendChild(lb);

    /* ---------- WhatsApp buttons (hidden until number configured) ---------- */
    var waButtons = document.querySelectorAll('[data-whatsapp]');
    if (CFG.WHATSAPP_NUMBER) {
      waButtons.forEach(function (el) {
        el.href = 'https://wa.me/' + CFG.WHATSAPP_NUMBER +
          '?text=' + encodeURIComponent(el.getAttribute('data-whatsapp-text') || 'Hello, I would like to know more about Achievers Mind Academy.');
      });
    } else {
      waButtons.forEach(function (el) { el.style.display = 'none'; });
    }

    /* ---------- Facebook link (hidden until URL provided) ---------- */
    document.querySelectorAll('[data-facebook]').forEach(function (el) {
      if (!CFG.FACEBOOK_URL) {
        el.style.display = 'none';
      } else {
        el.href = CFG.FACEBOOK_URL;
      }
    });

    /* ---------- Forms ---------- */
    document.querySelectorAll('form[data-ama-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var status = form.querySelector('.form-status');
        var btn = form.querySelector('button[type="submit"]');
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });

        if (!CFG.FORM_ENDPOINT) {
          if (status) {
            status.className = 'form-status warn';
            status.innerHTML = 'Thank you — this form is being connected to our registration system. ' +
              'For an immediate response, please message us on Instagram ' +
              '<a href="' + CFG.INSTAGRAM_URL + '" target="_blank" rel="noopener">@achievers.mind.academy</a>.';
          }
          return;
        }

        if (btn) {
          var original = btn.innerHTML;
          btn.disabled = true;
          btn.textContent = 'Sending…';
        }

        fetch(CFG.FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('bad response');
          if (status) {
            status.className = 'form-status ok';
            status.innerHTML = 'Thank you! Your registration of interest has been received. ' +
              'Our team will contact you about the next preview session.';
          }
          form.reset();
        }).catch(function () {
          if (status) {
            status.className = 'form-status warn';
            status.innerHTML = 'We could not reach the registration system just now. ' +
              'Please try again shortly, or message us on Instagram ' +
              '<a href="' + CFG.INSTAGRAM_URL + '" target="_blank" rel="noopener">@achievers.mind.academy</a>.';
          }
        }).finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = original;
          }
        });
      });
    });

    /* ---------- Footer year ---------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  });
})();