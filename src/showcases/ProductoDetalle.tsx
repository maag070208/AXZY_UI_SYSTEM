import { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import ITBadget from "../components/atoms/badget/badget";
import ITButton from "../components/atoms/button/button";
import ITFlex from "../components/atoms/flex/flex";
import ITGrid from "../components/atoms/grid/grid";
import ITStack from "../components/atoms/stack/stack";
import ITText from "../components/atoms/text/text";
import ProductoIcono from "./ProductoIcono";
import type { Producto } from "./productos";
import { useITTranslation } from "@/i18n";

interface Props {
  /** Producto que se muestra. */
  producto: Producto;
  /** Vuelve al portafolio. */
  onBack: () => void;
}

/** Muted mono eyebrow used by the section labels. */
const EYEBROW =
  "font-mono !text-[10px] !font-medium uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400";

/** Small mono chip used for the stack tags. */
const CHIP =
  "rounded-[6px] border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400";

/** Technical card surface: 1px border, 14px radius. */
const CARD = "rounded-[14px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900";

/**
 * Página de detalle de un producto del portafolio (`#proyecto/<id>`).
 *
 * Es una **página completa**, no un modal: cabecera propia con volver al
 * portafolio, hero del producto, galería de capturas reales (con miniaturas y
 * pie) y la ficha (qué resuelve, stack y datos técnicos). La URL es compartible
 * y el botón atrás del navegador funciona.
 *
 * @example
 * ```tsx
 * <ProductoDetalle producto={producto} onBack={() => goToPortfolio()} />
 * ```
 */
export default function ProductoDetalle({ producto, onBack }: Props) {
  const { t } = useITTranslation();
  const capturas = producto.capturas ?? [];
  const [activa, setActiva] = useState(capturas[0]);
  const hayGaleria = capturas.length > 0;
  const enlaceExterno = Boolean(producto.enlace && !producto.enlace.startsWith("#"));

  // Cada producto entra por arriba y con su primera captura activa.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setActiva(producto.capturas?.[0]);
  }, [producto]);

  return (
    <>
      {/* Cabecera de la página: volver + migas + enlace */}
      <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex shrink-0 items-center gap-2 rounded-[8px] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
          >
            <FaArrowLeft size={11} />
            {t("showcase.producto.back")}
          </button>
          <span aria-hidden className="text-slate-300 dark:text-slate-700">
            /
          </span>
          <ITText
            as="span"
            className="truncate font-display !text-sm !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
          >
            {producto.nombre}
          </ITText>

          {producto.enlace && (
            <a
              href={producto.enlace}
              {...(enlaceExterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="ml-auto inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-600 dark:text-primary-400"
            >
              {enlaceExterno && <FaExternalLinkAlt size={10} />}
              {producto.enlaceTexto ?? t("showcase.home.viewRepo")}
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* ─── HERO ─── */}
        <div className="it-reveal">
          <ITFlex align="center" gap={3} wrap="wrap">
            <span className="grid h-12 w-12 place-items-center rounded-[12px] border border-slate-200 bg-slate-50 text-primary-600 dark:border-slate-800 dark:bg-slate-950 dark:text-primary-400">
              <ProductoIcono icono={producto.icono} size={22} />
            </span>
            <ITBadget label={producto.tipo} color="primary" variant="outlined" />
          </ITFlex>

          <ITText
            as="h1"
            className="font-display !mt-5 !text-3xl !font-bold -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-4xl"
          >
            {producto.nombre}
          </ITText>

          <ITText
            as="p"
            className="!mt-4 max-w-3xl !text-base !leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {producto.detalle ?? producto.descripcion}
          </ITText>

          <ITFlex gap={2} wrap="wrap" className="!mt-5">
            {producto.stack.map((tecnologia) => (
              <span key={tecnologia} className={CHIP}>
                {tecnologia}
              </span>
            ))}
          </ITFlex>
        </div>

        {/* ─── GALERÍA ─── */}
        {hayGaleria && activa && (
          <section aria-label={t("showcase.producto.gallery")} className="!mt-10">
            <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-slate-950 dark:border-slate-800">
              <img
                src={activa.src}
                alt={`${producto.nombre}: ${activa.titulo}`}
                className="block w-full"
              />
            </div>

            {capturas.length > 1 && (
              <ITFlex gap={2} wrap="wrap" className="!mt-3">
                {capturas.map((captura) => (
                  <button
                    key={captura.src}
                    type="button"
                    title={captura.titulo}
                    aria-label={captura.titulo}
                    aria-pressed={activa.src === captura.src}
                    onClick={() => setActiva(captura)}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-[10px] border-2 bg-slate-100 transition-all dark:bg-slate-950 ${
                      activa.src === captura.src
                        ? "border-primary-600 opacity-100 dark:border-primary-500"
                        : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                  >
                    <img src={captura.src} alt="" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
              </ITFlex>
            )}

            <ITText as="p" className="font-mono !mt-3 !text-[11px] text-slate-500 dark:text-slate-400">
              {activa.titulo}
            </ITText>
          </section>
        )}

        {/* ─── DETALLE (dos columnas) ─── */}
        <ITGrid container spacing={8} className="!mt-10">
          {!!producto.caracteristicas?.length && (
            <ITGrid item xs={12} lg={hayGaleria ? 7 : 6}>
              <ITText as="h2" className={`!mb-3 ${EYEBROW}`}>
                {t("showcase.producto.whatItSolves")}
              </ITText>
              <ITStack spacing={2.5}>
                {producto.caracteristicas.map((caracteristica) => (
                  <ITFlex key={caracteristica} align="start" gap={2}>
                    <FaCheck size={11} className="mt-1 shrink-0 text-primary-600 dark:text-primary-400" />
                    <ITText
                      as="span"
                      className="!text-sm !leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      {caracteristica}
                    </ITText>
                  </ITFlex>
                ))}
              </ITStack>
            </ITGrid>
          )}

          {!!producto.ficha?.length && (
            <ITGrid item xs={12} lg={hayGaleria ? 5 : 6}>
              <div className={`p-5 ${CARD}`}>
                <ITText as="h2" className={`!mb-4 ${EYEBROW}`}>
                  {t("showcase.producto.specSheet")}
                </ITText>
                <ITStack spacing={3}>
                  {producto.ficha.map((dato) => (
                    <div key={dato.etiqueta}>
                      <ITText as="span" className={EYEBROW}>
                        {dato.etiqueta}
                      </ITText>
                      <ITText
                        as="p"
                        className="!mt-1 !text-xs !leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        {dato.valor}
                      </ITText>
                    </div>
                  ))}
                </ITStack>
              </div>
            </ITGrid>
          )}
        </ITGrid>

        {producto.nota && (
          <ITText
            as="p"
            className="!mt-8 !text-[11px] !leading-relaxed text-slate-500 dark:text-slate-400"
          >
            {producto.nota}
          </ITText>
        )}

        {/* ─── CTA ─── */}
        <section className="mt-12 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <ITText as="p" className={EYEBROW}>
              {t("showcase.home.eyebrowNext")}
            </ITText>
            <ITText
              as="h2"
              className="font-display !mt-1 !text-xl !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
            >
              {t("showcase.producto.cta")}
            </ITText>
          </div>

          <ITFlex gap={3} wrap="wrap" align="center" className="shrink-0">
            <ITButton
              variant="outlined"
              color="secondary"
              icon={<FaArrowLeft size={12} />}
              onClick={onBack}
            >
              {t("showcase.producto.back")}
            </ITButton>
            {producto.enlace && (
              <a
                href={producto.enlace}
                {...(enlaceExterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <ITButton
                  variant="filled"
                  color="primary"
                  icon={enlaceExterno ? <FaExternalLinkAlt size={12} /> : undefined}
                >
                  {producto.enlaceTexto ?? t("showcase.home.viewRepo")}
                </ITButton>
              </a>
            )}
          </ITFlex>
        </section>
      </main>
    </>
  );
}
