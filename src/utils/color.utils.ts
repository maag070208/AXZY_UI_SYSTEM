import { ITThemePalette } from "@/components/theme-provider/themeProvider.props";

/**
 * Determina si un color hexadecimal es claro.
 */
export const isLightColor = (hex: string): boolean => {
  if (!hex || typeof hex !== "string") return false;
  const color = hex.replace("#", "");
  let r = 0, g = 0, b = 0;
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

/**
 * Traduce un valor de color de CSS (hexadecimal o variable var(--...)) a hexadecimal absoluto.
 */
export const resolveCssColor = (
  colorStr: string,
  palette?: ITThemePalette,
  isDarkMode?: boolean
): string => {
  if (!colorStr) return "#ffffff";
  const cleanColor = colorStr.trim();
  if (cleanColor.startsWith("#")) return cleanColor;

  if (cleanColor.includes("var(")) {
    const match = cleanColor.match(/var\(([^,)]+)(?:,\s*([^)]+))?\)/);
    if (match) {
      const varName = match[1].trim();
      const fallback = match[2]?.trim();

      if (varName === "--color-primary" || varName.includes("primary-500")) {
        return palette?.primary || "#06b6d4";
      }
      if (varName.includes("primary")) {
        return palette?.primary || "#06b6d4";
      }
      if (varName === "--color-secondary" || varName.includes("secondary-500")) {
        return palette?.secondary || "#6b7280";
      }
      if (varName.includes("secondary")) {
        return palette?.secondary || "#6b7280";
      }
      if (varName.includes("ternary")) {
        return palette?.ternary || "#8b5cf6";
      }
      if (varName.includes("danger")) {
        return palette?.danger || "#ef4444";
      }
      if (varName.includes("success")) {
        return palette?.success || "#22c55e";
      }
      if (varName.includes("info")) {
        return palette?.info || "#3b82f6";
      }
      if (varName.includes("warning")) {
        return palette?.warning || "#eab308";
      }
      if (varName.includes("alert")) {
        return palette?.alert || "#f97316";
      }
      if (varName.includes("card-bg")) {
        return isDarkMode ? "#111827" : "#ffffff";
      }
      if (varName.includes("modal-bg")) {
        return isDarkMode ? "#111827" : "#ffffff";
      }

      if (fallback) {
        return resolveCssColor(fallback, palette, isDarkMode);
      }
    }
  }

  return "#ffffff";
};

/**
 * Obtiene la clase de color de texto óptima (blanca o gris oscuro) basado en el fondo.
 */
export const getContrastTextColor = (
  bgColor: string,
  palette?: ITThemePalette,
  isDarkMode?: boolean
): "text-white" | "text-slate-800" => {
  const resolvedColor = resolveCssColor(bgColor, palette, isDarkMode);
  return isLightColor(resolvedColor) ? "text-slate-800" : "text-white";
};
