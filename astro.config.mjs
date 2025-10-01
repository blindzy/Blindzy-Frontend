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
        // Only proxy specific API routes, not all /api requests
        '/api/medusa': {
          target: 'http://208.87.135.120:9000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/medusa/, '')
        }
      }
    }
  }
});