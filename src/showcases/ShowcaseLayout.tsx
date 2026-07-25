import React, { useState } from "react";
import { FaCheck, FaCopy, FaBookOpen, FaCog, FaCode, FaEye } from "react-icons/fa";
import ITCard from "../components/card/card";
import ITGrid from "../components/grid/grid";
import { useITTheme } from "../components/theme-provider/themeProvider";

export const CodeViewer: React.FC<{ code: string; compact?: boolean }> = ({ code, compact }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-950 text-slate-200 border border-slate-800 shadow-inner">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">JSX Code</span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs py-1 px-2 rounded hover:bg-slate-800"
        >
          {copied ? <FaCheck size={11} className="text-emerald-500" /> : <FaCopy size={11} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className={`p-4 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap ${compact ? "max-h-[420px]" : ""} overflow-y-auto`}>
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

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  title,
  description,
  demo,
  controls,
  code,
  gallery,
  doc
}) => {
  const { resolvedTheme } = useITTheme();
  const [activeTab, setActiveTab] = useState<"controls" | "docs">("controls");
  const [sandboxView, setSandboxView] = useState<SandboxView>("preview");
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm md:text-base">{description}</p>
        </div>


      </div>

      <ITGrid container columns={12} spacing={6}>
        {/* ── MAIN: Unified Sandbox (Preview / Code tabs) ── */}
        <ITGrid item as="main" xs={12} md={8} className="space-y-4">
          {/* Unified Sandbox */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {/* Sandbox header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Interactive Sandbox
                </span>
              </div>

              {/* View toggle: Preview / Code */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5 rounded-lg">
                <button
                  onClick={() => setSandboxView("preview")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                    sandboxView === "preview"
                      ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <FaEye size={10} />
                  Preview
                </button>
                <button
                  onClick={() => setSandboxView("code")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                    sandboxView === "code"
                      ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <FaCode size={10} />
                  Code
                </button>
              </div>
            </div>

            {/* Sandbox content */}
            {sandboxView === "preview" ? (
              <div
                data-theme={resolvedTheme}
                className="p-6 md:p-10 min-h-[320px] flex items-center justify-center transition-all duration-300 bg-white dark:bg-slate-950"
              >
                <div className="w-full flex justify-center">{demo}</div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50">
                <CodeViewer code={code} compact />
              </div>
            )}
          </div>
        </ITGrid>

        {/* ── RIGHT SIDEBAR: Configs / Docs ── */}
        <ITGrid item as="aside" xs={12} md={4}>
          <div className="md:sticky md:top-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              {/* Tab bar */}
              {doc ? (
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab("controls")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
                      activeTab === "controls"
                        ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/40 dark:bg-primary-950/20 dark:text-primary-400 dark:border-primary-400"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    <FaCog size={11} />
                    Properties
                  </button>
                  <button
                    onClick={() => setActiveTab("docs")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
                      activeTab === "docs"
                        ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/40 dark:bg-primary-950/20 dark:text-primary-400 dark:border-primary-400"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    <FaBookOpen size={11} />
                    Docs
                  </button>
                </div>
              ) : null}

              {/* Controls Tab */}
              {activeTab === "controls" && (
                <div className="p-4 space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto">
                  <div className="space-y-4">{controls}</div>
                </div>
              )}

              {/* Documentation Tab */}
              {doc && activeTab === "docs" && (
                <div className="p-4 space-y-5 max-h-[calc(100vh-160px)] overflow-y-auto">
                  {/* Description */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Overview
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {doc.summary}
                    </p>
                    {doc.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Props Table */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Props
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800">
                            <th className="text-left px-2 py-1.5 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">Prop</th>
                            <th className="text-left px-2 py-1.5 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">Type</th>
                            <th className="text-left px-2 py-1.5 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doc.props.map((prop, i) => (
                            <tr
                              key={prop.name}
                              className={`border-t border-slate-100 dark:border-slate-800 ${
                                i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-800/50"
                              }`}
                            >
                              <td className="px-2 py-1.5 font-mono font-semibold text-primary-700 dark:text-primary-400 whitespace-nowrap">
                                {prop.name}
                                {prop.required ? <span className="text-danger-500 ml-0.5">*</span> : null}
                              </td>
                              <td className="px-2 py-1.5 font-mono text-slate-600 dark:text-slate-400 text-[10px]">
                                {prop.type}
                              </td>
                              <td className="px-2 py-1.5 font-mono text-slate-400 dark:text-slate-500 text-[10px]">
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
                          <span className="font-mono font-semibold text-primary-700 dark:text-primary-400">{prop.name}</span>
                          <span className="text-slate-500 dark:text-slate-400"> — {prop.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Usage Examples */}
                  {doc.examples && doc.examples.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Usage Examples
                      </h3>
                      {doc.examples.map((example, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <pre className="p-2 rounded-lg bg-slate-950 text-slate-200 text-[10px] font-mono overflow-x-auto leading-relaxed">
                            <code>{example}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {doc.notes && doc.notes.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Notes
                      </h3>
                      <ul className="space-y-1">
                        {doc.notes.map((note, i) => (
                          <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
                            <span className="text-primary-500 mt-0.5 shrink-0">•</span>
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
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Variations & States (Gallery)</span>
          </div>
          <div className="p-4">
            {gallery}
          </div>
        </div>
      )}
    </div>
  );
};
