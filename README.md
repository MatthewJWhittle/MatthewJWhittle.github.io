# Matthew Whittle — GitHub Pages portfolio

Astro + React islands portfolio styled with **Signal Grid**. Built for a quiet job search: interactive CV shell and prototype project demos.

## Local preview

Requires Node `>= 22.22`.

```bash
npm ci
npm run dev
```

Open the URL printed by Astro (usually `http://localhost:4321`).

```bash
npm run build
npm run preview
```

## GitHub Pages

- Static output: `dist/`
- Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on push to `master` and deploys with the official Pages actions (no extra secrets).
- In the repo **Settings → Pages**, set **Source** to **GitHub Actions** once before the first deploy lands.

Site URL: <https://matthewjwhittle.github.io>

## What’s real vs placeholder

| Real | Placeholder |
| --- | --- |
| Stack, Signal Grid design, layout, motion | Project case studies / employer history |
| Interactive demo islands (toy data) | Preferred email / broader social links |
| GitHub profile link | Full About / CV narrative |
