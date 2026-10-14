# ITTimePicker

|  |  |
| --- | --- |
| Capa | `molecules` |
| Directorio | `src/components/molecules/time-picker/` |
| Archivo | `timePicker.tsx` |
| Props | `timePicker.props.ts` |
| Import | `import { ITTimePicker } from "@axzydev/axzy_ui_system"` |

Input de selección de hora con un desplegable de doble columna (horas / minutos). Permite
escribir a mano con autoformato, valida un formato 24 h (`HH:MM`) y ofrece un selector
navegable por teclado. El panel se renderiza en un portal para escapar ancestros con
`overflow`/`transform`.

## Import

```tsx
import { ITTimePicker } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | `—` | Atributo `name` del campo y clave del evento de cambio. |
| `value` | `string` | `—` | Valor de hora controlado en formato `"HH:MM"`. |
| `label` | `string` | `—` | Etiqueta mostrada sobre el input. |
| `placeholder` | `string` | `"HH:MM"` | Texto de placeholder cuando no hay valor. |
| `onChange` | `(e: any) => void` | `—` | Se dispara con una hora válida; recibe un objeto con `target.name` y `target.value`. |
| `onBlur` | `(e: any) => void` | `—` | Se llama al perder el foco el input. |
| `required` | `boolean` | `—` | Marca el campo como requerido. |
| `touched` | `boolean` | `—` | Indica que el campo fue interactuado. |
| `error` | `string \| boolean` | `—` | Mensaje de error o boolean para mostrar estado de error. |
| `disabled` | `boolean` | `—` | Deshabilita el time picker. |
| `className` | `string` | `—` | Clases CSS adicionales para el wrapper. |
| `size` | `SizesTypes` | `"md"` | Preset de tamaño: `"sm"` \| `"md"` \| `"lg"`. |
| `variant` | `"primary" \| "secondary" \| "danger" \| "success" \| "warning" \| "info" \| "purple"` | `"primary"` | Variante de estilo del input. |
| `color` | `"primary" \| "secondary" \| "danger" \| "success" \| "warning" \| "info" \| "purple" \| string` | `"primary"` | Color del tema para el resaltado del dropdown y el botón de confirmación. Acepta claves semánticas o un color crudo. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITTimePicker } from "@axzydev/axzy_ui_system";

export default function HorarioField() {
  const [startTime, setStartTime] = useState("");

  return (
    <ITTimePicker
      name="startTime"
      label="Hora de inicio"
      placeholder="HH:MM"
      value={startTime}
      required
      onChange={(e) => setStartTime(e.target.value)}
      onBlur={() => console.log("blur", startTime)}
      color="primary"
      size="md"
    />
  );
}
```

## Notas

- Escritura manual: el input solo acepta dígitos, se limita a 4 y autoinserta `:` tras los dos primeros (p. ej. `0930` → `09:30`). El `maxLength` del input es `5`.
- Validación con la expresión `^([01]\d|2[0-3]):([0-5]\d)$` (formato 24 h). `onChange` **solo** se dispara cuando el valor es válido; mientras es inválido el campo queda marcado con el mensaje `"Hora inválida"`.
- El dropdown se renderiza con `createPortal` sobre `document.body` y se posiciona con `useFloatingPanel` (`estimatedHeight: 300`, `matchWidth: false`), por lo que escapa de contenedores con `overflow`/`transform`.
- Listas del dropdown: 24 horas y 60 minutos, con auto-scroll al valor seleccionado al abrir y un overlay central que marca la selección.
- `color` se resuelve contra `theme.colors`: usa el tono `[50]` como fondo resaltado en hover y `[100]` como fondo activo; si no es una clave del tema, cae a `#f3f4f6` / `#e5e7eb`. El mismo `color` se pasa al `ITButton` de confirmación.
- Manejo de `error`: si el valor no es válido muestra siempre `"Hora inválida"`; si es válido, solo propaga `error` cuando es un `string` (un `error: true` se ignora en ese caso).
- Se apoya en los átomos `ITInput` (campo, label, icono, estados) e `ITButton` (confirmación), y en los hooks `useClickOutside` / `useFloatingPanel`.
- No define `aria-*` propios para la lista de horas/minutos: los elementos son `<div>` clicables sin `role` de listbox/option.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `timePicker.placeholder` | `HH:MM` | `HH:MM` | `timePicker.tsx:190` (placeholder por defecto) |
| `timePicker.invalid` | `Hora inválida` | `Invalid time` | `timePicker.tsx:201` |
| `timePicker.hours` | `Horas` | `Hours` | `timePicker.tsx:228` |
| `timePicker.minutes` | `Minutos` | `Minutes` | `timePicker.tsx:230` |
| `timePicker.accept` | `Aceptar` | `OK` | `timePicker.tsx:321` |
