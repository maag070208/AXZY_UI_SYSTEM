# AXZY UI System — VS Code extension

Developer tooling for the [`@axzydev/axzy_ui_system`](../) React component library:

- **Component explorer** — a tree in the activity bar grouped by atomic layer
  (Atoms / Molecules / Organisms / Templates) plus Hooks.
- **Docs panel** — description, full props table (type, required, default,
  JSDoc) and the component `@example`.
- **Prop IntelliSense** — component-name completion after `<` and prop-name
  completion inside `IT*` opening tags, with type + JSDoc from the catalog.
- **Live preview** — renders the component in a webview using the real library
  bundle and the real design-system CSS.

The data comes from a generated `src/generated/catalog.json` produced from the
library source with the TypeScript compiler API, so it always reflects the
current props and JSDoc.

## Requirements

- VS Code `^1.85`.
- The preview imports the **built** library (`../dist/index.js`) and CSS
  (`../dist/index.css`), so build the library at least once:

  ```bash
  # from the repo root
  pnpm install
  pnpm bundle
  ```

## Build

```bash
# from the repo root
pnpm ext:catalog     # regenerate src/generated/catalog.json from src/**
pnpm ext:typecheck   # tsc --noEmit for the extension
pnpm ext:build       # bundles out/extension.js, media/preview.js, media/axzy.css
```

`pnpm ext:build` runs esbuild for the extension host, esbuild for the preview
webview and a Tailwind (vite) build for `media/axzy.css`, which scans both
`../src` and `preview-src` so every preview utility is present.

## Run / debug (F5)

Open **this folder** (`vscode-extension`) as the VS Code workspace and press
**F5**. The `Run AXZY extension` launch config builds first and starts an
Extension Development Host.

## Package a VSIX

```bash
# from the repo root
pnpm ext:package
# -> vscode-extension/axzy-ui-system-0.1.0.vsix
```

Install it with `code --install-extension vscode-extension/axzy-ui-system-0.1.0.vsix`.

## Commands

| Command | Description |
| --- | --- |
| `AXZY: Open component docs` | Opens the docs panel for a component or hook. |
| `AXZY: Preview component` | Opens the live preview webview. |
| `AXZY: Copy usage example` | Copies the component `@example` to the clipboard. |
| `AXZY: Open component source` | Opens the declaring file if the library is installed/checked out. |
| `AXZY: Refresh component catalog` | Re-renders the explorer (e.g. after toggling settings). |

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `axzy.explorer.showHooks` | `true` | Show the hooks group in the explorer. |
| `axzy.preview.theme` | `light` | Theme used by the preview webview (`light` / `dark`). |
| `axzy.packageName` | `@axzydev/axzy_ui_system` | Package name used to resolve sources. |

## Structure

```
vscode-extension/
  src/
    extension.ts                 # activate(): tree, commands, providers
    catalog.ts                   # catalog accessors
    types.ts                     # catalog types
    generated/catalog.json       # generated — do not edit by hand
    explorer/componentTree.ts    # TreeDataProvider
    explorer/docsPanel.ts        # docs webview
    intellisense/completionProvider.ts
    intellisense/hoverProvider.ts
    preview/previewPanel.ts      # preview webview (host side)
  preview-src/
    index.tsx                    # webview React entry + error boundary
    registry.tsx                 # component -> demo mapping
    preview.css / css-entry.ts   # Tailwind entry for the webview
  scripts/generate-catalog.mjs   # catalog generator (TypeScript API)
  esbuild.mjs                    # extension + preview + CSS build
```

## Adding a preview

Add an entry to the `registry` map in `preview-src/registry.tsx`. Components
without a registered demo still open docs and show a fallback message in the
preview.
