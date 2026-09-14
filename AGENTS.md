# Agent instructions

## Project overview

Marketing website for Zuraio AI Hub. The **canonical public site** is the static multi-page site in `public/zuraio-comparison/`. Vite also builds a legacy React app in `src/`, but production deploy redirects `/` to the static site.

## Common commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Code layout

- **Main site:** `public/zuraio-comparison/` (HTML, `css/site.css`, `js/copy-*.js`, `js/config.js`)
- Shared assets: `public/zuraio/assets/`
- Legacy React app: `src/app/pages`, `src/app/components`, `src/app/routes.tsx`
- Theme tokens: `src/styles/theme.css`

## Content editing

Prefer updating copy in `public/zuraio-comparison/js/copy-en.js` (and `copy-de.js`, `copy-fr.js`, `copy-it.js`) rather than hardcoding text in HTML.

Homepage hero is locked to option 1 (`HERO_COMPARISON_ENABLED = false` in `js/config.js`).

## Production deploy

**Canonical GitHub repo for zuraio.ch:** `https://github.com/Mcwili/zuraio` (GitHub Actions → Pages, `SITE_BASE_PATH` empty). The `Yevucee/zuraio` remote may remain for history; production pushes go to `Mcwili/zuraio` `main`. Previous Mcwili site snapshot: branch `legacy/mcwili-old-site`.

## Cursor Cloud specific instructions

The cloud environment starts a Vite dev server on port 5173. Preview the marketing site at `/zuraio-comparison/index.html`.

Before finishing a change, run `npm run build` to verify the production build succeeds.

## Contact form relay

Book-a-demo submissions use a Cloudflare Worker in `workers/contact-relay/` (see its README). Set GitHub repository variable **`CONTACT_API_URL`** on **Mcwili/zuraio** to the deployed Worker URL (`https://…workers.dev/api/contact`) so production builds wire the form. Power Automate secrets stay in Cloudflare (`wrangler secret put`), not in this repo.
