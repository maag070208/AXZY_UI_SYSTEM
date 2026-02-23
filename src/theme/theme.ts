import colors from "tailwindcss/colors";

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
  success: colors.emerald,
  danger: colors.rose,
  warning: colors.amber,
  purple: colors.violet,
  info: colors.sky,
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
    backgroundColor: semanticColors.gray[50],
    contentPadding: '1.5rem',
  },
  topbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)', 
    borderColor: semanticColors.gray[200],
    iconColor: semanticColors.gray[500],
    iconHoverColor: semanticColors.gray[700],
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.025)',
    textColor: semanticColors.gray[700],
    textHoverColor: semanticColors.gray[900],
    userMenu: {
      backgroundColor: semanticColors.gray[50],
      hoverBackground: semanticColors.gray[100],
      textColor: semanticColors.gray[900],
      subtitleColor: semanticColors.gray[500],
      dropdown: {
        backgroundColor: '#ffffff',
        borderColor: semanticColors.gray[200],
        itemHoverBackground: semanticColors.gray[50],
      }
    }
  },
  sidebar: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    borderColor: semanticColors.gray[200],
    label: {
      color: semanticColors.gray[700],
      size: '0.9rem',
      weight: '500',
    },
    icon: {
      color: semanticColors.gray[500],
      size: '1.25rem',
    },
    hover: {
      backgroundColor: semanticColors.gray[100],
    },
    active: {
      backgroundColor: semanticColors.gray[50],
      color: semanticColors.gray[900],
      iconColor: semanticColors.primary[500], 
    },
    badge: {
      backgroundColor: semanticColors.primary[500], 
      color: '#ffffff',
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
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    borderColor: semanticColors.gray[200],
    borderWidth: '1px',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    hover: {
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    header: {
      backgroundColor: semanticColors.gray[50],
      borderBottom: `1px solid var(--color-secondary-200)`,
      padding: '1rem 1.5rem',
      borderTopLeftRadius: '1rem',
      borderTopRightRadius: '1rem',
    },
    body: {
      padding: '1.5rem',
    },
  },

  input: {
    backgroundColor: '#ffffff',
    borderColor: semanticColors.gray[300],
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    focus: {
      borderColor: semanticColors.primary[500],
      ring: `0 0 0 3px ${semanticColors.primary[100]}`,
    },
    placeholder: semanticColors.gray[400],
    disabled: {
      backgroundColor: semanticColors.gray[100],
      borderColor: semanticColors.gray[200],
    },
    error: {
      borderColor: semanticColors.danger[500],
      ring: `0 0 0 3px ${semanticColors.danger[100]}`,
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
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
    },
    content: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    header: {
      padding: '1.5rem 1.5rem 0.5rem 1.5rem',
      borderBottom: `1px solid var(--color-secondary-200)`,
    },
    body: {
      padding: '1.5rem',
    },
    footer: {
      padding: '1rem 1.5rem',
      borderTop: `1px solid var(--color-secondary-200)`,
      backgroundColor: semanticColors.gray[50],
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