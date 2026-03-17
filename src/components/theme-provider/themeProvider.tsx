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

    if (theme?.layout) {
      if (theme.layout.backgroundColor) variablesString += `--layout-bg: ${theme.layout.backgroundColor};\n`;
      if (theme.layout.contentPadding) variablesString += `--layout-padding: ${theme.layout.contentPadding};\n`;
    }

    if (theme?.topbar) {
      if (theme.topbar.backgroundColor) variablesString += `--topbar-bg: ${theme.topbar.backgroundColor};\n`;
      if (theme.topbar.borderColor) variablesString += `--topbar-border: ${theme.topbar.borderColor};\n`;
      if (theme.topbar.iconColor) variablesString += `--topbar-icon: ${theme.topbar.iconColor};\n`;
      if (theme.topbar.iconHoverColor) variablesString += `--topbar-icon-hover: ${theme.topbar.iconHoverColor};\n`;
      if (theme.topbar.shadow) variablesString += `--topbar-shadow: ${theme.topbar.shadow};\n`;
      if (theme.topbar.textColor) variablesString += `--topbar-text: ${theme.topbar.textColor};\n`;
      if (theme.topbar.textHoverColor) variablesString += `--topbar-text-hover: ${theme.topbar.textHoverColor};\n`;
      if (theme.topbar.userMenu) {
        if (theme.topbar.userMenu.backgroundColor) variablesString += `--topbar-user-bg: ${theme.topbar.userMenu.backgroundColor};\n`;
        if (theme.topbar.userMenu.hoverBackground) variablesString += `--topbar-user-hover: ${theme.topbar.userMenu.hoverBackground};\n`;
        if (theme.topbar.userMenu.textColor) variablesString += `--topbar-user-text: ${theme.topbar.userMenu.textColor};\n`;
        if (theme.topbar.userMenu.subtitleColor) variablesString += `--topbar-user-subtitle: ${theme.topbar.userMenu.subtitleColor};\n`;
        if (theme.topbar.userMenu.dropdown) {
          if (theme.topbar.userMenu.dropdown.backgroundColor) variablesString += `--topbar-user-dropdown-bg: ${theme.topbar.userMenu.dropdown.backgroundColor};\n`;
          if (theme.topbar.userMenu.dropdown.borderColor) variablesString += `--topbar-user-dropdown-border: ${theme.topbar.userMenu.dropdown.borderColor};\n`;
          if (theme.topbar.userMenu.dropdown.itemHoverBackground) variablesString += `--topbar-user-item-hover: ${theme.topbar.userMenu.dropdown.itemHoverBackground};\n`;
        }
      }
    }

    if (theme?.sidebar) {
      if (theme.sidebar.backgroundColor) variablesString += `--sidebar-bg: ${theme.sidebar.backgroundColor};\n`;
      if (theme.sidebar.borderColor) variablesString += `--sidebar-border: ${theme.sidebar.borderColor};\n`;
      if (theme.sidebar.label) {
        if (theme.sidebar.label.color) variablesString += `--sidebar-label-color: ${theme.sidebar.label.color};\n`;
        if (theme.sidebar.label.size) variablesString += `--sidebar-label-size: ${theme.sidebar.label.size};\n`;
        if (theme.sidebar.label.weight) variablesString += `--sidebar-label-weight: ${theme.sidebar.label.weight};\n`;
      }
      if (theme.sidebar.icon) {
        if (theme.sidebar.icon.color) variablesString += `--sidebar-icon-color: ${theme.sidebar.icon.color};\n`;
        if (theme.sidebar.icon.size) variablesString += `--sidebar-icon-size: ${theme.sidebar.icon.size};\n`;
      }
      if (theme.sidebar.hover?.backgroundColor) variablesString += `--sidebar-hover-bg: ${theme.sidebar.hover.backgroundColor};\n`;
      if (theme.sidebar.active) {
        if (theme.sidebar.active.backgroundColor) variablesString += `--sidebar-active-bg: ${theme.sidebar.active.backgroundColor};\n`;
        if (theme.sidebar.active.color) variablesString += `--sidebar-active-color: ${theme.sidebar.active.color};\n`;
        if (theme.sidebar.active.iconColor) variablesString += `--sidebar-active-icon: ${theme.sidebar.active.iconColor};\n`;
      }
      if (theme.sidebar.badge) {
        if (theme.sidebar.badge.backgroundColor) variablesString += `--sidebar-badge-bg: ${theme.sidebar.badge.backgroundColor};\n`;
        if (theme.sidebar.badge.color) variablesString += `--sidebar-badge-color: ${theme.sidebar.badge.color};\n`;
      }
    }

    if (theme?.calendar) {
      if (theme.calendar.backgroundColor) variablesString += `--calendar-bg: ${theme.calendar.backgroundColor};\n`;
      if (theme.calendar.borderColor) variablesString += `--calendar-border: ${theme.calendar.borderColor};\n`;
      if (theme.calendar.header) {
        if (theme.calendar.header.textColor) variablesString += `--calendar-header-text: ${theme.calendar.header.textColor};\n`;
        if (theme.calendar.header.hoverBackground) variablesString += `--calendar-header-hover: ${theme.calendar.header.hoverBackground};\n`;
      }
      if (theme.calendar.days) {
        if (theme.calendar.days.textColor) variablesString += `--calendar-days-text: ${theme.calendar.days.textColor};\n`;
        if (theme.calendar.days.weekendColor) variablesString += `--calendar-days-weekend: ${theme.calendar.days.weekendColor};\n`;
        if (theme.calendar.days.outsideMonthColor) variablesString += `--calendar-days-outside: ${theme.calendar.days.outsideMonthColor};\n`;
      }
      if (theme.calendar.selection) {
        if (theme.calendar.selection.selectedColor) variablesString += `--calendar-selected-text: ${theme.calendar.selection.selectedColor};\n`;
        if (theme.calendar.selection.selectedBackground) variablesString += `--calendar-selected-bg: ${theme.calendar.selection.selectedBackground};\n`;
        if (theme.calendar.selection.rangeBackground) variablesString += `--calendar-range-bg: ${theme.calendar.selection.rangeBackground};\n`;
        if (theme.calendar.selection.todayBackground) variablesString += `--calendar-today-bg: ${theme.calendar.selection.todayBackground};\n`;
        if (theme.calendar.selection.todayColor) variablesString += `--calendar-today-text: ${theme.calendar.selection.todayColor};\n`;
      }
    }

    return `:root {\n${variablesString}}`;
  }, [activeThemeContext]);

  return (
    <>
      <style suppressHydrationWarning>{cssVariables}</style>
      {children}
    </>
  );
}
