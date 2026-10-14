# ITInputNumber

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/input-number/` |
| Archivo | `input-number.tsx` |
| Props | `input-number.props.ts` |
| Import | `import { ITInputNumber } from "@axzydev/axzy_ui_system"` |

Campo numérico que siempre renderiza formato de moneda (separadores de miles + decimales) y emite un `number` real. Es la misma superficie que `ITInput` para entrada numérica, pero `onChange`/`onBlur` ya entregan el valor parseado.

## Import

```tsx
import { ITInputNumber } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | — (requerido) | Nombre del campo para identificación del formulario. |
| `value` | `number \| null` | — | Valor numérico actual. `null`/`undefined` representan "vacío". |
| `onChange` | `(value: number \| undefined, event: ChangeEvent<HTMLInputElement>) => void` | — (requerido) | Se llama con el valor parseado en cada cambio (`undefined` si está vacío) y el evento original. |
| `onBlur` | `(value: number \| undefined, event: FocusEvent<HTMLInputElement>) => void` | — | Se llama en blur con el valor parseado (y recortado a `min`/`max`) y el evento original. |
| `decimals` | `number` | `2` | Decimales permitidos. `0` restringe a enteros. |
| `prefix` | `string` | — | Prefijo de texto dentro del campo (p. ej. `"$"`). Se ignora si hay `iconLeft`. |
| `label` | `string` | — | Label mostrado encima del input. |
| `placeholder` | `string` | — | Texto de placeholder. |
| `min` | `number` | — | Valor mínimo. Los valores por debajo se recortan en blur. |
| `max` | `number` | — | Valor máximo. Los valores por encima se recortan en blur. |
| `size` | `SizesTypes` (`"sm" \| "md" \| "lg"`) | `"md"` | Tamaño del campo. |
| `disabled` | `boolean` | `false` | Deshabilita el input. |
| `readOnly` | `boolean` | `false` | Renderiza el input en modo solo lectura. |
| `required` | `boolean` | `false` | Marca el campo como requerido. |
| `touched` | `boolean` | — | Indica si el campo ya fue tocado (controla cuándo se muestra el error). |
| `error` | `string \| boolean` | — | Error de validación. `true` muestra un mensaje genérico; un string, uno personalizado. |
| `iconLeft` | `ReactNode` | — | Icono a la izquierda. Tiene prioridad sobre `prefix`. |
| `iconRight` | `ReactNode` | — | Icono a la derecha del input. |
| `containerClassName` | `string` | — | Clases CSS del contenedor externo. |
| `labelClassName` | `string` | — | Clases CSS del label. |
| `className` | `string` | — | Clases CSS del input. |
| `autoFocus` | `boolean` | `false` | Auto-focus al montar. |
| `focusContent` | `boolean` | `false` | Selecciona todo el contenido al hacer click. |
| `onKeyDown` | `(event: KeyboardEvent<HTMLInputElement>) => void` | — | Handler de keydown del input subyacente. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITInputNumber, ITStack } from "@axzydev/axzy_ui_system";

export function AmountForm() {
  const [amount, setAmount] = useState<number | null>(null);
  const [qty, setQty] = useState<number | null>(1);

  return (
    <ITStack spacing={4}>
      <ITInputNumber
        name="amount"
        label="Monto"
        value={amount}
        prefix="$"
        onChange={(value) => setAmount(value ?? null)}
      />
      <ITInputNumber
        name="qty"
        label="Cantidad"
        decimals={0}
        min={1}
        max={99}
        value={qty}
        onChange={(value) => setQty(value ?? null)}
      />
    </ITStack>
  );
}
```

## Notas

- Se construye sobre `ITInput`: fuerza `type="text"` (numérico formateado), `currencyFormat` y `formatNumber` internamente, por lo que la apariencia y los tokens de `theme.input` son los mismos.
- `parseNumber` convierte `"1,234.50"`/`1234.5`/`""` a `number` o `undefined` (ignora `""`, `"-"` y `"."`, y descarta valores no finitos).
- `prefix` no es una prop nativa: se inyecta como `iconLeft` (un `<ITText as="span">`); si se pasa `iconLeft`, este tiene prioridad.
- El recorte a `min`/`max` ocurre dentro de `ITInput` en blur, y ese valor recortado es el que recibe `onBlur`.
- No expone las props de `ITInput` que no están en su propia interfaz (p. ej. `currencyFormat`, `formatNumber`, `maxLength`, `minLength`, `showHintLength`, `checked`, `rows`); solo reenvía las declaradas aquí mediante `...rest`.

## Textos (i18n)

Este componente no renderiza textos propios; el texto entra por `label`, `placeholder` y `prefix`. El mensaje de error requerido lo aporta `ITInput` (ver `docs/atoms/input.md`).
