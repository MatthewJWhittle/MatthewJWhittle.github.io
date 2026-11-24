// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://matthewjwhittle.github.io',
  base: '/',
  trailingSlash: 'always',
  integrations: [mdx()],
  output: 'static',
  redirects: {
    '/about/': '/#about',
    '/work/sheffield-bats/': '/work/bat-habitat-yorkshire/',
  },
});
