# ITCheckbox

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/checkbox/` |
| Archivo | `checkbox.tsx` |
| Props | `checkbox.props.ts` |
| Import | `import { ITCheckbox } from "@axzydev/axzy_ui_system"` |

Checkbox con label, estado indeterminado y soporte de deshabilitado. Usa un `<input>` nativo visualmente oculto (`sr-only`) para mantener la accesibilidad.

## Import

```tsx
import { ITCheckbox } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Estado controlado del checkbox. |
| `onChange` | `(checked: boolean) => void` | — | Callback al cambiar; recibe el nuevo estado. |
| `label` | `ReactNode` | — | Texto o elemento renderizado junto al checkbox. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción y aplica opacidad reducida. |
| `indeterminate` | `boolean` | `false` | Renderiza el estado indeterminado (guion). No tiene efecto cuando `checked` es `true`. |
| `className` | `string` | — | Clases CSS adicionales del `<label>` contenedor. |
| `name` | `string` | — | Atributo `name` del `<input>` nativo. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITCheckbox, ITStack } from "@axzydev/axzy_ui_system";

export function Terms() {
  const [accepted, setAgreed] = useState(false);

  return (
    <ITCheckbox
      name="terms"
      label="Acepto los términos y condiciones"
      checked={agreed}
      onChange={setAgreed}
    />
  );
}
```

## Notas

- Estructura: un `<label>` contenedor (`inline-flex items-center gap-2`) con un `<input type="checkbox" className="peer sr-only">` y un `<div>` visual de `w-4 h-4` que dibuja el check (SVG) o el guion de indeterminado.
- El estado indeterminado se aplica por `ref` (`el.indeterminate = indeterminate`); el guion solo se dibuja si `indeterminate && !checked`.
- Con `disabled`: `opacity-50 cursor-not-allowed`.
- El input nativo no deshabilitado tiene `peer-focus:ring-2 peer-focus:ring-primary-200`.
- El label es un prop (`ReactNode`), no hay texto interno.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `label`.
