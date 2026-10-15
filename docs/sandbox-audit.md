# Auditoría del sandbox (`#ui-system`)

Herramienta: `pnpm audit:sandbox` (o `node scripts/audit-sandbox.mjs`), con `pnpm build:app` antes.
Recorre las **45 páginas** del sandbox en una sola sesión de Chrome y reporta:

1. **Violaciones de axe** con el set completo de reglas (no solo los tags WCAG: incluye
   `landmark-*`, `heading-order`, `empty-table-header`…).
2. **Contenido recortado**: elementos con `overflow: hidden` cuyo contenido no cabe (el síntoma que
   hacía que un demo de `ITLayout` apareciera cortado).
3. **Pestaña de documentación**: cuántos props, ejemplos y notas renderiza cada página que la declara.

`--strict` sale con código 1 si hay recortes o violaciones (para CI).

## Estado (última corrida)

| Métrica | Valor |
| --- | --- |
| Páginas auditadas | 45 |
| Recortes de contenido | **0** |
| Páginas con violaciones | 17 |
| Páginas con pestaña de Docs | 15 (todas con contenido) |

## Pendiente, agrupado por causa

**A. Controles de demo sin nombre accesible** — `label` (~15 nodos) y `select-name` (~24) en
`structure/stack`, `structure/flex`, `structure/grid`, `structure/pageheader`, `structure/page`,
`forms/multiselect`, `forms/chipinput`, `forms/dropfile`, `viewdata/table`, `viewdata/datatable`.
Los `ITSelect`/`ITInput` del panel de controles no reciben `label`. Dos vías: pasarlos en cada
showcase, o que `ITSelect`/`ITInput` caigan a `aria-label` desde `name` cuando no hay `label`.

**B. Botones sin nombre** — `button-name` (~25) en `pageheader` (11), `viewdata/table` (8),
`structure/page` (5), `forms/calendar` (2), `navigation/stepper` (1). Son botones de solo ícono
(acciones de fila, navegación de calendario, pasos): necesitan `aria-label`/`title` en la librería o
`ariaLabel` en el showcase.

**C. Tablas** — `empty-table-header` (9), `nested-interactive` (6) y `scrollable-region-focusable` (3)
en `viewdata/table` y `viewdata/datatable`: la columna de acciones necesita rótulo (aunque sea
visualmente oculto), las filas con `onClick` no deben contener botones enfocables dentro, y el
contenedor con scroll necesita `tabIndex={0}`. Todo en `ITTable`/`ITDataTable`.

**D. Landmarks duplicados al demostrar un layout** — `landmark-*` (14) en `structure/layout`:
el demo renderiza un `ITLayout` dentro del `ITLayout` del sandbox, así que hay dos `<main>` y varios
`<aside>`. El patrón correcto para una maqueta es sacarla del árbol de accesibilidad
(`aria-hidden` + `inert`) o aislarla en un iframe.

**E. Puntuales** — `aria-progressbar-name` (`structure/card`), `aria-input-field-name`
(`forms/wysiwyg`), `color-contrast` ×1 (`forms/formbuilder`), `heading-order` en `pageheader`, `page`
y `layout`, y `landmark-unique` por navs repetidos (breadcrumbs y paginaciones clonadas en los demos).

## Ya resuelto en esta pasada

- **Galerías**: rótulos en mono (28), marcos uniformes de 10px con el filete de la hoja, y fuera los
  bloques de código dentro de la galería (el código ya vive en la pestaña «Código» de la vitrina).
- **Panel de propiedades**: la tarjeta se acota a 880px cuando la vitrina es a ancho completo (antes se
  estiraba a 1180px con un switch y una línea, y parecía vacía); en ese modo las filas de control ya no
  se estiran (`.it-panel-ancho` agrupa el control junto a su etiqueta en vez de dejarlo a 800px) y las
  notas se limitan a 72ch. Los rótulos de los controles que viven en los showcases (61 en total)
  pasaron al mono de metadatos. Los que renderiza la propia
  librería (`label` de `ITSelect`/`ITInput`/`ITSlideToggle`) siguen en sans a propósito: la jerarquía
  queda «grupo en mono, control en sans».

- Vitrina y galería con jerarquía correcta (`h1 → h2 → h3`), sin landmarks duplicados en el marco.
- Pestañas Propiedades/Documentación como pestañas reales (antes: píldora estirada a lo ancho).
- `general/sizes` reescrita (era la peor: sin `h1` y 19 fallos de contraste → 0).
- `general/getting-started` y `general/help` sin degradados decorativos ni colores arbitrarios.
- `structure/screen-dashboard` y `structure/screen-form` dentro del marco común (`demoAncho="completo"`).
- `ITSlideToggle` con nombre accesible y `ITSidebar` sin `aria-controls` colgando.
- `ITBadget` con el acento en `primary-700`/`primary-500` (antes 2.4:1 y 2.6:1).
