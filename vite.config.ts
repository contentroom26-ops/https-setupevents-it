import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  build: {
    cssCodeSplit: false, // Un solo file CSS — evita waterfall di più file CSS
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js e GSAP — isolati così possiamo lazy-loadarli
          if (id.includes("three") || id.includes("@react-three")) {
            return "vendor-three";
          }
          if (id.includes("gsap")) {
            return "vendor-gsap";
          }
          // Framer motion
          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }
          // i18n
          if (id.includes("i18next") || id.includes("react-i18next")) {
            return "vendor-i18n";
          }
          // Radix UI — solo componenti usati
          if (id.includes("@radix-ui")) {
            return "vendor-ui";
          }
          // React core
          if (id.includes("react-dom") || id.includes("react-router")) {
            return "vendor-react";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: false },
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
        globPatterns: ["**/*.{js,css,html,ico,png,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\.(?:jpg|jpeg|webp|png)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:mp4)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "videos",
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      manifest: {
        name: "SetupEvents – Organizzazione Eventi Firenze",
        short_name: "SetupEvents",
        description: "Organizzazione eventi esclusivi a Firenze",
        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",
        display: "standalone",
        scope: "/",
        start_url: "/?source=pwa",
        icons: [
          { src: "/favicon.png", sizes: "192x192", type: "image/png" },
          { src: "/apple-touch-icon.png", sizes: "512x512", type: "image/png" },
          { src: "/apple-touch-icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
