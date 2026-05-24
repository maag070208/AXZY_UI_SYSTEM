import React, { createContext, useContext, useState, useEffect } from "react";
import { MdPalette, MdClose, MdRefresh, MdCheck } from "react-icons/md";
import { ITThemeProviderProps, ITThemePalette } from "./themeProvider.props";
import ITDialog from "../dialog/dialog";
import ITTabs from "../tabs/tabs";

// ============================================================================
// DEFAULT PALETTE & PRESETS CONFIG
// ============================================================================

const STORAGE_KEY = "it-theme-palette";

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

export const PRESETS: { name: string; colors: ITThemePalette }[] = [
  {
    name: "Midnight Nova 🌌",
    colors: {
      primary: "#6366f1", // Indigo
      secondary: "#475569", // Slate
      ternary: "#f472b6", // Pink (was Purple — now distinct from primary)
      danger: "#ef4444", // Red
      success: "#34d399", // Emerald (distinct green tone)
      info: "#38bdf8", // Sky
      alert: "#fb923c", // Orange
      warning: "#fbbf24", // Amber
      layout: {
        sidebarBg: "#020617",
        sidebarText: "#cbd5e1",
        navbarBg: "#0f172a",
        navbarText: "#f8fafc",
      },
      table: {
        headerBg: "#f8fafc",
        headerText: "#334155",
        rowBg: "#ffffff",
        rowText: "#1e293b",
      },
    },
  },

  {
    name: "Tokyo Drift 🏎️",
    colors: {
      primary: "#f43f5e", // Rose
      secondary: "#64748b", // Slate
      ternary: "#fb923c", // Orange
      danger: "#b91c1c", // Dark Red (distinct from Rose primary)
      success: "#2dd4bf", // Teal (NOT green — avoids confusion with primary hue)
      info: "#818cf8", // Indigo (distinct from sky/cyan)
      alert: "#f59e0b", // Amber (distinct from orange ternary)
      warning: "#fde047", // Yellow
      layout: {
        sidebarBg: "#0f050b",
        sidebarText: "#fda4af",
        navbarBg: "#1c0a15",
        navbarText: "#ffe4e6",
      },
      table: {
        headerBg: "#f8fafc",
        headerText: "#334155",
        rowBg: "#ffffff",
        rowText: "#1e293b",
      },
    },
  },

  {
    name: "Ocean Core 🌊",
    colors: {
      primary: "#0ea5e9", // Sky
      secondary: "#64748b", // Slate
      ternary: "#a78bfa", // Violet (distinct from Sky primary)
      danger: "#f43f5e", // Rose (distinct red, not plain red)
      success: "#34d399", // Emerald
      info: "#6366f1", // Indigo (distinct from Sky primary)
      alert: "#fb923c", // Orange
      warning: "#fbbf24", // Amber
      layout: {
        sidebarBg: "#031b2f",
        sidebarText: "#7dd3fc",
        navbarBg: "#0b253c",
        navbarText: "#e0f2fe",
      },
      table: {
        headerBg: "#f8fafc",
        headerText: "#334155",
        rowBg: "#ffffff",
        rowText: "#1e293b",
      },
    },
  },

  {
    name: "Matrix Pulse 💚",
    colors: {
      primary: "#10b981", // Emerald
      secondary: "#64748b", // Slate
      ternary: "#84cc16", // Lime (yellow-green, distinct from emerald)
      danger: "#ef4444", // Red
      success: "#2dd4bf", // Teal (distinct cyan-green, NOT another green)
      info: "#38bdf8", // Sky blue (distinct from greens)
      alert: "#f97316", // Orange
      warning: "#fbbf24", // Amber (distinct from orange)
      layout: {
        sidebarBg: "#022c1b",
        sidebarText: "#6ee7b7",
        navbarBg: "#043e26",
        navbarText: "#d1fae5",
      },
      table: {
        headerBg: "#f8fafc",
        headerText: "#334155",
        rowBg: "#ffffff",
        rowText: "#1e293b",
      },
    },
  },

  {
    name: "Royal Velvet 👑",
    colors: {
      primary: "#8b5cf6", // Violet
      secondary: "#64748b", // Slate
      ternary: "#ec4899", // Pink (distinct from violet)
      danger: "#ef4444", // Red
      success: "#34d399", // Emerald (clean green, distinct from violet)
      info: "#38bdf8", // Sky (distinct from violet/pink)
      alert: "#fb923c", // Orange
      warning: "#fbbf24", // Amber
      layout: {
        sidebarBg: "#1e0b36",
        sidebarText: "#c084fc",
        navbarBg: "#291048",
        navbarText: "#f3e8ff",
      },
      table: {
        headerBg: "#f8fafc",
        headerText: "#334155",
        rowBg: "#ffffff",
        rowText: "#1e293b",
      },
    },
  },
];
// ============================================================================
// CONTEXT & PROVIDER
// ============================================================================

interface ITThemeContextType {
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

const ITThemeContext = createContext<ITThemeContextType | undefined>(undefined);

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

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const isLightColor = (hex: string) => {
  if (!hex || typeof hex !== "string") return false;
  const color = hex.replace("#", "");
  let r = 0,
    g = 0,
    b = 0;
  if (color.length === 3) {
    r = parseInt(color[0] + color[0], 16);
    g = parseInt(color[1] + color[1], 16);
    b = parseInt(color[2] + color[2], 16);
  } else if (color.length === 6) {
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);
  } else {
    return false;
  }
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140;
};

/** Returns true if the hex color is very dark (brightness < 50) */
const isVeryDarkColor = (hex: string) => {
  if (!hex || typeof hex !== "string") return false;
  const color = hex.replace("#", "");
  let r = 0,
    g = 0,
    b = 0;
  if (color.length === 3) {
    r = parseInt(color[0] + color[0], 16);
    g = parseInt(color[1] + color[1], 16);
    b = parseInt(color[2] + color[2], 16);
  } else if (color.length === 6) {
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);
  } else {
    return false;
  }
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 50;
};

export default function ITThemeProvider({
  children,
  theme,
}: ITThemeProviderProps) {
  const [palette, setPaletteState] = useState<ITThemePalette>(() => {
    const basePalette = {
      ...DEFAULT_PALETTE,
      ...theme,
      layout: { ...DEFAULT_PALETTE.layout, ...theme?.layout },
      table: { ...DEFAULT_PALETTE.table, ...theme?.table },
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...basePalette,
          ...parsed,
          layout: { ...basePalette.layout, ...parsed.layout },
          table: { ...basePalette.table, ...parsed.table },
        };
      }
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
    }
    return basePalette as ITThemePalette;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const [customPresets, setCustomPresets] = useState<
    { name: string; colors: ITThemePalette }[]
  >(() => {
    try {
      const saved = localStorage.getItem("it-theme-custom-presets");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load custom presets", e);
      return [];
    }
  });
  const [newPresetName, setNewPresetName] = useState("");
  const [isSavingPreset, setIsSavingPreset] = useState(false);

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;
    const newPreset = {
      name: newPresetName.trim(),
      colors: JSON.parse(JSON.stringify(palette)),
    };
    const updated = [...customPresets, newPreset];
    setCustomPresets(updated);
    localStorage.setItem("it-theme-custom-presets", JSON.stringify(updated));
    setNewPresetName("");
    setIsSavingPreset(false);
    setShowSavedToast(true);
  };

  const handleDeletePreset = (nameToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customPresets.filter((p) => p.name !== nameToDelete);
    setCustomPresets(updated);
    localStorage.setItem("it-theme-custom-presets", JSON.stringify(updated));
  };

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const [darkModeMode, setDarkModeMode] = useState<"light" | "dark" | "system">(
    () => {
      const saved = localStorage.getItem("it-theme-dark-mode");
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
      return "system";
    },
  );

  useEffect(() => {
    localStorage.setItem("it-theme-dark-mode", darkModeMode);

    const applyDarkMode = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
        setResolvedTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
        setResolvedTheme("light");
      }
    };

    if (darkModeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyDarkMode(mediaQuery.matches);

      const listener = (e: MediaQueryListEvent) => {
        applyDarkMode(e.matches);
      };

      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      applyDarkMode(darkModeMode === "dark");
    }
  }, [darkModeMode]);

  // Inyectar variables CSS en el :root al cambiar la paleta o tema resuelto
  useEffect(() => {
    const injectStyles = (obj: any, prefix = "") => {
      Object.entries(obj).forEach(([key, val]) => {
        if (typeof val === "object" && val !== null) {
          injectStyles(val, prefix + key + "-");
        } else {
          document.documentElement.style.setProperty(
            `--color-${prefix}${key}`,
            val as string,
          );
          if (prefix === "layout-") {
            document.documentElement.style.setProperty(
              `--color-${key}`,
              val as string,
            );
          }
        }
      });
    };
    injectStyles(palette);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));

    // Dynamic overrides for Tailwind classes and component tokens
    let styleTag = document.getElementById(
      "it-theme-dynamic-overrides",
    ) as HTMLStyleElement;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "it-theme-dynamic-overrides";
      document.head.appendChild(styleTag);
    }

    const isDark = resolvedTheme === "dark";

    let tableRowBg = palette.table.rowBg;
    let tableRowText = palette.table.rowText;
    let tableHeaderBg = palette.table.headerBg;
    let tableHeaderText = palette.table.headerText;
    let navbarBg = palette.layout.navbarBg;
    let navbarText = palette.layout.navbarText;
    let sidebarBg = palette.layout.sidebarBg;
    let sidebarText = palette.layout.sidebarText;

    if (isDark) {
      if (isLightColor(tableRowBg)) {
        tableRowBg = `color-mix(in srgb, ${palette.table.rowBg} 8%, #111827)`;
      }
      if (!isLightColor(tableRowText)) {
        tableRowText = `color-mix(in srgb, ${palette.table.rowText} 20%, #f3f4f6)`;
      }
      if (isLightColor(tableHeaderBg)) {
        tableHeaderBg = `color-mix(in srgb, ${palette.table.headerBg} 12%, #1f2937)`;
      }
      if (!isLightColor(tableHeaderText)) {
        tableHeaderText = `color-mix(in srgb, ${palette.table.headerText} 20%, #f9fafb)`;
      }
      if (isLightColor(navbarBg)) {
        navbarBg = `color-mix(in srgb, ${palette.layout.navbarBg} 8%, #111827)`;
      }
      if (!isLightColor(navbarText)) {
        navbarText = `color-mix(in srgb, ${palette.layout.navbarText} 20%, #f3f4f6)`;
      }
      if (isLightColor(sidebarBg)) {
        sidebarBg = `color-mix(in srgb, ${palette.layout.sidebarBg} 8%, #0f172a)`;
      }
      if (!isLightColor(sidebarText)) {
        sidebarText = `color-mix(in srgb, ${palette.layout.sidebarText} 20%, #cbd5e1)`;
      }
    } else {
      // Light mode: if table colors are dark (from a dark preset), override to clean light values
      // Very dark colors (brightness < 50) get replaced directly to avoid dirty tints
      if (!isLightColor(tableRowBg)) {
        tableRowBg = isVeryDarkColor(palette.table.rowBg)
          ? "#ffffff"
          : `color-mix(in srgb, ${palette.table.rowBg} 8%, #ffffff)`;
      }
      if (isLightColor(tableRowText)) {
        tableRowText = `color-mix(in srgb, ${palette.table.rowText} 30%, #1e293b)`;
      } else if (
        !isLightColor(tableRowText) &&
        isVeryDarkColor(palette.table.rowText)
      ) {
        // Very dark text is fine for light mode, keep it
      }
      if (!isLightColor(tableHeaderBg)) {
        tableHeaderBg = isVeryDarkColor(palette.table.headerBg)
          ? "#f1f5f9"
          : `color-mix(in srgb, ${palette.table.headerBg} 12%, #f8fafc)`;
      }
      if (isLightColor(tableHeaderText)) {
        tableHeaderText = `color-mix(in srgb, ${palette.table.headerText} 30%, #334155)`;
      } else if (
        !isLightColor(tableHeaderText) &&
        isVeryDarkColor(palette.table.headerText)
      ) {
        // Dark header text is fine for light mode
      }
      if (!isLightColor(navbarBg)) {
        navbarBg = isVeryDarkColor(palette.layout.navbarBg)
          ? "#ffffff"
          : `color-mix(in srgb, ${palette.layout.navbarBg} 8%, #ffffff)`;
      }
      if (isLightColor(navbarText)) {
        navbarText = `color-mix(in srgb, ${palette.layout.navbarText} 30%, #1e293b)`;
      }
      if (!isLightColor(sidebarBg)) {
        sidebarBg = isVeryDarkColor(palette.layout.sidebarBg)
          ? "#ffffff"
          : `color-mix(in srgb, ${palette.layout.sidebarBg} 8%, #ffffff)`;
      }
      if (isLightColor(sidebarText)) {
        sidebarText = `color-mix(in srgb, ${palette.layout.sidebarText} 30%, #1e293b)`;
      }
      // If sidebar became light, ensure text is dark for contrast
      if (sidebarBg === "#ffffff" || isLightColor(sidebarBg)) {
        sidebarText = "#334155";
      }
    }

    styleTag.innerHTML = `
      :root {
        --color-primary: ${palette.primary};
        --color-secondary: ${palette.secondary};
        --color-ternary: ${palette.ternary};
        --color-danger: ${palette.danger};
        --color-success: ${palette.success};
        --color-info: ${palette.info};
        --color-alert: ${palette.alert};
        --color-warning: ${palette.warning};
        --color-heading-default: #1e293b;

        /* Generated scales for primary */
        --color-primary-50: color-mix(in srgb, var(--color-primary) 5%, #ffffff);
        --color-primary-100: color-mix(in srgb, var(--color-primary) 10%, #ffffff);
        --color-primary-200: color-mix(in srgb, var(--color-primary) 30%, #ffffff);
        --color-primary-300: color-mix(in srgb, var(--color-primary) 50%, #ffffff);
        --color-primary-400: color-mix(in srgb, var(--color-primary) 70%, #ffffff);
        --color-primary-500: var(--color-primary);
        --color-primary-600: color-mix(in srgb, var(--color-primary) 85%, #000000);
        --color-primary-700: color-mix(in srgb, var(--color-primary) 70%, #000000);
        --color-primary-800: color-mix(in srgb, var(--color-primary) 55%, #000000);
        --color-primary-900: color-mix(in srgb, var(--color-primary) 40%, #000000);
        --color-primary-950: color-mix(in srgb, var(--color-primary) 25%, #000000);

        /* Generated scales for secondary */
        --color-secondary-50: color-mix(in srgb, var(--color-secondary) 5%, #ffffff);
        --color-secondary-100: color-mix(in srgb, var(--color-secondary) 10%, #ffffff);
        --color-secondary-200: color-mix(in srgb, var(--color-secondary) 30%, #ffffff);
        --color-secondary-300: color-mix(in srgb, var(--color-secondary) 50%, #ffffff);
        --color-secondary-400: color-mix(in srgb, var(--color-secondary) 70%, #ffffff);
        --color-secondary-500: var(--color-secondary);
        --color-secondary-600: color-mix(in srgb, var(--color-secondary) 85%, #000000);
        --color-secondary-700: color-mix(in srgb, var(--color-secondary) 70%, #000000);
        --color-secondary-800: color-mix(in srgb, var(--color-secondary) 55%, #000000);
        --color-secondary-900: color-mix(in srgb, var(--color-secondary) 40%, #000000);
        --color-secondary-950: color-mix(in srgb, var(--color-secondary) 25%, #000000);

        /* Generated scales for ternary */
        --color-ternary-50: color-mix(in srgb, var(--color-ternary) 5%, #ffffff);
        --color-ternary-100: color-mix(in srgb, var(--color-ternary) 10%, #ffffff);
        --color-ternary-200: color-mix(in srgb, var(--color-ternary) 30%, #ffffff);
        --color-ternary-300: color-mix(in srgb, var(--color-ternary) 50%, #ffffff);
        --color-ternary-400: color-mix(in srgb, var(--color-ternary) 70%, #ffffff);
        --color-ternary-500: var(--color-ternary);
        --color-ternary-600: color-mix(in srgb, var(--color-ternary) 85%, #000000);
        --color-ternary-700: color-mix(in srgb, var(--color-ternary) 70%, #000000);
        --color-ternary-800: color-mix(in srgb, var(--color-ternary) 55%, #000000);
        --color-ternary-900: color-mix(in srgb, var(--color-ternary) 40%, #000000);
        --color-ternary-950: color-mix(in srgb, var(--color-ternary) 25%, #000000);

        /* Purple scales mapped as aliases to ternary */
        --color-purple-50: var(--color-ternary-50);
        --color-purple-100: var(--color-ternary-100);
        --color-purple-200: var(--color-ternary-200);
        --color-purple-300: var(--color-ternary-300);
        --color-purple-400: var(--color-ternary-400);
        --color-purple-500: var(--color-ternary-500);
        --color-purple-600: var(--color-ternary-600);
        --color-purple-700: var(--color-ternary-700);
        --color-purple-800: var(--color-ternary-800);
        --color-purple-900: var(--color-ternary-900);
        --color-purple-950: var(--color-ternary-950);

        /* Generated scales for danger */
        --color-danger-50: color-mix(in srgb, var(--color-danger) 5%, #ffffff);
        --color-danger-100: color-mix(in srgb, var(--color-danger) 10%, #ffffff);
        --color-danger-200: color-mix(in srgb, var(--color-danger) 30%, #ffffff);
        --color-danger-300: color-mix(in srgb, var(--color-danger) 50%, #ffffff);
        --color-danger-400: color-mix(in srgb, var(--color-danger) 70%, #ffffff);
        --color-danger-500: var(--color-danger);
        --color-danger-600: color-mix(in srgb, var(--color-danger) 85%, #000000);
        --color-danger-700: color-mix(in srgb, var(--color-danger) 70%, #000000);
        --color-danger-800: color-mix(in srgb, var(--color-danger) 55%, #000000);
        --color-danger-900: color-mix(in srgb, var(--color-danger) 40%, #000000);
        --color-danger-950: color-mix(in srgb, var(--color-danger) 25%, #000000);

        /* Generated scales for success */
        --color-success-50: color-mix(in srgb, var(--color-success) 5%, #ffffff);
        --color-success-100: color-mix(in srgb, var(--color-success) 10%, #ffffff);
        --color-success-200: color-mix(in srgb, var(--color-success) 30%, #ffffff);
        --color-success-300: color-mix(in srgb, var(--color-success) 50%, #ffffff);
        --color-success-400: color-mix(in srgb, var(--color-success) 70%, #ffffff);
        --color-success-500: var(--color-success);
        --color-success-600: color-mix(in srgb, var(--color-success) 85%, #000000);
        --color-success-700: color-mix(in srgb, var(--color-success) 70%, #000000);
        --color-success-800: color-mix(in srgb, var(--color-success) 55%, #000000);
        --color-success-900: color-mix(in srgb, var(--color-success) 40%, #000000);
        --color-success-950: color-mix(in srgb, var(--color-success) 25%, #000000);

        /* Generated scales for info */
        --color-info-50: color-mix(in srgb, var(--color-info) 5%, #ffffff);
        --color-info-100: color-mix(in srgb, var(--color-info) 10%, #ffffff);
        --color-info-200: color-mix(in srgb, var(--color-info) 30%, #ffffff);
        --color-info-300: color-mix(in srgb, var(--color-info) 50%, #ffffff);
        --color-info-400: color-mix(in srgb, var(--color-info) 70%, #ffffff);
        --color-info-500: var(--color-info);
        --color-info-600: color-mix(in srgb, var(--color-info) 85%, #000000);
        --color-info-700: color-mix(in srgb, var(--color-info) 70%, #000000);
        --color-info-800: color-mix(in srgb, var(--color-info) 55%, #000000);
        --color-info-900: color-mix(in srgb, var(--color-info) 40%, #000000);
        --color-info-950: color-mix(in srgb, var(--color-info) 25%, #000000);

        /* Generated scales for alert */
        --color-alert-50: color-mix(in srgb, var(--color-alert) 5%, #ffffff);
        --color-alert-100: color-mix(in srgb, var(--color-alert) 10%, #ffffff);
        --color-alert-200: color-mix(in srgb, var(--color-alert) 30%, #ffffff);
        --color-alert-300: color-mix(in srgb, var(--color-alert) 50%, #ffffff);
        --color-alert-400: color-mix(in srgb, var(--color-alert) 70%, #ffffff);
        --color-alert-500: var(--color-alert);
        --color-alert-600: color-mix(in srgb, var(--color-alert) 85%, #000000);
        --color-alert-700: color-mix(in srgb, var(--color-alert) 70%, #000000);
        --color-alert-800: color-mix(in srgb, var(--color-alert) 55%, #000000);
        --color-alert-900: color-mix(in srgb, var(--color-alert) 40%, #000000);
        --color-alert-950: color-mix(in srgb, var(--color-alert) 25%, #000000);

        /* Generated scales for warning */
        --color-warning-50: color-mix(in srgb, var(--color-warning) 5%, #ffffff);
        --color-warning-100: color-mix(in srgb, var(--color-warning) 10%, #ffffff);
        --color-warning-200: color-mix(in srgb, var(--color-warning) 30%, #ffffff);
        --color-warning-300: color-mix(in srgb, var(--color-warning) 50%, #ffffff);
        --color-warning-400: color-mix(in srgb, var(--color-warning) 70%, #ffffff);
        --color-warning-500: var(--color-warning);
        --color-warning-600: color-mix(in srgb, var(--color-warning) 85%, #000000);
        --color-warning-700: color-mix(in srgb, var(--color-warning) 70%, #000000);
        --color-warning-800: color-mix(in srgb, var(--color-warning) 55%, #000000);
        --color-warning-900: color-mix(in srgb, var(--color-warning) 40%, #000000);
        --color-warning-950: color-mix(in srgb, var(--color-warning) 25%, #000000);

        /* Support legacy client app variables */
        --color-primary-focus: color-mix(in srgb, var(--color-primary) 30%, transparent);
        --color-primary-light: color-mix(in srgb, var(--color-primary) 10%, #ffffff);
        --color-secondary-border: color-mix(in srgb, var(--color-secondary) 30%, #000000);
        --color-ternary-light: color-mix(in srgb, var(--color-ternary) 15%, #ffffff);
        --color-danger-focus: color-mix(in srgb, var(--color-danger) 30%, transparent);
        --color-success-focus: color-mix(in srgb, var(--color-success) 30%, transparent);
        --color-info-focus: color-mix(in srgb, var(--color-info) 30%, transparent);
        --color-alert-focus: color-mix(in srgb, var(--color-alert) 30%, transparent);
        --color-warning-focus: color-mix(in srgb, var(--color-warning) 30%, transparent);

        /* Map library properties for complete safety */
        --color-primary-hover: color-mix(in srgb, var(--color-primary) 85%, #000000);
        --color-primary-ring: color-mix(in srgb, var(--color-primary) 40%, transparent);
        --color-primary-soft: color-mix(in srgb, var(--color-primary) 12%, transparent);
        --color-primary-soft-border: color-mix(in srgb, var(--color-primary) 24%, transparent);

        --color-secondary-hover: color-mix(in srgb, var(--color-secondary) 85%, #000000);
        --color-secondary-ring: color-mix(in srgb, var(--color-secondary) 40%, transparent);
        --color-secondary-soft: color-mix(in srgb, var(--color-secondary) 12%, transparent);
        --color-secondary-soft-border: color-mix(in srgb, var(--color-secondary) 24%, transparent);

        --color-ternary-hover: color-mix(in srgb, var(--color-ternary) 85%, #000000);
        --color-ternary-ring: color-mix(in srgb, var(--color-ternary) 40%, transparent);
        --color-ternary-soft: color-mix(in srgb, var(--color-ternary) 12%, transparent);
        --color-ternary-soft-border: color-mix(in srgb, var(--color-ternary) 24%, transparent);

        --color-danger-hover: color-mix(in srgb, var(--color-danger) 85%, #000000);
        --color-danger-ring: color-mix(in srgb, var(--color-danger) 40%, transparent);
        --color-danger-soft: color-mix(in srgb, var(--color-danger) 12%, transparent);
        --color-danger-soft-border: color-mix(in srgb, var(--color-danger) 24%, transparent);

        --color-success-hover: color-mix(in srgb, var(--color-success) 85%, #000000);
        --color-success-ring: color-mix(in srgb, var(--color-success) 40%, transparent);
        --color-success-soft: color-mix(in srgb, var(--color-success) 12%, transparent);
        --color-success-soft-border: color-mix(in srgb, var(--color-success) 24%, transparent);

        --color-info-hover: color-mix(in srgb, var(--color-info) 85%, #000000);
        --color-info-ring: color-mix(in srgb, var(--color-info) 40%, transparent);
        --color-info-soft: color-mix(in srgb, var(--color-info) 12%, transparent);
        --color-info-soft-border: color-mix(in srgb, var(--color-info) 24%, transparent);

        --color-alert-hover: color-mix(in srgb, var(--color-alert) 85%, #000000);
        --color-alert-ring: color-mix(in srgb, var(--color-alert) 40%, transparent);
        --color-alert-soft: color-mix(in srgb, var(--color-alert) 12%, transparent);
        --color-alert-soft-border: color-mix(in srgb, var(--color-alert) 24%, transparent);

        --color-warning-hover: color-mix(in srgb, var(--color-warning) 85%, #000000);
        --color-warning-ring: color-mix(in srgb, var(--color-warning) 40%, transparent);
        --color-warning-soft: color-mix(in srgb, var(--color-warning) 12%, transparent);
        --color-warning-soft-border: color-mix(in srgb, var(--color-warning) 24%, transparent);

        --color-sidebarBg: ${sidebarBg} !important;
        --color-sidebarText: ${sidebarText} !important;
        --color-navbarBg: ${navbarBg} !important;
        --color-navbarText: ${navbarText} !important;

        --color-table-headerBg: ${tableHeaderBg} !important;
        --color-table-headerText: ${tableHeaderText} !important;
        --color-table-rowBg: ${tableRowBg} !important;
        --color-table-rowText: ${tableRowText} !important;

        /* Native library variables integration */
        --sidebar-bg: var(--color-sidebarBg);
        --sidebar-border: color-mix(in srgb, var(--color-sidebarBg) 85%, #000000);
        --sidebar-label-color: var(--color-sidebarText);
        --sidebar-icon-color: color-mix(in srgb, var(--color-sidebarText) 80%, transparent);
        --sidebar-hover-bg: color-mix(in srgb, var(--color-sidebarText) 10%, transparent);
        --sidebar-active-bg: color-mix(in srgb, var(--color-primary) 12%, transparent);
        --sidebar-active-color: var(--color-primary);
        --sidebar-active-icon: var(--color-primary);
        --sidebar-badge-bg: var(--color-primary);
        --sidebar-badge-color: #ffffff;

        --topbar-bg: var(--color-navbarBg);
        --topbar-text: var(--color-navbarText);
        --topbar-border: color-mix(in srgb, var(--color-navbarBg) 85%, #000000);
        --topbar-icon: color-mix(in srgb, var(--color-navbarText) 80%, transparent);
        --topbar-icon-hover: var(--color-navbarText);

        --layout-bg: var(--color-secondary-50);
        --input-text-color: var(--color-secondary-900);

        --calendar-selected-bg: var(--color-primary);
        --calendar-selected-text: #ffffff;
        --calendar-range-bg: var(--color-primary-50);
        --calendar-today-bg: var(--color-primary-100);
        --calendar-today-text: var(--color-primary);
      }

      /* Dark mode overrides */
      .dark, [data-theme="dark"] {
        --color-heading-default: #f8fafc;
        --layout-bg: #090f1d;
        --card-bg: #111827;
        --card-border: #1f2937;
        --card-header-bg: #1f2937;
        --card-header-border: #374151;
        --input-bg: #1f2937;
        --input-border: #374151;
        --input-placeholder: #6b7280;
        --input-text-color: #cbd5e1;
        --modal-bg: #111827;
        --modal-footer-bg: #1f2937;
        --modal-header-border: #374151;
        --modal-footer-border: #374151;
        --calendar-bg: #111827;
        --calendar-border: #1f2937;
        --calendar-header-text: #f3f4f6;
        --calendar-header-hover: #1f2937;
        --calendar-days-text: #e5e7eb;
        --calendar-selected-bg: var(--color-primary);
        --calendar-selected-text: #ffffff;
        --calendar-range-bg: var(--color-primary-50);
        --calendar-today-bg: var(--color-primary-100);
        --calendar-today-text: var(--color-primary);

        /* Override dynamic color-mix scales to blend with dark instead of white */
        --color-primary-50: color-mix(in srgb, var(--color-primary) 10%, #0b1329);
        --color-primary-100: color-mix(in srgb, var(--color-primary) 20%, #0b1329);
        --color-primary-200: color-mix(in srgb, var(--color-primary) 35%, #0b1329);
        --color-primary-300: color-mix(in srgb, var(--color-primary) 50%, #0b1329);
        --color-primary-400: color-mix(in srgb, var(--color-primary) 70%, #0b1329);

        --color-secondary-50: color-mix(in srgb, var(--color-secondary) 10%, #090f1d);
        --color-secondary-100: color-mix(in srgb, var(--color-secondary) 18%, #090f1d);
        --color-secondary-200: color-mix(in srgb, var(--color-secondary) 30%, #090f1d);
        --color-secondary-300: color-mix(in srgb, var(--color-secondary) 45%, #090f1d);
        --color-secondary-400: color-mix(in srgb, var(--color-secondary) 60%, #090f1d);

        --color-success-50: color-mix(in srgb, var(--color-success) 10%, #061f14);
        --color-success-100: color-mix(in srgb, var(--color-success) 20%, #061f14);
        --color-success-200: color-mix(in srgb, var(--color-success) 35%, #061f14);

        --color-danger-50: color-mix(in srgb, var(--color-danger) 10%, #1f0808);
        --color-danger-100: color-mix(in srgb, var(--color-danger) 20%, #1f0808);
        --color-danger-200: color-mix(in srgb, var(--color-danger) 35%, #1f0808);

        --color-warning-50: color-mix(in srgb, var(--color-warning) 10%, #1f1b05);
        --color-warning-100: color-mix(in srgb, var(--color-warning) 20%, #1f1b05);
        --color-warning-200: color-mix(in srgb, var(--color-warning) 35%, #1f1b05);

        --color-ternary-50: color-mix(in srgb, var(--color-ternary) 10%, #14081f);
        --color-ternary-100: color-mix(in srgb, var(--color-ternary) 20%, #14081f);
        --color-ternary-200: color-mix(in srgb, var(--color-ternary) 35%, #14081f);

        --color-info-50: color-mix(in srgb, var(--color-info) 10%, #08141f);
        --color-info-100: color-mix(in srgb, var(--color-info) 20%, #08141f);
        --color-info-200: color-mix(in srgb, var(--color-info) 35%, #08141f);
      }

      /* Force dark mode class overrides for common backgrounds, borders, and texts */
      .dark, [data-theme="dark"] {
        color: #cbd5e1;
      }
      .dark .text-slate-800, [data-theme="dark"] .text-slate-800,
      .dark .text-gray-800, [data-theme="dark"] .text-gray-800 {
        color: #f8fafc !important;
      }
      .dark .text-slate-700, [data-theme="dark"] .text-slate-700,
      .dark .text-gray-700, [data-theme="dark"] .text-gray-700 {
        color: #cbd5e1 !important;
      }
      .dark .text-slate-600, [data-theme="dark"] .text-slate-600,
      .dark .text-gray-600, [data-theme="dark"] .text-gray-600 {
        color: #cbd5e1 !important;
      }
      .dark .text-slate-500, [data-theme="dark"] .text-slate-500,
      .dark .text-gray-500, [data-theme="dark"] .text-gray-500 {
        color: #94a3b8 !important;
      }
      .dark .text-slate-400, [data-theme="dark"] .text-slate-400,
      .dark .text-gray-400, [data-theme="dark"] .text-gray-400 {
        color: #64748b !important;
      }

      .dark .bg-white, [data-theme="dark"] .bg-white {
        background-color: var(--card-bg, #111827) !important;
      }
      .dark .bg-slate-50, [data-theme="dark"] .bg-slate-50,
      .dark .bg-gray-50, [data-theme="dark"] .bg-gray-50 {
        background-color: #1f2937 !important;
      }
      .dark .border-slate-100, [data-theme="dark"] .border-slate-100,
      .dark .border-gray-100, [data-theme="dark"] .border-gray-100,
      .dark .border-slate-200, [data-theme="dark"] .border-slate-200,
      .dark .border-gray-200, [data-theme="dark"] .border-gray-200 {
        border-color: #374151 !important;
      }

      .dark .bg-gray-100, [data-theme="dark"] .bg-gray-100,
      .dark .bg-slate-100, [data-theme="dark"] .bg-slate-100 {
        background-color: #1f2937 !important;
      }
      .dark .border-gray-300, [data-theme="dark"] .border-gray-300,
      .dark .border-slate-300, [data-theme="dark"] .border-slate-300 {
        border-color: #4b5563 !important;
      }
      .dark .bg-gray-200, [data-theme="dark"] .bg-gray-200,
      .dark .bg-slate-200, [data-theme="dark"] .bg-slate-200 {
        background-color: #374151 !important;
      }

      /* Light mode overrides inside forced light subtree */
      [data-theme="light"] {
        color: #334155;
        --layout-bg: var(--color-secondary-50);
        --card-bg: #ffffff;
        --card-border: #f1f5f9;
        --card-header-bg: #f8fafc;
        --card-header-border: #e2e8f0;
        --input-bg: #ffffff;
        --input-border: #cbd5e1;
        --input-placeholder: #94a3b8;
        --input-text-color: #1e293b;
        --modal-bg: #ffffff;
        --modal-footer-bg: #f8fafc;
        --modal-header-border: #e2e8f0;
        --modal-footer-border: #e2e8f0;
        --calendar-bg: #ffffff;
        --calendar-border: #e2e8f0;
        --calendar-header-text: #1e293b;
        --calendar-header-hover: #f1f5f9;
        --calendar-days-text: #334155;
        --calendar-selected-bg: var(--color-primary);
        --calendar-selected-text: #ffffff;
        --calendar-range-bg: var(--color-primary-50);
        --calendar-today-bg: var(--color-primary-100);
        --calendar-today-text: var(--color-primary);

        --color-primary-50: color-mix(in srgb, var(--color-primary) 5%, #ffffff);
        --color-primary-100: color-mix(in srgb, var(--color-primary) 10%, #ffffff);
        --color-primary-200: color-mix(in srgb, var(--color-primary) 30%, #ffffff);
        --color-primary-300: color-mix(in srgb, var(--color-primary) 50%, #ffffff);
        --color-primary-400: color-mix(in srgb, var(--color-primary) 70%, #ffffff);

        --color-secondary-50: color-mix(in srgb, var(--color-secondary) 5%, #ffffff);
        --color-secondary-100: color-mix(in srgb, var(--color-secondary) 10%, #ffffff);
        --color-secondary-200: color-mix(in srgb, var(--color-secondary) 30%, #ffffff);
        --color-secondary-300: color-mix(in srgb, var(--color-secondary) 50%, #ffffff);
        --color-secondary-400: color-mix(in srgb, var(--color-secondary) 70%, #ffffff);

        --color-success-50: color-mix(in srgb, var(--color-success) 5%, #ffffff);
        --color-success-100: color-mix(in srgb, var(--color-success) 10%, #ffffff);
        --color-success-200: color-mix(in srgb, var(--color-success) 30%, #ffffff);

        --color-danger-50: color-mix(in srgb, var(--color-danger) 5%, #ffffff);
        --color-danger-100: color-mix(in srgb, var(--color-danger) 10%, #ffffff);
        --color-danger-200: color-mix(in srgb, var(--color-danger) 30%, #ffffff);

        --color-warning-50: color-mix(in srgb, var(--color-warning) 5%, #ffffff);
        --color-warning-100: color-mix(in srgb, var(--color-warning) 10%, #ffffff);
        --color-warning-200: color-mix(in srgb, var(--color-warning) 30%, #ffffff);

        --color-ternary-50: color-mix(in srgb, var(--color-ternary) 5%, #ffffff);
        --color-ternary-100: color-mix(in srgb, var(--color-ternary) 10%, #ffffff);
        --color-ternary-200: color-mix(in srgb, var(--color-ternary) 30%, #ffffff);

        --color-info-50: color-mix(in srgb, var(--color-info) 5%, #ffffff);
        --color-info-100: color-mix(in srgb, var(--color-info) 10%, #ffffff);
        --color-info-200: color-mix(in srgb, var(--color-info) 30%, #ffffff);
      }

      [data-theme="light"] .text-slate-800,
      [data-theme="light"] .text-gray-800 {
        color: #1e293b !important;
      }
      [data-theme="light"] .text-slate-700,
      [data-theme="light"] .text-gray-700 {
        color: #334155 !important;
      }
      [data-theme="light"] .text-slate-600,
      [data-theme="light"] .text-gray-600 {
        color: #475569 !important;
      }
      [data-theme="light"] .text-slate-500,
      [data-theme="light"] .text-gray-500 {
        color: #64748b !important;
      }
      [data-theme="light"] .text-slate-400,
      [data-theme="light"] .text-gray-400 {
        color: #94a3b8 !important;
      }

      [data-theme="light"] .bg-white {
        background-color: #ffffff !important;
      }
      [data-theme="light"] .bg-slate-50,
      [data-theme="light"] .bg-gray-50 {
        background-color: #f8fafc !important;
      }
      [data-theme="light"] .border-slate-100,
      [data-theme="light"] .border-gray-100,
      [data-theme="light"] .border-slate-200,
      [data-theme="light"] .border-gray-200 {
        border-color: #e2e8f0 !important;
      }
      [data-theme="light"] .bg-gray-100,
      [data-theme="light"] .bg-slate-100 {
        background-color: #f1f5f9 !important;
      }
      [data-theme="light"] .border-gray-300,
      [data-theme="light"] .border-slate-300 {
        border-color: #cbd5e1 !important;
      }
      [data-theme="light"] .bg-gray-200,
      [data-theme="light"] .bg-slate-200 {
        background-color: #e2e8f0 !important;
      }


      /* Primary overrides (cyan mappings in UI library) */
      .bg-cyan-400 { background-color: var(--color-primary) !important; }
      .hover\\:bg-cyan-500:hover { background-color: var(--color-primary-hover) !important; }
      .focus\\:ring-cyan-300:focus { --tw-ring-color: var(--color-primary-ring) !important; }
      .text-cyan-600 { color: var(--color-primary) !important; }
      .text-cyan-500 { color: var(--color-primary) !important; }
      .border-cyan-400 { border-color: var(--color-primary) !important; }
      .focus\\:border-cyan-500:focus { border-color: var(--color-primary-hover) !important; }
      .focus\\:ring-cyan-500:focus { --tw-ring-color: var(--color-primary-hover) !important; }
      .text-cyan-100 { color: var(--color-primary-soft) !important; }
      .hover\\:bg-cyan-50:hover { background-color: var(--color-primary-soft) !important; }

      /* Success overrides (green mappings in UI library) */
      .bg-green-700 { background-color: var(--color-success) !important; }
      .hover\\:bg-green-800:hover { background-color: var(--color-success-hover) !important; }
      .focus\\:ring-green-300:focus { --tw-ring-color: var(--color-success-ring) !important; }
      .text-green-700 { color: var(--color-success) !important; }
      .border-green-700 { border-color: var(--color-success) !important; }
      .bg-green-500 { background-color: var(--color-success) !important; }
      .hover\\:bg-green-600:hover { background-color: var(--color-success-hover) !important; }

      /* Danger overrides (red mappings in UI library) */
      .bg-red-700 { background-color: var(--color-danger) !important; }
      .hover\\:bg-red-800:hover { background-color: var(--color-danger-hover) !important; }
      .focus\\:ring-red-300:focus { --tw-ring-color: var(--color-danger-ring) !important; }
      .text-red-700 { color: var(--color-danger) !important; }
      .border-red-700 { border-color: var(--color-danger) !important; }
      .bg-red-500 { background-color: var(--color-danger) !important; }
      .hover\\:bg-red-600:hover { background-color: var(--color-danger-hover) !important; }

      /* Warning overrides (yellow mappings in UI library) */
      .bg-yellow-400 { background-color: var(--color-warning) !important; }
      .hover\\:bg-yellow-500:hover { background-color: var(--color-warning-hover) !important; }
      .focus\\:ring-yellow-300:focus { --tw-ring-color: var(--color-warning-ring) !important; }
      .text-yellow-600 { color: var(--color-warning-hover) !important; }
      .border-yellow-400 { border-color: var(--color-warning) !important; }
      .bg-yellow-500 { background-color: var(--color-warning) !important; }
      .hover\\:bg-yellow-600:hover { background-color: var(--color-warning-hover) !important; }

      /* Ternary / Orange overrides */
      .bg-orange-500 { background-color: var(--color-ternary) !important; }
      .hover\\:bg-orange-500:hover { background-color: var(--color-ternary-hover) !important; }
      .hover\\:bg-orange-600:hover { background-color: var(--color-ternary-hover) !important; }
      .text-orange-500 { color: var(--color-ternary) !important; }
      .text-orange-800 { color: var(--color-ternary-hover) !important; }
      .bg-orange-200 { background-color: var(--color-ternary-soft) !important; }
      .border-orange-400 { border-color: var(--color-ternary) !important; }
      .border-orange-500 { border-color: var(--color-ternary) !important; }
      .hover\\:bg-orange-50\\/30:hover { background-color: var(--color-ternary-soft) !important; }

      /* Info / Blue overrides */
      .bg-blue-500 { background-color: var(--color-info) !important; }
      .hover\\:bg-blue-600:hover { background-color: var(--color-info-hover) !important; }
      .text-blue-500 { color: var(--color-info) !important; }
      .text-blue-600 { color: var(--color-info-hover) !important; }
      .border-blue-500 { border-color: var(--color-info) !important; }

      /* Secondary elements overrides */
      button[class*="bg-white"][class*="hover:bg-gray-100"] {
        background-color: var(--color-secondary) !important;
        border-color: var(--color-secondary-soft-border) !important;
        color: #111827 !important;
      }
      button[class*="bg-white"][class*="hover:bg-gray-100"]:hover {
        background-color: var(--color-secondary-hover) !important;
      }

      /* Custom Table styling overrides */
      thead tr, tr.bg-secondary-50, tr[class*="bg-secondary-50"] {
        background-color: var(--color-table-headerBg) !important;
        border-bottom-color: color-mix(in srgb, var(--color-table-headerBg) 85%, #000000) !important;
      }
      th span, th div span {
        color: var(--color-table-headerText) !important;
      }
      tbody tr {
        background-color: var(--color-table-rowBg) !important;
      }
      tbody tr td, tbody tr td div {
        color: var(--color-table-rowText) !important;
      }
      tbody tr:hover {
        background-color: color-mix(in srgb, var(--color-primary) 8%, var(--color-table-rowBg)) !important;
      }

      /* Animation for Saved Indicator */
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(-4px); }
        15%, 85% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-out {
        animation: fadeInOut 1.5s ease-in-out forwards;
      }

      /* Fallback utility classes for blurs */
      .backdrop-blur-xs {
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
      }
      .backdrop-blur-xl {
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
      }

      /* =======================================================================
         AUTONOMOUS THEME DESIGNER STYLES (No Tailwind dependencies)
         ======================================================================= */

      @keyframes itBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .it-theme-bounce {
        animation: itBounce 3s infinite ease-in-out !important;
      }

      /* FAB styles */
      .it-theme-fab {
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        width: 56px !important;
        height: 56px !important;
        border-radius: 50% !important;
        border: none !important;
        color: #ffffff !important;
        box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.15) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 99999 !important;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, box-shadow 0.2s ease !important;
        outline: none !important;
      }
      .it-theme-fab:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2) !important;
      }
      .it-theme-fab:active {
        transform: scale(0.95) !important;
      }

      /* Backdrop styles */
      .it-theme-backdrop {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background-color: rgba(15, 23, 42, 0.3) !important;
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
        z-index: 99997 !important;
        transition: opacity 0.3s ease !important;
      }

      /* Drawer container */
      .it-theme-drawer {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        max-width: 420px !important;
        background-color: #ffffff !important;
        box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.08), -8px 0 10px -6px rgba(0, 0, 0, 0.08) !important;
        z-index: 99998 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding: 24px !important;
        box-sizing: border-box !important;
        border-left: 1px solid rgba(226, 232, 240, 0.8) !important;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        font-family: Inter, system-ui, -apple-system, sans-serif !important;
        color: #1e293b !important;
      }

      .dark .it-theme-drawer, [data-theme="dark"] .it-theme-drawer {
        background-color: #0f172a !important;
        border-left-color: rgba(30, 41, 59, 0.8) !important;
        color: #f1f5f9 !important;
      }

      /* Drawer Header */
      .it-theme-drawer-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding-bottom: 16px !important;
        border-bottom: 1px solid #e2e8f0 !important;
      }
      .dark .it-theme-drawer-header, [data-theme="dark"] .it-theme-drawer-header {
        border-bottom-color: #1e293b !important;
      }
      
      .it-theme-drawer-title-group {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }

      .it-theme-icon-container {
        width: 36px !important;
        height: 36px !important;
        border-radius: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: #ffffff !important;
      }

      .it-theme-drawer-title {
        font-size: 16px !important;
        font-weight: 700 !important;
        margin: 0 !important;
        color: #1e293b !important;
        line-height: 1.2 !important;
      }
      .dark .it-theme-drawer-title, [data-theme="dark"] .it-theme-drawer-title {
        color: #f8fafc !important;
      }

      .it-theme-drawer-subtitle {
        font-size: 11px !important;
        color: #64748b !important;
        margin: 2px 0 0 0 !important;
        font-weight: 400 !important;
      }
      .dark .it-theme-drawer-subtitle, [data-theme="dark"] .it-theme-drawer-subtitle {
        color: #94a3b8 !important;
      }

      .it-theme-close-btn {
        background: none !important;
        border: none !important;
        color: #94a3b8 !important;
        cursor: pointer !important;
        padding: 6px !important;
        border-radius: 6px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: background-color 0.2s, color 0.2s !important;
      }
      .it-theme-close-btn:hover {
        background-color: #f1f5f9 !important;
        color: #334155 !important;
      }
      .dark .it-theme-close-btn:hover, [data-theme="dark"] .it-theme-close-btn:hover {
        background-color: #1e293b !important;
        color: #f1f5f9 !important;
      }

      /* Sections inside Drawer */
      .it-theme-section {
        margin-top: 18px !important;
      }
      
      .it-theme-section-title {
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        color: #94a3b8 !important;
        margin-bottom: 8px !important;
        margin-top: 0 !important;
      }

      /* Preset Grid */
      .it-theme-presets-grid {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 8px !important;
      }

      .it-theme-preset-card {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        padding: 10px !important;
        border-radius: 10px !important;
        border: 1px solid #e2e8f0 !important;
        background-color: rgba(255, 255, 255, 0.6) !important;
        cursor: pointer !important;
        text-align: left !important;
        transition: all 0.2s ease !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .dark .it-theme-preset-card, [data-theme="dark"] .it-theme-preset-card {
        border-color: #1e293b !important;
        background-color: rgba(15, 23, 42, 0.4) !important;
      }
      
      .it-theme-preset-card:hover {
        border-color: #cbd5e1 !important;
        transform: translateY(-1px) !important;
      }
      .dark .it-theme-preset-card:hover, [data-theme="dark"] .it-theme-preset-card:hover {
        border-color: #334155 !important;
      }

      .it-theme-preset-name {
        font-size: 11px !important;
        font-weight: 600 !important;
        color: #334155 !important;
        margin-bottom: 6px !important;
        margin-top: 0 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        width: 100% !important;
      }
      .dark .it-theme-preset-name, [data-theme="dark"] .it-theme-preset-name {
        color: #cbd5e1 !important;
      }

      .it-theme-preset-colors {
        display: flex !important;
        gap: 4px !important;
      }

      .it-theme-preset-dot {
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        border: 1px solid rgba(0,0,0,0.08) !important;
      }

      /* Color controls list */
      .it-theme-color-list {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
        max-height: 250px !important;
        overflow-y: auto !important;
        padding-right: 4px !important;
      }

      .it-theme-color-row {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 6px 10px !important;
        border-radius: 10px !important;
        border: 1px solid #f1f5f9 !important;
        background-color: rgba(248, 250, 252, 0.5) !important;
      }
      .dark .it-theme-color-row, [data-theme="dark"] .it-theme-color-row {
        border-color: #1e293b !important;
        background-color: rgba(9, 15, 29, 0.5) !important;
      }

      .it-theme-color-left {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }

      .it-theme-color-picker-btn {
        position: relative !important;
        width: 28px !important;
        height: 28px !important;
        border-radius: 50% !important;
        overflow: hidden !important;
        border: 1px solid #cbd5e1 !important;
        box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06) !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .dark .it-theme-color-picker-btn, [data-theme="dark"] .it-theme-color-picker-btn {
        border-color: #475569 !important;
      }

      .it-theme-color-picker-input {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        opacity: 0 !important;
        cursor: pointer !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .it-theme-color-picker-preview {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
      }

      .it-theme-color-meta {
        display: flex !important;
        flex-direction: column !important;
      }

      .it-theme-color-label {
        font-size: 10px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        color: #475569 !important;
      }
      .dark .it-theme-color-label, [data-theme="dark"] .it-theme-color-label {
        color: #cbd5e1 !important;
      }

      .it-theme-color-hex-text {
        font-family: monospace !important;
        font-size: 9px !important;
        color: #94a3b8 !important;
        margin-top: 1px !important;
      }

      .it-theme-color-text-input {
        width: 80px !important;
        padding: 4px 6px !important;
        font-size: 11px !important;
        font-family: monospace !important;
        text-align: center !important;
        border-radius: 6px !important;
        border: 1px solid #cbd5e1 !important;
        background-color: #ffffff !important;
        color: #334155 !important;
        outline: none !important;
        transition: border-color 0.2s !important;
        box-sizing: border-box !important;
      }
      .dark .it-theme-color-text-input, [data-theme="dark"] .it-theme-color-text-input {
        border-color: #475569 !important;
        background-color: #1e293b !important;
        color: #cbd5e1 !important;
      }

      /* Mode Selector Segmented Control */
      .it-theme-mode-selector {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 2px !important;
        background-color: #f1f5f9 !important;
        padding: 2px !important;
        border-radius: 8px !important;
        width: 180px !important;
      }
      .dark .it-theme-mode-selector, [data-theme="dark"] .it-theme-mode-selector {
        background-color: #1e293b !important;
      }

      .it-theme-mode-btn {
        background: none !important;
        border: none !important;
        padding: 6px 8px !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        color: #475569 !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        text-align: center !important;
        transition: all 0.2s ease !important;
      }
      .dark .it-theme-mode-btn, [data-theme="dark"] .it-theme-mode-btn {
        color: #94a3b8 !important;
      }

      .it-theme-mode-btn-active {
        background-color: #ffffff !important;
        color: var(--color-primary) !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06) !important;
      }
      .dark .it-theme-mode-btn-active, [data-theme="dark"] .it-theme-mode-btn-active {
        background-color: #0f172a !important;
        color: var(--color-primary) !important;
      }

      /* Saved notification toast */
      .it-theme-toast-container {
        height: 20px !important;
        margin: 6px 0 !important;
        position: relative !important;
      }

      .it-theme-toast {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        display: flex !important;
        justify-content: center !important;
      }

      .it-theme-toast-badge {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        font-size: 10px !important;
        font-weight: 600 !important;
        background-color: rgba(34, 197, 94, 0.1) !important;
        color: #16a34a !important;
        padding: 3px 10px !important;
        border-radius: 9999px !important;
        border: 1px solid rgba(34, 197, 94, 0.2) !important;
      }

      /* Drawer Footer */
      .it-theme-drawer-footer {
        padding-top: 12px !important;
        margin-top: 12px !important;
        border-top: 1px solid #e2e8f0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }
      .dark .it-theme-drawer-footer, [data-theme="dark"] .it-theme-drawer-footer {
        border-top-color: #1e293b !important;
      }

      .it-theme-reset-btn {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 6px 12px !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        background: none !important;
        border: none !important;
        border-radius: 6px !important;
        color: #64748b !important;
        cursor: pointer !important;
        transition: background-color 0.2s, color 0.2s !important;
      }
      .it-theme-reset-btn:hover {
        background-color: #f1f5f9 !important;
        color: #1e293b !important;
      }
      .dark .it-theme-reset-btn:hover, [data-theme="dark"] .it-theme-reset-btn:hover {
        background-color: #1e293b !important;
        color: #f8fafc !important;
      }

      .it-theme-done-btn {
        padding: 6px 16px !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        border: none !important;
        border-radius: 6px !important;
        color: #ffffff !important;
        cursor: pointer !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
        transition: transform 0.2s, background-color 0.2s !important;
      }
      .it-theme-done-btn:hover {
        transform: translateY(-1px) !important;
      }

      h1, h2, h3 {
        color: var(--color-heading-default);
      }
    `;

    setShowSavedToast(true);
    const timer = setTimeout(() => setShowSavedToast(false), 1500);
    return () => clearTimeout(timer);
  }, [palette, resolvedTheme]);

  const updateColor = (key: string, value: string) => {
    setPaletteState((prev) => {
      if (key.includes(".")) {
        const [section, subKey] = key.split(".");
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof ITThemePalette] as Record<
              string,
              string
            >),
            [subKey]: value,
          },
        };
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const applyPreset = (colors: ITThemePalette) => {
    setPaletteState(colors);
  };

  const resetTheme = () => {
    const basePalette = {
      ...DEFAULT_PALETTE,
      ...theme,
      layout: { ...DEFAULT_PALETTE.layout, ...theme?.layout },
      table: { ...DEFAULT_PALETTE.table, ...theme?.table },
    };
    setPaletteState(basePalette as ITThemePalette);
  };

  const renderColorRow = (key: string) => {
    const isNested = key.includes(".");
    const displayLabel = isNested ? key.split(".")[1] : key;
    const value = getNestedValue(palette, key);

    return (
      <div
        key={key}
        className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 gap-2"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer flex items-center justify-center shadow-inner flex-shrink-0">
            <input
              type="color"
              value={value}
              onChange={(e) => updateColor(key, e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: value }}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 truncate">
              {displayLabel}
            </span>
            <span className="font-mono text-[9px] text-slate-400">{value}</span>
          </div>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => updateColor(key, e.target.value)}
          placeholder="#000000"
          className="w-20 px-2 py-1 text-xs font-mono text-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none focus:border-cyan-500"
        />
      </div>
    );
  };

  return (
    <ITThemeContext.Provider
      value={{
        palette,
        colors: palette,
        setPalette: setPaletteState,
        updateColor,
        resetTheme,
        applyPreset,
        resolvedTheme,
        darkModeMode,
        setDarkModeMode,
      }}
    >
      {children}

      {/* FAB (Floating Action Button) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="it-theme-fab it-theme-bounce"
        style={{
          backgroundColor: "var(--color-primary)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary)";
        }}
        aria-label="Configurar Paleta de Colores"
        title="Configurar Paleta de Colores"
      >
        <MdPalette style={{ width: "28px", height: "28px" }} />
      </button>

      {/* Dialog Configurator */}
      <ITDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Diseñador de Temas ITTheme"
        useFormHeader={true}
        className="max-w-2xl w-full"
      >
        <div className="flex flex-col gap-4 text-slate-800 dark:text-slate-100">
          {/* Saved Toast Indicator */}
          <div className="h-6 relative">
            {showSavedToast && (
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-500 border border-green-500/20 animate-fade-in-out">
                  <MdCheck className="w-4 h-4" />
                  Auto-guardado en LocalStorage
                </span>
              </div>
            )}
          </div>

          {/* Row for presets & appearance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Apariencia
              </h4>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit gap-1">
                {(["light", "dark", "system"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDarkModeMode(mode)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      darkModeMode === mode
                        ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    }`}
                  >
                    {mode === "light"
                      ? "Claro"
                      : mode === "dark"
                        ? "Oscuro"
                        : "Sistema"}
                  </button>
                ))}
              </div>

              {/* Mis Temas */}
              {customPresets.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Mis Temas Guardados
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 max-h-[110px] overflow-y-auto pr-1">
                    {customPresets.map((preset) => {
                      const isSelected =
                        JSON.stringify(preset.colors) ===
                        JSON.stringify(palette);
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => applyPreset(preset.colors)}
                          className={`relative flex flex-col items-start p-2 rounded-lg border text-left transition-all group ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-400/5 shadow-sm"
                              : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <span
                            onClick={(e) => handleDeletePreset(preset.name, e)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-red-500/10 hover:text-red-500 text-slate-400 dark:text-slate-500 cursor-pointer transition-all z-10"
                            title="Eliminar Tema"
                          >
                            <MdClose className="w-3 h-3" />
                          </span>
                          <span className="text-[10px] font-semibold truncate w-full mb-1 pr-4">
                            {preset.name}
                          </span>
                          <div className="flex gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.colors.primary }}
                            />
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{
                                backgroundColor: preset.colors.secondary,
                              }}
                            />
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.colors.ternary }}
                            />
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset.colors.success }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Ajustes Rápidos (Presets)
              </h4>
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                {/* Oficiales */}
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map((preset) => {
                    const isSelected =
                      JSON.stringify(preset.colors) === JSON.stringify(palette);
                    return (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset.colors)}
                        className={`flex flex-col items-start p-2 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-400/5 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <span className="text-[10px] font-semibold truncate w-full mb-1">
                          {preset.name}
                        </span>
                        <div className="flex gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10"
                            style={{ backgroundColor: preset.colors.primary }}
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10"
                            style={{ backgroundColor: preset.colors.secondary }}
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10"
                            style={{ backgroundColor: preset.colors.ternary }}
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10"
                            style={{ backgroundColor: preset.colors.success }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ITTabs content */}
          <div className="mt-2">
            <ITTabs
              variant="pill"
              items={[
                {
                  id: "brand",
                  label: "Colores de Marca",
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 mt-2">
                      {[
                        "primary",
                        "secondary",
                        "ternary",
                        "danger",
                        "success",
                        "info",
                        "alert",
                        "warning",
                      ].map((key) => renderColorRow(key))}
                    </div>
                  ),
                },
                {
                  id: "layout",
                  label: "Sidebar & Topbar",
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 mt-2">
                      {[
                        "layout.sidebarBg",
                        "layout.sidebarText",
                        "layout.navbarBg",
                        "layout.navbarText",
                      ].map((key) => renderColorRow(key))}
                    </div>
                  ),
                },
                {
                  id: "tables",
                  label: "Tablas",
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 mt-2">
                      {[
                        "table.headerBg",
                        "table.headerText",
                        "table.rowBg",
                        "table.rowText",
                      ].map((key) => renderColorRow(key))}
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* Inline Save Preset Area */}
          {isSavingPreset && (
            <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 mt-2">
              <input
                type="text"
                placeholder="Nombre de tu tema..."
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:border-cyan-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSavePreset();
                  if (e.key === "Escape") {
                    setIsSavingPreset(false);
                    setNewPresetName("");
                  }
                }}
              />
              <button
                onClick={handleSavePreset}
                disabled={!newPresetName.trim()}
                className="px-3 py-1.5 text-xs font-bold rounded-md bg-cyan-600 dark:bg-cyan-500 text-white hover:bg-cyan-700 dark:hover:bg-cyan-600 disabled:opacity-50 transition-all"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setIsSavingPreset(false);
                  setNewPresetName("");
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-2">
            <div className="flex gap-2">
              <button
                onClick={resetTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all"
              >
                <MdRefresh className="w-4 h-4" />
                Restaurar por Defecto
              </button>

              {!isSavingPreset && (
                <button
                  onClick={() => setIsSavingPreset(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-cyan-250 dark:border-cyan-850 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-all"
                >
                  <MdPalette className="w-4 h-4" />
                  Guardar Tema
                </button>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 text-xs font-bold rounded-md bg-cyan-600 dark:bg-cyan-500 text-white hover:bg-cyan-700 dark:hover:bg-cyan-600 shadow-sm transition-all"
            >
              Aceptar
            </button>
          </div>
        </div>
      </ITDialog>
    </ITThemeContext.Provider>
  );
}
