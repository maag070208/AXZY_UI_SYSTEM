# ITSidebar

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/sidebar/` |
| Archivo | `sidebar.tsx` |
| Props | `sidebar.props.ts` |
| Import | `import { ITSidebar } from "@axzydev/axzy_ui_system"` |

Navegación vertical con submenús expandibles, tooltips en modo colapsado y brand/notificación opcionales. El riel colapsado se expande automáticamente al pasar el puntero (no hay botón propio): el hover es la forma por defecto de abrir/cerrar.

## Import

```tsx
import { ITSidebar } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `navigationItems` | `ITNavigationItem[]` | — | Estructura de navegación (ítems con subítems opcionales). |
| `isCollapsed` | `boolean` | `false` | Estado colapsado del sidebar. |
| `onToggleCollapse` | `() => void` | — | Alterna `isCollapsed`. `ITLayout` lo llama desde el botón del topbar cuando `expandOnHover` es `false`. |
| `expandOnHover` | `boolean` | `true` | `true`: se expande por hover. `false`: queda riel de iconos (tooltip) y solo abre con `onToggleCollapse`. |
| `visibleOnMobile` | `boolean` | `false` | Fuerza visible en móvil. |
| `onItemClick` | `(item: ITNavigationItem) => void` | — | Se dispara al hacer clic en un ítem de nivel superior. |
| `onSubItemClick` | `(subitem: ITNavigationSubItem) => void` | — | Se dispara al hacer clic en un subítem. |
| `subitemConnector` | `'dot' \| '|' \| 'none'` | `'dot'` | Estilo del conector de los subítems. |
| `className` | `string` | `""` | Clases CSS del `<aside>`. |
| `header` | `ReactNode` | — | Contenido sobre la navegación (se oculta al colapsar). |
| `notification` | `ITSidebarNotification` | — | Fila de notificación (icono + label + `ITBadget`). |
| `brand` | `ITSidebarBrand` | — | Bloque de marca (logo siempre visible; texto solo expandido). |

Tipos exportados:
- `ITNavigationItem { id; label; icon?; action?; isActive?; subitems?; badge?; badgeProps? }`.
- `ITNavigationSubItem { id; label; action?; isActive? }`.
- `ITNavigationSubItemGroup { id; label; items: ITNavigationSubItem[] }`.
- `ITNavigationSubItemEntry = ITNavigationSubItem | ITNavigationSubItemGroup` (se discrimina con `"items" in entry`).
- `ITSidebarNotification { count: number; icon?; label?: string (default "Notificaciones"); onClick?; badgeProps? }`.
- `ITSidebarBrand { logo?: ReactNode; text?: string }`.

## Ejemplo

```tsx
import { useState } from "react";
import { ITSidebar } from "@axzydev/axzy_ui_system";
import { FaHome, FaCog, FaBell } from "react-icons/fa";

export function Nav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ITSidebar
      navigationItems={[
        { id: "home", label: "Inicio", icon: <FaHome />, isActive: true },
        {
          id: "settings",
          label: "Configuración",
          icon: <FaCog />,
          badge: 3,
          subitems: [
            { id: "profile", label: "Perfil", action: () => {} },
            { id: "billing", label: "Facturación", isActive: true },
          ],
        },
      ]}
      notification={{ count: 5, icon: <FaBell />, label: "Notificaciones" }}
      isCollapsed={collapsed}
      onToggleCollapse={() => setCollapsed((v) => !v)}
    />
  );
}
```

## Notas

- `expandOnHover` (por defecto `true`): el riel colapsado se expande mientras el puntero está sobre él, sin botón. Con `expandOnHover={false}` queda un riel fijo de iconos (nombre en tooltip) que solo abre vía `onToggleCollapse` (el botón del topbar en `ITLayout`).
- `visibleOnMobile` fuerza `isSidebarCollapsed = false` en móvil (ignora `isCollapsed`).
- Anchos: `w-[88px]` colapsado / `w-[280px]` expandido (aspecto flat: `w-[72px]` / `w-[248px]`).
- `onToggleCollapse` también se invoca al hacer clic en un ítem padre colapsado en modo riel fijo (`expandOnHover={false}`), para poder abrir el submenú.
- Los `subitems` aceptan entradas planas o grupos con título. Los grupos solo añaden un encabezado: no son clicables ni abren un tercer nivel (el sidebar soporta **un** nivel de anidamiento).
- Si un subítem está activo, su padre se auto-expande (`useEffect` sobre `navigationItems`).
- `subitemConnector`: `"dot"` (punto), `"|"` (barra vertical sobre el borde) o `"none"`.
- `brand` mantiene el logo visible al colapsar (el texto solo se ve expandido); `header` se oculta por completo al colapsar; `notification` conserva icono + contador.
- Los badges usan `ITBadget`: `item.badge` con color `primary` y el contador de `notification` con color `danger` (`size="sm"`).
- Aspecto flat (`appearance="flat"`): sin sombra/glow, sin barra de acento, ancho menor y tooltips simples.
- Accesibilidad: `<nav aria-label="Componentes de la librería">`; los ítems son `role="button"` con `tabIndex={0}`, `aria-expanded`/`aria-controls` cuando tienen submenú y responden a Enter/Space; el submenú es `role="group"`; el subítem activo lleva `aria-current="page"`; notification expone `aria-label`/`title={label}`.

## Textos (i18n)

| Key | es | en | Dónde (`sidebar.tsx`) |
| --- | --- | --- | --- |
| `sidebar.notifications` | `Notificaciones` | `Notifications` | `:256` (default de `notification.label`) |
| `sidebar.navAria` | `Componentes de la librería` | `Library components` | `:376` (`aria-label` del `<nav>`) |
| `sidebar.noSubmenu` | `No hay submenú` | `No submenu` | `:530` |

El resto del texto visible entra por `navigationItems`, `notification.label`, `brand.text` y `header`.
