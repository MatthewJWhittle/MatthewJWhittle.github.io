# Matthew Whittle — personal site

Static **Astro** (+ optional React islands) site on GitHub Pages.

## Local development

Requires Node `>= 22.22`.

```bash
npm ci
npm run dev
```

Then open the URL Astro prints (usually `http://localhost:4321`).

```bash
npm run build
npm run preview
```

## Content

The live site is a single long-scroll page (`src/pages/index.astro`). Work and notes case studies can be authored under `src/content/` (keep `draft: true` until ready). Detail routes under `/work/[slug]/` and `/notes/[slug]/` remain for when content is published.

## Deploy

`.github/workflows/deploy.yml` builds `dist/` on push to `master`. Set **Settings → Pages → Source: GitHub Actions** once. No extra secrets required.
