# ITPagination

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/pagination/` |
| Archivo | `pagination.tsx` |
| Props | `pagination.props.ts` |
| Import | `import { ITPagination } from "@axzydev/axzy_ui_system"` |

Controles de navegación de páginas con botones anterior/siguiente, números de página y un selector
opcional de filas por página. Si se pasan `itemsPerPageOptions`, `itemsPerPage` y
`onItemsPerPageChange`, añade el resumen «X - Y de Z» y monta el paginador dentro de un `<nav>`.

## Import

```tsx
import { ITPagination } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `currentPage` | `number` | `—` | Página activa (indexada en 1). |
| `totalPages` | `number` | `—` | Número total de páginas disponibles. |
| `onPageChange` | `(page: number) => void` | `—` | Se llama al pulsar una página o anterior/siguiente; recibe la nueva página. |
| `siblingCount` | `number` | `1` | Número de páginas visibles antes y después de la página actual. |
| `color` | `string` | `"primary"` | Color semántico del tema (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `purple`) o un valor crudo (hex). |
| `className` | `string` | `—` | Clases extra del contenedor. |
| `itemsPerPageOptions` | `number[]` | `—` | Opciones del selector de filas por página. |
| `itemsPerPage` | `number` | `—` | Valor actual de filas por página. Requerido si se pasa `itemsPerPageOptions`. |
| `onItemsPerPageChange` | `(value: number) => void` | `—` | Se llama al cambiar las filas por página. |
| `totalItems` | `number` | `—` | Total de elementos de todas las páginas; se usa para el resumen «X - Y de Z». |

## Ejemplo

```tsx
import { useState } from "react";
import { ITPagination } from "@axzydev/axzy_ui_system";

export default function TablaPaginada() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <ITPagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      color="primary"
      itemsPerPageOptions={[10, 25, 50]}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={setItemsPerPage}
      totalItems={95}
    />
  );
}
```

## Notas

- Lógica de rango: con `siblingCount` por defecto (`1`) muestra como máximo 5 posiciones; si `totalPages` cabe en `siblingCount * 2 + 3` renderiza todas las páginas sin elipsis. En caso contrario intercala el símbolo `…` (`&#8230;`) en los extremos que correspondan.
- El componente devuelve `null` cuando `currentPage === 0`, o cuando no hay `itemsPerPageOptions` y el rango de páginas tiene menos de 2 entradas (se «auto-oculta» con un solo resultado y sin selector).
- Los botones anterior/siguiente usan `aria-disabled` cuando están en el límite (`currentPage === 1` / `currentPage === totalPages`), pero no son elementos `<button>`: son `div` con `onClick`.
- Con `itemsPerPageOptions` + `itemsPerPage` + `onItemsPerPageChange` usa internamente `ITSelect` (tamaño `sm`) y calcula el rango con `totalItems`. Si `totalItems` no se pasa, el resumen «X - Y de Z» no se renderiza.
- El contenedor del paginador se envuelve en `<nav aria-label="Pagination">` en ambas variantes (con y sin selector de filas por página).
- `color` se resuelve contra `theme.colors`; si no es una clave semántica se usa tal cual como color de fondo y un gris (`#f3f4f6`) como hover.
- La página activa se pinta con fondo `theme.colors[color][500]` y texto blanco; las demás usan `text-secondary-600` con hover gris.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `pagination.previous` | `Página anterior` | `Previous page` | `pagination.tsx:156` (aria-label) |
| `pagination.page` | `Página {page}` | `Page {page}` | `pagination.tsx:191` (title) |
| `pagination.next` | `Página siguiente` | `Next page` | `pagination.tsx:208` (aria-label) |
| `pagination.itemsPerPage` | `Mostrar` | `Show` | `pagination.tsx:225` |
| `pagination.of` | `de` | `of` | `pagination.tsx:245` (resumen «X - Y de Z») |
| `pagination.aria` | `Paginación` | `Pagination` | `pagination.tsx:251`, `pagination.tsx:260` (`<nav aria-label>`) |

`pagination.showing` existe en el catálogo pero **no** se usa en `pagination.tsx`: el resumen se
compone con los literales `" - "` y `pagination.of`.
