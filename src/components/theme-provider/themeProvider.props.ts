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
  theme?: Partial<ITThemePalette>;
  children: React.ReactNode;
  showFab?: boolean;
}
