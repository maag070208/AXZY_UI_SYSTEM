/**
 * Configuración global del sandbox, leída de `/axzy.json`.
 *
 * El archivo es la fuente de verdad de lo que **no** es pantalla: tema, densidad,
 * radios, sombras y apariencia. Se aplica al `ITThemeProvider` del host, así que
 * cambiar un valor en el JSON cambia todo el sistema sin tocar código.
 *
 * El merge es puro y tolerante: lo que falte o venga mal se queda con el default.
 */

import type { ITThemeAppearance, ITThemePalette } from "../index";

/** Lo que se puede configurar globalmente desde `axzy.json`. */
export interface AxzyConfig {
  /** Paleta parcial: se mezcla con la del sistema. */
  theme: Partial<ITThemePalette>;
  /** Densidad global (0.5–1.5). */
  density: number;
  /** Radio global en px (0–24). */
  radius: number;
  /** Nivel de sombra (0–3). */
  shadow: number;
  /** Lenguaje visual. */
  appearance: ITThemeAppearance;
  /** Muestra el botón flotante del diseñador de tema. */
  showFab: boolean;
}

/** Configuración por defecto del sandbox (lo que se aplica si no hay archivo). */
export const DEFAULT_AXZY_CONFIG: AxzyConfig = {
  theme: {},
  density: 0.98,
  radius: 10,
  shadow: 2,
  appearance: "soft",
  showFab: false,
};

/** Recorta un número a un rango; si no es número, devuelve el default. */
function clamp(value: unknown, min: number, max: number, fallback: number, decimals = 2): number {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  const factor = 10 ** decimals;
  return Math.round(Math.min(max, Math.max(min, value)) * factor) / factor;
}

/**
 * Mezcla la configuración del archivo con los defaults.
 *
 * Nunca lanza: un archivo vacío, roto o con tipos raros deja los defaults.
 *
 * @example
 * mergeAxzyConfig({ radius: 0, density: 1.4 }); // → radius 0, density 1.4, resto default
 */
export function mergeAxzyConfig(raw: unknown): AxzyConfig {
  const entrada = (raw && typeof raw === "object" ? raw : {}) as Partial<AxzyConfig>;
  const tema = (entrada.theme && typeof entrada.theme === "object" ? entrada.theme : {}) as Partial<ITThemePalette>;

  return {
    theme: {
      ...(typeof tema.primary === "string" ? { primary: tema.primary } : {}),
      ...(typeof tema.secondary === "string" ? { secondary: tema.secondary } : {}),
      ...(typeof tema.ternary === "string" ? { ternary: tema.ternary } : {}),
      ...(typeof tema.danger === "string" ? { danger: tema.danger } : {}),
      ...(typeof tema.success === "string" ? { success: tema.success } : {}),
      ...(typeof tema.info === "string" ? { info: tema.info } : {}),
      ...(typeof tema.alert === "string" ? { alert: tema.alert } : {}),
      ...(typeof tema.warning === "string" ? { warning: tema.warning } : {}),
      ...(tema.layout && typeof tema.layout === "object" ? { layout: tema.layout } : {}),
      ...(tema.table && typeof tema.table === "object" ? { table: tema.table } : {}),
    },
    density: clamp(entrada.density, 0.5, 1.5, DEFAULT_AXZY_CONFIG.density),
    radius: clamp(entrada.radius, 0, 24, DEFAULT_AXZY_CONFIG.radius, 0),
    shadow: clamp(entrada.shadow, 0, 3, DEFAULT_AXZY_CONFIG.shadow, 0),
    appearance: entrada.appearance === "flat" || entrada.appearance === "soft" || entrada.appearance === "bento" ? entrada.appearance : DEFAULT_AXZY_CONFIG.appearance,
    showFab: typeof entrada.showFab === "boolean" ? entrada.showFab : DEFAULT_AXZY_CONFIG.showFab,
  };
}
