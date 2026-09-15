import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src/components");

const LAYERS = {
  atoms: ["text", "button", "input", "textarea", "checkbox", "radio", "avatar", "badget", "divider", "loader", "skeleton", "image", "slider", "progress", "slide", "segmented-control", "tooltip", "popover", "flex", "grid", "stack"],
  molecules: ["card", "calendar", "date-picker", "time-picker", "select", "search-select", "dropfile", "pagination", "tabs", "stepper", "breadcrumbs", "stat-card", "table", "form-header", "alert", "empty-state"],
  organisms: ["data-table", "searchTable", "form-builder", "dialog", "confirm-dialog", "drawer", "navbar", "sidebar", "topbar", "triple-filter", "toast", "page-header"],
  templates: ["layout", "page"],
};

const layerOf = new Map();
for (const [layer, names] of Object.entries(LAYERS)) {
  for (const name of names) layerOf.set(name, layer);
}

// 1) Mover carpetas
for (const [layer, names] of Object.entries(LAYERS)) {
  const layerDir = join(SRC, layer);
  if (!existsSync(layerDir)) execSync(`mkdir -p "${layerDir}"`);
  for (const name of names) {
    const from = join(SRC, name);
    const to = join(SRC, layer, name);
    if (existsSync(from)) {
      execSync(`mv "${from}" "${to}"`);
      console.log(`moved ${name} -> ${layer}/${name}`);
    } else {
      console.warn(`MISSING: ${name}`);
    }
  }
}

// 2) Reescribir imports en src (todo archivo ts/tsx/mdx)
const walk = (dir, acc = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      walk(full, acc);
    } else if (/\.(ts|tsx|mdx)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
};

const files = walk(SRC);
files.push(join(ROOT, "src/index.ts"), join(ROOT, "src/App.tsx"));

let changed = 0;
for (const file of files) {
  const content = readFileSync(file, "utf8");
  let out = content;

  // Alias absolutos: @/components/<name>/... y @components/<name>/...
  for (const [name, layer] of layerOf) {
    out = out.replace(
      new RegExp(`(@/components|@components)/${name}(?=/|")`, "g"),
      `$1/${layer}/${name}`
    );
  }

  // Imports relativos cruzados: ../<name>/... , ../../<name>/... etc.
  for (const [name, layer] of layerOf) {
    out = out.replace(
      new RegExp(`(from\\s+["'])(\\.\\.?/)+${name}(?=/|["'])`, "g"),
      `$1@/components/${layer}/${name}`
    );
  }

  if (out !== content) {
    writeFileSync(file, out);
    changed++;
  }
}
console.log(`rewrote imports in ${changed} files`);

// 3) Barriles por capa
for (const [layer, names] of Object.entries(LAYERS)) {
  const entries = names
    .map((n) => {
      const base = join(SRC, layer, n);
      const main = readdirSync(base).find((f) => /\.tsx$/.test(f) && !f.includes("stories") && !f.includes("doc") && !f.includes(".props."));
      const props = readdirSync(base).find((f) => f.endsWith(".props.ts"));
      const lines = [];
      if (main) lines.push(`export { default as IT${pascal(n)} } from "./${n}/${main.replace(/\.tsx$/, "")}";`);
      if (props) lines.push(`export type * from "./${n}/${props.replace(/\.ts$/, "")}";`);
      return lines.join("\n");
    })
    .join("\n");
  writeFileSync(join(SRC, layer, "index.ts"), `${entries}\n`);
  console.log(`barrel: ${layer}/index.ts`);
}

function pascal(name) {
  return name.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
}