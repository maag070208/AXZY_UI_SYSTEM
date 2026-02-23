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
}
