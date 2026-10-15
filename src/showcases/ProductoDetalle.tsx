import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import ITFlex from "../components/atoms/flex/flex";
import ITText from "../components/atoms/text/text";
import ProductoIcono from "./ProductoIcono";
import { PRODUCTOS, type Producto } from "./productos";
import {
  BotonAccion,
  CHIP,
  ControlesPortafolio,
  EYEBROW,
  EnlaceBoton,
  Etiqueta,
  SaltarContenido,
} from "./portfolioUi";
import { useITTranslation } from "@/i18n";

interface Props {
  /** Producto que se muestra. */
  producto: Producto;
  /** Vuelve al portafolio. */
  onBack: () => void;
}

/** Ancho de la hoja: el mismo que el masthead del portafolio. */
const HOJA = "mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10";

/** Filete de 1px entre bloques. */
const FILETE = "border-slate-200 dark:border-slate-800";

/** Productos que tienen pantalla de detalle (los que traen capturas). */
const CON_DETALLE = PRODUCTOS.filter((p) => (p.capturas?.length ?? 0) > 0);

/**
 * Página de detalle de un producto del portafolio (`#proyecto/<id>`).
 *
 * Es una **página completa**, no un modal: cabecera propia con volver al
 * portafolio, ficha del producto (qué resuelve y datos técnicos en filas con
 * filete), galería de capturas reales con miniaturas y navegación entre
 * proyectos. La URL es compartible y el botón atrás del navegador funciona.
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

  // Navegación entre proyectos: solo entre los que tienen pantalla de detalle.
  const indice = CON_DETALLE.findIndex((p) => p.id === producto.id);
  const anterior = indice > 0 ? CON_DETALLE[indice - 1] : undefined;
  const siguiente =
    indice >= 0 && indice < CON_DETALLE.length - 1 ? CON_DETALLE[indice + 1] : undefined;

  // Cada producto entra por arriba y con su primera captura activa.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setActiva(producto.capturas?.[0]);
  }, [producto]);

  return (
    <>
      <SaltarContenido />

      {/* Cabecera: volver + producto + enlace */}
      <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-[#0b0d10]/85">
        <div className={`${HOJA} flex h-14 items-center gap-3`}>
          <BotonAccion onClick={onBack} icono={<FaArrowLeft size={11} />} className="!px-3 !py-1.5">
            {t("showcase.producto.back")}
          </BotonAccion>
          <span aria-hidden className="text-slate-300 dark:text-slate-700">
            /
          </span>
          <ITText
            as="span"
            className="truncate font-display !text-[13px] !font-bold -tracking-[0.01em] text-slate-900 dark:text-white"
          >
            {producto.nombre}
          </ITText>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {producto.enlace && (
              <a
                href={producto.enlace}
                {...(enlaceExterno ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="hidden shrink-0 items-center gap-1.5 font-mono !text-[11px] uppercase !tracking-[0.14em] !text-primary-700 dark:!text-primary-500 sm:inline-flex"
              >
                {enlaceExterno && <FaExternalLinkAlt size={10} />}
                {producto.enlaceTexto ?? t("showcase.home.viewRepo")}
              </a>
            )}
            <ControlesPortafolio />
          </div>
        </div>
      </header>

      <main id="contenido">
        {/* ─── FICHA ─── */}
        <div className={`${HOJA} pb-10 pt-10 sm:pt-14`}>
          <ITFlex align="center" gap={3} wrap="wrap">
            <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-slate-200 bg-white text-primary-700 dark:border-slate-800 dark:bg-slate-900 dark:text-primary-500">
              <ProductoIcono icono={producto.icono} size={20} />
            </span>
            <Etiqueta>{producto.tipo}</Etiqueta>
            <ITText as="span" className={EYEBROW}>
              {`${String(indice + 1).padStart(2, "0")} / ${String(CON_DETALLE.length).padStart(2, "0")}`}
            </ITText>
          </ITFlex>

          <ITText
            as="h1"
            className="font-display !mt-6 !text-[34px] !font-bold !leading-[1.08] -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-[46px]"
          >
            {producto.nombre}
          </ITText>

          <ITText
            as="p"
            className="!mt-5 max-w-[70ch] !text-[15.5px] !leading-[1.75] text-slate-600 dark:text-slate-300 sm:!text-[16.5px]"
          >
            {producto.detalle ?? producto.descripcion}
          </ITText>

          <ITFlex gap={1.5} wrap="wrap" className="!mt-6">
            {producto.stack.map((tecnologia) => (
              <span key={tecnologia} className={CHIP}>
                {tecnologia}
              </span>
            ))}
          </ITFlex>
        </div>

        {/* ─── GALERÍA ─── */}
        {hayGaleria && activa && (
          <section aria-label={t("showcase.producto.gallery")}>
            <div className={HOJA}>
              <div className={`overflow-hidden rounded-[10px] border bg-slate-950 ${FILETE}`}>
                <img src={activa.src} alt={`${producto.nombre}: ${activa.titulo}`} className="block w-full" />
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
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-[8px] border-2 bg-slate-100 transition-all dark:bg-slate-950 ${
                        activa.src === captura.src
                          ? "border-primary-700 dark:border-primary-500"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={captura.src} alt="" className="h-full w-full object-cover object-top" />
                    </button>
                  ))}
                </ITFlex>
              )}

              <ITText
                as="p"
                className="!mt-3 font-mono !text-[11px] !leading-relaxed text-slate-500 dark:text-slate-400"
              >
                {activa.titulo}
              </ITText>
            </div>
          </section>
        )}

        {/* ─── QUÉ RESUELVE + FICHA TÉCNICA ─── */}
        <div className={`${HOJA} mt-12 grid gap-10 lg:grid-cols-12`}>
          {!!producto.caracteristicas?.length && (
            <section className="lg:col-span-7">
              <ITText as="h2" className={EYEBROW}>
                {t("showcase.producto.whatItSolves")}
              </ITText>
              <ul className={`mt-4 border-t ${FILETE}`}>
                {producto.caracteristicas.map((caracteristica) => (
                  <li key={caracteristica} className={`flex gap-3 border-b py-3.5 ${FILETE}`}>
                    <FaCheck
                      size={10}
                      className="mt-1.5 shrink-0 text-primary-700 dark:text-primary-500"
                    />
                    <ITText
                      as="span"
                      className="!text-[14px] !leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      {caracteristica}
                    </ITText>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!!producto.ficha?.length && (
            <section className="lg:col-span-5">
              <ITText as="h2" className={EYEBROW}>
                {t("showcase.producto.specSheet")}
              </ITText>
              <dl className={`mt-4 border-t ${FILETE}`}>
                {producto.ficha.map((dato) => (
                  <div key={dato.etiqueta} className={`border-b py-3.5 ${FILETE}`}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {dato.etiqueta}
                    </dt>
                    <dd className="mt-1.5 text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
                      {dato.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        {producto.nota && (
          <div className={HOJA}>
            <ITText
              as="p"
              className="!mt-8 max-w-[74ch] font-mono !text-[11px] !leading-relaxed text-slate-500 dark:text-slate-400"
            >
              {producto.nota}
            </ITText>
          </div>
        )}

        {/* ─── ANTERIOR / SIGUIENTE ─── */}
        {(anterior || siguiente) && (
          <nav aria-label={t("showcase.producto.navLabel")} className={`mt-14 border-t ${FILETE}`}>
            <div className={`${HOJA} grid gap-px sm:grid-cols-2`}>
              {anterior && (
                <a
                  href={`#proyecto/${anterior.id}`}
                  className={`group flex flex-col gap-1.5 py-6 sm:pr-8 ${
                    siguiente ? `sm:border-r ${FILETE}` : ""
                  }`}
                >
                  <ITText as="span" className={`inline-flex items-center gap-2 ${EYEBROW}`}>
                    <FaArrowLeft size={9} aria-hidden />
                    {t("showcase.producto.prev")}
                  </ITText>
                  <ITText
                    as="span"
                    className="font-display !text-[19px] !font-bold -tracking-[0.02em] text-slate-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-500"
                  >
                    {anterior.nombre}
                  </ITText>
                  <ITText as="span" className="!text-[12px] text-slate-500 dark:text-slate-400">
                    {anterior.tipo}
                  </ITText>
                </a>
              )}

              {siguiente && (
                <a
                  href={`#proyecto/${siguiente.id}`}
                  className={`group flex flex-col gap-1.5 py-6 sm:pl-8 ${
                    anterior ? "" : "sm:col-start-2 sm:items-end sm:text-right"
                  }`}
                >
                  <ITText as="span" className={`inline-flex items-center gap-2 ${EYEBROW}`}>
                    {t("showcase.producto.next")}
                    <FaArrowRight size={9} aria-hidden />
                  </ITText>
                  <ITText
                    as="span"
                    className="font-display !text-[19px] !font-bold -tracking-[0.02em] text-slate-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-500"
                  >
                    {siguiente.nombre}
                  </ITText>
                  <ITText as="span" className="!text-[12px] text-slate-500 dark:text-slate-400">
                    {siguiente.tipo}
                  </ITText>
                </a>
              )}
            </div>
          </nav>
        )}

        {/* ─── CIERRE ─── */}
        <section className={`border-t ${FILETE}`}>
          <div
            className={`${HOJA} flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between`}
          >
            <div>
              <ITText as="p" className={EYEBROW}>
                {t("showcase.home.eyebrowNext")}
              </ITText>
              <ITText
                as="h2"
                className="font-display !mt-2.5 !text-[24px] !font-bold -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-[30px]"
              >
                {t("showcase.producto.cta")}
              </ITText>
            </div>

            <ITFlex gap={3} wrap="wrap" align="center" className="shrink-0">
              <BotonAccion onClick={onBack} icono={<FaArrowLeft size={11} />}>
                {t("showcase.producto.back")}
              </BotonAccion>
              {producto.enlace && (
                <EnlaceBoton
                  href={producto.enlace}
                  icono={enlaceExterno ? <FaExternalLinkAlt size={11} /> : undefined}
                >
                  {producto.enlaceTexto ?? t("showcase.home.viewRepo")}
                </EnlaceBoton>
              )}
            </ITFlex>
          </div>
        </section>
      </main>
    </>
  );
}
