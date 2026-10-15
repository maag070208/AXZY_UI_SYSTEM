# AGENTS.md

## What this repo is

- React + TypeScript **component library** published to npm as `@axzydev/axzy_ui_system` (Tailwind CSS v4).
- Shipped entrypoint is `src/index.ts`. `src/main.tsx`, `src/App.tsx`, `src/showcases/*`, `src/sandbox/*`, and `src/dev.css` are the local sandbox/showroom only.
- Package manager is pnpm (pinned `10.34.0`). Use `pnpm`, not npm.

## Commands

- `pnpm dev` — Vite sandbox at http://localhost:5173
- `pnpm lint` — ESLint + `check:atomic` + `check:css`. Must end with `0 errors` (the many `no-explicit-any` warnings are intentional).
- `pnpm check:atomic` / `pnpm check:css` — run a single check
- `pnpm bundle` — build the published package: tsup (JS + `.d.ts`) then `scripts/build-css.mjs` → `dist/`
- `pnpm build` — **alias of `pnpm bundle`** (tsup + CSS). Trust `package.json`.
- `pnpm build:app` — build the sandbox into `dist-app/`
- No `test` script and no test runner: Storybook (and its Vitest project) was removed. Examples and manual checks live in the sandbox.
- `pnpm ext:catalog` / `pnpm ext:typecheck` / `pnpm ext:build` / `pnpm ext:package` — VS Code extension in `vscode-extension/` (see below).
- `pnpm docs:llm` — regenerates the AI documentation: `pnpm ext:catalog` → `docs/llm/` (`catalogo.md` + `catalogo.json`) → `ai/` bundle.
- `pnpm docs:ai` — only the `ai/` bundle (requires `docs/llm/` to exist).
- `pnpm audit:sandbox` — serves `dist-app/` and audits all sandbox routes with axe (full rule set) + clipped-content detection. Run `pnpm build:app` first.

## VS Code extension (`vscode-extension/`)

- Self-contained subproject: component explorer (TreeView), docs webview, prop IntelliSense (completion + hover) and live preview webview for this library.
- **Not published to npm**: root `package.json#files` only includes `dist`, `src`, `snippets`. Excluded from root ESLint via `eslint.config.js` `ignores`.
- Data comes from `vscode-extension/src/generated/catalog.json`, generated with the TypeScript compiler API by `vscode-extension/scripts/generate-catalog.mjs` (`pnpm ext:catalog`). Regenerate it after changing component props, then `pnpm ext:build`.
- `pnpm ext:build` runs `vscode-extension/esbuild.mjs`: esbuild for the extension host and the preview webview, plus a Tailwind (vite) build for `media/axzy.css`. The preview imports the built library from `dist/index.js`, so run `pnpm bundle` first.
- DevDeps `@types/vscode` (pinned to `1.85.0` to match `engines.vscode`) and `esbuild` live in the root `package.json` so the subfolder resolves them from the ancestor `node_modules`.

## Documentation surfaces

- `docs/<layer>/<component>.md` — per-component reference (props, example, i18n keys).
- `docs/llm/GUIA.md` + `docs/llm/ejemplos-reales.md` — hand-written AI guide and real production patterns (from CYC ERP). **Edit these, never the generated files.**
- `docs/llm/catalogo.md` / `catalogo.json` — generated from `src/components/**/*.props.ts` via the TS compiler API.
- `ai/` — **generated** copy-paste bundle for models: `AXZY-UI-SYSTEM.md` (all-in-one), `-compacto.md`, `catalogo.md|json`, and `plantillas/` (Cursor/Copilot/Claude rules + starter prompt). Regenerate with `pnpm docs:ai`.

## Architecture and boundaries

- Atomic layers in `src/components/`: `atoms` < `molecules` < `organisms` < `templates`. `theme-provider/` is a provider and exempt.
- `scripts/check-atomic-deps.mjs` fails on any upward import (e.g. an atom importing a molecule). Keep dependencies one-directional.
- Import aliases: `@/` and `@app/` → `src/`, `@components/` → `src/components/`, `@types/` → `src/types/`.
- Theming: `import { theme } from "@/theme/theme"`. Do not hardcode colors.

## Dev sandbox

- Dev-only, never bundled: `src/main.tsx`, `src/App.tsx`, `src/showcases/*`, `src/sandbox/*`, and `src/dev.css`. `src/index.ts` is the only published entrypoint; `dist/` contains no sandbox code.
- Route scheme (hash router, `src/sandbox/useHashRoute.ts`):
  - `#ui-system` → landing/dashboard (`src/sandbox/LandingShowcase.tsx`).
  - `#ui-system/<group-slug>` → redirects (history replace) to that group's first item.
  - `#ui-system/<group-slug>/<item-id>` → that showcase.
  - any other hash under `#ui-system` → 404 (`src/sandbox/NotFoundShowcase.tsx`).
  - empty hash / unknown first segment → the personal portfolio at `/`.
- Group slug map: `general→general`, `struc→structure`, `forms→forms`, `data→viewdata`, `nav→navigation`, `feed→feedback`. The catalog, slug map and helpers (`SANDBOX_GROUPS`, `GROUP_SLUGS`, `SLUG_TO_GROUP`, `groupBySlug`, `firstItemOf`, `isValidItem`, `TOTAL_ITEMS`) live in `src/sandbox/navigation.ts`; item ids are the `renderShowcase` cases in `src/App.tsx`.
- Sandbox-only keyframes (`it-landing-rise` / `it-landing-float` / `it-landing-grid`) live in `src/dev.css`; only `src/main.tsx` imports it, so they never reach `dist/index.css`.
- Note: `package.json#files` includes `src/`, so sandbox sources ship in the npm tarball (same pre-existing behavior as `src/showcases/**`); they are not part of the published JS/CSS bundle.

## Component conventions

- New component lives at `src/components/<layer>/<kebab-name>/` with `<name>.tsx` and `<name>.props.ts`. Name is `IT` + PascalCase.
- Every prop needs a JSDoc comment; every default export needs a JSDoc block with at least one `@example`.
- Register the component and its props type in `src/index.ts` (`import` + `export type`).
- After changing a component, update `docs/<layer>/<component>.md`, `DOCUMENTACION_DETALLADA_COMPONENTES.txt`, `LLM_DOCS.md`, and the matching `src/showcases/*.tsx` (`ShowcaseLayout` `doc` prop). Full standard: `.agents/skills/component-gen/SKILL.md`.
- **Examples live in the dev sandbox** (`pnpm dev` → `src/showcases/*.tsx`) and that is the only example surface (Storybook was removed). Per-component Markdown reference lives in `docs/`.

## i18n

- Every visible string comes from `useITTranslation()` → `t("namespace.key")`; never hardcode UI text. Formatting goes through the hook too (`formatNumber`, `formatCurrency`, `formatDate`, `dateLocale`).
- Add new keys to **both** `src/i18n/locales/es.ts` and `src/i18n/locales/en.ts` (same key names, `namespace.camelCase`; see `docs/i18n/conventions.md`).
- Runtime lives in `src/i18n/` and is exported from `src/index.ts`; docs in `docs/i18n/`. Without `ITI18nProvider` the output is identical to the Spanish default, and explicit component props always win over the catalog.

## CSS gotchas

- Per-component `.css` files do NOT reach the published bundle. New keyframes/scoped CSS go in `src/index.css` under `@layer components` with an `it-` prefix. Today only `src/index.css` and `src/dev.css` exist.
- `check:css` enforces: class names prefixed `it-`, tokens namespaced `--it-*`, `:where(.it-*)` selectors, and no duplicate class definitions in `dist/index.css`.
- Tailwind v4 cannot see runtime-built classes. `grid-cols-${n}` / `col-span-${n}` (built in `grid.tsx` and `utils/styles.ts`) must be listed in the `@source inline(...)` safelist in `src/index.css`, or they are absent from the bundle.
- Ordering trap: `col-span-full` is emitted after `col-span-N`, so a grid item must not carry both `col-span-full` and a base span.

## Release

- CI (`.github/workflows/publish-ui.yml`) runs on push to `main`/`master`, auto-bumps the version, and publishes to npm. Bump rule from the latest commit message: `BREAKING CHANGE` → major, `^feat:` → minor, otherwise patch. Commit prefixes directly drive releases.
- Build outputs are partly committed (`dist/index.d.ts`, `dist-app/`); regenerate with `pnpm bundle` / `pnpm build:app` instead of editing by hand.
