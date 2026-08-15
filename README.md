# RizzSites

Production-ready marketing site for RizzSites, a premium website design and
development studio. Vanilla HTML/CSS/JS, no build step required.

## Structure

```
rizzsites/
├── index.html            Home
├── work/                  Full portfolio (23 projects, client-side filters)
├── services/              Services
├── process/                Process
├── about/                   About
├── faq/                      FAQ (with FAQPage schema)
├── contact/                   Start a Project form
├── project/                    Reusable project detail template (?slug=)
├── 404.html
├── robots.txt / sitemap.xml / site.webmanifest
├── css/                        style.css, responsive.css, animations.css
├── js/                          navigation, portfolio, previews, project,
│                                  faq, forms, cursor, animations, main
├── data/projects.js            Single source of truth for all 23 projects
├── assets/                      Icons, favicon
└── api/contact.js               Contact form endpoint stub
```

## Running locally

Any static file server works, e.g.:

```
npx serve .
```

Opening `index.html` directly via `file://` will mostly work but the ES
module imports (`type="module"`) require an actual HTTP server in most
browsers, so use a local server during development.

## Deployment

Deploy the `rizzsites/` folder as-is to any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages at a custom domain, etc). All internal links
and asset paths are root-relative (`/css/...`, `/work/...`), so the site
should be deployed at the domain root.

Before going live:

- Update `hello@rizzsites.com` to a real inbox everywhere it appears
  (footer, contact page, forms.js).
- Update `https://rizzsites.com` in canonical tags, Open Graph tags, and
  `sitemap.xml`/`robots.txt` to your real domain.
- Add a real `og-cover.jpg` under `assets/images/` and update the
  `og:image` tag in `index.html`.
- Wire up the contact form: deploy `api/contact.js` (or swap in Netlify
  Forms / Formspree) and set `CONTACT_ENDPOINT` in `js/forms.js`. Until
  that's done, the form validates correctly but tells the visitor to email
  directly instead of faking a successful submission.

## Portfolio data

Every project lives in `data/projects.js` as structured data (name,
category, url, specWork flag, description, tags). The Work page and the
`/project/?slug=...` template both render from this file, so adding or
editing a project never requires touching markup.

Live previews lazy-load via `IntersectionObserver` (see `js/previews.js`).
If an external site refuses to be embedded (X-Frame-Options/CSP), the
preview falls back to a monogram card with a "View Live Website" link
rather than showing a broken iframe.

## Notes

- No external UI framework: vanilla HTML/CSS/JS throughout.
- Respects `prefers-reduced-motion` site-wide.
- The four spec-work projects (ClearPath Junk Removal, Great Plains
  Landscape Co., Velora, Aurelius Atelier) are labeled "Spec Work" wherever
  they appear and are never presented as client work.
