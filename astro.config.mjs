import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  middleware: true,
  integrations: [
    react({
      include: ["**/react/*"],
    }),
    tailwind(),
  ],
  vite: {
    server: {
      proxy: {
        "/api/medusa": {
          target: "http://208.87.135.120:9000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/medusa/, ""),
        },
      },
    },
    ssr: {
      noExternal: ["@medusajs/js-sdk", "gsap"],
    },
  },
});
