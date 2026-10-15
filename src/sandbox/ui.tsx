/**
 * Kit de UI de las superficies dev (sandbox `#ui-system` + portafolio `/`).
 *
 * Son las piezas que **no** se usan de la librería publicada porque esta no
 * garantiza contraste AA con la paleta por defecto: `ITButton` relleno queda en
 * 2.4:1, `ITButton color="secondary"` en 3.7:1, `ITBadget` outlined en 2.6:1 y
 * `ITSegmentedControl` en 4.34:1. Aquí el acento se usa en `primary-700`
 * (claro) / `primary-500` (oscuro), que sí pasan.
 *
 * Vive en `src/sandbox/` a propósito: es dev-only y nunca entra en `dist/`.
 * Sigue `DESIGN.md` (AXZY Console): superficies planas con borde de 1px,
 * metadatos en mono, filetes para separar y sombra solo al hover.
 */

import { useState, type ReactNode } from "react";
import { FaCheck, FaCode, FaCopy } from "react-icons/fa";
import { useITTranslation } from "@/i18n";

/** Eyebrow mono apagado: encabezados de sección y etiquetas de metadato. */
export const EYEBROW =
  "font-mono !text-[11px] !font-medium uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400";

/** Filete de 1px: la separación entre bloques. */
export const FILETE = "border-slate-200 dark:border-slate-800";

/** Superficie de tarjeta: borde 1px, radio 14px, sin sombra en reposo. */
export const CARD =
  "rounded-[14px] border border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900";

/** Refuerzo al hover de las tarjetas: borde acento, lift de 2px y sombra suave. */
export const CARD_HOVER =
  "hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] dark:hover:border-primary-500";

/** Chip mono chico para stack y metadatos. */
export const CHIP =
  "rounded-[6px] border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400";

/**
 * Variantes visuales de los CTA. `outlined` es el borde de acento (segundo CTA
 * de un bloque) y `neutral` el ghost de tinta para acciones que no compiten
 * (volver, cerrar).
 */
export type VarianteCta = "filled" | "outlined" | "neutral" | "text";

/** Tamaños de los CTA (mismos paddings y tipografía que `ITButton`). */
export type TamanoCta = "sm" | "md" | "lg";

/** Padding y tipografía por tamaño (idénticos a `ITButton`). */
export const TAMANO_CTA: Record<TamanoCta, string> = {
  sm: "text-xs px-2.5 py-1",
  md: "text-[13px] px-3.5 py-1.5",
  lg: "text-sm px-4 py-2",
};

/**
 * Color por variante. El relleno usa `primary-700` (5.05:1 con blanco) porque
 * el `primary-600` de la paleta resuelta se queda en 3.3:1.
 */
export const VARIANTE_CTA: Record<VarianteCta, string> = {
  filled:
    "border border-transparent bg-primary-700 text-white shadow-sm hover:bg-primary-800",
  outlined:
    "border border-primary-700 text-primary-700 hover:bg-primary-700/10 dark:border-primary-500 dark:text-primary-500",
  neutral:
    "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
  text: "border border-transparent text-primary-700 hover:bg-primary-700/10 dark:text-primary-500",
};

/** Foco compartido por todos los CTA (anillo del acento, offset del lienzo). */
export const FOCO_CTA =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa] dark:focus-visible:ring-offset-[#0b0d10]";

/** Props de `EnlaceBoton`. */
export interface EnlaceBotonProps {
  /** Destino. Interno (`#...`, `/...`) o externo (`https://...`). */
  href: string;
  /** Texto visible del enlace. */
  children: ReactNode;
  /** Estilo visual. @default "filled" */
  variante?: VarianteCta;
  /** Tamaño. @default "md" */
  tamano?: TamanoCta;
  /** Ícono a la izquierda del texto. */
  icono?: ReactNode;
  /** Fuerza abrir en pestaña nueva. Por defecto se deduce de `href`. */
  externo?: boolean;
  /** Marca la descarga (`download`) para archivos propios. */
  descargar?: boolean;
  /** Clases extra. */
  className?: string;
  /** Nombre accesible cuando el texto visible no alcanza. */
  ariaLabel?: string;
}

/**
 * CTA que **es un enlace de verdad**: `ITButton` renderiza un `<button>`, así que
 * envolverlo en `<a>` producía interactivos anidados (HTML inválido y fallo
 * `nested-interactive` en axe). Esta pieza conserva el aspecto del botón, pero
 * mantiene la semántica de enlace: clic central, "abrir en pestaña nueva", menú
 * contextual y URL en la barra de estado.
 *
 * @example
 * ```tsx
 * <EnlaceBoton href={GITHUB_URL} variante="outlined" icono={<FaGithub size={12} />}>
 *   GitHub
 * </EnlaceBoton>
 * ```
 */
export const EnlaceBoton = ({
  href,
  children,
  variante = "filled",
  tamano = "md",
  icono,
  externo,
  descargar = false,
  className = "",
  ariaLabel,
}: EnlaceBotonProps) => {
  const esExterno = externo ?? /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(esExterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(descargar ? { download: "" } : {})}
      aria-label={ariaLabel}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[10px] font-semibold transition-colors duration-200 ${FOCO_CTA} ${TAMANO_CTA[tamano]} ${VARIANTE_CTA[variante]} ${className}`}
    >
      {icono && <span className="flex-shrink-0">{icono}</span>}
      <span>{children}</span>
    </a>
  );
};

/** Props de `BotonAccion`. */
export interface BotonAccionProps {
  /** Acción al pulsar. */
  onClick: () => void;
  /** Texto visible. */
  children: ReactNode;
  /** Estilo visual. @default "neutral" */
  variante?: VarianteCta;
  /** Tamaño. @default "md" */
  tamano?: TamanoCta;
  /** Ícono a la izquierda. */
  icono?: ReactNode;
  /** Clases extra. */
  className?: string;
}

/**
 * Acción que **no** navega (volver, abrir una pestaña interna): mismo aspecto que
 * `EnlaceBoton` pero con semántica de botón.
 *
 * @example
 * ```tsx
 * <BotonAccion onClick={onBack} icono={<FaArrowLeft size={12} />}>Volver</BotonAccion>
 * ```
 */
export const BotonAccion = ({
  onClick,
  children,
  variante = "neutral",
  tamano = "md",
  icono,
  className = "",
}: BotonAccionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[10px] font-semibold transition-colors duration-200 ${FOCO_CTA} ${TAMANO_CTA[tamano]} ${VARIANTE_CTA[variante]} ${className}`}
  >
    {icono && <span className="flex-shrink-0">{icono}</span>}
    <span>{children}</span>
  </button>
);

/** Props de `Etiqueta`. */
export interface EtiquetaProps {
  /** Texto de la etiqueta (tipo, estado…). */
  children: ReactNode;
  /** Clases extra. */
  className?: string;
}

/**
 * Píldora de metadato con el acento del proyecto.
 *
 * Sustituye a `ITBadget`: el badge del tema resuelve su color desde la paleta y
 * con la paleta por defecto queda en 2.6:1 sobre las tarjetas oscuras.
 *
 * @example
 * ```tsx
 * <Etiqueta>Librería</Etiqueta>
 * ```
 */
export const Etiqueta = ({ children, className = "" }: EtiquetaProps) => (
  <span
    className={`shrink-0 rounded-full border border-primary-800/45 px-2 py-[3px] text-[11px] font-semibold text-primary-800 dark:border-primary-500/45 dark:text-primary-500 ${className}`}
  >
    {children}
  </span>
);

/**
 * Encabezado de sección de la hoja: `NN — ETIQUETA`, título display y apoyo,
 * con acciones opcionales a la derecha.
 *
 * @example
 * ```tsx
 * <SectionHeading index={2} label="Catálogo" title="Explora por familia" subtitle="…" />
 * ```
 */
export const SectionHeading = ({
  index,
  label,
  title,
  subtitle,
  actions,
  className = "",
}: {
  /** Índice de sección (0-based; se pinta con dos dígitos). */
  index: number;
  /** Etiqueta mono corta. */
  label: string;
  /** Título display. */
  title: string;
  /** Frase de apoyo. */
  subtitle?: string;
  /** Contenido alineado a la derecha. */
  actions?: ReactNode;
  /** Clases extra. */
  className?: string;
}) => (
  <div
    className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}
  >
    <div className="min-w-0">
      <p className={EYEBROW}>
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        {` — ${label}`}
      </p>
      <h2 className="mt-2.5 font-display text-[26px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white sm:text-[32px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>
);

/**
 * Enlace externo mono en línea (GitHub, npm, docs). Mantiene el acento AA y se
 * subraya al hover.
 *
 * @example
 * ```tsx
 * <EnlaceMono href={GITHUB_URL} icono={<FaGithub size={11} />}>GitHub</EnlaceMono>
 * ```
 */
export const EnlaceMono = ({
  href,
  children,
  icono,
  className = "",
}: {
  /** Destino (normalmente externo). */
  href: string;
  /** Texto visible. */
  children: ReactNode;
  /** Ícono a la izquierda. */
  icono?: ReactNode;
  /** Clases extra. */
  className?: string;
}) => (
  <a
    href={href}
    {...(/^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className={`inline-flex items-center gap-1.5 font-mono !text-[11px] uppercase !tracking-[0.14em] !text-primary-700 transition-colors hover:underline dark:!text-primary-500 ${className}`}
  >
    {icono}
    {children}
  </a>
);

/**
 * Botón mono de «copiar al portapapeles» con confirmación de dos segundos.
 *
 * @example
 * ```tsx
 * <BotonCopiar texto="pnpm add @axzydev/axzy_ui_system" />
 * ```
 */
export const BotonCopiar = ({
  texto,
  className = "",
}: {
  /** Texto que se copia. */
  texto: string;
  /** Clases extra. */
  className?: string;
}) => {
  const { t } = useITTranslation();
  const [copiado, setCopiado] = useState(false);

  const copiar = () => {
    navigator.clipboard?.writeText(texto);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copiar}
      className={`inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white ${className}`}
    >
      {copiado ? (
        <FaCheck size={10} className="text-primary-700 dark:text-primary-500" />
      ) : (
        <FaCopy size={10} />
      )}
      {copiado ? t("showcase.layout.copied") : t("showcase.layout.copy")}
    </button>
  );
};

/**
 * Bloque de código: fondo tinta, mono, etiqueta del archivo y botón de copiar.
 * El acento de señal (`cyan-400`) solo se usa aquí, como manda el spec.
 *
 * @example
 * ```tsx
 * <BloqueCodigo filename="vite.config.ts" code={`export default defineConfig({})`} />
 * ```
 */
export const BloqueCodigo = ({
  code,
  filename,
  compact = false,
  className = "",
}: {
  /** Código a mostrar. */
  code: string;
  /** Etiqueta mono de la esquina (archivo o lenguaje). */
  filename?: string;
  /** Limita la altura con scroll vertical. */
  compact?: boolean;
  /** Clases extra. */
  className?: string;
}) => (
  <div
    className={`overflow-hidden rounded-[10px] border border-slate-800 bg-slate-950 ${className}`}
  >
    <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-2.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-400">
        {filename ?? "code"}
      </span>
      <BotonCopiar
        texto={code}
        className="text-slate-400 hover:bg-slate-800 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      />
    </div>
    <pre
      tabIndex={0}
      className={`overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-slate-200 ${
        compact ? "max-h-[420px] overflow-y-auto" : ""
      }`}
    >
      <code>{code}</code>
    </pre>
  </div>
);

/** Props de `EjemploContenedor`. */
export interface EjemploContenedorProps {
  /** Número del ejemplo (`01`, `02`…). Opcional. */
  numero?: string;
  /** Título del ejemplo (mono, mayúsculas). */
  titulo: string;
  /** El demo. */
  children: ReactNode;
  /** Código fuente del ejemplo: si se pasa, aparece el botón «Código». */
  codigo?: string;
  /** Nota al pie, bajo el demo. */
  nota?: string;
  /** Superficie del demo sin padding (layouts completos). */
  sangrado?: boolean;
  /** Clases extra de la superficie del demo. */
  className?: string;
}

/**
 * Contenedor de un ejemplo del sandbox: cabecera con número, título y la acción
 * de ver el código (siempre visible), superficie del demo y nota opcional. El
 * código se despliega **dentro** del mismo contenedor, no en una pestaña aparte.
 *
 * @example
 * ```tsx
 * <EjemploContenedor numero="01" titulo="Con icono" codigo={code}>
 *   <ITButton icon={<FaSave />}>Guardar</ITButton>
 * </EjemploContenedor>
 * ```
 */
export const EjemploContenedor = ({
  numero,
  titulo,
  children,
  codigo,
  nota,
  sangrado = false,
  className = "",
}: EjemploContenedorProps) => {
  const { t } = useITTranslation();
  const [verCodigo, setVerCodigo] = useState(false);

  return (
    <section className={`overflow-hidden rounded-[10px] border ${FILETE}`}>
      <header
        className={`flex flex-wrap items-center gap-x-3 gap-y-2 border-b bg-slate-50/70 px-4 py-2.5 dark:bg-slate-950/40 ${FILETE}`}
      >
        {numero && (
          <span className="font-mono text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
            {numero}
          </span>
        )}
        <h2 className="min-w-0 flex-1 truncate font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-700 dark:text-slate-200">
          {titulo}
        </h2>

        {codigo && (
          <button
            type="button"
            onClick={() => setVerCodigo(!verCodigo)}
            aria-expanded={verCodigo}
            className={`inline-flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 ${
              verCodigo
                ? "border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-500"
                : "border-slate-200 text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <FaCode size={10} />
            {verCodigo ? t("showcase.layout.hideCode") : t("showcase.layout.viewCode")}
          </button>
        )}
      </header>

      <div
        className={`bg-white dark:bg-slate-950 ${sangrado ? "" : "p-5 sm:p-6"} ${className}`}
      >
        {children}
      </div>

      {nota && (
        <p
          className={`border-t px-4 py-2.5 font-mono text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 ${FILETE}`}
        >
          {nota}
        </p>
      )}

      {codigo && verCodigo && (
        <div className={`border-t p-3 ${FILETE}`}>
          <BloqueCodigo code={codigo} compact />
        </div>
      )}
    </section>
  );
};
