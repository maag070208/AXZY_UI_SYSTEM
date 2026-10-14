# ITRadioGroup

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/radio/` |
| Archivo | `radio.tsx` |
| Props | `radio.props.ts` |
| Import | `import { ITRadioGroup } from "@axzydev/axzy_ui_system"` |

Grupo de radios con dirección de layout configurable y estilos de selección del tema. Usa inputs nativos visualmente ocultos (`sr-only`) para mantener la accesibilidad.

## Import

```tsx
import { ITRadioGroup } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | — (requerido) | Atributo `name` del grupo de radios (accesibilidad y formularios). |
| `value` | `string` | — (requerido) | Valor actualmente seleccionado. |
| `onChange` | `(value: string) => void` | — (requerido) | Callback al seleccionar una opción; recibe el valor. |
| `options` | `ITRadioOption[]` | — (requerido) | Opciones a renderizar (`{ value: string; label: ReactNode }`). |
| `disabled` | `boolean` | `false` | Deshabilita todo el grupo. |
| `direction` | `"row" \| "column"` | `"column"` | Dirección del layout de las opciones. |
| `className` | `string` | — | Clases CSS adicionales del contenedor. |

Tipo exportado: `ITRadioOption = { value: string; label: ReactNode }`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITRadioGroup } from "@axzydev/axzy_ui_system";

export function ColorPicker() {
  const [color, setColor] = useState("red");

  return (
    <ITRadioGroup
      name="color"
      value={color}
      onChange={setColor}
      direction="row"
      options={[
        { value: "red", label: "Rojo" },
        { value: "blue", label: "Azul" },
        { value: "green", label: "Verde" },
      ]}
    />
  );
}
```

## Notas

- Cada opción es un `<label>` con un `<input type="radio">` (`peer sr-only`) y un indicador circular custom que se rellena cuando está seleccionado.
- El contenedor es `flex gap-3`; con `direction="row"` añade `flex-row flex-wrap`, con `column` usa `flex-col`.
- Los inputs comparten el `name` del grupo, lo que da el comportamiento de selección exclusiva nativo.
- Con `disabled`, cada opción aplica `opacity-50 cursor-not-allowed` y el input queda deshabilitado.
- El foco visible se resuelve con `peer-focus:ring-2 peer-focus:ring-primary-200` (solo cuando no está deshabilitado).
- El color de selección está fijo en `primary` (no hay prop de color).
- No usa `fieldset`/`legend` ni `role="radiogroup"`.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `options[].label`.
