import { useState } from "react";
import { FaCloud, FaCode, FaDatabase, FaDownload, FaGithub, FaLayerGroup, FaLinkedin, FaMapMarkerAlt, FaMobileAlt, FaSearch, FaServer, FaMedium } from "react-icons/fa";
import ITBadget from "../components/badget/badget";
import ITButton from "../components/button/button";
import ITCard from "../components/card/card";
import ITDivider from "../components/divider/divider";
import ITFlex from "../components/flex/flex";
import ITGrid from "../components/grid/grid";
import ITStack from "../components/stack/stack";
import ITText from "../components/text/text";

export const HomeShowcase = () => {
  const [techSearch, setTechSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const LANGUAGES = [
    { name: "TypeScript", icon: "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor" },
    { name: "JavaScript", icon: "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor" },
    { name: "C#", icon: "https://icongr.am/devicon/csharp-original.svg?size=128&color=currentColor" },
    { name: "Python", icon: "https://icongr.am/devicon/python-original.svg?size=128&color=currentColor" },
    { name: "Kotlin", icon: "https://devicons.railway.app/i/kotlin.svg" },
    { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  ];

  const FRAMEWORKS = [
    { name: "Angular", icon: "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor" },
    { name: "React", icon: "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor" },
    { name: "Ionic", icon: "https://icongr.am/devicon/ionic-original.svg?size=128&color=currentColor" },
    { name: ".NET", icon: "https://icongr.am/devicon/dot-net-original.svg?size=128&color=currentColor" },
    { name: "Node.js", icon: "https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Express", icon: "https://icongr.am/devicon/express-original-wordmark.svg?size=128&color=currentColor" },
    { name: "Electron", icon: "https://icongr.am/devicon/electron-original.svg?size=128&color=currentColor" },
  ];

  const TECH_STACK = [
    { name: "TypeScript", icon: "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "JavaScript", icon: "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "Angular", icon: "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "React", icon: "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "Redux", icon: "https://devicons.railway.app/i/redux.svg", category: "frontend" },
    { name: "HTML5", icon: "https://icongr.am/devicon/html5-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "CSS3", icon: "https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "Sass", icon: "https://icongr.am/devicon/sass-original.svg?size=128&color=currentColor", category: "frontend" },
    { name: "C#", icon: "https://icongr.am/devicon/csharp-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "Python", icon: "https://icongr.am/devicon/python-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "Node.js", icon: "https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "Express", icon: "https://icongr.am/devicon/express-original-wordmark.svg?size=128&color=currentColor", category: "backend" },
    { name: ".NET Core", icon: "https://icongr.am/devicon/dot-net-original.svg?size=128&color=currentColor", category: "backend" },
    { name: "MongoDB", icon: "https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor", category: "database" },
    { name: "MySQL", icon: "https://icongr.am/devicon/mysql-original-wordmark.svg?size=128&color=currentColor", category: "database" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", category: "mobile" },
    { name: "Kotlin", icon: "https://devicons.railway.app/i/kotlin.svg", category: "mobile" },
    { name: "Android", icon: "https://icongr.am/devicon/android-original.svg?size=128&color=currentColor", category: "mobile" },
    { name: "Ionic", icon: "https://icongr.am/devicon/ionic-original.svg?size=128&color=currentColor", category: "mobile" },
    { name: "Docker", icon: "https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "Git", icon: "https://icongr.am/devicon/git-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "GitHub", icon: "https://icongr.am/devicon/github-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "GitLab", icon: "https://icongr.am/devicon/gitlab-original.svg?size=128&color=currentColor", category: "devops" },
    { name: "npm", icon: "https://devicons.railway.app/i/npm.svg", category: "devops" },
    { name: "Electron", icon: "https://icongr.am/devicon/electron-original.svg?size=128&color=currentColor", category: "desktop" },
    { name: "Visual Studio", icon: "https://icongr.am/devicon/visualstudio-plain.svg?size=128&color=currentColor", category: "tools" },
    { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg", category: "testing" },
  ];

  const categoriesList = [
    { id: "all", name: "Todos", icon: <FaLayerGroup size={10} /> },
    { id: "frontend", name: "Frontend", icon: <FaCode size={10} /> },
    { id: "backend", name: "Backend", icon: <FaServer size={10} /> },
    { id: "mobile", name: "Móvil", icon: <FaMobileAlt size={10} /> },
    { id: "database", name: "Bases de Datos", icon: <FaDatabase size={10} /> },
    { id: "devops", name: "DevOps", icon: <FaCloud size={10} /> },
  ];

  const filteredTech = TECH_STACK.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(techSearch.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ITStack spacing={10}>
      {/* ─── HERO ─── */}
      <ITCard className="overflow-hidden border-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/10 shadow-sm">
        <div className="relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

          <ITGrid container spacing={8} className="items-center relative z-10">
            {/* Photo */}
            <ITGrid item xs={12} md={5} className="flex justify-center md:justify-start">
              <ITStack spacing={4} alignItems="center">
                <div className="relative">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full shadow-xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700">
                    <img
                      src="/personalFoto.jpg"
                      alt="Asael Amaroaqui"
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              </ITStack>
            </ITGrid>

            {/* Text */}
            <ITGrid item xs={12} md={7}>
              <ITStack spacing={5}>
                <ITStack spacing={2}>
                  <ITBadget label="Portafolio Personal" color="primary" variant="outlined" className="w-fit" />
                  <ITText as="h1" className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Hola, soy <span className="text-primary-600 dark:text-primary-400">Asael Amaroaqui</span>
                  </ITText>
                  <ITText as="p" muted className="text-base leading-relaxed max-w-xl">
                    Fullstack Developer con 4+ años de experiencia creando aplicaciones web modernas. 
                    Especializado en TypeScript, Angular y React. Apasionado por la arquitectura limpia, 
                    el código escalable y las tecnologías emergentes.
                  </ITText>
                </ITStack>

                {/* Stats */}
                <ITFlex gap={6} wrap="wrap">
                  <ITFlex align="center" gap={3}>
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FaCode size={16} />
                    </div>
                    <div>
                      <ITText as="div" className="text-lg font-bold text-slate-800 dark:text-white">4+</ITText>
                      <ITText as="div" muted className="text-xs font-medium">Años exp.</ITText>
                    </div>
                  </ITFlex>
                  <ITFlex align="center" gap={3}>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <FaMapMarkerAlt size={16} />
                    </div>
                    <div>
                      <ITText as="div" className="text-lg font-bold text-slate-800 dark:text-white">Remoto</ITText>
                      <ITText as="div" muted className="text-xs font-medium">Disponible</ITText>
                    </div>
                  </ITFlex>
                </ITFlex>

                {/* CTAs */}
                <ITFlex gap={2.5} wrap="wrap" align="center">
                  <a href="/Martin_Amaro_CV_ES_2026.pdf" download>
                    <ITButton variant="filled" color="primary" size="small">
                      <ITFlex align="center" gap={2}>
                        <FaDownload size={12} />
                        Descargar CV
                      </ITFlex>
                    </ITButton>
                  </a>
                  <ITText as="span" muted className="text-xs">|</ITText>
                  <a href="https://github.com/maag070208" target="_blank" rel="noopener noreferrer">
                    <ITButton variant="text" color="gray" size="small">
                      <ITFlex align="center" gap={1.5}>
                        <FaGithub size={14} />
                        GitHub
                      </ITFlex>
                    </ITButton>
                  </a>
                  <a href="https://www.linkedin.com/in/maag070208/" target="_blank" rel="noopener noreferrer">
                    <ITButton variant="text" color="gray" size="small">
                      <ITFlex align="center" gap={1.5}>
                        <FaLinkedin size={14} />
                        LinkedIn
                      </ITFlex>
                    </ITButton>
                  </a>
                  <a href="https://medium.com/@axzydev" target="_blank" rel="noopener noreferrer">
                    <ITButton variant="text" color="gray" size="small">
                      <ITFlex align="center" gap={1.5}>
                        <FaMedium size={14} />
                        Medium
                      </ITFlex>
                    </ITButton>
                  </a>
                </ITFlex>
              </ITStack>
            </ITGrid>
          </ITGrid>
        </div>
      </ITCard>

      {/* ─── SKILLS ─── */}
      <ITGrid container spacing={6}>
        <ITGrid item xs={12} md={6}>
          <ITCard title="Lenguajes" className="border-slate-200/60 dark:border-slate-800/60 shadow-sm">
            <ITStack spacing={4}>
              <ITGrid container spacing={3}>
                {LANGUAGES.map((lang) => (
                  <ITGrid item xs={4} sm={4} key={lang.name}>
                    <div className="group flex flex-col items-center gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-primary-400/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 group-hover:scale-110 transition-transform duration-200">
                        <img src={lang.icon} alt={lang.name} className="w-7 h-7 object-contain" />
                      </div>
                      <ITText as="span" className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 text-center">
                        {lang.name}
                      </ITText>
                    </div>
                  </ITGrid>
                ))}
              </ITGrid>
            </ITStack>
          </ITCard>
        </ITGrid>

        <ITGrid item xs={12} md={6}>
          <ITCard title="Frameworks" className="border-slate-200/60 dark:border-slate-800/60 shadow-sm">
            <ITStack spacing={4}>
              <ITGrid container spacing={2}>
                {FRAMEWORKS.map((fw) => (
                  <ITGrid item xs={3} key={fw.name}>
                    <div className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-purple-400/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 group-hover:scale-110 transition-transform duration-200">
                        <img src={fw.icon} alt={fw.name} className="w-6 h-6 object-contain" />
                      </div>
                      <ITText as="span" className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight truncate w-full">
                        {fw.name}
                      </ITText>
                    </div>
                  </ITGrid>
                ))}
              </ITGrid>
            </ITStack>
          </ITCard>
        </ITGrid>
      </ITGrid>

      {/* ─── TECH STACK ─── */}
      <ITCard
        title="Stack Tecnológico"
        className="border-slate-200/60 dark:border-slate-800/60 shadow-sm"
      >
        <ITStack spacing={5}>
          {/* Filters */}
          <ITFlex align="center" justify="between" wrap="wrap" gap={4}>
            <ITFlex gap={2} wrap="wrap">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-200 dark:border-primary-800"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-transparent"
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </ITFlex>
            <div className="relative w-full sm:w-56">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                placeholder="Buscar tecnología..."
                value={techSearch}
                onChange={(e) => setTechSearch(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/80 text-slate-800 dark:text-white pl-8 pr-4 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-primary-500/50 border border-slate-200 dark:border-slate-700 transition-all"
              />
            </div>
          </ITFlex>

          {/* Divider */}
          <ITDivider />

          {/* Tech Grid */}
          {filteredTech.length > 0 ? (
            <ITGrid container spacing={2}>
              {filteredTech.map((tech, index) => (
                <ITGrid item xs={3} sm={2} md={2} lg={1} key={`${tech.name}-${index}`}>
                  <div className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 hover:border-primary-400/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <ITText as="span" className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 text-center truncate w-full group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      {tech.name}
                    </ITText>
                  </div>
                </ITGrid>
              ))}
            </ITGrid>
          ) : (
            <div className="text-center py-12">
              <ITText muted className="text-sm">No se encontraron tecnologías para "{techSearch}"</ITText>
            </div>
          )}

          {/* Footer count */}
          <ITDivider />
          <ITText as="div" muted className="text-xs text-center">
            {filteredTech.length} de {TECH_STACK.length} tecnologías
          </ITText>
        </ITStack>
      </ITCard>
    </ITStack>
  );
};
