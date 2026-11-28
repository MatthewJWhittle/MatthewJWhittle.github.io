// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

/**
 * Production canonical host is username.github.io (root site → base `/`).
 * On Cloudflare Pages builds, CF_PAGES_URL is the deployment host so preview
 * canonicals and absolute URLs match the preview, not github.io.
 */
const site =
  process.env.CF_PAGES_URL || 'https://matthewjwhittle.github.io';

// https://astro.build/config
export default defineConfig({
  site,
  base: '/',
  trailingSlash: 'always',
  integrations: [mdx()],
  output: 'static',
  redirects: {
    '/about/': '/#about',
    '/work/sheffield-bats/': '/work/bat-habitat-yorkshire/',
  },
});
