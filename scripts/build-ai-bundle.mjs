/**
 * Empaqueta la documentación en `ai/`: una carpeta autocontenida para pegar en
 * cualquier IA (Claude, ChatGPT, Cursor, Copilot). Nada de enlaces relativos:
 * cada archivo se entiende solo.
 *
 * Entradas (se generan antes con `pnpm docs:llm`):
 *   · docs/llm/GUIA.md             → guía de uso (escrita a mano)
 *   · docs/llm/ejemplos-reales.md  → patrones de producción (CYC ERP)
 *   · docs/llm/catalogo.md/.json   → catálogo generado desde el código
 *
 * Salidas en `ai/`:
 *   · README.md                      → qué pegar según la tarea y el tamaño
 *   · AXZY-UI-SYSTEM.md              → TODO en uno (guía + ejemplos + catálogo completo)
 *   · AXZY-UI-SYSTEM-compacto.md     → versión corta (catálogo sin descripciones de props)
 *   · catalogo.md / catalogo.json    → solo el catálogo, por si ya tienes la guía pegada
 *   · plantillas/                    → reglas listas para Cursor, Copilot y Claude Code
 *
 * Uso: pnpm docs:ai   (o `pnpm docs:llm`, que lo encadena)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..");
const LLM = path.join(RAIZ, "docs/llm");
const SALIDA = path.join(RAIZ, "ai");

const leer = (rel) => readFileSync(path.join(LLM, rel), "utf8");
const kb = (texto) => `${(Buffer.byteLength(texto, "utf8") / 1024).toFixed(1)} KB`;
const tokens = (texto) => `~${Math.round(Buffer.byteLength(texto, "utf8") / 4 / 1000)}k tokens`;

for (const f of ["GUIA.md", "ejemplos-reales.md", "catalogo.md", "catalogo.json"]) {
  if (!existsSync(path.join(LLM, f))) {
    console.error(`[docs:ai] Falta docs/llm/${f}. Ejecuta antes: pnpm docs:llm`);
    process.exit(1);
  }
}

const guia = leer("GUIA.md");
const ejemplos = leer("ejemplos-reales.md");
const catalogo = leer("catalogo.md");
const catalogoJson = leer("catalogo.json");
const { components, libraryVersion } = JSON.parse(catalogoJson);

/**
 * Integra un Markdown como parte del bundle: le quita su H1 (el documento ya
 * tiene uno) y baja un nivel todos sus encabezados para que la jerarquía sea
 * `#` documento → `##` parte → `###` sección.
 */
function comoParte(titulo, md) {
  const sinH1 = md.replace(/^#\s+.*\n/, "");
  const rebajado = sinH1.replace(/^(#{1,5})\s/gm, (_, almohadillas) => `${almohadillas}# `);
  return `## ${titulo}\n\n${rebajado.trimStart()}`;
}

/**
 * El catálogo embebido va sin su cabecera (el bundle pone la suya) ni su índice
 * (ya hay uno general): se queda desde su primera sección.
 */
const catalogoSinIndice = catalogo
  .replace(/^<!--[\s\S]*?-->\s*/, "")
  .replace(/^# [^\n]*\n[\s\S]*?(?=\n## )/, "")
  .replace(/## Índice[\s\S]*?(?=\n## )/, "")
  .trimStart();

/** Tabla compacta: componente + capa + qué es + props (nombre y tipo, sin prosa). */
function catalogoCompacto() {
  const lineas = [
    "## Catálogo compacto (nombre · capa · qué es · props)",
    "",
    "`*` = obligatorio. Los tipos van sin descripción; para el detalle completo usa `catalogo.md`.",
    "",
  ];
  for (const c of components) {
    const props = c.props
      .map((p) => `${p.name}${p.required ? "*" : ""}: ${String(p.type).replace(/\s+/g, " ").slice(0, 48)}`)
      .join(" · ");
    lineas.push(`### \`${c.name}\` — ${c.layer}`);
    lineas.push("");
    if (c.description) lineas.push(`${c.description.replace(/\s+/g, " ")}`);
    lineas.push("");
    lineas.push(props ? `Props: ${props}` : "Props: —");
    lineas.push("");
  }
  return lineas.join("\n");
}

const cabecera = `# AXZY UI System — paquete de contexto para IA

> Pegá este archivo entero en el chat (o súbelo como conocimiento del proyecto). Contiene todo lo
> necesario para que un modelo escriba código correcto con \`@axzydev/axzy_ui_system\`: instalación real,
> reglas, accesibilidad, trampas, ejemplos de producción y el catálogo de componentes.
>
> Librería: \`@axzydev/axzy_ui_system\` · versión de referencia: \`${libraryVersion ?? "—"}\` ·
> ${components.length} componentes. Generado el ${new Date().toISOString().slice(0, 10)}.
>
> Estructura: **Parte 1** guía de uso · **Parte 2** ejemplos reales · **Parte 3** catálogo de componentes.
> Las rutas que se citan dentro (\`docs/…\`, \`LLM_DOCS.md\`) son del repo de la librería: este paquete ya
> incluye lo esencial, así que no las necesitas para escribir código.

---

`;

const completo = [
  cabecera,
  comoParte("Parte 1 — Guía de uso", guia),
  "\n---\n",
  comoParte("Parte 2 — Ejemplos reales de producción", ejemplos),
  "\n---\n",
  comoParte("Parte 3 — Catálogo de componentes (props completos)", catalogoSinIndice),
].join("\n");
const compacto =
  cabecera +
  "> **Versión corta**: misma guía y ejemplos, catálogo sin descripciones de props. Ideal para contextos\n" +
  "> pequeños; si necesitas el detalle de un prop, usa `catalogo.md` del paquete completo.\n\n---\n\n" +
  comoParte("Parte 1 — Guía de uso", guia) +
  "\n\n---\n\n" +
  comoParte("Parte 2 — Ejemplos reales de producción", ejemplos) +
  "\n\n---\n\n" +
  comoParte("Parte 3 — Catálogo compacto", catalogoCompacto());

mkdirSync(path.join(SALIDA, "plantillas"), { recursive: true });
writeFileSync(path.join(SALIDA, "AXZY-UI-SYSTEM.md"), `${completo}\n`, "utf8");
writeFileSync(path.join(SALIDA, "AXZY-UI-SYSTEM-compacto.md"), `${compacto}\n`, "utf8");
writeFileSync(path.join(SALIDA, "catalogo.md"), catalogo, "utf8");
writeFileSync(path.join(SALIDA, "catalogo.json"), catalogoJson, "utf8");

// ─── Plantillas para herramientas concretas ───
const instruccionesCortas = `Usa la librería \`@axzydev/axzy_ui_system\` (React + TypeScript + Tailwind v4).

- Instalación: \`@import "@axzydev/axzy_ui_system/dist/index.css" layer(axzy-ui-system);\` en tu CSS,
  con \`@layer theme, base, axzy-ui-system, components, utilities;\` declarado antes.
- Envuelve la app en \`<ITThemeProvider>\`. Nada de colores ni textos hardcodeados.
- Antes de usar un componente o prop, **consúltalo en el catálogo** (\`ai/catalogo.md\`): no inventes props.
- Textos vía \`useITTranslation()\` (\`t("namespace.key")\`); formateo con \`formatNumber/formatCurrency/formatDate\`.
- Accesibilidad obligatoria: todo control con \`label\`/\`ariaLabel\`, nada de interactivos anidados,
  contraste AA (acento en \`primary-700\` claro / \`primary-500\` oscuro).
- Patrones de producción (chassis, listados, formularios, tablas con API, toasts): \`ai/ejemplos-reales.md\`.
- Guía completa: \`ai/AXZY-UI-SYSTEM.md\`.`;

writeFileSync(
  path.join(SALIDA, "plantillas", "cursor-rule.mdc"),
  `---
description: AXZY UI System — cómo usarlo en este proyecto
globs: ["src/**/*.tsx", "src/**/*.ts"]
alwaysApply: true
---

${instruccionesCortas}
`,
  "utf8",
);

writeFileSync(
  path.join(SALIDA, "plantillas", "copilot-instructions.md"),
  `# Instrucciones para Copilot — AXZY UI System

${instruccionesCortas}
`,
  "utf8",
);

writeFileSync(
  path.join(SALIDA, "plantillas", "CLAUDE.md"),
  `# CLAUDE.md — AXZY UI System

${instruccionesCortas}

Para contexto completo, adjunta también \`ai/AXZY-UI-SYSTEM.md\`.
`,
  "utf8",
);

writeFileSync(
  path.join(SALIDA, "plantillas", "prompt-inicial.md"),
  `# Prompt inicial (copiar y pegar)

Adjunta \`AXZY-UI-SYSTEM.md\` (o \`AXZY-UI-SYSTEM-compacto.md\` si el contexto es corto) y usa este prompt:

---

Vas a escribir código con **AXZY UI System** (\`@axzydev/axzy_ui_system\`) en React + TypeScript + Tailwind v4.
El documento adjunto es la fuente de verdad: instalación real, reglas, accesibilidad, trampas, ejemplos de
producción y el catálogo completo de componentes con sus props.

Normas:
1. **No inventes props ni componentes**: si algo no está en el catálogo, dilo en vez de improvisarlo.
2. Respeta la puesta en marcha del §2 (capas de CSS, \`ITThemeProvider\`) y el modo oscuro por defecto.
3. Nada de colores ni textos hardcodeados; usa tokens del tema y \`useITTranslation()\`.
4. La accesibilidad del §12 no es opcional (nombres accesibles, sin interactivos anidados, contraste AA).
5. Revisa el §13 (trampas) antes de dar el código por bueno.
6. Cuando compongas una pantalla, sigue los patrones de \`ejemplos-reales.md\` (\`ITLayout\`, \`ITPage\`,
   \`ITDataTable\` con \`fetchData\`, toasts globales).

Tarea: **<describe aquí tu pantalla o componente>**

Devuelve: el/los archivos completos (no fragmentos), con imports explícitos y comentarios solo donde aporten.
`,
  "utf8",
);

const readme = `# \`ai/\` — paquete de contexto para IA

Carpeta **autocontenida** para pegar en un modelo (Claude, ChatGPT, Cursor, Copilot, un agente propio).
No tiene enlaces relativos: cada archivo se entiende solo.

## Qué pegar según lo que necesites

| Archivo | Tamaño | Qué incluye |
| --- | --- | --- |
| \`AXZY-UI-SYSTEM.md\` | ${kb(completo)} · ${tokens(completo)} | **Todo en uno**: guía + ejemplos de producción + catálogo completo (${components.length} componentes) |
| \`AXZY-UI-SYSTEM-compacto.md\` | ${kb(compacto)} · ${tokens(compacto)} | Igual, con el catálogo sin descripciones de props (para contextos cortos) |
| \`catalogo.md\` | ${kb(catalogo)} · ${tokens(catalogo)} | Solo el catálogo (si ya tienes la guía pegada) |
| \`catalogo.json\` | ${kb(catalogoJson)} | El catálogo en JSON, para indexar o usar como herramienta |
| \`plantillas/\` | — | Reglas listas para Cursor (\`.mdc\`), Copilot (\`copilot-instructions.md\`), Claude Code (\`CLAUDE.md\`) y un prompt inicial |

## Cómo usarlo

- **Chat (Claude/ChatGPT)**: sube o pega \`AXZY-UI-SYSTEM.md\` y luego tu tarea. Si el contexto es
  limitado, usa \`AXZY-UI-SYSTEM-compacto.md\`.
- **Cursor**: copia \`plantillas/cursor-rule.mdc\` a \`.cursor/rules/axzy-ui-system.mdc\` del proyecto.
- **Copilot**: copia \`plantillas/copilot-instructions.md\` a \`.github/copilot-instructions.md\`.
- **Claude Code / agentes**: copia \`plantillas/CLAUDE.md\` a la raíz del proyecto y adjunta el bundle.
- **Prompt listo**: \`plantillas/prompt-inicial.md\` (rellena la tarea al final).

## Regenerar

\`\`\`bash
pnpm docs:ai      # regenera docs/llm/ + este paquete (encadena ext:catalog)
\`\`\`

Los datos salen del código (\`src/components/**/*.props.ts\` vía el compilador de TypeScript), así que no se
quedan viejos. **No edites los archivos de esta carpeta a mano**: edita \`docs/llm/GUIA.md\` o
\`docs/llm/ejemplos-reales.md\` y regenera.
`;

writeFileSync(path.join(SALIDA, "README.md"), readme, "utf8");

console.log(
  `[docs:ai] ai/ listo — completo ${kb(completo)} (${tokens(completo)}), ` +
    `compacto ${kb(compacto)} (${tokens(compacto)}), ${components.length} componentes`,
);
