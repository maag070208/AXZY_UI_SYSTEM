import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "tailwindcss";
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "@app": path.resolve(dirname, "./src"),
      "@components": path.resolve(dirname, "./src/components"),
      "@types": path.resolve(dirname, "./src/types")
    }
  },
  build: {
    outDir: "dist-app",
    emptyOutDir: true,
    sourcemap: false
  }
});
