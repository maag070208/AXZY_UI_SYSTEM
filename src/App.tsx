import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaCopy,
  FaCreditCard,
  FaHome,
  FaInfoCircle,
  FaKeyboard,
  FaRegBell,
  FaSearch,
  FaSlidersH,
  FaSync,
  FaTable
} from "react-icons/fa";
import { PRESETS } from "./components/theme-provider/themeProvider";
import type { ITDataTableFetchParams, ITDataTableResponse } from "./index";
import {
  ITBadget,
  ITButton,
  ITCalendar,
  ITCard,
  ITDataTable,
  ITDatePicker,
  ITDialog,
  ITDropfile,
  ITFormBuilder,
  ITImage,
  ITInput,
  ITLayout,
  ITLoader,
  ITNavbar,
  ITPagination,
  ITSearchSelect,
  ITSelect,
  ITSlideToggle,
  ITStepper,
  ITTable,
  ITTabs,
  ITText,
  ITThemeProvider,
  ITTimePicker,
  ITToast,
  ITTripleFilter,
  UploadStatus,
  useITTheme
} from "./index";
import "./index.css";

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const CodeViewer: React.FC<{ code: string }> = ({ code }) => {
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

interface ShowcaseLayoutProps {
  title: string;
  description: string;
  demo: React.ReactNode;
  controls: React.ReactNode;
  code: string;
  gallery?: React.ReactNode;
}

const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
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

// ============================================================================
// COMPONENT SHOWCASES
// ============================================================================

// 0. Personal Home / Inicio Showcase
const HomeShowcase = () => {
  const [techSearch, setTechSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const LANGUAGES = [
    {
      name: "TypeScript",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      color: "#3178c6"
    },
    {
      name: "JavaScript",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      color: "#f7df1e"
    },
    {
      name: "C#",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
      color: "#178600"
    }
  ];

  const FRAMEWORKS = [
    {
      name: "Angular",
      icon: "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
      color: "#dd0031"
    },
    {
      name: "React",
      icon: "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor",
      color: "#61dafb"
    },
    {
      name: "Ionic",
      icon: "https://icongr.am/devicon/ionic-original.svg?size=128&color=currentColor",
      color: "#3880ff"
    },
    {
      name: ".NET / ASP.NET",
      icon: "https://icongr.am/devicon/dot-net-original.svg?size=128&color=currentColor",
      color: "#512bd4"
    }
  ];

  const TECH_STACK = [
    { name: "Docker", icon: "https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "Angular", icon: "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "C#", icon: "https://icongr.am/devicon/csharp-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "CSS3", icon: "https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "Sass", icon: "https://icongr.am/devicon/sass-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: ".NET Core", icon: "https://icongr.am/devicon/dot-net-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "Electron", icon: "https://icongr.am/devicon/electron-original.svg?size=128&color=currentColor", category: "desktop" },
    { name: "Express", icon: "https://icongr.am/devicon/express-original-wordmark.svg?size=128&color=currentColor", category: "backend" },
    { name: "Git", icon: "https://icongr.am/devicon/git-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "GitHub", icon: "https://icongr.am/devicon/github-original.svg?size=128&color=currentColor", category: "devops", darkInvert: false },
    { name: "GitLab", icon: "https://icongr.am/devicon/gitlab-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "HTML5", icon: "https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "MongoDB", icon: "https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor", category: "database" },
    { name: "MySQL", icon: "https://icongr.am/devicon/mysql-original-wordmark.svg?size=128&color=currentColor", category: "database" },
    { name: "Node.js", icon: "https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "React", icon: "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "Android", icon: "https://icongr.am/devicon/android-original.svg?size=128&color=currentColor", category: "mobile" },
    { name: "Python", icon: "https://icongr.am/devicon/python-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "TypeScript", icon: "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "Kotlin", icon: "https://devicons.railway.app/i/kotlin.svg", category: "mobile" },
    { name: "npm", icon: "https://devicons.railway.app/i/npm.svg", category: "devops" },
    { name: "Redux", icon: "https://devicons.railway.app/i/redux.svg", category: "frontend" },
    { name: "Yarn", icon: "https://cdn.iconscout.com/icon/free/png-512/free-yarn-34-1174974.png?f=webp&w=512", category: "devops" },
    { name: "Visual Studio", icon: "https://icongr.am/devicon/visualstudio-plain.svg?size=128&color=currentColor", category: "tools" },
    { name: "Flutter", icon: "https://cdn.iconscout.com/icon/free/png-512/free-flutter-2038877-1720090.png?f=webp&w=512", category: "mobile" },
    { name: "Jest", icon: "https://cdn.iconscout.com/icon/free/png-512/free-jest-3521517-2945020.png?f=webp&w=512", category: "testing" }
  ];

  const categoriesList = [
    { id: "all", name: "Todos" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "mobile", name: "Móvil" },
    { id: "database", name: "Bases de Datos" },
    { id: "devops", name: "DevOps" }
  ];

  const filteredTech = TECH_STACK.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(techSearch.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 animate-fade-in">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/70 to-slate-50/50 dark:from-slate-900/60 dark:to-slate-950/40 border border-slate-100 dark:border-slate-800/80 backdrop-blur-md p-8 md:p-12 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-200/30">
                Portafolio Personal
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-white leading-tight">
                Hola 👋, soy <br />
                <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Asael Amaro
                </span>
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">Sobre mí</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base font-normal">
                Desarrollador Fullstack con 4+ años de experiencia desarrollando aplicaciones web usando{" "}
                <strong className="text-primary-500 font-semibold">TypeScript</strong>,{" "}
                <strong className="text-purple-500 font-semibold">Angular 8+</strong>,{" "}
                <strong className="text-indigo-500 font-semibold">JavaScript</strong>, y{" "}
                <strong className="text-blue-500 font-semibold">ReactJS</strong>. Apasionado de los lenguajes de programación modernos
                y las nuevas técnicas de desarrollo. Autodidacta y me encantan los nuevos retos.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                💼 Fullstack Developer
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                📅 4+ Años Exp
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                🚀 React & Angular
              </span>
            </div>
          </div>

          {/* Illustration/Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Decorative backglow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-500" />

              <div className="relative rounded-2xl overflow-hidden bg-slate-100/50 dark:bg-slate-950/20 p-4 border border-slate-200/30 dark:border-slate-800/40 backdrop-blur-sm">
                <img
                  src="/animations/developer.gif"
                  alt="Developer Illustration"
                  className="w-full max-w-[280px] aspect-square object-cover rounded-xl shadow-inner animate-float"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const container = e.currentTarget.parentElement;
                    if (container) {
                      const fallback = container.querySelector(".svg-fallback");
                      if (fallback) fallback.classList.remove("hidden");
                    }
                  }}
                />

                {/* Fallback SVG embedded */}
                <div className="svg-fallback hidden w-full max-w-[280px] aspect-square flex items-center justify-center">
                  <svg className="w-full aspect-square" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="70" fill="url(#heroGlow)" opacity="0.2" />
                    <rect x="50" y="70" width="100" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                    <rect x="58" y="78" width="84" height="46" rx="4" fill="#0f172a" />
                    <line x1="66" y1="88" x2="100" y2="88" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <line x1="66" y1="98" x2="120" y2="98" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                    <line x1="66" y1="108" x2="90" y2="108" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="130" cy="88" r="6" fill="#f59e0b" />
                    <path d="M 40 140 L 160 140 L 170 148 L 30 148 Z" fill="#334155" />
                    <rect x="154" y="120" width="12" height="18" rx="2" fill="#ef4444" />
                    <path d="M 166 124 C 170 124 170 130 166 130" stroke="#ef4444" strokeWidth="2" fill="none" />
                    <defs>
                      <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Languages & Frameworks Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages */}
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-md shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="text-lg">🛠️</span> Lenguajes Principales
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/40 hover:border-primary-500/40 transition-all duration-300 hover:scale-105 hover:shadow-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800/80 group-hover:rotate-6 transition-transform duration-300">
                  <img src={lang.icon} alt={lang.name} className="w-8 h-8 object-contain" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frameworks */}
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-md shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="text-lg">🚀</span> Frameworks
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {FRAMEWORKS.map((fw) => (
              <div
                key={fw.name}
                className="group relative flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/40 hover:border-primary-500/40 transition-all duration-300 hover:scale-105 hover:shadow-sm"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800/80 group-hover:-rotate-6 transition-transform duration-300">
                  <img src={fw.icon} alt={fw.name} className="w-6 h-6 object-contain" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 text-center truncate w-full">{fw.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Grid Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Tech Stack</h2>
            <p className="text-xs text-slate-500">Mi conjunto completo de herramientas, frameworks y tecnologías.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filtrar tecnologías..."
                value={techSearch}
                onChange={(e) => setTechSearch(e.target.value)}
                className="w-full sm:w-60 bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-white pl-8 pr-4 py-1.5 text-xs rounded-xl outline-none focus:ring-2 focus:ring-primary-500 border border-slate-200/60 dark:border-slate-800/80 transition-all"
              />
              <FaSearch className="absolute left-2.5 top-2.5 text-slate-400" size={11} />
            </div>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/60">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat.id
                ? "bg-primary-500 text-white shadow-sm"
                : "bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        {filteredTech.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredTech.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/40 dark:bg-slate-950/10 border border-slate-200/30 dark:border-slate-800/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 shadow-inner group-hover:rotate-3 transition-transform">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className={`w-8 h-8 object-contain ${tech.darkInvert ? "dark:invert" : ""}`}
                  />
                </div>
                <span className="mt-2.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center select-none truncate w-full">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
            No se encontraron tecnologías que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT SHOWCASES
// ============================================================================

// 1. ITButton Showcase
const ButtonShowcase = () => {
  const [color, setColor] = useState<any>("primary");
  const [size, setSize] = useState<any>("medium");
  const [variant, setVariant] = useState<any>("filled");
  const [disabled, setDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const code = `<ITButton\n  label="Hacer Click"\n  color="${color}"\n  size="${size}"\n  variant="${variant}"\n  disabled={${disabled}}\n  onClick={() => console.log('Click!')}\n/>`;

  return (
    <ShowcaseLayout
      title="ITButton"
      description="Botón premium con soporte completo de variantes, colores del tema y estados."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITButton
            label="Hacer Click"
            color={color}
            size={size}
            variant={variant}
            disabled={disabled}
            onClick={() => setClickCount(c => c + 1)}
          />
          {clickCount > 0 && (
            <span className="text-xs font-mono text-slate-500 animate-pulse">
              Clicks registrados: {clickCount}
            </span>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="color"
            label="Color"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
              { label: "Purple", value: "purple" },
              { label: "Gray", value: "gray" }
            ]}
          />
          <ITSelect
            name="size"
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" }
            ]}
          />
          <ITSelect
            name="variant"
            label="Variante"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Filled", value: "filled" },
              { label: "Outlined", value: "outlined" },
              { label: "Raised", value: "raised" },
              { label: "Rounded", value: "rounded" },
              { label: "Text", value: "text" },
              { label: "Raised Text", value: "raised-text" },
              { label: "Link", value: "link" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Variantes</h4>
            <div className="flex flex-wrap gap-3">
              <ITButton label="Filled" variant="filled" />
              <ITButton label="Outlined" variant="outlined" />
              <ITButton label="Raised" variant="raised" />
              <ITButton label="Rounded" variant="rounded" />
              <ITButton label="Text" variant="text" />
              <ITButton label="Link" variant="link" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Colores Semánticos</h4>
            <div className="flex flex-wrap gap-3">
              <ITButton label="Primary" color="primary" />
              <ITButton label="Secondary" color="secondary" />
              <ITButton label="Success" color="success" />
              <ITButton label="Danger" color="danger" />
              <ITButton label="Warning" color="warning" />
              <ITButton label="Info" color="info" />
              <ITButton label="Purple" color="purple" />
            </div>
          </div>
        </div>
      }
    />
  );
};

// 2. ITBadget Showcase
const BadgetShowcase = () => {
  const [color, setColor] = useState<any>("success");
  const [size, setSize] = useState<any>("medium");
  const [labelText, setLabelText] = useState("Activo");

  const code = `<ITBadget\n  label="${labelText}"\n  color="${color}"\n  size="${size}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITBadget"
      description="Badges (etiquetas) estilizados para representar estados o categorías de items."
      code={code}
      demo={
        <ITBadget label={labelText} color={color} size={size} />
      }
      controls={
        <>
          <ITInput
            name="label"
            label="Texto"
            value={labelText}
            onChange={(e: any) => setLabelText(e.target.value)}
            onBlur={() => { }}
          />
          <ITSelect
            name="color"
            label="Color"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
          <ITSelect
            name="size"
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" }
            ]}
          />
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-4">
          <ITBadget label="Primary" color="primary" />
          <ITBadget label="Secondary" color="secondary" />
          <ITBadget label="Success" color="success" />
          <ITBadget label="Danger" color="danger" />
          <ITBadget label="Warning" color="warning" />
          <ITBadget label="Info" color="info" />
          <span className="mx-4 text-slate-300">|</span>
          <ITBadget label="Small" color="primary" size="small" />
          <ITBadget label="Medium" color="primary" size="medium" />
          <ITBadget label="Large" color="primary" size="large" />
        </div>
      }
    />
  );
};

// 3. ITInput Showcase
const InputShowcase = () => {
  // Sandbox type selector
  const [selectedInput, setSelectedInput] = useState<
    "text" | "password" | "select" | "searchselect" | "datepicker" | "timepicker" | "toggle" | "dropfile" | "form"
  >("text");

  // Individual input values
  const [textVal, setTextVal] = useState("usuario_admin");
  const [passVal, setPassVal] = useState("secreto123");
  const [selectVal, setSelectVal] = useState("admin");
  const [searchSelectVal, setSearchSelectVal] = useState("MX");
  const [dateVal, setDateVal] = useState<any>(new Date());
  const [timeVal, setTimeVal] = useState("08:00");
  const [toggleVal, setToggleVal] = useState(true);
  const [fileVal, setFileVal] = useState<File | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    country: "",
    birthday: new Date(),
    meetingTime: "09:30",
    newsletter: false,
    file: null as File | null
  });
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Shared / Customizable Controls
  const [label, setLabel] = useState("Nombre de Usuario");
  const [placeholder, setPlaceholder] = useState("Escribe tu apodo...");
  const [variant, setVariant] = useState<any>("primary");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  // Form controls
  const [formVariant, setFormVariant] = useState<any>("primary");
  const [formDisabled, setFormDisabled] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);

  const formErrors = showFormErrors ? {
    name: "El nombre es obligatorio",
    email: "Formato de correo no válido",
    password: "La contraseña es muy corta",
    role: "Debes elegir un rol administrativo",
    country: "Debes elegir tu país de residencia",
    birthday: "Fecha incorrecta",
    meetingTime: "Hora no permitida",
    file: "Debes adjuntar un archivo"
  } : {} as any;

  // Handle setting default label and placeholder when tab changes
  useEffect(() => {
    if (selectedInput !== "form") {
      const DEFAULT_PROPS: Record<string, { label: string; placeholder: string }> = {
        text: { label: "Nombre de Usuario", placeholder: "Escribe tu apodo..." },
        password: { label: "Contraseña", placeholder: "Introduce tu clave..." },
        select: { label: "Rol Administrativo", placeholder: "Selecciona un rol" },
        searchselect: { label: "País de Origen", placeholder: "Buscar país..." },
        datepicker: { label: "Fecha de Registro", placeholder: "Elige una fecha" },
        timepicker: { label: "Hora de Turno", placeholder: "Elige una hora" },
        toggle: { label: "Habilitar Notificaciones", placeholder: "" },
        dropfile: { label: "Subir Documento", placeholder: "" }
      };
      const defaults = DEFAULT_PROPS[selectedInput];
      if (defaults) {
        setLabel(defaults.label);
        setPlaceholder(defaults.placeholder);
      }
    }
  }, [selectedInput]);

  // Code generation
  const code = useMemo(() => {
    if (selectedInput === "text") {
      return `<ITInput
  name="username"
  label="${label}"
  placeholder="${placeholder}"
  value="${textVal}"
  onChange={(e) => setVal(e.target.value)}
  variant="${variant}"
  disabled={${disabled}}
  required={${required}}
  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}
/>`;
    }
    if (selectedInput === "password") {
      return `<ITInput
  name="password"
  type="password"
  label="${label}"
  placeholder="${placeholder}"
  value="${passVal}"
  onChange={(e) => setVal(e.target.value)}
  variant="${variant}"
  disabled={${disabled}}
  required={${required}}
  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}
/>`;
    }
    if (selectedInput === "select") {
      return `<ITSelect
  name="user_role"
  label="${label}"
  value="${selectVal}"
  onChange={(e) => setVal(e.target.value)}
  options={[
    { label: "Administrador", value: "admin" },
    { label: "Colaborador", value: "staff" },
    { label: "Auditor Externo", value: "auditor" }
  ]}
  disabled={${disabled}}
  required={${required}}
  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}
/>`;
    }
    if (selectedInput === "searchselect") {
      return `<ITSearchSelect
  name="user_country"
  label="${label}"
  placeholder="${placeholder}"
  value="${searchSelectVal}"
  onChange={(val) => setVal(val)}
  options={[
    { label: "México", value: "MX" },
    { label: "España", value: "ES" },
    { label: "Colombia", value: "CO" },
    { label: "Argentina", value: "AR" },
    { label: "Perú", value: "PE" }
  ]}
  disabled={${disabled}}
  required={${required}}
  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}
/>`;
    }
    if (selectedInput === "datepicker") {
      return `<ITDatePicker
  name="birthday"
  label="${label}"
  placeholder="${placeholder}"
  value={dateVal}
  onChange={(e) => setVal(e.target.value)}
  variant="${variant}"
  disabled={${disabled}}
  required={${required}}
  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}
/>`;
    }
    if (selectedInput === "timepicker") {
      return `<ITTimePicker
  name="meeting_time"
  label="${label}"
  placeholder="${placeholder}"
  value="${timeVal}"
  onChange={(e) => setVal(e.target.value)}
  variant="${variant}"
  disabled={${disabled}}
  required={${required}}
  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}
/>`;
    }
    if (selectedInput === "toggle") {
      return `<ITSlideToggle
  label="${label}"
  isOn={${toggleVal}}
  onToggle={(val) => setVal(val)}
  disabled={${disabled}}
/>`;
    }
    if (selectedInput === "dropfile") {
      return `<ITDropfile
  onFileSelect={(file) => setFile(file)}
  uploadStatus={${fileVal ? "UploadStatus.UPLOADED" : "UploadStatus.PENDING"}}
/>`;
    }
    return `// Formulario Completo AXZY con todos los tipos de Input:
<form onSubmit={handleSubmit} className="space-y-4">
  <ITInput label="Nombre Completo" name="name" value={name} onChange={...} />
  <ITInput label="Correo" name="email" value={email} onChange={...} />
  <ITInput label="Contraseña" type="password" name="password" value={password} onChange={...} />
  
  <ITSelect label="Rol de Usuario" value={role} options={roles} onChange={...} />
  <ITSearchSelect label="País" value={country} options={countries} onChange={...} />
  
  <ITDatePicker label="Nacimiento" value={birthday} onChange={...} />
  <ITTimePicker label="Hora de Entrada" value={time} onChange={...} />
  
  <ITSlideToggle label="Boletín" isOn={newsletter} onToggle={...} />
  <ITDropfile label="Documento" onFileSelect={...} />
  
  <ITButton type="submit" label="Enviar Formulario" />
</form>`;
  }, [selectedInput, label, placeholder, variant, disabled, required, errorInput, textVal, passVal, selectVal, searchSelectVal, dateVal, timeVal, toggleVal, fileVal]);

  const tabs = [
    { id: "text", label: "Texto" },
    { id: "password", label: "Contraseña" },
    { id: "select", label: "Select" },
    { id: "searchselect", label: "SearchSelect" },
    { id: "datepicker", label: "DatePicker" },
    { id: "timepicker", label: "TimePicker" },
    { id: "toggle", label: "SlideToggle" },
    { id: "dropfile", label: "Dropfile" },
    { id: "form", label: "Formulario" }
  ];

  const renderActiveInput = () => {
    switch (selectedInput) {
      case "text":
        return (
          <div className="w-full max-w-sm">
            <ITInput
              name="sandbox_username"
              label={label}
              placeholder={placeholder}
              value={textVal}
              onChange={(e: any) => setTextVal(e.target.value)}
              onBlur={() => { }}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "password":
        return (
          <div className="w-full max-w-sm">
            <ITInput
              name="sandbox_password"
              type="password"
              label={label}
              placeholder={placeholder}
              value={passVal}
              onChange={(e: any) => setPassVal(e.target.value)}
              onBlur={() => { }}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "select":
        return (
          <div className="w-full max-w-sm">
            <ITSelect
              name="sandbox_select"
              label={label}
              value={selectVal}
              onChange={(e: any) => setSelectVal(e.target.value)}
              options={[
                { label: "Administrador", value: "admin" },
                { label: "Colaborador", value: "staff" },
                { label: "Auditor Externo", value: "auditor" }
              ]}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "searchselect":
        return (
          <div className="w-full max-w-sm">
            <ITSearchSelect
              name="sandbox_searchselect"
              label={label}
              placeholder={placeholder}
              value={searchSelectVal}
              onChange={(val: string) => setSearchSelectVal(val)}
              options={[
                { label: "México", value: "MX" },
                { label: "España", value: "ES" },
                { label: "Colombia", value: "CO" },
                { label: "Argentina", value: "AR" },
                { label: "Perú", value: "PE" }
              ]}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "datepicker":
        return (
          <div className="w-full max-w-sm">
            <ITDatePicker
              name="sandbox_datepicker"
              label={label}
              value={dateVal}
              onChange={(e: any) => setDateVal(e.target.value)}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "timepicker":
        return (
          <div className="w-full max-w-sm">
            <ITTimePicker
              name="sandbox_timepicker"
              label={label}
              placeholder={placeholder}
              value={timeVal}
              onChange={(e: any) => setTimeVal(e.target.value)}
              onBlur={() => { }}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "toggle":
        return (
          <div className="w-full max-w-sm flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label || "Toggle Switch"}</span>
            <ITSlideToggle
              isOn={toggleVal}
              onToggle={setToggleVal}
              disabled={disabled}
              activeColor={variant === "primary" ? "success" : variant}
            />
          </div>
        );
      case "dropfile":
        return (
          <div className="w-full max-w-sm">
            {label && <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5 block">{label}</label>}
            <ITDropfile
              onFileSelect={setFileVal}
              uploadStatus={fileVal ? UploadStatus.UPLOADED : UploadStatus.PENDING}
            />
          </div>
        );
      case "form":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmittedData(formData);
            }}
            className="w-full max-w-lg space-y-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ITInput
                name="form_name"
                label="Nombre Completo"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={(e: any) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.name}
                touched={showFormErrors ? true : undefined}
              />
              <ITInput
                name="form_email"
                label="Correo Electrónico"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={(e: any) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.email}
                touched={showFormErrors ? true : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ITInput
                name="form_password"
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e: any) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.password}
                touched={showFormErrors ? true : undefined}
              />
              <ITSelect
                name="form_role"
                label="Rol de Usuario"
                value={formData.role}
                onChange={(e: any) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                options={[
                  { label: "Administrador", value: "admin" },
                  { label: "Colaborador", value: "staff" },
                  { label: "Auditor Externo", value: "auditor" }
                ]}
                disabled={formDisabled}
                required={true}
                error={formErrors.role}
                touched={showFormErrors ? true : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ITSearchSelect
                name="form_country"
                label="País de Residencia"
                value={formData.country}
                onChange={(val: string) => setFormData(prev => ({ ...prev, country: val }))}
                options={[
                  { label: "México", value: "MX" },
                  { label: "España", value: "ES" },
                  { label: "Colombia", value: "CO" },
                  { label: "Argentina", value: "AR" },
                  { label: "Perú", value: "PE" }
                ]}
                disabled={formDisabled}
                required={true}
                error={formErrors.country}
                touched={showFormErrors ? true : undefined}
              />
              <ITDatePicker
                name="form_birthday"
                label="Fecha de Nacimiento"
                value={formData.birthday}
                onChange={(e: any) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.birthday}
                touched={showFormErrors ? true : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <ITTimePicker
                name="form_time"
                label="Hora de Entrada"
                value={formData.meetingTime}
                onChange={(e: any) => setFormData(prev => ({ ...prev, meetingTime: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.meetingTime}
                touched={showFormErrors ? true : undefined}
              />
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl h-[64px]">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Recibir Boletín</span>
                <ITSlideToggle
                  isOn={formData.newsletter}
                  onToggle={(val) => setFormData(prev => ({ ...prev, newsletter: val }))}
                  disabled={formDisabled}
                  size="sm"
                />
              </div>
            </div>

            <ITDropfile
              onFileSelect={(file) => setFormData(prev => ({ ...prev, file }))}
              uploadStatus={formData.file ? UploadStatus.UPLOADED : UploadStatus.PENDING}
            />
            {formErrors.file && <p className="text-xs text-red-500 mt-1">{formErrors.file}</p>}

            <div className="flex justify-end pt-2">
              <ITButton label="Enviar Formulario" color={formVariant} type="submit" disabled={formDisabled} />
            </div>

            {submittedData && (
              <div className="mt-4 p-4 bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-xs rounded-xl border border-slate-800">
                <p className="font-bold mb-2">✓ Submit Data (JSON):</p>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(
                    {
                      ...submittedData,
                      birthday: submittedData.birthday instanceof Date ? submittedData.birthday.toLocaleDateString() : submittedData.birthday,
                      file: submittedData.file ? submittedData.file.name : null
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Selector de tipo de Sandbox */}
      <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedInput(tab.id as any);
              setSubmittedData(null);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${selectedInput === tab.id
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ShowcaseLayout
        title="ITInput Suite"
        description={
          selectedInput === "form"
            ? "Formulario unificado con todos los tipos de campos de entrada (Texto, Menú, Búsqueda, Fechas, Horas, Toggles y Archivos) para validar su correcto comportamiento visual."
            : `Sandbox interactivo para experimentar con el componente individual de tipo ${selectedInput.toUpperCase()}.`
        }
        code={code}
        demo={renderActiveInput()}
        controls={
          selectedInput === "form" ? (
            <>
              <ITSelect
                name="form_variant_ctrl"
                label="Variante de Color de Botón"
                value={formVariant}
                onChange={(e: any) => setFormVariant(e.target.value)}
                options={[
                  { label: "Primary", value: "primary" },
                  { label: "Secondary", value: "secondary" },
                  { label: "Success", value: "success" },
                  { label: "Danger", value: "danger" },
                  { label: "Warning", value: "warning" },
                  { label: "Info", value: "info" }
                ]}
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Simular Errores</span>
                <ITSlideToggle isOn={showFormErrors} onToggle={setShowFormErrors} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Deshabilitar Todo</span>
                <ITSlideToggle isOn={formDisabled} onToggle={setFormDisabled} activeColor="danger" size="sm" />
              </div>
            </>
          ) : (
            <>
              <ITInput
                name="label_ctrl"
                label="Etiqueta (Label)"
                value={label}
                onChange={(e: any) => setLabel(e.target.value)}
                onBlur={() => { }}
              />
              {["text", "password", "searchselect", "datepicker", "timepicker"].includes(selectedInput) && (
                <ITInput
                  name="placeholder_ctrl"
                  label="Placeholder"
                  value={placeholder}
                  onChange={(e: any) => setPlaceholder(e.target.value)}
                  onBlur={() => { }}
                />
              )}
              {["text", "password", "datepicker", "timepicker", "toggle"].includes(selectedInput) && (
                <ITSelect
                  name="variant_ctrl"
                  label="Variante de Color"
                  value={variant}
                  onChange={(e: any) => setVariant(e.target.value)}
                  options={[
                    { label: "Primary", value: "primary" },
                    { label: "Secondary", value: "secondary" },
                    { label: "Success", value: "success" },
                    { label: "Danger", value: "danger" },
                    { label: "Warning", value: "warning" },
                    { label: "Info", value: "info" }
                  ]}
                />
              )}
              <ITInput
                name="error_ctrl"
                label="Mensaje de Error"
                value={errorInput}
                onChange={(e: any) => setErrorInput(e.target.value)}
                onBlur={() => { }}
                placeholder="Ej. Formato inválido"
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Requerido</span>
                <ITSlideToggle isOn={required} onToggle={setRequired} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Deshabilitado</span>
                <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
              </div>
            </>
          )
        }
        gallery={
          selectedInput === "form" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ITInput name="g1" label="Input Estándar" placeholder="Ingresa datos..." onChange={() => { }} onBlur={() => { }} />
              <ITInput name="g2" label="Input Con Error" value="Email no válido" error="El formato del correo es incorrecto" onChange={() => { }} onBlur={() => { }} touched />
              <ITInput name="g3" label="Input Deshabilitado" placeholder="Solo lectura" disabled onChange={() => { }} onBlur={() => { }} />
              <ITInput name="g4" label="Input Contraseña" type="password" value="secreto123" onChange={() => { }} onBlur={() => { }} />
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

// 4. ITSelect Showcase
const SelectShowcase = () => {
  const [val, setVal] = useState("");
  const [label, setLabel] = useState("Rol Administrativo");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const options = [
    { label: "Administrador Supremo", value: "SUPERADMIN" },
    { label: "Operador de Planta", value: "OPERATOR" },
    { label: "Auditor Externo", value: "AUDITOR" }
  ];

  const code = `<ITSelect\n  name="role"\n  label="${label}"\n  value="${val}"\n  options={[\n    { label: 'Administrador Supremo', value: 'SUPERADMIN' },\n    { label: 'Operador de Planta', value: 'OPERATOR' },\n    { label: 'Auditor Externo', value: 'AUDITOR' }\n  ]}\n  disabled={${disabled}}\n  error=${error ? `"${error}"` : "undefined"}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSelect"
      description="Menú desplegable de selección simple optimizado con los estilos visuales AXZY."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITSelect
            name="showcase_select"
            label={label}
            value={val}
            options={options}
            disabled={disabled}
            error={error || undefined}
            onChange={(e: any) => setVal(e.target.value)}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">Selección: "{val}"</p>
          )}
        </div>
      }
      controls={
        <>
          <ITInput name="label_ctrl" label="Label" value={label} onChange={(e: any) => setLabel(e.target.value)} onBlur={() => { }} />
          <ITInput name="err_ctrl" label="Mensaje de Error" value={error} onChange={(e: any) => setError(e.target.value)} onBlur={() => { }} />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ITSelect name="s1" label="Opción Simple" options={[{ label: "Chile", value: "cl" }]} onChange={() => { }} />
          <ITSelect name="s2" label="Select Con Error" options={[]} error="Este campo es obligatorio" touched onChange={() => { }} />
        </div>
      }
    />
  );
};

// 5. ITSearchSelect Showcase
const SearchSelectShowcase = () => {
  const [val, setVal] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const options = [
    { label: "Argentina", value: "AR" },
    { label: "Brasil", value: "BR" },
    { label: "Colombia", value: "CO" },
    { label: "México", value: "MX" },
    { label: "Perú", value: "PE" },
    { label: "España", value: "ES" }
  ];

  const code = `<ITSearchSelect\n  name="country"\n  label="Seleccionar País"\n  value="${val}"\n  options={[\n    { label: 'Argentina', value: 'AR' },\n    { label: 'Brasil', value: 'BR' },...\n  ]}\n  isLoading={${isLoading}}\n  disabled={${disabled}}\n  onChange={(value) => setVal(value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSearchSelect"
      description="Selector avanzado con barra de búsqueda para filtrar colecciones grandes o cargar opciones remotas."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITSearchSelect
            name="country"
            label="Seleccionar País"
            value={val}
            options={options}
            isLoading={isLoading}
            disabled={disabled}
            onChange={(value) => setVal(value)}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">País seleccionado: "{val}"</p>
          )}
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Estado de Carga (Loading)</span>
            <ITSlideToggle isOn={isLoading} onToggle={setIsLoading} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 6. ITDatePicker Showcase
const DatePickerShowcase = () => {
  const [val, setVal] = useState<any>(new Date());
  const [range, setRange] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [variant, setVariant] = useState<any>("primary");

  const handleDateChange = (e: any) => {
    setVal(e.target.value);
  };

  const code = `<ITDatePicker\n  name="date"\n  label="Fecha de Auditoría"\n  value={${range ? "dateRange" : "singleDate"}}\n  range={${range}}\n  variant="${variant}"\n  disabled={${disabled}}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDatePicker"
      description="Calendario de entrada de fechas estático y flotante con soporte para selección de rangos."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITDatePicker
            name="showcase_datepicker"
            label="Fecha del Evento"
            value={val}
            range={range}
            variant={variant}
            disabled={disabled}
            onChange={handleDateChange}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">
              Valor actual: {range && Array.isArray(val)
                ? `Rango: ${val[0]?.toLocaleDateString() || "?"} - ${val[1]?.toLocaleDateString() || "?"}`
                : val instanceof Date
                  ? val.toLocaleDateString()
                  : String(val)
              }
            </p>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="variant_ctrl"
            label="Tema de Color"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Selección de Rango</span>
            <ITSlideToggle isOn={range} onToggle={(r) => { setRange(r); setVal(r ? [new Date(), new Date()] : new Date()); }} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 7. ITTimePicker Showcase
const TimePickerShowcase = () => {
  const [val, setVal] = useState("09:30");
  const [variant, setVariant] = useState<any>("primary");
  const [disabled, setDisabled] = useState(false);

  const code = `<ITTimePicker\n  name="time"\n  label="Hora de Inicio"\n  value="${val}"\n  variant="${variant}"\n  disabled={${disabled}}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTimePicker"
      description="Selector de horas y minutos con panel interactivo de scroll suave."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITTimePicker
            name="showcase_time"
            label="Hora de Inicio"
            value={val}
            variant={variant}
            disabled={disabled}
            onChange={(e: any) => setVal(e.target.value)}
            onBlur={() => { }}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">Hora elegida: "{val}"</p>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="variant_ctrl"
            label="Variante"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
              { label: "Purple", value: "purple" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 8. ITCalendar Showcase
const CalendarShowcase = () => {
  const [mode, setMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectionMode, setSelectionMode] = useState<'single' | 'range'>('single');
  const [calendarVariant, setCalendarVariant] = useState<any>("primary");
  const [events, setEvents] = useState<any[]>([
    { id: "1", title: "Planificación de Sprint", start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000), color: "#3b82f6" },
    { id: "2", title: "Revisión Técnica", start: new Date(new Date().setDate(new Date().getDate() + 2)), end: new Date(new Date().setDate(new Date().getDate() + 2)), color: "#10b981" }
  ]);

  const code = `<ITCalendar\n  mode="${mode}"\n  selectionMode="${selectionMode}"\n  variant="${calendarVariant}"\n  events={[\n    { id: '1', title: 'Sprint Planning', start: new Date(), end: new Date() }\n  ]}\n  onSlotClick={(date) => alert(date)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITCalendar"
      description="Calendario completo con soporte para eventos y agendamiento diario/semanal."
      code={code}
      demo={
        <div className="w-full h-[450px]">
          <ITCalendar
            mode={mode}
            selectionMode={selectionMode}
            variant={calendarVariant}
            events={events}
            onSlotClick={(date) => alert(`Click en horario: ${date.toLocaleString()}`)}
            onEventClick={(evt) => alert(`Detalle del Evento: ${evt.title}`)}
          />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="mode_ctrl"
            label="Modo de Vista"
            value={mode}
            onChange={(e: any) => setMode(e.target.value)}
            options={[
              { label: "Mes (Month)", value: "month" },
              { label: "Semana (Week)", value: "week" },
              { label: "Día (Day)", value: "day" }
            ]}
          />
          <ITSelect
            name="sel_ctrl"
            label="Modo de Selección"
            value={selectionMode}
            onChange={(e: any) => setSelectionMode(e.target.value)}
            options={[
              { label: "Single", value: "single" },
              { label: "Range", value: "range" }
            ]}
          />
          <ITSelect
            name="var_ctrl"
            label="Variante de Color"
            value={calendarVariant}
            onChange={(e: any) => setCalendarVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
        </>
      }
    />
  );
};

// 9. ITSlideToggle Showcase
const SlideToggleShowcase = () => {
  const [isOn, setIsOn] = useState(false);
  const [activeColor, setActiveColor] = useState<any>("success");
  const [size, setSize] = useState<any>("md");
  const [disabled, setDisabled] = useState(false);

  const code = `<ITSlideToggle\n  isOn={${isOn}}\n  onToggle={(state) => setIsOn(state)}\n  activeColor="${activeColor}"\n  size="${size}"\n  disabled={${disabled}}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSlideToggle"
      description="Interruptor de alternancia (Switch) estilizado para cambiar estados binarios."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITSlideToggle
            isOn={isOn}
            onToggle={setIsOn}
            activeColor={activeColor}
            size={size}
            disabled={disabled}
          />
          <span className="text-xs font-mono text-slate-500">
            Estado: {isOn ? "ENCENDIDO" : "APAGADO"}
          </span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="col_ctrl"
            label="Color Activo"
            value={activeColor}
            onChange={(e: any) => setActiveColor(e.target.value)}
            options={[
              { label: "Success (Verde)", value: "success" },
              { label: "Primary (Azul)", value: "primary" },
              { label: "Danger (Rojo)", value: "danger" },
              { label: "Warning (Naranja)", value: "warning" },
              { label: "Purple (Morado)", value: "purple" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
              { label: "Large", value: "lg" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Deshabilitar Switch</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-6">
          <ITSlideToggle initialState={false} size="sm" />
          <ITSlideToggle initialState={true} activeColor="primary" size="md" />
          <ITSlideToggle initialState={true} activeColor="purple" size="lg" />
          <ITSlideToggle initialState={true} disabled size="md" />
        </div>
      }
    />
  );
};

// 10. ITDropfile Showcase
const DropfileShowcase = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<any>("pendiente");

  const code = `<ITDropfile\n  onFileSelect={(file) => setSelectedFile(file)}\n  uploadStatus="${status}"\n  showStatusBadge={true}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDropfile"
      description="Área interactiva para arrastrar y soltar archivos, con previsualización de imágenes y barra de progreso."
      code={code}
      demo={
        <div className="w-full max-w-md">
          <ITDropfile
            onFileSelect={(file) => setSelectedFile(file)}
            uploadStatus={status}
            onStatusChange={(st) => setStatus(st)}
          />
          {selectedFile && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <p>Nombre: {selectedFile.name}</p>
              <p>Tamaño: {(selectedFile.size / 1024).toFixed(1)} KB</p>
              <p>Tipo: {selectedFile.type}</p>
            </div>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="status_ctrl"
            label="Forzar Estado de Subida"
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            options={[
              { label: "Pendiente", value: "pendiente" },
              { label: "Subiendo (Uploading)", value: "subiendo" },
              { label: "Subido (Uploaded)", value: "subido" },
              { label: "Error", value: "error" }
            ]}
          />
        </>
      }
    />
  );
};

// 11. ITFormBuilder Showcase
const FormBuilderShowcase = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    country: "MX",
    accept: false
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const config: any = [
    { name: "name", label: "Nombre Completo", type: "text", required: true },
    { name: "email", label: "Correo de Contacto", type: "email", required: true },
    {
      name: "country",
      label: "País Operación",
      type: "select",
      options: [
        { label: "México", value: "MX" },
        { label: "Chile", value: "CL" },
        { label: "Perú", value: "PE" }
      ]
    },
    { name: "accept", label: "Acepto términos y condiciones", type: "checkbox" }
  ];

  const code = `<ITFormBuilder\n  config={[\n    { name: 'name', label: 'Nombre', type: 'text', required: true },\n    { name: 'email', label: 'Email', type: 'email' },\n    ...\n  ]}\n  values={formValues}\n  handleChange={handleFormChange}\n/>`;

  return (
    <ShowcaseLayout
      title="ITFormBuilder"
      description="Generador dinámico de formularios basado en un esquema estructurado JSON."
      code={code}
      demo={
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm space-y-6">
          <ITFormBuilder
            config={config}
            values={values}
            handleChange={handleChange}
            handleBlur={() => { }}
            touched={{}}
            errors={{}}
          />
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h5 className="text-xs font-bold uppercase text-slate-400 mb-2">Valores del Formulario (JSON):</h5>
            <pre className="p-3 bg-slate-950 text-emerald-400 text-xs rounded-lg overflow-x-auto font-mono">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
          <p className="text-slate-500">El formulario se genera dinámicamente inyectando un array de campos configurados.</p>
        </div>
      }
    />
  );
};

// 12. ITCard Showcase
const CardShowcase = () => {
  const [title, setTitle] = useState("Registro de Logs del Sistema");
  const [showActions, setShowActions] = useState(true);

  const code = `<ITCard\n  title="${title}"\n  actions={${showActions ? "<ITButton label='Exportar' />" : "undefined"}}\n>\n  <p>Contenido interno de la tarjeta.</p>\n</ITCard>`;

  return (
    <ShowcaseLayout
      title="ITCard"
      description="Tarjetas de contenedor multipropósito con cabecera y espacio para acciones."
      code={code}
      demo={
        <div className="w-full max-w-md">
          <ITCard
            title={title}
            actions={showActions ? <ITButton label="Exportar" color="primary" size="small" variant="outlined" /> : undefined}
          >
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Esta es una tarjeta administrativa estándar AXZY. Es ideal para agrupar paneles de control, tablas y formularios.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">Estado de servidor: Conectado</span>
              </div>
            </div>
          </ITCard>
        </div>
      }
      controls={
        <>
          <ITInput name="title_ctrl" label="Título de Tarjeta" value={title} onChange={(e: any) => setTitle(e.target.value)} onBlur={() => { }} />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Mostrar Botón de Acción</span>
            <ITSlideToggle isOn={showActions} onToggle={setShowActions} size="sm" />
          </div>
        </>
      }
    />
  );
};

// 13. ITTable Showcase
const TableShowcase = () => {
  const [variant, setVariant] = useState<any>("default");
  const [size, setSize] = useState<any>("md");

  const columns: any = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Nombre", type: "string" },
    { key: "role", label: "Rol", type: "string" },
    {
      key: "status",
      label: "Estado",
      type: "actions",
      render: (row: any) => (
        <ITBadget
          label={row.status ? "Conectado" : "Inactivo"}
          color={row.status ? "success" : "danger"}
          size="small"
        />
      )
    }
  ];

  const data = [
    { id: 101, name: "Esteban Dido", role: "Auditor", status: true },
    { id: 102, name: "Elsa Pato", role: "Administrador", status: true },
    { id: 103, name: "Aquiles Baeza", role: "Operador", status: false }
  ];

  const code = `<ITTable\n  columns={columns}\n  data={data}\n  variant="${variant}"\n  size="${size}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITTable"
      description="Base de renderizado de tablas estructuradas con soporte de alineamiento y tipado estricto."
      code={code}
      demo={
        <div className="w-full bg-white dark:bg-slate-900 border rounded-xl overflow-hidden shadow-sm">
          <ITTable
            columns={columns}
            data={data}
            variant={variant}
            size={size}
          />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label="Variante Estilo"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Default", value: "default" },
              { label: "Striped (Cebra)", value: "striped" },
              { label: "Bordered (Bordes)", value: "bordered" },
              { label: "Clean (Limpio)", value: "clean" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label="Tamaño Filas"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small (sm)", value: "sm" },
              { label: "Medium (md)", value: "md" },
              { label: "Large (lg)", value: "lg" }
            ]}
          />
        </>
      }
    />
  );
};

// 14. ITDataTable Showcase
const DataTableShowcase = () => {
  const userColumns = useMemo(() => [
    { key: "id", label: "ID", type: "number" as const },
    { key: "name", label: "Nombre", type: "string" as const, filter: true },
    { key: "role", label: "Rol", type: "string" as const, filter: true },
    { key: "active", label: "Activo", type: "boolean" as const, filter: true }
  ], []);

  const fetchData = useCallback(async (params: ITDataTableFetchParams): Promise<ITDataTableResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    let mockData = [
      { id: 1, name: "Juan Pérez", role: "Administrador", active: true },
      { id: 2, name: "María García", role: "Usuario", active: true },
      { id: 3, name: "Pedro López", role: "Usuario", active: false },
      { id: 4, name: "Ana Torres", role: "Editor", active: true },
      { id: 5, name: "Luis Gómez", role: "Administrador", active: false }
    ];

    // Simple client side filter mock for visual demo
    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        const filterVal = params.filters[key];
        if (filterVal) {
          mockData = mockData.filter(item =>
            String((item as any)[key]).toLowerCase().includes(String(filterVal).toLowerCase())
          );
        }
      });
    }

    return {
      data: mockData,
      total: mockData.length
    };
  }, []);

  const code = `<ITDataTable\n  columns={[\n    { key: 'id', label: 'ID', type: 'number' },\n    { key: 'name', label: 'Nombre', type: 'string', filter: true }\n  ]}\n  fetchData={api.fetchUsers}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDataTable"
      description="Tabla de datos auto-suficiente con carga dinámica, paginación integrada y filtros avanzados."
      code={code}
      demo={
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md">
          <ITDataTable
            columns={userColumns}
            fetchData={fetchData}
          />
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs space-y-2">
          <p className="text-slate-500">Esta tabla consume una función de carga de datos que se autogestiona en ordenamiento, paginado y filtros.</p>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded text-amber-800 dark:text-amber-300">
            Prueba a escribir en los inputs de filtro de la tabla!
          </div>
        </div>
      }
    />
  );
};

// 15. ITTabs Showcase
const TabsShowcase = () => {
  const [variant, setVariant] = useState<any>("line");

  const tabItems = [
    {
      id: "tab1",
      label: "General",
      icon: <FaInfoCircle />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">Configuración global y perfil general de la cuenta.</div>
    },
    {
      id: "tab2",
      label: "Seguridad",
      icon: <FaSlidersH />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">Ajustes de credenciales, MFA y logs de accesos.</div>
    },
    {
      id: "tab3",
      label: "Notificaciones",
      icon: <FaRegBell />,
      content: <div className="p-4 text-sm text-slate-600 dark:text-slate-300">Preferencias de alertas vía email, SMS y notificaciones PUSH.</div>
    }
  ];

  const code = `<ITTabs\n  variant="${variant}"\n  items={[\n    { id: 'tab1', label: 'General', content: <General /> }\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTabs"
      description="Separadores de contenido en pestañas integrables con íconos y transiciones."
      code={code}
      demo={
        <div className="w-full bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm min-h-[160px]">
          <ITTabs items={tabItems} defaultActiveId="tab1" variant={variant} />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label="Variante Estética"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Línea (Line)", value: "line" },
              { label: "Pastilla (Pill)", value: "pill" }
            ]}
          />
        </>
      }
    />
  );
};

// 16. ITStepper Showcase
const StepperShowcase = () => {
  const [step, setStep] = useState(0);
  const [useIcons, setUseIcons] = useState(true);

  const steps = [
    { label: "Validar Identidad", content: <div className="p-6">Paso 1: Sube tu documento de identidad oficial.</div> },
    { label: "Cargar KYC", content: <div className="p-6">Paso 2: Rellena tus datos fiscales y origen de fondos.</div> },
    { label: "Completar Firma", content: <div className="p-6">Paso 3: Realiza la firma biométrica digital.</div> }
  ];

  const code = `<ITStepper\n  steps={steps}\n  currentStep={${step}}\n  useIcons={${useIcons}}\n  onStepChange={(idx) => setStep(idx)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITStepper"
      description="Barra e indicador secuencial de pasos para completar procesos guiados complejos."
      code={code}
      demo={
        <div className="w-full">
          <ITStepper
            steps={steps}
            currentStep={step}
            useIcons={useIcons}
            onStepChange={setStep}
            onFinish={() => alert("Proceso completado exitosamente!")}
          />
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Usar íconos</span>
            <ITSlideToggle isOn={useIcons} onToggle={setUseIcons} size="sm" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-semibold text-gray-700">Reiniciar Paso</span>
            <button onClick={() => setStep(0)} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-800">
              <FaSync size={12} />
            </button>
          </div>
        </>
      }
    />
  );
};

// 17. ITPagination Showcase
const PaginationShowcase = () => {
  const [page, setPage] = useState(1);
  const [color, setColor] = useState<any>("primary");

  const code = `<ITPagination\n  currentPage={${page}}\n  totalPages={10}\n  onPageChange={(p) => setPage(p)}\n  color="${color}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITPagination"
      description="Controlador de navegación de páginas numeradas con botones de dirección rápida."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITPagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            color={color}
          />
          <span className="text-xs font-mono text-slate-500">Página actual activa: {page} de 10</span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="col_ctrl"
            label="Color del Botón Activo"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
              { label: "Purple", value: "purple" }
            ]}
          />
        </>
      }
    />
  );
};

// 18. ITTripleFilter Showcase
const TripleFilterShowcase = () => {
  const [filter, setFilter] = useState("all");

  const code = `<ITTripleFilter\n  value="${filter}"\n  onChange={(val) => setFilter(String(val))}\n  options={[\n    { label: 'Todos', value: 'all' },\n    { label: 'Activos', value: 'active' },\n    { label: 'Inactivos', value: 'inactive' }\n  ]}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTripleFilter"
      description="Selector segmentado rápido diseñado típicamente para filtros rápidos de 3 estados."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-4">
          <ITTripleFilter
            value={filter}
            onChange={(val) => setFilter(String(val))}
            options={[
              { label: "Todos", value: "all" },
              { label: "Activos", value: "active" },
              { label: "Inactivos", value: "inactive" }
            ]}
          />
          <p className="text-xs text-slate-500 font-mono">Filtro activo: "{filter}"</p>
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
          <p className="text-slate-500">Proporciona un layout de tipo segmentado con animación al cambiar entre las opciones disponibles.</p>
        </div>
      }
    />
  );
};

// 19. ITDialog Showcase
const DialogShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [useFormHeader, setUseFormHeader] = useState(true);

  const code = `<ITDialog\n  isOpen={${isOpen}}\n  onClose={() => setIsOpen(false)}\n  title="Confirmación de Auditoría"\n  useFormHeader={${useFormHeader}}\n>\n  <p>¿Estás seguro de registrar esta auditoría?</p>\n</ITDialog>`;

  return (
    <ShowcaseLayout
      title="ITDialog"
      description="Cajas de diálogo modales con overlay oscuro y soporte de cabeceras de formulario."
      code={code}
      demo={
        <div>
          <ITButton label="Abrir Ventana Modal" color="primary" onClick={() => setIsOpen(true)} />
          <ITDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Confirmación de Auditoría"
            useFormHeader={useFormHeader}
          >
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Se guardará un registro inmutable en los logs de la blockchain corporativa. Esta acción es irreversible.
              </p>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <ITButton label="Cancelar" variant="ghost" onClick={() => setIsOpen(false)} />
                <ITButton label="Autorizar" color="success" onClick={() => { alert("Transacción firmada!"); setIsOpen(false); }} />
              </div>
            </div>
          </ITDialog>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Usar Cabecera de Formulario</span>
            <ITSlideToggle isOn={useFormHeader} onToggle={setUseFormHeader} size="sm" />
          </div>
        </>
      }
    />
  );
};

// 20. ITToast Showcase
const ToastShowcase = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<any>("success");
  const [msg, setMsg] = useState("¡La operación se procesó con éxito!");

  const code = `<ITToast\n  message="${msg}"\n  type="${type}"\n  duration={3000}\n  onClose={() => setVisible(false)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITToast"
      description="Alertas efímeras del sistema flotantes para notificar eventos inmediatos al usuario."
      code={code}
      demo={
        <div>
          <ITButton label="Lanzar Notificación" color="purple" onClick={() => setVisible(true)} />
          {visible && (
            <ITToast
              message={msg}
              type={type}
              duration={3000}
              onClose={() => setVisible(false)}
            />
          )}
        </div>
      }
      controls={
        <>
          <ITInput name="msg_ctrl" label="Mensaje" value={msg} onChange={(e: any) => setMsg(e.target.value)} onBlur={() => { }} />
          <ITSelect
            name="type_ctrl"
            label="Tipo de Notificación"
            value={type}
            onChange={(e: any) => setType(e.target.value)}
            options={[
              { label: "Success (Éxito)", value: "success" },
              { label: "Error (Peligro)", value: "error" },
              { label: "Warning (Advertencia)", value: "warning" },
              { label: "Info (Información)", value: "info" }
            ]}
          />
        </>
      }
      gallery={
        <div className="flex flex-wrap gap-3">
          <ITButton label="Toast Exito" color="success" size="small" onClick={() => { setMsg("Operación exitosa!"); setType("success"); setVisible(true); }} />
          <ITButton label="Toast Error" color="danger" size="small" onClick={() => { setMsg("Ocurrió un fallo de red."); setType("error"); setVisible(true); }} />
          <ITButton label="Toast Warning" color="warning" size="small" onClick={() => { setMsg("Licencia por expirar."); setType("warning"); setVisible(true); }} />
          <ITButton label="Toast Info" color="info" size="small" onClick={() => { setMsg("Actualización disponible."); setType("info"); setVisible(true); }} />
        </div>
      }
    />
  );
};

// 21. ITLoader Showcase
const LoaderShowcase = () => {
  const [variant, setVariant] = useState<any>("spinner");
  const [size, setSize] = useState<any>("md");
  const [color, setColor] = useState("primary");

  const code = `<ITLoader\n  variant="${variant}"\n  size="${size}"\n  color="${color}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITLoader"
      description="Indicadores de carga animados con soporte para múltiples estilos visuales."
      code={code}
      demo={
        <div className="w-full max-w-xs flex items-center justify-center min-h-[80px]">
          <ITLoader variant={variant} size={size} color={color} />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label="Tipo de Cargador"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Spinner (Círculo)", value: "spinner" },
              { label: "Dots (Puntos)", value: "dots" },
              { label: "Bar (Barra)", value: "bar" },
              { label: "Pulse (Pulso)", value: "pulse" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Extra Small (xs)", value: "xs" },
              { label: "Small (sm)", value: "sm" },
              { label: "Medium (md)", value: "md" },
              { label: "Large (lg)", value: "lg" },
              { label: "Extra Large (xl)", value: "xl" }
            ]}
          />
          <ITSelect
            name="col_ctrl"
            label="Color"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-6">
          <ITLoader variant="spinner" size="md" color="primary" />
          <ITLoader variant="dots" size="md" color="success" />
          <div className="w-32"><ITLoader variant="bar" size="md" color="danger" /></div>
          <ITLoader variant="pulse" size="md" color="purple" />
        </div>
      }
    />
  );
};

// 22. ITImage Showcase
const ImageShowcase = () => {
  const [broken, setBroken] = useState(false);
  const src = broken ? "https://nonexistent.image.site/broken.jpg" : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80";

  const code = `<ITImage\n  src="${src}"\n  alt="Imagen Abstracta"\n  fallbackSrc="https://placehold.co/400x200?text=No+Preview"\n  className="rounded-xl object-cover h-40"\n/>`;

  return (
    <ShowcaseLayout
      title="ITImage"
      description="Componente de renderizado de imágenes inteligente con cargador interno y fallback automático ante fallas de red."
      code={code}
      demo={
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <ITImage
            src={src}
            alt="Demo abstracta"
            fallbackSrc="https://placehold.co/400x200?text=Error+Carga+Imagen"
            className="rounded-xl object-cover h-40 w-full shadow-md"
          />
          <span className="text-xs text-slate-500 font-mono">
            {broken ? "Cargando URL Rota (Fallback Activo)" : "Cargando URL Correcta"}
          </span>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Forzar Error de Carga (URL rota)</span>
            <ITSlideToggle isOn={broken} onToggle={setBroken} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 23. ITText Showcase
const TextShowcase = () => {
  const [bold, setBold] = useState(false);
  const [size, setSize] = useState("text-base");

  const code = `<ITText className="${bold ? "font-bold" : ""} ${size}">\n  Texto tipográfico estándar AXZY\n</ITText>`;

  return (
    <ShowcaseLayout
      title="ITText"
      description="Contenedor tipográfico básico alineado con las tipografías globales del tema."
      code={code}
      demo={
        <ITText className={`${bold ? "font-bold" : ""} ${size} text-slate-800 dark:text-white`}>
          Diseñado para inyectar consistencia tipográfica sobre las variables globales de Outfit/Inter.
        </ITText>
      }
      controls={
        <>
          <ITSelect
            name="sz_ctrl"
            label="Tamaño de Fuente"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Chico (text-xs)", value: "text-xs" },
              { label: "Estándar (text-base)", value: "text-base" },
              { label: "Grande (text-xl)", value: "text-xl" },
              { label: "Título (text-3xl)", value: "text-3xl" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Negrita (Bold)</span>
            <ITSlideToggle isOn={bold} onToggle={setBold} size="sm" />
          </div>
        </>
      }
    />
  );
};

// 24. ITThemeProvider Showcase
const ThemeProviderShowcase = () => {
  const { applyPreset, resolvedTheme, darkModeMode, setDarkModeMode } = useITTheme();

  const code = `// En index.tsx o App.tsx\n<ITThemeProvider>\n  <App />\n</ITThemeProvider>\n\n// En tu componente para obtener la paleta y cambiar modo:\nconst { palette, resolvedTheme, darkModeMode, setDarkModeMode, applyPreset } = useITTheme();`;

  return (
    <ShowcaseLayout
      title="ITThemeProvider"
      description="Inyector dinámico de tokens CSS que gestiona el modo oscuro/claro y las paletas de colores unificadas."
      code={code}
      demo={
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-slate-900 border p-6 rounded-2xl shadow-sm border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Modo de Apariencia</h4>
            <div className="flex flex-wrap gap-2">
              {(["light", "dark", "system"] as const).map((mode) => (
                <ITButton
                  key={mode}
                  label={mode === "light" ? "Claro ☀️" : mode === "dark" ? "Oscuro 🌙" : "Sistema 🖥️"}
                  color={darkModeMode === mode ? "primary" : "secondary"}
                  onClick={() => setDarkModeMode(mode)}
                  size="small"
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tema resuelto actualmente: <strong>{resolvedTheme === "dark" ? "Oscuro" : "Claro"}</strong>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Cambiar Preset del Sistema</h4>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset.colors)}
                  className="p-2 border rounded-xl text-xs font-semibold text-left hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      controls={
        <div className="space-y-3 text-xs text-slate-500">
          <p>Usa la burbuja de la paleta de colores flotante (FAB) en la parte inferior derecha para configurar a fondo cada color.</p>
        </div>
      }
    />
  );
};

// 25. ITLayout & ITNavbar Showcase
const LayoutShowcase = () => {
  const code = `<ITLayout\n  topBar={topBarProps}\n  sidebar={sidebarProps}\n>\n  {/* Tu Contenido aquí */}\n</ITLayout>`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">ITLayout & ITNavbar</h1>
        <p className="text-slate-500 mt-1.5 text-sm md:text-base">El chasis estructural del portal administrativo con control responsivo y colapso de sidebar.</p>
      </div>

      <ITCard title="Layout Estructural">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Este componente es el contenedor raíz de toda la suite que estás navegando en este momento. Proporciona:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Menú superior (Navbar) con avatar del usuario, correo y menú desplegable.</li>
            <li>Barra de navegación lateral interactiva (Sidebar) colapsable con sub-ítems y badges.</li>
            <li>Fondo dinámico adaptado a presets claros y oscuros.</li>
          </ul>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl">
            <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Simulación de Barra de Navegación Horizontal (ITNavbar)</h5>
            <ITNavbar
              logoText="PREVIEW NAVBAR"
              navigationItems={[
                { id: "1", label: "Inicio", isActive: true },
                { id: "2", label: "Auditoría" }
              ]}
              userMenu={{
                userName: "Auditor AXZY",
                userEmail: "auditor@axzy.dev",
                menuItems: [{ label: "Ajustes", onClick: () => { } }]
              }}
            />
          </div>
          <CodeViewer code={code} />
        </div>
      </ITCard>
    </div>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  const [activeComponentId, setActiveComponentId] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [subitemConnector, setSubitemConnector] = useState<'lines' | 'dots' | '|' | 'none'>('lines');

  // Group definitions for the sidebar
  const categories = [
    {
      id: "general",
      label: "General",
      icon: <FaHome />
    },
    {
      id: "struc",
      label: "Estructura & Layout",
      icon: <FaCreditCard />,
      subitems: [
        { id: "layout", label: "ITLayout & ITNavbar" },
        { id: "card", label: "ITCard" },
        { id: "text", label: "ITText" }
      ]
    },
    {
      id: "forms",
      label: "Formularios & Inputs",
      icon: <FaKeyboard />,
      subitems: [
        { id: "button", label: "ITButton" },
        { id: "input", label: "ITInput" },
        { id: "select", label: "ITSelect" },
        { id: "searchselect", label: "ITSearchSelect" },
        { id: "datepicker", label: "ITDatePicker" },
        { id: "timepicker", label: "ITTimePicker" },
        { id: "calendar", label: "ITCalendar" },
        { id: "slidetoggle", label: "ITSlideToggle" },
        { id: "dropfile", label: "ITDropfile" },
        { id: "formbuilder", label: "ITFormBuilder" }
      ]
    },
    {
      id: "data",
      label: "Visualización Datos",
      icon: <FaTable />,
      subitems: [
        { id: "table", label: "ITTable" },
        { id: "datatable", label: "ITDataTable" },
        { id: "badget", label: "ITBadget" },
        { id: "image", label: "ITImage" }
      ]
    },
    {
      id: "nav",
      label: "Navegación & Control",
      icon: <FaSlidersH />,
      subitems: [
        { id: "tabs", label: "ITTabs" },
        { id: "stepper", label: "ITStepper" },
        { id: "pagination", label: "ITPagination" },
        { id: "triplefilter", label: "ITTripleFilter" }
      ]
    },
    {
      id: "feed",
      label: "Feedback & Sistema",
      icon: <FaRegBell />,
      subitems: [
        { id: "dialog", label: "ITDialog" },
        { id: "toast", label: "ITToast" },
        { id: "loader", label: "ITLoader" },
        { id: "themeprovider", label: "ITThemeProvider" }
      ]
    }
  ];

  // Filter sidebar navigation items based on search term
  const filteredNavigationItems = useMemo(() => {
    return categories
      .map(cat => {
        if (!cat.subitems) {
          const matches = cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cat.id.toLowerCase().includes(searchTerm.toLowerCase());
          if (matches) {
            return {
              ...cat,
              isActive: activeComponentId === cat.id,
              action: () => setActiveComponentId(cat.id)
            };
          }
          return null;
        }

        const matchingSubitems = cat.subitems.filter(sub =>
          sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const mappedSubitems = matchingSubitems.map(sub => ({
          id: sub.id,
          label: sub.label,
          isActive: activeComponentId === sub.id,
          action: () => setActiveComponentId(sub.id)
        }));

        const isAnySubitemActive = mappedSubitems.some(sub => sub.isActive);

        return {
          ...cat,
          isActive: isAnySubitemActive,
          subitems: mappedSubitems
        };
      })
      .filter((cat): cat is Exclude<typeof cat, null> => {
        if (!cat) return false;
        if (cat.subitems) return cat.subitems.length > 0;
        return true;
      });
  }, [searchTerm, activeComponentId]);

  const sidebarProps = {
    navigationItems: filteredNavigationItems,
    subitemConnector
  };

  const topBarProps = {
    logoText: "AXZY Showroom",
    userMenu: {
      userName: "Alex Dev",
      userEmail: "alex@axzy.dev",
      menuItems: [
        { label: "Resetear Demo", onClick: () => { setActiveComponentId("home"); setSearchTerm(""); } }
      ]
    }
  };

  // Render correct component based on active navigation
  const renderShowcase = () => {
    switch (activeComponentId) {
      case "home": return <HomeShowcase />;
      // Structure
      case "layout": return <LayoutShowcase />;
      case "card": return <CardShowcase />;
      case "text": return <TextShowcase />;
      // Forms
      case "button": return <ButtonShowcase />;
      case "input": return <InputShowcase />;
      case "select": return <SelectShowcase />;
      case "searchselect": return <SearchSelectShowcase />;
      case "datepicker": return <DatePickerShowcase />;
      case "timepicker": return <TimePickerShowcase />;
      case "calendar": return <CalendarShowcase />;
      case "slidetoggle": return <SlideToggleShowcase />;
      case "dropfile": return <DropfileShowcase />;
      case "formbuilder": return <FormBuilderShowcase />;
      // Data
      case "table": return <TableShowcase />;
      case "datatable": return <DataTableShowcase />;
      case "badget": return <BadgetShowcase />;
      case "image": return <ImageShowcase />;
      // Navigation
      case "tabs": return <TabsShowcase />;
      case "stepper": return <StepperShowcase />;
      case "pagination": return <PaginationShowcase />;
      case "triplefilter": return <TripleFilterShowcase />;
      // Feedback
      case "dialog": return <DialogShowcase />;
      case "toast": return <ToastShowcase />;
      case "loader": return <LoaderShowcase />;
      case "themeprovider": return <ThemeProviderShowcase />;
      default: return <HomeShowcase />;
    }
  };

  return (
    <ITThemeProvider>
      <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Glassmorphic Search Bar Header */}
          <div className="relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Explorador de Componentes</h2>
              <p className="text-xs text-slate-500">Selecciona o filtra en la lista lateral para inspeccionar e interactuar.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Connector selection */}
              <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-950/40 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                {(['lines', 'dots', '|', 'none'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setSubitemConnector(style)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${subitemConnector === style
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                  >
                    {style === 'lines' ? 'Líneas' : style === 'dots' ? 'Puntos' : style === '|' ? 'Vertical' : 'Normal'}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Buscar componente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-100/80 dark:bg-slate-950/40 text-slate-800 dark:text-white pl-10 pr-4 py-2 text-sm rounded-xl outline-none focus:ring-2 focus:ring-primary-500 border border-transparent focus:border-transparent transition-all"
                />
                <FaSearch className="absolute left-3 top-3 text-slate-400" size={14} />
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-950/10 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-sm min-h-[500px]">
            {renderShowcase()}
          </div>
        </div>
      </ITLayout>
    </ITThemeProvider>
  );
}

export default App;
