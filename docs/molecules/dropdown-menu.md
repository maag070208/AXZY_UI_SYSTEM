# ITDropdownMenu

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/dropdown-menu/` |
| Archivo | `dropdown-menu.tsx` |
| Props | `dropdown-menu.props.ts` |
| Import | `import { ITDropdownMenu } from "@axzydev/axzy_ui_system"` |

Menú de acciones con navegación por teclado y semántica ARIA. Se renderiza en un portal, así que no lo recorta un `ITCard` ni ancestros con `overflow: hidden`, y voltea arriba del trigger cuando no hay espacio abajo.

## Import

```tsx
import { ITDropdownMenu } from "@axzydev/axzy_ui_system";
```

## Props

### `ITDropdownMenuProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `items` | `ITDropdownMenuItem[]` | — | Acciones del menú. |
| `trigger` | `ReactNode` | icono `FaEllipsisV` | Contenido personalizado del trigger. |
| `triggerLabel` | `string` | `"Abrir menú"` | Etiqueta accesible del botón trigger (y del panel). |
| `placement` | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-end"` | Posición del menú respecto al trigger. |
| `onSelect` | `(id: string, item: ITDropdownMenuItem) => void` | — | Se dispara al activar un item, con su id y definición. |
| `disabled` | `boolean` | `false` | Deshabilita el trigger. |
| `className` | `string` | — | Clases CSS adicionales para el botón trigger. |
| `menuClassName` | `string` | — | Clases CSS adicionales para el panel del menú. |

### `ITDropdownMenuItem`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `id` | `string` | — | Identificador único del item. |
| `label` | `ReactNode` | — | Contenido del item (normalmente texto). |
| `icon` | `ReactNode` | — | Icono opcional a la izquierda. |
| `shortcut` | `string` | — | Atajo mostrado a la derecha (p. ej. `"⌘K"`). |
| `onClick` | `() => void` | — | Handler de click del item. |
| `disabled` | `boolean` | `false` | Deshabilita el item. |
| `danger` | `boolean` | `false` | Pinta el item en color de peligro (acciones destructivas). |
| `divider` | `boolean` | `false` | Dibuja un separador encima del item. |

## Ejemplo

```tsx
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ITDropdownMenu } from "@axzydev/axzy_ui_system";

export default function RowActions() {
  const [last, setLast] = useState("—");

  return (
    <div className="flex items-center gap-3">
      <span>Última acción: {last}</span>
      <ITDropdownMenu
        items={[
          { id: "edit", label: "Editar", icon: <FaEdit />, onClick: () => setLast("Editar") },
          { id: "copy", label: "Duplicar", shortcut: "⌘D", onClick: () => setLast("Duplicar") },
          {
            id: "delete",
            label: "Eliminar",
            icon: <FaTrash />,
            danger: true,
            divider: true,
            onClick: () => setLast("Eliminar"),
          },
        ]}
      />
    </div>
  );
}
```

## Notas

- Trigger por defecto: `FaEllipsisV` (14px). `triggerLabel` se usa como `aria-label` del botón y del panel.
- ARIA: el trigger lleva `aria-haspopup="menu"` y `aria-expanded`; el panel `role="menu"`; cada item `role="menuitem"` con `tabIndex={-1}`.
- Teclado en el trigger: `ArrowDown`/`ArrowUp` abren (o navegan si ya está abierto), `Enter`/`Space` abren o avanzan, `Escape` cierra.
- Teclado en el panel: `ArrowUp`/`ArrowDown` navegan, `Home`/`End` saltan al primero/último habilitado, `Escape` cierra (restaurando el foco al trigger) y `Tab` cierra sin restaurar foco.
- Al abrir, el foco pasa al primer item habilitado mediante `requestAnimationFrame`; los items deshabilitados se saltan.
- Click fuera (`mousedown` sobre algo que no sea trigger ni panel) cierra.
- `placement` decide la alineación (`align: "end"` si el valor termina en `"end"`); el auto-flip (arriba/abajo) lo gestiona `useFloatingPanel`. Se renderiza en `createPortal(…, document.body)` con `data-it-floating="true"`.
- Al activar un item se llama primero su `onClick` y luego `onSelect(id, item)`; el menú se cierra.
- `danger` afecta al color del texto y al hover/focus (`text-danger-600`, fondo `danger-50/950`), no al fondo del item activo.

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `dropdownMenu.open` | `Abrir menú` | `Open menu` | `dropdown-menu.tsx:36` (default de `triggerLabel`) |

Los textos de los items entran por props (`items[].label` / `items[].shortcut`).
