# AGENTS.md

## What this repo is

- React + TypeScript **component library** published to npm as `@axzydev/axzy_ui_system` (Tailwind CSS v4).
- Shipped entrypoint is `src/index.ts`. `src/main.tsx`, `src/App.tsx`, `src/showcases/*`, `src/sandbox/*`, and `src/dev.css` are the local sandbox/showroom only.
- Package manager is pnpm (pinned `10.34.0`). Use `pnpm`, not npm.

## Commands

- `pnpm dev` — Vite sandbox at http://localhost:5173
- `pnpm storybook` — Storybook at http://localhost:6006
- `pnpm lint` — ESLint + `check:atomic` + `check:css`. Must end with `0 errors` (the many `no-explicit-any` warnings are intentional).
- `pnpm check:atomic` / `pnpm check:css` — run a single check
- `pnpm bundle` — build the published package: tsup (JS + `.d.ts`) then `scripts/build-css.mjs` → `dist/`
- `pnpm build` — **alias of `pnpm bundle`** (tsup + CSS). Trust `package.json`.
- `pnpm build:app` — build the sandbox into `dist-app/`
- No `test` script. Tests are Storybook interaction tests run through Vitest + Playwright Chromium (`pnpm exec vitest run`; config in `vite.config.ts` under `test.projects`).

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

- New component lives at `src/components/<layer>/<kebab-name>/` with `<name>.tsx`, `<name>.props.ts`, `<name>.stories.tsx` (optional `.doc.mdx`). Name is `IT` + PascalCase.
- Every prop needs a JSDoc comment; every default export needs a JSDoc block with at least one `@example`.
- Register the component and its props type in `src/index.ts` (`import` + `export type`).
- After changing a component, update `DOCUMENTACION_DETALLADA_COMPONENTES.txt`, `LLM_DOCS.md`, and the matching `src/showcases/*.tsx` (`ShowcaseLayout` `doc` prop). Full standard: `.agents/skills/component-gen/SKILL.md`.
- **Examples live in the dev sandbox** (`pnpm dev` → `src/showcases/*.tsx`) and that is the primary example surface. Storybook stories (`.stories.tsx` / `.doc.mdx`) still exist and must keep compiling, but they are deliberately not the primary place for examples.

## CSS gotchas

- Per-component `.css` files do NOT reach the published bundle. New keyframes/scoped CSS go in `src/index.css` under `@layer components` with an `it-` prefix. Today only `src/index.css` and `src/dev.css` exist.
- `check:css` enforces: class names prefixed `it-`, tokens namespaced `--it-*`, `:where(.it-*)` selectors, and no duplicate class definitions in `dist/index.css`.
- Tailwind v4 cannot see runtime-built classes. `grid-cols-${n}` / `col-span-${n}` (built in `grid.tsx` and `utils/styles.ts`) must be listed in the `@source inline(...)` safelist in `src/index.css`, or they are absent from the bundle.
- Ordering trap: `col-span-full` is emitted after `col-span-N`, so a grid item must not carry both `col-span-full` and a base span.

## Release

- CI (`.github/workflows/publish-ui.yml`) runs on push to `main`/`master`, auto-bumps the version, and publishes to npm. Bump rule from the latest commit message: `BREAKING CHANGE` → major, `^feat:` → minor, otherwise patch. Commit prefixes directly drive releases.
- Build outputs are partly committed (`dist/index.d.ts`, `dist-app/`); regenerate with `pnpm bundle` / `pnpm build:app` instead of editing by hand.
