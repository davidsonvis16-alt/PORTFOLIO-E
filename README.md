# Eden.

A one-person digital studio portfolio — built with React, Vite, React Router and
Framer Motion.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # regenerates SEO files, then builds to dist/
npm run preview  # serve the production build
npm run lint
```

## Set your domain before deploying

`sitemap.xml` and `robots.txt` are generated at build time and need the real
public URL. Set `SITE_URL` once as an environment variable on your host (or
inline for a local build):

```bash
SITE_URL=https://your-domain.co.ke npm run build
```

Without it, the default in `scripts/generate-seo.mjs` is used. Canonical and
Open Graph URLs on individual pages are derived from the browser's own origin,
so those are always correct.

## Editing content

Almost everything a person would want to change lives in two files:

| File | What's in it |
| --- | --- |
| `src/data/site.js` | Brand, contact links, WhatsApp messages, navigation, trust band, "why a website", process, capabilities, pricing |
| `src/data/projects.js` | Every project, and the case-study copy behind `/work/<slug>` |

**Contact details** — WhatsApp number, Instagram, email and GitHub — are in
`CONTACT` in `src/data/site.js`. Changing the number there updates every
WhatsApp button on the site, pre-filled messages included.

### Adding a project

1. Add an entry to `PROJECTS` in `src/data/projects.js` with a unique `slug`.
2. Put screenshots in `public/work/` named `<slug>-1600.webp`, `<slug>-1600.jpg`,
   `<slug>-800.webp`, `<slug>-800.jpg`. Leave `image` out and a typographic
   placeholder is used instead.
3. Set `featured: true` for the large treatment at the top of the work section.
4. Fill in `study` when you have the case-study copy. Any field you leave out is
   simply not rendered — the page never invents a section.

The "projects shipped" figure in the trust band is counted from the projects
that have a live URL, so it stays honest on its own.

## Structure

```
src/
  data/        content — projects and site copy
  lib/         hooks, the shared motion vocabulary, per-route SEO
  components/  nav, footer, cursor, reveals, icons, page transition
  sections/    the home page sections, reused by the stand-alone routes
  pages/       route components
  index.css    the whole design system: tokens, then components in page order
```

Each section is written once and used both on the long-form home page and on its
own route (`/about`, `/why`, `/process`, `/work`, `/skills`, `/pricing`), with a
`standalone` prop switching its heading to an `h1`.

## Hosting

`vercel.json` and `public/_redirects` route every path back to `index.html`, so
deep links such as `/work/bakemart` work on Vercel and Netlify. Any other host
needs the same single-page-app fallback.
