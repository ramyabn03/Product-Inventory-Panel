// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 👈 This must exist
    },
  },
  server: {
    host: true,
    port: 3001,
    watch: {
      usePolling: true,
    },
    strictPort: true,
  },
});
