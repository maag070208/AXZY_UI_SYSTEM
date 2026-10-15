/**
 * Controles de chrome del sandbox: idioma y modo de color.
 *
 * Viven aquí (y no en `showcases/`) porque los usan las dos superficies: la
 * barra del sandbox (`ITTopBar`, en `App.tsx`) y la cabecera del portafolio
 * (`HomeShowcase` / `ProductoDetalle`).
 *
 * No se usa `ITSegmentedControl` de la librería: su opción inactiva queda en
 * 4.34:1 sobre `slate-100` y falla AA con la paleta por defecto. Estas opciones
 * van en `slate-600`/`slate-300` (≥ 7:1) y el activo en `primary-700` con texto
 * blanco (5:1).
 */

import type { ReactNode } from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";
import { useITTranslation } from "@/i18n";
import { useITThemeSafe } from "@/theme/theme-context";
import { useSandboxLocale } from "./locale";

/** Una opción del control segmentado. */
export interface OpcionSegmento {
  /** Valor que emite al pulsarla. */
  value: string;
  /** Texto visible. También es el nombre accesible cuando la opción es solo ícono. */
  label: string;
  /** Ícono opcional; cuando existe, la opción se pinta cuadrada y solo con ícono. */
  icono?: ReactNode;
}

/** Props de `ControlSegmentado`. */
export interface ControlSegmentadoProps {
  /** Opciones mutuamente excluyentes. */
  opciones: OpcionSegmento[];
  /** Valor activo. */
  valor: string;
  /** Se dispara con el valor elegido. */
  onChange: (value: string) => void;
  /** Nombre accesible del grupo. */
  etiqueta: string;
  /** Clases extra del contenedor. */
  className?: string;
  /**
   * Pinta el texto junto al ícono (en vez de solo el ícono) y reparte el ancho
   * entre las opciones. Para barras de pestañas; en controles compactos
   * (cabecera, tema) se deja en `false`.
   * @default false
   */
  conEtiqueta?: boolean;
}

/**
 * Grupo de opciones excluyentes en la lengua visual del proyecto: borde de 1px,
 * mono en mayúsculas y activo relleno del acento.
 *
 * @example
 * ```tsx
 * <ControlSegmentado
 *   etiqueta={t("sandbox.language")}
 *   valor={locale}
 *   onChange={setLocale}
 *   opciones={[{ value: "es", label: "ES" }, { value: "en", label: "EN" }]}
 * />
 * ```
 */
export const ControlSegmentado = ({
  opciones,
  valor,
  onChange,
  etiqueta,
  className = "",
  conEtiqueta = false,
}: ControlSegmentadoProps) => (
  <div
    role="group"
    aria-label={etiqueta}
    className={`inline-flex shrink-0 items-center gap-0.5 rounded-[10px] border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900 ${className}`}
  >
    {opciones.map((opcion) => {
      const activo = opcion.value === valor;
      return (
        <button
          key={opcion.value}
          type="button"
          onClick={() => onChange(opcion.value)}
          aria-pressed={activo}
          title={opcion.label}
          className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-[7px] font-mono text-[10px] font-medium uppercase tracking-[0.1em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 ${
            conEtiqueta ? "flex-1 px-3" : opcion.icono ? "w-7 px-0" : "px-2.5"
          } ${
            activo
              ? "bg-primary-700 text-white dark:bg-primary-500 dark:text-slate-950"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          }`}
        >
          {opcion.icono}
          {conEtiqueta || !opcion.icono ? (
            <span>{opcion.label}</span>
          ) : (
            <span className="sr-only">{opcion.label}</span>
          )}
        </button>
      );
    })}
  </div>
);

/**
 * Selector de idioma (ES/EN). Comparte estado con cualquier otro selector de la
 * página a través de `useSandboxLocale`.
 *
 * @example
 * ```tsx
 * <SelectorIdioma />
 * ```
 */
export const SelectorIdioma = ({ className = "" }: { className?: string }) => {
  const { t } = useITTranslation();
  const { locale, setLocale } = useSandboxLocale();

  return (
    <ControlSegmentado
      className={className}
      etiqueta={t("sandbox.language")}
      valor={locale}
      onChange={(value) => setLocale(value === "en" ? "en" : "es")}
      opciones={[
        { value: "es", label: "ES" },
        { value: "en", label: "EN" },
      ]}
    />
  );
};

/**
 * Selector de modo de color: claro, oscuro o el del sistema. Si no hay
 * `ITThemeProvider` encima no se pinta (no rompe el render aislado).
 *
 * @example
 * ```tsx
 * <SelectorTema />
 * ```
 */
export const SelectorTema = ({ className = "" }: { className?: string }) => {
  const { t } = useITTranslation();
  const theme = useITThemeSafe();

  if (!theme) return null;

  return (
    <ControlSegmentado
      className={className}
      etiqueta={t("sandbox.theme")}
      valor={theme.darkModeMode}
      onChange={(value) =>
        theme.setDarkModeMode(value === "dark" ? "dark" : value === "light" ? "light" : "system")
      }
      opciones={[
        { value: "light", label: t("sandbox.themeLight"), icono: <FaSun size={11} /> },
        { value: "dark", label: t("sandbox.themeDark"), icono: <FaMoon size={11} /> },
        { value: "system", label: t("sandbox.themeSystem"), icono: <FaDesktop size={11} /> },
      ]}
    />
  );
};

/**
 * Par de controles (idioma + tema) tal como se pintan en la cabecera del
 * portafolio.
 *
 * @example
 * ```tsx
 * <header><nav>…<ControlesPortafolio /></nav></header>
 * ```
 */
export const ControlesPortafolio = ({ className = "" }: { className?: string }) => (
  <div className={`flex shrink-0 items-center gap-2 ${className}`}>
    <SelectorIdioma />
    <SelectorTema />
  </div>
);
