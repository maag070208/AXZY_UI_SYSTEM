/**
 * Marca axzydev para el sitio (sandbox + portafolio).
 *
 * Vive en `src/sandbox/` a propósito: es chrome del sitio, **no** un componente
 * publicado. Los assets son los SVG del kit (`axzydev-brand-kit/logos/svg`)
 * copiados a `public/brand/`; no hay dependencias nuevas ni animaciones Lottie.
 *
 * El wordmark elige su variante según el tema resuelto: `logo-color` (tinta
 * navy sobre claro) o `logo-dark` (texto claro sobre oscuro), de modo que el
 * logo se lee en ambos modos sin recolorear nada a mano.
 *
 * @example
 * ```tsx
 * <AxzyLogo variante="icono" tamano={24} />            // navbar / topbar
 * <AxzyLogo variante="wordmark" tamano={260} />        // hero / footer
 * <AxzyLogo variante="loader" tamano={40} etiqueta="Cargando" />
 * ```
 */

import { useITThemeSafe } from "@/theme/theme-context";

/** Forma del logo: solo ícono, wordmark completo o loader de marca. */
export type AxzyLogoVariante = "icono" | "wordmark" | "loader";

/** Props de `AxzyLogo`. */
export interface AxzyLogoProps {
  /** Forma del logo. @default "wordmark" */
  variante?: AxzyLogoVariante;
  /** Ancho en píxeles. El alto se calcula solo por la proporción del SVG. @default 28 (icono/loader) · 240 (wordmark) */
  tamano?: number;
  /** Fuerza el tono del wordmark en lugar de seguir el tema. */
  tono?: "claro" | "oscuro";
  /**
   * Texto alternativo del logo. Por defecto `"axzydev"` para el wordmark y
   * `""` (decorativo) para el ícono, que suele ir acompañado del nombre.
   */
  etiqueta?: string;
  /** Clases del elemento raíz. */
  className?: string;
  /** Anima el ícono con un latido suave cuando `variante="loader"`. Respeta `prefers-reduced-motion`. */
  latido?: boolean;
}

/** Ruta del asset según la forma y el tono. */
const ASSETS: Record<AxzyLogoVariante, { claro: string; oscuro: string }> = {
  icono: { claro: "/brand/icon.svg", oscuro: "/brand/icon.svg" },
  wordmark: { claro: "/brand/logo-color.svg", oscuro: "/brand/logo-dark.svg" },
  loader: { claro: "/brand/icon.svg", oscuro: "/brand/icon.svg" },
};

/** Alto por defecto según la forma (el wordmark es 621×208). */
const ALTO_POR_TAMANO: Record<AxzyLogoVariante, number> = {
  icono: 28,
  wordmark: 240,
  loader: 40,
};

/**
 * Marca axzydev del sitio: SVG del kit, conmutada por tema y sin dependencias.
 *
 * @example
 * ```tsx
 * <AxzyLogo variante="icono" tamano={24} />
 * <AxzyLogo variante="wordmark" tamano={260} className="mb-6" />
 * ```
 */
export const AxzyLogo = ({
  variante = "wordmark",
  tamano,
  tono,
  etiqueta,
  className = "",
  latido = true,
}: AxzyLogoProps) => {
  const contexto = useITThemeSafe();
  const modo = tono ?? (contexto?.resolvedTheme === "dark" ? "oscuro" : "claro");
  const ancho = tamano ?? ALTO_POR_TAMANO[variante];

  // El ícono mide 128×128; el wordmark, 621×208. El alto sale de la proporción.
  const alto = variante === "icono" || variante === "loader" ? ancho : Math.round((ancho * 208) / 621);
  const decorativo = etiqueta === "" || (etiqueta === undefined && variante !== "wordmark");
  const alt = etiqueta ?? (variante === "wordmark" ? "axzydev" : "");

  return (
    <img
      src={ASSETS[variante][modo]}
      width={ancho}
      height={alto}
      alt={alt}
      aria-hidden={decorativo || undefined}
      draggable={false}
      className={[
        "select-none",
        variante === "loader" && latido ? "it-logo-latido" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: ancho, height: alto }}
    />
  );
};

/**
 * Loader de marca: el ícono latiendo con un rótulo mono al lado.
 *
 * Es la versión estática del `loader` del kit (que allí es una animación Lottie)
 * y se apoya en `ITLoader` para la etiqueta y el rol accesible.
 *
 * @example
 * ```tsx
 * <AxzyLoader etiqueta="Cargando componentes" />
 * ```
 */
export const AxzyLoader = ({
  etiqueta,
  tamano = 32,
  className = "",
}: {
  /** Texto que acompaña al ícono. */
  etiqueta?: string;
  /** Ancho del ícono en píxeles. @default 32 */
  tamano?: number;
  /** Clases del contenedor. */
  className?: string;
}) => (
  <span
    role="status"
    aria-live="polite"
    className={`inline-flex items-center gap-3 ${className}`}
  >
    <AxzyLogo variante="loader" tamano={tamano} />
    {etiqueta ? (
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {etiqueta}
      </span>
    ) : null}
  </span>
);
