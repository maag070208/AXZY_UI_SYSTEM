# ITCard

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/card/` |
| Archivo | `card.tsx` |
| Props | `card.props.ts` |
| Import | `import { ITCard } from "@axzydev/axzy_ui_system"` |

Contenedor de tarjeta versátil con imagen, título, contenido y pie de acciones opcionales. Cuando recibe `onClick` se vuelve interactivo (cursor, sombras y transición de hover).

## Import

```tsx
import { ITCard } from "@axzydev/axzy_ui_system";
```

## Props

### `ITCardProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `onClick` | `() => void` | — | Handler de click; activa el estado interactivo con hover. |
| `title` | `string` | — | Título mostrado en la cabecera de la tarjeta. |
| `image` | `string` | — | URL de la imagen superior. |
| `alt` | `string` | `"Card Image"` | Texto alternativo de la imagen. |
| `children` | `ReactNode` | — | Contenido de la tarjeta, bajo el título. |
| `actions` | `ReactNode` | — | Elementos del pie de acciones (separado por un borde). |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |
| `imageClassName` | `string` | — | Clases CSS adicionales para la imagen. |
| `titleClassName` | `string` | — | Clases CSS adicionales para el título. |
| `contentClassName` | `string` | — | Clases CSS adicionales para el contenedor del contenido. |
| `actionClassName` | `string` | — | Clases CSS adicionales para el pie de acciones. |

## Ejemplo

```tsx
import { ITCard, ITButton } from "@axzydev/axzy_ui_system";

export default function Welcome() {
  return (
    <ITCard
      title="Bienvenido"
      image="/hero.jpg"
      actions={<ITButton label="Ver más" variant="filled" color="primary" size="sm" />}
      onClick={() => console.log("card")}
      className="max-w-sm"
    >
      Contenido de la tarjeta.
    </ITCard>
  );
}
```

## Notas

- Sin `onClick` la tarjeta es estática (`cursor: default`, transición `none`). Con `onClick` gana `cursor: pointer`, transición de `box-shadow`/`transform` y elevación en hover.
- Adapta borde, radio y sombra al aspecto del tema mediante `useITFlatAppearance()`: en `"flat"` el borde es `--it-card-flat-border` (hairline) y solo hay sombra al hacer hover si es clicable; en `"soft"` la tarjeta flota con `--shadow-sm` y sube a `--shadow-lg` en hover (`translateY(-2px)`).
- Variables CSS usadas: `--it-card-bg`, `--it-card-border`, `--it-card-flat-border`, `--it-card-radius` (con fallbacks `#ffffff`, `rgba(15,23,42,0.06)`, `--color-secondary-200`, `--radius-lg`/`--radius-2xl`).
- La imagen ocupa el ancho completo con `h-48 object-cover` salvo que `imageClassName` la sobreescriba.
- El cuerpo tiene `padding: 1.25rem`; el pie usa `p-4`, `border-t` y `mt-auto` (se ancla al fondo si la tarjeta es columna).
- El título se renderiza con `ITText as="h3"`; el tamaño cambia según el aspecto (flat `text-base`, soft `text-xl`).
- El contenido declarativo va envuelto en `ITText as="div"` (`text-secondary-600`).

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `card.imageAlt` | Imagen de tarjeta | Card image | `card.tsx` — valor por defecto del `alt` cuando no se pasa la prop |

El `alt` real es la prop `alt` (si se pasa, gana sobre la key). El `title` entra por props; los textos del contenido y del pie los aporta el consumidor.
