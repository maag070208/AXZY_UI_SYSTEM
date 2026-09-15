export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
};

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

export type SemanticThemeColors = {
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  danger?: ColorScale;
  warning?: ColorScale;
  info?: ColorScale;
  purple?: ColorScale;
};

export interface ITThemeConfig {
  colors: SemanticThemeColors;
  // Future extension points
  layout?: {
    backgroundColor?: string;
    contentPadding?: string;
  };
  topbar?: {
    backgroundColor?: string;
    borderColor?: string;
    iconColor?: string;
    iconHoverColor?: string;
    shadow?: string;
    textColor?: string;
    textHoverColor?: string;
    userMenu?: {
      backgroundColor?: string;
      hoverBackground?: string;
      textColor?: string;
      subtitleColor?: string;
      dropdown?: {
        backgroundColor?: string;
        borderColor?: string;
        itemHoverBackground?: string;
      };
    };
  };
  sidebar?: {
    backgroundColor?: string;
    borderColor?: string;
    label?: {
      color?: string;
      size?: string;
      weight?: string;
    };
    icon?: {
      color?: string;
      size?: string;
    };
    hover?: {
      backgroundColor?: string;
    };
    active?: {
      backgroundColor?: string;
      color?: string;
      iconColor?: string;
    };
    badge?: {
      backgroundColor?: string;
      color?: string;
    };
  };
  calendar?: {
    backgroundColor?: string;
    borderColor?: string;
    header?: {
       textColor?: string;
       hoverBackground?: string;
    };
    days?: {
      textColor?: string;
      weekendColor?: string;
      outsideMonthColor?: string;
    };
    selection?: {
      selectedColor?: string;
      selectedBackground?: string;
      rangeBackground?: string;
      todayBackground?: string;
      todayColor?: string;
    };
  };
}
