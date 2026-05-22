import React, { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import ITCard from "../components/card/card";
import { useITTheme } from "../components/theme-provider/themeProvider";

export const CodeViewer: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-4 rounded-xl overflow-hidden bg-slate-950 text-slate-200 border border-slate-800 shadow-inner">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">JSX Code</span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs py-1 px-2 rounded hover:bg-slate-800"
        >
          {copied ? <FaCheck size={11} className="text-emerald-500" /> : <FaCopy size={11} />}
          <span>{copied ? "Copiado!" : "Copiar"}</span>
        </button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export interface ShowcaseLayoutProps {
  title: string;
  description: string;
  demo: React.ReactNode;
  controls: React.ReactNode;
  code: string;
  gallery?: React.ReactNode;
}

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  title,
  description,
  demo,
  controls,
  code,
  gallery
}) => {
  const { resolvedTheme } = useITTheme();
  const [localTheme, setLocalTheme] = useState<"light" | "dark" | "default">("default");
  const activeTheme = localTheme === "default" ? resolvedTheme : localTheme;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
            {title}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${activeTheme === "dark"
              ? "bg-slate-800 text-slate-200 border-slate-700"
              : "bg-slate-100 text-slate-700 border-slate-200"
              }`}>
              {activeTheme === "dark" ? "Sandbox Oscuro 🌙" : "Sandbox Claro ☀️"}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm md:text-base">{description}</p>
        </div>

        {/* Local Sandbox Theme Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setLocalTheme("default")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${localTheme === "default"
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent"
              }`}
          >
            Auto
          </button>
          <button
            onClick={() => setLocalTheme("light")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${localTheme === "light"
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent"
              }`}
          >
            Claro
          </button>
          <button
            onClick={() => setLocalTheme("dark")}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${localTheme === "dark"
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent"
              }`}
          >
            Oscuro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Sandbox & Code */}
        <div className="lg:col-span-2 space-y-6">
          <ITCard title="Sandbox Interactivo" className="shadow-lg border-slate-100 dark:border-slate-800">
            <div
              data-theme={activeTheme}
              className={`p-6 min-h-[180px] rounded-2xl border border-dashed transition-all duration-300 flex items-center justify-center ${activeTheme === "dark"
                ? "dark bg-slate-950 border-slate-800 text-slate-200"
                : "light bg-white border-slate-200 text-slate-800"
                }`}
            >
              <div className="w-full flex justify-center">{demo}</div>
            </div>
          </ITCard>

          <CodeViewer code={code} />
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <ITCard title="Propiedades / Controles" className="shadow-lg border-slate-100 dark:border-slate-800">
            <div className="space-y-4">
              {controls}
            </div>
          </ITCard>
        </div>
      </div>

      {gallery && (
        <ITCard title="Variaciones y Estados (Galería)" className="shadow-lg border-slate-100 dark:border-slate-800">
          <div className="p-4">
            {gallery}
          </div>
        </ITCard>
      )}
    </div>
  );
};
