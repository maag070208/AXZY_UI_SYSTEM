# ITMaskedInput

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/masked-input/` |
| Archivo | `masked-input.tsx` |
| Props | `masked-input.props.ts` |
| Import | `import { ITMaskedInput } from "@axzydev/axzy_ui_system"` |

Input de texto que aplica una máscara de formato mientras el usuario escribe y expone solo el valor
limpio (raw) en `onChange`. La máscara se define con un patrón: los tokens los rellena el usuario y
cualquier otro carácter se auto-inserta como literal. Los slots vacíos se pintan con
`placeholderChar`, por lo que la máscara siempre está visible.

## Import

```tsx
import { ITMaskedInput } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | `—` | Atributo `name` del input; se devuelve en `onChange`. |
| `mask` | `string` | `—` | Patrón de máscara (tokens rellenables + literales auto-insertados). |
| `value` | `string` | `—` | Valor limpio (raw), sin separadores ni placeholders. Si se omite, el componente usa estado interno. |
| `onChange` | `(event: { target: { name: string; value: string } }) => void` | `—` | Se llama al cambiar; `event.target.value` es el raw sin separadores. |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | `—` | Se llama al perder el foco. |
| `onComplete` | `(value: string) => void` | `—` | Se dispara cuando todos los slots están llenos con caracteres válidos. |
| `pattern` | `RegExp` | `—` | Regex *full-match* contra el raw para validar (p. ej. `/^\d{16}$/`). |
| `placeholderChar` | `string` | `"_"` | Carácter mostrado en los slots vacíos. |
| `variant` | `ColorsTypes` | `"primary"` | Variante de color del design system. |
| `size` | `SizesTypes` | `"md"` | Tamaño: `"sm"` \| `"md"` \| `"lg"`. |
| `label` | `string` | `—` | Etiqueta sobre el input. |
| `disabled` | `boolean` | `false` | Deshabilita el input. |
| `required` | `boolean` | `—` | Marca el campo como requerido. |
| `touched` | `boolean` | `—` | Indica visualmente que el campo fue interactuado. |
| `error` | `string \| boolean` | `—` | Mensaje de error o `true` para el estilo por defecto. |
| `className` | `string` | `—` | Clases extra del contenedor externo. |
| `containerClassName` | `string` | `—` | Clases extra del contenedor del input. |
| `iconLeft` | `ReactNode` | `—` | Icono a la izquierda del input. |
| `iconRight` | `ReactNode` | `—` | Icono a la derecha del input. |
| `autoFocus` | `boolean` | `false` | Enfoca el input al montar. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITMaskedInput } from "@axzydev/axzy_ui_system";

export default function TelefonoField() {
  const [phone, setPhone] = useState("");

  return (
    <ITMaskedInput
      name="phone"
      label="Teléfono"
      mask="(999) 999-9999"
      placeholderChar="_"
      value={phone}
      pattern={/^\d{10}$/}
      onChange={(e) => setPhone(e.target.value)}
      onComplete={(v) => console.log("Teléfono completo:", v)}
    />
  );
}
```

## Notas

- Tokens de la máscara: `9` = dígito, `A` = letra (se guarda en MAYÚSCULA), `a` = letra, `x` = alfanumérico, `*` = cualquier carácter. Cualquier otro carácter (`-`, `/`, `(`, `)`, ` `, `.`) es un literal separador auto-insertado.
- Ejemplos de máscara: `xxxx-xxxx-xxxx`, `(999) 999-9999`, `9999-9999-9999-9999`, `99999`, `A-A-A-999`.
- `value` y `onChange` trabajan con el valor raw (sin separadores ni `placeholderChar`); el `maxLength` del input subyacente es `mask.length`.
- `pattern` se valida como *full-match* del raw en `blur`. Si falla, se muestra el mensaje de error; si `error` es un `string` se usa ese texto. El error de patrón se limpia en el siguiente cambio válido.
- El cursor se conserva al editar en medio de la máscara (y al borrar separadores), reposicionándolo con `requestAnimationFrame`.
- `onComplete` solo se dispara cuando `nextRaw.length === número de tokens` y es mayor que 0.
- Se apoya en el átomo `ITInput` para el render, el label, la validación visual y los iconos.
- El componente no define `role` ni `aria-*` propios: la accesibilidad la aporta `ITInput`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `input.invalidFormat` | `Formato inválido` | `Invalid format` | `masked-input.tsx:220` |

Key compartida con `ITInput`; existe en `src/i18n/locales/es.ts`/`en.ts` y se resuelve con
`useITTranslation()`.
