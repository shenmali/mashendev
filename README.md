# mashen.dev

Personal portfolio for **M. Ali ŞEN** — AI/ML Engineer & Data Scientist.  
Built with Astro 5 + Tailwind 4 + selective React islands for interactive Matrix effects.

## Stack

- **Astro 5** (static SSG, tri-lingual routing `en` / `tr` / `nl`)
- **Tailwind 4** (JIT, CSS variables from design tokens)
- **React islands** for Matrix rain canvas, Tweaks panel, Konami easter egg
- **Cloudflare Pages** deploy (custom domain: mashen.dev)

## Develop

```bash
pnpm install   # or npm / yarn
pnpm dev       # http://localhost:4321
```

## Build

```bash
pnpm build     # outputs to ./dist
pnpm preview   # local preview of the build
```

## Deploy to Cloudflare Pages

1. Connect repo to Cloudflare Pages
2. Build command: `pnpm build`
3. Output dir: `dist`
4. Add custom domain `mashen.dev` in the Pages dashboard
5. No environment variables needed

## i18n

- `/`      → English (default)
- `/tr/`   → Türkçe
- `/nl/`   → Nederlands

Content lives in `src/content/portfolio.ts` keyed by locale.

## Assets to supply

Drop these into `public/` before the first build:

- `cv.pdf`       — résumé download
- `og-image.png` — 1200×630 social card
- `favicon.svg`  — already shipped, edit if you like

## Easter egg

Press **↑ ↑ ↓ ↓ ← → ← → B A** anywhere on the site. You know what happens.
