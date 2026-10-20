import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Configuración de pruebas del motor `src/json-renderer/`.
 *
 * Va aparte de `vite.config.ts` (que construye la librería) a propósito: las
 * pruebas del motor necesitan DOM y no deben interferir con el bundle publicado.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/json-renderer/test/setup.ts"],
    restoreMocks: true,
  },
});
