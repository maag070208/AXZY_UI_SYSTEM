import { ITThemeConfig } from "../../theme/theme.types";

export interface ITThemeProviderProps {
  theme?: Partial<ITThemeConfig>;
  children: React.ReactNode;
}
