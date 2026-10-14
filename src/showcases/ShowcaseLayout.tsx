import React, { useState } from "react";
import { FaCheck, FaCopy, FaBookOpen, FaCog, FaCode, FaEye } from "react-icons/fa";
import ITGrid from "../components/atoms/grid/grid";
import { useITTheme } from "../components/theme-provider/themeProvider";
import { useITTranslation } from "@/i18n";

export const CodeViewer: React.FC<{ code: string; compact?: boolean }> = ({ code, compact }) => {
  const { t } = useITTranslation();
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative overflow-hidden rounded-[14px] border border-slate-800 bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-400">
          ▍ {t("showcase.layout.jsxCode")}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-[6px] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
        >
          {copied ? <FaCheck size={11} className="text-cyan-400" /> : <FaCopy size={11} />}
          <span>{copied ? t("showcase.layout.copied") : t("showcase.layout.copy")}</span>
        </button>
      </div>
      <pre className={`overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed ${compact ? "max-h-[420px]" : ""} overflow-y-auto`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export interface PropDocEntry {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentDoc {
  summary: string;
  description?: string;
  examples?: string[];
  props: PropDocEntry[];
  notes?: string[];
}

export interface ShowcaseLayoutProps {
  title: string;
  description: string;
  demo: React.ReactNode;
  controls: React.ReactNode;
  code: string;
  gallery?: React.ReactNode;
  doc?: ComponentDoc;
}

type SandboxView = "preview" | "code";

/** Muted mono eyebrow used by the frame's labels and metadata. */
const EYEBROW =
  "font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400";

/** Technical card surface: 1px border, 14px radius, shadow only on hover. */
const CARD =
  "rounded-[14px] border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-900";

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  title,
  description,
  demo,
  controls,
  code,
  gallery,
  doc
}) => {
  const { t } = useITTranslation();
  const { resolvedTheme } = useITTheme();
  const [activeTab, setActiveTab] = useState<"controls" | "docs">("controls");
  const [sandboxView, setSandboxView] = useState<SandboxView>("preview");
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className={EYEBROW}>{`// ${t("showcase.layout.eyebrow")}`}</p>
          <h1 className="mt-1.5 flex items-center gap-3 font-display text-3xl font-bold -tracking-[0.02em] text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 md:text-base">{description}</p>
        </div>


      </div>

      <ITGrid container columns={12} spacing={6}>
        {/* ── MAIN: Unified Sandbox (Preview / Code tabs) ── */}
        <ITGrid item as="main" xs={12} md={8} className="space-y-4">
          {/* Unified Sandbox */}
          <div className={`overflow-hidden ${CARD}`}>
            {/* Sandbox header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className={`ml-2 ${EYEBROW}`}>
                  {t("showcase.layout.sandbox")}
                </span>
              </div>

              {/* View toggle: Preview / Code */}
              <div className="flex items-center gap-1 rounded-[10px] border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => setSandboxView("preview")}
                  aria-pressed={sandboxView === "preview"}
                  className={`flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    sandboxView === "preview"
                      ? "bg-primary-600 text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <FaEye size={10} />
                  {t("showcase.layout.preview")}
                </button>
                <button
                  onClick={() => setSandboxView("code")}
                  aria-pressed={sandboxView === "code"}
                  className={`flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    sandboxView === "code"
                      ? "bg-primary-600 text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <FaCode size={10} />
                  {t("showcase.layout.code")}
                </button>
              </div>
            </div>

            {/* Sandbox content */}
            {sandboxView === "preview" ? (
              <div
                data-theme={resolvedTheme}
                className="flex min-h-[320px] items-center justify-center bg-white p-6 transition-all duration-300 dark:bg-slate-950 md:p-10"
              >
                <div className="flex w-full justify-center">{demo}</div>
              </div>
            ) : (
              <div className="bg-slate-50 p-3 dark:bg-slate-950/60">
                <CodeViewer code={code} compact />
              </div>
            )}
          </div>
        </ITGrid>

        {/* ── RIGHT SIDEBAR: Configs / Docs ── */}
        <ITGrid item as="aside" xs={12} md={4}>
          <div className="md:sticky md:top-4">
            <div className={`overflow-hidden ${CARD}`}>
              {/* Tab bar */}
              {doc ? (
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setActiveTab("controls")}
                    aria-pressed={activeTab === "controls"}
                    className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                      activeTab === "controls"
                        ? "border-b-2 border-primary-600 bg-primary-50/50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    <FaCog size={11} />
                    {t("showcase.layout.properties")}
                  </button>
                  <button
                    onClick={() => setActiveTab("docs")}
                    aria-pressed={activeTab === "docs"}
                    className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                      activeTab === "docs"
                        ? "border-b-2 border-primary-600 bg-primary-50/50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    <FaBookOpen size={11} />
                    {t("showcase.layout.docs")}
                  </button>
                </div>
              ) : null}

              {/* Controls Tab */}
              {activeTab === "controls" && (
                <div className="max-h-[calc(100vh-160px)] space-y-4 overflow-y-auto p-4">
                  <div className="space-y-4">{controls}</div>
                </div>
              )}

              {/* Documentation Tab */}
              {doc && activeTab === "docs" && (
                <div className="max-h-[calc(100vh-160px)] space-y-5 overflow-y-auto p-4">
                  {/* Description */}
                  <div>
                    <h3 className={`mb-2 ${EYEBROW}`}>
                      {t("showcase.layout.overview")}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {doc.summary}
                    </p>
                    {doc.description && (
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Props Table */}
                  <div>
                    <h3 className={`mb-2 ${EYEBROW}`}>
                      {t("showcase.layout.props")}
                    </h3>
                    <div className="overflow-x-auto rounded-[10px] border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950/60">
                            <th className="whitespace-nowrap px-2 py-1.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("showcase.layout.prop")}</th>
                            <th className="whitespace-nowrap px-2 py-1.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("showcase.layout.type")}</th>
                            <th className="whitespace-nowrap px-2 py-1.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("showcase.layout.default")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doc.props.map((prop, i) => (
                            <tr
                              key={prop.name}
                              className={`border-t border-slate-200 dark:border-slate-800 ${
                                i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/60 dark:bg-slate-950/40"
                              }`}
                            >
                              <td className="whitespace-nowrap px-2 py-1.5 font-mono font-semibold text-primary-600 dark:text-primary-400">
                                {prop.name}
                                {prop.required ? <span className="ml-0.5 text-danger-500">*</span> : null}
                              </td>
                              <td className="px-2 py-1.5 font-mono text-[10px] text-slate-600 dark:text-slate-400">
                                {prop.type}
                              </td>
                              <td className="px-2 py-1.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                                {prop.default || "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Detailed descriptions below the compact table */}
                    <div className="mt-2 space-y-1.5">
                      {doc.props.map((prop) => (
                        <div key={prop.name} className="text-[11px]">
                          <span className="font-mono font-semibold text-primary-600 dark:text-primary-400">{prop.name}</span>
                          <span className="text-slate-500 dark:text-slate-400"> — {prop.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Usage Examples */}
                  {doc.examples && doc.examples.length > 0 && (
                    <div>
                      <h3 className={`mb-2 ${EYEBROW}`}>
                        {t("showcase.layout.usageExamples")}
                      </h3>
                      {doc.examples.map((example, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <pre className="overflow-x-auto rounded-[10px] border border-slate-800 bg-slate-950 p-2 font-mono text-[10px] leading-relaxed text-slate-200">
                            <code>{example}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {doc.notes && doc.notes.length > 0 && (
                    <div>
                      <h3 className={`mb-2 ${EYEBROW}`}>
                        {t("showcase.layout.notes")}
                      </h3>
                      <ul className="space-y-1">
                        {doc.notes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="mt-0.5 shrink-0 font-mono text-primary-500">▍</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ITGrid>
      </ITGrid>

      {/* Gallery */}
      {gallery && (
        <div className={`overflow-hidden ${CARD}`}>
          <div className="border-b border-slate-200 px-4 py-2 dark:border-slate-800">
            <span className={EYEBROW}>{t("showcase.layout.gallery")}</span>
          </div>
          <div className="p-4">
            {gallery}
          </div>
        </div>
      )}
    </div>
  );
};
