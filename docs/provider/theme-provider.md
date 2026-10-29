# ITThemeProvider

|  |  |
| --- | --- |
| Capa | `provider` |
| Carpeta | `src/components/theme-provider/` |
| Archivo | `themeProvider.tsx` |
| Props | `themeProvider.props.ts` |
| Import | `import { ITThemeProvider } from "@axzydev/axzy_ui_system"` |

Provider raíz del tema. Inyecta las variables CSS `--color-*` de toda la librería, aplica
densidad, radio y sombras globales, resuelve el modo claro/oscuro y, opcionalmente, expone un
botón flotante (FAB) con un diseñador de temas en vivo. Debe envolver la aplicación (o la parte
que usa componentes AXZY) una sola vez. Re-exporta los hooks `useITTheme`, `useITThemeSafe` y
`useITFlatAppearance`, `useITAppearance`, y los tipos `ITThemePalette` y `ITThemeAppearance`.

## Import

```tsx
import { ITThemeProvider } from "@axzydev/axzy_ui_system";
```

## Props

### `ITThemeProviderProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `theme` | `Partial<ITThemePalette>` | — | Overrides de paleta fusionados (deep merge) con el tema por defecto. Acepta `primary`, `secondary`, `ternary`, `danger`, `success`, `info`, `alert`, `warning`, `layout` y `table`. |
| `children` | `ReactNode` | — | Subárbol que recibe el contexto y las variables CSS. Obligatoria. |
| `showFab` | `boolean` | `true` | Renderiza el FAB inferior derecho que abre el diseñador de temas y persiste la paleta en `localStorage`. Ponlo en `false` para producción y usa solo la prop `theme`. |
| `density` | `number` | `1` | Factor global de densidad. Escala el `font-size` raíz (así compacta todo lo basado en `rem`). Se limita a `0.5`–`1.5`. |
| `radius` | `number` | — | Radio global en px aplicado a toda la escala (`--radius-xs`…`--radius-3xl`). `2` ⇒ 2 px, `8` ⇒ 8 px, `0` ⇒ esquinas totalmente cuadradas. Si se omite, no hay override (valores de Tailwind). |
| `shadow` | `number` | — | Fuerza global de sombras. `0` ⇒ sin sombras, `1` ⇒ sutiles, `2` ⇒ look actual, `3` ⇒ marcadas. Si se omite, no hay override (se mantiene el look actual, equivalente al nivel 2). |
| `appearance` | `ITThemeAppearance` | `"soft"` | Lenguaje visual del sistema. `"soft"` mantiene el look actual (tarjetas flotantes, sombras teñidas, sidebar/topbar con glass). `"flat"` usa superficies planas (bordes de 1 px, sidebar y topbar planas, `ITPageHeader` compacto sin tile de icono). `"bento"` es el estilo de dashboards pastel: lienzo gris claro (`#F4F4F6`; oscuro `slate-950`), tarjetas blancas sin borde con sombra difusa y radio de 24 px, botones e inputs en píldora, `ITTopBar` sin borde ni blur con navegación en píldoras (activa = píldora tinta), sidebar liso con activo en píldora neutra, `ITPageHeader` con título grande y botón atrás circular, y tarjetas pastel con `ITCard` `tone`. Un `radius`/`shadow` explícito gana sobre los valores bento. Fija `data-it-appearance` en `<html>`. |

### `ITThemePalette`

```typescript
export interface ITThemePalette {
  primary: string;    // @default "#06b6d4"
  secondary: string;  // @default "#6b7280"
  ternary: string;    // @default "#8b5cf6"
  danger: string;     // @default "#ef4444"
  success: string;    // @default "#22c55e"
  info: string;       // @default "#3b82f6"
  alert: string;      // @default "#f97316"
  warning: string;    // @default "#eab308"
  layout: {
    sidebarBg: string;   // @default "#ffffff"
    sidebarText: string; // @default "#334155"
    navbarBg: string;    // @default "#ffffff"
    navbarText: string;  // @default "#1e293b"
  };
  table: {
    headerBg: string;   // @default "#f8fafc"
    headerText: string; // @default "#334155"
    rowBg: string;      // @default "#ffffff"
    rowText: string;    // @default "#1e293b"
    rowHover: string;   // @default "#f1f5f9"
  };
}
```

`ITThemeAppearance` es `"soft" | "flat" | "bento"`.

### Aspecto `bento`

Los tokens bento se inyectan como variables `--it-bento-*` en `<html>` solo cuando `appearance="bento"` (y se adaptan a modo claro/oscuro): `--it-bento-card-shadow`, `--it-bento-card-shadow-hover`, `--it-bento-card-radius`, `--it-bento-card-padding`, `--it-bento-pill-radius`, `--it-bento-field-radius` (textarea, multi-select, chip-input), `--it-bento-control-bg`/`-hover`/`-text`, `--it-bento-ink-bg`/`-text` y `--it-bento-nav-active-bg`/`-text`. También ajusta `--it-layout-bg`, `--it-card-bg`, `--it-input-bg`, `--it-input-border`, `--it-input-radius` y los tokens `--it-sidebar-active-*`. Si pasas `radius` no se definen los de radio y si pasas `shadow` no se definen los de sombra, así que gana la escala global.

```tsx
<ITThemeProvider appearance="bento" showFab={false}>
  <ITCard tone="success" title="Ingresos">+12,4 %</ITCard>
</ITThemeProvider>
```

Hook: `useITAppearance()` devuelve `"soft" | "flat" | "bento"` (`"soft"` fuera del provider); `useITFlatAppearance()` sigue disponible (`true` solo con `"flat"`).

## Ejemplo

```tsx
import { ITThemeProvider, useITTheme } from "@axzydev/axzy_ui_system";

function ToggleTema() {
  const { resolvedTheme, darkModeMode, setDarkModeMode } = useITTheme();

  return (
    <button onClick={() => setDarkModeMode(resolvedTheme === "dark" ? "light" : "dark")}>
      {`Modo actual: ${darkModeMode}`}
    </button>
  );
}

export function App() {
  return (
    <ITThemeProvider
      theme={{ primary: "#3b82f6", layout: { sidebarBg: "#0f172a" } }}
      showFab
      density={1}
      radius={8}
      shadow={2}
      appearance="soft"
    >
      <ToggleTema />
    </ITThemeProvider>
  );
}
```

Solo theming programático, sin FAB (no lee ni escribe la paleta en `localStorage`):

```tsx
import { ITThemeProvider } from "@axzydev/axzy_ui_system";

<ITThemeProvider showFab={false} appearance="flat" radius={0} shadow={0}>
  <Dashboard />
</ITThemeProvider>;
```

## Notas

- **Persistencia.** Con `showFab`, la paleta se guarda en `localStorage` bajo `"it-theme-palette"`; los presets personalizados en `"it-theme-custom-presets"` y el modo en `"it-theme-dark-mode"`.
- **`showFab={false}`.** No lee ni escribe `"it-theme-palette"`; sincroniza el estado con la prop `theme` mediante un efecto (los cambios de `theme` reaplican la paleta).
- **Variables inyectadas.** Al cambiar `palette`/`resolvedTheme`, escribe un `<style id="it-theme-dynamic-overrides">` en `<head>` con `--color-primary/secondary/ternary/danger/success/info/alert/warning` y sus escalas `50–950` generadas con `color-mix`, más los tokens `--it-sidebar-*`, `--it-topbar-*`, `--color-table-*` y `--it-calendar-*`.
- **Modo oscuro.** `darkModeMode` (`"light" | "dark" | "system"`, persistido en `"it-theme-dark-mode"`) fija `class="dark"` y `data-theme` en `<html>`. En modo `"system"` escucha `prefers-color-scheme`. En oscuro, las escalas se re-mezclan con fondos oscuros; en claro, colores oscuros heredados de un preset se corrigen.
- **Densidad.** Escala el `font-size` del `<html>` a `scale * 100 %` y publica `--it-density`. El valor se limita a `0.5`–`1.5` (no numérico ⇒ `1`).
- **Radio.** Con un número, aplica el mismo px a `--radius-xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`. Omitirlo no toca la escala. Ojo: `radius={0}` no es "sin override", deja todas las esquinas cuadradas.
- **Sombras.** Inyecta una etiqueta `<style id="it-theme-surface-overrides">` con `--it-shadow-*` y reglas `.shadow-*`/`:hover`. Los niveles se agrupan a enteros (`<=0` ⇒ 0, `>=3` ⇒ 3).
- **Modo oscuro y localStorage.** El modo se persiste bajo `"it-theme-dark-mode"`; los presets personalizados bajo `"it-theme-custom-presets"`; la paleta editada por el usuario bajo `"it-theme-palette"` (solo con `showFab`).
- **FAB/diseñador.** El FAB usa `aria-label="Configurar Paleta de Colores"` y abre un `ITDialog` (`useFormHeader`) con apariencia claro/oscuro/sistema, presets, "Mis Temas" (presets guardados) y editor de colores por pestañas. Incluye guardar/restaurar y un aviso de autoguardado.
- **Presets incluidos.** `PRESETS` (`themePresets.ts`): "Midnight Indigo 🌌", "Coral Reef 🪸", "Oceanic Teal 🌊", "Golden Hour ☀️" y "Deep Forest 🌲".

## Textos (i18n)

Textos resueltos con `useITTranslation()` (`const { t } = useITTranslation()`). Todas las keys
existen en `src/i18n/locales/es.ts` y `en.ts` (namespace `themeProvider.*`). La columna «Dónde»
apunta a `src/components/theme-provider/themeProvider.tsx`.

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `themeProvider.fab.ariaLabel` | `Configurar Paleta de Colores` | `Configure Color Palette` | `:1644` (aria-label del FAB) |
| `themeProvider.designer.title` | `Diseñador de Temas` | `Theme Designer` | `:1654` (title del modal) |
| `themeProvider.designer.appearance` | `Apariencia` | `Appearance` | `:1662` |
| `themeProvider.designer.presets` | `Presets` | `Presets` | `:1679` |
| `themeProvider.designer.myThemes` | `Mis Temas` | `My Themes` | `:1692` |
| `themeProvider.designer.presetNamePlaceholder` | `Nombre del tema...` | `Theme name...` | `:1707` (placeholder) |
| `themeProvider.designer.save` | `Guardar` | `Save` | `:1722` |
| `themeProvider.designer.cancelSave` | `X` | `X` | `:1730` |
| `themeProvider.designer.saveCurrent` | `Guardar actual` | `Save current` | `:1746` |
| `themeProvider.designer.reset` | `Restaurar default` | `Reset to default` | `:1756` |
| `themeProvider.tabs.brand` | `Marca` | `Brand` | `:1771` |
| `themeProvider.tabs.layout` | `Nav & Sidebar` | `Nav & Sidebar` | `:1791` |
| `themeProvider.tabs.tables` | `Tablas` | `Tables` | `:1807` |
| `themeProvider.designer.autosave` | `Los cambios se guardan automáticamente` | `Changes are saved automatically` | `:1827` |
| `themeProvider.designer.close` | `Cerrar` | `Close` | `:1830` |
| `themeProvider.designer.deletePreset` | `Eliminar` | `Delete` | `:1601` (title del botón de borrar preset) |
| `themeProvider.presets.midnightIndigo` | `Midnight Indigo 🌌` | `Midnight Indigo 🌌` | `:72` vía `PRESET_I18N_KEY` (`:1607`) |
| `themeProvider.presets.coralReef` | `Coral Reef 🪸` | `Coral Reef 🪸` | `:73` vía `PRESET_I18N_KEY` (`:1607`) |
| `themeProvider.presets.oceanicTeal` | `Oceanic Teal 🌊` | `Oceanic Teal 🌊` | `:74` vía `PRESET_I18N_KEY` (`:1607`) |
| `themeProvider.presets.goldenHour` | `Golden Hour ☀️` | `Golden Hour ☀️` | `:75` vía `PRESET_I18N_KEY` (`:1607`) |
| `themeProvider.presets.deepForest` | `Deep Forest 🌲` | `Deep Forest 🌲` | `:76` vía `PRESET_I18N_KEY` (`:1607`) |

Notas:

- **Keys sin uso actual.** `themeProvider.mode.light` / `themeProvider.mode.dark` /
  `themeProvider.mode.system` están en el catálogo (`es.ts:162-164` del bloque) pero **no** se
  referencian en `themeProvider.tsx`: el selector de modo usa emojis (`"☀️"`, `"🌙"`, `"💻"`,
  `:1666-1668`), no estas keys.
- El nombre de un preset se resuelve con `PRESET_I18N_KEY` (nombre literal → key) y se traduce al
  pintarlo (`themeProvider.tsx:1607`); `themePresets.ts` conserva los nombres literales como
  identificadores internos.
- Los `label` de la lista de colores se derivan de las claves de la paleta (p. ej. `headerBg` →
  `"Header Bg"`) y no son textos literales ni keys de i18n.
