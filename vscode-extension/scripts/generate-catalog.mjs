// Generates `src/generated/catalog.json` by inspecting the library's public
// exports with the TypeScript compiler API. Run from the repo root:
//
//   node vscode-extension/scripts/generate-catalog.mjs
//
// The catalog feeds the component explorer, the IntelliSense providers and the
// preview registry.

import ts from "typescript";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..", "..");
const outFile = path.resolve(__dirname, "..", "src", "generated", "catalog.json");

const LAYER_LABELS = {
  atoms: "Atoms",
  molecules: "Molecules",
  organisms: "Organisms",
  templates: "Templates",
  hooks: "Hooks",
};

const configPath = ts.findConfigFile(projectRoot, ts.sys.fileExists, "tsconfig.json");
if (!configPath) {
  console.error("[catalog] tsconfig.json not found");
  process.exit(1);
}

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, projectRoot);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();

const indexSource = program.getSourceFile(path.join(projectRoot, "src", "index.ts"));
if (!indexSource) {
  console.error("[catalog] src/index.ts not found");
  process.exit(1);
}

const moduleSymbol = checker.getSymbolAtLocation(indexSource);
const exports = checker.getExportsOfModule(moduleSymbol);

const text = (parts) => ts.displayPartsToString(parts || []).trim();

const resolvedFor = (symbol) =>
  symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;

const declFileOf = (symbol) => {
  const decl = symbol.valueDeclaration || symbol.declarations?.[0];
  return decl ? decl.getSourceFile().fileName : "";
};

const layerOf = (filePath) => {
  const rel = path.relative(projectRoot, filePath).split(path.sep).join("/");
  const match = rel.match(/components\/(atoms|molecules|organisms|templates)\//);
  return match ? match[1] : "";
};

const isProjectLocal = (decl) => {
  const f = decl.getSourceFile().fileName;
  return !f.includes("node_modules") && f.startsWith(projectRoot);
};

const truncate = (value, max = 220) =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

const propsFor = (type, sourceFile) => {
  const properties = type.getProperties();
  const props = [];
  for (const prop of properties) {
    const name = prop.getName();
    if (name.startsWith("__")) continue;
    const decls = prop.getDeclarations() || [];
    // Drop React DOM / library-inherited members: keep only props declared in
    // this project's own source.
    if (decls.length && !decls.some(isProjectLocal)) continue;

    const propType = checker.getTypeOfSymbolAtLocation(prop, sourceFile);
    const typeString = checker.typeToString(
      propType,
      sourceFile,
      ts.TypeFormatFlags.NoTruncation |
        ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
    );
    const tags = prop.getJsDocTags(checker);
    const defaultTag = tags.find((t) => t.name === "default");
    props.push({
      name,
      type: truncate(typeString.replace(/\s+/g, " ")),
      required: !(prop.getFlags() & ts.SymbolFlags.Optional),
      default: defaultTag ? truncate(text(defaultTag.text), 80) : "",
      description: truncate(text(prop.getDocumentationComment(checker)), 400),
    });
  }
  return props;
};

const tagsOf = (symbol) => {
  const tags = symbol.getJsDocTags(checker);
  const exampleTag = tags.find((t) => t.name === "example");
  return { example: exampleTag ? text(exampleTag.text) : "" };
};

const components = [];
const hooks = [];
const others = [];

for (const symbol of exports) {
  const name = symbol.getName();
  const resolved = resolvedFor(symbol);
  const filePath = declFileOf(resolved) || declFileOf(symbol);
  const relSource = path.relative(projectRoot, filePath).split(path.sep).join("/");
  const description = text(resolved.getDocumentationComment(checker)) || text(symbol.getDocumentationComment(checker));

  const type = checker.getTypeOfSymbolAtLocation(resolved, indexSource);
  const sigs = checker.getSignaturesOfType(type, ts.SignatureKind.Call);

  if (name.startsWith("use") && sigs.length) {
    hooks.push({
      name,
      layer: "hooks",
      description,
      signature: truncate(checker.signatureToString(sigs[0], indexSource, ts.TypeFormatFlags.NoTruncation)),
      source: relSource,
      example: tagsOf(resolved).example,
    });
    continue;
  }

  if (name.startsWith("IT") && sigs.length) {
    const params = sigs[0].getParameters();
    const propsType = params.length ? checker.getTypeOfSymbolAtLocation(params[0], indexSource) : null;
    components.push({
      name,
      layer: layerOf(filePath) || "others",
      description,
      example: tagsOf(resolved).example,
      source: relSource,
      props: propsType ? propsFor(propsType, indexSource) : [],
    });
    continue;
  }

  others.push(name);
}

components.sort((a, b) => {
  const order = ["atoms", "molecules", "organisms", "templates", "others"];
  const la = order.indexOf(a.layer);
  const lb = order.indexOf(b.layer);
  if (la !== lb) return la - lb;
  return a.name.localeCompare(b.name);
});

const pkg = JSON.parse(fs.readFileSync(path.resolve(projectRoot, "package.json"), "utf8"));

const catalog = {
  generatedAt: new Date().toISOString(),
  libraryVersion: pkg.version,
  layers: LAYER_LABELS,
  components,
  hooks,
  otherExports: others.sort(),
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(catalog, null, 2));

console.log(
  `[catalog] wrote ${path.relative(projectRoot, outFile)} — ` +
    `${components.length} components, ${hooks.length} hooks, ${others.length} other exports`
);
