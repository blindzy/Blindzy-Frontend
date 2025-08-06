import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*'],
    }),
    tailwind()
  ],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:9000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
});