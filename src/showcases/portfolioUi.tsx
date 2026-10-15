/**
 * Piezas propias del portafolio (`HomeShowcase` / `ProductoDetalle`).
 *
 * El kit base (tipografía de metadatos, superficies, CTA, etiquetas y controles
 * de cabecera) vive en `src/sandbox/ui.tsx` y `src/sandbox/controls.tsx`, porque
 * lo comparten el sandbox y el portafolio; aquí solo queda lo que es chrome de la
 * hoja: progreso de lectura, salto al contenido y volver arriba.
 *
 * Vive en `src/showcases/` a propósito: es dev-only, nunca entra en `dist/`.
 */

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useITTranslation } from "@/i18n";

/**
 * Se reexporta el kit compartido para que las páginas del portafolio tengan un
 * único punto de importación (`./portfolioUi`).
 */
export {
  BotonAccion,
  CARD,
  CARD_HOVER,
  CHIP,
  EnlaceBoton,
  Etiqueta,
  EYEBROW,
  FILETE,
  SectionHeading,
  VARIANTE_CTA,
} from "@/sandbox/ui";
export type {
  BotonAccionProps,
  EnlaceBotonProps,
  EtiquetaProps,
  TamanoCta,
  VarianteCta,
} from "@/sandbox/ui";
export { ControlesPortafolio, ControlSegmentado } from "@/sandbox/controls";

/** Nombres antiguos del tamaño/variante de CTA, por compatibilidad. */
export type { TamanoCta as TamanoEnlace, VarianteCta as VarianteEnlace } from "@/sandbox/ui";

/**
 * Línea de progreso de lectura: 2px de acento al pie de la cabecera sticky.
 * Es chrome del portafolio, no un componente de la librería: `ITProgress` mide
 * 4px y redondea, demasiado grueso para una regla de cabecera.
 *
 * @example
 * ```tsx
 * <header className="relative sticky top-0 …">
 *   <PortfolioNav />
 *   <BarraProgreso />
 * </header>
 * ```
 */
export const BarraProgreso = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
      <div
        className="h-full bg-primary-700 transition-[width] duration-150 ease-out dark:bg-primary-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

/** Props de `SaltarContenido`. */
export interface SaltarContenidoProps {
  /** Id (con `#`) del bloque principal. @default "#contenido" */
  destino?: string;
}

/**
 * Enlace de salto para teclado (WCAG 2.4.1): invisible hasta que recibe foco y
 * entonces aparece sobre la cabecera sticky.
 *
 * @example
 * ```tsx
 * <SaltarContenido />
 * <main id="contenido">…</main>
 * ```
 */
export const SaltarContenido = ({ destino = "#contenido" }: SaltarContenidoProps) => {
  const { t } = useITTranslation();

  return (
    <a
      href={destino}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-[10px] focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
    >
      {t("showcase.home.skipToContent")}
    </a>
  );
};

/**
 * Botón flotante «volver arriba»: aparece tras desplazarse una pantalla y sube
 * con scroll suave (o instantáneo si el sistema pide movimiento reducido).
 * Mono y con borde de 1px, como el resto de los metadatos del portafolio.
 *
 * @example
 * ```tsx
 * <VolverArriba />
 * ```
 */
export const VolverArriba = () => {
  const { t } = useITTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const subir = () => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={subir}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      className={`fixed bottom-6 right-6 z-[200] inline-flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white/90 px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-700 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-primary-500 dark:hover:text-primary-500 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <FaArrowUp size={11} aria-hidden />
      {t("showcase.home.backToTop")}
    </button>
  );
};
