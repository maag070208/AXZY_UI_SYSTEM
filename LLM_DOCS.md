# AXZY UI SYSTEM — Documentación para LLMs

## Identidad del Proyecto

- **Nombre**: `@axzydev/axzy_ui_system`
- **Versión**: 1.1.0
- **Stack**: React 18 + TypeScript + Tailwind CSS v3 + Vite + tsup
- **Ruta raíz**: `/Users/axzy/DEV/AXZY/AXZY_UI_SYSTEM`
- **Entry point**: `src/index.ts` (escribe todos los exports)
- **Build**: `tsup` produce `dist/index.cjs` + `dist/index.js` + types
- **Tests/Stories**: Storybook (`.stories.tsx`)
- **Package manager**: pnpm

---

## Arquitectura

```
src/
├── components/       → 52 componentes (cada uno en su carpeta)
│   ├── alert/, avatar/, badget/, breadcrumbs/, button/, ...
│   ├── layout/       → Chasis estructural (ITLayout)
│   ├── sidebar/      → Sidebar moderno glassmorphism (ITSidebar)
│   ├── topbar/       → Topbar (ITTopBar)
│   ├── navbar/       → Layout alternativo all-in-one (ITNavbar)
│   ├── text/         → ITText (wrapper tipográfico universal)
│   └── theme-provider/ → Sistema de theming central (ITThemeProvider)
├── showcases/        → Demos para el showroom
├── theme/            → theme.ts (objeto estático con tokens)
├── hooks/            → Custom hooks compartidos
├── utils/            → color.utils, styles, table.utils
├── types/            → Tipos compartidos (button, table, input...)
├── index.ts          → Exporta todo
└── App.tsx           → Showroom app
```

### Convenciones de Componentes

- **Prefijo**: `IT` (Intelligent Theme) → `ITButton`, `ITCard`, `ITText`, etc.
- **Archivos**: `<nombre>.tsx` + `<nombre>.props.ts` + `<nombre>.stories.tsx`
- **Props**: Siempre en archivo separado, interfaz `IT<Nombre>Props`
- **Default export**: función con nombre `IT<Nombre>`
- **CSS**: Solo Tailwind + CSS variables inline (NO módulos CSS, NO styled-components)
- **Todo texto debe usar `<ITText>`** — es la regla #1 del sistema

---

## Sistema de Theming (lo más importante)

### ITThemeProvider

Es el componente raíz que envuelve la app. Inyecta un tag `<style>` en `<head>` con TODAS las variables CSS del tema. También expone un FAB flotante para diseñar temas en vivo.

```tsx
<ITThemeProvider showFab={true}>
  <App />
</ITThemeProvider>
```

### Context API

```tsx
import { useITTheme, useITThemeSafe } from "@/index";

const { palette, setPalette, updateColor, resetTheme, applyPreset, resolvedTheme, darkModeMode, setDarkModeMode } = useITTheme();
```

### Palette (colores editables por el usuario)

```typescript
{
  primary: "#06b6d4",    // Cyan — color principal de acento
  secondary: "#6b7280",  // Gray — color secundario
  ternary: "#8b5cf6",    // Purple
  danger: "#ef4444",     // Red
  success: "#22c55e",    // Green
  info: "#3b82f6",       // Blue
  alert: "#f97316",      // Orange
  warning: "#eab308",    // Yellow
  layout: {
    sidebarBg: "#ffffff",
    sidebarText: "#334155",
    navbarBg: "#ffffff",
    navbarText: "#1e293b",
  },
  table: {
    headerBg: "#f8fafc",
    headerText: "#334155",
    rowBg: "#ffffff",
    rowText: "#1e293b",
  },
}
```

### Presets incluidos

| Nombre | Primary | Sidebar BG | Tono |
|---|---|---|---|
| Midnight Indigo | `#6366f1` | `#0b1120` | Oscuro, índigo |
| Coral Reef | `#f43f5e` | `#0c0808` | Oscuro, rojo |
| Oceanic Teal | `#0d9488` | `#042f2e` | Oscuro, teal |
| Golden Hour | `#d97706` | `#fefce8` | Claro, ámbar |
| Deep Forest | `#16a34a` | `#052e16` | Oscuro, verde |

### Dark Mode

- **Modo**: `"class"` en Tailwind (toggle `.dark` en `<html>`)
- **Detección**: 3 modos → `"light" | "dark" | "system"` (persistido en `localStorage("it-theme-dark-mode")`)
- **Adaptación**: Cuando dark mode está activo, los colores claros del palette se mezclan automáticamente con fondos oscuros usando `color-mix()`
- **Overrides CSS**: El themeProvider inyecta reglas `.dark .text-slate-XXX` y `.dark .bg-XXX` para que clases Tailwind estándar funcionen en dark mode

---

## Variables CSS (el corazón del theming)

Todas las variables se inyectan dinámicamente por `ITThemeProvider` en un tag `<style id="it-theme-dynamic-overrides">`.

### Sidebar (`--sidebar-*`)

```css
--sidebar-bg:              var(--color-sidebarBg)
--sidebar-border:          color-mix(in srgb, var(--color-sidebarBg) 85%, #000)
--sidebar-label-color:     var(--color-sidebarText)
--sidebar-icon-color:      color-mix(in srgb, var(--color-sidebarText) 80%, transparent)
--sidebar-hover-bg:        color-mix(in srgb, var(--color-sidebarText) 10%, transparent)
--sidebar-active-bg:       color-mix(in srgb, var(--color-primary) 12%, transparent)
--sidebar-active-color:    var(--color-primary)
--sidebar-active-icon:     var(--color-primary)
--sidebar-badge-bg:        var(--color-primary)
--sidebar-badge-color:     #ffffff
```

### Topbar (`--topbar-*`)

```css
--topbar-bg:                 var(--color-navbarBg)
--topbar-text:               var(--color-navbarText)
--topbar-border:             color-mix(in srgb, var(--color-navbarBg) 85%, #000)
--topbar-icon:               color-mix(in srgb, var(--color-navbarText) 80%, transparent)
--topbar-icon-hover:         var(--color-navbarText)
--topbar-user-bg:            var(--topbar-bg)
--topbar-user-hover:         color-mix(in srgb, var(--color-navbarText) 10%, transparent)
--topbar-user-text:          var(--color-navbarText)
--topbar-user-subtitle:      color-mix(in srgb, var(--color-navbarText) 65%, transparent)
--topbar-user-dropdown-bg:   color-mix(in srgb, var(--color-navbarBg) 100%, #fff)
--topbar-user-dropdown-border: color-mix(in srgb, var(--color-navbarBg) 92%, #000)
--topbar-user-item-hover:    color-mix(in srgb, var(--color-navbarText) 6%, transparent)
```

### Layout & Text

```css
--layout-bg:             var(--color-secondary-50)   /* = #f8fafc en light, #090f1d en dark */
--color-text-default:    var(--color-secondary-900)  /* texto estándar */
--color-text-muted:      var(--color-secondary-600)  /* texto secundario */
--color-heading-default: #1e293b (light) / #f8fafc (dark)
```

### Card

```css
--card-bg:               #ffffff (light) / #111827 (dark)
--card-border:           #f1f5f9 (light) / #1f2937 (dark)
--card-header-bg:        #f8fafc (light) / #1f2937 (dark)
--card-header-border:    #e2e8f0 (light) / #374151 (dark)
```

### Input

```css
--input-bg:              #ffffff (light) / #1f2937 (dark)
--input-border:          #cbd5e1 (light) / #374151 (dark)
--input-text-color:      #1e293b (light) / #cbd5e1 (dark)
--input-placeholder:     #94a3b8 (light) / #6b7280 (dark)
--input-focus-ring:      0 0 0 3px var(--color-primary-100)
--input-error-ring:      0 0 0 3px var(--color-danger-100)
```

### Tabla

```css
--color-table-headerBg:   del palette
--color-table-headerText: del palette
--color-table-rowBg:      del palette
--color-table-rowText:    del palette
```

### Escalas de color (generadas dinámicamente)

Cada color semántico (primary, secondary, success, danger, etc.) genera 11 tonos (50-950) usando `color-mix()`:

```
--color-primary-50:  color-mix(in srgb, var(--color-primary) 5%, #ffffff)   → muy claro
--color-primary-500: var(--color-primary)                                    → puro
--color-primary-950: color-mix(in srgb, var(--color-primary) 25%, #000000)  → muy oscuro
```

En dark mode, los tonos claros (50-400) se mezclan con fondo oscuro en vez de blanco:
```
--color-primary-50: color-mix(in srgb, var(--color-primary) 10%, #0b1329)
```

---

## ITText — Regla Fundamental

**TODO texto debe usar `<ITText>`.** Es el wrapper tipográfico universal del sistema.

```tsx
import ITText from "@/components/text/text";

<ITText>Párrafo estándar</ITText>
<ITText as="span">Texto inline</ITText>
<ITText as="h2" className="font-bold">Heading</ITText>
<ITText as="label" htmlFor="input-id">Label</ITText>
<ITText muted>Texto secundario (gris)</ITText>
<ITText as="div" className="text-red-500">Con clase explícita</ITText>
```

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `as` | `ElementType` | `"p"` | Tag HTML a renderizar |
| `muted` | `boolean` | `false` | Aplica `var(--color-text-muted)` |
| `className` | `string` | `""` | Clases Tailwind adicionales |
| `style` | `CSSProperties` | — | Estilos inline (sobrescribe default) |
| `htmlFor` | `string` | — | Para usar como `<label>` |
| + cualquier atributo HTML | — | — | Se pasan al tag vía `...rest` |

### Comportamiento de color

- **Default**: `color: var(--color-text-default)` — se adapta automáticamente a light/dark mode
- **`muted`**: `color: var(--color-text-muted)` — para texto secundario
- **Override**: si se pasa `style={{ color: ... }}` o className con color, eso tiene prioridad

---

## Layout Chassis (ITLayout + ITSidebar + ITTopBar)

### ITLayout

El chasis estructural del portal administrativo. Compone ITTopBar + ITSidebar.

```tsx
import { ITLayout } from "@axzydev/axzy_ui_system";

<ITLayout
  topBar={{
    logoText: "Mi App",
    logo: <Logo />,
    userMenu: { userName, userEmail, menuItems, userImage },
    navItems: [...],
    onNavItemClick: (id) => ...,
  }}
  sidebar={{
    navigationItems: [...],
    isCollapsed: true,
    onToggleCollapse: () => ...,
  }}
>
  <div>Contenido principal</div>
</ITLayout>
```

**Comportamiento**:
- Sidebar colapsable en desktop (default: colapsado, se expande al hacer hover)
- Drawer móvil (overlay a pantalla completa con backdrop blur)
- Topbar sticky con menú de usuario y navegación horizontal
- Sidebar absolutamente posicionada (flota sobre el contenido)

### ITSidebar

Sidebar con glassmorphism. Usa `--sidebar-*` CSS variables.

```tsx
<ITSidebar
  navigationItems={[{
    id: "dashboard",
    label: "Dashboard",
    icon: <FaHome />,
    isActive: true,
    action: () => navigate("/dashboard"),
    badge: "3",
    subitems: [{ id: "analytics", label: "Analytics", isActive: false, action: () => {} }],
  }]}
  isCollapsed={true}
  onToggleCollapse={() => {}}
  subitemConnector="dot"  // "dot" | "|"
/>
```

### ITTopBar

Topbar sticky que usa `--topbar-*` CSS variables.

```tsx
<ITTopBar
  logoText="AXZY"
  logo={<Logo />}
  showMobileMenuButton
  onToggleMobileMenu={() => {}}
  navItems={[{ id: "home", label: "Home", icon: <FaHome /> }]}
  onNavItemClick={(id) => {}}
  userMenu={{
    userName: "User",
    userEmail: "user@email.com",
    userImage: "/avatar.jpg",
    menuItems: [{ label: "Logout", onClick: () => {} }],
  }}
/>
```

---

## ITNavbar (Layout Alternativo All-in-One)

Es un layout autónomo que NO usa ITLayout + ITSidebar. Es un template clásico con sidebar oscura y contenido.

```tsx
<ITNavbar
  logoText="AXZY"
  logo={<Logo />}
  navigationItems={[/* mismo formato que ITSidebar */]}
  userMenu={/* mismo formato que ITTopBar */ }
>
  <div>Contenido</div>
</ITNavbar>
```

Usa las mismas `--sidebar-*` y `--topbar-*` CSS variables para consistencia con ITLayout.

---

## Tabla de Variables CSS por Componente

| Componente | Prefijo CSS Var | Uso en inline style |
|---|---|---|
| ITSidebar | `--sidebar-*` | `style={{ backgroundColor: "var(--sidebar-bg)" }}` |
| ITTopBar | `--topbar-*` | `style={{ color: "var(--topbar-text)" }}` |
| ITLayout | `--layout-bg` | `style={{ backgroundColor: "var(--layout-bg)" }}` |
| ITText | `--color-text-default/muted` | Automático (vía ITText) |
| ITCard | `--card-*` | `style={{ backgroundColor: "var(--card-bg)" }}` |
| ITInput | `--input-*` | `color: var(--input-text-color)` |
| ITTable | `--color-table-*` | `style={{ backgroundColor: "var(--color-table-rowBg)" }}` |
| ITButton | usa `theme.button` (objeto estático) | `getStyle()` con colors del theme |
| ITNavbar | `--sidebar-*`, `--topbar-*`, `--layout-bg` | Mezcla de Tailwind CSS + vars |

---

## Patrones de Código para LLMs

### 1. Crear un nuevo componente

```tsx
// components/mi-componente/mi-componente.props.ts
import { ReactNode } from "react";
export interface ITMiComponenteProps {
  children?: ReactNode;
  className?: string;
  label: string;
}

// components/mi-componente/mi-componente.tsx
import { ITMiComponenteProps } from "./mi-componente.props";
import ITText from "@/components/text/text";

export default function ITMiComponente({
  label,
  children,
  className = "",
}: ITMiComponenteProps) {
  return (
    <div className={className}>
      <ITText as="h3" className="font-semibold">{label}</ITText>
      {children && <ITText as="div">{children}</ITText>}
    </div>
  );
}
```

### 2. Usar CSS variables (NO el objeto `theme` estático)

✅ **Correcto**:
```tsx
style={{ backgroundColor: "var(--sidebar-bg, #ffffff)", color: "var(--sidebar-label-color, #333)" }}
```

❌ **Incorrecto** (no se actualiza al cambiar tema):
```tsx
import { theme } from "@/theme/theme";
style={{ backgroundColor: theme.sidebar?.backgroundColor }}
```

### 3. Aplicar dark mode

- Usar clases Tailwind: `text-slate-800` (se overridea automáticamente en dark)
- Usar `dark:` variant: `dark:text-white` (cuando sea necesario)
- Usar CSS variables para colores dinámicos: `var(--color-primary)`
- NO usar valores hardcodeados como `#ffffff` o `#000000`

### 4. Exportar en index.ts

```typescript
// src/index.ts
import ITMiComponente from "./components/mi-componente/mi-componente";
import type { ITMiComponenteProps } from "./components/mi-componente/mi-componente.props";

export { ITMiComponente };
export type { ITMiComponenteProps };
```

### 5. Alto contraste sobre sidebar oscura

Cuando el sidebar usa `--sidebar-bg` con un color oscuro:
- Texto activo: `var(--sidebar-active-color)` (usa `var(--color-primary)`)
- Texto inactivo: `var(--sidebar-label-color)` (hereda de `--color-sidebarText`)
- Iconos inactivos: `var(--sidebar-icon-color)`
- Hover: `var(--sidebar-hover-bg)` / `var(--sidebar-active-color)`

---

## Hooks y Utilities Exportados

### Hooks
| Hook | Props | Returns |
|---|---|---|
| `useClickOutside(ref, cb)` | ref, callback | — |
| `useDebouncedSearch({ initialValue, debounceMs, onSearch })` | configuración | `{ searchTerm, setSearchTerm, handleSearchChange, handleClearSearch }` |
| `useEditableRow({ row, columns, getNestedValue, validationSchema })` | row, columns | `{ editedRow, errors, isHovered, hasErrors, handleEdit, handleSave, ... }` |
| `useTableState({ defaultItemsPerPage, initialSort })` | configuración | `{ currentPage, itemsPerPage, filters, sortConfig, goToPage, ... }` |
| `useITTheme()` | — | `{ palette, setPalette, updateColor, resetTheme, applyPreset, resolvedTheme, darkModeMode, setDarkModeMode }` |
| `useITThemeSafe()` | — | Igual que useITTheme pero no lanza error si no hay provider |

### Utilities
| Función | Descripción |
|---|---|
| `isLightColor(hex)` | Devuelve `true` si el color hex tiene brillo > 140 |
| `resolveCssColor(colorStr, palette?, isDarkMode?)` | Resuelve `var(--color-*)` a hex real |
| `getContrastTextColor(bgColor, palette?, isDarkMode?)` | Devuelve `"text-white"` o `"text-slate-800"` según contraste |
| `formatCurrencyMX(value)` | Formatea número como MXN |
| `getNestedValue(obj, path)` | Resuelve `"a.b.c"` en objetos |
| `createValidationSchema(fields)` | Crea schema Yup desde config |

### Types Compartidos
| Archivo | Contenido |
|---|---|
| `button.types.ts` | `buttonVariants`, `buttonSizes` |
| `colors.types.ts` | `ColorsTypes = keyof typeof semanticColors` |
| `sizes.types.ts` | `SizesTypes = "small" | "medium" | "large"` |
| `table.types.ts` | Tipos de tabla |
| `field.types.ts` | `FieldConfig`, `FieldConfigV2` |

---

## Lista Completa de Componentes

| Componente | Uso |
|---|---|
| `ITAlert` | Alertas con variante (success, danger, warning, info) |
| `ITAvatar` | Avatar con iniciales o imagen |
| `ITBadget` | Badge con variantes de color |
| `ITBreadcrumbs` | Breadcrumbs de navegación |
| `ITButton` | Botón con variants (filled, outlined, text, raised, rounded, icon-only) y sizes |
| `ITCalendar` | Calendario completo con eventos |
| `ITCard` | Tarjeta con título, imagen, contenido y acciones |
| `ITCheckbox` | Checkbox con label |
| `ITConfirmDialog` | Diálogo de confirmación |
| `ITDataTable` | DataTable server-side (con fetch params) |
| `ITDatePicker` | Selector de fecha |
| `ITDialog` | Modal/Dialog |
| `ITDivider` | Divisor horizontal/vertical |
| `ITDrawer` | Panel deslizante lateral |
| `ITDropfile` | Dropzone para archivos |
| `ITEmptyState` | Estado vacío con icono y descripción |
| `ITFlex` | Layout flexbox declarativo |
| `ITFormBuilder` | Generador de formularios desde config JSON |
| `ITFormHeader` | Encabezado de formulario |
| `ITGrid` | Layout grid responsive |
| `ITImage` | Imagen con lazy loading |
| `ITInput` | Input con validación, números, moneda, password, textarea |
| `ITLayout` | Chasis estructural (topbar + sidebar + content) |
| `ITLoader` | Spinner/Loader |
| `ITNavbar` | Layout all-in-one (sidebar + content + user menu) |
| `ITPage` | Página con layout estándar |
| `ITPageHeader` | Encabezado de página |
| `ITPagination` | Paginación numérica |
| `ITPopover` | Popover contextual |
| `ITProgress` | Barra de progreso |
| `ITRadioGroup` | Grupo de radios |
| `ITSearchSelect` | Select con búsqueda |
| `ITSearchTable` | Tabla con búsqueda, filtros, ordenamiento |
| `ITSegmentedControl` | Control segmentado |
| `ITSelect` | Select nativo estilizado |
| `ITSidebar` | Sidebar glassmorphism colapsable |
| `ITSkeleton` | Skeleton loader |
| `ITSlideToggle` | Toggle switch |
| `ITSlider` | Range slider |
| `ITStack` | Stack layout |
| `ITStatCard` | Tarjeta de estadística |
| `ITStepper` | Stepper de pasos |
| `ITTable` | Tabla con filtros, ordenamiento, paginación |
| `ITTabs` | Tabs de navegación |
| `ITText` | Wrapper tipográfico universal |
| `ITTextarea` | Textarea estilizado |
| `ITThemeProvider` | Provider de theming + FAB designer |
| `ITTimePicker` | Selector de hora |
| `ITToast` | Toast notification |
| `ITTooltip` | Tooltip |
| `ITTripleFilter` | Filtro triple (checkbox + radio) |

---

## Reglas Esenciales para LLMs

1. **TODO texto debe usar `<ITText>`** — sin excepción. `<span>, <p>, <h1-6>, <label>` → `<ITText as="...">`
2. **Usar CSS variables, NO el objeto `theme` estático** — `var(--sidebar-bg)` en vez de `theme.sidebar?.backgroundColor`
3. **No hardcodear colores** — ni `#ffffff`, ni `#000`, ni colores fijos. Siempre usar var() o Tailwind classes
4. **Tailwind dark mode funciona automáticamente** para clases como `text-slate-800`, `bg-white`, `border-gray-100` (overrideadas en `.dark`)
5. **ITLayout + ITSidebar + ITTopBar** son el chassis moderno. ITNavbar es un layout alternativo autónomo
6. **El palette del usuario** define sidebarBg, sidebarText, navbarBg, navbarText — el sistema se adapta solo
7. **`color-mix()`** se usa extensivamente para derivar colores hover, borders, iconos desde los colores base
8. **Siempre incluir fallback** en `var()`, ej: `var(--sidebar-bg, #ffffff)`
9. **No mezclar** el objeto `theme` estático con CSS variables. Elegir uno. El estático se depreca.
10. **Event handlers onMouseEnter/onMouseLeave** deben usar CSS variables igual que los estilos base
