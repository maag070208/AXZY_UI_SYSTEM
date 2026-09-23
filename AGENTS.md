# AGENTS.md

## What this repo is

- React + TypeScript **component library** published to npm as `@axzydev/axzy_ui_system` (Tailwind CSS v4).
- Shipped entrypoint is `src/index.ts`. `src/main.tsx`, `src/App.tsx`, and `src/showcases/*` are the local sandbox/showroom only.
- Package manager is pnpm (pinned `10.34.0`). Use `pnpm`, not npm.

## Commands

- `pnpm dev` — Vite sandbox at http://localhost:5173
- `pnpm storybook` — Storybook at http://localhost:6006
- `pnpm lint` — ESLint + `check:atomic` + `check:css`. Must end with `0 errors` (the many `no-explicit-any` warnings are intentional).
- `pnpm check:atomic` / `pnpm check:css` — run a single check
- `pnpm bundle` — build the published package: tsup (JS + `.d.ts`) then `scripts/build-css.mjs` → `dist/`
- `pnpm build` — **alias of `pnpm bundle`**. The README's "TypeScript + Vite build" description is stale; trust `package.json`.
- `pnpm build:app` — build the sandbox into `dist-app/`
- No `test` script. Tests are Storybook interaction tests run through Vitest + Playwright Chromium (`pnpm exec vitest run`; config in `vite.config.ts` under `test.projects`).

## Architecture and boundaries

- Atomic layers in `src/components/`: `atoms` < `molecules` < `organisms` < `templates`. `theme-provider/` is a provider and exempt.
- `scripts/check-atomic-deps.mjs` fails on any upward import (e.g. an atom importing a molecule). Keep dependencies one-directional.
- Import aliases: `@/` and `@app/` → `src/`, `@components/` → `src/components/`, `@types/` → `src/types/`.
- Theming: `import { theme } from "@/theme/theme"`. Do not hardcode colors.

## Component conventions

- New component lives at `src/components/<layer>/<kebab-name>/` with `<name>.tsx`, `<name>.props.ts`, `<name>.stories.tsx` (optional `.doc.mdx`). Name is `IT` + PascalCase.
- Every prop needs a JSDoc comment; every default export needs a JSDoc block with at least one `@example`.
- Register the component and its props type in `src/index.ts` (`import` + `export type`).
- After changing a component, update `DOCUMENTACION_DETALLADA_COMPONENTES.txt`, `LLM_DOCS.md`, and the matching `src/showcases/*.tsx` (`ShowcaseLayout` `doc` prop). Full standard: `.agents/skills/component-gen/SKILL.md`.

## CSS gotchas

- Per-component `.css` files do NOT reach the published bundle. New keyframes/scoped CSS go in `src/index.css` under `@layer components` with an `it-` prefix. Today only `src/index.css` and `src/dev.css` exist.
- `check:css` enforces: class names prefixed `it-`, tokens namespaced `--it-*`, `:where(.it-*)` selectors, and no duplicate class definitions in `dist/index.css`.
- Tailwind v4 cannot see runtime-built classes. `grid-cols-${n}` / `col-span-${n}` (built in `grid.tsx` and `utils/styles.ts`) must be listed in the `@source inline(...)` safelist in `src/index.css`, or they are absent from the bundle.
- Ordering trap: `col-span-full` is emitted after `col-span-N`, so a grid item must not carry both `col-span-full` and a base span.

## Release

- CI (`.github/workflows/publish-ui.yml`) runs on push to `main`/`master`, auto-bumps the version, and publishes to npm. Bump rule from the latest commit message: `BREAKING CHANGE` → major, `^feat:` → minor, otherwise patch. Commit prefixes directly drive releases.
- Build outputs are partly committed (`dist/index.d.ts`, `dist-app/`); regenerate with `pnpm bundle` / `pnpm build:app` instead of editing by hand.
