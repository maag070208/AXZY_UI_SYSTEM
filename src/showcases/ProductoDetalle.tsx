import { useState } from "react";
import { FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import ITBadget from "../components/atoms/badget/badget";
import ITDivider from "../components/atoms/divider/divider";
import ITFlex from "../components/atoms/flex/flex";
import ITGrid from "../components/atoms/grid/grid";
import ITStack from "../components/atoms/stack/stack";
import ITText from "../components/atoms/text/text";
import ITDialog from "../components/organisms/dialog/dialog";
import ProductoIcono from "./ProductoIcono";
import type { Producto } from "./productos";

interface Props {
  /** Producto que se muestra. */
  producto: Producto;
  /** Cierra la pantalla de detalle. */
  onClose: () => void;
}

/**
 * Pantalla de detalle de un producto del portafolio.
 *
 * Se abre a pantalla completa sobre la home: a la izquierda la galería de
 * capturas reales (con miniaturas y pie), a la derecha la ficha del producto
 * (qué resuelve, stack y datos técnicos).
 *
 * @example
 * ```tsx
 * {detalle && <ProductoDetalle producto={detalle} onClose={() => setDetalle(null)} />}
 * ```
 */
export default function ProductoDetalle({ producto, onClose }: Props) {
  const capturas = producto.capturas ?? [];
  const [activa, setActiva] = useState(capturas[0]);
  const hayGaleria = capturas.length > 0;

  return (
    <ITDialog isOpen onClose={onClose} title={producto.nombre} useFormHeader fullScreen>
      <div className="mx-auto w-full max-w-6xl">
        <ITGrid container spacing={8}>
          {/* ─── Galería ─── */}
          {hayGaleria && activa && (
            <ITGrid item xs={12} lg={7}>
              <ITStack spacing={3}>
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <img
                    src={activa.src}
                    alt={`${producto.nombre}: ${activa.titulo}`}
                    className="block w-full"
                  />
                </div>

                <ITFlex gap={2} wrap="wrap">
                  {capturas.map((captura) => (
                    <button
                      key={captura.src}
                      type="button"
                      title={captura.titulo}
                      aria-label={captura.titulo}
                      onClick={() => setActiva(captura)}
                      className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-100 dark:bg-slate-950 transition-all ${
                        activa.src === captura.src
                          ? "border-primary-500 opacity-100"
                          : "border-transparent opacity-55 hover:opacity-100"
                      }`}
                    >
                      <img src={captura.src} alt="" className="h-full w-full object-cover object-top" />
                    </button>
                  ))}
                </ITFlex>

                <ITText as="p" muted className="!text-xs">
                  {activa.titulo}
                </ITText>
              </ITStack>
            </ITGrid>
          )}

          {/* ─── Ficha ─── */}
          <ITGrid item xs={12} lg={hayGaleria ? 5 : 12}>
            <ITStack spacing={5}>
              <ITFlex align="center" justify="between" gap={3}>
                <ITFlex align="center" gap={3}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${producto.gradiente} text-white flex items-center justify-center shadow-md shrink-0`}>
                    <ProductoIcono icono={producto.icono} size={20} />
                  </div>
                  <ITText as="h2" className="!text-xl !font-bold">
                    {producto.nombre}
                  </ITText>
                </ITFlex>
                <ITBadget label={producto.tipo} color="primary" variant="outlined" />
              </ITFlex>

              {producto.detalle && (
                <ITText as="p" muted className="!text-sm !leading-relaxed">
                  {producto.detalle}
                </ITText>
              )}

              {!!producto.caracteristicas?.length && (
                <div>
                  <ITText as="h3" className="!text-sm !font-bold !mb-2.5">
                    Qué resuelve
                  </ITText>
                  <ITStack spacing={2}>
                    {producto.caracteristicas.map((caracteristica) => (
                      <ITFlex key={caracteristica} align="start" gap={2}>
                        <FaCheck size={11} className="mt-1 shrink-0 text-emerald-500" />
                        <ITText as="span" muted className="!text-xs !leading-relaxed">
                          {caracteristica}
                        </ITText>
                      </ITFlex>
                    ))}
                  </ITStack>
                </div>
              )}

              <div>
                <ITText as="h3" className="!text-sm !font-bold !mb-2.5">
                  Stack
                </ITText>
                <ITFlex gap={2} wrap="wrap">
                  {producto.stack.map((tecnologia) => (
                    <ITBadget key={tecnologia} label={tecnologia} color="gray" variant="outlined" />
                  ))}
                </ITFlex>
              </div>

              {!!producto.ficha?.length && (
                <>
                  <ITDivider />

                  <div>
                    <ITText as="h3" className="!text-sm !font-bold !mb-2.5">
                      Ficha técnica
                    </ITText>
                    <ITStack spacing={2.5}>
                      {producto.ficha.map((dato) => (
                        <ITGrid container spacing={2} key={dato.etiqueta}>
                          <ITGrid item xs={4}>
                            <ITText as="span" muted className="!text-xs !font-semibold">
                              {dato.etiqueta}
                            </ITText>
                          </ITGrid>
                          <ITGrid item xs={8}>
                            <ITText as="span" className="!text-xs !leading-relaxed">
                              {dato.valor}
                            </ITText>
                          </ITGrid>
                        </ITGrid>
                      ))}
                    </ITStack>
                  </div>
                </>
              )}

              {producto.enlace && (
                <a
                  href={producto.enlace}
                  {...(producto.enlace.startsWith("#")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="!text-xs !font-semibold !text-primary-600 dark:!text-primary-400 inline-flex items-center gap-1.5"
                >
                  {!producto.enlace.startsWith("#") && <FaExternalLinkAlt size={11} />}
                  {producto.enlaceTexto ?? "Ver el repositorio"}
                </a>
              )}

              {producto.nota && (
                <ITText as="p" muted className="!text-[11px] !leading-relaxed">
                  {producto.nota}
                </ITText>
              )}
            </ITStack>
          </ITGrid>
        </ITGrid>
      </div>
    </ITDialog>
  );
}
