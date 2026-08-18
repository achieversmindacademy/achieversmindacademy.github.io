/* ==========================================================
   AMA — LIGHTWEIGHT I18N ARCHITECTURE
   ----------------------------------------------------------
   English is the default (content lives in the HTML).
   Add Bahasa Malaysia / Tamil by extending the dictionaries
   in js/lang/. Keys not present in a dictionary fall back to
   the English HTML text, so partial translations are safe.

   To mark a string as translatable:
     <h1 data-i18n="hero.title">...</h1>

   The language switcher (buttons with data-lang) persists the
   choice in localStorage and applies it on the next visit.
   ========================================================== */

(function () {
  'use strict';

  var DICTS = {};
  var CURRENT = 'en';

  function register(code) {
    DICTS[code] = window['AMA_LANG_' + code.toUpperCase()] || {};
  }

  function t(key) {
    var dict = DICTS[CURRENT];
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    return null;
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var txt = t(el.getAttribute('data-i18n'));
      if (txt !== null && txt !== '') {
        el.textContent = txt;
      }
    });

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === CURRENT);
    });

    document.documentElement.lang = CURRENT === 'en' ? 'en' : CURRENT;
  }

  function setLang(code) {
    if (!DICTS[code]) return;
    CURRENT = code;
    try { localStorage.setItem('ama-lang', code); } catch (e) { /* private mode */ }
    apply();
  }

  window.I18N = {
    register: register,
    setLang: setLang,
    t: t,
    apply: apply,
    current: function () { return CURRENT; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    ['en', 'bm', 'ta'].forEach(register);

    var saved = null;
    try { saved = localStorage.getItem('ama-lang'); } catch (e) { /* ignore */ }
    var wanted = saved || (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (DICTS[wanted]) CURRENT = wanted;

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });

    apply();
  });
})();