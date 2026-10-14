# ITSearchTable

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/searchTable/` |
| Archivo | `searchTable.tsx` |
| Props | `searchTable.props.ts` |
| Import | `import { ITSearchTable } from "@axzydev/axzy_ui_system"` |

Tabla de datos server-side con buscador global (debounced), ordenación por columna, edición
inline opcional y paginación controlada. Recibe los datos y la paginación ya resueltos por el
servidor (`data`, `pageIndex`, `totalPages`, etc.) y comunica los cambios de página, orden y
búsqueda mediante callbacks.

## Import

```tsx
import { ITSearchTable } from "@axzydev/axzy_ui_system";
```

## Props

### `ITSearchTableProps<T>`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `columns` | `SearchColumn<T>[]` | — | Definiciones de columna: key, label, tipo, filtro, ordenación, edición, etc. |
| `data` | `T[]` | — | Arreglo de filas (ya paginadas por el servidor). |
| `containerClassName` | `string` | — | Clases CSS adicionales para el contenedor externo. |
| `searchInputPlaceholder` | `string` | `"Buscar en todos los campos..."` | Placeholder del buscador global. |
| `variant` | `TableVariants` | `"default"` | Variante visual: `"default"`, `"striped"`, `"bordered"`. |
| `className` | `string` | — | Clases para el `<table>`. **Declarada en el tipo, pero `searchTable.tsx` no la destructura ni la aplica** (ver Notas). |
| `size` | `TableSize` | `"md"` | Tamaño de fila (solo font-size): `"sm"`, `"md"`, `"lg"`. |
| `itemsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Opciones del selector de filas por página. |
| `defaultItemsPerPage` | `number` | `10` | Filas por página inicial. |
| `validationSchema` | `yup.ObjectSchema<any>` | — | Esquema Yup para la edición inline. |
| `title` | `string` | — | Título en la barra de cabecera del componente (fondo teal). |
| `pageIndex` | `number` | — | Índice de página actual (0-based, del servidor). Obligatoria. |
| `totalCount` | `number` | — | Total de filas en todas las páginas (del servidor). Obligatoria. |
| `totalPages` | `number` | — | Total de páginas disponibles. Obligatoria. |
| `hasPreviousPage` | `boolean` | — | Si existe página anterior. Obligatoria. |
| `hasNextPage` | `boolean` | — | Si existe página siguiente. Obligatoria. |
| `onPageChange` | `(page: number) => void` | — | Se invoca al navegar a otra página (recibe el nuevo índice). |
| `onItemsPerPageChange` | `(itemsPerPage: number) => void` | — | Se invoca al cambiar las filas por página. |
| `onSortChange` | `(sortConfig: { key: string; direction: "asc" \| "desc" }) => void` | — | Se invoca al cambiar el orden. |
| `onFilterChange` | `(filters: Record<string, string \| boolean \| number>) => void` | — | Se invoca al cambiar el texto de búsqueda global (recibe `{ query }` o `{}`). |

## Tipos relacionados

```typescript
export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";

export interface CatalogOption {
  id: string | number;
  name: string;
}

export interface SearchColumn<T = any> {
  key: string;
  label: string;
  type: ColumnType;
  filter?: boolean | "catalog";
  sortable?: boolean;
  editable?: boolean;
  inputType?: "text" | "number" | "select" | "date" | "checkbox";
  options?: { value: string | number; label: string }[];
  className?: string;
  currencyMX?: boolean;
  catalogOptions?: {
    data: Array<{ id: string | number; name: string }> | any[];
    key?: string;
    label?: string;
  };
  render?: (row: T) => React.ReactNode;
  actions?: (row: T, helpers: { onEdit: (row: T) => void }) => React.ReactNode;
  saveActions?: (
    row: T,
    helpers: { onSave: (row: T) => void; onCancel: () => void; hasErrors: any }
  ) => React.ReactNode;
}
```

> **`SearchColumn` y el resto de tipos de `searchTable.props.ts` no se re-exportan desde el
> entrypoint** (`src/index.ts` solo publica `ITSearchTable` y `ITSearchTableProps`). Para tipar
> el arreglo de columnas en un consumidor externo, define el tipo localmente o importa desde
> el archivo fuente.

## Ejemplo

```tsx
import { useState } from "react";
import { ITSearchTable } from "@axzydev/axzy_ui_system";

interface Usuario {
  id: number;
  nombre: string;
  activo: boolean;
}

export function UsuariosSearchTable({ usuarios }: { usuarios: Usuario[] }) {
  const [page, setPage] = useState(0);

  return (
    <ITSearchTable<Usuario>
      title="Usuarios"
      data={usuarios}
      pageIndex={page}
      totalCount={100}
      totalPages={10}
      hasPreviousPage={page > 0}
      hasNextPage={page < 9}
      itemsPerPageOptions={[10, 20, 50]}
      defaultItemsPerPage={10}
      searchInputPlaceholder="Buscar usuarios..."
      columns={[
        { key: "nombre", label: "Nombre", type: "string", sortable: true, editable: true },
        { key: "activo", label: "Activo", type: "boolean" },
      ]}
      onPageChange={(p) => setPage(p)}
      onSortChange={(s) => console.log("sort", s)}
      onFilterChange={(f) => console.log("filtros", f)}
    />
  );
}
```

## Notas

- **Drift verificado (`className`).** `ITSearchTableProps.className` existe en el tipo, pero `searchTable.tsx` no lo destructura ni lo aplica; para el contenedor usa `containerClassName`.
- **Props no públicas.** `searchTable.tsx` define además props fuera de `searchTable.props.ts` (`editingRow`, `searchTermInitial`, `onClearSearch`, `onEdit`, `onSave`, `onCancel`, `sortConfig`) mediante un tipo local `CustomITSearchTableProps`. No forman parte de la API pública documentada.
- **Buscador global.** Usa `useDebouncedSearch`; al cambiar el término llama a `onFilterChange({ query })` (o `{}` al vaciarlo). El botón `"Limpiar"` aparece solo si hay texto y dispara `handleClearSearch` + `onClearSearch?.(...)`.
- **Ordenación.** La cabecera ordena por columna mediante `onSortChange`. El botón de la barra («Ordenar tabla") tiene un orden "global" fijo por `id`, no por la columna activa.
- **Edición inline.** Solo las columnas con `editable` se vuelven editables cuando la fila está en modo edición. `EditableCell` decide el input por `inputType` (o `type`): `number`, `select`, `checkbox`/`boolean`, `date`, `catalog` (select desde `catalogOptions`) y `text` por defecto. La validación usa `column.validation` y/o `validationSchema`.
- **Tipo booleano.** En solo lectura, `true` → check verde con `aria-label`/`title` `"Verdadero"`; `false` → cruz con `"Falso"`. `currencyMX` solo aplica a `type: "number"`.
- **Cabecera y paginación.** La cabecera usa fondo teal cuando hay `title`. La paginación usa controles propios (`PaginationControls`), no `ITPagination`, e informa `"Mostrando X de Y resultados"` y `"Página P de T"`.
- **Búsqueda global.** El término se propaga a través de `onFilterChange` como `{ query: value }`; el componente no filtra localmente.
- **Sin opciones de layout/densidad/virtualización.** A diferencia de `ITTable`/`ITDataTable`, no admite `layout`, `density`, `autoCardBreakpoint`, `virtualized` ni conmutador de vista.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `searchTable.searchPlaceholder` | `Buscar en todos los campos...` | `Search all fields...` | `SearchAndSortBar.tsx:33`, `SearchInput.tsx:27`, `searchTable.tsx:150` |
| `searchTable.clearSearch` | `Limpiar búsqueda` | `Clear search` | `SearchAndSortBar.tsx:46`, `SearchAndSortBar.tsx:47` (aria-label + title) |
| `common.clear` | `Limpiar` | `Clear` | `SearchAndSortBar.tsx:49` (texto del botón) |
| `common.true` | `Verdadero` | `True` | `TableRow.tsx:67`, `TableRow.tsx:68` (aria-label + title) |
| `common.false` | `Falso` | `False` | `TableRow.tsx:71` (aria-label + title) |
| `searchTable.sortAscending` | `ascendente` | `ascending` | `SortButton.tsx:24`, `SortButton.tsx:25` |
| `searchTable.sortDescending` | `descendente` | `descending` | `SortButton.tsx:23` |
| `searchTable.sortAria` | `Ordenar tabla {direction}` | `Sort table {direction}` | `SortButton.tsx:31` (aria-label) |
| `searchTable.sortTable` | `Ordenar tabla` | `Sort table` | `SortButton.tsx:32` (title) |
| `searchTable.sortAsc` | `Asc ↑` | `Asc ↑` | `SortButton.tsx:46` |
| `searchTable.sortDesc` | `Desc ↓` | `Desc ↓` | `SortButton.tsx:47` |
| `searchTable.sort` | `Ordenar` | `Sort` | `SortButton.tsx:48` |
| `searchTable.showingCount` | `Mostrando {from} de {total} resultados` | `Showing {from} of {total} results` | `PaginationInfo.tsx:19` |
| `searchTable.showLabel` | `Mostrar:` | `Show:` | `PaginationControls.tsx:41` |
| `searchTable.prev` | `Página anterior` | `Previous page` | `PaginationControls.tsx:64`, `PaginationControls.tsx:65` (aria-label + title) |
| `searchTable.pageOf` | `Página {current} de {total}` | `Page {current} of {total}` | `PaginationControls.tsx:71` |
| `searchTable.next` | `Página siguiente` | `Next page` | `PaginationControls.tsx:80`, `PaginationControls.tsx:81` (aria-label + title) |
| `searchTable.emptySearch` | `No se encontraron resultados para tu búsqueda` | `No results for your search` | `TableEmptyState.tsx:19` (con término) |
| `searchTable.empty` | `No se encontraron resultados` | `No results found` | `TableEmptyState.tsx:20` (sin término) |

`searchTable.showing` existe en el catálogo pero no se usa (el contador usa
`searchTable.showingCount`). El `title` de la barra y los `label` de columna entran por props.
