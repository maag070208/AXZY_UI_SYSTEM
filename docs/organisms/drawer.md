# ITDrawer

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/drawer/` |
| Archivo | `drawer.tsx` |
| Props | `drawer.props.ts` |
| Import | `import { ITDrawer } from "@axzydev/axzy_ui_system"` |

Panel deslizante anclado a un borde de la pantalla (`left` o `right`). Incluye overlay, barra de título opcional con botón de cerrar y un cuerpo con scroll.

## Import

```tsx
import { ITDrawer } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | — | Controla la visibilidad del drawer. |
| `onClose` | `() => void` | — | Se dispara al hacer clic en el overlay o en el botón de cerrar. |
| `position` | `DrawerPosition` (`"left" \| "right"`) | `"right"` | Borde al que se ancla el drawer. |
| `size` | `string` | `"w-80"` | Clase Tailwind de ancho (p. ej. `"w-80"`, `"w-96"`). |
| `title` | `ReactNode` | — | Encabezado opcional del drawer. |
| `children` | `ReactNode` | — | Contenido del cuerpo. |
| `className` | `string` | — | Clases CSS adicionales del panel. |
| `style` | `CSSProperties` | — | Estilos inline del panel. |

Tipo exportado: `DrawerPosition = "left" | "right"`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITDrawer } from "@axzydev/axzy_ui_system";

export function FilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ITButton label="Filtros" onClick={() => setOpen(true)} />
      <ITDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Filtros"
        position="left"
        size="w-96"
      >
        <p>Contenido del panel</p>
      </ITDrawer>
    </>
  );
}
```

## Notas

- No usa portal; se monta en el árbol con overlay `fixed inset-0 z-[50]`.
- El cierre al hacer clic fuera del panel depende de `useClickOutside(panelRef, onClose)`; el overlay no tiene su propio `onClick`.
- La hoja de estilos declara `transition-transform duration-300`, pero como el drawer no se monta cuando `isOpen` es `false`, solo hay animación de entrada (no hay transición de salida).
- `position="right"` aplica `ml-auto`; `"left"` aplica `mr-auto`. El header (título + botón de cerrar) solo se renderiza si `title` está presente.
- El cuerpo usa `flex-1 overflow-y-auto p-5`; el panel mide `h-full`.
- Accesibilidad: el botón de cerrar tiene `aria-label` traducido (`common.close`, `drawer.tsx:63`); no hay `role="dialog"`, `aria-modal`, focus trap ni cierre con `Escape`.

## Textos (i18n)

| Key | es | en | Dónde (`drawer.tsx`) |
| --- | --- | --- | --- |
| `common.close` | `Cerrar` | `Close` | `:63` (`aria-label` del botón de cerrar) |

El `title` y el contenido entran por props (`title` / `children`).
