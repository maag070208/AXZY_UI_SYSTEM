/**
 * Genera los artefactos del motor de pantallas: contrato de vocabulario.
 *
 * Node 20 no ejecuta TypeScript directamente y el catálogo importa componentes
 * `.tsx`, así que el generador se compila con esbuild (ya es devDependency) a un
 * bundle temporal y se ejecuta desde ahí. Sin dependencias nuevas.
 *
 * Uso: `pnpm docs:json-renderer`
 */

import { build } from "esbuild";
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const TMP = resolve(ROOT, ".tmp-json-renderer");

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const outfile = resolve(TMP, "generate.mjs");

await build({
  entryPoints: [resolve(ROOT, "scripts/json-renderer/generate.mjs")],
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  jsx: "automatic",
  loader: { ".ts": "ts", ".tsx": "tsx" },
  // El catálogo usa los alias del proyecto.
  alias: {
    "@": resolve(ROOT, "src"),
    "@app": resolve(ROOT, "src"),
    "@components": resolve(ROOT, "src/components"),
    "@types": resolve(ROOT, "src/types"),
  },
  // React no hace falta para leer metadatos del catálogo; se externaliza.
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "warning",
});

// El bundle resuelve `react/jsx-runtime` en runtime; para leer el catálogo no se
// monta nada, así que un stub vacío es suficiente.
await import(pathToFileURL(outfile).href);
rmSync(TMP, { recursive: true, force: true });
