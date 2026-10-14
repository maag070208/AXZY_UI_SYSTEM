# ITCalendar

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/calendar/` |
| Archivo | `calendar.tsx` |
| Props | `calendar.props.ts` |
| Import | `import { ITCalendar } from "@axzydev/axzy_ui_system"` |

Calendario y planificador con vistas de mes, semana y día, visualización de eventos, selección simple o por rango y selección de franjas por arrastre (drag-to-select). Usa `date-fns` con locale `es`.

## Import

```tsx
import { ITCalendar } from "@axzydev/axzy_ui_system";
```

## Props

### `ITCalendarProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `events` | `CalendarEvent[]` | `[]` | Eventos a mostrar en la vista de planificador. |
| `mode` | `"week" \| "day" \| "month"` | auto | Modo de vista. Se autodetecta como `"month"` cuando se pasa `onChange`; si no, `"week"`. |
| `onEventClick` | `(event: CalendarEvent) => void` | — | Se dispara al hacer click en un evento. |
| `onSlotClick` | `(date: Date) => void` | — | Se dispara al hacer click en una franja vacía. |
| `onSlotHover` | `(date: Date) => void` | — | Se dispara cuando el cursor entra en una franja. |
| `onSelectRange` | `(start: Date, end: Date) => void` | — | Se dispara cuando se selecciona un rango por arrastre. |
| `value` | `Date` | — | Fecha seleccionada (modo date picker). |
| `onChange` | `(date: Date) => void` | — | Se dispara al seleccionar una fecha en modo picker. |
| `selectionMode` | `"single" \| "range"` | `"single"` | Modo de selección del date picker. |
| `startDate` | `Date` | — | Fecha de inicio del rango. |
| `endDate` | `Date` | — | Fecha de fin del rango. |
| `minDate` | `Date` | — | Fecha mínima seleccionable (las anteriores se deshabilitan). |
| `maxDate` | `Date` | — | Fecha máxima seleccionable (las posteriores se deshabilitan). |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |
| `disabled` | `boolean` | `false` | *Declarada en `ITCalendarProps`, pero el componente no la usa (ver Notas).* |
| `variant` | `ColorsTypes` | `"primary"` | Color de acento para selección; usa las claves semánticas del tema. |

### `CalendarEvent`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `id` | `string` | — | Identificador único del evento. |
| `title` | `string` | — | Título del evento. |
| `start` | `Date \| string` | — | Inicio (objeto `Date` o string ISO 8601). |
| `end` | `Date \| string` | — | Fin (objeto `Date` o string ISO 8601). |
| `color` | `string` | — | Color del indicador (hex o valor CSS). |
| `data` | `any` | — | Datos extra que se pasan a los callbacks de evento. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITCalendar, type CalendarEvent } from "@axzydev/axzy_ui_system";

export default function Scheduler() {
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Daily Standup",
      start: new Date(),
      end: new Date(Date.now() + 30 * 60 * 1000),
      color: "#4f46e5",
    },
  ]);

  return (
    <div className="h-[600px]">
      <ITCalendar
        mode="week"
        events={events}
        onEventClick={(evt) => console.log(evt.title)}
        variant="primary"
      />
    </div>
  );
}
```

## Notas

- `mode` se resuelve como `modeProp || (onChange ? "month" : "week")`.
- Vistas internas: `calendar | years | months`. Click en el nombre del mes (o del año) de la cabecera navega; el botón "Hoy" vuelve al día actual; las flechas avanzan según el modo (mes/semana/día) y, en las rejillas de año/mes, 12 años/1 año.
- Vista de mes: rejilla `grid-cols-7`, selección single (con `value`) y rango (con `startDate`/`endDate`), resalte del día de hoy y de los extremos del rango, y "conectores" visuales de 2px en los extremos del rango.
- Vista de semana/día: scheduler de 6:00 a 22:00 (`START_HOUR = 6`, `END_HOUR = 22`), franjas de 30 min, alto de hora 80px. Los eventos se posicionan por hora/minuto y se colorean con `event.color` (fondo `${color}20` y borde de 4px) o con las variables de la variante.
- `onSelectRange` habilita el arrastre (`mousedown` + `mouseenter` + `mouseup`); al confirmar añade 30 min al final (la franja se cuenta como durando media hora). El hover también dispara `onSlotHover`.
- La línea de hora actual (roja, `border-danger-500`) solo se muestra en vistas de planificador cuando el día es hoy.
- `minDate`/`maxDate` solo se aplican en la **vista de mes**: los días fuera de rango quedan `disabled` con `opacity-20`.
- Variables CSS con fallback: `--it-calendar-bg`, `--it-calendar-border`, `--it-calendar-header-text`, `--it-calendar-header-hover`, `--it-calendar-days-text`, `--it-calendar-selected-bg`, `--it-calendar-selected-text`, `--it-calendar-range-bg`, `--it-calendar-today-bg`, `--it-calendar-today-text`. `variant` deriva `--calendar-selected-bg` / `-range-bg` / `-today-bg` / `-today-text` desde `var(--color-<variant>*)`.
- Gotcha: `ITCalendarProps.disabled` está declarada pero **no se desestructura ni se usa** en `calendar.tsx` (el único `disabled` del render es el de los botones de día). No tiene efecto.
- La carpeta incluye un `index.ts` que re-exporta el componente (`export { default }` + `export *`); el import público sigue siendo el nombre nombrado `ITCalendar`.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `calendar.today` | `Hoy` | `Today` | `calendar.tsx:368` |

Solo `calendar.today` está en el catálogo; los nombres de meses/días no usan keys de i18n (provienen
del locale de date-fns, `es`). Los títulos de los eventos y las etiquetas de datos entran por props
(`events[].title`).
