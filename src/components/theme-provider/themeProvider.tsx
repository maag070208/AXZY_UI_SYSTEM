import React, { createContext, useContext, useState, useEffect } from "react";
import { MdPalette, MdClose, MdRefresh } from "react-icons/md";
import { ITThemeProviderProps, ITThemePalette } from "./themeProvider.props";
import ITDialog from "../dialog/dialog";
import ITTabs from "../tabs/tabs";
import ITButton from "../button/button";
import ITInput from "../input/input";
import ITSegmentedControl from "../segmented-control/segmented-control";
import ITDivider from "../divider/divider";
import ITText from "@/components/text/text";

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
  showFab = true,
}: ITThemeProviderProps) {
  const [palette, setPaletteState] = useState<ITThemePalette>(() => {
    const basePalette = {
      ...DEFAULT_PALETTE,
      ...theme,
      layout: { ...DEFAULT_PALETTE.layout, ...theme?.layout },
      table: { ...DEFAULT_PALETTE.table, ...theme?.table },
    };
    if (!showFab) {
      return basePalette as ITThemePalette;
    }
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

  // Sync palette with theme prop when showFab is false
  useEffect(() => {
    if (!showFab) {
      setPaletteState({
        ...DEFAULT_PALETTE,
        ...theme,
        layout: { ...DEFAULT_PALETTE.layout, ...theme?.layout },
        table: { ...DEFAULT_PALETTE.table, ...theme?.table },
      });
    }
  }, [theme, showFab]);

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
    if (showFab) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
    }

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
        --color-text-default: var(--color-secondary-900);
        --color-text-muted: var(--color-secondary-600);

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
        --topbar-user-bg: var(--topbar-bg);
        --topbar-user-hover: color-mix(in srgb, var(--color-navbarText) 10%, transparent);
        --topbar-user-text: var(--color-navbarText);
        --topbar-user-subtitle: color-mix(in srgb, var(--color-navbarText) 65%, transparent);
        --topbar-user-dropdown-bg: color-mix(in srgb, var(--color-navbarBg) 100%, #ffffff);
        --topbar-user-dropdown-border: color-mix(in srgb, var(--color-navbarBg) 92%, #000000);
        --topbar-user-item-hover: color-mix(in srgb, var(--color-navbarText) 6%, transparent);

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
        --color-text-default: #cbd5e1;
        --color-text-muted: #64748b;
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
        --color-text-default: #1e293b;
        --color-text-muted: #475569;
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

  const ColorRow = ({ colorKey }: { colorKey: string }) => {
    const isNested = colorKey.includes(".");
    const label = isNested ? colorKey.split(".")[1] : colorKey;
    const value = getNestedValue(palette, colorKey);

    return (
      <div
        key={colorKey}
        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 gap-3 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer flex-shrink-0 shadow-sm hover:scale-105 transition-transform">
            <input
              type="color"
              value={value}
              onChange={(e) => updateColor(colorKey, e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-full h-full" style={{ backgroundColor: value }} />
          </div>
          <div className="flex flex-col min-w-0">
            <ITText as="span" className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate capitalize">
              {label.replace(/([A-Z])/g, " $1").trim()}
            </ITText>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="w-3 h-3 rounded-full border border-slate-200 dark:border-slate-600"
                style={{ backgroundColor: value }}
              />
              <ITText as="span" className="font-mono text-[11px] text-slate-400">{value}</ITText>
            </div>
          </div>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => updateColor(colorKey, e.target.value)}
          className="w-24 px-2.5 py-1.5 text-xs font-mono text-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
        />
      </div>
    );
  };

  const PresetCard = ({
    preset,
    isCustom,
  }: {
    preset: { name: string; colors: ITThemePalette };
    isCustom?: boolean;
  }) => {
    const isSelected =
      JSON.stringify(preset.colors) === JSON.stringify(palette);
    return (
      <button
        type="button"
        onClick={() => applyPreset(preset.colors)}
        className={`relative flex flex-col items-start p-2.5 rounded-xl border text-left transition-all group ${
          isSelected
            ? "border-primary-500 bg-primary-500/5 shadow-sm ring-1 ring-primary-500/20"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        {isCustom && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePreset(preset.name, e);
            }}
            className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-0.5 rounded-md hover:bg-red-500/10 hover:text-red-500 text-slate-400 dark:text-slate-500 cursor-pointer transition-all z-10"
            title="Eliminar"
          >
            <MdClose size={12} />
          </span>
        )}
        <ITText as="span" className="text-xs font-semibold truncate w-full mb-1.5 pr-4 text-slate-700 dark:text-slate-300">
          {preset.name}
        </ITText>
        <div className="flex gap-1">
          {(["primary", "secondary", "ternary", "success"] as const).map((c) => (
            <span
              key={c}
              className="w-3 h-3 rounded-full border border-black/10"
              style={{ backgroundColor: preset.colors[c] }}
            />
          ))}
        </div>
      </button>
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

      {showFab && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="it-theme-fab it-theme-bounce"
          style={{ backgroundColor: "var(--color-primary)" }}
          aria-label="Configurar Paleta de Colores"
        >
          <MdPalette size={28} />
        </button>
      )}

      {showFab && (
        <ITDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Diseñador de Temas"
          useFormHeader
        >
          <div className="flex gap-6 h-[580px]">
            {/* LEFT: Mode + Presets */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-5 overflow-y-auto pr-1">
              <div>
                <ITText as="span" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 block">
                  Apariencia
                </ITText>
                <ITSegmentedControl
                  options={[
                    { value: "light", label: "☀️" },
                    { value: "dark", label: "🌙" },
                    { value: "system", label: "💻" },
                  ]}
                  value={darkModeMode}
                  onChange={(val) => setDarkModeMode(val as "dark" | "light" | "system")}
                  size="sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <ITText as="span" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Presets
                  </ITText>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => (
                    <PresetCard key={preset.name} preset={preset} />
                  ))}
                </div>
              </div>

              {customPresets.length > 0 && (
                <div>
                  <ITText as="span" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 block">
                    Mis Temas
                  </ITText>
                  <div className="flex flex-col gap-1.5">
                    {customPresets.map((preset) => (
                      <PresetCard key={preset.name} preset={preset} isCustom />
                    ))}
                  </div>
                </div>
              )}

              {/* Save preset inline */}
              {isSavingPreset && (
                <div className="flex flex-col gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
                  <ITInput
                    name="presetName"
                    placeholder="Nombre del tema..."
                    value={newPresetName}
                    onChange={(e: any) => setNewPresetName(e.target.value)}
                    containerClassName="mb-0"
                    className="text-xs"
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter") handleSavePreset();
                      if (e.key === "Escape") {
                        setIsSavingPreset(false);
                        setNewPresetName("");
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <ITButton
                      label="Guardar"
                      color="primary"
                      onClick={handleSavePreset}
                      disabled={!newPresetName.trim()}
                      size="small"
                      className="flex-1"
                    />
                    <ITButton
                      label="X"
                      variant="ghost"
                      onClick={() => {
                        setIsSavingPreset(false);
                        setNewPresetName("");
                      }}
                      size="small"
                    />
                  </div>
                </div>
              )}

              {!isSavingPreset && (
                <ITButton
                  variant="outlined"
                  icon={<MdPalette size={14} />}
                  label="Guardar actual"
                  onClick={() => setIsSavingPreset(true)}
                  size="small"
                />
              )}

              <ITButton
                variant="outlined"
                color="danger"
                icon={<MdRefresh size={14} />}
                label="Restaurar default"
                onClick={resetTheme}
                size="small"
              />
            </div>

            <ITDivider orientation="vertical" />

            {/* RIGHT: Color editor */}
            <div className="flex-1 flex flex-col min-w-0">
              <ITTabs
                variant="pill"
                items={[
                  {
                    id: "brand",
                    label: "Marca",
                    content: (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-2 mt-3">
                        {[
                          "primary",
                          "secondary",
                          "ternary",
                          "danger",
                          "success",
                          "info",
                          "alert",
                          "warning",
                        ].map((key) => (
                          <ColorRow key={key} colorKey={key} />
                        ))}
                      </div>
                    ),
                  },
                  {
                    id: "layout",
                    label: "Nav & Sidebar",
                    content: (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-2 mt-3">
                        {[
                          "layout.sidebarBg",
                          "layout.sidebarText",
                          "layout.navbarBg",
                          "layout.navbarText",
                        ].map((key) => (
                          <ColorRow key={key} colorKey={key} />
                        ))}
                      </div>
                    ),
                  },
                  {
                    id: "tables",
                    label: "Tablas",
                    content: (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-2 mt-3">
                        {[
                          "table.headerBg",
                          "table.headerText",
                          "table.rowBg",
                          "table.rowText",
                        ].map((key) => (
                          <ColorRow key={key} colorKey={key} />
                        ))}
                      </div>
                    ),
                  },
                ]}
              />

              <div className="flex items-center justify-end gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <ITText as="p" className="text-[11px] text-slate-400 mr-auto">
                  Los cambios se guardan automáticamente
                </ITText>
                <ITButton
                  label="Cerrar"
                  color="primary"
                  onClick={() => setIsOpen(false)}
                  size="small"
                />
              </div>
            </div>
          </div>
        </ITDialog>
      )}
    </ITThemeContext.Provider>
  );
}
