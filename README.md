# Achievers Mind Academy — Website

Official website for **Achievers Mind Academy**, a Malaysian educational enrichment academy specialising in memory training, learning skills and cognitive development for students (Super Memory Programme, Standard 4 – Form 5).

## Pages

- `index.html` — Home (hero → why we're different → free preview → Super Memory Programme → demonstrations → founder → achievements → Malaysia map → social → final CTA)
- `about.html` — Story, founder (Master Alagan Govindan), methodology, recognition, community, corporate information
- `programmes.html` — Super Memory Programme, student journey, FAQ
- `achievements.html` — Demonstrations in action, official social channels
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

English is the default. Bahasa Malaysia and Tamil dictionaries live in `js/lang/bm.js` and `js/lang/ta.js` (keyed by `data-i18n` attributes). Missing keys fall back to English automatically, so translations can be added progressively. Language choice persists in `localStorage`.

## Images

Real event photography is in `images/`. Responsive WebP/JPEG copies are generated in `images/web/` (originals preserved). To regenerate:

```bash
python3 images_optimize.py   # (script kept locally; uses Pillow)
```

## Content notes

Only verified facts are used: registration 002744992W / 201703417057 (14 Nov 2017), HQ C-6-1 Jalan Mutiara 2, Mutiara Business Park, Selangor; founder Master Alagan Govindan (MSc Training & Development, University of Leicester, UK; 33+ years of Super Memory Programmes); regions Selangor, Johor, Perak, Pahang; community venues YMCA Brickfields, Digital Wave Academy (Klang), Sri Subramaniar Paripalana Saba (Johor); official handles @achievers.mind.academy (Instagram, TikTok).

**Client-supplied assets still needed:**
1. High-quality portrait of Master Alagan (drop into `about.html` founder section and homepage founder section).
2. Official WhatsApp number (for the WhatsApp buttons).
3. Official Facebook page URL.
4. Form backend endpoint (Formspree/FormSubmit/own API).
5. Certificate/documentation image for the KPM approval line, and any student achievement stories/records to enrich the Achievements page.