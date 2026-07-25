export interface ITThemePalette {
  primary: string;
  secondary: string;
  ternary: string;
  danger: string;
  success: string;
  info: string;
  alert: string;
  warning: string;
  layout: {
    sidebarBg: string;
    sidebarText: string;
    navbarBg: string;
    navbarText: string;
  };
  table: {
    headerBg: string;
    headerText: string;
    rowBg: string;
    rowText: string;
  };
}

export interface ITThemeProviderProps {
  /** Partial palette overrides merged with the default theme. Supports primary, secondary, tertiary, danger, success, info, alert, warning, layout, and table colors. */
  theme?: Partial<ITThemePalette>;
  /** The subtree that receives the theme context and CSS variables. */
  children: React.ReactNode;
  /** Whether to show the floating action button for opening the theme designer drawer. */
  showFab?: boolean;
}
