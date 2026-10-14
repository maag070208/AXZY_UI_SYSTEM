# ITDatePicker

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/date-picker/` |
| Archivo | `datePicker.tsx` |
| Props | `date-picker.props.ts` |
| Import | `import { ITDatePicker } from "@axzydev/axzy_ui_system"` |

Selector de fecha con modos de fecha única y rango. Soporta entrada de texto manual (formato DD/MM/YYYY) y un popover de calendario posicionado que voltea arriba del input cuando está cerca del borde inferior de la ventana. En modo rango se elige inicio y fin, y el calendario resalta el intervalo.

## Import

```tsx
import { ITDatePicker } from "@axzydev/axzy_ui_system";
```

## Props

### `ITDatePickerProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `name` | `string` | — | Atributo `name` del input subyacente. |
| `value` | `Date \| [Date \| null, Date \| null]` | — | Fecha única, o tupla `[start, end]` cuando `range` es `true`. |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement> \| { target: { name: string; value: Date \| [Date \| null, Date \| null] } }) => void` | — | Se dispara al cambiar la fecha; el evento lleva `name` y `value` en `target`. |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement> \| { target: { name: string; value: Date \| [Date \| null, Date \| null] } }) => void` | — | Se dispara al perder el foco el input. |
| `range` | `boolean` | `false` | Activa el modo de selección por rango; `value` se trata como tupla inicio-fin. |
| `variant` | `ColorsTypes` | `"primary"` | Variante de color del sistema. |
| `size` | `SizesTypes` | `"md"` | Tamaño: `"sm"`, `"md"`, `"lg"`. |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |
| `calendarClassName` | `string` | — | Clases CSS adicionales para el popover del calendario. |
| `disabled` | `boolean` | `false` | Deshabilita el date picker. |
| `placeholder` | `string` | — | Placeholder mostrado cuando no hay fecha seleccionada. |
| `label` | `string` | — | Etiqueta accesible sobre el input. |
| `required` | `boolean` | — | Marca el campo como requerido. |
| `touched` | `boolean` | — | Indica visualmente que el campo fue interactuado. |
| `error` | `string \| boolean` | — | Mensaje de error, o `true` para el estilo de error por defecto. |
| `minDate` | `Date` | — | Fecha mínima seleccionable. |
| `maxDate` | `Date` | — | Fecha máxima seleccionable. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITDatePicker } from "@axzydev/axzy_ui_system";

export default function ReservationDates() {
  const [dates, setDates] = useState<[Date | null, Date | null]>([new Date(), null]);

  return (
    <ITDatePicker
      name="booking_range"
      label="Rango de estadía"
      range
      value={dates}
      onChange={(e) => setDates(e.target.value as [Date | null, Date | null])}
      placeholder="Fecha entrada - Fecha salida"
    />
  );
}
```

## Notas

- `onChange` emite un evento `{ target: { name, value } }`; en modo único `value` es un `Date` y en modo rango una tupla `[Date | null, Date | null]`.
- El popover se renderiza en un portal (`createPortal` a `document.body`) con `useFloatingPanel` (opciones `estimatedHeight: 360`, `matchWidth: false`) y ancho de `w-[280px]` (único) / `w-[320px]` (rango).
- Entrada manual: máscara DD/MM/YYYY que solo acepta dígitos (máximo 8) y aplica las barras, con `maxLength={10}`; valida con la regex `/^(\d{2})\/(\d{2})\/(\d{4})$/`. Al perder el foco en modo único, una fecha inválida se sustituye por hoy y se notifica. En modo rango el texto no se valida (se depende del calendario).
- El error mostrado combina `error` con `!isValidDate` → `"Fecha inválida"`.
- En modo rango, al completar la segunda fecha se dispara `onChange` y se cierra el popover; también se emite `onChange` al elegir solo la fecha de inicio (estado "pending", que se muestra como `"<fecha> - ..."`).
- Tanto el icono `FaCalendarAlt` como el propio `ITInput` abren/cierran el popover mediante `onClick`; `disabled` lo bloquea.
- El calendario interno se instancia con `selectionMode={range ? "range" : "single"}` y recibe `minDate`/`maxDate` y `variant`.
- El panel usa el objeto estático `theme.card` (`backgroundColor`, `borderColor`, `borderRadius`, `shadow`) en estilos inline, no CSS variables.
- Gotcha: en `handleInputChange` la llamada `onChange(event)` aparece **duplicada** (líneas 220-221), por lo que el consumidor recibe la notificación dos veces al teclear una fecha válida.
- `formatDate` usa `toLocaleDateString("es-ES", { day, month, year })`, por lo que el formato visible es DD/MM/YYYY.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `datePicker.placeholder` | `dd/mm/aaaa` | `dd/mm/yyyy` | `datePicker.tsx:269` (modo simple) |
| `datePicker.rangePlaceholder` | `dd/mm/aaaa - dd/mm/aaaa` | `dd/mm/yyyy - dd/mm/yyyy` | `datePicker.tsx:269` (modo rango) |
| `datePicker.invalid` | `Fecha inválida` | `Invalid date` | `datePicker.tsx:287` (error) |

`label` y `placeholder` entran por props; estos defaults solo aplican si no se pasan. Las fechas se
formatean con `toLocaleDateString("es-ES", …)`, que no es una key de i18n.
