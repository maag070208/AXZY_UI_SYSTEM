/**
 * 1. Paleta base (Raw HEX values - Default Theme Fallback)
 */
export const palette = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  success: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
    400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
    800: '#065f46', 900: '#064e3b', 950: '#022c22',
  },
  danger: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
    400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
    800: '#9f1239', 900: '#881337', 950: '#4c0519',
  },
  warning: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f', 950: '#451a03',
  },
  purple: {
    50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
    400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
    800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065',
  },
  info: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49',
  },
};

/**
 * 2. Mapeo Dinámico a Variables CSS
 * Esta es la magia estructural: en lugar de acoplar la UI a un Hex estático, 
 * todo apunta a var(--color-[name]-[shade])
 */
const createColorVar = (name: string) => ({
  50: `var(--color-${name}-50)`,
  100: `var(--color-${name}-100)`,
  200: `var(--color-${name}-200)`,
  300: `var(--color-${name}-300)`,
  400: `var(--color-${name}-400)`,
  500: `var(--color-${name}-500)`,
  600: `var(--color-${name}-600)`,
  700: `var(--color-${name}-700)`,
  800: `var(--color-${name}-800)`,
  900: `var(--color-${name}-900)`,
  950: `var(--color-${name}-950)`,
});

export const semanticColors = {
  primary: createColorVar('primary'),
  secondary: createColorVar('secondary'),
  success: createColorVar('success'),
  danger: createColorVar('danger'),
  warning: createColorVar('warning'),
  info: createColorVar('info'), 
  purple: createColorVar('purple'),
  error: createColorVar('danger'), // Alias
  gray: createColorVar('secondary'), // Secondary as Gray
};

/**
 * 3. Tokens de componentes (heredan de las Vbles CSS semanticColors)
 */
export const components = {
  layout: {
    backgroundColor: `var(--layout-bg, ${semanticColors.gray[50]})`,
    contentPadding: 'var(--layout-padding, 1.5rem)',
  },
  topbar: {
    backgroundColor: 'var(--topbar-bg, rgba(255, 255, 255, 0.90))', 
    borderColor: `var(--topbar-border, ${semanticColors.gray[200]})`,
    iconColor: `var(--topbar-icon, ${semanticColors.gray[500]})`,
    iconHoverColor: `var(--topbar-icon-hover, ${semanticColors.gray[700]})`,
    shadow: 'var(--topbar-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.025))',
    textColor: `var(--topbar-text, ${semanticColors.gray[700]})`,
    textHoverColor: `var(--topbar-text-hover, ${semanticColors.gray[900]})`,
    userMenu: {
      backgroundColor: `var(--topbar-user-bg, ${semanticColors.gray[50]})`,
      hoverBackground: `var(--topbar-user-hover, ${semanticColors.gray[100]})`,
      textColor: `var(--topbar-user-text, ${semanticColors.gray[900]})`,
      subtitleColor: `var(--topbar-user-subtitle, ${semanticColors.gray[500]})`,
      dropdown: {
        backgroundColor: 'var(--topbar-user-dropdown-bg, #ffffff)',
        borderColor: `var(--topbar-user-dropdown-border, ${semanticColors.gray[200]})`,
        itemHoverBackground: `var(--topbar-user-item-hover, ${semanticColors.gray[50]})`,
      }
    }
  },
  sidebar: {
    backgroundColor: 'var(--sidebar-bg, rgba(255, 255, 255, 0.90))',
    borderColor: `var(--sidebar-border, ${semanticColors.gray[200]})`,
    label: {
      color: `var(--sidebar-label-color, ${semanticColors.gray[700]})`,
      size: 'var(--sidebar-label-size, 0.9rem)',
      weight: 'var(--sidebar-label-weight, 500)',
    },
    icon: {
      color: `var(--sidebar-icon-color, ${semanticColors.gray[500]})`,
      size: 'var(--sidebar-icon-size, 1.25rem)',
    },
    hover: {
      backgroundColor: `var(--sidebar-hover-bg, ${semanticColors.gray[100]})`,
    },
    active: {
      backgroundColor: `var(--sidebar-active-bg, ${semanticColors.gray[50]})`,
      color: `var(--sidebar-active-color, ${semanticColors.gray[900]})`,
      iconColor: `var(--sidebar-active-icon, ${semanticColors.primary[500]})`, 
    },
    badge: {
      backgroundColor: `var(--sidebar-badge-bg, ${semanticColors.primary[500]})`, 
      color: 'var(--sidebar-badge-color, #ffffff)',
    },
  },

  button: {
    primary: {
      backgroundColor: semanticColors.primary[500],
      color: '#ffffff',
      hover: semanticColors.primary[600],
      active: semanticColors.primary[700],
      focus: `0 0 0 2px ${semanticColors.primary[200]}`,
      borderRadius: '0.375rem', 
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 150ms ease-in-out',
    },

    secondary: {
      backgroundColor: semanticColors.secondary[500],
      color: '#ffffff',
      hover: semanticColors.secondary[600],
      focus: `0 0 0 2px ${semanticColors.secondary[200]}`,
      borderRadius: '0.375rem',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
    },

    success: {
      backgroundColor: semanticColors.success[500],
      color: '#ffffff',
      hover: semanticColors.success[600],
      focus: `0 0 0 2px ${semanticColors.success[200]}`,
      borderRadius: '0.375rem',
    },

    danger: {
      backgroundColor: semanticColors.danger[500],
      color: '#ffffff',
      hover: semanticColors.danger[600],
      focus: `0 0 0 2px ${semanticColors.danger[200]}`,
      borderRadius: '0.375rem',
    },

    error: {
      backgroundColor: semanticColors.danger[500],
      color: '#ffffff',
      hover: semanticColors.danger[600],
      borderRadius: '0.375rem',
    },

    warning: {
      backgroundColor: semanticColors.warning[500],
      color: '#ffffff',
      hover: semanticColors.warning[600],
      focus: `0 0 0 2px ${semanticColors.warning[200]}`,
      borderRadius: '0.375rem',
    },

    info: {
      backgroundColor: semanticColors.info[500],
      color: '#ffffff',
      hover: semanticColors.info[600],
      focus: `0 0 0 2px ${semanticColors.info[200]}`,
      borderRadius: '0.375rem',
    },

    purple: {
      backgroundColor: semanticColors.purple[500],
      color: '#ffffff',
      hover: semanticColors.purple[600],
      focus: `0 0 0 2px ${semanticColors.purple[200]}`,
      borderRadius: '0.375rem',
    },
    
    outline: {
      backgroundColor: 'transparent',
      color: semanticColors.primary[600],
      borderColor: semanticColors.primary[600],
      borderWidth: '2px', 
      hover: semanticColors.primary[50],
      borderRadius: '0.375rem',
    },
  },
  
  badge: {
    primary: {
      backgroundColor: semanticColors.primary[100],
      color: semanticColors.primary[800],
      borderColor: semanticColors.primary[200],
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '500',
    },
    secondary: {
      backgroundColor: semanticColors.secondary[100],
      color: semanticColors.secondary[800],
      borderColor: semanticColors.secondary[200],
      borderRadius: '9999px',
    },
    success: {
      backgroundColor: semanticColors.success[100],
      color: semanticColors.success[800],
      borderColor: semanticColors.success[200],
      borderRadius: '9999px',
    },
    danger: {
      backgroundColor: semanticColors.danger[100],
      color: semanticColors.danger[800],
      borderColor: semanticColors.danger[200],
      borderRadius: '9999px',
    },
    warning: {
      backgroundColor: semanticColors.warning[100],
      color: semanticColors.warning[800],
      borderColor: semanticColors.warning[200],
      borderRadius: '9999px',
    },
    info: {
      backgroundColor: semanticColors.info[100],
      color: semanticColors.info[800],
      borderColor: semanticColors.info[200],
      borderRadius: '9999px',
    },
    purple: {
      backgroundColor: semanticColors.purple[100],
      color: semanticColors.purple[800],
      borderColor: semanticColors.purple[200],
      borderRadius: '9999px',
    },
    error: {
      backgroundColor: semanticColors.danger[100],
      color: semanticColors.danger[800],
      borderColor: semanticColors.danger[200],
      borderRadius: '9999px',
    },
  },

  card: {
    backgroundColor: 'var(--card-bg, #ffffff)',
    borderRadius: '1rem',
    borderColor: `var(--card-border, ${semanticColors.gray[200]})`,
    borderWidth: '1px',
    shadow: 'var(--card-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))',
    hover: {
      shadow: 'var(--card-shadow-hover, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))',
    },
    header: {
      backgroundColor: `var(--card-header-bg, ${semanticColors.gray[50]})`,
      borderBottom: `1px solid var(--card-header-border, var(--color-secondary-200))`,
      padding: '1rem 1.5rem',
      borderTopLeftRadius: '1rem',
      borderTopRightRadius: '1rem',
    },
    body: {
      padding: '1.5rem',
    },
  },

  input: {
    backgroundColor: 'var(--input-bg, #ffffff)',
    borderColor: `var(--input-border, ${semanticColors.gray[300]})`,
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    focus: {
      borderColor: `var(--input-focus-border, ${semanticColors.primary[500]})`,
      ring: `var(--input-focus-ring, 0 0 0 3px ${semanticColors.primary[100]})`,
    },
    placeholder: `var(--input-placeholder, ${semanticColors.gray[400]})`,
    disabled: {
      backgroundColor: `var(--input-disabled-bg, ${semanticColors.gray[100]})`,
      borderColor: `var(--input-disabled-border, ${semanticColors.gray[200]})`,
    },
    error: {
      borderColor: `var(--input-error-border, ${semanticColors.danger[500]})`,
      ring: `var(--input-error-ring, 0 0 0 3px ${semanticColors.danger[100]})`,
    },
  },

  table: {
    header: {
      backgroundColor: semanticColors.gray[50],
      color: semanticColors.gray[700],
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    row: {
      hover: semanticColors.primary[50],
      borderBottom: `1px solid var(--color-secondary-200)`,
    },
    cell: {
      padding: '1rem 1.5rem',
    },
  },

  alert: {
    info: {
      backgroundColor: semanticColors.info[50],
      borderColor: semanticColors.info[200],
      color: semanticColors.info[800],
      icon: semanticColors.info[500],
    },
    success: {
      backgroundColor: semanticColors.success[50],
      borderColor: semanticColors.success[200],
      color: semanticColors.success[800],
      icon: semanticColors.success[500],
    },
    warning: {
      backgroundColor: semanticColors.warning[50],
      borderColor: semanticColors.warning[200],
      color: semanticColors.warning[800],
      icon: semanticColors.warning[500],
    },
    error: {
      backgroundColor: semanticColors.danger[50],
      borderColor: semanticColors.danger[200],
      color: semanticColors.danger[800],
      icon: semanticColors.danger[500],
    },
  },

  modal: {
    overlay: {
      backgroundColor: 'var(--modal-overlay, rgba(15, 23, 42, 0.75))',
    },
    content: {
      backgroundColor: 'var(--modal-bg, #ffffff)',
      borderRadius: '1rem',
      shadow: 'var(--modal-shadow, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1))',
    },
    header: {
      padding: '1.5rem 1.5rem 0.5rem 1.5rem',
      borderBottom: `1px solid var(--modal-header-border, var(--color-secondary-200))`,
    },
    body: {
      padding: '1.5rem',
    },
    footer: {
      padding: '1rem 1.5rem',
      borderTop: `1px solid var(--modal-footer-border, var(--color-secondary-200))`,
      backgroundColor: `var(--modal-footer-bg, ${semanticColors.gray[50]})`,
    },
  },

  calendar: {
    backgroundColor: 'var(--calendar-bg, #ffffff)',
    borderColor: `var(--calendar-border, ${semanticColors.gray[200]})`,
    header: {
      textColor: `var(--calendar-header-text, ${semanticColors.gray[800]})`,
      hoverBackground: `var(--calendar-header-hover, ${semanticColors.gray[100]})`,
    },
    days: {
      textColor: `var(--calendar-days-text, ${semanticColors.gray[700]})`,
      weekendColor: `var(--calendar-days-weekend, ${semanticColors.gray[500]})`,
      outsideMonthColor: `var(--calendar-days-outside, ${semanticColors.gray[300]})`,
    },
    selection: {
      selectedColor: 'var(--calendar-selected-text, #ffffff)',
      selectedBackground: `var(--calendar-selected-bg, ${semanticColors.primary[600]})`,
      rangeBackground: `var(--calendar-range-bg, ${semanticColors.primary[50]})`,
      todayBackground: `var(--calendar-today-bg, ${semanticColors.primary[50]})`,
      todayColor: `var(--calendar-today-text, ${semanticColors.primary[600]})`,
    },
  },
};

/**
 * 4. Configuración global de tipografía y espaciado
 */
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

/**
 * 5. Theme final exportado
 */
export const theme = {
  palette, 
  colors: semanticColors,
  typography,
  ...components,
};