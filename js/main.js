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
  var I18N = window.AMA_I18N;

  function i18n(key) {
    return (I18N && I18N.t) ? I18N.t(key) : '';
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Nav: scrolled state ---------- */
    var nav = document.querySelector('.nav');
    function onScroll() {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Mobile drawer ---------- */
    var toggle = document.querySelector('[data-nav-toggle]');
    var drawer = document.querySelector('.drawer');
    var overlay = document.querySelector('.drawer-overlay');
    var body = document.body;

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      body.classList.remove('drawer-open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', i18n('menu.open'));
      }
    }
    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      body.classList.add('drawer-open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', i18n('menu.close'));
      }
    }

    if (toggle && drawer) {
      toggle.addEventListener('click', function () {
        if (drawer.classList.contains('open')) closeDrawer();
        else openDrawer();
      });
      drawer.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeDrawer();
      });
      if (overlay) overlay.addEventListener('click', closeDrawer);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDrawer();
      });
    }

    /* Keep drawer labels in the selected language */
    document.addEventListener('ama:lang', function () {
      if (toggle) toggle.setAttribute('aria-label', i18n('menu.open'));
    });

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

    /* ---------- Centre list <-> map marker highlight ---------- */
    var centreItems = document.querySelectorAll('.centre-item');
    var mapMarkers = document.querySelectorAll('.malaysia-map .marker');
    function highlightCentre(name) {
      centreItems.forEach(function (el) {
        el.classList.toggle('active', name && el.getAttribute('data-centre') === name);
      });
      mapMarkers.forEach(function (m) {
        m.classList.toggle('active', name && m.getAttribute('data-centre') === name);
      });
    }
    centreItems.forEach(function (el) {
      el.addEventListener('mouseenter', function () { highlightCentre(el.getAttribute('data-centre')); });
      el.addEventListener('mouseleave', function () { highlightCentre(null); });
      el.addEventListener('focus', function () { highlightCentre(el.getAttribute('data-centre')); });
      el.addEventListener('blur', function () { highlightCentre(null); });
    });
    mapMarkers.forEach(function (m) {
      m.addEventListener('mouseenter', function () { highlightCentre(m.getAttribute('data-centre')); });
      m.addEventListener('mouseleave', function () { highlightCentre(null); });
    });

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
    function formStatusHtml(kind) {
      var handle = '@achievers.mind.academy';
      var link = '<a href="' + CFG.INSTAGRAM_URL + '" target="_blank" rel="noopener">' + handle + '</a>';
      if (kind === 'ok') return i18n('form.ok');
      if (kind === 'notconnected') return i18n('form.notconnectedA') + ' ' + link + i18n('form.notconnectedB');
      if (kind === 'error') return i18n('form.errorA') + ' ' + link + i18n('form.errorB');
      return '';
    }

    document.querySelectorAll('form[data-ama-form]').forEach(function (form) {
      /* Localized native validation messages */
      form.addEventListener('invalid', function (e) {
        var f = e.target;
        var msg = '';
        if (f.validity.valueMissing) msg = i18n('form.err.required');
        else if (f.validity.typeMismatch) msg = (f.type === 'email') ? i18n('form.err.email') : i18n('form.err.phone');
        else if (f.validity.badInput) msg = (f.type === 'tel') ? i18n('form.err.phone') : i18n('form.err.required');
        f.setCustomValidity(msg);
      }, true);
      form.addEventListener('input', function (e) {
        if (e.target.setCustomValidity) e.target.setCustomValidity('');
      }, true);
      document.addEventListener('ama:lang', function () {
        form.querySelectorAll('input, select, textarea').forEach(function (f) {
          if (f.setCustomValidity) f.setCustomValidity('');
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) return;
        var status = form.querySelector('.form-status');
        var btn = form.querySelector('button[type="submit"]');
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });

        if (!CFG.FORM_ENDPOINT) {
          if (status) {
            status.className = 'form-status warn';
            status.innerHTML = formStatusHtml('notconnected');
          }
          return;
        }

        if (btn) {
          var original = btn.innerHTML;
          btn.disabled = true;
          btn.textContent = i18n('form.sending');
        }

        fetch(CFG.FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('bad response');
          if (status) {
            status.className = 'form-status ok';
            status.innerHTML = formStatusHtml('ok');
          }
          form.reset();
        }).catch(function () {
          if (status) {
            status.className = 'form-status warn';
            status.innerHTML = formStatusHtml('error');
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