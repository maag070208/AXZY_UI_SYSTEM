import { build } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirname, "..");

const entry = path.resolve(projectRoot, "src/css-entry.ts");
const outDir = path.resolve(projectRoot, "dist-tmp-css");

if (!fs.existsSync(entry)) {
  fs.writeFileSync(entry, `import "./index.css";\n`);
}

await build({
  configFile: false,
  logLevel: "warn",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "./src"),
      "@app": path.resolve(projectRoot, "./src"),
      "@components": path.resolve(projectRoot, "./src/components"),
      "@types": path.resolve(projectRoot, "./src/types"),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: entry,
      output: {
        entryFileNames: "css-entry.js",
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith(".css")) return "index.css";
          return info.name || "asset";
        },
      },
    },
  },
});


/**
 * `dist/index.css` trae las utilidades de Tailwind que usan los componentes.
 * Tailwind las emite **sin capa**, así que al importarlas desde una aplicación
 * caen en su capa `utilities` (la última) y pisan las utilidades propias del
 * consumidor: un `lg:grid-cols-3` de aquí ganaba a un `xl:grid-cols-4` de la app.
 *
 * `dist/layered.css` envuelve todo el archivo en `@layer axzy-ui-system` para
 * que el consumidor gane por orden de capas sin usar `!important`. El
 * `dist/index.css` se mantiene **sin envolver** por compatibilidad: los
 * consumidores actuales lo importan tal cual.
 */
const writeLayeredCss = (sourceCss) => {
  const css = fs.readFileSync(sourceCss, "utf8");
  const layered = `@layer axzy-ui-system {\n${css.trimEnd()}\n}\n`;
  const target = path.resolve(projectRoot, "dist/layered.css");
  fs.writeFileSync(target, layered);
  console.log(`[css-build] dist/layered.css written: ${(layered.length / 1024).toFixed(2)} KB (capa propia)`);
};

const compiledCss = path.join(outDir, "index.css");
const targetCss = path.resolve(projectRoot, "dist/index.css");

if (fs.existsSync(compiledCss)) {
  fs.copyFileSync(compiledCss, targetCss);
  const size = fs.statSync(targetCss).size;
  console.log(`\n[css-build] dist/index.css written: ${(size / 1024).toFixed(2)} KB`);
  writeLayeredCss(targetCss);
} else {
  console.error("[css-build] ERROR: compiled CSS not found at", compiledCss);
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
if (fs.existsSync(entry)) fs.unlinkSync(entry);
console.log("[css-build] done\n");
