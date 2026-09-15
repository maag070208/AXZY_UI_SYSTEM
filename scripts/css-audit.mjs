import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src");
const DIST_CSS = resolve(ROOT, "dist/index.css");

const found = {
  globalSelectors: [],
  genericTokens: [],
  duplicateClasses: [],
  plainCssFiles: [],
};

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, acc);
    } else if (/\.css$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

const cssFiles = walk(SRC).filter((f) => !f.includes("index.css") && !f.includes("dev.css"));

for (const file of cssFiles) {
  const content = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  const selectors = content.match(/\.([a-zA-Z][\w-]*)\s*{/g) || [];
  for (const sel of selectors) {
    const name = sel.slice(1, -1).trim();
    if (!name.startsWith("it-")) {
      found.globalSelectors.push(`${rel}: .${name}`);
    }
  }
  found.plainCssFiles.push(rel);
}

const indexCss = readFileSync(resolve(SRC, "index.css"), "utf8");
const indexCssTokens = indexCss.match(/--([a-z][\w-]*)\s*:/g) || [];
for (const token of indexCssTokens) {
  const name = token.slice(2, -1).trim();
  if (/^--(color|card|input|topbar|sidebar|modal|calendar|layout|badge|button|table|toast)-/.test(name) && !name.startsWith("it-")) {
    found.genericTokens.push(`src/index.css: --${name}`);
  }
}

const themeTs = readFileSync(resolve(SRC, "theme/theme.ts"), "utf8");
const themeTokens = themeTs.match(/var\(--([\w-]+)/g) || [];
for (const token of themeTokens) {
  const name = token.slice(5, -1);
  if (/^--(card|input|topbar|sidebar|modal|calendar|layout)-/.test(name) && !name.startsWith("it-")) {
    found.genericTokens.push(`theme.ts: var(${name})`);
  }
}

if (existsSync(DIST_CSS)) {
  const dist = readFileSync(DIST_CSS, "utf8");
  const classMap = new Map();
  for (const m of dist.matchAll(/\.([a-zA-Z][\w-]*(?:\\:[\w-]+)*)\{[^}]*\}/g)) {
    const cls = m[1].replace(/\\:/g, ":");
    if (!classMap.has(cls)) classMap.set(cls, []);
    classMap.get(cls).push(m[0]);
  }
  for (const [cls, defs] of classMap) {
    if (defs.length > 1) {
      const identical = defs.every((d) => d === defs[0]);
      if (!identical) {
        found.duplicateClasses.push(`${cls}: ${defs.length} defs CONFLICT`);
      } else {
        found.duplicateClasses.push(`${cls}: ${defs.length} defs identical`);
      }
    }
  }
}

console.log("=== SELECTORES GLOBALES SIN PREFIJO it- ===");
console.log(found.globalSelectors.length ? found.globalSelectors.join("\n") : "none");
console.log("\n=== TOKENS GENÉRICOS ===");
console.log(found.genericTokens.length ? found.genericTokens.join("\n") : "none");
console.log("\n=== CSS PLANOS FUERA DE index.css ===");
console.log(found.plainCssFiles.length ? found.plainCssFiles.join("\n") : "none");
console.log("\n=== CLASES DUPLICADAS EN dist/index.css ===");
console.log(found.duplicateClasses.length ? found.duplicateClasses.join("\n") : "none");