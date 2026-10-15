import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import pkg from "./package.json";
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // La versión del paquete se inyecta en build: el sandbox la muestra en su sello.
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  plugins: [tailwindcss(), react()],
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
