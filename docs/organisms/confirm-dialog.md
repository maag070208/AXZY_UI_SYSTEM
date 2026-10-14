# ITConfirmDialog

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/confirm-dialog/` |
| Archivo | `confirm-dialog.tsx` |
| Props | `confirm-dialog.props.ts` |
| Import | `import { ITConfirmDialog } from "@axzydev/axzy_ui_system"` |

Modal de confirmación para acciones destructivas o críticas. Muestra un overlay centrado con icono de advertencia, título, mensaje y botones de confirmar/cancelar. Se oculta cuando `isOpen` es `false`.

## Import

```tsx
import { ITConfirmDialog } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | — | Controla la visibilidad del diálogo. Obligatoria. |
| `onClose` | `() => void` | — | Se dispara al cancelar o cerrar el diálogo. |
| `onConfirm` | `() => void` | — | Se dispara al confirmar la acción. |
| `title` | `string` | `"Confirmar acción"` | Título mostrado en el diálogo. |
| `message` | `ReactNode` | `"¿Estás seguro de que deseas continuar?"` | Cuerpo del mensaje. |
| `confirmLabel` | `string` | `"Confirmar"` | Texto del botón de confirmación. |
| `cancelLabel` | `string` | `"Cancelar"` | Texto del botón de cancelación. |
| `variant` | `ColorsTypes` (`"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "purple" \| "error" \| "gray"`) | `"primary"` | Color del botón de confirmación. |
| `loading` | `boolean` | `false` | Deshabilita ambos botones mientras se procesa. |

## Ejemplo

```tsx
import { useState } from "react";
import { ITButton, ITConfirmDialog } from "@axzydev/axzy_ui_system";

export function DeleteButton({ onDelete }: { onDelete: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ITButton label="Eliminar" color="danger" onClick={() => setOpen(true)} />
      <ITConfirmDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          setLoading(true);
          await onDelete();
          setLoading(false);
          setOpen(false);
        }}
        title="Eliminar registro"
        message="Esta acción es permanente y no se puede deshacer."
        variant="danger"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        loading={loading}
      />
    </>
  );
}
```

## Notas

- Si `isOpen` es `false` retorna `null`: no monta overlay ni contenido.
- Se renderiza en el árbol del componente (no usa portal) con `fixed inset-0 z-[60]`.
- El overlay (`bg-black/40 backdrop-blur-sm`) cierra al hacer clic (`onClick={onClose}`). Con `loading` el overlay sigue cerrando; los botones son los que quedan `disabled`.
- El icono es fijo: `FaExclamationTriangle` en un círculo ámbar; no es configurable.
- El botón de confirmar usa `color={variant}`; el de cancelar es `variant="outlined"`. Ambos `size="sm"`.
- Apariencia del panel fija en clases (`rounded-2xl shadow-2xl max-w-md`, fondos blancos/slate); no usa tokens de `theme`.
- Accesibilidad: no define `role="dialog"` ni `aria-modal`, no hay focus trap ni retorno de foco, y no se cierra con la tecla `Escape`.

## Textos (i18n)

| Key | es | en | Dónde (`confirm-dialog.tsx`) |
| --- | --- | --- | --- |
| `confirmDialog.title` | `Confirmar acción` | `Confirm action` | `:42` (default de `title`) |
| `confirmDialog.message` | `¿Estás seguro de que deseas continuar?` | `Are you sure you want to continue?` | `:43` (default de `message`) |
| `common.confirm` | `Confirmar` | `Confirm` | `:44` (default de `confirmLabel`) |
| `common.cancel` | `Cancelar` | `Cancel` | `:45` (default de `cancelLabel`) |
