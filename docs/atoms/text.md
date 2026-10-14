# ITText

|  |  |
| --- | --- |
| Capa | `atoms` |
| Carpeta | `src/components/atoms/text/` |
| Archivo | `text.tsx` |
| Props | `text.props.ts` |
| Import | `import { ITText } from "@axzydev/axzy_ui_system"` |

Wrapper tipográfico semántico que renderiza cualquier elemento HTML. Soporta estilo `muted` y reenvía todos los atributos HTML estándar.

## Import

```tsx
import { ITText } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Contenido renderizado dentro del elemento. |
| `className` | `string` | — | Clases CSS aplicadas al elemento. |
| `as` | `ElementType` | `"p"` | Tipo de elemento HTML a renderizar (p. ej. `"p"`, `"span"`, `"h1"`, `"label"`). |
| `muted` | `boolean` | — | Aplica el color de texto atenuado (`--color-text-muted`). |
| `htmlFor` | `string` | — | Asocia un label con un campo de formulario (se renderiza como `htmlFor` cuando `as` es `"label"`). |
| *(resto de atributos)* | `HTMLAttributes<HTMLElement>` | — | Se reenvían al elemento: `id`, `title`, `onClick`, `role`, `aria-*`, etc. |

## Ejemplo

```tsx
import { ITStack, ITText } from "@axzydev/axzy_ui_system";

export function Heading() {
  return (
    <ITStack spacing={1}>
      <ITText as="h1" className="text-2xl font-bold">
        Bienvenido
      </ITText>
      <ITText as="p" muted className="text-sm">
        Descripción secundaria del panel.
      </ITText>
      <ITText as="label" htmlFor="email">
        Correo
      </ITText>
    </ITStack>
  );
}
```

## Notas

- Elemento por defecto: `<p>` (`as = "p"`).
- Con `muted` inyecta `style={{ color: "var(--color-text-muted)" }}`, por lo que actúa como token de tema (ver la tabla de variables CSS en `LLM_DOCS.md`).
- Al reenviar `HTMLAttributes<HTMLElement>`, admite `style` propio, manejadores de eventos y atributos ARIA; `style` del consumidor se combina con el de `muted` (el consumidor gana si define `color`).
- El componente no impone clases tipográficas: el tamaño, peso y color de texto los define el `className` del consumidor.
- `ITText` es usado internamente por otros átomos (avatar, button, badget, chip, checkbox, loader, radio, segmented-control, slider, textarea, tooltip) para etiquetas y textos.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto entra por `children`.
