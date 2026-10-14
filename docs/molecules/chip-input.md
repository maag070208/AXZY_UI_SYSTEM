# ITChipInput

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/chip-input/` |
| Archivo | `chip-input.tsx` |
| Props | `chip-input.props.ts` |
| Import | `import { ITChipInput } from "@axzydev/axzy_ui_system"` |

Input de texto libre que convierte los valores escritos en etiquetas (chips) removibles. Confirma una etiqueta con `Enter` / `,` (configurable), al perder foco o al pegar texto delimitado, y soporta `maxTags`, control de duplicados y validación por tag.

## Import

```tsx
import { ITChipInput } from "@axzydev/axzy_ui_system";
```

## Props

### `ITChipInputProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | — | Atributo name para integraciones de formulario. |
| `label` | `string` | — | Etiqueta mostrada sobre el control. |
| `placeholder` | `string` | `"Escribe y presiona Enter"` | Placeholder del input de texto. |
| `value` | `string[]` | — | Lista actual de etiquetas (controlado). |
| `onChange` | `(values: string[]) => void` | — | Se dispara con la siguiente lista de etiquetas. |
| `onBlur` | `(e: React.FocusEvent<HTMLInputElement>) => void` | — | Se dispara al perder el foco. |
| `delimiters` | `string[]` | `["Enter", ","]` | Teclas que confirman el texto actual como etiqueta. |
| `maxTags` | `number` | — | Número máximo de etiquetas permitido. |
| `allowDuplicates` | `boolean` | `false` | Permite etiquetas duplicadas. |
| `validate` | `(value: string) => string \| undefined` | — | Devuelve un mensaje de error para rechazar la etiqueta, o `undefined` si es válida. |
| `color` | `ColorsTypes` | `"primary"` | Color aplicado a los chips. |
| `size` | `SizesTypes` | `"md"` | Tamaño del control (`"sm"`, `"md"`, `"lg"`). |
| `disabled` | `boolean` | `false` | Deshabilita el control. |
| `required` | `boolean` | `false` | Marca el campo como requerido (asterisco rojo). |
| `touched` | `boolean` | — | Indica si el campo fue tocado (validación de formulario). |
| `error` | `string \| boolean` | — | Mensaje de error o `true` para el estado de error. |
| `helpText` | `string` | — | Texto de ayuda bajo el control cuando no hay error. |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITChipInput } from "@axzydev/axzy_ui_system";

export default function TagEditor() {
  const [tags, setTags] = useState<string[]>(["react"]);

  return (
    <ITChipInput
      label="Etiquetas"
      value={tags}
      onChange={setTags}
      placeholder="Agrega una etiqueta..."
      maxTags={5}
      helpText="Enter o coma para agregar. Backspace para borrar la última."
    />
  );
}
```

## Notas

- Componente controlado: `value` es la fuente de verdad y cada cambio notifica la lista siguiente vía `onChange`.
- Delimitadores por defecto `["Enter", ","]`. Al pegar texto solo se usan los delimitadores de longitud 1 (`,`); el resto se ignora para separar el pegado.
- `Backspace` con el input vacío elimina la última etiqueta.
- Validación local (se muestra inline, con prioridad sobre `helpText`): `maxTags` alcanzado → `"Máximo N etiquetas"`; duplicado con `allowDuplicates={false}` → `"Etiqueta duplicada"`; `validate` → el mensaje devuelto.
- `error` externo: un string se muestra tal cual; `true` usa `"Este campo es requerido"`. Además, si `required` y `value.length === 0`, se usa el mismo mensaje genérico. Solo se pinta cuando el control está "tocado" (`touched` o blur local).
- El contenedor usa `inputFieldStyle(theme.input, size, …)` y aplica estilos de foco/error/disabled. Los chips se renderizan con `ITChip` (color = `color`, removibles salvo `disabled`).
- El `<label>` visible no está asociado al input por `id`/`htmlFor`, y el input no expone `aria-invalid` ni `aria-describedby`.
- Es un átomo CSS-vars-agnóstico: depende del objeto `theme.input` (`theme as any).input`) para colores de foco/error/disabled.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `chipInput.placeholder` | `Escribe y presiona Enter` | `Type and press Enter` | `chip-input.tsx:193` (si no se pasa `placeholder`) |
| `field.required` | `Este campo es requerido` | `This field is required` | `chip-input.tsx:58`, `chip-input.tsx:61` |
| `chipInput.maxTags` | `Máximo {count} etiquetas` | `Maximum {count} tags` | `chip-input.tsx:93` |
| `chipInput.duplicate` | `Etiqueta duplicada` | `Duplicate tag` | `chip-input.tsx:97` |

`label` y `helpText` entran por props; el mensaje de `validate` lo aporta el consumidor. El error
genérico usa `field.required` (no existe `chipInput.required`).
