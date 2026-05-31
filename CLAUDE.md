# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing/landing site for the mobile game **Tiny Boo: Homecoming** (tinyboohomecoming.com). Built with SvelteKit (Svelte 3), prerendered to fully static HTML, and deployed to Firebase Hosting. There is no backend — `ssr` is disabled and `prerender` is on (`src/routes/+layout.js`), so everything ships as a static SPA fallback (`index.html`).

## Commands

```bash
npm run dev          # vite dev server
npm run build        # static build into ./build (precompressed, index.html fallback)
npm run preview      # serve the production build locally
npm run check        # svelte-kit sync + svelte-check type checking (uses jsconfig.json)
npm run lint         # prettier --check, then eslint --fix
npm run format       # prettier --write across the repo
npm run sitemap      # regenerate static/sitemap.xml via svelte-sitemap (run against a live/preview build)
npm run deploy:hosting   # firebase deploy (project: tiny-boo-homecoming-70022627)
```

There is no test suite. `npm run check` (type-checking) is the closest thing to validation — run it after non-trivial changes.

## Architecture

- **Routes** (`src/routes/`): three pages — `/` (the landing page), `/privacy-policy`, `/support`. Each route directory pairs a `+page.svelte` with a `+layout.js` that re-declares `ssr = false` / `prerender = true`.
- **The home page (`src/routes/+page.svelte`)** is the bulk of the site. It composes the components below and owns two interactions: a mouse-driven parallax (`mouseX`/`mouseY` passed into `<Backgrounds>`) and a click-spawned firefly particle effect.
- **Components** (`src/components/`): `backgrounds`, `footer`, `logo`, `music`, `video`. Imported with relative paths in practice, though `#components` etc. aliases exist (see below).
- **Firefly canvas effect** (`src/utils/firefly.js`): `startFirefly(canvas)` is called in `onMount`; `createFirefly(event, count)` spawns particles on click. Drives the `<canvas id="canvas">` on the home page.
- **Preloader**: lives in `src/app.html` markup + `static/preloader.css` (loaded via a plain `<link>`, outside the Svelte pipeline). The animated firefly preloader shows before hydration.
- **`src/app.html`** holds all SEO/OG/Twitter meta tags and the Google Tag Manager snippet (`GTM-T2XLCMXG`). Update meta tags here, not in route files.

## Styling

Styles are **SASS (indented `.sass` syntax, not `.scss`)**, preprocessed via `svelte-preprocess` with `includePaths: ['src']`.

- Global styles enter through `src/styles/main.sass` (imported in the layout and page). It pulls in `shared/_vars.sass`, `shared/helpers`, `shared/responsive`, and `typography`.
- **Always use the shared mixins** rather than hand-rolling layout/colors:
  - `shared/helpers.sass` — large library of flex mixins (`+flex_center`, `+flex_start_column`, …), plus `+square`, `+circle`.
  - `shared/responsive.sass` — breakpoint mixins (`+mobile-xl`, `+tablet`, `+desktop`, `+desktop-l`, …) and orientation mixins (`+landscape`, `+portrait`). Breakpoints are min-width / mobile-first. Note each breakpoint mixin emits **both** `any-hover: hover` and `any-hover: none` media queries (except `desktop` which is hover-only, `desktop-touch` which is touch-only) — this duplication is intentional.
  - `shared/_vars.sass` — breakpoint values, `$uicolor_*` colors, `$main_font_family`.
- Component `<style lang="sass">` blocks re-import `_vars.sass` to access variables/mixins locally.

## Conventions (enforced by eslint + prettier)

- **Tabs** for indentation, **single quotes**, **no semicolons**, `trailingComma: none`, `printWidth: 100`.
- Run `npm run format` / `npm run lint` before committing; eslint uses the legacy `svelte3` plugin.

## Path aliases (`vite.config.js`)

`@` → `src`, `#components` → `src/components`, `#utils` → `src/utils`, `#store` → `src/store`, `#icon` → `static/icons`, `#root` → repo root.

## Static assets

`static/` is served at the web root: `app-ads.txt`, `robots.txt`, `sitemap.xml`, favicons, OG image (`tiny_boo_og.jpg`), plus `bgs/`, `images/`, `music/`. App-store links and the GTM ID are hardcoded in the home page / `app.html`.
