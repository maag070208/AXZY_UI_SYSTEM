import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src");
const DIST_CSS = resolve(ROOT, "dist/index.css");

const GENERIC_TOKEN_PREFIX = /^--(card|input|calendar|topbar|sidebar|modal|layout)-/;

const errors = [];

// 1) CSS plano fuera de index.css debe usar clases con prefijo it-*
const walk = (dir, acc = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      walk(full, acc);
    } else if (/\.css$/.test(entry.name)) acc.push(full);
  }
  return acc;
};

const cssFiles = walk(SRC).filter((f) => !f.endsWith("index.css") && !f.endsWith("dev.css"));
for (const file of cssFiles) {
  const content = readFileSync(file, "utf8");
  const selectors = content.match(/\.([a-zA-Z][\w-]*)\s*{/g) || [];
  for (const sel of selectors) {
    const name = sel.slice(1, -1).trim();
    if (!name.startsWith("it-")) {
      errors.push(`${relative(ROOT, file)}: global class ".${name}" (must be prefixed "it-")`);
    }
  }
}

// 2) Tokens genéricos de componente sin prefijo --it-
const themeTs = readFileSync(join(SRC, "theme/theme.ts"), "utf8");
for (const m of themeTs.matchAll(/var\((--[\w-]+)/g)) {
  if (GENERIC_TOKEN_PREFIX.test(m[1])) {
    errors.push(`theme.ts: ${m[1]} must be --it-*`);
  }
}
const themeContext = readFileSync(join(SRC, "theme/theme-context.ts"), "utf8");
if (/--(card|input|calendar|topbar|sidebar|modal|layout)-/.test(themeContext)) {
  errors.push("theme-context.ts uses generic --card-*/--input-*/... tokens");
}

// 3) Dist bundle: clases duplicadas con definiciones en conflicto
if (existsSync(DIST_CSS)) {
  const dist = readFileSync(DIST_CSS, "utf8");
  const classMap = new Map();
  for (const m of dist.matchAll(/\.([a-zA-Z][\w-]*(?:\\:[\w-]+)*)\{[^}]*\}/g)) {
    const cls = m[1].replace(/\\:/g, ":");
    if (!classMap.has(cls)) classMap.set(cls, new Set());
    classMap.get(cls).add(m[0]);
  }
  for (const [cls, defs] of classMap) {
    if (defs.size > 1 && !["container"].includes(cls)) {
      errors.push(`dist/index.css: ".${cls}" ${defs.size} conflicting definitions`);
    }
  }
}

if (errors.length) {
  console.error("✖ CSS ISOLATION VIOLATIONS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("✔ CSS isolation OK: no generic selectors/tokens, no duplicate classes.");