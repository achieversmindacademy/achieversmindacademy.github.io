# Achievers Mind Academy — Website

Official website for **Achievers Mind Academy**, a Malaysian educational enrichment academy specialising in memory training, learning skills and cognitive development for students (Super Memory Programme, Standard 4 – Form 5).

## Pages

- `index.html` — Home (hero → why we're different → free preview → Super Memory Programme → demonstrations → founder → achievements → Malaysia map → social → final CTA)
- `about.html` — Story, founder (Master Alagan Govindan), methodology, recognition, community, corporate information
- `programmes.html` — redirect stub to `services/index.html` (kept for old links, noindexed)
- `achievements.html` — world records (Guinness WR, World Book of Records), 27 AMBR national record directory, awards panels (AMA / Master Alagan), demonstrations, social channels
- `experience.html` — Free preview funnel + preview registration form
- `contact.html` — Channels, headquarters, general enquiry form

## Tech

Static HTML/CSS/JS. No framework, no build step, no external JS dependencies.
Deployed via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages.

## Integration configuration

All third-party integrations are configured in one place: **`js/main.js` → `AMA_CONFIG`**.

| Setting | Purpose |
|---|---|
| `FORM_ENDPOINT` | JSON POST endpoint for the preview/general forms. Leave empty until connected — the form then shows an honest "not yet connected" notice instead of pretending to send. |
| `WHATSAPP_NUMBER` | Official business WhatsApp number (digits only, e.g. `60123456789`). WhatsApp buttons are hidden until set. **Do not invent a number.** |
| `FACEBOOK_URL` | Official Facebook page URL. Facebook links are hidden until set. |
| `INSTAGRAM_URL` / `TIKTOK_URL` | Derived from the official handles supplied by the academy. |

## Languages

English is the default and is always available — every HTML page carries the English text natively. Full **Bahasa Malaysia** and **Tamil** dictionaries live in `js/translations.js` (`window.AMA_T`, keyed by `data-i18n` attributes). The engine in `js/i18n.js` swaps text, placeholders, alt text and aria-labels on the fly; missing keys fall back to English automatically. Language choice persists in `localStorage` (`ama-lang`).

## Images

Real event photography is in `images/`. Responsive WebP/JPEG copies are generated in `images/web/` (originals preserved). To regenerate:

```bash
python3 images_optimize.py   # (script kept locally; uses Pillow)
```

## Content notes

Only verified facts are used: registration SSM No. 201703417057, HQ C-6-1 Jalan Mutiara 2, Mutiara Business Park, Selangor; founder Master Alagan Govindan (MSc Training & Development, University of Leicester, UK; 33+ years of Super Memory Programmes); regions Selangor, Johor, Perak, Pahang; community venues YMCA Brickfields, Digital Wave Academy (Klang), Sri Subramaniar Paripalana Saba (Johor); official handles @achievers.mind.academy (Instagram, TikTok).

**Client-supplied assets still needed:**
1. High-quality portrait of Master Alagan (drop into `about.html` founder section and homepage founder section).
2. Official WhatsApp number (for the WhatsApp buttons).
3. Official Facebook page URL.
4. Form backend endpoint (Formspree/FormSubmit/own API).
5. Certificate/documentation image for the KPM approval line, and any student achievement stories/records to enrich the Achievements page.