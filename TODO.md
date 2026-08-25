# Achievers Mind Academy — Website Rebuild

## Done
- [x] Full strategic rebuild around the real business (memory & learning skills academy, free-preview funnel)
- [x] Verified facts only: founder credentials, registration, HQ, regions, community venues, official social handles
- [x] Removed all fabricated content (fake stats, fake testimonials, fake team, fake pricing, fake phone/email)
- [x] Primary CTA "Join a Free Preview" throughout (hero, programme, preview, final CTA, mobile sticky bar)
- [x] 6-page structure: Home, About, Programmes, Achievements, Experience, Contact
- [x] Premium editorial design system (Fraunces + Inter, ink/brass palette, real photography)
- [x] Blue-dominant brand redesign: logo-anchored blue palette, Plus Jakarta Sans + Inter, premium header, mobile drawer
- [x] No external JS (no GSAP, no icon CDN), minimal vanilla JS
- [x] Responsive WebP/JPEG image optimization (2.6–3.3MB → 49–139KB)
- [x] Lazy loading, IntersectionObserver reveals, lightbox, reduced-motion support
- [x] Full i18n system: EN native in HTML + complete BM/Tamil dictionaries in js/translations.js, on-the-fly switching, persisted choice
- [x] Awards section live: Master Alagan's honours (Aryavarta World Record, TSA Rashtriya Samman 2023, AMBR MAA 2024) + academy recognition (Yoga University of the Americas affiliation, AMBR National Record plaque) with certificate photos, IDs, dates and source links
- [x] Interactivity pass: 30-second memory challenge game (home), count-up stats, interactive Malaysia map <-> centre list sync, scroll progress bar, back-to-top button, hover micro-interactions
- [x] De-duplication pass: founder creds (home -> about only), preview agenda (home 3-step teaser -> experience full agenda), centres list (home map only), gallery sections merged (home), social cards (home + contact only), achievements page focused on records + awards, about methodology rewritten as 4-beat teaching method
- [x] Fix pass: removed "Built with the community" section (about), header brand no longer shifts on services pages (nav/footer keep main container width), circle+tick lists rebuilt as pixel-perfect SVG badges everywhere (experience register, marshal page, MMCP), map cropped to Peninsular Malaysia, centre-name hover changed from slide to clean colour highlight
- [x] Services page fully translated: 165 new keys each in BM and Tamil covering hero, all six programme blocks, quick nav, which-programme guide and final CTA
- [x] Forms wired to configurable endpoint with honest unconfigured state
- [x] WhatsApp buttons config-gated (hidden until real number provided)
- [x] GitHub Actions Pages deployment workflow + .nojekyll

## Waiting on client assets
- [ ] Real portrait of Master Alagan (currently a session photograph with comment marker)
- [ ] Official WhatsApp number (buttons hidden until provided)
- [ ] Official Facebook page URL (links hidden until provided)
- [ ] Form backend endpoint (forms show honest notice until connected)
- [ ] KPM certificate/documentation image if available
- [ ] Real student achievement stories/records for the Achievements page
- [ ] Headless-browser QA of the language switcher across all pages
- [ ] Services sub-pages (basic-smp, SMP, MMCP, holiday camp, adult, PBB90 detail pages) are still English-only — main services page is fully translated (EN/BM/TA)
- [x] Brand tagline is now "Pathway to Genius" across all pages and languages
- [x] Home: removed floating preview chip; messy centres map replaced with a clean Kulim-to-Skudai journey line (HQ badge on Rawang)
- [x] Student photos added to all 15 record cards (Guinness official photo for Punithamalar, AMBR official PDF for the 13, school page for Oviya)
- [x] Services facts: text no longer touches divider lines (desktop + mobile)
- [x] Spacing tightened: main sections clamp(4-6.5rem -> 3.4-5.25rem), services --sv-pad clamp(80-140px -> 56-96px)
- [x] Scroll check: only standard smooth anchor scrolling exists (reduced-motion aware); no scroll-speed manipulation anywhere