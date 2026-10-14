# ITDialog

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/dialog/` |
| Archivo | `dialog.tsx` |
| Props | `dialog.props.ts` |
| Import | `import { ITDialog } from "@axzydev/axzy_ui_system"` |

Modal renderizado con `createPortal` sobre `document.body`. Soporta cierre con `Escape`, cierre al hacer clic fuera, barra de título simple o con `ITFormHeader`, y una variante a pantalla completa.

## Import

```tsx
import { ITDialog } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | — | Controla la visibilidad del diálogo. |
| `onClose` | `() => void` | — | Se dispara al hacer clic en el overlay, en el botón de cerrar o al pulsar `Escape`. |
| `children` | `React.ReactNode` | — | Contenido renderizado dentro del cuerpo del diálogo. |
| `className` | `string` | — | Clases CSS adicionales del panel. |
| `title` | `string` | — | Título opcional mostrado arriba. |
| `useFormHeader` | `boolean` | `false` | Con `title`, renderiza un `ITFormHeader` en lugar de la barra por defecto. |
| `fullScreen` | `boolean` | `false` | Hace que el diálogo ocupe todo el viewport. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITDialog } from "@axzydev/axzy_ui_system";

export function UserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ITButton label="Abrir" onClick={() => setOpen(true)} />
      <ITDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Detalles del usuario"
        useFormHeader
      >
        <p>Contenido del diálogo</p>
      </ITDialog>
    </>
  );
}
```

## Notas

- Usa `createPortal(content, document.body)`; retorna `null` si `isOpen` es `false` o si no existe `document` (SSR).
- Se cierra con clic fuera del panel (`useClickOutside`) y con la tecla `Escape` (listener en `document` mientras `isOpen`).
- Con `useFormHeader` **y** `title`, renderiza `<ITFormHeader title onClose>` y el cuerpo con `p-6` (en `fullScreen`: `flex-1 overflow-auto p-6`).
- Sin `useFormHeader`, dibuja un botón de cierre (`FaRegTimesCircle`) arriba a la derecha y el `title` como `<h2>`.
- En `fullScreen` ignora `className` y anula el estilo de tarjeta (radio `0`, sombra `none`, borde `0`).
- La apariencia del panel viene de `theme.card` (`backgroundColor`, `borderRadius`, `shadow`, `borderWidth`, `borderColor`).
- Accesibilidad: el botón de cerrar tiene `aria-label` traducido (`common.close`); no hay `role="dialog"`, `aria-modal`, focus trap ni retorno de foco.

## Textos (i18n)

| Key | es | en | Dónde (`dialog.tsx`) |
| --- | --- | --- | --- |
| `common.close` | `Cerrar` | `Close` | `:105` (`aria-label` del botón de cerrar) |

El `title` y el contenido entran por props (`title` / `children`).
