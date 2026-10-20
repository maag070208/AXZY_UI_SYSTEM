/**
 * Tester de documentos del motor: valida JSON de pantallas y rutas contra su JSON Schema.
 *
 * Usa los schemas generados en `docs/json-renderer/` (ver `pnpm docs:json-renderer`),
 * así que lo que pasa aquí es lo mismo que el autocompletado del editor. Solo valida
 * la **forma**; que una acción, una fuente o un slot exista en el host lo avisa el
 * motor al pintar.
 *
 * Uso:
 *   pnpm schema:check                      → todos los JSON de public/demo/app
 *   pnpm schema:check ruta/a/otra.json     → uno o varios archivos concretos
 *
 * El tipo de documento sale de `$schema` ("axzy/screen" o "axzy/routes"); sin él,
 * `routes.json` se trata como rutas y el resto como pantallas. `layout.json` es la
 * marca del shell y se omite.
 */

import Ajv2020 from "ajv/dist/2020.js";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const ROOT = process.cwd();
const SCHEMAS = resolve(ROOT, "docs/json-renderer");
const DEMO = resolve(ROOT, "public/demo/app");

const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true, strictRequired: false });
const validadores = {
  "axzy/screen": ajv.compile(JSON.parse(readFileSync(join(SCHEMAS, "screen.schema.json"), "utf8"))),
  "axzy/routes": ajv.compile(JSON.parse(readFileSync(join(SCHEMAS, "routes.schema.json"), "utf8"))),
};

/** Archivos que se validan: los pasados por argumento, o todo el demo. */
const argumentos = process.argv.slice(2);
const archivos = argumentos.length > 0
  ? argumentos.map((archivo) => resolve(ROOT, archivo))
  : readdirSync(DEMO).filter((archivo) => archivo.endsWith(".json")).map((archivo) => join(DEMO, archivo));

let fallos = 0;

for (const archivo of archivos) {
  const nombre = basename(archivo);
  if (nombre === "layout.json") {
    console.log(`· ${nombre}: omitido (marca del shell, no es pantalla)`);
    continue;
  }

  let documento;
  try {
    documento = JSON.parse(readFileSync(archivo, "utf8"));
  } catch (error) {
    fallos += 1;
    console.log(`✗ ${nombre}: no es JSON válido (${error.message})`);
    continue;
  }

  const formato = documento?.$schema ?? (nombre === "routes.json" ? "axzy/routes" : "axzy/screen");
  const validar = validadores[formato];
  if (!validar) {
    fallos += 1;
    console.log(`✗ ${nombre}: \`$schema\` desconocido "${formato}" (admitidos: ${Object.keys(validadores).join(", ")})`);
    continue;
  }

  if (validar(documento)) {
    console.log(`✓ ${nombre} (${formato})`);
    continue;
  }

  // `anyOf` e `if` son ramas intermedias: su error repite el de dentro. Se ocultan y se
  // eliminan duplicados por ruta y mensaje para que se lea el error real.
  const vistos = new Set();
  const utiles = validar.errors.filter((error) => {
    if (error.keyword === "anyOf" || error.keyword === "if") return false;
    const clave = `${error.instancePath}|${error.message}|${error.params?.additionalProperty ?? ""}`;
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });

  fallos += 1;
  console.log(`✗ ${nombre} (${formato}): ${utiles.length} error(es)`);
  for (const error of utiles) {
    const donde = error.instancePath || "/";
    const extra = error.params?.additionalProperty ? ` «${error.params.additionalProperty}»` : "";
    const valores = error.params?.allowedValues ? ` (valores: ${error.params.allowedValues.join(", ")})` : "";
    console.log(`    ${donde}: ${error.message}${extra}${valores}`);
  }
}

console.log(fallos === 0 ? "\nSin errores de esquema." : `\n${fallos} documento(s) con errores.`);
process.exit(fallos === 0 ? 0 : 1);
