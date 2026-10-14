# ITTextarea

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/textarea/` |
| Archivo | `textarea.tsx` |
| Props | `textarea.props.ts` |
| Import | `import { ITTextarea } from "@axzydev/axzy_ui_system"` |

Campo de texto multilínea con label, mensaje de error y control de redimensionado.

## Import

```tsx
import { ITTextarea } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `string` | — | Valor actual del textarea (controlado). |
| `onChange` | `(value: string) => void` | — | Callback al cambiar; recibe el valor (string), no el evento. |
| `label` | `string` | — | Label mostrado encima del campo. |
| `placeholder` | `string` | — | Texto de placeholder. |
| `rows` | `number` | `4` | Número de filas visibles. |
| `disabled` | `boolean` | `false` | Deshabilita el textarea. |
| `error` | `string` | — | Mensaje de error mostrado debajo y aplicado al borde/anillo. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |
| `name` | `string` | — | Atributo `name` y `id` (permite asociar el label vía `htmlFor`). |
| `maxLength` | `number` | — | Longitud máxima de caracteres. |
| `resize` | `"vertical" \| "horizontal" \| "both" \| "none"` | `"vertical"` | Comportamiento de redimensionado del textarea. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITTextarea } from "@axzydev/axzy_ui_system";

export function BioForm() {
  const [bio, setBio] = useState("");

  return (
    <ITTextarea
      name="bio"
      label="Biografía"
      placeholder="Cuéntanos sobre ti"
      rows={5}
      maxLength={500}
      value={bio}
      onChange={setBio}
      error={bio.length > 500 ? "Máximo 500 caracteres" : undefined}
    />
  );
}
```

## Notas

- El label usa `htmlFor={name}` y el `<textarea>` usa `id={name}`, por lo que la asociación funciona cuando se pasa `name`.
- `onChange` entrega directamente `e.target.value` (no el evento).
- Con `error` el borde y el anillo pasan a `danger` (`border-danger-500 ring-danger-100`); sin error usan `secondary`/`primary`.
- Con `disabled` aplica `opacity-50 cursor-not-allowed bg-secondary-100 dark:bg-slate-800`.
- El redimensionado se controla con `resizeMap`: `vertical` → `resize-y`, `horizontal` → `resize-x`, `both` → `resize`, `none` → `resize-none`.
- No expone `onBlur`, `onKeyDown`, `required`, `readOnly`, `autoFocus` ni `aria-*` propios; para esos casos usar `ITInput` con `type="textarea"`.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `label`, `placeholder` y `error`.
