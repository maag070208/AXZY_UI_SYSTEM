# ITTooltip

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/tooltip/` |
| Archivo | `tooltip.tsx` |
| Props | `tooltip.props.ts` |
| Import | `import { ITTooltip } from "@axzydev/axzy_ui_system"` |

Tooltip de información que se muestra al pasar el mouse sobre un trigger, con posición configurable y flecha indicadora.

## Import

```tsx
import { ITTooltip } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `content` | `ReactNode` | — (requerido) | Contenido del tooltip: texto o cualquier nodo React. |
| `children` | `ReactNode` | — (requerido) | Elemento trigger que revela el tooltip. |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Posición respecto al trigger. |
| `delay` | `number` | `200` | Retardo en milisegundos antes de mostrarse. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |

Tipos exportados: `TooltipPosition = "top" | "bottom" | "left" | "right"`.

## Ejemplo

```tsx
import { ITButton, ITTooltip } from "@axzydev/axzy_ui_system";

export function Tooltips() {
  return (
    <ITTooltip content="Guardar cambios" position="bottom" delay={300}>
      <ITButton label="Guardar" />
    </ITTooltip>
  );
}
```

## Notas

- Se muestra con `onMouseEnter` (tras el `delay` con `setTimeout`) y se oculta con `onMouseLeave` (limpiando el timeout). El JSDoc menciona "hover / focus", pero el código **solo** maneja eventos de mouse: no hay `onFocus`/`onBlur`.
- El panel se posiciona de forma absoluta (`z-[70]`, `pointer-events-none`) y lleva una flecha construida con bordes (`arrowClasses`).
- El contenido se envuelve en `ITText as="span"` y el panel usa `whitespace-nowrap`; textos largos no hacen wrap.
- Sin `role="tooltip"` ni `aria-describedby`; la información no está asociada al trigger para lectores de pantalla.
- No hay lógica de flip automático: si `position` coloca el panel fuera del viewport, no se reposiciona.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `content`.
