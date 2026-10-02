import { useState } from "react";
import { FaCloud, FaCode, FaDatabase, FaDownload, FaExternalLinkAlt, FaGithub, FaLayerGroup, FaLinkedin, FaMapMarkerAlt, FaMobileAlt, FaSearch, FaServer, FaMedium } from "react-icons/fa";
import ITBadget from "../components/atoms/badget/badget";
import ITButton from "../components/atoms/button/button";
import ITCard from "../components/molecules/card/card";
import ITDivider from "../components/atoms/divider/divider";
import ITFlex from "../components/atoms/flex/flex";
import ITGrid from "../components/atoms/grid/grid";
import ITStack from "../components/atoms/stack/stack";
import ITText from "../components/atoms/text/text";
import { techIcon, type TechIconEntry } from "./techIcons";
import { PRODUCTOS, type Producto } from "./productos";
import ProductoDetalle from "./ProductoDetalle";
import ProductoIcono from "./ProductoIcono";

/**
 * Renders a local tech icon, inverting monochrome marks (GitHub, Express) in
 * dark mode so they stay visible on the dark card.
 */
const TechIconImg = ({
  icon,
  alt,
  size = "w-7 h-7",
}: {
  icon: TechIconEntry;
  alt: string;
  /** Clases de tamaño (ancho/alto). @default "w-7 h-7" */
  size?: string;
}) => (
  <img
    src={icon.src}
    alt={alt}
    className={`${size} object-contain ${icon.mono ? "dark:invert" : ""}`}
  />
);

/**
 * Tarjeta de producto, compacta: portada (captura de la app real o degradado),
 * nombre, descripción corta, stack y el acceso al detalle. Todo lo largo vive
 * en la pantalla de detalle.
 */
const TarjetaProducto = ({
  producto,
  onVerDetalle,
}: {
  producto: Producto;
  onVerDetalle: (producto: Producto) => void;
}) => {
  const capturas = producto.capturas ?? [];
  const portada = capturas[0];
  const tieneDetalle = capturas.length > 0;
  const enlaceInterno = producto.enlace?.startsWith("#");

  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 hover:border-primary-400/40 hover:shadow-lg transition-all duration-200">
      {/* Portada */}
      <button
        type="button"
        disabled={!tieneDetalle}
        onClick={() => onVerDetalle(producto)}
        aria-label={tieneDetalle ? `Ver detalle de ${producto.nombre}` : producto.nombre}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60"
      >
        {portada ? (
          <img
            src={portada.src}
            alt={`${producto.nombre}: ${portada.titulo}`}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${producto.gradiente} text-white`}>
            <ProductoIcono icono={producto.icono} size={44} />
          </div>
        )}

        {capturas.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {capturas.length} capturas
          </span>
        )}
      </button>

      {/* Encabezado */}
      <ITFlex align="center" justify="between" gap={3}>
        <ITFlex align="center" gap={2.5}>
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${producto.gradiente} text-white shadow-sm`}>
            <ProductoIcono icono={producto.icono} size={16} />
          </div>
          <ITText as="h3" className="!text-base !font-bold">
            {producto.nombre}
          </ITText>
        </ITFlex>
        <ITBadget label={producto.tipo} color="primary" variant="outlined" />
      </ITFlex>

      <ITText as="p" muted className="!text-sm !leading-relaxed">
        {producto.descripcion}
      </ITText>

      <ITFlex gap={2} wrap="wrap">
        {producto.stack.map((tecnologia) => (
          <ITBadget key={tecnologia} label={tecnologia} color="gray" variant="outlined" />
        ))}
      </ITFlex>

      {/* Acciones */}
      <ITFlex align="center" justify="between" gap={3} wrap="wrap" className="mt-auto pt-2">
        {tieneDetalle ? (
          <ITButton variant="filled" color="primary" size="sm" onClick={() => onVerDetalle(producto)}>
            Ver detalle
          </ITButton>
        ) : (
          <ITText as="span" />
        )}

        {producto.enlace && (
          <a
            href={producto.enlace}
            {...(enlaceInterno ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="!text-xs !font-semibold !text-primary-600 dark:!text-primary-400 inline-flex items-center gap-1.5"
          >
            {!enlaceInterno && <FaExternalLinkAlt size={11} />}
            {producto.enlaceTexto ?? "Ver el repositorio"}
          </a>
        )}
      </ITFlex>
    </div>
  );
};

export const HomeShowcase = () => {
  const [techSearch, setTechSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [detalle, setDetalle] = useState<Producto | null>(null);

  const LANGUAGES = [
    { name: "TypeScript", icon: techIcon("typescript") },
    { name: "JavaScript", icon: techIcon("javascript") },
    { name: "C#", icon: techIcon("csharp") },
    { name: "Python", icon: techIcon("python") },
    { name: "Kotlin", icon: techIcon("kotlin") },
    { name: "Dart", icon: techIcon("dart") },
  ];

  const FRAMEWORKS = [
    { name: "Angular", icon: techIcon("angular") },
    { name: "React", icon: techIcon("react") },
    { name: "Ionic", icon: techIcon("ionic") },
    { name: ".NET", icon: techIcon("dotnet") },
    { name: "Node.js", icon: techIcon("nodejs") },
    { name: "Flutter", icon: techIcon("flutter") },
    { name: "Express", icon: techIcon("express") },
    { name: "Electron", icon: techIcon("electron") },
  ];

  const TECH_STACK = [
    { name: "TypeScript", icon: techIcon("typescript"), category: "frontend" },
    { name: "JavaScript", icon: techIcon("javascript"), category: "frontend" },
    { name: "Angular", icon: techIcon("angular"), category: "frontend" },
    { name: "React", icon: techIcon("react"), category: "frontend" },
    { name: "Redux", icon: techIcon("redux"), category: "frontend" },
    { name: "HTML5", icon: techIcon("html5"), category: "frontend" },
    { name: "CSS3", icon: techIcon("css3"), category: "frontend" },
    { name: "Sass", icon: techIcon("sass"), category: "frontend" },
    { name: "C#", icon: techIcon("csharp"), category: "backend" },
    { name: "Python", icon: techIcon("python"), category: "backend" },
    { name: "Node.js", icon: techIcon("nodejs"), category: "backend" },
    { name: "Express", icon: techIcon("express"), category: "backend" },
    { name: ".NET Core", icon: techIcon("dotnet"), category: "backend" },
    { name: "MongoDB", icon: techIcon("mongodb"), category: "database" },
    { name: "MySQL", icon: techIcon("mysql"), category: "database" },
    { name: "Flutter", icon: techIcon("flutter"), category: "mobile" },
    { name: "Kotlin", icon: techIcon("kotlin"), category: "mobile" },
    { name: "Android", icon: techIcon("android"), category: "mobile" },
    { name: "Ionic", icon: techIcon("ionic"), category: "mobile" },
    { name: "Docker", icon: techIcon("docker"), category: "devops" },
    { name: "Git", icon: techIcon("git"), category: "devops" },
    { name: "GitHub", icon: techIcon("github"), category: "devops" },
    { name: "GitLab", icon: techIcon("gitlab"), category: "devops" },
    { name: "npm", icon: techIcon("npm"), category: "devops" },
    { name: "Electron", icon: techIcon("electron"), category: "desktop" },
    { name: "Visual Studio", icon: techIcon("visualstudio"), category: "tools" },
    { name: "Jest", icon: techIcon("jest"), category: "testing" },
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
    <ITStack spacing={10} className="overflow-x-clip">
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
                      alt="Asael Amaro"
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
                    Hola, soy <span className="text-primary-600 dark:text-primary-400">Asael Amaro</span>
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
                    <ITButton variant="filled" color="primary" size="sm">
                      <ITFlex align="center" gap={2}>
                        <FaDownload size={12} />
                        Descargar CV
                      </ITFlex>
                    </ITButton>
                  </a>
                  <ITText as="span" muted className="text-xs">|</ITText>
                  <a href="https://github.com/maag070208" target="_blank" rel="noopener noreferrer">
                    <ITButton variant="text" color="gray" size="sm">
                      <ITFlex align="center" gap={1.5}>
                        <FaGithub size={14} />
                        GitHub
                      </ITFlex>
                    </ITButton>
                  </a>
                  <a href="https://www.linkedin.com/in/maag070208/" target="_blank" rel="noopener noreferrer">
                    <ITButton variant="text" color="gray" size="sm">
                      <ITFlex align="center" gap={1.5}>
                        <FaLinkedin size={14} />
                        LinkedIn
                      </ITFlex>
                    </ITButton>
                  </a>
                  <a href="https://medium.com/@axzydev" target="_blank" rel="noopener noreferrer">
                    <ITButton variant="text" color="gray" size="sm">
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
                        <TechIconImg icon={lang.icon} alt={lang.name} />
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
              <ITGrid container spacing={3}>
                {FRAMEWORKS.map((fw) => (
                  <ITGrid item xs={4} sm={4} key={fw.name}>
                    <div className="group flex flex-col items-center gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-primary-400/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 group-hover:scale-110 transition-transform duration-200">
                        <TechIconImg icon={fw.icon} alt={fw.name} />
                      </div>
                      <ITText as="span" className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 text-center">
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
                <ITGrid item xs={4} sm={3} md={2} lg={2} key={`${tech.name}-${index}`}>
                  <div className="group flex h-full flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 hover:border-primary-400/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                      <TechIconImg icon={tech.icon} alt={tech.name} size="w-8 h-8" />
                    </div>
                    <ITText as="span" className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 text-center truncate w-full group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
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

      {/* ─── MIS PRODUCTOS ─── */}
      <ITCard
        title="Mis Productos"
        className="border-slate-200/60 dark:border-slate-800/60 shadow-sm"
      >
        <ITText as="p" muted className="!text-sm !mb-5">
          Productos que he construido. Los que tienen capturas se abren en su
          pantalla de detalle.
        </ITText>

        <ITGrid container spacing={5}>
          {PRODUCTOS.map((producto) => (
            <ITGrid item xs={12} md={6} key={producto.id}>
              <TarjetaProducto producto={producto} onVerDetalle={setDetalle} />
            </ITGrid>
          ))}
        </ITGrid>
      </ITCard>

      {/* Pantalla de detalle del producto elegido */}
      {detalle && <ProductoDetalle producto={detalle} onClose={() => setDetalle(null)} />}
    </ITStack>
  );
};
