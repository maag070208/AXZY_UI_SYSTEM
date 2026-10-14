# ITBadget

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/badget/` |
| Archivo | `badget.tsx` |
| Props | `badget.props.ts` |
| Import | `import { ITBadget } from "@axzydev/axzy_ui_system"` |

Etiqueta pequeña de estado con colores del tema y variantes `filled` / `outlined`. Útil para estados, contadores y categorías.

## Import

```tsx
import { ITBadget } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Texto mostrado dentro del badge. Se ignora si se pasa `children`. |
| `children` | `ReactNode` | — | Contenido personalizado. Tiene prioridad sobre `label`. |
| `color` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | `"primary"` | Clave de color semántica de la paleta. |
| `size` | `SizesTypes` (`"sm" \| "md" \| "lg"`) | `"md"` | Tamaño del badge. |
| `variant` | `keyof typeof badgeVariants` (`"filled" \| "outlined"`) | `"filled"` | Estilo visual. |
| `className` | `string` | — | Clases CSS adicionales del elemento. |

## Ejemplo

```tsx
import { ITBadget, ITStack } from "@axzydev/axzy_ui_system";

export function StatusList() {
  return (
    <ITStack direction="row" spacing={2}>
      <ITBadget label="Activo" color="success" variant="filled" size="sm" />
      <ITBadget color="danger" variant="outlined">
        <span className="flex items-center gap-1">3 nuevos</span>
      </ITBadget>
    </ITStack>
  );
}
```

## Notas

- Renderiza un `<span>` con `inline-flex items-center justify-center`.
- La apariencia viene de `theme.badge[color]` (objeto estático del tema), no de clases Tailwind: `filled` usa `backgroundColor`/`color`/`borderColor` del tema; `outlined` usa fondo transparente y usa `config.color` tanto para el texto como para el borde (`borderWidth: 1px`).
- Si la clave de `color` no existe en `theme.badge`, cae en `theme.badge.primary`.
- Tamaños (`badgeSizes` en `@/types/badget.types`): `sm` → `text-[10px] px-1.5 py-[3px]`, `md` → `text-[11px] px-2 py-[3px]`, `lg` → `text-xs px-2.5 py-1`.
- No define `role` ni atributos ARIA propios; es un `<span>` decorativo/textual.
- `ITSidebar` consume este átomo para contadores (`badge` / `badgeProps`, y `count` en la fila de notificación).

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `label` o `children`.
