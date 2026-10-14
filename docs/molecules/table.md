# ITTable

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/table/` |
| Archivo | `table.tsx` |
| Props | `table.props.ts` |
| Import | `import { ITTable } from "@axzydev/axzy_ui_system"` |

Tabla de datos con filtrado por columna, ordenación, paginación, soporte de tipos
`boolean`/`catalog`/`date`/`number` con formato de moneda, columnas fijables (pin), vista
responsive en tarjetas y virtualización opcional de filas. Los tipos compartidos (`Column`,
`TableDesign`, etc.) viven en `src/types/table.types.ts` y en `table.props.ts`.

## Import

```tsx
import { ITTable } from "@axzydev/axzy_ui_system";
```

## Props

### `ITTableProps<T>`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `columns` | `Column<T>[]` | `—` | Definiciones de columna: key, label, tipo, ordenación, filtros y render propio. |
| `data` | `T[]` | `[]` | Arreglo de datos a renderizar en el cuerpo de la tabla. |
| `containerClassName` | `string` | `—` | Clases CSS adicionales para el contenedor más externo. |
| `variant` | `TableVariants` | `"default"` | Variante visual: `"default"`, `"striped"`, `"bordered"`. |
| `className` | `string` | `—` | Clases CSS para el wrapper raíz. **Declarada en el tipo, pero `table.tsx` no la destructura ni la aplica.** |
| `size` | `TableSize` | `"md"` | Preset de tamaño de fila (solo font-size): `"sm"`, `"md"`, `"lg"`. |
| `itemsPerPageOptions` | `number[]` | `[5, 10, 20]` | Opciones del selector de filas por página. |
| `defaultItemsPerPage` | `number` | `10` | Número de filas mostradas por página por defecto. |
| `title` | `string` | `—` | Título opcional renderizado sobre la tabla. |
| `renderCard` | `(row: T) => React.ReactNode` | `—` | Render de tarjeta para la vista responsive (móvil/tablet). Recibe la fila. |
| `defaultView` | `"table" \| "cards"` | `"table"` | Modo de vista inicial. |
| `showVerticalBorder` | `boolean` | `true` | Muestra bordes verticales entre columnas. |
| `verticalBorderClassname` | `string` | `—` | Clase personalizada para los bordes verticales (sobreescribe el gris por defecto). |
| `onRowClick` | `(row: T, event: MouseEvent \| KeyboardEvent) => void` | `—` | Se dispara al activar una fila (tabla) o tarjeta (cards). No se dispara si el origen es un hijo interactivo (`button`, `link`, `input` o cualquier `[data-row-click-ignore]`). |
| `layout` | `"auto" \| "fixed"` | `"auto"` | Algoritmo de layout. `"fixed"` respeta los `width` de columna y elimina los mínimos (`min-w-max`/`min-w-[150px]`). |
| `density` | `TableDensity` | `"normal"` | Padding de celda y alto de fila: `"compact"`, `"normal"`, `"comfortable"`. Independiente de `size`. |
| `autoCardBreakpoint` | `number` | `0` | Ancho de contenedor (px) bajo el cual se cae automáticamente a la vista de tarjetas. `0` desactiva el fallback. |
| `virtualized` | `boolean` | `false` | Activa la virtualización de filas en la vista de tabla. La vista de tarjetas nunca se virtualiza. |
| `virtualizedMaxHeight` | `number` | `400` | Altura máxima (px) del contenedor scrollable virtualizado. Solo con `virtualized`. |
| `rowHeight` | `number` | `getRowHeight(size, density)` | Alto de fila uniforme (px) usado por el virtualizador. Solo con `virtualized`. |
| `overscan` | `number` | `5` | Filas extra renderizadas fuera del viewport. Solo con `virtualized`. |
| `stickyHeader` | `boolean` | `false` | Fija la cabecera mientras se hace scroll en el cuerpo virtualizado. Solo con `virtualized`. |

### Heredadas de `TableDesignProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `showViewToggle` | `boolean` | `true` | Renderiza el conmutador Tabla\|Tarjetas en la toolbar. Ocultarlo sigue respetando `defaultView` y `autoCardBreakpoint`. |
| `design` | `TableDesign` | `—` | Sobreescrituras visuales por región (clases + estilos inline). |
| `colors` | `TableColors` | `—` | Sobreescrituras de color por instancia (header/filas), superan al tema global. |
| `containerStyle` | `CSSProperties` | `—` | Estilos inline del wrapper más externo. |
| `cardClassName` | `string` | `—` | Clases extra de la superficie de tarjeta (contenedor redondeado). |
| `cardStyle` | `CSSProperties` | `—` | Estilos inline de la superficie de tarjeta. |
| `toolbarClassName` | `string` | `—` | Clases extra de la franja de toolbar (título + conmutador). |
| `toolbarStyle` | `CSSProperties` | `—` | Estilos inline de la toolbar. |
| `headerClassName` | `string` | `—` | Clases extra de la fila de cabecera. |
| `headerStyle` | `CSSProperties` | `—` | Estilos inline de la fila de cabecera. |
| `headerCellClassName` | `string` | `—` | Clases extra de cada celda de cabecera. |
| `headerCellStyle` | `CSSProperties` | `—` | Estilos inline de cada celda de cabecera. |
| `rowClassName` | `string` | `—` | Clases extra para cada fila del cuerpo. |
| `rowStyle` | `CSSProperties` | `—` | Estilos inline para cada fila del cuerpo. |
| `cellClassName` | `string` | `—` | Clases extra para cada celda del cuerpo. |
| `cellStyle` | `CSSProperties` | `—` | Estilos inline para cada celda del cuerpo. |
| `cardsClassName` | `string` | `—` | Clases extra para el wrapper scrollable de la vista de tarjetas. |
| `cardsStyle` | `CSSProperties` | `—` | Estilos inline para el wrapper scrollable de la vista de tarjetas. |
| `footerClassName` | `string` | `—` | Clases extra para la franja del pie de paginación. |
| `footerStyle` | `CSSProperties` | `—` | Estilos inline para la franja del pie de paginación. |

## Tipos relacionados

### `Column<T>`

```typescript
export interface Column<T> {
  key: string;                 // soporta notación con punto ("address.city")
  label: string;
  className?: string;          // clases para <th> y <td> de esta columna
  headerClassName?: string;    // solo <th>, después de className
  headerStyle?: React.CSSProperties;
  cellClassName?: string;      // solo <td>, después de className
  cellStyle?: React.CSSProperties;
  currencyMX?: boolean;        // formatea como MXN; solo con type "number". @default false
  actions?: (row: T) => React.ReactNode;   // contenido para type "actions"
  filter?: ColumnFilterMode;   // habilita filtro por columna. @default false
  type: ColumnType;
  sortable?: boolean;          // cabecera ordenable. @default false
  render?: (row: T) => React.ReactNode;    // render propio (tiene precedencia)
  editComponent?: (props: { value: any; onChange: (value: any) => void; rowData: T }) => React.ReactNode;
  catalogOptions?: { data: CatalogOption[]; loading?: boolean; error?: boolean; onSearch?: (query: string) => void };
  dateFilterOptions?: { minDate?: Date; maxDate?: Date };
  width?: number | string;     // number = px; string = cualquier longitud CSS
  minWidth?: number;           // px
  align?: "left" | "center" | "right";  // @default "left"
  truncate?: boolean;          // elipsis + title con el valor. @default false
  pinned?: "left" | "right";   // @default undefined (sin fijar)
}
```

### `ColumnType`

```typescript
export type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";
```

Controla el render por defecto de la celda, la UI del filtro y la comparación al ordenar.

### `ColumnFilterMode`

```typescript
export type ColumnFilterMode = boolean | "catalog" | "search" | "date" | "date-range";
```

- `true` — input de texto/número (o toggle boolean cuando `type: "boolean"`).
- `"catalog"` — `ITSelect` alimentado por `catalogOptions`.
- `"search"` — `ITSearchSelect` (typeahead); con `catalogOptions.onSearch` delega el filtrado (debounced).
- `"date"` — `ITDatePicker` de fecha única.
- `"date-range"` — `ITDatePicker` en modo rango.

### `CatalogOption`

```typescript
export interface CatalogOption {
  /** Identificador único que se compara con el valor crudo de la fila. */
  id: string | number;
  /** Etiqueta legible mostrada en el filtro y resuelta en la celda. */
  name: string;
}
```

### `TableVariants` / `TableSize` / `TableDensity`

```typescript
export type TableVariants = "default" | "striped" | "bordered";
export type TableSize = "sm" | "md" | "lg";
export type TableDensity = "compact" | "normal" | "comfortable";
```

`TableDensity` también exporta `densityStyles` (clases de padding y `rowHeight`) y
`getRowHeight(size, density)` para calcular el alto real de fila.

### `TableDesignSlot` / `TableDesign` / `TableColors` / `TableDesignProps`

```typescript
export interface TableDesignSlot {
  className?: string;
  style?: CSSProperties;
}

export interface TableDesign {
  container?: TableDesignSlot;
  card?: TableDesignSlot;
  toolbar?: TableDesignSlot;
  header?: TableDesignSlot;
  headerCell?: TableDesignSlot;
  row?: TableDesignSlot;
  cell?: TableDesignSlot;
  cards?: TableDesignSlot;
  footer?: TableDesignSlot;
}

export interface TableColors {
  headerBg?: string;
  headerText?: string;
  rowBg?: string;
  rowText?: string;
  rowHover?: string;
}
```

`TableDesignProps` es la interfaz base que aporta `showViewToggle`, `design`, `colors`, los
`containerStyle/cardStyle/...` y los atajos planos `*ClassName` / `*Style`. Los atajos planos se
fusionan *después* de `design`, por lo que ganan cuando ambos existen.

## Ejemplo

```tsx
import { useState } from "react";
import { ITTable } from "@axzydev/axzy_ui_system";
import type { Column } from "@axzydev/axzy_ui_system";

interface Usuario {
  id: number;
  nombre: string;
  activo: boolean;
  monto: number;
}

const columns: Column<Usuario>[] = [
  { key: "nombre", label: "Nombre", type: "string", sortable: true, width: 220 },
  { key: "activo", label: "Activo", type: "boolean", filter: true, align: "center" },
  { key: "monto", label: "Monto", type: "number", currencyMX: true, align: "right" },
];

export default function UsuariosTable({ usuarios }: { usuarios: Usuario[] }) {
  const [rows, setRows] = useState(usuarios);

  return (
    <ITTable
      title="Usuarios"
      columns={columns}
      data={rows}
      size="sm"
      density="compact"
      itemsPerPageOptions={[10, 25, 50]}
      defaultItemsPerPage={10}
      defaultView="table"
      autoCardBreakpoint={640}
      renderCard={(row) => <div className="p-3">{row.nombre}</div>}
      onRowClick={(row) => console.log("click", row.id)}
    />
  );
}
```

## Notas

- **Virtualización.** `virtualized` solo aplica a la vista de tabla; la de tarjetas nunca se virtualiza. Por defecto el alto de fila es `getRowHeight(size, density)` — baseline `size="md"`: 33/45/53 px (compact/normal/comfortable), desplazado por el line box del `size` (sm 16 / md 20 / lg 28 px). Pasa `rowHeight` explícito si tus celdas rompen la altura uniforme.
- **Columnas fijadas (`pinned`).** Los offsets sticky se acumulan desde el `width`/`minWidth` de cada columna pinneada previa; una columna sin ancho en px resuelve a `0px`, así que declara un `width` en px en cada columna pinneada del mismo lado para evitar solapamientos. La celda pinneada pinta fondo opaco (row + hover) y una sombra separadora de 1px.
- **Filtros de fecha.** `date` y `date-range` usan `ITDatePicker`; un rango con ambos extremos vacíos se interpreta como «sin filtro». `dateFilterOptions` (`minDate`/`maxDate`) solo aplica a esos dos modos.
- **Catálogos.** En columnas `type: "catalog"` el valor crudo de la fila (id) se resuelve contra `catalogOptions.data` para obtener la etiqueta. `loading`/`error` muestran los estados del filtro.
- **Accesibilidad / ordenación.** Las cabeceras ordenables renderizan un botón con `aria-label`/`title` `"Ordenar por {label}"` e icono `MdOutlineSwapVert`. Las filas y tarjetas con `onRowClick` se activan con Enter/Espacio y ganan `role="button"`; el callback se ignora cuando el evento nace en un hijo interactivo.
- **Layout fijo.** Con `layout="fixed"` se respetan los `width` de columna y se eliminan los mínimos que forzaban scroll horizontal; con `"auto"` el layout lo determina el contenido.
- **Vista y responsive.** `showViewToggle` controla el conmutador Tabla/Tarjetas; `autoCardBreakpoint` fuerza la vista de tarjetas por debajo de ese ancho (el toggle de tabla queda deshabilitado en ese estado).
- **Drift verificado.** `ITTableProps.className` existe en el tipo pero no se destructura ni se aplica en `table.tsx`; para el wrapper usa `containerClassName`, y para la superficie, `cardClassName`.
- **Colores por instancia.** `colors` se escriben como variables locales `--color-table-*` en el wrapper de la tabla, por lo que ganan sobre el tema global (`ITThemeProvider`) solo para esa instancia.
- **Paginación condicional.** Usa `ITPagination`, que devuelve `null` si `currentPage === 0` o si hay menos de 2 páginas y no se definen `itemsPerPageOptions`.
- `Column.currencyMX` solo tiene efecto cuando `type` es `"number"` y usa el formateo de moneda MXN (`formatCurrencyMX`); el resto de tipos lo ignoran.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `table.showAll` | `Mostrar todos` | `Show all` | `table.tsx:287` |
| `table.filterTrue` | `Filtrar solo verdaderos` | `Filter true only` | `table.tsx:288` |
| `table.filterFalse` | `Filtrar solo falsos` | `Filter false only` | `table.tsx:289` |
| `table.filterToggle` | `{action} para {label}` | `{action} for {label}` | `table.tsx:296`, `table.tsx:297` (aria-label + title) |
| `common.loadingOptions` | `Cargando opciones...` | `Loading options...` | `table.tsx:320`, `table.tsx:321`, `table.tsx:356`, `table.tsx:357` |
| `common.loadError` | `Error cargando` | `Couldn't load` | `table.tsx:327`, `table.tsx:363` |
| `common.all` | `Todos` | `All` | `table.tsx:334` (opción por defecto del filtro) |
| `common.search` | `Buscar...` | `Search...` | `table.tsx:383`, `table.tsx:430` (placeholder) |
| `datePicker.placeholder` | `dd/mm/aaaa` | `dd/mm/yyyy` | `table.tsx:401` |
| `datePicker.rangePlaceholder` | `dd/mm/aaaa - dd/mm/aaaa` | `dd/mm/yyyy - dd/mm/yyyy` | `table.tsx:420` |
| `common.true` | `Verdadero` | `True` | `table.tsx:452`, `table.tsx:453` (aria-label + title) |
| `common.false` | `Falso` | `False` | `table.tsx:458`, `table.tsx:459` (aria-label + title) |
| `table.noResults` | `No se encontraron resultados` | `No results found` | `table.tsx:596`, `table.tsx:777` |
| `table.adjustFilters` | `Intenta ajustar los filtros` | `Try adjusting the filters` | `table.tsx:597`, `table.tsx:778` |
| `table.sortBy` | `Ordenar por {label}` | `Sort by {label}` | `table.tsx:679` (aria-label/title) |

Gotcha: el conmutador de vista Tabla/Tarjetas de `ITTable` usa los literales `"Table"` (`:536`) y
`"Cards"` (`:547`) **sin** i18n. Las keys `table.viewTable` / `table.viewCards` existen en el
catálogo, pero solo las usa `ITDataTable`.
