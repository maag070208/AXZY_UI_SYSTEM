# ITButton

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/button/` |
| Archivo | `button.tsx` |
| Props | `button.props.ts` |
| Import | `import { ITButton } from "@axzydev/axzy_ui_system"` |

Botón de acción con colores semánticos, 8 variantes visuales, 3 tamaños, icono opcional y estados de hover/focus/disabled.

## Import

```tsx
import { ITButton } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Texto del botón. Se ignora si se pasa `children`. |
| `children` | `ReactNode` | — | Contenido personalizado. Tiene prioridad sobre `label`. |
| `icon` | `ReactNode` | — | Icono renderizado antes del label (solo cuando no se usa `children`). |
| `onClick` | `() => void` | — | Handler de click. |
| `color` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | `"primary"` | Clave de color semántica del tema. |
| `size` | `SizesTypes` (`"sm" \| "md" \| "lg"`) | `"md"` | Tamaño del botón. |
| `variant` | `keyof typeof buttonVariants` (`"filled" \| "outlined" \| "raised" \| "rounded" \| "text" \| "raised-text" \| "icon-only" \| "link"`) | `"filled"` | Estilo visual. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción y aplica opacidad reducida. |
| `className` | `string` | — | Clases CSS adicionales del botón. |
| `type` | `"submit" \| "reset" \| "button" \| undefined` | `"button"` | Atributo `type` del `<button>` nativo. |
| `ariaLabel` | `string` | — | Etiqueta accesible para lectores de pantalla. Si falta, cae en `label`. |
| `title` | `string` | — | Atributo `title` nativo. Si falta, cae en `ariaLabel` o `label`. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITStack } from "@axzydev/axzy_ui_system";

export function Actions() {
  const [saving, setSaving] = useState(false);

  return (
    <ITStack direction="row" spacing={2}>
      <ITButton
        label="Guardar"
        color="success"
        variant="raised"
        disabled={saving}
        onClick={() => setSaving(true)}
      />
      <ITButton color="danger" variant="icon-only" ariaLabel="Eliminar registro">
        🗑
      </ITButton>
      <ITButton label="Cancelar" variant="outlined" color="gray" type="button" />
    </ITStack>
  );
}
```

## Notas

- La apariencia base viene de `theme.button[color]` (fondo, color de texto, `borderRadius`, `fontWeight`, `focus`, `hover`); el tamaño lo aportan las clases de `buttonSizes` y la forma las de `buttonVariants`.
- Variantes (`buttonVariants` en `@/types/button.types`): `filled` (`border-transparent shadow-sm`), `outlined` (`bg-transparent border-2`), `raised` (`border-transparent shadow-md`), `rounded` (`... rounded-full`), `text` (`bg-transparent` + `hover:bg-black/5 dark:hover:bg-white/10`), `raised-text` (`bg-white border border-gray-200 shadow-sm hover:shadow-md`), `icon-only` (`p-2 aspect-square flex items-center justify-center ...`), `link` (`bg-transparent hover:underline px-0`).
- Tamaños (`buttonSizes`): `sm` → `text-xs px-2.5 py-1`, `md` → `text-[13px] px-3.5 py-1.5`, `lg` → `text-sm px-4 py-2`.
- Hover y focus se gestionan con estado interno (`useState`); el focus aplica `style.boxShadow = themeConfig.focus`.
- Con `disabled` se aplica `opacity-50 cursor-not-allowed`.
- Si se pasa `children`, el `icon` y el `label` **no** se renderizan dentro del wrapper interno.
- `aria-label={ariaLabel || label}` y `title={title || ariaLabel || label}`.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `label`, `children`, `ariaLabel` o `title`.
