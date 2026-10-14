# ITPopover

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/popover/` |
| Archivo | `popover.tsx` |
| Props | `popover.props.ts` |
| Import | `import { ITPopover } from "@axzydev/axzy_ui_system"` |

Panel flotante de contenido que se abre al hacer click en un elemento trigger, con control de posición y cierre al hacer click fuera.

## Import

```tsx
import { ITPopover } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `trigger` | `ReactNode` | — (requerido) | Elemento que abre el popover al hacer click. |
| `children` | `ReactNode` | — (requerido) | Contenido renderizado dentro del panel. |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Posición del panel respecto al trigger. |
| `isOpen` | `boolean` | — | Estado controlado de apertura. Si se pasa, el componente opera en modo controlado. |
| `onClose` | `() => void` | — | Callback llamado al cerrar en modo controlado (o al volver a hacer click en el trigger). |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |

Tipos exportados: `PopoverPosition = "top" | "bottom" | "left" | "right"`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITPopover, ITStack } from "@axzydev/axzy_ui_system";

export function RowActions() {
  const [open, setOpen] = useState(false);

  return (
    <ITPopover
      trigger={<ITButton label="Opciones" />}
      position="bottom"
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <ITStack spacing={1}>
        <button onClick={() => setOpen(false)}>Editar</button>
        <button onClick={() => setOpen(false)}>Eliminar</button>
      </ITStack>
    </ITPopover>
  );
}
```

## Notas

- **Modos**: sin `isOpen` es no controlado (estado interno con `useState`); con `isOpen` es controlado y solo se cierra vía `onClose`.
- El cierre por click fuera se implementa con el hook `useClickOutside` sobre el contenedor.
- En modo controlado, el click sobre el trigger llama a `onClose`; en modo no controlado alterna el estado interno.
- El panel se posiciona de forma absoluta (`z-[70]`) dentro de un contenedor `relative inline-flex`, con fondo blanco/slate oscuro, borde y `min-w-[160px]`.
- El trigger se envuelve en un `<div className="cursor-pointer">` con el `onClick` de alternancia.
- No expone `role`, `aria-expanded` ni `aria-haspopup`; tampoco hay cierre con Escape.

## Textos (i18n)

Este componente no renderiza textos propios; todo el contenido entra por `trigger` y `children`.
