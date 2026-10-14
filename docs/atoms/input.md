# ITInput

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/input/` |
| Archivo | `input.tsx` |
| Props | `input.props.ts` |
| Import | `import { ITInput } from "@axzydev/axzy_ui_system"` |

Campo de entrada de texto con label, mensaje de error de validación, slots de iconos y hint de longitud. Soporta los tipos `text`, `password`, `email`, `number` (con formato de moneda/miles), `checkbox`, `radio` y `textarea`.

## Import

```tsx
import { ITInput } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | — (requerido) | Nombre del campo para identificación del formulario; se usa como `id` del control y del label. |
| `type` | `"text" \| "password" \| "number" \| "email" \| "checkbox" \| "radio" \| "textarea"` | `"text"` | Tipo de entrada a renderizar. |
| `label` | `string` | — | Label mostrado encima del input. |
| `currencyFormat` | `boolean` | `false` | Activa el formato de moneda (`Intl` con locale `es-MX`) para entradas numéricas. |
| `decimals` | `number` | `currencyFormat ? 2 : 0` | Decimales permitidos. `0` restringe a enteros. |
| `placeholder` | `string` | — | Texto de placeholder. |
| `value` | `any` | — | Valor actual del input. |
| `onChange` | `(event: any) => void` | — (requerido) | Handler de cambio. Recibe un evento con `target.name` y `target.value` (string). |
| `onBlur` | `(event: FocusEvent<HTMLInputElement> \| FocusEvent<HTMLTextAreaElement, Element>) => void` | — | Handler de blur. |
| `onKeyDown` | `(event: KeyboardEvent) => void` | — | Handler de keydown. |
| `showHintLength` | `boolean` | `false` | Muestra el contador de caracteres debajo del input (requiere `minLength` o `maxLength`). |
| `maxLength` | `number` | — | Longitud máxima permitida. |
| `minLength` | `number` | — | Longitud mínima permitida. |
| `variant` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | — | Color del tema para el campo. |
| `size` | `SizesTypes` (`"sm" \| "md" \| "lg"`) | `"md"` | Tamaño del campo. |
| `disabled` | `boolean` | `false` | Deshabilita el input. |
| `containerClassName` | `string` | — | Clases CSS del contenedor externo. |
| `labelClassName` | `string` | — | Clases CSS del label. |
| `className` | `string` | — | Clases CSS del control. |
| `touched` | `boolean` | — | Indica si el campo ya fue tocado (controla cuándo se muestra el error). Si no se pasa, se usa el estado interno del blur. |
| `error` | `string \| boolean` | — | Mensaje de error. `true` muestra un mensaje genérico; un string muestra el mensaje personalizado. |
| `required` | `boolean` | `false` | Marca el campo como requerido (asterisco + error automático si está vacío). |
| `formatNumber` | `boolean` | `true` | Activa el formateo numérico en blur. |
| `autoFocus` | `boolean` | `false` | Auto-focus al montar. |
| `focusContent` | `boolean` | — | Selecciona todo el contenido al hacer click. |
| `onClick` | `() => void` | — | Handler de click del input. |
| `iconLeft` | `ReactNode` | — | Icono a la izquierda del input. |
| `iconRight` | `ReactNode` | — | Icono a la derecha del input. |
| `checked` | `boolean` | — | Estado checked para los tipos `checkbox` y `radio`. |
| `rows` | `number` | `4` | Filas visibles del `textarea`. |
| `min` | `number` | — | Valor numérico mínimo (se recorta en blur). |
| `max` | `number` | — | Valor numérico máximo (se recorta en blur). |
| `readOnly` | `boolean` | `false` | Renderiza el input en modo solo lectura. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITInput, ITStack } from "@axzydev/axzy_ui_system";

export function AmountForm() {
  const [amount, setAmount] = useState<string>("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | boolean>("");

  return (
    <ITStack spacing={4}>
      <ITInput
        name="amount"
        label="Monto"
        type="number"
        currencyFormat
        value={amount}
        maxLength={12}
        onChange={(e) => setAmount(e.target.value)}
        onBlur={(e) => console.log("blur", e.target.value)}
        showHintLength
      />
      <ITInput
        name="email"
        label="Correo"
        type="email"
        placeholder="ejemplo@axzy.dev"
        value={email}
        error={error}
        required
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        onBlur={() => setError(!email ? "Correo requerido" : "")}
      />
    </ITStack>
  );
}
```

## Notas

- **Validación**: `effectiveError` nace de `error` (si no es `undefined`/`false`) o, si `required` y el campo está vacío, del mensaje genérico. El error solo se muestra cuando el campo está "tocado" (`touched` explícito o el blur interno). En `checkbox`/`radio` la "vacuidad" se evalúa con `checked`.
- **Numéricos**: con `decimals === 0` se bloquean `.` y `,`; con decimales > 0 se permite un solo separador. En blur se limpia el valor, se recorta a `min`/`max` y se reformatea (si `formatNumber`). Con `formatNumber={false}` el valor se mantiene como string.
- **Moneda**: `currencyFormat` usa `toLocaleString` con locale fijo `es-MX` (2 decimales por defecto).
- **Password**: renderiza un botón de ojo para alternar visibilidad (`tabIndex={-1}`) con `aria-label` traducido (`input.showPassword` / `input.hidePassword`, `input.tsx:599`).
- **Checkbox/radio**: usan un layout en fila (`input` + `label`); el error se muestra debajo.
- **Textarea** (`type="textarea"`): no aplica el formateo numérico; con `readOnly` se anula el `onChange`.
- **Estilos**: el campo usa `inputFieldStyle(inputTheme, size)` y los tokens `theme.input` (`focus.ring`, `error.borderColor`/`error.ring`, `disabled.*`). Con iconos se añade padding de `2.5rem` al lado correspondiente.
- **Hint**: `showHintLength` solo renderiza el contador si existe `minLength` o `maxLength`; el total no se muestra en checkbox/radio.
- El control numérico real es un `<input type="text">` con `inputMode` (`decimal`/`numeric`) y filtrado de teclas; el atributo `maxLength` nativo solo se pasa en ese caso cuando `decimals === 0`. En `<input>` de texto el límite lo aplica `handleTextChange` (ignora el cambio si supera `maxLength`) y en `textarea` se pasa directo al elemento.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `field.required` | `Este campo es requerido` | `This field is required` | `input.tsx:125`, `input.tsx:126`, `input.tsx:129` (error `true`, auto por `required` + vacío y fallback) |
| `input.showPassword` | `Mostrar contraseña` | `Show password` | `input.tsx:599` (`aria-label` del botón de ojo) |
| `input.hidePassword` | `Ocultar contraseña` | `Hide password` | `input.tsx:599` (`aria-label` del botón de ojo) |

Todas las keys existen en `src/i18n/locales/es.ts`/`en.ts`. El mensaje de error propio (`error` como
string) tiene prioridad sobre `field.required`. El botón de alternar contraseña ya expone un
`aria-label` traducido (`input.tsx:599`).
