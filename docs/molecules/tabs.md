# ITTabs

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/tabs/` |
| Archivo | `tabs.tsx` |
| Props | `tabs.props.ts` |
| Import | `import { ITTabs } from "@axzydev/axzy_ui_system"` |

Navegación por pestañas con dos variantes visuales (`line` y `pill`). Gestiona su pestaña activa internamente.

## Import

```tsx
import { ITTabs } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `items` | `ITTabItem[]` | — | Definición de pestañas: `id`, `label`, `content`, `icon?`, `disabled?`. |
| `defaultActiveId` | `string` | primer item | `id` de la pestaña activa al montar. |
| `onChange` | `(id: string) => void` | — | Se dispara al cambiar de pestaña, con el nuevo `id`. |
| `variant` | `"line" | "pill"` | `"line"` | `line` = indicador inferior; `pill` = fondo redondeado. |
| `className` | `string` | `""` | Clases adicionales de la fila de pestañas. |
| `containerClassName` | `string` | `""` | Clases adicionales del contenedor externo. |

### `ITTabItem`

| Campo | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `id` | `string` | — | Identificador único de la pestaña. |
| `label` | `string` | — | Texto mostrado en el botón. |
| `content` | `ReactNode` | — | Contenido que se renderiza cuando la pestaña está activa. |
| `icon` | `ReactNode` | — | Icono opcional a la izquierda del label. |
| `disabled` | `boolean` | — | Deshabilita la pestaña. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITTabs } from "@axzydev/axzy_ui_system";

export function Panel() {
  const [active, setActive] = useState("general");

  return (
    <ITTabs
      variant="line"
      defaultActiveId="general"
      onChange={setActive}
      items={[
        { id: "general", label: "General", content: <div>Contenido general</div> },
        { id: "settings", label: "Ajustes", content: <div>Ajustes</div> },
        { id: "billing", label: "Facturación", content: <div>Facturación</div>, disabled: true },
      ]}
    />
  );
}
```

## Notas

- Estado **no controlado**: la pestaña activa vive en un `useState` interno (`defaultActiveId || items[0]?.id`). No hay prop `activeId` para controlarlo desde fuera; usa `onChange` para reaccionar.
- Al cambiar `items`, si el `activeId` actual desaparece de la lista, el contenido queda vacío (no hay re-sincronización).
- Una pestaña `disabled` ignora los clicks (`handleTabClick` retorna temprano) y aplica `opacity-50 cursor-not-allowed`.
- Variante `line`: contenedor con `border-b`; la pestaña activa usa `border-primary-500 text-primary-600`. Variante `pill`: contenedor con fondo `bg-secondary-100 rounded-lg w-fit`; la activa es `bg-white shadow-sm`.
- Accesibilidad: los botones se renderizan como `<button>` nativos, pero **no** se aplican roles de pestañas (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`) ni navegación con flechas. No documentado en el código.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `items[].label` y `items[].content`.
