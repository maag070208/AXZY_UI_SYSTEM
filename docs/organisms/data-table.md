# ITDataTable

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/data-table/` |
| Archivo | `dataTable.tsx` |
| Props | `dataTable.props.ts` |
| Import | `import { ITDataTable } from "@axzydev/axzy_ui_system"` |

Tabla de datos asíncrona (server-side) con ordenación, filtrado por columna y paginación.
Vuelve a invocar `fetchData` cada vez que cambian la página, los filtros o el orden, con
debounce y overlay de carga. Reutiliza la capa visual de `ITTable` (`variant`, `size`,
`density`, vista de tarjetas y virtualización opcional).

> **No confundir con `ITTable`** (molecule, datos locales en memoria). `ITDataTable` no recibe
> `data`: delega la carga en `fetchData`.

## Import

```tsx
import { ITDataTable } from "@axzydev/axzy_ui_system";
```

## Props

### `ITDataTableProps<T>`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `columns` | `Column<T>[]` | — | Definiciones de columna (key, label, tipo, ordenación, filtros y render propio). |
| `fetchData` | `(params: ITDataTableFetchParams) => Promise<ITDataTableResponse<T>>` | — | Callback asíncrono que se dispara al cambiar paginación, filtros u orden. Debe resolver `{ data, total }`. |
| `debounceMs` | `number` | `500` | Milisegundos de espera tras cambiar los filtros internos antes de llamar a `fetchData`. El JSDoc del tipo declara `@default 400`; el valor real es `500` (ver Notas). |
| `externalFilters` | `ColumnFilters` | `{}` | Filtros gestionados fuera del componente (p. ej. un selector de rango de fechas). Se fusionan con los filtros de columna antes de llamar a `fetchData`. |
| `loadingIndicator` | `ReactNode` | — | Elemento personalizado en lugar del spinner por defecto mientras `isLoading`. |
| `fetchOnMount` | `boolean` | `true` | Vuelve a consultar automáticamente al montar. |
| `reloadTrigger` | `number \| string \| boolean` | — | Hook externo para forzar la re-consulta de la página actual (p. ej. tras enviar un formulario). |
| `containerClassName` | `string` | — | Clases CSS para el wrapper más externo. |
| `className` | `string` | — | Clases CSS aplicadas directamente al `<table>` (a diferencia de `ITTable`, aquí sí se aplica). |
| `variant` | `"default" \| "striped" \| "bordered" \| "minimal"` | `"default"` | Variante visual. `"minimal"` está en el tipo pero no tiene estilos definidos (ver Notas). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Preset de tamaño de fila (solo font-size). |
| `itemsPerPageOptions` | `number[]` | `[5, 10, 20]` | Opciones del selector de filas por página del paginador. |
| `defaultItemsPerPage` | `number` | `10` | Número de filas por página inicial. |
| `title` | `string \| ReactNode` | — | Título opcional sobre la tabla (también aloja el conmutador Tabla/Tarjetas). |
| `renderCard` | `(row: T) => React.ReactNode` | — | Render de tarjeta para la vista responsive. Si no se pasa, se genera una tarjeta por defecto. |
| `defaultView` | `"table" \| "cards"` | `"table"` | Modo de vista inicial. |
| `showVerticalBorder` | `boolean` | `true` | Muestra bordes verticales entre columnas. |
| `verticalBorderClassname` | `string` | — | Clase personalizada para los bordes verticales (sobreescribe el gris por defecto). |
| `onRowClick` | `(row: T, event: MouseEvent<HTMLElement> \| KeyboardEvent<HTMLElement>) => void` | — | Se dispara al activar una fila o tarjeta. No se dispara si el evento nace en un hijo interactivo (`button`, `link`, `input` o `[data-row-click-ignore]`). |
| `layout` | `"auto" \| "fixed"` | `"auto"` | Algoritmo de layout. `"fixed"` respeta los `width` de columna y elimina los mínimos (`min-w-max`/`min-w-[150px]`). |
| `density` | `TableDensity` | `"normal"` | Padding de celda y alto de fila: `"compact"`, `"normal"`, `"comfortable"`. Independiente de `size`. |
| `autoCardBreakpoint` | `number` | `0` | Ancho de contenedor (px) por debajo del cual se fuerza la vista de tarjetas. `0` lo desactiva. |
| `virtualized` | `boolean` | `false` | Activa la virtualización de filas en la vista de tabla. La vista de tarjetas nunca se virtualiza. |
| `virtualizedMaxHeight` | `number` | `400` | Altura máxima (px) del contenedor scrollable virtualizado. Solo con `virtualized`. |
| `rowHeight` | `number` | `getRowHeight(size, density)` | Alto de fila uniforme (px) usado por el virtualizador. Solo con `virtualized`. |
| `overscan` | `number` | `5` | Filas extra renderizadas fuera del viewport. Solo con `virtualized`. |
| `stickyHeader` | `boolean` | `false` | Fija la cabecera mientras se hace scroll en el cuerpo virtualizado. Solo con `virtualized`. |

### Heredadas de `TableDesignProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `showViewToggle` | `boolean` | `true` | Renderiza el conmutador Tabla\|Tarjetas en la toolbar. |
| `design` | `TableDesign` | — | Sobreescrituras visuales por región (clases + estilos inline). |
| `colors` | `TableColors` | — | Sobreescrituras de color por instancia (header/filas), superan al tema global. |
| `containerStyle` | `CSSProperties` | — | Estilos inline del wrapper más externo. |
| `cardClassName` | `string` | — | Clases extra de la superficie de tarjeta. |
| `cardStyle` | `CSSProperties` | — | Estilos inline de la superficie de tarjeta. |
| `toolbarClassName` / `toolbarStyle` | `string` / `CSSProperties` | — | Clases/estilos de la franja de toolbar (título + conmutador). |
| `headerClassName` / `headerStyle` | `string` / `CSSProperties` | — | Clases/estilos de la fila de cabecera. |
| `headerCellClassName` / `headerCellStyle` | `string` / `CSSProperties` | — | Clases/estilos de cada celda de cabecera. |
| `rowClassName` / `rowStyle` | `string` / `CSSProperties` | — | Clases/estilos de cada fila del cuerpo. |
| `cellClassName` / `cellStyle` | `string` / `CSSProperties` | — | Clases/estilos de cada celda del cuerpo. |
| `cardsClassName` / `cardsStyle` | `string` / `CSSProperties` | — | Clases/estilos del wrapper scrollable de la vista de tarjetas. |
| `footerClassName` / `footerStyle` | `string` / `CSSProperties` | — | Clases/estilos de la franja del pie de paginación. |
| `showViewToggle` | `boolean` | `true` | Renderiza el conmutador Tabla/Tarjetas. Ocultarlo sigue respetando `defaultView` y `autoCardBreakpoint`. |

## Tipos relacionados

### `ITDataTableFetchParams`

```typescript
export interface ITDataTableFetchParams {
  page: number;          // página actual, 1-indexada
  limit: number;         // filas solicitadas por página
  filters: ColumnFilters; // filtros por columna + externalFilters ya fusionados
  sort?: { key: string; direction: "asc" | "desc" };
}
```

### `ITDataTableResponse<T>`

```typescript
export interface ITDataTableResponse<T> {
  data: T[];
  total: number;
}
```

`Column<T>` vive en `src/components/molecules/table/table.props.ts` y se exporta desde
`@axzydev/axzy_ui_system`; los tipos `ColumnFilters`, `TableDesign*` y `TableColors` viven en
`src/types/table.types.ts`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITDataTable } from "@axzydev/axzy_ui_system";
import type {
  ITDataTableFetchParams,
  ITDataTableResponse,
  Column,
} from "@axzydev/axzy_ui_system";

interface Usuario {
  id: number;
  nombre: string;
  activo: boolean;
  monto: number;
}

const columns: Column<Usuario>[] = [
  { key: "nombre", label: "Nombre", type: "string", sortable: true, filter: true, width: 220 },
  { key: "activo", label: "Activo", type: "boolean", filter: true, align: "center" },
  { key: "monto", label: "Monto", type: "number", currencyMX: true, align: "right" },
];

async function apiFetchUsuarios(params: { page: number; limit: number }) {
  void params;
  return { data: [] as Usuario[], total: 0 };
}

export default function UsuariosDataTable() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <ITDataTable<Usuario>
      title="Usuarios"
      columns={columns}
      debounceMs={400}
      reloadTrigger={reloadKey}
      fetchData={async (params) => {
        const res = await apiFetchUsuarios(params);
        return { data: res.data, total: res.total };
      }}
      itemsPerPageOptions={[5, 10, 20]}
      defaultItemsPerPage={10}
      fetchOnMount
      autoCardBreakpoint={640}
      onRowClick={(row) => console.log("fila", row.id)}
    />
  );
}
```

## Notas

- **Drift verificado.** El JSDoc de `debounceMs` declara `@default 400`, pero el código destructura `debounceMs = 500`. El valor real es `500`.
- **`variant="minimal"`.** El tipo lo admite, pero `variantStyles` (`table.types.ts`) solo define `default`, `striped` y `bordered`; `"minimal"` no aporta ninguna clase.
- **Consulta y estado de carga.** `fetchData` recibe `page` (1-indexado), `limit`, `filters` (filtros de columna fusionados con `externalFilters`) y `sort` (`undefined` si no hay orden). Mientras `isLoading`, se pinta un overlay con `loadingIndicator` o un spinner y el texto `"Cargando datos..."`.
- **Manejo de errores.** Si `fetchData` rechaza, se registra `ITDataTable: Error fetching data` en consola, se vacían los datos y `total` se pone a `0` (sin estado de error propio).
- **Filtros.** Cada columna con `filter` habilita su UI: texto/número (input), `boolean` (toggle), `"catalog"` (`ITSelect`), `"search"` (`ITSearchSelect`, con `onSearch` delegado), `"date"` y `"date-range"` (`ITDatePicker`). El cambio de filtros se debounce con `debounceMs`.
- **`externalFilters` y re-render.** Se guarda un snapshot JSON de `externalFilters` para re-consultar solo cuando cambian sus valores, no cuando el padre pasa una nueva identidad de objeto.
- **Vista y responsive.** `showViewToggle` controla el conmutador Tabla/Tarjetas; con `autoCardBreakpoint > 0` y un contenedor más estrecho que ese ancho, se fuerza la vista de tarjetas (el botón de tabla queda deshabilitado). El contenedor se mide con `useElementSize`.
- **Virtualización.** `virtualized` solo aplica a la vista de tabla; la de tarjetas nunca se virtualiza. El alto de fila por defecto es `getRowHeight(size, density)` (baseline `size="md"`: 33/45/53 px compact/normal/comfortable, desplazado por el line box del `size`: sm 16 / md 20 / lg 28 px).
- **`onRowClick`.** Las filas y tarjetas activables ganan `role="button"` y responden a Enter/Espacio; el callback se ignora cuando el evento se origina en un hijo interactivo.
- **Colores por instancia.** `colors` se escriben como variables locales `--color-table-*` en el wrapper, por lo que ganan sobre el tema global (`ITThemeProvider`) solo para esa instancia.
- **Paginación.** Usa `ITPagination` en el pie; `totalItems` es el `total` devuelto por `fetchData`.
- **Inline**: el componente mezcla clases Tailwind y las variables del tema; no usa estilos por archivo propio.

## Textos (i18n)

| Key | es | en | Dónde (`dataTable.tsx`) |
| --- | --- | --- | --- |
| `table.showAll` | `Mostrar todos` | `Show all` | `:244` |
| `table.filterTrue` | `Filtrar solo verdaderos` | `Filter true only` | `:245` |
| `table.filterFalse` | `Filtrar solo falsos` | `Filter false only` | `:246` |
| `table.filterToggle` | `{action} para {label}` | `{action} for {label}` | `:248` (aria-label + title) |
| `common.loadingOptions` | `Cargando opciones...` | `Loading options...` | `:279`, `:308` (aria-label + title) |
| `common.loadError` | `Error cargando` | `Couldn't load` | `:282`, `:311` |
| `common.all` | `Todos` | `All` | `:288` (opción por defecto del catálogo) |
| `common.search` | `Buscar...` | `Search...` | `:330`, `:380` (placeholder) |
| `datePicker.placeholder` | `dd/mm/aaaa` | `dd/mm/yyyy` | `:349` |
| `datePicker.rangePlaceholder` | `dd/mm/aaaa - dd/mm/aaaa` | `dd/mm/yyyy - dd/mm/yyyy` | `:369` |
| `common.true` | `Verdadero` | `True` | `:398` (aria-label + title) |
| `common.false` | `Falso` | `False` | `:400` (aria-label + title) |
| `table.viewTable` | `Tabla` | `Table` | `:473` (conmutador de vista) |
| `table.viewCards` | `Tarjetas` | `Cards` | `:477` (conmutador de vista) |
| `table.sortBy` | `Ordenar por {label}` | `Sort by {label}` | `:559` (title) |
| `table.noResults` | `No se encontraron resultados` | `No results found` | `:657`, `:733` |
| `table.adjustFilters` | `Intenta ajustar los filtros` | `Try adjusting the filters` | `:658`, `:734` |
| `table.loading` | `Cargando datos...` | `Loading data...` | `:708` (overlay de carga) |

El `title` y los `label` de columna entran por props. Los mensajes de consola
(`ITDataTable: Error fetching data`) son solo de desarrollo y no se renderizan.

El `title` y los `label` de columna entran por props. Los mensajes de consola
(`ITDataTable: Error fetching data`) son solo de desarrollo y no se renderizan.
