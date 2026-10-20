// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://matthewjwhittle.github.io',
  base: '/',
  trailingSlash: 'always',
  integrations: [react()],
  output: 'static',
  redirects: {
    '/about/': '/#about',
  },
});
