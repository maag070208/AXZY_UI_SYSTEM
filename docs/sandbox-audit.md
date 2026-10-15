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

**F. `ITNavbar`/`ITLayout` fuerzan `h-screen`** — el componente trae `h-screen` escrito a mano, así que
no se puede embeber: dentro de la galería (sin altura) se estiraba a 100vh y dejaba una caja vacía
enorme, y en la vitrina se salía de su marco de 640px. El sandbox lo esquiva desde fuera
(`className="!h-full"` en `ITLayout` y `[&>div]:!h-full` en los marcos del navbar), pero lo correcto es
que el componente llene a su contenedor (`h-full`) o acepte `className`.

**G. Encabezados dentro de los demos** — `heading-order` en las páginas de layout/pantallas porque
`ITPageHeader` rotula con `<h1>` y `ITCard` con `<h3>`: al demostrar una página completa dentro de la
página de documentación se saltan niveles. Se arregla dando nivel configurable a esos dos componentes.

**E. Puntuales** — `aria-progressbar-name` (`structure/card`), `aria-input-field-name`
(`forms/wysiwyg`), `color-contrast` ×1 (`forms/formbuilder`), `heading-order` en `pageheader`, `page`
y `layout`, y `landmark-unique` por navs repetidos (breadcrumbs y paginaciones clonadas en los demos).

## Ya resuelto en esta pasada

- **Página de componente rediseñada** («documentación viva»): contenedor de ejemplo con cabecera y
  botón de código visible, controles en grid, API siempre visible en la columna derecha (sin pestañas)
  y galería con el mismo contenedor por variación. La auditoría mide ahora esa columna de API.
- **Galerías**: jerarquía en dos niveles — eyebrow mono + **título display** para la sección, y cada
  variación con **barra de acento** + etiqueta en mono más oscura (antes las dos se veían iguales).
  Marcos uniformes de 10px y fuera los bloques de código dentro de la galería (el código ya vive en la
  pestaña «Código» de la vitrina).
  Los marcos de `ITNavbar`/`ITSidebar` tienen altura propia (380/320px) y el componente los llena, así
  que ya no hay cajas de 100vh vacías.
- **Panel de propiedades**: vuelve a su **columna derecha** en todas las páginas. Antes, las cinco
  páginas con demo ancho lo bajaban al medio de la hoja (entre la vitrina y la galería) y ahí se veía
  como un bloque suelto. Ahora los demos que necesitan anchura usan `demoMinAncho` (780px) y la
  vitrina desplaza en horizontal lo que sobre: el panel nunca se mueve de su sitio.
- Los rótulos de los controles que viven en los showcases (61 en total) pasaron al mono de metadatos. Los que renderiza la propia
  librería (`label` de `ITSelect`/`ITInput`/`ITSlideToggle`) siguen en sans a propósito: la jerarquía
  queda «grupo en mono, control en sans».

- Vitrina y galería con jerarquía correcta (`h1 → h2 → h3`), sin landmarks duplicados en el marco.
- Pestañas Propiedades/Documentación como pestañas reales (antes: píldora estirada a lo ancho).
- `general/sizes` reescrita (era la peor: sin `h1` y 19 fallos de contraste → 0).
- `general/getting-started` y `general/help` sin degradados decorativos ni colores arbitrarios.
- `structure/screen-dashboard` y `structure/screen-form` dentro del marco común (`demoAncho="completo"`).
- `ITSlideToggle` con nombre accesible y `ITSidebar` sin `aria-controls` colgando.
- `ITBadget` con el acento en `primary-700`/`primary-500` (antes 2.4:1 y 2.6:1).
