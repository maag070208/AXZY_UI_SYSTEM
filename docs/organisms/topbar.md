# ITTopBar

|  |  |
| --- | --- |
| Capa | `organisms` |
| Carpeta | `src/components/organisms/topbar/` |
| Archivo | `topbar.tsx` |
| Props | `topbar.props.ts` |
| Import | `import ITLayout from "@axzydev/axzy_ui_system";` (ver nota) |

Barra superior (`<header>`) con logo, navegación en desktop, contenido central opcional (p. ej. un buscador), slot de acciones y menú de usuario desplegable.

> **No exportado en el entrypoint.** `ITTopBar` no figura en `src/index.ts`: se consume a través de `ITLayout` mediante la prop `topBar` (ver Notas).

## Import

```tsx
// No hay import público de ITTopBar. Se usa a través de ITLayout:
import { ITLayout } from "@axzydev/axzy_ui_system";

<ITLayout
  topBar={{ logoText: "AXZY", userMenu: { userName: "Jane", userEmail: "jane@acme.com", menuItems: [] } }}
  sidebar={{ navigationItems: [] }}
>
  Contenido
</ITLayout>;
```

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `logo` | `any` | — | Elemento del logo (`<img>` o componente SVG). |
| `logoText` | `string` | — | Texto junto al logo. |
| `centerContent` | `ReactNode` | — | Contenido central (p. ej. buscador); solo desde `lg`. |
| `children` | `ReactNode` | — | Acciones a la derecha, justo antes del menú de usuario. |
| `userMenu` | `{ userName: string; userEmail: string; userImage?: string; menuItems: { label: string; onClick: () => void }[] }` | — | Menú de usuario. |
| `navItems` | `ITTopBarNavItem[]` (`{ id; label; icon?; action }`) | — | Ítems de navegación en desktop. |
| `onNavItemClick` | `(id: string) => void` | — | Se dispara al pulsar un ítem (recibe su `id`). |
| `showMobileMenuButton` | `boolean` | `false` | Muestra el botón de menú (declarado; `ITLayout` lo pasa siempre). |
| `onToggleMobileMenu` | `() => void` | — | Se dispara al pulsar el botón de menú. |
| `showDesktopMenuButton` | `boolean` | `false` | Mantiene el botón de menú también desde `lg`. |
| `hideBrandOnDesktop` | `boolean` | `false` | Oculta logo+`logoText` desde `lg` y alinea `centerContent` a la izquierda. |

## Ejemplo

```tsx
import { ITLayout } from "@axzydev/axzy_ui_system";

export function Shell() {
  return (
    <ITLayout
      sidebar={{ navigationItems: [] }}
      topBar={{
        logoText: "AXZY",
        centerContent: <input placeholder="Buscar..." />,
        userMenu: {
          userName: "Jane Doe",
          userEmail: "jane@example.com",
          menuItems: [
            { label: "Perfil", onClick: () => {} },
            { label: "Salir", onClick: () => {} },
          ],
        },
      }}
    >
      <p>Contenido</p>
    </ITLayout>
  );
}
```

## Notas

- **No se exporta** desde `src/index.ts`; `ITLayout` lo monta internamente a partir de `topBar` y le inyecta `hideBrandOnDesktop`, `showMobileMenuButton`, `showDesktopMenuButton` y `onToggleMobileMenu`.
- El JSDoc de `showMobileMenuButton` declara `@default false`, pero el componente no asigna valor por defecto: el botón solo se renderiza cuando es truthy. Dentro de `ITLayout` siempre se pasa, así que siempre aparece; fuera del layout hay que pasarlo explícitamente.
- `centerContent` se renderiza solo desde `lg`, en un contenedor de máx. `420px`; `children` se coloca justo antes del menú de usuario.
- Aviso destructivo: un ítem de `userMenu.menuItems` cuyo `label` (en minúsculas) contenga `"salir"`, `"cerrar"` o `"logout"` se pinta en color de peligro y añade un separador si es el último.
- `navItems` pinta botones de navegación en desktop y llama a `onNavItemClick(item.id)`. El campo `action` del ítem es legacy y no se usa en el render.
- `hideBrandOnDesktop` oculta logo y texto desde `lg` y alinea `centerContent` a la izquierda.
- Colores por variables CSS (`--it-topbar-bg`, `--it-topbar-border`, `--it-topbar-icon`, `--it-topbar-text`, `--it-topbar-user-*`). Aspecto flat: sin sombra/blur, altura `h-[64px]` (vs `h-[72px]`) y avatar con iniciales.
- Accesibilidad: el botón de menú usa `aria-label="Menú"`; la imagen de usuario usa `alt="Current user"`; el avatar de iniciales lleva `aria-hidden="true"`.

## Textos (i18n)

| Key | es | en | Dónde (`topbar.tsx`) |
| --- | --- | --- | --- |
| `common.menu` | `Menú` | `Menu` | `:107` (`aria-label` del botón) |
| `common.userAvatar` | `Usuario actual` | `Current user` | `:205` (`alt` del avatar) |

El resto del texto visible entra por `logoText`, `navItems`, `centerContent`, `children` y `userMenu`.
