# ITProgress

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/progress/` |
| Archivo | `progress.tsx` |
| Props | `progress.props.ts` |
| Import | `import { ITProgress } from "@axzydev/axzy_ui_system"` |

Barra de progreso con variantes determinada e indeterminada, colores del tema y tres tamaños.

## Import

```tsx
import { ITProgress } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Valor actual del progreso. |
| `max` | `number` | `100` | Valor máximo. |
| `variant` | `"determinate" \| "indeterminate"` | `"determinate"` | `determinate` muestra un relleno de ancho fijo; `indeterminate` muestra una barra animada. |
| `color` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | `"primary"` | Color semántico del relleno. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Grosor de la barra. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |
| `style` | `CSSProperties` | — | Estilos inline del contenedor. |

## Ejemplo

```tsx
import { ITProgress, ITStack } from "@axzydev/axzy_ui_system";

export function UploadProgress() {
  return (
    <ITStack spacing={3}>
      <ITProgress value={75} max={100} color="success" size="lg" />
      <ITProgress variant="indeterminate" color="primary" />
    </ITStack>
  );
}
```

## Notas

- **Determinada**: el porcentaje se calcula como `(value / max) * 100`, acotado a `[0, 100]`, y se aplica como `width` inline con `transition-all duration-500`.
- **Indeterminada**: el relleno usa `animate-pulse w-1/2` y no se le aplica `width`.
- **Tamaños** (`sizeMap`): `sm` → `h-1`, `md` → `h-2`, `lg` → `h-3`.
- **Colores** (`colorMap`): `primary` → `bg-primary-500`, `secondary` → `bg-secondary-500`, `success` → `bg-success-500`, `danger` → `bg-danger-500`, `warning` → `bg-warning-500`, `info` → `bg-info-500`, `purple` → `bg-purple-500`, `error` → `bg-danger-500`, `gray` → `bg-secondary-500`.
- **Accesibilidad**: el contenedor expone `role="progressbar"`, `aria-valuenow` (solo en `determinate`) y `aria-valuemax`; no hay `aria-label` ni `aria-valuetext`.
- El track usa `bg-slate-200 dark:bg-slate-700` y `rounded-full overflow-hidden`.

## Textos (i18n)

Este componente no renderiza textos propios; es puramente visual.
