// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://t48-pressure-transducer.pages.dev',
  vite: {
    plugins: [tailwindcss()]
  }
});