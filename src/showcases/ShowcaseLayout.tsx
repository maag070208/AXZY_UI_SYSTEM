/**
 * Marco de las páginas de componente del sandbox (`#ui-system/<grupo>/<item>`):
 * cabecera de la hoja, vitrina interactiva (vista previa / código), panel de
 * propiedades y documentación, y galería de variaciones.
 *
 * Sigue `DESIGN.md` (AXZY Console): el bloque lo separan filetes de 1px, no
 * cajas dentro de cajas; los controles vienen del kit compartido
 * (`@/sandbox/ui` y `@/sandbox/controls`) para que el marco no introduzca
 * colores que no pasan AA.
 */

import React, { useState } from "react";
import { FaBookOpen, FaCheck, FaCode, FaCog, FaCopy, FaEye } from "react-icons/fa";
import ITGrid from "../components/atoms/grid/grid";
import { useITTheme } from "../components/theme-provider/themeProvider";
import { ControlSegmentado } from "@/sandbox/controls";
import { EYEBROW, FILETE, FOCO_CTA } from "@/sandbox/ui";
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
  /**
   * Panel de controles (lo construye cada showcase). Si se omite, la vitrina
   * ocupa todo el ancho y no se pinta panel: para páginas que solo muestran un
   * ejemplo o una receta.
   */
  controls?: React.ReactNode;
  /** Código fuente que se muestra en la pestaña de código. */
  code: string;
  /** Galería de variaciones y estados. */
  gallery?: React.ReactNode;
  /** Documentación opcional (añade la pestaña "Docs"). */
  doc?: ComponentDoc;
  /**
   * Ancho de la vitrina. `"columna"` (por defecto) la deja en 8/12 columnas con
   * el panel al lado; `"completo"` la lleva a las 12 y baja el panel, para demos
   * que son un layout entero (ITLayout, pantallas de ejemplo) y se recortaban.
   * @default "columna"
   */
  demoAncho?: "columna" | "completo";
}

type SandboxView = "preview" | "code";

/**
 * Página de un componente del sandbox: cabecera, vitrina con vista previa y
 * código, panel lateral de propiedades/documentación y galería.
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
  demoAncho = "columna",
}) => {
  const completo = demoAncho === "completo";
  const { t } = useITTranslation();
  const { resolvedTheme } = useITTheme();
  const [activeTab, setActiveTab] = useState<"controls" | "docs">(controls ? "controls" : "docs");
  const [sandboxView, setSandboxView] = useState<SandboxView>("preview");
  // Sin controles la vitrina se queda con todo el ancho.
  const hayPanel = Boolean(controls) || Boolean(doc);

  return (
    <div className="animate-fadeIn pb-4">
      {/* ─── CABECERA DE LA HOJA ─── */}
      <header className={`border-b pb-7 ${FILETE}`}>
        <p className={EYEBROW}>{t("showcase.layout.eyebrow")}</p>
        <h1 className="mt-2.5 font-display text-[32px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white sm:text-[40px]">
          {title}
        </h1>
        <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </header>

      <div className="pt-8">
        <ITGrid container columns={12} spacing={8}>
          {/* ── VITRINA ── */}
          <ITGrid item xs={12} md={completo || !hayPanel ? 12 : 8}>
            <section
              aria-label={t("showcase.layout.sandbox")}
              className={`overflow-hidden rounded-[10px] border ${FILETE}`}
            >
              {/* Barra de la vitrina */}
              <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 ${FILETE}`}>
                <h2 className={EYEBROW}>{t("showcase.layout.sandbox")}</h2>

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

              {/* Contenido */}
              {sandboxView === "preview" ? (
                <div
                  data-theme={resolvedTheme}
                  className="flex min-h-[280px] items-center justify-center overflow-x-auto bg-white p-6 dark:bg-slate-950 md:p-10"
                >
                  <div className="flex w-full justify-center">{demo}</div>
                </div>
              ) : (
                <div className="p-3">
                  <CodeViewer code={code} compact />
                </div>
              )}
            </section>
          </ITGrid>

          {/* ── PANEL LATERAL ── */}
          {hayPanel && (
          <ITGrid item xs={12} md={completo ? 12 : 4}>
            <div className={completo ? "" : "md:sticky md:top-4"}>
              <section
                aria-label={t("showcase.layout.properties")}
                className={`overflow-hidden rounded-[10px] border ${FILETE} ${
                  completo ? "max-w-[880px]" : ""
                }`}
              >
                {doc ? (
                  <div
                    role="tablist"
                    aria-label={t("showcase.layout.properties")}
                    className={`flex items-stretch gap-1 border-b px-2 ${FILETE}`}
                  >
                    {(
                      [
                        { id: "controls", label: t("showcase.layout.properties"), icono: <FaCog size={10} /> },
                        { id: "docs", label: t("showcase.layout.docs"), icono: <FaBookOpen size={10} /> },
                      ] as const
                    ).map((tab) => {
                      const activa = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={activa}
                          onClick={() => setActiveTab(tab.id)}
                          className={`-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 ${
                            activa
                              ? "border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-500"
                              : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          }`}
                        >
                          {tab.icono}
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {activeTab === "controls" && (
                  <div
                    className={`max-h-[calc(100vh-200px)] space-y-4 overflow-y-auto p-5 ${
                      completo ? "it-panel-ancho max-w-[880px]" : ""
                    }`}
                  >
                    {controls}
                  </div>
                )}

                {doc && activeTab === "docs" && (
                  <div
                    className={`max-h-[calc(100vh-200px)] space-y-6 overflow-y-auto p-5 ${
                      completo ? "it-panel-ancho max-w-[880px]" : ""
                    }`}
                  >
                    <div>
                      <h2 className={EYEBROW}>{t("showcase.layout.overview")}</h2>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {doc.summary}
                      </p>
                      {doc.description && (
                        <p className="mt-2 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {doc.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <h2 className={EYEBROW}>{t("showcase.layout.props")}</h2>
                      <dl className={`mt-3 border-t ${FILETE}`}>
                        {doc.props.map((prop) => (
                          <div key={prop.name} className={`border-b py-3 ${FILETE}`}>
                            <dt className="flex flex-wrap items-baseline gap-x-2 font-mono text-[11px] font-semibold text-primary-700 dark:text-primary-500">
                              {prop.name}
                              {prop.required ? (
                                <span className="text-danger-500" title={t("showcase.common.required")}>
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
                            <dd className="mt-1.5 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
                              {prop.description}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {doc.examples && doc.examples.length > 0 && (
                      <div>
                        <h2 className={EYEBROW}>{t("showcase.layout.usageExamples")}</h2>
                        <div className="mt-3 space-y-2">
                          {doc.examples.map((example, i) => (
                            <pre
                              key={i}
                              className="overflow-x-auto rounded-[10px] border border-slate-800 bg-slate-950 p-3 font-mono text-[10px] leading-relaxed text-slate-200"
                            >
                              <code>{example}</code>
                            </pre>
                          ))}
                        </div>
                      </div>
                    )}

                    {doc.notes && doc.notes.length > 0 && (
                      <div>
                        <h2 className={EYEBROW}>{t("showcase.layout.notes")}</h2>
                        <ul className={`mt-3 border-t ${FILETE}`}>
                          {doc.notes.map((note, i) => (
                            <li
                              key={i}
                              className={`border-b py-2.5 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300 ${FILETE}`}
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </ITGrid>
          )}
        </ITGrid>
      </div>

      {/* ─── GALERÍA ─── */}
      {gallery && (
        <section className={`mt-12 border-t pt-8 ${FILETE}`} aria-label={t("showcase.layout.gallery")}>
          <h2 className={EYEBROW}>{t("showcase.layout.gallery")}</h2>
          <div className="mt-5">{gallery}</div>
        </section>
      )}
    </div>
  );
};
