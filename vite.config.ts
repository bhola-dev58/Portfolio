import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      ignored: ["**/vite.config.ts"]
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep Three.js and R3F separate so the main bundle stays lean
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          // Keep React core separate for long-lived browser caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
}));

