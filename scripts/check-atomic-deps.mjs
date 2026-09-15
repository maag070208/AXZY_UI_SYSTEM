import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join, dirname, relative } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const COMPONENTS = resolve(ROOT, "src/components");

const RANK = { atoms: 1, molecules: 2, organisms: 3, templates: 4 };

// theme-provider vive en la raíz de components (provider, no capa atómica).
const ROOT_EXEMPT = new Set(["theme-provider"]);

const walk = (dir, acc = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
};

const componentOf = new Map(); // folder component -> { layer, path }
for (const layer of Object.keys(RANK)) {
  const layerDir = join(COMPONENTS, layer);
  if (!existsSync(layerDir)) continue;
  for (const entry of readdirSync(layerDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      componentOf.set(join(layerDir, entry.name), { layer, name: entry.name });
    }
  }
}
for (const name of ROOT_EXEMPT) {
  const p = join(COMPONENTS, name);
  if (existsSync(p)) componentOf.set(p, { layer: "root", name });
}

const resolveTarget = (fromFile, spec) => {
  const fromDir = dirname(fromFile);
  let base;
  if (spec.startsWith("@/components/")) base = resolve(ROOT, "src/components", spec.slice("@/components/".length));
  else if (spec.startsWith("@components/")) base = resolve(ROOT, "src/components", spec.slice("@components/".length));
  else if (spec.startsWith(".")) base = resolve(fromDir, spec);
  else return null;

  // Encuentra la carpeta de componente que contiene a `base` (el target).
  let cur = base;
  while (cur.startsWith(COMPONENTS)) {
    if (componentOf.has(cur)) return componentOf.get(cur);
    const parent = dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return null;
};

const violations = [];
for (const [targetPath, { layer, name }] of componentOf) {
  const isStory = /\.stories\./.test(targetPath);
  if (isStory) continue;
  const files = walk(targetPath).filter((f) => !/\.stories\./.test(f) && !/\.doc\.mdx/.test(f) && !/\.props\./.test(f));
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    for (const m of content.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)) {
      const target = resolveTarget(file, m[1]);
      if (!target || target.layer === "root") continue;
      const myRank = RANK[layer];
      const tgtRank = RANK[target.layer];
      if (tgtRank > myRank) {
        violations.push(
          `${relative(ROOT, file)}\n  imports UP: ${target.layer}/${target.name} (${layer} -> ${target.layer})`
        );
      }
    }
  }
}

if (violations.length) {
  console.error("✖ ATOMIC DEP VIOLATIONS (no upward imports):\n" + violations.join("\n"));
  process.exit(1);
}
console.log("✔ Atomic deps OK: no component imports from a higher layer.");