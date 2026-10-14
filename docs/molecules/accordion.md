# ITAccordion

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/accordion/` |
| Archivo | `accordion.tsx` |
| Props | `accordion.props.ts` |
| Import | `import { ITAccordion } from "@axzydev/axzy_ui_system"` |

Secciones plegables para FAQs, paneles de configuración y contenido largo. Funciona controlado (`openIds`) o no controlado (`defaultOpenIds`), permite una sola sección abierta (por defecto) o varias, y anima el cuerpo con una transición CSS de `grid-rows` (sin medición JS de altura).

## Import

```tsx
import { ITAccordion } from "@axzydev/axzy_ui_system";
```

## Props

### `ITAccordionProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `items` | `ITAccordionItem[]` | — | Secciones a renderizar. |
| `allowMultiple` | `boolean` | `false` | Permite más de una sección abierta a la vez. |
| `defaultOpenIds` | `string[]` | `[]` | Ids abiertos en el primer render (modo no controlado). |
| `openIds` | `string[]` | — | Lista controlada de ids abiertos. Si se pasa, el componente es controlado. |
| `onChange` | `(openIds: string[]) => void` | — | Se dispara con la siguiente lista de ids abiertos cada vez que una sección alterna. |
| `variant` | `"default" \| "separated" \| "bordered"` | `"separated"` | Estilo visual. |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |
| `itemClassName` | `string` | — | Clases CSS adicionales aplicadas a cada item. |

### `ITAccordionItem`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `id` | `string` | — | Identificador único del item. |
| `title` | `ReactNode` | — | Contenido de la cabecera (normalmente texto). |
| `content` | `ReactNode` | — | Contenido del cuerpo que se revela al abrir. |
| `icon` | `ReactNode` | — | Icono opcional renderizado antes del título. |
| `disabled` | `boolean` | `false` | Deshabilita el toggle de este item. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITAccordion } from "@axzydev/axzy_ui_system";

export default function Faq() {
  const [open, setOpen] = useState<string[]>(["what"]);

  return (
    <ITAccordion
      allowMultiple
      openIds={open}
      onChange={setOpen}
      variant="bordered"
      items={[
        { id: "what", title: "¿Qué es AXZY?", content: "Un sistema de componentes." },
        { id: "install", title: "¿Cómo instalo?", content: "pnpm add @axzydev/axzy_ui_system" },
      ]}
    />
  );
}
```

## Notas

- Modo controlado (`openIds` + `onChange`) o no controlado (`defaultOpenIds`). Si `openIds` está definido, el estado interno se ignora.
- Con `allowMultiple={false}` abrir una sección cierra la anterior (`next = [id]`).
- Accesibilidad: la cabecera es un `<button>` dentro de un `<h3>` con `aria-expanded` y `aria-controls`; el panel es `role="region"` con `aria-labelledby`. Los ids se generan como `it-accordion-panel-<id>` / `it-accordion-button-<id>`.
- Animación: el panel usa `grid-rows-[1fr]` (abierto) / `grid-rows-[0fr]` (cerrado) con `opacity`, transición de 200 ms.
- `item.disabled` deshabilita el botón, aplica `opacity-50` y anula el hover.
- `variant="separated"` (por defecto) separa las tarjetas con `flex flex-col gap-2`; `"default"` y `"bordered"` comparten un contenedor con borde redondeado y `overflow-hidden`, y `"bordered"` añade una línea superior entre items (salvo el primero).
- El icono opcional se pinta en un `<span>` con `text-secondary-500`.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por props (`items[].title` / `items[].content` / `items[].icon`).
