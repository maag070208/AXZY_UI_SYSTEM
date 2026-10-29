# Contrato de vocabulario — formato v1

> **Generado** por `scripts/build-json-renderer-docs.mjs` desde `src/json-renderer/catalog/axzyCatalog.ts`.
> No lo edites a mano: cambia el catálogo y vuelve a ejecutar el script.
>
> Versión JSON para herramientas: [`vocabulario.json`](./vocabulario.json).

## Reglas para el emisor

- Emite SOLO JSON válido con la forma: { $schema: "axzy/screen", version, id, content }.
- `content` es un nodo o un array de nodos; cada nodo necesita `type` del catálogo.
- Usa solo props declaradas para ese `type`; el resto se ignora y se avisa.
- Los hijos se expresan con `children` (nodos) y los textos con `text`, nunca con props de nodo React.
- Las acciones se declaran por nombre: `"onClick": { "action": "nombre.registrado" }`. No hay código en el JSON.
- Prohibido: HTML crudo, URLs, fetch, expresiones JS y props como icon/actions/render.
- Los textos visibles deben ser claves de i18n: { "i18n": "namespace.clave" }.

## Componentes disponibles (18)

Los `*` marcan props obligatorias.

| Tipo | Para qué | children | text | Props |
|---|---|---|---|---|
| `ITAlert` | Aviso con variante semántica. | sí | sí | `variant`: enum (`info` · `success` · `warning` · `error`)<br>`title`: string<br>`dismissible`: boolean<br>`onDismiss`: action<br>`className`: string |
| `ITAvatar` | Avatar con imagen o iniciales. | — | — | `src`: string<br>`alt`: string<br>`initials`: string<br>`size`: enum (`xs` · `sm` · `md` · `lg` · `xl`)<br>`color`: string<br>`onClick`: action<br>`className`: string |
| `ITBadget` | Insignia de estado. | sí | sí | `label`: string<br>`color`: enum (`primary` · `secondary` · `success` · `danger` · `warning` · `info` · `purple` · `error` · `gray`)<br>`size`: enum (`sm` · `md` · `lg`)<br>`variant`: enum (`soft` · `filled` · `outlined`)<br>`className`: string |
| `ITButton` | Botón. `onClick` es una acción registrada por el host. | sí | sí | `label`: string<br>`color`: enum (`primary` · `secondary` · `success` · `danger` · `warning` · `info` · `purple` · `error` · `gray`)<br>`size`: enum (`sm` · `md` · `lg`)<br>`variant`: enum (`filled` · `outlined` · `raised` · `rounded` · `text` · `raised-text` · `icon-only` · `link`)<br>`disabled`: boolean<br>`type`: enum (`button` · `submit` · `reset`)<br>`ariaLabel`: string<br>`title`: string<br>`onClick`: action<br>`className`: string |
| `ITCard` | Tarjeta con título, imagen y contenido. | sí | — | `title`: string<br>`tone`: enum (`primary` · `secondary` · `ternary` · `success` · `info` · `warning` · `danger`)<br>`image`: string<br>`alt`: string<br>`onClick`: action<br>`imageClassName`: string<br>`titleClassName`: string<br>`contentClassName`: string<br>`actionClassName`: string<br>`className`: string |
| `ITChip` | Etiqueta compacta, opcionalmente removible o seleccionable. | sí | sí | `label`: string<br>`color`: enum (`primary` · `secondary` · `success` · `danger` · `warning` · `info` · `purple` · `error` · `gray`)<br>`size`: enum (`sm` · `md` · `lg`)<br>`variant`: enum (`soft` · `filled` · `outlined`)<br>`removable`: boolean<br>`selected`: boolean<br>`disabled`: boolean<br>`onRemove`: action<br>`onClick`: action<br>`className`: string |
| `ITDataTable` | Tabla con paginación, orden y filtros. Los datos llegan de una fuente que el host resuelve (`$source`). | — | — | `columns` *: columns<br>`fetchData` *: data<br>`title`: string<br>`defaultItemsPerPage`: integer<br>`itemsPerPageOptions`: array<br>`debounceMs`: integer<br>`variant`: enum (`default` · `striped` · `bordered` · `minimal`)<br>`size`: enum (`sm` · `md` · `lg`)<br>`density`: enum (`compact` · `normal` · `comfortable`)<br>`layout`: enum (`auto` · `fixed`)<br>`showVerticalBorder`: boolean<br>`autoCardBreakpoint`: integer<br>`onRowClick`: action<br>`className`: string<br>`containerClassName`: string |
| `ITDivider` | Separador horizontal o vertical. | — | — | `orientation`: enum (`horizontal` · `vertical`)<br>`color`: string<br>`thickness`: string<br>`className`: string |
| `ITEmptyState` | Estado vacío con título, descripción y acción. | — | sí | `title` *: string<br>`description`: string<br>`className`: string |
| `ITFlex` | Contenedor flex completo. | sí | — | `direction`: enum (`row` · `column`)<br>`align`: enum (`start` · `center` · `end` · `stretch` · `baseline`)<br>`justify`: enum (`start` · `center` · `end` · `between` · `around` · `evenly`)<br>`wrap`: enum (`nowrap` · `wrap` · `wrap-reverse`)<br>`gap`: number<br>`grow`: boolean<br>`shrink`: boolean<br>`basis`: string<br>`className`: string |
| `ITGrid` | Rejilla de 12 columnas; `item` para una celda. | sí | — | `container`: boolean<br>`item`: boolean<br>`spacing`: number<br>`columns`: integer<br>`xs`: integer<br>`sm`: integer<br>`md`: integer<br>`lg`: integer<br>`xl`: integer<br>`className`: string |
| `ITImage` | Imagen con respaldo si falla la carga. | — | — | `src` *: string<br>`alt`: string<br>`fallback`: string<br>`onClick`: action<br>`className`: string |
| `ITLoader` | Indicador de carga. | — | — | `variant`: enum (`spinner` · `dots` · `bar` · `pulse`)<br>`size`: enum (`xs` · `sm` · `md` · `lg` · `xl`)<br>`color`: string<br>`className`: string |
| `ITProgress` | Barra de progreso. | — | — | `value`: number<br>`max`: number<br>`variant`: enum (`determinate` · `indeterminate`)<br>`color`: enum (`primary` · `secondary` · `success` · `danger` · `warning` · `info` · `purple` · `error` · `gray`)<br>`size`: enum (`sm` · `md` · `lg`)<br>`className`: string |
| `ITSkeleton` | Marcador de carga con forma. | — | — | `variant`: enum (`text` · `rect` · `circle`)<br>`width`: string<br>`height`: string<br>`count`: integer<br>`className`: string |
| `ITStack` | Pila con dirección y separación uniforme. | sí | — | `direction`: enum (`row` · `column`)<br>`spacing`: number<br>`alignItems`: enum (`start` · `center` · `end` · `stretch` · `baseline`)<br>`justifyContent`: enum (`start` · `center` · `end` · `between` · `around` · `evenly`)<br>`flexWrap`: enum (`nowrap` · `wrap` · `wrap-reverse`)<br>`className`: string |
| `ITStatCard` | Métrica con valor y tendencia. | — | — | `label` *: string<br>`value` *: string<br>`trend`: string<br>`trendDirection`: enum (`up` · `down` · `neutral`)<br>`color`: string<br>`onClick`: action<br>`className`: string |
| `ITText` | Texto semántico. Usa `text` o `children` para el contenido. | sí | sí | `as`: enum (`span` · `p` · `h1` · `h2` · `h3` · `h4` · `label` · `div` · `strong` · `em`)<br>`muted`: boolean<br>`className`: string |

## Tipos excluidos

| Tipo | Motivo |
|---|---|
| `ITJsonRenderer` | Recursión: un esquema no puede pedir otro renderer. |
| `ITSchemaRenderer` | Recursión: un esquema no puede pedir otro renderer. |
| `ITJSONEditor` | Ejecuta entrada del usuario como código. |
| `ITFormBuilder` | Se sustituye por el nodo `form` del motor. |
| `ITWysiwyg` | Produce HTML, que se salta la lista blanca. |
| `ITI18nProvider` | Lo monta el host, no el esquema. |
| `ITThemeProvider` | Lo monta el host, no el esquema. |
| `ITLayout` | El shell lo declara el router, no un nodo suelto. |
| `ITNavbar` | El shell lo declara el router, no un nodo suelto. |
| `ITSidebar` | El shell lo declara el router, no un nodo suelto. |
| `ITTopBar` | El shell lo declara el router, no un nodo suelto. |

## Nodo mínimo

- `ITAlert`: `{"type":"ITAlert","text":"Texto"}`
- `ITAvatar`: `{"type":"ITAvatar"}`
- `ITBadget`: `{"type":"ITBadget","text":"Texto"}`
- `ITButton`: `{"type":"ITButton","text":"Texto"}`
- `ITCard`: `{"type":"ITCard"}`
- `ITChip`: `{"type":"ITChip","text":"Texto"}`
- `ITDataTable`: `{"type":"ITDataTable","props":{"columns":"columns","fetchData":"fetchData"}}`
- `ITDivider`: `{"type":"ITDivider"}`
- `ITEmptyState`: `{"type":"ITEmptyState","props":{"title":"title"},"text":"Texto"}`
- `ITFlex`: `{"type":"ITFlex"}`
- `ITGrid`: `{"type":"ITGrid"}`
- `ITImage`: `{"type":"ITImage","props":{"src":"/imagen.png"}}`
- `ITLoader`: `{"type":"ITLoader"}`
- `ITProgress`: `{"type":"ITProgress"}`
- `ITSkeleton`: `{"type":"ITSkeleton"}`
- `ITStack`: `{"type":"ITStack"}`
- `ITStatCard`: `{"type":"ITStatCard","props":{"label":"label","value":"value"}}`
- `ITText`: `{"type":"ITText","text":"Texto"}`

## Prompt listo para copiar

```text
# Contrato de vocabulario AXZY (formato v1)

Reglas:
- Emite SOLO JSON válido con la forma: { $schema: "axzy/screen", version, id, content }.
- `content` es un nodo o un array de nodos; cada nodo necesita `type` del catálogo.
- Usa solo props declaradas para ese `type`; el resto se ignora y se avisa.
- Los hijos se expresan con `children` (nodos) y los textos con `text`, nunca con props de nodo React.
- Las acciones se declaran por nombre: `"onClick": { "action": "nombre.registrado" }`. No hay código en el JSON.
- Prohibido: HTML crudo, URLs, fetch, expresiones JS y props como icon/actions/render.
- Los textos visibles deben ser claves de i18n: { "i18n": "namespace.clave" }.

Componentes:
- ITAlert — Aviso con variante semántica.
  props: variant:enum (info|success|warning|error), title:string, dismissible:boolean, onDismiss:action, className:string
  children: sí
  text: sí
  mínimo: {"type":"ITAlert","text":"Texto"}
- ITAvatar — Avatar con imagen o iniciales.
  props: src:string, alt:string, initials:string, size:enum (xs|sm|md|lg|xl), color:string, onClick:action, className:string
  mínimo: {"type":"ITAvatar"}
- ITBadget — Insignia de estado.
  props: label:string, color:enum (primary|secondary|success|danger|warning|info|purple|error|gray), size:enum (sm|md|lg), variant:enum (soft|filled|outlined), className:string
  children: sí
  text: sí
  mínimo: {"type":"ITBadget","text":"Texto"}
- ITButton — Botón. `onClick` es una acción registrada por el host.
  props: label:string, color:enum (primary|secondary|success|danger|warning|info|purple|error|gray), size:enum (sm|md|lg), variant:enum (filled|outlined|raised|rounded|text|raised-text|icon-only|link), disabled:boolean, type:enum (button|submit|reset), ariaLabel:string, title:string, onClick:action, className:string
  children: sí
  text: sí
  mínimo: {"type":"ITButton","text":"Texto"}
- ITCard — Tarjeta con título, imagen y contenido.
  props: title:string, tone:enum (primary|secondary|ternary|success|info|warning|danger), image:string, alt:string, onClick:action, imageClassName:string, titleClassName:string, contentClassName:string, actionClassName:string, className:string
  children: sí
  mínimo: {"type":"ITCard"}
- ITChip — Etiqueta compacta, opcionalmente removible o seleccionable.
  props: label:string, color:enum (primary|secondary|success|danger|warning|info|purple|error|gray), size:enum (sm|md|lg), variant:enum (soft|filled|outlined), removable:boolean, selected:boolean, disabled:boolean, onRemove:action, onClick:action, className:string
  children: sí
  text: sí
  mínimo: {"type":"ITChip","text":"Texto"}
- ITDataTable — Tabla con paginación, orden y filtros. Los datos llegan de una fuente que el host resuelve (`$source`).
  props: columns:columns*, fetchData:data*, title:string, defaultItemsPerPage:integer, itemsPerPageOptions:array, debounceMs:integer, variant:enum (default|striped|bordered|minimal), size:enum (sm|md|lg), density:enum (compact|normal|comfortable), layout:enum (auto|fixed), showVerticalBorder:boolean, autoCardBreakpoint:integer, onRowClick:action, className:string, containerClassName:string
  mínimo: {"type":"ITDataTable","props":{"columns":"columns","fetchData":"fetchData"}}
- ITDivider — Separador horizontal o vertical.
  props: orientation:enum (horizontal|vertical), color:string, thickness:string, className:string
  mínimo: {"type":"ITDivider"}
- ITEmptyState — Estado vacío con título, descripción y acción.
  props: title:string*, description:string, className:string
  text: sí
  mínimo: {"type":"ITEmptyState","props":{"title":"title"},"text":"Texto"}
- ITFlex — Contenedor flex completo.
  props: direction:enum (row|column), align:enum (start|center|end|stretch|baseline), justify:enum (start|center|end|between|around|evenly), wrap:enum (nowrap|wrap|wrap-reverse), gap:number, grow:boolean, shrink:boolean, basis:string, className:string
  children: sí
  mínimo: {"type":"ITFlex"}
- ITGrid — Rejilla de 12 columnas; `item` para una celda.
  props: container:boolean, item:boolean, spacing:number, columns:integer, xs:integer, sm:integer, md:integer, lg:integer, xl:integer, className:string
  children: sí
  mínimo: {"type":"ITGrid"}
- ITImage — Imagen con respaldo si falla la carga.
  props: src:string*, alt:string, fallback:string, onClick:action, className:string
  mínimo: {"type":"ITImage","props":{"src":"/imagen.png"}}
- ITLoader — Indicador de carga.
  props: variant:enum (spinner|dots|bar|pulse), size:enum (xs|sm|md|lg|xl), color:string, className:string
  mínimo: {"type":"ITLoader"}
- ITProgress — Barra de progreso.
  props: value:number, max:number, variant:enum (determinate|indeterminate), color:enum (primary|secondary|success|danger|warning|info|purple|error|gray), size:enum (sm|md|lg), className:string
  mínimo: {"type":"ITProgress"}
- ITSkeleton — Marcador de carga con forma.
  props: variant:enum (text|rect|circle), width:string, height:string, count:integer, className:string
  mínimo: {"type":"ITSkeleton"}
- ITStack — Pila con dirección y separación uniforme.
  props: direction:enum (row|column), spacing:number, alignItems:enum (start|center|end|stretch|baseline), justifyContent:enum (start|center|end|between|around|evenly), flexWrap:enum (nowrap|wrap|wrap-reverse), className:string
  children: sí
  mínimo: {"type":"ITStack"}
- ITStatCard — Métrica con valor y tendencia.
  props: label:string*, value:string*, trend:string, trendDirection:enum (up|down|neutral), color:string, onClick:action, className:string
  mínimo: {"type":"ITStatCard","props":{"label":"label","value":"value"}}
- ITText — Texto semántico. Usa `text` o `children` para el contenido.
  props: as:enum (span|p|h1|h2|h3|h4|label|div|strong|em), muted:boolean, className:string
  children: sí
  text: sí
  mínimo: {"type":"ITText","text":"Texto"}
```
