/**
 * Genera el contrato de vocabulario del motor de pantallas.
 *
 * El contrato es lo que se le entrega a un emisor (un modelo, un backend) para
 * que acierte con los `type` y las props. Se **deriva del catálogo**, así que
 * nunca se desincroniza del motor: este script solo lo serializa.
 *
 * Uso: `node scripts/build-json-renderer-docs.mjs`
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { buildVocabularyContract, formatVocabularyForPrompt } from "../../src/json-renderer/vocabulary/buildContract.ts";

const ROOT = process.cwd();
const OUT = resolve(ROOT, "docs/json-renderer");
mkdirSync(OUT, { recursive: true });

const contract = buildVocabularyContract();

// 1. JSON para herramientas (generación de prompts, validación de salidas…).
writeFileSync(resolve(OUT, "vocabulario.json"), `${JSON.stringify(contract, null, 2)}\n`, "utf8");

// 2. Markdown para leer y copiar en el prompt.
const rows = contract.components
  .map((component) => {
    const props = component.props
      .map((prop) => {
        const label = `\`${prop.name}\`${prop.required ? " *" : ""}`;
        const values = prop.values?.length ? ` (${prop.values.map((v) => `\`${v}\``).join(" · ")})` : "";
        return `${label}: ${prop.kind}${values}`;
      })
      .join("<br>");
    return `| \`${component.type}\` | ${component.summary ?? "—"} | ${component.children ? "sí" : "—"} | ${component.text ? "sí" : "—"} | ${props} |`;
  })
  .join("\n");

const excluded = Object.entries(contract.excluded)
  .map(([type, reason]) => `| \`${type}\` | ${reason} |`)
  .join("\n");

const markdown = `# Contrato de vocabulario — formato v${contract.schemaVersion}

> **Generado** por \`scripts/build-json-renderer-docs.mjs\` desde \`src/json-renderer/catalog/axzyCatalog.ts\`.
> No lo edites a mano: cambia el catálogo y vuelve a ejecutar el script.
>
> Versión JSON para herramientas: [\`vocabulario.json\`](./vocabulario.json).

## Reglas para el emisor

${contract.rules.map((rule) => `- ${rule}`).join("\n")}

## Componentes disponibles (${contract.components.length})

Los \`*\` marcan props obligatorias.

| Tipo | Para qué | children | text | Props |
|---|---|---|---|---|
${rows}

## Tipos excluidos

| Tipo | Motivo |
|---|---|
${excluded}

## Nodo mínimo

${contract.components.map((component) => `- \`${component.type}\`: \`${JSON.stringify(component.minimal)}\``).join("\n")}

## Prompt listo para copiar

\`\`\`text
${formatVocabularyForPrompt(contract)}
\`\`\`
`;

writeFileSync(resolve(OUT, "VOCABULARIO.md"), markdown, "utf8");

console.log(
  `[json-renderer] contrato v${contract.schemaVersion}: ${contract.components.length} componentes, ` +
    `${contract.components.reduce((total, component) => total + component.props.length, 0)} props`
);
