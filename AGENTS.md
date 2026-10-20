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
- `pnpm test` / `pnpm test:watch` — Vitest. Cubre el motor de pantallas (`src/json-renderer/**/*.test.ts(x)`); el resto se verifica a mano en el sandbox.
- `pnpm ext:catalog` / `pnpm ext:typecheck` / `pnpm ext:build` / `pnpm ext:package` — VS Code extension in `vscode-extension/` (see below).
- `pnpm docs:llm` — regenerates the AI documentation: `pnpm ext:catalog` → `docs/llm/` (`catalogo.md` + `catalogo.json`) → `ai/` bundle.
- `pnpm docs:ai` — only the `ai/` bundle (requires `docs/llm/` to exist).
- `pnpm docs:json-renderer` — regenera el contrato de vocabulario del motor (`docs/json-renderer/vocabulario.json` + `VOCABULARIO.md`) desde el catálogo. No requiere `pnpm bundle`: usa esbuild para compilar el generador.
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
  - `#demo` → portafolio de demostración pintado **solo** con el motor de pantallas (`public/demo/portfolio.schema.json`). Es la prueba de extremo a extremo del motor: carga, valida y pinta un JSON real.
  - `#demo/app/<página>` → dashboard de demostración con páginas (`inicio`, `usuarios`, `pedidos`) en `public/demo/app/*.json`: shell y datos los pone el host (`src/showcases/DemoJsonDashboard.tsx`), las pantallas son JSON con `ITDataTable` alimentada por `$source`.
  - empty hash / unknown first segment → the personal portfolio at `/`.
- Group slug map: `general→general`, `struc→structure`, `forms→forms`, `data→viewdata`, `nav→navigation`, `feed→feedback`. The catalog, slug map and helpers (`SANDBOX_GROUPS`, `GROUP_SLUGS`, `SLUG_TO_GROUP`, `groupBySlug`, `firstItemOf`, `isValidItem`, `TOTAL_ITEMS`) live in `src/sandbox/navigation.ts`; item ids are the `renderShowcase` cases in `src/App.tsx`.
- Sandbox-only keyframes (`it-landing-rise` / `it-landing-float` / `it-landing-grid` / `it-logo-latido`) live in `src/dev.css`; only `src/main.tsx` imports it, so they never reach `dist/index.css`.
- **Marca axzydev** del sitio: el componente es `src/sandbox/AxzyLogo.tsx` (`AxzyLogo` para navbar/hero/footer y `AxzyLoader` para cargas) y los assets son SVG del kit `axzydev-brand-kit/logos/svg`, copiados a `public/brand/` (`icon.svg`, `logo-color.svg` para fondo claro, `logo-dark.svg` para fondo oscuro). El wordmark cambia de variante según `resolvedTheme`; no hay Lottie ni dependencias nuevas. `index.html` usa el favicon del kit y `public/site.webmanifest` la PWA. Nada de esto entra en `dist/`.
- Note: `package.json#files` includes `src/`, so sandbox sources ship in the npm tarball (same pre-existing behavior as `src/showcases/**`); they are not part of the published JS/CSS bundle.

## Motor de pantallas (`src/json-renderer/`)

- Dominio propio, hermano de `components/`: **consume** componentes y publica su API desde `src/index.ts`. No es una capa atómica, así que queda fuera de `check:atomic-deps` (que solo vigila `src/components/**`).
- El esquema **nunca** ejecuta código, ni hace red, ni pinta HTML: se trata como entrada no confiable. Toda autoridad (componentes, props, acciones, datos, permisos) vive en registros del host.
- `src/json-renderer/catalog/axzyCatalog.ts` es la lista blanca. Al añadir un componente al catálogo, regenera el contrato con `pnpm docs:json-renderer` y comprueba que su nodo mínimo valida.
- El streaming es una capacidad del kernel (nodo `$status: "pending"`, `parsePartialSchema`), no un añadido: un JSON a medias sigue siendo pintable.
- Documentación: `docs/json-renderer/` (ALCANCE, PLAN-IMPLEMENTACION, REFERENCIA, STREAMING, VOCABULARIO generado).
- Los códigos `JR0xx` son contrato estable; no se renumeran.
- **Clases en el JSON**: Tailwind solo genera lo que ve en el código, así que un `className` dentro de un esquema no existe en el bundle salvo que se apunte al archivo. `src/dev.css` lo hace con `@source "../public/demo/*.json"` para el demo (dev-only).

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
