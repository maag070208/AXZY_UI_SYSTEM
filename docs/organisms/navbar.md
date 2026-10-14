# ITNavbar

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/navbar/` |
| Archivo | `navbar.tsx` |
| Props | `navbar.props.ts` |
| Import | `import { ITNavbar } from "@axzydev/axzy_ui_system"` |

Shell de navegación con sidebar temático, submenús colapsables y menú de usuario desplegable. Tiene una ruta "nueva" (basada en `navigationItems`) y una ruta legacy (basada en `navItems`/`sidebarItems`).

## Import

```tsx
import { ITNavbar } from "@axzydev/axzy_ui_system";
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `logo` | `React.ReactNode` | — | Logo renderizado en el header del sidebar. |
| `logoText` | `string` | — | Texto junto al logo. |
| `navigationItems` | `ITNavigationItem[]` | `[]` (el código asigna `[]`) | Ítems del menú principal. |
| `userMenu` | `{ userImage?: string; userName: string; userEmail: string; menuItems: { label: string; onClick: () => void }[] }` | — | Avatar, datos y acciones del usuario. |
| `children` | `React.ReactNode` | — | Contenido del área principal. |
| `navItems` | `React.ReactNode` | — | **@deprecated**. Usar `navigationItems`. |
| `showSidebar` | `boolean` | `false` | **@deprecated**. Muestra el sidebar legacy. |
| `showSidebarOnMobile` | `boolean` | `false` | **@deprecated**. Muestra el sidebar legacy en móvil. |
| `sidebarItems` | `React.ReactNode` | — | **@deprecated**. Usar `navigationItems`. |

Tipos propios de este componente (en `navbar.props.ts`):
- `ITNavigationItem { id: string; label: string; icon?: ReactNode; action?: () => void; isActive?: boolean; subitems?: ITNavigationSubItem[] }`.
- `ITNavigationSubItem { id: string; label: string; action: () => void; isActive?: boolean }`.

## Ejemplo

```tsx
import { ITNavbar } from "@axzydev/axzy_ui_system";
import { FaHome, FaCog } from "react-icons/fa";

export function Shell() {
  return (
    <ITNavbar
      logoText="Mi App"
      navigationItems={[
        { id: "home", label: "Inicio", icon: <FaHome />, isActive: true },
        {
          id: "settings",
          label: "Configuración",
          icon: <FaCog />,
          subitems: [{ id: "profile", label: "Perfil", action: () => {} }],
        },
      ]}
      userMenu={{
        userName: "John Doe",
        userEmail: "john@example.com",
        menuItems: [{ label: "Salir", onClick: () => {} }],
      }}
    >
      <p>Contenido</p>
    </ITNavbar>
  );
}
```

## Notas

- `ITNavbar` define **sus propios** tipos `ITNavigationItem` y `ITNavigationSubItem` (en `navbar.props.ts`), distintos de los de `ITSidebar`. Sus `subitems` son planos: **no** admiten grupos con título (`ITNavigationSubItemGroup`).
- Modo legacy: si `navigationItems` está vacío y se pasa `navItems` o `sidebarItems`, entra en la implementación antigua. Ahí aplican `showSidebar` y `showSidebarOnMobile`.
- Modo nuevo: renderiza un `<aside>` fijo de ancho `w-72` (no colapsable) y `children` como área principal desplazable.
- Un ítem padre con `subitems` alterna su submenú (chevron derecho/abajo); un ítem sin submenús ejecuta su `action`.
- Los subítems activos auto-expanden su padre (`expandedItems`).
- Sin `userImage`, el usuario cae en el icono `FaUserCircle`. El menú de usuario se cierra al hacer clic fuera (`useClickOutside`).
- La apariencia nueva usa `theme.sidebar` / `theme.topbar`; la legacy usa clases `secondary-*`.
- Accesibilidad: la `<img>` de usuario lleva `alt="user photo"`; la navegación no expone `role`/`aria-*` propios.

## Textos (i18n)

| Key | es | en | Dónde (`navbar.tsx`) |
| --- | --- | --- | --- |
| `common.userAvatar` | `Usuario actual` | `Current user` | `:111` (alt del avatar, modo legacy) |
| `common.userAvatar` | `Usuario actual` | `Current user` | `:295` (alt del avatar, modo nuevo) |

El resto del texto visible entra por `logoText`, `navigationItems` y `userMenu`.
