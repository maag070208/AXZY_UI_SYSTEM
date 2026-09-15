import { createContext, useContext } from "react";
import type { ITThemePalette } from "./theme.types";

/**
 * Contexto de theming compartido por ITThemeProvider y componentes que lo
 * consumen (p.ej. ITFormHeader). Vive en @/theme para que ninguna capa
 * atómica dependa de otra a través del provider.
 */
export interface ITThemeContextType {
  palette: ITThemePalette;
  colors: ITThemePalette;
  setPalette: (newPalette: ITThemePalette) => void;
  updateColor: (key: string, value: string) => void;
  resetTheme: () => void;
  applyPreset: (colors: ITThemePalette) => void;
  resolvedTheme: "light" | "dark";
  darkModeMode: "light" | "dark" | "system";
  setDarkModeMode: (mode: "light" | "dark" | "system") => void;
}

export const ITThemeContext = createContext<ITThemeContextType | undefined>(undefined);

export const useITTheme = () => {
  const context = useContext(ITThemeContext);
  if (!context) {
    throw new Error("useITTheme must be used within an ITThemeProvider");
  }
  return context;
};

/**
 * Versión segura de useITTheme que retorna undefined
 * si se usa fuera de ITThemeProvider (no lanza error).
 */
export const useITThemeSafe = (): ITThemeContextType | undefined => {
  return useContext(ITThemeContext);
};