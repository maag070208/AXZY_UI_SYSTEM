import React, { useMemo } from 'react';
import { ITThemeProviderProps } from './themeProvider.props';
import { palette, theme as defaultThemeConfig } from '../../theme/theme';

export default function ITThemeProvider({ theme, children }: ITThemeProviderProps) {
  // Merge the provided theme over the default HEX palette to ensure we always have values
  const activeThemeContext = useMemo(() => {
    // Reconstruct the default semantic mapping using RAW HEX codes
    const baseColors = {
      primary: palette.blue,
      secondary: palette.gray,
      success: palette.success,
      danger: palette.danger,
      warning: palette.warning,
      info: palette.cyan,
      purple: palette.purple,
    };

    return {
      colors: {
        ...baseColors,
        ...theme?.colors,
      },
      layout: {
        ...defaultThemeConfig.layout,
        ...theme?.layout,
      }
    };
  }, [theme]);

  // Transform the theme object into CSS Custom Properties (Variables)
  const cssVariables = useMemo(() => {
    let variablesString = '';
    
    // Process colors
    Object.entries(activeThemeContext.colors).forEach(([colorName, scale]) => {
      Object.entries(scale).forEach(([shade, hexValue]) => {
        variablesString += `--color-${colorName}-${shade}: ${hexValue};\n`;
      });
    });

    // We can also add layout variables in the future if needed, e.g. 
    // variablesString += `--layout-bg: ${activeThemeContext.layout.backgroundColor};\n`;

    return `:root {\n${variablesString}}`;
  }, [activeThemeContext]);

  return (
    <>
      <style suppressHydrationWarning>{cssVariables}</style>
      {children}
    </>
  );
}
