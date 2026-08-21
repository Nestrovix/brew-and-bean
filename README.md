# Brew & Bean — Premium Café Website (Noida)

Static, dependency-free website · 6 pages + privacy · Vercel-ready · built by Nestrovix.

```
brew-and-bean/
├── index.html            Home (13 sections, exact brief order)
├── menu.html             Menu — 5 categories, live search, filter chips, deep links (#desserts)
├── about.html            Story, timeline, values, team
├── gallery.html          Filterable gallery + lightbox (keyboard + swipe)
├── reservations.html     Table reservation (validated, time slots from opening hours, WhatsApp hand-off)
├── contact.html          Contact form, info cards, map, hours
├── privacy.html          Privacy policy template (noindex)
├── css/style.css         Design system + all styles (tokens at top)
├── js/config.js          ⚠️ BUSINESS DETAILS — edit this first
├── js/menu-data.js       ⚠️ MENU ITEMS & PRICES — edit here
├── js/main.js            Header, nav, data-binding, reveal, lightbox, popular menu
├── js/menu.js            Menu page search/filter
├── js/forms.js           Reservation + contact forms
├── assets/images/        Placeholder images (replace — see table below)
├── assets/fonts/         Self-hosted Fraunces + Work Sans (woff2)
├── assets/og-image.png   Social share card (1200×630)
├── assets/favicon.svg
├── vercel.json · robots.txt · sitemap.xml
└── _build/               Page generator + QA script (not deployed; safe to delete)
```

## 1 · Before launch — replace these
| Where | What |
|---|---|
| `js/config.js` | Phone, WhatsApp number, email, **address**, map embed, Instagram/Facebook URLs, opening hours |
| `js/menu-data.js` | Dish names, descriptions, prices, tags (`popular` controls the home "Guest favourites") |
| `assets/images/*.svg` | Every image is a labelled placeholder. Replace with real photos **keeping the same filename** (or update the path). Recommended sizes are printed on each placeholder. Use WebP/JPG ≤ 300 KB. |
| `index.html` → reviews | Sample reviews — replace with real Google reviews |
| `about.html` | Founder story, timeline years, team names/roles |
| Offers (`index.html`) | Sample offers — edit or remove |
| `privacy.html` | Complete and review |
| `head` URLs | Replace `https://brewandbean.vercel.app/` with the final domain in all pages + `sitemap.xml` + `robots.txt` |
| Schema (`index.html`, `contact.html`) | Update address/phone in the JSON-LD block |

## 2 · Forms — how they work
No backend needed: on submit, the form validates, shows a loading state, then **opens WhatsApp** with a pre-filled message (reservation details / contact message) and shows a success panel.

**Optional email backend:** in `js/forms.js` set `ENDPOINT` to a Formspree URL (`https://formspree.io/f/xxxx`), Web3Forms, or your own API. The form will POST JSON `{type, ...fields}` there **and** open WhatsApp.

## 3 · Deploy to Vercel
1. vercel.com/new → drag this folder (or import a Git repo) → Deploy. No build step.
2. Or CLI: `npm i -g vercel && vercel --prod` from this folder.
`vercel.json` enables clean URLs (`/menu` → menu.html), cache headers, security headers.

## 4 · Customising
- Colours/typography: top of `css/style.css` (`:root` tokens).
- Add a menu category: add to `MENU_CATEGORIES` + items in `menu-data.js` + a placeholder image.
- Sections are plain HTML in `_build/build.py` (regenerate with `python3 _build/build.py`) **or** edit the `.html` files directly.

## 5 · QA performed
Tested on Chromium at 1440 / 1024 / 820 / 390 / 360 px: 0 console errors, 0 broken links, 0 horizontal overflow, all assets load, header transparent→sticky, mobile drawer (open/close/Esc), 2-col mobile menu grid, sticky reserve bar, menu filter/search/deep-link/empty state, gallery filter + lightbox (keys/swipe), reservation validation + slots + stepper + success panel, contact validation, tap targets ≥ 42 px, one H1 per page, all images alt, all inputs labelled, titles/metas/OG/schema present.
