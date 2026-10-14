# ITToast

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/toast/` |
| Archivo | `toast.tsx` |
| Props | `toast.props.ts` |
| Import | `import { ITToast } from "@axzydev/axzy_ui_system"` |

Notificación flotante con autocierre y estilo según severidad. Renderiza un icono, el mensaje y un botón de cierre, en una de seis posiciones.

## Import

```tsx
import { ITToast } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `message` | `string` | — | Texto del toast. |
| `type` | `"success" \| "error" \| "warning" \| "info" \| "primary" \| "danger" \| string` | `"info"` | Severidad; determina icono y color de fondo. |
| `duration` | `number` | `1500` | Milisegundos antes del autocierre. |
| `position` | `"top-right" \| "top-center" \| "top-left" \| "bottom-right" \| "bottom-center" \| "bottom-left"` | `"top-right"` | Posición en pantalla. |
| `onClose` | `() => void` | — | Se invoca tras terminar la animación de salida. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITToast } from "@axzydev/axzy_ui_system";

export function SaveNotifier() {
  const [show, setShow] = useState(false);

  return (
    <>
      <ITButton label="Guardar" onClick={() => setShow(true)} />
      {show && (
        <ITToast
          message="Cambios guardados"
          type="success"
          duration={2000}
          position="bottom-right"
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
}
```

## Notas

- `type` acepta además cualquier `string`: se resuelve contra `theme.colors`; si la clave no existe, usa `theme.colors.primary[500]`.
- Se autocierra: pasa a `isVisible = false` a los `duration` ms y llama a `onClose` 300 ms después (tras la transición).
- El botón de cierre dispara el mismo flujo (`handleClose`) y tiene `aria-label` traducido (`common.closeNotification`).
- Iconos: `success` → check, `error`/`danger` → times-circle, `warning` → exclamation-triangle, `info`/resto → info-circle.
- El contenedor lleva `role="alert"`, `fixed z-[80]`, `min-w-[300px]` y fondo `theme.colors[type][500]`.
- Las clases de posición viven en `positionStyles` (`@/types/toast.types`).
- Si no se pasa `onClose`, el toast se desvanece igualmente, pero el padre no recibe aviso para desmontarlo.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `common.closeNotification` | `Cerrar notificación` | `Close notification` | `toast.tsx:103` (`aria-label` del botón de cierre) |

El mensaje visible entra por la prop `message`.
