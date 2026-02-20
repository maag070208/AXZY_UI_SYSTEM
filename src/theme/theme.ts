import colors from "tailwindcss/colors";

/**
 * 1. Paleta base (colores crudos) - Actualizada a tonos azules
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

  // Mantenemos los colores de estado pero actualizamos a tonos más suaves
  success: colors.emerald,
  danger: colors.rose,
  warning: colors.amber,
  purple: colors.violet,
  info: colors.sky,
};

/**
 * 2. Colores semánticos (qué representa cada color)
 */
export const semanticColors = {
  primary: palette.blue,
  secondary: palette.gray,
  success: palette.success,
  danger: palette.danger,
  warning: palette.warning,
  info: palette.cyan, // Usamos cyan para info en lugar de sky
  purple: palette.purple,
  error: palette.danger,
  gray: palette.gray,
};

/**
 * 3. Tokens de componentes (heredan de semantic)
 */
export const components = {
  layout: {
    backgroundColor: semanticColors.gray[50], // Very light gray background for the main content area
    contentPadding: '1.5rem', // p-6
  },
  topbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)', // Glassmorphism base
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
    backgroundColor: 'rgba(255, 255, 255, 0.90)', // Glassmorphism base like topbar
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
      backgroundColor: semanticColors.gray[50], // Very subtle active bg in light mode
      color: semanticColors.gray[900],
      iconColor: '#10b981', // Emerald green
    },
    badge: {
      backgroundColor: '#10b981', 
      color: '#ffffff',
    },
  },

  button: {
    primary: {
      backgroundColor: '#06b6d4', // Cyan-500
      color: '#ffffff',
      hover: '#0891b2', // Cyan-600
      active: '#0e7490', // Cyan-700
      focus: '0 0 0 2px #a5f3fc', // Cyan-200
      borderRadius: '0.375rem', // 6px - rounded-md
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 150ms ease-in-out',
    },

    secondary: {
      backgroundColor: '#64748b', // Slate-500
      color: '#ffffff', // Text white for filled secondary per screenshot
      hover: '#475569', // Slate-600
      focus: '0 0 0 2px #e2e8f0',
      borderRadius: '0.375rem',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
    },

    success: {
      backgroundColor: '#22c55e', // Green-500
      color: '#ffffff',
      hover: '#16a34a', // Green-600
      focus: `0 0 0 2px ${semanticColors.success[200]}`,
      borderRadius: '0.375rem',
    },

    danger: {
      backgroundColor: '#ef4444', // Red-500
      color: '#ffffff',
      hover: '#dc2626', // Red-600
      focus: `0 0 0 2px ${semanticColors.danger[200]}`,
      borderRadius: '0.375rem',
    },

    error: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      hover: '#dc2626',
      borderRadius: '0.375rem',
    },

    warning: {
      backgroundColor: '#f97316', // Orange-500
      color: '#ffffff',
      hover: '#ea580c', // Orange-600
      focus: `0 0 0 2px ${semanticColors.warning[200]}`,
      borderRadius: '0.375rem',
    },

    info: {
      backgroundColor: '#0ea5e9', // Sky-500
      color: '#ffffff',
      hover: '#0284c7', // Sky-600
      focus: `0 0 0 2px ${semanticColors.info[200]}`,
      borderRadius: '0.375rem',
    },

    purple: {
      backgroundColor: '#8b5cf6', // Violet-500
      color: '#ffffff',
      hover: '#7c3aed', // Violet-600
      focus: `0 0 0 2px ${semanticColors.purple[200]}`,
      borderRadius: '0.375rem',
    },
    
    outline: {
      backgroundColor: 'transparent',
      color: semanticColors.primary[600],
      borderColor: semanticColors.primary[600],
      borderWidth: '2px', // Slightly thicker for modern look
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
    borderRadius: '1rem', // 16px - más moderno
    borderColor: semanticColors.gray[200],
    borderWidth: '1px',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    hover: {
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    header: {
      backgroundColor: semanticColors.gray[50],
      borderBottom: `1px solid ${semanticColors.gray[200]}`,
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
      borderBottom: `1px solid ${semanticColors.gray[200]}`,
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
      backgroundColor: 'rgba(15, 23, 42, 0.75)', // gray[900] con opacidad
    },
    content: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    header: {
      padding: '1.5rem 1.5rem 0.5rem 1.5rem',
      borderBottom: `1px solid ${semanticColors.gray[200]}`,
    },
    body: {
      padding: '1.5rem',
    },
    footer: {
      padding: '1rem 1.5rem',
      borderTop: `1px solid ${semanticColors.gray[200]}`,
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