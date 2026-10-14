import { useState, type CSSProperties, type ReactNode } from "react";
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
import { useITTranslation } from "@/i18n";

const CV_URL = "/Martin_Amaro_CV_ES_2026.pdf";
const GITHUB_URL = "https://github.com/maag070208";
const LINKEDIN_URL = "https://www.linkedin.com/in/maag070208/";
const MEDIUM_URL = "https://medium.com/@axzydev";

/** Shared stagger offset for the hero entrance cascade (`it-reveal`). */
const reveal = (delay: number): CSSProperties =>
  ({ "--it-delay": `${delay}ms` }) as CSSProperties;

/** Muted mono eyebrow used by every section heading and metadata label. */
const EYEBROW =
  "font-mono !text-[11px] !font-medium uppercase !tracking-[0.18em] text-slate-500 dark:text-slate-400";

/** Technical card surface: 1px border, 14px radius, shadow only on hover. */
const CARD =
  "rounded-[14px] border border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-900";
const CARD_HOVER =
  "hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] dark:hover:border-primary-500";

/**
 * Encabezado de sección: eyebrow mono (`//`) + título display + subtítulo.
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
  <ITStack spacing={1.5} className={className}>
    <ITText as="p" className={EYEBROW}>
      {`// ${eyebrow}`}
    </ITText>
    <ITText
      as="h2"
      className="font-display !text-xl !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
    >
      {title}
    </ITText>
    {subtitle && (
      <ITText as="p" className="!text-sm !leading-relaxed text-slate-500 dark:text-slate-400">
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

/** Tile técnica: caja cuadrada, borde 1px, icono centrado y label mono. */
const TechTile = ({ icon, label }: { icon: TechIconEntry; label: string }) => (
  <div
    className={`group flex h-full flex-col items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-500`}
  >
    <TechIconImg icon={icon} alt={label} size="w-7 h-7" />
    <ITText
      as="span"
      className="w-full truncate text-center font-mono !text-[10px] !font-medium uppercase !tracking-[0.12em] text-slate-500 dark:text-slate-400"
    >
      {label}
    </ITText>
  </div>
);

/** Métrica del hero: cifra en display, tile técnica y texto de apoyo mono. */
const StatCard = ({
  stat,
}: {
  stat: { label: string; value: string; hint: string; icon: ReactNode };
}) => (
  <div className={`flex h-full flex-col gap-4 p-5 ${CARD} ${CARD_HOVER}`}>
    <div className="flex items-start justify-between gap-3">
      <ITText
        as="p"
        className="font-display !text-3xl !font-bold !leading-none tabular-nums -tracking-[0.02em] text-slate-900 dark:text-white"
      >
        {stat.value}
      </ITText>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-[13px] text-primary-600 dark:border-slate-800 dark:bg-slate-950 dark:text-primary-400">
        {stat.icon}
      </span>
    </div>

    <div className="mt-auto">
      <ITText
        as="p"
        className="font-mono !text-[10px] !font-medium uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400"
      >
        {stat.label}
      </ITText>
      <ITText as="p" className="!mt-1 !text-[11px] text-slate-500 dark:text-slate-400">
        {stat.hint}
      </ITText>
    </div>
  </div>
);

/**
 * Tarjeta de producto, compacta: portada (captura real o retícula técnica),
 * nombre, descripción corta, stack y acceso al detalle.
 */
const TarjetaProducto = ({
  producto,
  onVerDetalle,
}: {
  producto: Producto;
  onVerDetalle: (producto: Producto) => void;
}) => {
  const { t } = useITTranslation();
  const capturas = producto.capturas ?? [];
  const portada = capturas[0];
  const tieneDetalle = capturas.length > 0;
  const enlaceInterno = producto.enlace?.startsWith("#");

  return (
    <div className={`group flex h-full flex-col gap-4 p-4 ${CARD} ${CARD_HOVER}`}>
      {/* Portada */}
      <button
        type="button"
        disabled={!tieneDetalle}
        onClick={() => onVerDetalle(producto)}
        aria-label={tieneDetalle ? t("showcase.home.viewDetailOf", { name: producto.nombre }) : producto.nombre}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
      >
        {portada ? (
          <img
            src={portada.src}
            alt={`${producto.nombre}: ${portada.titulo}`}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="it-blueprint relative flex h-full w-full items-center justify-center bg-slate-50 text-slate-300 dark:bg-slate-950 dark:text-slate-800">
            <span className="text-primary-600 dark:text-primary-400">
              <ProductoIcono icono={producto.icono} size={44} />
            </span>
          </div>
        )}

        {capturas.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-slate-900/75 px-2.5 py-1 font-mono text-[10px] font-medium text-white">
            {t("showcase.home.captures", { count: capturas.length })}
          </span>
        )}
      </button>

      {/* Encabezado */}
      <ITFlex align="center" justify="between" gap={3}>
        <ITFlex align="center" gap={2.5}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-primary-600 dark:border-slate-800 dark:bg-slate-950 dark:text-primary-400">
            <ProductoIcono icono={producto.icono} size={16} />
          </div>
          <ITText
            as="h3"
            className="font-display !text-base !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
          >
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
            className="rounded-[6px] border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
          >
            {tecnologia}
          </span>
        ))}
      </ITFlex>

      {/* Acciones */}
      <ITFlex align="center" justify="between" gap={3} wrap="wrap" className="mt-auto pt-2">
        {tieneDetalle ? (
          <ITButton variant="filled" color="primary" size="sm" onClick={() => onVerDetalle(producto)}>
            {t("showcase.home.viewDetail")}
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
            {producto.enlaceTexto ?? t("showcase.home.viewRepo")}
          </a>
        )}
      </ITFlex>
    </div>
  );
};

export const HomeShowcase = () => {
  const { t } = useITTranslation();
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
    { label: t("showcase.home.statExperience"), value: "5+", hint: t("showcase.home.statExperienceHint"), icon: <FaCode /> },
    { label: t("showcase.home.statTech"), value: `${TECH_STACK.length}`, hint: t("showcase.home.statTechHint"), icon: <FaLayerGroup /> },
    { label: t("showcase.home.statProducts"), value: `${PRODUCTOS.length}`, hint: t("showcase.home.statProductsHint"), icon: <FaBoxOpen /> },
    { label: t("showcase.home.statMode"), value: t("showcase.home.statModeValue"), hint: t("showcase.home.statModeHint"), icon: <FaMapMarkerAlt /> },
  ];

  const categoriesList = [
    { id: "all", name: t("showcase.home.catAll"), icon: <FaLayerGroup size={10} /> },
    { id: "frontend", name: t("showcase.home.catFrontend"), icon: <FaCode size={10} /> },
    { id: "backend", name: t("showcase.home.catBackend"), icon: <FaServer size={10} /> },
    { id: "mobile", name: t("showcase.home.catMobile"), icon: <FaMobileAlt size={10} /> },
    { id: "database", name: t("showcase.home.catDatabase"), icon: <FaDatabase size={10} /> },
    { id: "devops", name: t("showcase.home.catDevops"), icon: <FaCloud size={10} /> },
  ];

  const filteredTech = TECH_STACK.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(techSearch.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ITStack spacing={10} className="animate-fadeIn overflow-x-clip pb-5">
      {/* ─── HERO (split-screen) ─── */}
      <section
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-12 dark:border-slate-800 dark:bg-slate-900 sm:px-12 sm:py-16"
      >
        <div
          aria-hidden
          className="it-blueprint pointer-events-none absolute inset-0 text-slate-300 dark:text-slate-800"
        />

        <div className="relative z-10 flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-14">
          <div className="min-w-0 max-w-3xl flex-1 xl:max-w-2xl">
            <div className="it-reveal">
              <ITBadget label={t("showcase.home.badge")} color="primary" variant="outlined" className="w-fit" />
            </div>

            <ITText
              as="h1"
              id="home-hero-title"
              className="it-reveal font-display !mt-5 !text-4xl !font-bold -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-5xl"
              style={reveal(70)}
            >
              {t("showcase.home.hello")}{" "}
              <span className="text-primary-600 dark:text-primary-400">Asael Amaro</span>
            </ITText>

            <ITText
              as="p"
              className="it-reveal !mt-4 max-w-xl !text-base !leading-relaxed text-slate-600 dark:text-slate-300"
              style={reveal(140)}
            >
              {t("showcase.home.bio")}
            </ITText>

            <ITFlex
              gap={3}
              wrap="wrap"
              align="center"
              className="it-reveal !mt-7"
              style={reveal(210)}
            >
              <a href={CV_URL} download>
                <ITButton variant="filled" color="primary" size="lg" icon={<FaDownload size={13} />}>
                  {t("showcase.home.downloadCv")}
                </ITButton>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <ITButton variant="outlined" color="secondary" size="lg" icon={<FaGithub size={13} />}>
                  GitHub
                </ITButton>
              </a>
            </ITFlex>

            <div
              className="it-reveal mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950"
              style={reveal(280)}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
              </span>
              <code className="font-mono text-xs text-slate-700 dark:text-slate-200">
                {t("showcase.home.availableFullstack")}
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

          {/* Retrato en tarjeta técnica */}
          <div className="flex w-full shrink-0 justify-center xl:w-[300px] xl:justify-end">
            <div
              className="it-reveal w-full max-w-[300px] overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              style={reveal(350)}
            >
              <img
                src="/personalFoto.jpg"
                alt="Asael Amaro"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3.5 dark:border-slate-800">
                <div>
                  <ITText as="p" className="font-mono !text-[10px] !font-medium uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {t("showcase.home.role")}
                  </ITText>
                  <ITText as="p" className="!mt-0.5 !text-[11px] text-slate-500 dark:text-slate-400">
                    {t("showcase.home.location")}
                  </ITText>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success-500/40 px-2.5 py-1 font-mono text-[10px] font-medium text-success-600 dark:text-success-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                  {t("showcase.home.available")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MÉTRICAS ─── */}
      <section aria-label={t("showcase.home.ariaStats")}>
        <ITGrid container spacing={4}>
          {STATS.map((stat) => (
            <ITGrid item xs={6} lg={3} key={stat.label}>
              <StatCard stat={stat} />
            </ITGrid>
          ))}
        </ITGrid>
      </section>

      {/* ─── LENGUAJES Y FRAMEWORKS ─── */}
      <section>
        <SectionHeading
          eyebrow={t("showcase.home.eyebrowBase")}
          title={t("showcase.home.titleTech")}
          subtitle={t("showcase.home.subtitleTech")}
          className="!mb-5"
        />

        <ITGrid container spacing={5}>
          <ITGrid item xs={12} lg={6}>
            <div className={`h-full p-5 ${CARD}`}>
              <ITText as="h3" className={EYEBROW}>
                {t("showcase.home.labelLanguages")}
              </ITText>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3">
                {LANGUAGES.map((lang) => (
                  <TechTile key={lang.name} icon={lang.icon} label={lang.name} />
                ))}
              </div>
            </div>
          </ITGrid>

          <ITGrid item xs={12} lg={6}>
            <div className={`h-full p-5 ${CARD}`}>
              <ITText as="h3" className={EYEBROW}>
                {t("showcase.home.labelFrameworks")}
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
          eyebrow={t("showcase.home.eyebrowStack")}
          title={t("showcase.home.titleStack")}
          subtitle={t("showcase.home.subtitleStack")}
          className="!mb-5"
        />

        <ITFlex align="center" justify="between" wrap="wrap" gap={4} className="!mb-6">
          <ITFlex gap={2} wrap="wrap">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`inline-flex items-center gap-1.5 rounded-[10px] border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  selectedCategory === cat.id
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-primary-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
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
              placeholder={t("showcase.home.searchTech")}
              value={techSearch}
              onChange={(e) => setTechSearch(e.target.value)}
              className="w-full rounded-[10px] border border-slate-200 bg-white py-2 pl-8 pr-4 text-xs text-slate-800 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
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
          <div className={`py-12 text-center ${CARD}`}>
            <ITText as="p" className="!text-sm text-slate-500 dark:text-slate-400">
              {t("showcase.home.noTech", { term: techSearch })}
            </ITText>
          </div>
        )}

        <ITDivider className="!my-6" />
        <ITText as="p" className="font-mono !text-center !text-[11px] uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {t("showcase.home.techCount", { shown: filteredTech.length, total: TECH_STACK.length })}
        </ITText>
      </section>

      {/* ─── PRODUCTOS ─── */}
      <section>
        <SectionHeading
          eyebrow={t("showcase.home.eyebrowPortfolio")}
          title={t("showcase.home.titleProducts")}
          subtitle={t("showcase.home.subtitleProducts")}
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
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <div
          aria-hidden
          className="it-blueprint pointer-events-none absolute inset-0 text-slate-300 dark:text-slate-800"
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <SectionHeading
              eyebrow={t("showcase.home.eyebrowNext")}
              title={t("showcase.home.titleTogether")}
              subtitle={t("showcase.home.subtitleTogether")}
            />

            <ITFlex gap={3} wrap="wrap" align="center" className="shrink-0">
              <a href={CV_URL} download>
                <ITButton variant="filled" color="primary" icon={<FaDownload size={13} />}>
                  {t("showcase.home.downloadCv")}
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
            {t("showcase.home.writingPrefix")}{" "}
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400"
            >
              <FaMedium size={11} />
              Medium
            </a>{" "}
            {t("showcase.home.codeOn")}{" "}
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
