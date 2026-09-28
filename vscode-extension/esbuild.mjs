// Builds the extension host bundle, the preview webview bundle and the preview
// CSS used by the webview.
//
//   node vscode-extension/esbuild.mjs
//   node vscode-extension/esbuild.mjs --watch
//
// Run from the repo root. The preview React bundle imports the built library
// from `dist/index.js`, so run `pnpm bundle` at the root at least once first.

import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const watch = process.argv.includes("--watch");

const hostOptions = {
  entryPoints: [path.join(__dirname, "src", "extension.ts")],
  outfile: path.join(__dirname, "out", "extension.js"),
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node18",
  external: ["vscode"],
  sourcemap: true,
  logLevel: "info",
};

const previewOptions = {
  entryPoints: [path.join(__dirname, "preview-src", "index.tsx")],
  outfile: path.join(__dirname, "media", "preview.js"),
  bundle: true,
  platform: "browser",
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  loader: { ".json": "json" },
  define: { "process.env.NODE_ENV": '"production"' },
  sourcemap: false,
  logLevel: "info",
};

/** Builds the Tailwind CSS bundle for the preview webview. */
async function buildPreviewCss() {
  const target = path.join(__dirname, "media", "axzy.css");
  try {
    const { build } = await import("vite");
    const tailwindcss = (await import("@tailwindcss/vite")).default;
    const outDir = path.join(__dirname, ".css-tmp");
    await build({
      configFile: false,
      logLevel: "warn",
      plugins: [tailwindcss()],
      build: {
        outDir,
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
          input: path.join(__dirname, "preview-src", "css-entry.ts"),
          output: {
            entryFileNames: "css-entry.js",
            assetFileNames: "index.css",
          },
        },
      },
    });
    const compiled = path.join(outDir, "index.css");
    if (fs.existsSync(compiled)) {
      fs.copyFileSync(compiled, target);
      console.log(
        `[ext] preview CSS built -> media/axzy.css (${(fs.statSync(target).size / 1024).toFixed(1)} KB)`
      );
    }
    fs.rmSync(outDir, { recursive: true, force: true });
  } catch (error) {
    console.warn("[ext] could not build preview CSS, falling back to dist/index.css:", error.message ?? error);
    const fallback = path.join(repoRoot, "dist", "index.css");
    if (fs.existsSync(fallback)) {
      fs.copyFileSync(fallback, target);
    } else {
      console.warn("[ext] dist/index.css not found either — run `pnpm bundle` at the repo root.");
    }
  }
}

if (watch) {
  const ctxHost = await esbuild.context(hostOptions);
  const ctxPreview = await esbuild.context(previewOptions);
  await Promise.all([ctxHost.watch(), ctxPreview.watch()]);
  await buildPreviewCss();
  console.log("[ext] watching…");
} else {
  await esbuild.build(hostOptions);
  await esbuild.build(previewOptions);
  await buildPreviewCss();
  console.log("[ext] build complete");
}
