export interface ITThemePalette {
  /** Main brand accent color (hex). Drives primary buttons, active nav items, focus rings, links, and the `--color-primary` CSS variable. @default "#06b6d4" */
  primary: string;
  /** Secondary/neutral accent color (hex). Used for less prominent actions and secondary badges/buttons. @default "#6b7280" */
  secondary: string;
  /** Tertiary accent color (hex), used for a third level of emphasis (e.g. alternate badges, chart accents). @default "#8b5cf6" */
  ternary: string;
  /** Semantic color for destructive/error states (hex): delete buttons, error badges, invalid form fields. @default "#ef4444" */
  danger: string;
  /** Semantic color for success/confirmation states (hex): success badges, completed steps, positive stats. @default "#22c55e" */
  success: string;
  /** Semantic color for informational states (hex): info banners/badges, neutral notices. @default "#3b82f6" */
  info: string;
  /** Semantic color for alert/caution states (hex), distinct from `warning`. Used by components that need a stronger visual cue than warning. @default "#f97316" */
  alert: string;
  /** Semantic color for warning states (hex): warning badges/banners, pending states. @default "#eab308" */
  warning: string;
  /** Colors for the app shell's sidebar and top navbar (ITSidebar, ITNavbar, ITTopbar, ITLayout). */
  layout: {
    /** Background color of the sidebar (hex). @default "#ffffff" */
    sidebarBg: string;
    /** Text/icon color used on the sidebar. @default "#334155" */
    sidebarText: string;
    /** Background color of the top navigation bar (hex). @default "#ffffff" */
    navbarBg: string;
    /** Text/icon color used on the top navigation bar. @default "#1e293b" */
    navbarText: string;
  };
  /** Colors for ITTable/ITDataTable/ITSearchTable header and rows. */
  table: {
    /** Background color of the table header row (hex). @default "#f8fafc" */
    headerBg: string;
    /** Text color of the table header row. @default "#334155" */
    headerText: string;
    /** Background color of table body rows (hex). @default "#ffffff" */
    rowBg: string;
    /** Text color of table body rows. @default "#1e293b" */
    rowText: string;
  };
}

export interface ITThemeProviderProps {
  /** Partial palette overrides merged (deep merge) with the default theme. Supports primary, secondary, ternary, danger, success, info, alert, warning, layout, and table colors. Persisted to `localStorage` under `"it-theme-palette"` once the user edits it via the FAB/drawer. */
  theme?: Partial<ITThemePalette>;
  /** The subtree that receives the theme context and CSS variables. Must wrap your entire app (or the portion that uses AXZY UI System components) once, near the root. */
  children: React.ReactNode;
  /** Whether to render the floating action button (bottom-right) that opens the live theme-designer drawer, letting end users tweak colors and persist their choice. Set to `false` to hide the FAB in production and only theme via the `theme` prop. @default true */
  showFab?: boolean;
  /** Global density/compactness factor. Values below 1 shrink the UI's base sizes, above 1 grow them (e.g. `0.8` = 80%: smaller fonts, paddings, gaps, spacing). Applied by scaling the root font-size so every `rem`-based token in Tailwind components compacts together, keeping the layout fluid (no empty margins, unlike CSS zoom). Clamped to `0.5`–`1.5`. @default 1 */
  density?: number;
  /** Global border radius in pixels applied to the entire rounding scale (`rounded-sm/md/lg/xl/2xl/…`). `radius={2}` ⇒ 2px corners (near-square), `8` ⇒ 8px, `0` ⇒ completely square. Every `rounded-*` utility resolves to a `--radius-*` variable, so this reshapes inputs, buttons, cards, dialogs and tables system-wide with no per-component changes. @default 0 (no override, Tailwind defaults) */
  radius?: number;
  /** Global shadow strength level. `0` ⇒ no shadows, `1` ⇒ subtle, `2` ⇒ default current look, `3` ⇒ pronounced. Shadows are injected as `--shadow-*`/`.shadow-*` overrides so cards, dropdowns and dialogs follow the level. @default 2 (keeps current default when omitted) */
  shadow?: number;
}
