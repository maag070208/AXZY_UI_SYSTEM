import { ITThemePalette } from "./themeProvider.props";

/** Paleta por defecto del sistema (fallback de `ITThemeProvider`). */
export const DEFAULT_PALETTE: ITThemePalette = {
  primary: "#06b6d4", // Cyan
  secondary: "#6b7280", // Gray
  ternary: "#8b5cf6", // Purple/Violet
  danger: "#ef4444", // Red
  success: "#22c55e", // Green
  info: "#3b82f6", // Blue
  alert: "#f97316", // Orange
  warning: "#eab308", // Yellow
  layout: {
    sidebarBg: "#ffffff", // White (light mode default)
    sidebarText: "#334155", // Slate-700 (dark text for light sidebar)
    navbarBg: "#ffffff", // White
    navbarText: "#1e293b", // Slate-800
  },
  table: {
    headerBg: "#f8fafc", // Slate-50
    headerText: "#334155", // Slate-700
    rowBg: "#ffffff", // White
    rowText: "#1e293b", // Slate-800
  },
};

/** Presets de colores para el FAB/theme-designer. */
export const PRESETS: { name: string; colors: ITThemePalette }[] = [
  {
    name: "Midnight Indigo 🌌",
    colors: {
      primary: "#6366f1",
      secondary: "#475569",
      ternary: "#f472b6",
      danger: "#ef4444",
      success: "#34d399",
      info: "#06b6d4",
      alert: "#fb923c",
      warning: "#fbbf24",
      layout: {
        sidebarBg: "#0b1120",
        sidebarText: "#94a3b8",
        navbarBg: "#0f172a",
        navbarText: "#f1f5f9",
      },
      table: {
        headerBg: "#f1f5f9",
        headerText: "#334155",
        rowBg: "#ffffff",
        rowText: "#0f172a",
      },
    },
  },
  {
    name: "Coral Reef 🪸",
    colors: {
      primary: "#f43f5e",
      secondary: "#57534e",
      ternary: "#f97316",
      danger: "#b91c1c",
      success: "#14b8a6",
      info: "#6366f1",
      alert: "#eab308",
      warning: "#fde047",
      layout: {
        sidebarBg: "#0c0808",
        sidebarText: "#fda4af",
        navbarBg: "#1c1212",
        navbarText: "#fff1f2",
      },
      table: {
        headerBg: "#fff1f2",
        headerText: "#881337",
        rowBg: "#ffffff",
        rowText: "#1c1212",
      },
    },
  },
  {
    name: "Oceanic Teal 🌊",
    colors: {
      primary: "#0d9488",
      secondary: "#64748b",
      ternary: "#a78bfa",
      danger: "#e11d48",
      success: "#22c55e",
      info: "#0284c7",
      alert: "#ea580c",
      warning: "#ca8a04",
      layout: {
        sidebarBg: "#042f2e",
        sidebarText: "#5eead4",
        navbarBg: "#062b2a",
        navbarText: "#ccfbf1",
      },
      table: {
        headerBg: "#f0fdfa",
        headerText: "#115e59",
        rowBg: "#ffffff",
        rowText: "#042f2e",
      },
    },
  },
  {
    name: "Golden Hour ☀️",
    colors: {
      primary: "#d97706",
      secondary: "#78716c",
      ternary: "#db2777",
      danger: "#dc2626",
      success: "#65a30d",
      info: "#2563eb",
      alert: "#f97316",
      warning: "#facc15",
      layout: {
        sidebarBg: "#fefce8",
        sidebarText: "#713f12",
        navbarBg: "#fffbeb",
        navbarText: "#451a03",
      },
      table: {
        headerBg: "#fefce8",
        headerText: "#713f12",
        rowBg: "#ffffff",
        rowText: "#292524",
      },
    },
  },
  {
    name: "Deep Forest 🌲",
    colors: {
      primary: "#16a34a",
      secondary: "#57534e",
      ternary: "#d946ef",
      danger: "#dc2626",
      success: "#14b8a6",
      info: "#0ea5e9",
      alert: "#f97316",
      warning: "#eab308",
      layout: {
        sidebarBg: "#052e16",
        sidebarText: "#86efac",
        navbarBg: "#0b3b1c",
        navbarText: "#dcfce7",
      },
      table: {
        headerBg: "#f0fdf4",
        headerText: "#166534",
        rowBg: "#ffffff",
        rowText: "#052e16",
      },
    },
  },
];