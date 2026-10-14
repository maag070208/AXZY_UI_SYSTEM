# ITTripleFilter

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/triple-filter/` |
| Archivo | `tripleFilter.tsx` |
| Props | `tripleFilter.props.ts` |
| Import | `import { ITTripleFilter } from "@axzydev/axzy_ui_system"` |

Selector segmentado genérico para filtrar datos rápidamente. Renderiza una fila de botones tipo pill donde solo uno está activo a la vez; admite valores `string` o `boolean` y color configurable.

## Import

```tsx
import { ITTripleFilter } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `T` (`T extends string \| boolean`) | — | Valor actualmente seleccionado. |
| `onChange` | `(value: T) => void` | — | Se dispara al seleccionar una opción. |
| `options` | `ITTripleFilterOption<T>[]` (`{ label: string; value: T }[]`) | — | Opciones del filtro. |
| `color` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | `"primary"` | Color del botón activo. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITTripleFilter } from "@axzydev/axzy_ui_system";

export function StatusFilter() {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

  return (
    <ITTripleFilter
      value={status}
      onChange={setStatus}
      options={[
        { label: "Pendiente", value: "pending" },
        { label: "Aprobado", value: "approved" },
        { label: "Rechazado", value: "rejected" },
      ]}
      color="primary"
    />
  );
}
```

## Notas

- El componente es genérico: `ITTripleFilter<T extends string | boolean>`.
- El contenedor es `flex bg-slate-100 p-1 rounded-xl gap-1 w-fit`; cada opción es un `<button>` con `key={String(option.value)}`.
- El botón activo (`value === option.value`) recibe `bg-white shadow-sm` más una clase de color; los inactivos usan `text-slate-400 hover:text-slate-600`.
- Mapa de color (`colorMap`): `primary → text-primary-600`, `secondary`/`gray → text-secondary-600`, `success → text-success-600`, `danger`/`error → text-danger-600`, `warning → text-warning-600`, `info → text-info-600`, `purple → text-purple-600`.
- Los botones no exponen `aria-pressed` ni un `role`; el estado activo no se anuncia a lectores de pantalla.
- El texto de cada opción entra por `option.label`.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `option.label`.
