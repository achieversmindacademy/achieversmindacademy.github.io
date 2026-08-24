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
  WHATSAPP_NUMBER: '60102027575',
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
    
    /* ---------- Service section scroll indicators ---------- */
    var serviceSections = document.querySelectorAll('.service-section');
    if (serviceSections.length > 0) {
      var serviceObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Update service indicator if exists
            var serviceIndex = entry.target.getAttribute('data-service-index');
            if (serviceIndex) {
              updateServiceIndicator(serviceIndex);
            }
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.3 });
      
      serviceSections.forEach(function (section) {
        serviceObserver.observe(section);
      });
    }
    
    // Service indicator update function
    function updateServiceIndicator(index) {
      var indicator = document.querySelector('.service-indicator');
      if (indicator) {
        indicator.textContent = '0' + index + ' / 06';
      }
    }

    /* ---------- Static map markers: no hover tracking. Centres are identified
       by the numbered markers and the matching numbered list (01–09). ---------- */

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
    document.querySelectorAll('.photo-grid img, .split-media img, .aw-photo img').forEach(function (img) {
      img.addEventListener('click', function (e) {
        var link = img.closest('a');
        if (link && link.getAttribute('href')) {
          e.preventDefault();
          openLightbox(link.getAttribute('href'), img.getAttribute('alt'));
        } else {
          openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
        }
      });
    });
    document.body.appendChild(lb);

    /* ---------- WhatsApp buttons (shown when number configured) ---------- */
    var waLinks = document.querySelectorAll('[data-whatsapp-link]');
    var waBlocks = document.querySelectorAll('[data-whatsapp]');
    if (CFG.WHATSAPP_NUMBER) {
      waLinks.forEach(function (el) {
        el.href = 'https://api.whatsapp.com/send?phone=' + CFG.WHATSAPP_NUMBER +
          '&text=' + encodeURIComponent(el.getAttribute('data-whatsapp-text') || 'Hello, I would like to know more about Achievers Mind Academy.');
        el.style.display = '';
      });
      waBlocks.forEach(function (el) { el.hidden = false; el.style.display = ''; });
    } else {
      waLinks.forEach(function (el) { el.style.display = 'none'; });
      waBlocks.forEach(function (el) { el.hidden = true; el.style.display = 'none'; });
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

    /* ---------- FAQ accordion (one open at a time) ---------- */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          var q = other.querySelector('.faq-q');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ==========================================================
     ENHANCEMENTS — scroll progress, back-to-top, count-up,
     map sync, memory challenge. All progressive enhancement:
     pages work fully without any of this.
     ========================================================== */
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Scroll progress bar ---------- */
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;
    function paintBar() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - window.innerHeight) || 1;
      bar.style.transform = 'scaleX(' + (window.scrollY / max) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paintBar); }
    }, { passive: true });
    paintBar();

    /* ---------- Back to top ---------- */
    var toTop = document.createElement('button');
    toTop.type = 'button';
    toTop.className = 'to-top';
    toTop.setAttribute('aria-label', 'Back to top');
    toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(toTop);
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });
    function paintTop() { toTop.classList.toggle('show', window.scrollY > 700); }
    window.addEventListener('scroll', paintTop, { passive: true });
    paintTop();

    /* ---------- Count-up stats ---------- */
    function countUp(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      if (isNaN(target)) return;
      if (REDUCED) { el.textContent = target.toFixed(decimals); return; }
      var dur = 1300, t0 = null;
      function frame(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      if ('IntersectionObserver' in window) {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              countUp(entry.target);
              cio.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { cio.observe(el); });
      } else {
        counters.forEach(countUp);
      }
    }

    /* ---------- Map <-> centre list sync ---------- */
    var map = document.querySelector('.malaysia-map');
    if (map) {
      var markers = map.querySelectorAll('.marker[data-centre]');
      var items = document.querySelectorAll('.centre-item[data-centre]');
      function setHot(name, on) {
        markers.forEach(function (m) {
          m.classList.toggle('hot', on && m.getAttribute('data-centre') === name);
          m.classList.toggle('dim', on && m.getAttribute('data-centre') !== name);
        });
        items.forEach(function (it) {
          it.classList.toggle('hot', on && it.getAttribute('data-centre') === name);
        });
      }
      markers.forEach(function (m) {
        var name = m.getAttribute('data-centre');
        m.addEventListener('mouseenter', function () { setHot(name, true); });
        m.addEventListener('mouseleave', function () { setHot(name, false); });
      });
      items.forEach(function (it) {
        var name = it.getAttribute('data-centre');
        it.addEventListener('mouseenter', function () { setHot(name, true); });
        it.addEventListener('mouseleave', function () { setHot(name, false); });
      });
    }

    /* ---------- Memory challenge ---------- */
    document.querySelectorAll('[data-mem-game]').forEach(function (game) {
      var grid = game.querySelector('[data-mem-grid]');
      var status = game.querySelector('[data-mem-status]');
      var score = game.querySelector('[data-mem-score]');
      var startBtn = game.querySelector('[data-mem-start]');
      var cta = game.querySelector('[data-mem-cta]');
      if (!grid || !status || !startBtn) return;

      var SYMBOLS = ['\uD83E\uDDE0', '\u2B50', '\uD83C\uDFAF', '\uD83D\uDD22', '\uD83C\uDCCF', '\u231B'];
      var SHOW_MS = 3500;
      var seq = [], pos = 0, lock = false;
      var t = function (key, fallback) {
        return (window.AMA_I18N && AMA_I18N.t(key)) || fallback;
      };

      function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
      }

      function card(btn, symbol, state) {
        btn.className = 'mem-card' + (state ? ' ' + state : '');
        btn.innerHTML = '<span class="mem-face mem-front">' + symbol + '</span><span class="mem-face mem-back"></span>';
        btn.type = 'button';
        btn.disabled = state !== 'recall';
        return btn;
      }

      function showPhase() {
        lock = true;
        score.textContent = '';
        cta.hidden = true;
        startBtn.hidden = true;
        status.textContent = t('mem.status.memorize', 'Memorise the order\u2026');
        grid.innerHTML = '';
        seq = shuffle(SYMBOLS.slice());
        seq.forEach(function (sym) {
          var b = document.createElement('button');
          card(b, sym, 'up');
          grid.appendChild(b);
        });
        setTimeout(recallPhase, REDUCED ? 2000 : SHOW_MS);
      }

      function recallPhase() {
        pos = 0;
        lock = false;
        status.textContent = t('mem.status.recall', 'Now click them back in the same order.');
        grid.innerHTML = '';
        shuffle(seq.slice()).forEach(function (sym) {
          var b = document.createElement('button');
          card(b, sym, 'recall');
          b.setAttribute('aria-label', 'Hidden card');
          b.addEventListener('click', function () { pick(b, sym); });
          grid.appendChild(b);
        });
      }

      function pick(btn, sym) {
        if (lock || btn.disabled) return;
        if (sym === seq[pos]) {
          pos++;
          card(btn, sym, 'up correct');
          btn.disabled = true;
          if (pos === seq.length) finish(true);
        } else {
          lock = true;
          card(btn, sym, 'up wrong');
          finish(false);
        }
      }

      function finish(won) {
        lock = true;
        var n = pos;
        score.textContent = n + ' / ' + seq.length;
        if (won) {
          status.textContent = t('mem.status.win', 'Perfect \u2014 6 out of 6! Now imagine doing it blindfolded.');
          cta.hidden = false;
        } else {
          status.textContent = t('mem.status.fail', 'You got {n} of 6 before the chain broke \u2014 this is exactly the gap training closes.').replace('{n}', n);
          cta.hidden = false;
        }
        startBtn.textContent = t('mem.again', 'Play again');
        startBtn.hidden = false;
      }

      startBtn.addEventListener('click', showPhase);
    });
  });
})();