# ITSlider

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/slider/` |
| Archivo | `slider.tsx` |
| Props | `slider.props.ts` |
| Import | `import { ITSlider } from "@axzydev/axzy_ui_system"` |

Control deslizante (range) con `min`/`max`/`step` y label opcional que muestra el valor actual.

## Import

```tsx
import { ITSlider } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `number` | — (requerido) | Valor actual (controlado). |
| `onChange` | `(value: number) => void` | — (requerido) | Callback al mover el slider; recibe el valor como número. |
| `min` | `number` | `0` | Valor mínimo. |
| `max` | `number` | `100` | Valor máximo. |
| `step` | `number` | `1` | Incremento entre valores. |
| `label` | `string` | — | Label mostrado arriba; se renderiza como `"{label}: {value}"`. |
| `disabled` | `boolean` | `false` | Deshabilita el slider. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITSlider } from "@axzydev/axzy_ui_system";

export function PriceFilter() {
  const [price, setPrice] = useState(50);

  return (
    <ITSlider
      label="Precio máximo"
      value={price}
      onChange={setPrice}
      min={0}
      max={500}
      step={10}
    />
  );
}
```

## Notas

- Renderiza un `<input type="range">` nativo; el valor se convierte con `Number(e.target.value)` antes de llamar a `onChange`.
- Con `label` se muestra un `<label>` con el texto `"{label}: {value}"` (no usa `htmlFor`, así que no está asociado programáticamente al input).
- El track y el thumb se estilan con clases utilitarias y variantes `[&::-webkit-slider-thumb]` / `[&::-moz-range-thumb]`; el color de acento es el primary del tema (`bg-primary-500`, `accent-primary-500`).
- Con `disabled` aplica `opacity-50 cursor-not-allowed` sobre el input.
- No expone `aria-label` propio: si no se usa `label`, el control queda sin etiqueta accesible.

## Textos (i18n)

Este componente no renderiza textos propios; el texto entra por `label` (y se compone con el valor numérico).
