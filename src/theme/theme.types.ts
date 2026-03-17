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
