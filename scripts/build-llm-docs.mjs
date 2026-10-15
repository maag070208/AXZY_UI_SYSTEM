/**
 * Genera la documentación Markdown para IA a partir del catálogo de componentes.
 *
 * Entrada: `vscode-extension/src/generated/catalog.json`, que se produce con el
 * compilador de TypeScript leyendo `src/index.ts` (`pnpm ext:catalog`). Esa es la
 * única fuente de verdad: los props, tipos, defaults y descripciones salen del
 * código, así que este Markdown no se queda viejo.
 *
 * Salida (en `docs/llm/`):
 *   · `catalogo.md`   — todos los componentes por capa, con props y ejemplo.
 *   · `catalogo.json` — el mismo contenido en JSON, para pegarlo en contexto.
 *
 * Uso:
 *   pnpm docs:llm       (regenera el catálogo y luego este Markdown)
 *   node scripts/build-llm-docs.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..");
const CATALOGO = path.join(RAIZ, "vscode-extension/src/generated/catalog.json");
const SALIDA = path.join(RAIZ, "docs/llm");

if (!existsSync(CATALOGO)) {
  console.error(
    `[docs:llm] Falta ${path.relative(RAIZ, CATALOGO)}. Ejecuta antes: pnpm ext:catalog`,
  );
  process.exit(1);
}

const catalogo = JSON.parse(readFileSync(CATALOGO, "utf8"));
const { layers = {}, components = [], hooks = [], otherExports = [] } = catalogo;

/** Escapa `|` para que las tablas Markdown no se rompan. */
const celda = (valor) => String(valor ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();

/** Bloque de props de un componente. */
function tablaProps(props) {
  if (!props.length) return "_Sin props públicas._\n";
  const filas = props.map((p) => {
    const nombre = `\`${p.name}\`${p.required ? " **\\***" : ""}`;
    const porDefecto = p.default ? `\`${celda(p.default)}\`` : "—";
    return `| ${nombre} | \`${celda(p.type)}\` | ${porDefecto} | ${celda(p.description) || "—"} |`;
  });
  return [
    "| Prop | Tipo | Por defecto | Descripción |",
    "| --- | --- | --- | --- |",
    ...filas,
    "",
    "`*` = obligatorio.",
    "",
  ].join("\n");
}

const capasPresentes = [...new Set(components.map((c) => c.layer))];
const orden = [
  ...Object.keys(layers).filter((l) => l !== "hooks" && capasPresentes.includes(l)),
  // Capas que el catálogo usa pero no declara en `layers` (p. ej. providers: "others").
  ...capasPresentes.filter((l) => !layers[l] && l !== "hooks").sort(),
];
const etiquetaCapa = (l) => layers[l] ?? (l === "others" ? "Providers y otros" : l);
const porCapa = (capa) => components.filter((c) => c.layer === capa);

const lineas = [];
lineas.push("<!-- GENERADO por scripts/build-llm-docs.mjs — no editar a mano. -->");
lineas.push("");
lineas.push("# Catálogo de componentes (para IA)");
lineas.push("");
lineas.push(
  `Generado desde el código con el compilador de TypeScript: **${components.length} componentes**, ` +
    `${components.reduce((t, c) => t + c.props.length, 0)} props, ${hooks.length} hooks. ` +
    `Versión de la librería: \`${catalogo.libraryVersion ?? "—"}\`.`,
);
lineas.push("");
lineas.push("Para regenerarlo: `pnpm docs:llm`.");
lineas.push("");
lineas.push("## Índice");
lineas.push("");
for (const capa of orden) {
  const lista = porCapa(capa);
  if (!lista.length) continue;
  lineas.push(`- **${etiquetaCapa(capa)}** (${lista.length}): ${lista.map((c) => `\`${c.name}\``).join(", ")}`);
}
if (hooks.length) {
  lineas.push(`- **Hooks** (${hooks.length}): ${hooks.map((h) => `\`${h.name}\``).join(", ")}`);
}
lineas.push("");

for (const capa of orden) {
  const lista = porCapa(capa);
  if (!lista.length) continue;
  lineas.push(`## ${etiquetaCapa(capa)}`);
  lineas.push("");
  for (const c of lista) {
    lineas.push(`### \`${c.name}\``);
    lineas.push("");
    lineas.push(`- **Capa:** ${etiquetaCapa(c.layer)}`);
    lineas.push(`- **Fuente:** \`${c.source}\``);
    if (c.description) lineas.push(`- **Qué es:** ${celda(c.description)}`);
    lineas.push("");
    if (c.example) {
      lineas.push("```tsx");
      lineas.push(c.example);
      lineas.push("```");
      lineas.push("");
    }
    lineas.push("**Props**");
    lineas.push("");
    lineas.push(tablaProps(c.props));
  }
}

if (hooks.length) {
  lineas.push("## Hooks");
  lineas.push("");
  for (const h of hooks) {
    lineas.push(`### \`${h.name}\``);
    lineas.push("");
    lineas.push(`- **Firma:** \`${celda(h.signature)}\``);
    lineas.push(`- **Fuente:** \`${h.source}\``);
    if (h.description) lineas.push(`- **Qué hace:** ${celda(h.description)}`);
    if (h.example) {
      lineas.push("");
      lineas.push("```tsx");
      lineas.push(h.example);
      lineas.push("```");
    }
    lineas.push("");
  }
}

if (otherExports.length) {
  lineas.push("## Otros exports (tipos y utilidades)");
  lineas.push("");
  lineas.push(otherExports.map((e) => `\`${e}\``).join(", "));
  lineas.push("");
}

mkdirSync(SALIDA, { recursive: true });
writeFileSync(path.join(SALIDA, "catalogo.md"), `${lineas.join("\n")}\n`, "utf8");
writeFileSync(
  path.join(SALIDA, "catalogo.json"),
  `${JSON.stringify({ generatedAt: catalogo.generatedAt, libraryVersion: catalogo.libraryVersion, components, hooks, otherExports }, null, 1)}\n`,
  "utf8",
);

console.log(
  `[docs:llm] docs/llm/catalogo.md y catalogo.json — ${components.length} componentes, ` +
    `${components.reduce((t, c) => t + c.props.length, 0)} props, ${hooks.length} hooks`,
);
