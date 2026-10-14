# ITEmptyState

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/empty-state/` |
| Archivo | `empty-state.tsx` |
| Props | `empty-state.props.ts` |
| Import | `import { ITEmptyState } from "@axzydev/axzy_ui_system"` |

Placeholder para conjuntos de datos vacíos. Muestra un icono grande, un título, una descripción opcional y un elemento de llamada a la acción opcional (normalmente un botón); todo centrado horizontal y verticalmente en su contenedor.

## Import

```tsx
import { ITEmptyState } from "@axzydev/axzy_ui_system";
```

## Props

### `ITEmptyStateProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | `<FaInbox size={40} />` | Icono o ilustración mostrado sobre el título. |
| `title` | `string` | — | Encabezado principal (requerido). |
| `description` | `string` | — | Texto secundario explicativo bajo el título. |
| `action` | `ReactNode` | — | Elemento de acción (normalmente un botón) bajo la descripción. |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |

## Ejemplo

```tsx
import { FaDatabase } from "react-icons/fa";
import { ITButton, ITEmptyState } from "@axzydev/axzy_ui_system";

export default function NoResults() {
  return (
    <ITEmptyState
      icon={<FaDatabase size={48} />}
      title="Sin resultados"
      description="Prueba ajustando la búsqueda o los filtros."
      action={<ITButton label="Limpiar filtros" variant="outlined" />}
    />
  );
}
```

## Notas

- `icon` por defecto `<FaInbox size={40} />`; el contenedor del icono usa `text-slate-300 dark:text-slate-600`.
- `title` es obligatorio y se renderiza con `ITText as="h3"` (`text-lg font-bold`).
- `description` es opcional (`ITText as="p"`, `text-sm`, `max-w-sm`) y el `action` se renderiza tal cual dentro de un `<div>`.
- Layout: `flex flex-col items-center justify-center py-16 px-6 text-center`.
- No define roles ni atributos ARIA propios.
- Es un buen fallback dentro de tablas, tarjetas y contenedores de resultados (se usa así en el template `ITPage`).

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por props (`title` y `description`, más lo que aporte `action`).
