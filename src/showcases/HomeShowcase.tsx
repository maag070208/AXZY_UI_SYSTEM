import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const HomeShowcase = () => {
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
