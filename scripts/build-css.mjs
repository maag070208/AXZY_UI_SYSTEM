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

const compiledCss = path.join(outDir, "index.css");
const targetCss = path.resolve(projectRoot, "dist/index.css");

if (fs.existsSync(compiledCss)) {
  fs.copyFileSync(compiledCss, targetCss);
  const size = fs.statSync(targetCss).size;
  console.log(`\n[css-build] dist/index.css written: ${(size / 1024).toFixed(2)} KB`);
} else {
  console.error("[css-build] ERROR: compiled CSS not found at", compiledCss);
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
if (fs.existsSync(entry)) fs.unlinkSync(entry);
console.log("[css-build] done\n");
