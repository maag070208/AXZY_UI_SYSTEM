import { useState, type ReactNode } from "react";
import {
  FaBoxOpen,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaLayerGroup,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMedium,
  FaMobileAlt,
  FaSearch,
  FaServer,
} from "react-icons/fa";
import ITBadget from "../components/atoms/badget/badget";
import ITButton from "../components/atoms/button/button";
import ITDivider from "../components/atoms/divider/divider";
import ITFlex from "../components/atoms/flex/flex";
import ITGrid from "../components/atoms/grid/grid";
import ITStack from "../components/atoms/stack/stack";
import ITText from "../components/atoms/text/text";
import { techIcon, type TechIconEntry } from "./techIcons";
import { PRODUCTOS, type Producto } from "./productos";
import ProductoDetalle from "./ProductoDetalle";
import ProductoIcono from "./ProductoIcono";

const CV_URL = "/Martin_Amaro_CV_ES_2026.pdf";
const GITHUB_URL = "https://github.com/maag070208";
const LINKEDIN_URL = "https://www.linkedin.com/in/maag070208/";
const MEDIUM_URL = "https://medium.com/@axzydev";

/**
 * Degradados literales para los íconos de las métricas. Tailwind v4 no ve las
 * clases construidas en runtime, así que van escritas completas y se eligen por
 * posición.
 */
const ACCENTS = [
  "from-primary-500 to-info-500",
  "from-purple-500 to-primary-500",
  "from-primary-600 to-purple-600",
  "from-info-500 to-purple-500",
];

/**
 * Encabezado de sección: eyebrow en mayúsculas, título y subtítulo opcional.
 * Mismo patrón que el landing del sistema (`#ui-system`).
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  /** Texto chico en mayúsculas sobre el título. */
  eyebrow: string;
  /** Título de la sección. */
  title: string;
  /** Frase de apoyo debajo del título. */
  subtitle?: string;
  /** Clases extra del contenedor (márgenes). */
  className?: string;
}) => (
  <ITStack spacing={1} className={className}>
    <ITText as="p" className="!text-[11px] !font-bold uppercase !tracking-wider text-primary-600 dark:text-primary-400">
      {eyebrow}
    </ITText>
    <ITText as="h2" className="!text-xl !font-bold !tracking-tight text-slate-900 dark:text-white">
      {title}
    </ITText>
    {subtitle && (
      <ITText as="p" className="!text-sm text-slate-500 dark:text-slate-400">
        {subtitle}
      </ITText>
    )}
  </ITStack>
);

/**
 * Ícono de tecnología local, invertido en modo oscuro cuando la marca es
 * monocromática (GitHub, Express).
 */
const TechIconImg = ({
  icon,
  alt,
  size = "w-7 h-7",
}: {
  /** Ícono resuelto por `techIcons`. */
  icon: TechIconEntry;
  /** Texto alternativo. */
  alt: string;
  /** Clases de tamaño. @default "w-7 h-7" */
  size?: string;
}) => (
  <img
    src={icon.src}
    alt={alt}
    className={`${size} object-contain ${icon.mono ? "dark:invert" : ""}`}
    loading="lazy"
  />
);

/** Tarjeta de una tecnología: ícono en caja blanca + nombre. */
const TechTile = ({ icon, label }: { icon: TechIconEntry; label: string }) => (
  <div className="group flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-primary-700 dark:hover:bg-slate-900">
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-slate-900">
      <TechIconImg icon={icon} alt={label} size="w-7 h-7" />
    </div>
    <ITText as="span" className="w-full truncate text-center text-[11px] font-semibold text-slate-600 dark:text-slate-300">
      {label}
    </ITText>
  </div>
);

/** Métrica del hero: valor grande, ícono con degradado y texto de apoyo. */
const StatCard = ({ stat, index }: { stat: { label: string; value: string; hint: string; icon: ReactNode }; index: number }) => (
  <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-700">
    <div className="flex items-start justify-between gap-3">
      <ITText as="p" className="!text-3xl !font-extrabold !leading-none !tracking-tight tabular-nums text-slate-900 dark:text-white">
        {stat.value}
      </ITText>
      <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-[13px] text-white shadow-sm ${ACCENTS[index % ACCENTS.length]}`}>
        {stat.icon}
      </span>
    </div>

    <div className="mt-auto">
      <ITText as="p" className="!text-sm !font-semibold text-primary-600 dark:text-primary-400">
        {stat.label}
      </ITText>
      <ITText as="p" className="!mt-0.5 !text-[11px] text-slate-400 dark:text-slate-500">
        {stat.hint}
      </ITText>
    </div>
  </div>
);

/**
 * Tarjeta de producto, compacta: portada (captura real o degradado), nombre,
 * descripción corta, stack y acceso al detalle.
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
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-700">
      {/* Portada */}
      <button
        type="button"
        disabled={!tieneDetalle}
        onClick={() => onVerDetalle(producto)}
        aria-label={tieneDetalle ? `Ver detalle de ${producto.nombre}` : producto.nombre}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60"
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
          <ITText as="h3" className="!text-base !font-bold !tracking-tight text-slate-900 dark:text-white">
            {producto.nombre}
          </ITText>
        </ITFlex>
        <ITBadget label={producto.tipo} color="primary" variant="outlined" />
      </ITFlex>

      <ITText as="p" className="!text-sm !leading-relaxed text-slate-600 dark:text-slate-300">
        {producto.descripcion}
      </ITText>

      <ITFlex gap={1.5} wrap="wrap">
        {producto.stack.map((tecnologia) => (
          <span
            key={tecnologia}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          >
            {tecnologia}
          </span>
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

  const STATS = [
    { label: "Experiencia", value: "5+", hint: "años como fullstack", icon: <FaCode /> },
    { label: "Tecnologías", value: `${TECH_STACK.length}`, hint: "en el stack", icon: <FaLayerGroup /> },
    { label: "Productos", value: `${PRODUCTOS.length}`, hint: "propios y en uso", icon: <FaBoxOpen /> },
    { label: "Modalidad", value: "Remoto", hint: "disponible ya", icon: <FaMapMarkerAlt /> },
  ];

  const categoriesList = [
    { id: "all", name: "Todos", icon: <FaLayerGroup size={10} /> },
    { id: "frontend", name: "Frontend", icon: <FaCode size={10} /> },
    { id: "backend", name: "Backend", icon: <FaServer size={10} /> },
    { id: "mobile", name: "Móvil", icon: <FaMobileAlt size={10} /> },
    { id: "database", name: "Bases de Datos", icon: <FaDatabase size={10} /> },
    { id: "devops", name: "DevOps", icon: <FaCloud size={10} /> },
  ];

  const filteredTech = TECH_STACK.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(techSearch.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ITStack spacing={10} className="animate-fadeIn overflow-x-clip pb-5">
      {/* ─── HERO ─── */}
      <section
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-white to-purple-50 px-8 py-14 dark:from-primary-950/30 dark:via-slate-900 dark:to-purple-950/30 sm:px-14"
      >
        <div aria-hidden className="it-landing-float pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl" />
        <div
          aria-hidden
          className="it-landing-float pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
        <div aria-hidden className="it-landing-grid pointer-events-none absolute inset-0 text-slate-400/50 dark:text-slate-600/40" />

        <div className="relative z-10 flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-14">
          <div className="min-w-0 max-w-3xl flex-1 xl:max-w-2xl">
            <div className="it-landing-rise">
              <ITBadget label="Portafolio · 2026" color="primary" variant="outlined" className="w-fit" />
            </div>

            <ITText
              as="h1"
              id="home-hero-title"
              className="it-landing-rise !mt-5 !text-4xl !font-extrabold !tracking-tight text-slate-900 dark:text-white sm:!text-5xl"
              style={{ animationDelay: "70ms" }}
            >
              Hola, soy{" "}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">
                Asael Amaro
              </span>
            </ITText>

            <ITText
              as="p"
              className="it-landing-rise !mt-4 !text-base !leading-relaxed max-w-xl text-slate-600 dark:text-slate-300"
              style={{ animationDelay: "140ms" }}
            >
              Fullstack Developer con 4+ años creando aplicaciones web modernas.
              Especializado en TypeScript, Angular y React, con foco en arquitectura
              limpia y en productos que la gente usa todos los días.
            </ITText>

            <ITFlex
              gap={3}
              wrap="wrap"
              align="center"
              className="it-landing-rise !mt-7"
              style={{ animationDelay: "210ms" }}
            >
              <a href={CV_URL} download>
                <ITButton variant="filled" color="primary" size="lg" icon={<FaDownload size={13} />}>
                  Descargar CV
                </ITButton>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <ITButton variant="outlined" color="secondary" size="lg" icon={<FaGithub size={13} />}>
                  GitHub
                </ITButton>
              </a>
            </ITFlex>

            <div
              className="it-landing-rise mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-purple-50 px-4 py-2 shadow-sm dark:border-primary-800/50 dark:from-primary-950/30 dark:to-purple-950/30"
              style={{ animationDelay: "280ms" }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
              </span>
              <code className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Disponible para proyectos fullstack
              </code>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400"
              >
                <FaLinkedin size={12} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Foto en tarjeta flotante */}
          <div className="flex w-full shrink-0 justify-center xl:w-[300px] xl:justify-end">
            <div
              className="it-landing-float w-full max-w-[300px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 shadow-xl backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/85"
              style={{ animationDelay: "0.8s" }}
            >
              <img
                src="/personalFoto.jpg"
                alt="Asael Amaro"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="flex items-center justify-between gap-3 border-t border-slate-200/80 px-4 py-3.5 dark:border-slate-700/70">
                <div>
                  <ITText as="p" className="!text-xs !font-bold text-slate-900 dark:text-white">
                    Fullstack Developer
                  </ITText>
                  <ITText as="p" className="!text-[11px] text-slate-400 dark:text-slate-500">
                    Remoto · México
                  </ITText>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success-500/40 px-2.5 py-1 text-[10px] font-semibold text-success-600 dark:text-success-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                  Disponible
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MÉTRICAS ─── */}
      <section aria-label="Métricas del perfil">
        <ITGrid container spacing={4}>
          {STATS.map((stat, index) => (
            <ITGrid item xs={6} lg={3} key={stat.label}>
              <StatCard stat={stat} index={index} />
            </ITGrid>
          ))}
        </ITGrid>
      </section>

      {/* ─── LENGUAJES Y FRAMEWORKS ─── */}
      <section>
        <SectionHeading
          eyebrow="Base técnica"
          title="Lenguajes y frameworks"
          subtitle="Con los que trabajo todos los días."
          className="!mb-5"
        />

        <ITGrid container spacing={5}>
          <ITGrid item xs={12} lg={6}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <ITText as="h3" className="!text-[11px] !font-bold uppercase !tracking-wider text-slate-400 dark:text-slate-500">
                Lenguajes
              </ITText>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3">
                {LANGUAGES.map((lang) => (
                  <TechTile key={lang.name} icon={lang.icon} label={lang.name} />
                ))}
              </div>
            </div>
          </ITGrid>

          <ITGrid item xs={12} lg={6}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <ITText as="h3" className="!text-[11px] !font-bold uppercase !tracking-wider text-slate-400 dark:text-slate-500">
                Frameworks
              </ITText>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-4">
                {FRAMEWORKS.map((fw) => (
                  <TechTile key={fw.name} icon={fw.icon} label={fw.name} />
                ))}
              </div>
            </div>
          </ITGrid>
        </ITGrid>
      </section>

      {/* ─── STACK TECNOLÓGICO ─── */}
      <section>
        <SectionHeading
          eyebrow="Stack"
          title="Tecnologías que uso"
          subtitle="Filtra por área o busca por nombre."
          className="!mb-5"
        />

        <ITFlex align="center" justify="between" wrap="wrap" gap={4} className="!mb-6">
          <ITFlex gap={2} wrap="wrap">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </ITFlex>

          <div className="relative w-full sm:w-64">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
            <input
              type="text"
              placeholder="Buscar tecnología..."
              value={techSearch}
              onChange={(e) => setTechSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-4 text-xs text-slate-800 outline-none transition-all focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </ITFlex>

        {filteredTech.length > 0 ? (
          <ITGrid container spacing={3}>
            {filteredTech.map((tech, index) => (
              <ITGrid item xs={4} sm={3} md={2} lg={2} key={`${tech.name}-${index}`}>
                <TechTile icon={tech.icon} label={tech.name} />
              </ITGrid>
            ))}
          </ITGrid>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white py-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <ITText as="p" className="!text-sm text-slate-500 dark:text-slate-400">
              No se encontraron tecnologías para “{techSearch}”.
            </ITText>
          </div>
        )}

        <ITDivider className="!my-6" />
        <ITText as="p" className="!text-xs text-center text-slate-400 dark:text-slate-500">
          {filteredTech.length} de {TECH_STACK.length} tecnologías
        </ITText>
      </section>

      {/* ─── PRODUCTOS ─── */}
      <section>
        <SectionHeading
          eyebrow="Portafolio"
          title="Productos que construí"
          subtitle="Los que tienen capturas se abren en su pantalla de detalle."
          className="!mb-5"
        />

        <ITGrid container spacing={5}>
          {PRODUCTOS.map((producto) => (
            <ITGrid item xs={12} md={6} key={producto.id}>
              <TarjetaProducto producto={producto} onVerDetalle={setDetalle} />
            </ITGrid>
          ))}
        </ITGrid>
      </section>

      {/* ─── CIERRE ─── */}
      <section className="relative overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 shadow-sm dark:border-primary-900/40 dark:from-primary-950/30 dark:via-slate-900 dark:to-purple-950/30 sm:p-10">
        <div aria-hidden className="it-landing-float pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary-400/20 blur-3xl" />
        <div aria-hidden className="it-landing-grid pointer-events-none absolute inset-0 text-slate-400/40 dark:text-slate-600/30" />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <SectionHeading
              eyebrow="Siguientes pasos"
              title="¿Trabajamos juntos?"
              subtitle="Estoy disponible para proyectos fullstack, de producto o de diseño de sistemas."
            />

            <ITFlex gap={3} wrap="wrap" align="center" className="shrink-0">
              <a href={CV_URL} download>
                <ITButton variant="filled" color="primary" icon={<FaDownload size={13} />}>
                  Descargar CV
                </ITButton>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <ITButton variant="outlined" color="secondary" icon={<FaLinkedin size={13} />}>
                  LinkedIn
                </ITButton>
              </a>
            </ITFlex>
          </div>

          <ITText as="p" className="!mt-6 !text-xs text-slate-500 dark:text-slate-400">
            También escribo en{" "}
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400"
            >
              <FaMedium size={11} />
              Medium
            </a>{" "}
            y el código de mis productos está en{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400"
            >
              <FaGithub size={11} />
              GitHub
            </a>
            .
          </ITText>
        </div>
      </section>

      {/* Pantalla de detalle del producto elegido */}
      {detalle && <ProductoDetalle producto={detalle} onClose={() => setDetalle(null)} />}
    </ITStack>
  );
};
