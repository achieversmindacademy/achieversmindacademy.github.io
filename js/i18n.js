/* ==========================================================================
   ACHIEVERS MIND ACADEMY — I18N ENGINE
   --------------------------------------------------------------------------
   Centralized translation engine. Works with js/translations.js.

   MARKUP CONVENTIONS
   - data-i18n="key"        → replace textContent (English HTML is the source
                              of truth; switching to 'en' restores it)
   - data-i18n-ph="key"     → replace placeholder attribute
   - data-i18n-aria="key"   → replace aria-label attribute
   - data-i18n-alt="key"    → replace alt attribute
   - data-lang-select       → language dropdown widget (button + menu)
   - data-lang="en|bm|ta"   → option buttons inside the dropdown

   PERSISTENCE
   - stored in localStorage under 'ama-lang'; default 'en'.
   - English is ALWAYS available: it restores the original HTML text.
   ========================================================================== */

(function () {
  'use strict';

  var LANGUAGES = ['en', 'bm', 'ta'];
  var STORAGE_KEY = 'ama-lang';
  var CODES = { en: 'EN', bm: 'BM', ta: 'தமிழ்' };
  var HTML_LANG = { en: 'en', bm: 'ms', ta: 'ta' };

  var defaults = {};     // key -> original HTML text (snapshot before any swap)
  var defaultsPh = {};   // key -> original placeholder
  var current = 'en';

  function persist(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function read() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    return (saved && LANGUAGES.indexOf(saved) > -1) ? saved : 'en';
  }

  function snapshot() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (defaults[key] === undefined) defaults[key] = el.textContent;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (defaultsPh[key] === undefined) defaultsPh[key] = el.getAttribute('placeholder') || '';
    });
  }

  function t(key, lang) {
    var dict = (window.AMA_T && window.AMA_T[lang]) || {};
    return (dict[key] !== undefined && dict[key] !== null) ? dict[key] : null;
  }

  function apply(lang) {
    if (LANGUAGES.indexOf(lang) === -1) lang = 'en';
    current = lang;
    persist(lang);
    document.documentElement.lang = HTML_LANG[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = (lang === 'en') ? defaults[key] : (t(key, lang) || defaults[key]);
      if (text !== undefined && el.textContent !== text) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      var text = (lang === 'en') ? defaultsPh[key] : (t(key, lang) || defaultsPh[key]);
      if (text !== undefined && el.getAttribute('placeholder') !== text) el.setAttribute('placeholder', text);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var text = (lang === 'en') ? null : t(key, lang);
      if (text) el.setAttribute('aria-label', text);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      var text = (lang === 'en') ? null : t(key, lang);
      if (text) el.setAttribute('alt', text);
    });

    document.querySelectorAll('[data-lang-code]').forEach(function (el) {
      el.textContent = CODES[lang];
    });

    document.querySelectorAll('.lang-menu [data-lang]').forEach(function (btn) {
      btn.classList.toggle('current', btn.getAttribute('data-lang') === lang);
    });

    /* Reflect in the form's "preferred language" select when it matches */
    document.querySelectorAll('select[name="language"]').forEach(function (sel) {
      var opt = sel.querySelector('option[value="' + lang + '"]');
      if (opt) opt.selected = true;
    });

    document.dispatchEvent(new CustomEvent('ama:lang', { detail: { lang: lang } }));
  }

  /* ------------------------- dropdown widget ------------------------- */
  function wireDropdown(root) {
    var toggle = root.querySelector('[data-lang-toggle]');
    var menu = root.querySelector('.lang-menu');
    if (!toggle || !menu) return;

    function open() {
      root.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      root.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      root.classList.contains('open') ? close() : open();
    });

    root.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        apply(btn.getAttribute('data-lang'));
        close();
      });
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    snapshot();
    document.querySelectorAll('[data-lang-select]').forEach(wireDropdown);
    apply(read());
  });

  window.AMA_I18N = {
    get: function () { return current; },
    set: apply,
    t: function (key, lang) { return t(key, lang || current) || t(key, 'en') || ''; }
  };
})();