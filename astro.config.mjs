import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://mashen.dev',
  output: 'static',
  // If deploying via Cloudflare Pages static build, adapter not needed.
  // If you need SSR later, uncomment next line:
  // adapter: cloudflare(),
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', tr: 'tr', nl: 'nl' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'nl'],
    routing: {
      prefixDefaultLocale: false, // EN at /, TR at /tr, NL at /nl
    },
  },
});
