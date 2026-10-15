# ITLayout

|  |  |
| --- | --- |
| Capa | `templates` |
| Carpeta | `src/components/templates/layout/` |
| Archivo | `layout.tsx` |
| Props | `layout.props.ts` |
| Import | `import { ITLayout } from "@axzydev/axzy_ui_system"` |

Shell principal de aplicación: barra superior, sidebar y área de contenido. Proporciona una
barra lateral de escritorio colapsable (con expansión por hover o botón), un overlay de sidebar
deslizante en móvil y una región de contenido con scroll. Es el punto de composición de
`ITTopBar` (que no se exporta por separado) y `ITSidebar`.

## Import

```tsx
import { ITLayout } from "@axzydev/axzy_ui_system";
```

## Props

### `ITLayoutProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `topBar` | `ITTopBarProps` | — | Configuración y props de la barra superior. Obligatoria. |
| `sidebar` | `ITSidebarProps` | — | Configuración y props de la barra lateral. Obligatoria. |
| `children` | `ReactNode` | — | Contenido principal del área central. Obligatoria. |
| `className` | `string` | `""` | Clases adicionales para el wrapper externo. |
| `contentClassName` | `string` | `""` | Clases adicionales para el contenedor de contenido. |
| `sidebarFullHeight` | `boolean` | `false` | `false`: la topbar ocupa todo el ancho y la sidebar va debajo. `true`: la sidebar ocupa toda la altura, muestra la marca (`topBar.logo` + `topBar.logoText`) arriba y la topbar solo cubre la columna de contenido (sin logo desde `lg`). El móvil no cambia. |

## Ejemplo

```tsx
import { ITLayout } from "@axzydev/axzy_ui_system";

export function Shell() {
  return (
    <ITLayout
      topBar={{ logoText: "AXZY" }}
      sidebar={{ navigationItems: [], activeKey: "inicio" }}
      className="min-h-screen"
      contentClassName="max-w-5xl"
      sidebarFullHeight={false}
    >
      <p>Contenido de la página</p>
    </ITLayout>
  );
}
```

## Notas

- **`ITTopBar` no es público.** `ITLayout` monta `ITTopBar` internamente a partir de `topBar` y le inyecta `hideBrandOnDesktop`, `showMobileMenuButton`, `showDesktopMenuButton` y `onToggleMobileMenu`.
- **Sidebar controlada vs. interna.** Si `sidebar.isCollapsed` está definido, el colapso es controlado y se usa `sidebar.onToggleCollapse`; si no, `ITLayout` mantiene su propio estado (colapsado por defecto) y alterna la rail.
- **Botón vs. hover.** El botón de menú de la topbar alterna el rail en desktop solo cuando `sidebar.expandOnHover === false`; si no, abre la sidebar móvil. En móvil siempre abre/cierra el overlay.
- **Ancho reservado.** El contenedor reserva el ancho de la sidebar en reposo: `88px` (rail colapsado) o `280px` expandida; `72px` / `248px` cuando el tema es `flat`. Al colapsar por defecto, la sidebar se expande por encima del contenido (por eso el z-index y la reserva).
- **Sidebar móvil.** Se muestra como overlay (`fixed inset-0 z-[40]`, `bg-black/40 backdrop-blur-sm`) que se cierra al hacer clic fuera; el panel interno detiene la propagación. Solo visible bajo `lg`.
- **`sidebarFullHeight`.** Mueve la marca de la topbar a la sidebar; `ITLayout` calcula `brand = sidebar.brand ?? { logo: topBar.logo, text: topBar.logoText }` y sube el `z-index` de la sidebar de desktop a `z-50`.
- **Fondo y apariencia.** El fondo del shell usa `theme.layout.backgroundColor`. El drop-shadow de la sidebar se omite en apariencia "flat".
- **Contenido.** El `main` es scrollable (`overflow-y-auto`) y el contenedor interno aplica `max-w-7xl px-4 sm:px-6 lg:px-8 py-6` más `contentClassName`.
- **Sin estilos propios.** Todo se resuelve con clases Tailwind y tokens del tema.

## Textos (i18n)

Este componente no renderiza textos propios; todo el texto visible entra por `topBar`, `sidebar` y `children` (y sus respectivos componentes internos).

## Altura (importante al embeberlo)

`ITLayout` ocupa la altura del viewport (`h-screen`) por diseño: es el chassis de una app completa. Si lo
metes dentro de otra superficie (una página de documentación, un preview, una tarjeta), dale un contenedor
con altura y pásale `className="!h-full"`; de lo contrario se estirará a 100vh y se saldrá de su caja.

```tsx
<div className="h-[640px] overflow-hidden rounded-xl border">
  <ITLayout className="!h-full" topBar={{ ... }} sidebar={{ ... }}>
    <TuContenido />
  </ITLayout>
</div>
```
