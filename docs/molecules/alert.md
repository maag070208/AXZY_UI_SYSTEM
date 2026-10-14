# ITAlert

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/alert/` |
| Archivo | `alert.tsx` |
| Props | `alert.props.ts` |
| Import | `import { ITAlert } from "@axzydev/axzy_ui_system"` |

Mensaje contextual con cuatro variantes semánticas (info, success, warning, error), cada una con icono y colores propios, y soporte de modo oscuro. Puede incluir título, icono personalizado y botón de descarte.

## Import

```tsx
import { ITAlert } from "@axzydev/axzy_ui_system";
```

## Props

### `ITAlertProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `variant` | `AlertVariant` = `"info" \| "success" \| "warning" \| "error"` | `"info"` | Estilo visual de la alerta. |
| `title` | `string` | — | Título en negrita mostrado sobre el mensaje. |
| `children` | `ReactNode` | — | Contenido del mensaje. |
| `dismissible` | `boolean` | `false` | Si el usuario puede descartar la alerta. |
| `onDismiss` | `() => void` | — | Callback al pulsar el botón de descarte. |
| `icon` | `ReactNode` | — | Icono personalizado; sobrescribe el icono por variante. |
| `className` | `string` | — | Clases CSS adicionales para el contenedor. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITAlert } from "@axzydev/axzy_ui_system";

export default function Notice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <ITAlert variant="success" title="Guardado" dismissible onDismiss={() => setVisible(false)}>
      Los cambios se guardaron correctamente.
    </ITAlert>
  );
}
```

## Notas

- El contenedor lleva `role="alert"`.
- Iconos por defecto por variante (16px): `FaInfoCircle` (info), `FaCheckCircle` (success), `FaExclamationTriangle` (warning), `FaTimesCircle` (error). `icon` los reemplaza.
- El botón de descarte solo se renderiza cuando `dismissible` **y** `onDismiss` están presentes.
- Colores por variante con `bg-*-50` / `border-*-200` / `text-*-800` y equivalentes `dark:` (`bg-*-950/20`, `border-*-800`, `text-*-300`).
- El título usa `ITText as="p"` (`text-sm font-bold`); el contenido `ITText as="div"` (`text-sm opacity-90`).
- El botón de descarte tiene nombre accesible vía `aria-label` traducido (`common.dismiss`, `alert.tsx:56`).

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `common.dismiss` | `Descartar` | `Dismiss` | `alert.tsx:56` (`aria-label` del botón de descarte) |

El `title` y el contenido entran por props (`title` y `children`).
