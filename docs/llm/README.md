# Documentación para IA (`docs/llm/`)

Todo lo que necesita un modelo para escribir código correcto con AXZY UI System.

| Archivo | Origen | Para qué |
| --- | --- | --- |
| [`GUIA.md`](./GUIA.md) | escrito a mano | Cómo pensar y escribir código: reglas, composición, theming, i18n, accesibilidad, **trampas** y recetas |
| [`ejemplos-reales.md`](./ejemplos-reales.md) | extraído de **CYC ERP** (producción) | Capas de CSS, provider real, chassis en un guard, páginas de listado/formulario/tablero, tabla con API y toasts globales |
| [`catalogo.md`](./catalogo.md) | **generado** desde el código | 61 componentes con todos sus props, tipos, defaults y ejemplo |
| [`catalogo.json`](./catalogo.json) | **generado** desde el código | El mismo catálogo en JSON (para indexar o pegar en contexto) |

## Regenerar el catálogo

```bash
pnpm docs:llm     # = pnpm ext:catalog && node scripts/build-llm-docs.mjs
```

`pnpm ext:catalog` usa el compilador de TypeScript sobre `src/index.ts` para leer los props reales
(`src/components/**/*.props.ts`, con sus JSDoc y `@default`). Por eso el catálogo **no se queda viejo**:
si cambias un prop, vuelve a generarlo y el Markdown queda al día.

## Orden recomendado al alimentar a una IA

1. `GUIA.md` — reglas y patrones (siempre).
2. `ejemplos-reales.md` — cómo se ve el código de verdad (siempre que vaya a escribir pantallas).
3. `catalogo.md` — props exactos (siempre; o `catalogo.json` si tu herramienta indexa JSON).
4. `../LLM_DOCS.md` — solo si va a tocar theming, variables `--it-*` o el chassis de layout.
