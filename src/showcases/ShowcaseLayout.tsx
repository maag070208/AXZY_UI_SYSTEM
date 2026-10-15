/**
 * Marco de las páginas de componente del sandbox (`#ui-system/<grupo>/<item>`).
 *
 * Diseño «documentación viva»: cada ejemplo es un **contenedor con cabecera
 * propia** (número, título y la acción de ver el código siempre a la vista), el
 * código se despliega dentro del mismo contenedor, los controles viven en un
 * grid compacto bajo el demo y la API (props, ejemplos, notas) está **siempre
 * visible** en la columna derecha, sin pestañas.
 *
 * Sigue `DESIGN.md` (AXZY Console): filetes de 1px, mono para metadatos y un
 * solo acento.
 */

import React, { useState } from "react";
import { FaBookOpen, FaCheck, FaCode, FaCopy, FaEye } from "react-icons/fa";
import ITGrid from "../components/atoms/grid/grid";
import { useITTheme } from "../components/theme-provider/themeProvider";
import { ControlSegmentado } from "@/sandbox/controls";
import {
  BotonCopiar,
  EYEBROW,
  EjemploContenedor,
  FILETE,
  FOCO_CTA,
} from "@/sandbox/ui";
import { useITTranslation } from "@/i18n";

/**
 * Bloque de código con botón de copiar. Fondo tinta, mono y el acento de señal
 * (`cyan-400`) reservado a la etiqueta, como manda el spec.
 *
 * @example
 * ```tsx
 * <CodeViewer code={`<ITButton>Guardar</ITButton>`} compact />
 * ```
 */
export const CodeViewer: React.FC<{ code: string; compact?: boolean }> = ({ code, compact }) => {
  const { t } = useITTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-[10px] border border-slate-800 bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-400">
          {t("showcase.layout.jsxCode")}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-[6px] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 transition-colors hover:bg-slate-800 hover:text-white ${FOCO_CTA}`}
        >
          {copied ? <FaCheck size={11} className="text-cyan-400" /> : <FaCopy size={11} />}
          <span>{copied ? t("showcase.layout.copied") : t("showcase.layout.copy")}</span>
        </button>
      </div>
      <pre
        tabIndex={0}
        className={`overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed ${
          compact ? "max-h-[420px]" : ""
        } overflow-y-auto`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

/** Una fila de la tabla de props. */
export interface PropDocEntry {
  /** Nombre del prop. */
  name: string;
  /** Tipo TypeScript. */
  type: string;
  /** Valor por defecto. */
  default?: string;
  /** Descripción para el panel de documentación. */
  description: string;
  /** Marca el prop como obligatorio. */
  required?: boolean;
}

/** Documentación de un componente, si el showcase la declara. */
export interface ComponentDoc {
  /** Resumen de una línea. */
  summary: string;
  /** Descripción larga opcional. */
  description?: string;
  /** Ejemplos de uso (código). */
  examples?: string[];
  /** Tabla de props. */
  props: PropDocEntry[];
  /** Notas al pie. */
  notes?: string[];
}

/** Props de `ShowcaseLayout`. */
export interface ShowcaseLayoutProps {
  /** Nombre del componente. */
  title: string;
  /** Descripción corta bajo el título. */
  description: string;
  /** Demo interactiva. */
  demo: React.ReactNode;
  /** Controles del ejemplo (lo construye cada showcase). */
  controls?: React.ReactNode;
  /** Código fuente del ejemplo principal. */
  code: string;
  /** Galería de variaciones y estados. */
  gallery?: React.ReactNode;
  /** Documentación opcional (columna derecha). */
  doc?: ComponentDoc;
  /**
   * Ancho mínimo (px) del demo dentro de la vitrina. Los demos que son un layout
   * entero (`ITLayout`, pantallas de ejemplo) lo necesitan: por debajo de ~780px
   * su propio contenido se recorta. La vitrina desplaza en horizontal lo que
   * sobre.
   * @default 0
   */
  demoMinAncho?: number;
}

/**
 * Página de un componente del sandbox: cabecera, ejemplo principal con su código,
 * controles en grid, API en la columna derecha y galería de variaciones.
 *
 * @example
 * ```tsx
 * <ShowcaseLayout title="ITButton" description="…" demo={<ITButton>Guardar</ITButton>}
 *   controls={<ITSelect … />} code={code} gallery={<Gallery />} doc={doc} />
 * ```
 */
export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  title,
  description,
  demo,
  controls,
  code,
  gallery,
  doc,
  demoMinAncho = 0,
}) => {
  const { t } = useITTranslation();
  const { resolvedTheme } = useITTheme();
  const [sandboxView, setSandboxView] = useState<"preview" | "code">("preview");

  const hayApi = Boolean(doc);

  return (
    <div className="animate-fadeIn pb-4">
      {/* ─── CABECERA ─── */}
      <header className={`border-b pb-6 ${FILETE}`}>
        <p className={EYEBROW}>{t("showcase.layout.eyebrow")}</p>
        <h1 className="mt-2.5 font-display text-[32px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white sm:text-[40px]">
          {title}
        </h1>
        <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </header>

      <div className="pt-6">
        <ITGrid container columns={12} spacing={8}>
          {/* ── EJEMPLO PRINCIPAL + CONTROLES ── */}
          <ITGrid item xs={12} md={hayApi ? 8 : 12}>
            <EjemploContenedor
              numero="01"
              titulo={t("showcase.layout.sandbox")}
              nota={doc?.summary}
              sangrado
            >
              {/* Barra del ejemplo: vista previa / código, siempre visible */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 ${FILETE}`}
              >
                <span className={EYEBROW}>{t("showcase.layout.preview")}</span>
                <ControlSegmentado
                  etiqueta={t("showcase.layout.sandbox")}
                  valor={sandboxView}
                  onChange={(value) => setSandboxView(value === "code" ? "code" : "preview")}
                  opciones={[
                    {
                      value: "preview",
                      label: t("showcase.layout.preview"),
                      icono: <FaEye size={10} />,
                    },
                    { value: "code", label: t("showcase.layout.code"), icono: <FaCode size={10} /> },
                  ]}
                />
              </div>

              {sandboxView === "preview" ? (
                <div
                  data-theme={resolvedTheme}
                  tabIndex={0}
                  className="flex min-h-[220px] items-center justify-center overflow-x-auto bg-white p-6 dark:bg-slate-950 md:p-8"
                >
                  <div
                    className="flex w-full justify-center"
                    style={demoMinAncho ? { minWidth: `${demoMinAncho}px` } : undefined}
                  >
                    {demo}
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <CodeViewer code={code} compact />
                </div>
              )}
            </EjemploContenedor>

            {controls && (
              <section className={`mt-6 overflow-hidden rounded-[10px] border ${FILETE}`}>
                <header
                  className={`flex items-center justify-between gap-3 border-b bg-slate-50/70 px-4 py-2.5 dark:bg-slate-950/40 ${FILETE}`}
                >
                  <h2 className={EYEBROW}>{t("showcase.layout.controls")}</h2>
                </header>
                <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">{controls}</div>
              </section>
            )}
          </ITGrid>

          {/* ── API (siempre visible, sin pestañas) ── */}
          {hayApi && (
            <ITGrid item xs={12} md={4}>
              <div className="md:sticky md:top-4">
                <section className={`overflow-hidden rounded-[10px] border ${FILETE}`}>
                  <header
                    className={`flex items-center gap-2 border-b bg-slate-50/70 px-4 py-2.5 dark:bg-slate-950/40 ${FILETE}`}
                  >
                    <FaBookOpen size={11} className="text-primary-700 dark:text-primary-500" />
                    <h2 className={EYEBROW}>{t("showcase.layout.api")}</h2>
                  </header>

                  <div tabIndex={0} className="max-h-[calc(100vh-220px)] space-y-6 overflow-y-auto p-4">
                    {doc?.description && (
                      <p className="text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {doc.description}
                      </p>
                    )}

                    {!!doc?.props.length && (
                      <div>
                        <h3 className={EYEBROW}>{t("showcase.layout.props")}</h3>
                        <dl className={`mt-2.5 border-t ${FILETE}`}>
                          {doc.props.map((prop) => (
                            <div key={prop.name} className={`border-b py-2.5 ${FILETE}`}>
                              <dt className="flex flex-wrap items-baseline gap-x-2 font-mono text-[11px] font-semibold text-primary-700 dark:text-primary-500">
                                {prop.name}
                                {prop.required ? (
                                  <span
                                    className="text-danger-500"
                                    title={t("showcase.common.required")}
                                  >
                                    *
                                  </span>
                                ) : null}
                                <span className="font-mono text-[10px] font-normal text-slate-500 dark:text-slate-400">
                                  {prop.type}
                                </span>
                                <span className="font-mono text-[10px] font-normal text-slate-500 dark:text-slate-400">
                                  {`= ${prop.default || "—"}`}
                                </span>
                              </dt>
                              <dd className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
                                {prop.description}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}

                    {doc?.examples && doc.examples.length > 0 && (
                      <div>
                        <h3 className={EYEBROW}>{t("showcase.layout.usageExamples")}</h3>
                        <div className="mt-2.5 space-y-2">
                          {doc.examples.map((example, i) => (
                            <div key={i} className="relative">
                              <pre tabIndex={0} className="overflow-x-auto rounded-[10px] border border-slate-800 bg-slate-950 p-3 pr-10 font-mono text-[10px] leading-relaxed text-slate-200">
                                <code>{example}</code>
                              </pre>
                              <span className="absolute right-1.5 top-1.5">
                                <BotonCopiar
                                  texto={example}
                                  className="text-slate-500 hover:bg-slate-800 hover:text-white dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {doc?.notes && doc.notes.length > 0 && (
                      <div>
                        <h3 className={EYEBROW}>{t("showcase.layout.notes")}</h3>
                        <ul className={`mt-2.5 border-t ${FILETE}`}>
                          {doc.notes.map((note, i) => (
                            <li
                              key={i}
                              className={`border-b py-2 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300 ${FILETE}`}
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </ITGrid>
          )}
        </ITGrid>
      </div>

      {/* ─── MÁS EJEMPLOS ─── */}
      {gallery && (
        <section
          className={`mt-12 border-t pt-8 ${FILETE}`}
          aria-label={t("showcase.layout.gallery")}
        >
          <p className={EYEBROW}>{t("showcase.layout.gallery")}</p>
          <h2 className="mt-2 font-display text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
            {t("showcase.layout.galleryTitle")}
          </h2>
          <div className="mt-6 space-y-6">{gallery}</div>
        </section>
      )}
    </div>
  );
};
