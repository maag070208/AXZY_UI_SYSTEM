# ITSegmentedControl

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/segmented-control/` |
| Archivo | `segmented-control.tsx` |
| Props | `segmented-control.props.ts` |
| Import | `import { ITSegmentedControl } from "@axzydev/axzy_ui_system"` |

Control segmentado estilo iOS para alternar entre opciones mutuamente excluyentes. Soporta iconos y tamaños `sm` / `md`.

## Import

```tsx
import { ITSegmentedControl } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `options` | `ISegmentedOption[]` | — (requerido) | Opciones mutuamente excluyentes (`{ label, value, icon? }`). |
| `value` | `string` | — (requerido) | Valor seleccionado actual (controlado). |
| `onChange` | `(value: string) => void` | — (requerido) | Callback al seleccionar otra opción; recibe el nuevo valor. |
| `size` | `"sm" \| "md"` | `"md"` | Tamaño del control. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |
| `disabled` | `boolean` | `false` | Deshabilita todo el control. |

Tipos exportados: `SegmentedControlSize = "sm" | "md"`, `ISegmentedOption = { value: string; label: string; icon?: ReactNode }`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITSegmentedControl } from "@axzydev/axzy_ui_system";

export function ViewToggle() {
  const [view, setView] = useState("list");

  return (
    <ITSegmentedControl
      options={[
        { value: "day", label: "Día" },
        { value: "week", label: "Semana" },
        { value: "month", label: "Mes" },
      ]}
      value={view}
      onChange={setView}
      size="sm"
    />
  );
}
```

## Notas

- Renderiza un contenedor `inline-flex` con `bg-slate-100 dark:bg-slate-800` y un `<button>` por opción.
- El padding y el tamaño de fuente vienen de `sizeMap`: `sm` → botón `px-2.5 py-1.5 text-[11px]` / contenedor `p-0.5`; `md` → `px-3 py-2 text-xs` / `p-1`.
- La opción activa usa `bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600`; las inactivas usan texto slate con hover y borde transparente.
- Con `disabled` el contenedor aplica `opacity-50 cursor-not-allowed` y cada botón `pointer-events-none` + `disabled`; el `onClick` además se cortocircuita.
- El icono opcional se renderiza antes del label (`label` es la clave de texto obligatoria en cada opción).
- No expone roles ARIA de tabs ni `aria-pressed`; son `<button>` nativos (accesibles por teclado, sin gestionar un `tablist`).

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `options[].label` (el `icon` es un nodo del consumidor).
