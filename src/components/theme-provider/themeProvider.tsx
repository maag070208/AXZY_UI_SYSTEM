import React, { useMemo } from 'react';
import { ITThemeProviderProps } from './themeProvider.props';
import { theme as defaultThemeConfig } from '../../theme/theme';

export default function ITThemeProvider({ theme, children }: ITThemeProviderProps) {
  // Merge the provided theme over the default theme to ensure we always have values
  const activeThemeContext = useMemo(() => {
    return {
      colors: {
        ...defaultThemeConfig.colors,
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
