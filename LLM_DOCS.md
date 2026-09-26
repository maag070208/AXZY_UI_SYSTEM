# AXZY UI SYSTEM — Documentación para LLMs

## Identidad del Proyecto

- **Nombre**: `@axzydev/axzy_ui_system`
- **Versión**: 1.3.0
- **Stack**: React 18+ + TypeScript + Tailwind CSS v4 + Vite + tsup
- **Ruta raíz**: `/Users/axzy/DEV/AXZY/AXZY_UI_SYSTEM`
- **Entry point**: `src/index.ts` (escribe todos los exports)
- **Build**: `tsup` produce `dist/index.cjs` + `dist/index.js` + types
- **Tests/Stories**: Storybook (`.stories.tsx`), pero la superficie principal de ejemplos es el sandbox (`pnpm dev` → `src/showcases/*.tsx`)
- **Package manager**: pnpm

---

## Arquitectura

```
src/
├── components/       → componentes organizados por capas atómicas
│   ├── atoms/        → Primitivos: text/, button/, input/, flex/, grid/, stack/, ...
│   ├── molecules/    → Compuestos: card/, date-picker/, select/, table/, stepper/, ...
│   ├── organisms/    → Complejos: data-table/, form-builder/, dialog/, sidebar/, topbar/, ...
│   ├── templates/    → layout/ (chasis estructural), page/
│   ├── isolation/    → Stories de validación de aislamiento CSS
│   └── theme-provider/ → Sistema de theming central (ITThemeProvider)
├── showcases/        → Demos primarios del sandbox (`pnpm dev`); Storybook queda secundario
├── sandbox/          → Router hash, landing, búsqueda y 404 del sandbox (dev-only, NO se publica)
├── theme/            → theme.ts (tokens) + theme-context.ts (contexto de theming)
├── hooks/            → Custom hooks compartidos
├── utils/            → color.utils, styles, table.utils
├── types/            → Tipos compartidos (button, table, input...)
├── index.ts          → Exporta todo
└── App.tsx           → Showroom app (router hash `#ui-system/<grupo>/<item>`; ver AGENTS.md)
```

**Regla atómica**: dependencias unidireccionales (atoms → molecules → organisms → templates).
Un componente NO importa de una capa superior. Se valida con `pnpm check:atomic`.

### Convenciones de Componentes

- **Prefijo**: `IT` (Intelligent Theme) → `ITButton`, `ITCard`, `ITText`, etc.
- **Archivos**: `<nombre>.tsx` + `<nombre>.props.ts` + `<nombre>.stories.tsx`
- **Props**: Siempre en archivo separado, interfaz `IT<Nombre>Props`
- **Default export**: función con nombre `IT<Nombre>`
- **CSS**: Tailwind + CSS variables (`--it-*`). Los estilos propios usan clases con
  prefijo `it-` (BEM) dentro de `@layer components` y `:where()` para especificidad 0.
  NO usar clases genéricas (`.card`, `.toast-enter`) ni módulos CSS/styled-components.
  Validado con `pnpm check:css`.
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

### Sidebar (`--it-sidebar-*`)

```css
--it-sidebar-bg:              var(--color-sidebarBg)
--it-sidebar-border:          color-mix(in srgb, var(--color-sidebarBg) 85%, #000)
--it-sidebar-label-color:     var(--color-sidebarText)
--it-sidebar-icon-color:      color-mix(in srgb, var(--color-sidebarText) 80%, transparent)
--it-sidebar-hover-bg:        color-mix(in srgb, var(--color-sidebarText) 10%, transparent)
--it-sidebar-active-bg:       color-mix(in srgb, var(--color-primary) 12%, transparent)
--it-sidebar-active-color:    var(--color-primary)
--it-sidebar-active-icon:     var(--color-primary)
--it-sidebar-badge-bg:        var(--color-primary)
--it-sidebar-badge-color:     #ffffff
```

### Topbar (`--it-topbar-*`)

```css
--it-topbar-bg:                 var(--color-navbarBg)
--it-topbar-text:               var(--color-navbarText)
--it-topbar-border:             color-mix(in srgb, var(--color-navbarBg) 85%, #000)
--it-topbar-icon:               color-mix(in srgb, var(--color-navbarText) 80%, transparent)
--it-topbar-icon-hover:         var(--color-navbarText)
--it-topbar-user-bg:            var(--it-topbar-bg)
--it-topbar-user-hover:         color-mix(in srgb, var(--color-navbarText) 10%, transparent)
--it-topbar-user-text:          var(--color-navbarText)
--it-topbar-user-subtitle:      color-mix(in srgb, var(--color-navbarText) 65%, transparent)
--it-topbar-user-dropdown-bg:   color-mix(in srgb, var(--color-navbarBg) 100%, #fff)
--it-topbar-user-dropdown-border: color-mix(in srgb, var(--color-navbarBg) 92%, #000)
--it-topbar-user-item-hover:    color-mix(in srgb, var(--color-navbarText) 6%, transparent)
```

### Layout & Text

```css
--it-layout-bg:          var(--color-secondary-50)   /* = #f8fafc en light, #090f1d en dark */
--color-text-default:    var(--color-secondary-900)  /* texto estándar */
--color-text-muted:      var(--color-secondary-600)  /* texto secundario */
--color-heading-default: #1e293b (light) / #f8fafc (dark)
```

### Card

```css
--it-card-bg:            #ffffff (light) / #111827 (dark)
--it-card-border:        #f1f5f9 (light) / #1f2937 (dark)
--it-card-header-bg:     #f8fafc (light) / #1f2937 (dark)
--it-card-header-border: #e2e8f0 (light) / #374151 (dark)
```

### Input

```css
--it-input-bg:              #ffffff (light) / #1f2937 (dark)
--it-input-border:          #cbd5e1 (light) / #374151 (dark)
--it-input-text-color:      #1e293b (light) / #cbd5e1 (dark)
--it-input-placeholder:     #94a3b8 (light) / #6b7280 (dark)
--it-input-focus-ring:      0 0 0 3px var(--color-primary-100)
--it-input-error-ring:      0 0 0 3px var(--color-danger-100)
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
import ITText from "@/components/atoms/text/text";

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
- Sidebar absolutamente posicionada: cuando está colapsado en reposo (88px) flota sobre el contenido al hacer hover
- Si controlas `sidebar.isCollapsed={false}`, el contenido reserva el ancho expandido (280px) y el sidebar deja de taparlo
- El riel colapsado se expande automáticamente al pasar el cursor por encima: no hay botón de colapso

### ITSidebar

Sidebar con glassmorphism. Usa `--it-sidebar-*` CSS variables. El slot `header` (opcional) se renderiza arriba de la navegación y se oculta al colapsar (solo visible al pasar el cursor). El nav usa `aria-label`, los toggles `role="button"` + `aria-expanded`/`aria-controls` + Enter/Space, los submenús `role="group"` y el subítem activo `aria-current="page"`.

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
  subitemConnector="dot"  // "dot" | "|" | "none"
  header={<span>AXZY v1.3</span>}  // opcional; oculto al colapsar
/>
```

### ITTopBar

Topbar sticky que usa `--it-topbar-*` CSS variables. Acepta `centerContent`, un slot que se renderiza en una región central con `flex-1` visible solo desde `lg` (ideal para un buscador global); por debajo de `lg` la fila queda igual: logo + menú de usuario. Los `children` van al área derecha, justo antes del menú de usuario: el componente coloca la campanita de notificaciones y el caller solo aporta el control. Ambos slots comparten un grupo `flex items-center gap-2`, así que `justify-between` no empuja la campanita al centro de la barra.

```tsx
<ITTopBar
  logoText="AXZY"
  logo={<Logo />}
  centerContent={<SearchBox value={term} onChange={setTerm} />}  // slot central; visible solo desde lg
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
>
  <NotificationBell count={3} />
</ITTopBar>
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

Usa las mismas `--it-sidebar-*` y `--it-topbar-*` CSS variables para consistencia con ITLayout.

---

## Tabla de Variables CSS por Componente

| Componente | Prefijo CSS Var | Uso en inline style |
|---|---|---|
| ITSidebar | `--it-sidebar-*` | `style={{ backgroundColor: "var(--it-sidebar-bg)" }}` |
| ITTopBar | `--it-topbar-*` | `style={{ color: "var(--it-topbar-text)" }}` |
| ITLayout | `--it-layout-bg` | `style={{ backgroundColor: "var(--it-layout-bg)" }}` |
| ITText | `--color-text-default/muted` | Automático (vía ITText) |
| ITCard | `--it-card-*` | `style={{ backgroundColor: "var(--it-card-bg)" }}` |
| ITInput | `--it-input-*` | `color: var(--it-input-text-color)` |
| ITTable | `--color-table-*` | `style={{ backgroundColor: "var(--color-table-rowBg)" }}` |
| ITButton | usa `theme.button` (objeto estático) | `getStyle()` con colors del theme |
| ITNavbar | `--it-sidebar-*`, `--it-topbar-*`, `--it-layout-bg` | Mezcla de Tailwind CSS + vars |

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
import ITText from "@/components/atoms/text/text";

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
style={{ backgroundColor: "var(--it-sidebar-bg, #ffffff)", color: "var(--it-sidebar-label-color, #333)" }}
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

Cuando el sidebar usa `--it-sidebar-bg` con un color oscuro:
- Texto activo: `var(--it-sidebar-active-color)` (usa `var(--color-primary)`)
- Texto inactivo: `var(--it-sidebar-label-color)` (hereda de `--color-sidebarText`)
- Iconos inactivos: `var(--it-sidebar-icon-color)`
- Hover: `var(--it-sidebar-hover-bg)` / `var(--it-sidebar-active-color)`

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
| `table.types.ts` | Tipos de tabla (`TableDensity`, `densityStyles`, `sizeLineHeights`, `getRowHeight`, `tableAlignClasses`) |
| `field.types.ts` | `FieldConfig`, `FieldConfigV2` |

---

## Tablas: layout, densidad y virtualización (ITTable / ITDataTable)

Ambas tablas comparten estas props (todas opt-in, backwards-compatible):

| Prop | Type | Default | Uso |
|---|---|---|---|
| `layout` | `"auto" \| "fixed"` | `"auto"` | `"fixed"` respeta `width` por columna y quita `min-w-max` / `min-w-[150px]`. |
| `density` | `"compact" \| "normal" \| "comfortable"` | `"normal"` | Padding + alto de fila. Baseline `size="md"` = 33/45/53. `size` cambia font-size y desplaza el alto por el line box (sm −4 / md 0 / lg +8): matriz sm 29/41/49 · md 33/45/53 · lg 41/53/61. |
| `autoCardBreakpoint` | `number` (px) | `0` | Fallback a cards si el CONTENEDOR es más angosto. `0` desactiva. Al dispararse desactiva `virtualized` en silencio (cards nunca se virtualizan): no combinar ambos. |
| `virtualized` | `boolean` | `false` | Solo vista tabla; cards nunca virtualiza. El toggle interno Table/Cards también la desactiva. |
| `virtualizedMaxHeight` | `number` | `400` | Alto del contenedor con scroll. |
| `rowHeight` | `number` | `getRowHeight(size, density)` | Alto uniforme asumido. Size-aware: baseline `size="md"` = 33/45/53; `size` lo desplaza por el line box (sm 16 / md 20 / lg 28 px, es decir −4 / 0 / +8). Exacto solo para celdas de una línea; una celda de dos líneas mide ~50px real. |
| `overscan` | `number` | `5` | Filas extra arriba/abajo. |
| `stickyHeader` | `boolean` | `false` | Solo efectivo con `virtualized`. |

`Column<T>` extra: `width` (`number`=px | `string`=CSS), `minWidth` (px), `align` (`"left" | "center" | "right"`, default `"left"`), `truncate` (ellipsis + `title` nativo; default `false`). `<colgroup>` solo si alguna columna define `width`.

**Anti scroll horizontal**: `layout="fixed"` + `width` en cada columna + `truncate` en texto largo + `density="compact"`.

**Virtualización**: rinde solo con page size grande (`defaultItemsPerPage` + `itemsPerPageOptions` altos; defaults 10/[5,10,20] no bastan). En ITDataTable (server-side) la ventana se calcula sobre la PÁGINA ACTUAL (`data.length`), NO sobre `total`. Filas de alto uniforme; usar `truncate` + `layout="fixed"`. Scroll se reinicia al cambiar página/items-per-page, NO al cambiar filtros. `aria-rowcount` refleja la página actual, no el dataset. Hooks `useVirtualRows` y `useElementSize` son INTERNOS (no exportados); `getRowHeight` y `sizeLineHeights` también son internos; `TableDensity` SÍ se exporta.

**ITSearchTable NO tiene** `layout` / `density` / `autoCardBreakpoint` / `virtualized` / `width` por columna — no asumir paridad.

Drift conocido (no tocar sin decisión): `ITTableProps.className` no se aplica; `ITDataTableProps.variant="minimal"` no tiene estilos (igual que `default`); el JSDoc de `debounceMs` dice `@default 400` pero el código usa `500`; `theme.table.cell.padding` es un token muerto.

---

## Lista Completa de Componentes

| Componente | Uso |
|---|---|
| `ITAccordion` | Secciones plegables (FAQ, settings), single o multiple |
| `ITAlert` | Alertas con variante (success, danger, warning, info) |
| `ITAvatar` | Avatar con iniciales o imagen |
| `ITBadget` | Badge con variantes de color |
| `ITBreadcrumbs` | Breadcrumbs de navegación |
| `ITButton` | Botón con variants (filled, outlined, text, raised, rounded, icon-only) y sizes |
| `ITCalendar` | Calendario completo con eventos |
| `ITCard` | Tarjeta con título, imagen, contenido y acciones |
| `ITCheckbox` | Checkbox con label |
| `ITChip` | Etiqueta/pill (soft, filled, outlined, removable, selected) |
| `ITChipInput` | Entrada de etiquetas (tags) con delimitadores y validación |
| `ITConfirmDialog` | Diálogo de confirmación |
| `ITDataTable` | DataTable server-side (con fetch params) · onRowClick (fila/card) · layout/density/autoCardBreakpoint (fixed, compacto, fallback a cards) · virtualized (scroll virtual + stickyHeader) |
| `ITDatePicker` | Selector de fecha |
| `ITDialog` | Modal/Dialog |
| `ITDivider` | Divisor horizontal/vertical |
| `ITDrawer` | Panel deslizante lateral |
| `ITDropdownMenu` | Menú de acciones con teclado y ARIA (portal) |
| `ITDropfile` | Dropzone para archivos |
| `ITEmptyState` | Estado vacío con icono y descripción |
| `ITField` | Wrapper de campo (label + error + helpText) |
| `ITFlex` | Layout flexbox declarativo |
| `ITFormBuilder` | Generador de formularios desde config JSON |
| `ITFormHeader` | Encabezado de formulario |
| `ITGrid` | Layout grid responsive |
| `ITImage` | Imagen con lazy loading |
| `ITInput` | Input con validación, números, moneda, password, textarea |
| `ITLayout` | Chasis estructural (topbar + sidebar + content) |
| `ITLoader` | Spinner/Loader |
| `ITMultiSelect` | Select múltiple con búsqueda, chips y teclado |
| `ITMaskedInput` | Input con máscara (tokens 9/A/a/x/* + literales), value raw |
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
| `ITTable` | Tabla con filtros, ordenamiento, paginación · onRowClick (fila/card) · layout/density/autoCardBreakpoint (fixed, compacto, fallback a cards) · virtualized (scroll virtual + stickyHeader) |
| `ITTabs` | Tabs de navegación |
| `ITText` | Wrapper tipográfico universal |
| `ITTextarea` | Textarea estilizado |
| `ITThemeProvider` | Provider de theming + FAB designer |
| `ITTimePicker` | Selector de hora |
| `ITToast` | Toast notification |
| `ITTooltip` | Tooltip |
| `ITTripleFilter` | Filtro triple (checkbox + radio) |
| `ITWysiwyg` | Editor WYSIWYG (negrita, itálica, subrayado, marcador, listas) |

---

## Reglas Esenciales para LLMs

1. **TODO texto debe usar `<ITText>`** — sin excepción. `<span>, <p>, <h1-6>, <label>` → `<ITText as="...">`
2. **Usar CSS variables, NO el objeto `theme` estático** — `var(--it-sidebar-bg)` en vez de `theme.sidebar?.backgroundColor`
3. **No hardcodear colores** — ni `#ffffff`, ni `#000`, ni colores fijos. Siempre usar var() o Tailwind classes
4. **Tailwind dark mode funciona automáticamente** para clases como `text-slate-800`, `bg-white`, `border-gray-100` (overrideadas en `.dark`)
5. **ITLayout + ITSidebar + ITTopBar** son el chassis moderno. ITNavbar es un layout alternativo autónomo
6. **El palette del usuario** define sidebarBg, sidebarText, navbarBg, navbarText — el sistema se adapta solo
7. **`color-mix()`** se usa extensivamente para derivar colores hover, borders, iconos desde los colores base
8. **Siempre incluir fallback** en `var()`, ej: `var(--it-sidebar-bg, #ffffff)`
9. **No mezclar** el objeto `theme` estático con CSS variables. Elegir uno. El estático se depreca.
10. **Event handlers onMouseEnter/onMouseLeave** deben usar CSS variables igual que los estilos base
