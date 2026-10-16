import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import ITFlex from "../components/atoms/flex/flex";
import ITGrid from "../components/atoms/grid/grid";
import ITText from "../components/atoms/text/text";
import { techIcon, type TechIconEntry } from "./techIcons";
import { PRODUCTOS, type Producto } from "./productos";
import ProductoIcono from "./ProductoIcono";
import {
  BarraProgreso,
  CARD,
  ControlesPortafolio,
  CARD_HOVER,
  CHIP,
  EYEBROW,
  EnlaceBoton,
  Etiqueta,
  SaltarContenido,
  VolverArriba,
} from "./portfolioUi";
import { useITTranslation } from "@/i18n";
import { AxzyLogo } from "@/sandbox/AxzyLogo";

const CV_URL = "/Martin_Amaro_CV_ES_2026.pdf";
const GITHUB_URL = "https://github.com/maag070208";
const LINKEDIN_URL = "https://www.linkedin.com/in/maag070208/";
const MEDIUM_URL = "https://medium.com/@axzydev";
const SANDBOX_URL = "#ui-system";

/** Producto que ocupa el bloque destacado del portafolio. */
const DESTACADO = "checkapp";

/** Ancho de la hoja: una sola columna de lectura, sin cajas flotantes. */
const HOJA = "mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10";

/** Anchor ids of the portfolio sections, in document order (drives the scroll-spy). */
const SECTION_IDS = ["sobre-mi", "stack", "proyectos", "contacto"] as const;

/** Top navigation entries: anchor id → i18n key. El orden es el número de sección. */
const NAV_ITEMS: { id: (typeof SECTION_IDS)[number]; key: string }[] = [
  { id: "sobre-mi", key: "showcase.home.navAbout" },
  { id: "stack", key: "showcase.home.navStack" },
  { id: "proyectos", key: "showcase.home.navProjects" },
  { id: "contacto", key: "showcase.home.navContact" },
];

/** Cabecera sticky: en móvil ocupa dos filas, así que el ancla deja más aire. */
const ANCLA = "scroll-mt-[6.75rem] md:scroll-mt-[4.5rem]";

/** Shared stagger offset for the hero entrance cascade (`it-reveal`). */
const reveal = (delay: number): CSSProperties =>
  ({ "--it-delay": `${delay}ms` }) as CSSProperties;

/** Filete de 1px: la separación entre bloques (no hay tarjetas contenedoras). */
const FILETE = "border-slate-200 dark:border-slate-800";

/** Índice de sección en mono: `01`, `02`… */
const numero = (index: number): string => String(index + 1).padStart(2, "0");

/**
 * Tracks which anchored section is currently in view (scroll-spy) so the top
 * navigation can highlight the active link.
 */
function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/**
 * Cabecera: marca, índice de secciones con scroll-spy, progreso de lectura y el
 * único punto de entrada al sandbox de componentes (`#ui-system`).
 */
const PortfolioNav = () => {
  const { t } = useITTranslation();
  const active = useActiveSection(SECTION_IDS);

  const linkClass = (id: string) =>
    `inline-flex items-baseline gap-1.5 whitespace-nowrap rounded-[6px] px-2.5 py-1.5 font-mono !text-[11px] uppercase !tracking-[0.14em] transition-colors ${
      active === id
        ? "text-primary-700 dark:text-primary-500"
        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
    }`;

  const enlaces = NAV_ITEMS.map((item, index) => (
    <li key={item.id}>
      <a
        href={`#${item.id}`}
        aria-current={active === item.id ? "location" : undefined}
        className={linkClass(item.id)}
      >
        <span className="tabular-nums">{numero(index)}</span>
        {t(item.key)}
      </a>
    </li>
  ));

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-[#0b0d10]/85">
      <nav aria-label={t("showcase.home.sectionNav")} className={HOJA}>
        <div className="flex h-14 items-center gap-4">
          <a href="#sobre-mi" className="flex items-center gap-2.5">
            <AxzyLogo variante="icono" tamano={24} />
            <ITText
              as="span"
              className="hidden font-display !text-[13px] !font-bold -tracking-[0.01em] text-slate-900 dark:text-white sm:block"
            >
              Asael Amaro
            </ITText>
          </a>

          <ul className="ml-auto hidden items-center gap-1 md:flex">{enlaces}</ul>

          <div className="ml-auto flex items-center gap-2 md:ml-3">
            <ControlesPortafolio />
            <EnlaceBoton
              href={SANDBOX_URL}
              variante="outlined"
              tamano="sm"
              icono={<FaArrowRight size={10} />}
            >
              {t("showcase.home.navUiSystem")}
            </EnlaceBoton>
          </div>
        </div>

        {/* Móvil: el mismo índice en una fila desplazable */}
        <ul className="flex items-center gap-1 overflow-x-auto pb-2 md:hidden">{enlaces}</ul>
      </nav>

      <BarraProgreso />
    </header>
  );
};

/**
 * Encabezado de sección: número mono + título display + apoyo, con acciones a la
 * derecha. El bloque lo separa el filete superior de cada sección.
 */
const SectionHeading = ({
  index,
  label,
  title,
  subtitle,
  actions,
}: {
  /** Índice de sección (0-based: se pinta con dos dígitos). */
  index: number;
  /** Etiqueta mono corta. */
  label: string;
  /** Título display. */
  title: string;
  /** Frase de apoyo. */
  subtitle?: string;
  /** Contenido alineado a la derecha (filtros). */
  actions?: ReactNode;
}) => (
  <div className="flex flex-col gap-5 pb-7 md:flex-row md:items-end md:justify-between">
    <div className="min-w-0">
      <ITText as="p" className={EYEBROW}>
        <span className="tabular-nums">{numero(index)}</span>
        {` — ${label}`}
      </ITText>
      <ITText
        as="h2"
        className="font-display !mt-2.5 !text-[26px] !font-bold -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-[32px]"
      >
        {title}
      </ITText>
      {subtitle && (
        <ITText
          as="p"
          className="!mt-2 max-w-[62ch] !text-[15px] !leading-relaxed text-slate-500 dark:text-slate-400"
        >
          {subtitle}
        </ITText>
      )}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>
);

/**
 * Ícono de tecnología local. Es decorativo (el nombre va al lado), así que se
 * oculta a lectores de pantalla y solo conserva el `title` nativo.
 */
const TechIconImg = ({ icon, alt }: { icon: TechIconEntry; alt: string }) => (
  <img
    src={icon.src}
    alt=""
    aria-hidden
    title={alt}
    className={`h-4 w-4 object-contain ${icon.mono ? "dark:invert" : ""}`}
    loading="lazy"
  />
);

/**
 * Tarjeta de producto de la rejilla: portada, índice + tipo, nombre, descripción
 * acotada, stack y acciones.
 */
const TarjetaProducto = ({ producto, index }: { producto: Producto; index: number }) => {
  const { t } = useITTranslation();
  const capturas = producto.capturas ?? [];
  const portada = capturas[0];
  const tieneDetalle = capturas.length > 0;
  const enlaceInterno = producto.enlace?.startsWith("#");
  const stackVisible = producto.stack.slice(0, 3);
  const stackResto = producto.stack.length - stackVisible.length;

  return (
    <article className={`group flex h-full flex-col ${CARD} ${CARD_HOVER}`}>
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        {portada ? (
          <a
            href={`#proyecto/${producto.id}`}
            aria-label={t("showcase.home.viewDetailOf", { name: producto.nombre })}
            className="absolute inset-0"
          >
            <img
              src={portada.src}
              alt={`${producto.nombre}: ${portada.titulo}`}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </a>
        ) : (
          <span className="flex flex-col items-center gap-2 text-primary-700 dark:text-primary-500">
            <ProductoIcono icono={producto.icono} size={30} />
            <ITText as="span" className={EYEBROW}>
              {producto.tipo}
            </ITText>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <ITText as="span" className={`${EYEBROW} tabular-nums`}>
            {numero(index)}
          </ITText>
          <Etiqueta>{producto.tipo}</Etiqueta>
        </div>

        <ITText
          as="h3"
          className="font-display !mt-3 !text-[19px] !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
        >
          {producto.nombre}
        </ITText>

        <ITText
          as="p"
          className="line-clamp-3 !mt-2 !text-[13.5px] !leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {producto.descripcion}
        </ITText>

        <ITFlex gap={1.5} wrap="wrap" className="!mt-4">
          {stackVisible.map((tecnologia) => (
            <span key={tecnologia} className={CHIP}>
              {tecnologia}
            </span>
          ))}
          {stackResto > 0 && (
            <span className={CHIP}>{t("showcase.home.moreStack", { count: stackResto })}</span>
          )}
        </ITFlex>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {tieneDetalle ? (
            <EnlaceBoton href={`#proyecto/${producto.id}`} tamano="sm">
              {t("showcase.home.viewDetail")}
            </EnlaceBoton>
          ) : (
            <ITText as="span" className={EYEBROW}>
              {t("showcase.home.noPreview")}
            </ITText>
          )}

          {producto.enlace && (
            <a
              href={producto.enlace}
              {...(enlaceInterno ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex items-center gap-1.5 !text-xs !font-semibold !text-primary-700 dark:!text-primary-500"
            >
              {!enlaceInterno && <FaExternalLinkAlt size={10} />}
              {producto.enlaceTexto ?? t("showcase.home.viewRepo")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/**
 * Portafolio (`/`): hoja técnica con masthead tipográfico, banda de métricas,
 * stack en formato datasheet y productos (uno destacado + rejilla).
 *
 * No recibe props: cada tarjeta enlaza a `#proyecto/<id>` con un `<a>` real, así
 * que el router por hash hace la navegación (y el detalle es compartible).
 */
export const HomeShowcase = () => {
  const { t } = useITTranslation();
  const [techSearch, setTechSearch] = useState("");

  /** Stack completo: única fuente de verdad (el datasheet lo agrupa por categoría). */
  const TECH_STACK: { name: string; icon: TechIconEntry; category: string }[] = [
    { name: "TypeScript", icon: techIcon("typescript"), category: "languages" },
    { name: "JavaScript", icon: techIcon("javascript"), category: "languages" },
    { name: "C#", icon: techIcon("csharp"), category: "languages" },
    { name: "Python", icon: techIcon("python"), category: "languages" },
    { name: "Kotlin", icon: techIcon("kotlin"), category: "languages" },
    { name: "Dart", icon: techIcon("dart"), category: "languages" },
    { name: "Angular", icon: techIcon("angular"), category: "frontend" },
    { name: "React", icon: techIcon("react"), category: "frontend" },
    { name: "Redux", icon: techIcon("redux"), category: "frontend" },
    { name: "HTML5", icon: techIcon("html5"), category: "frontend" },
    { name: "CSS3", icon: techIcon("css3"), category: "frontend" },
    { name: "Sass", icon: techIcon("sass"), category: "frontend" },
    { name: "Node.js", icon: techIcon("nodejs"), category: "backend" },
    { name: "Express", icon: techIcon("express"), category: "backend" },
    { name: ".NET Core", icon: techIcon("dotnet"), category: "backend" },
    { name: "Spring Boot", icon: techIcon("springboot"), category: "backend" },
    { name: "MongoDB", icon: techIcon("mongodb"), category: "database" },
    { name: "MySQL", icon: techIcon("mysql"), category: "database" },
    { name: "PostgreSQL", icon: techIcon("postgresql"), category: "database" },
    { name: "Flutter", icon: techIcon("flutter"), category: "mobile" },
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
    { name: "Appium", icon: techIcon("appium"), category: "testing" },
  ];

  /** Orden y etiqueta i18n de cada fila del datasheet. */
  const FILAS: { category: string; key: string }[] = [
    { category: "languages", key: "showcase.home.catLanguages" },
    { category: "frontend", key: "showcase.home.catFrontend" },
    { category: "backend", key: "showcase.home.catBackend" },
    { category: "database", key: "showcase.home.catDatabase" },
    { category: "mobile", key: "showcase.home.catMobile" },
    { category: "devops", key: "showcase.home.catDevops" },
    { category: "desktop", key: "showcase.home.catDesktop" },
    { category: "tools", key: "showcase.home.catTools" },
    { category: "testing", key: "showcase.home.catTesting" },
  ];

  const termino = techSearch.trim().toLowerCase();
  const filas = FILAS.map((fila) => ({
    ...fila,
    items: TECH_STACK.filter(
      (tech) => tech.category === fila.category && tech.name.toLowerCase().includes(termino)
    ),
  })).filter((fila) => fila.items.length > 0);
  const visibles = filas.reduce((total, fila) => total + fila.items.length, 0);

  /** Métricas del perfil: una banda de datos con filetes, no cuatro tarjetas. */
  const METRICAS = [
    { label: t("showcase.home.statExperience"), value: "5+" },
    { label: t("showcase.home.statProducts"), value: `${PRODUCTOS.length}` },
    { label: t("showcase.home.statTech"), value: `${TECH_STACK.length}` },
    { label: t("showcase.home.statMode"), value: t("showcase.home.statModeValue") },
  ];

  const destacado = PRODUCTOS.find((producto) => producto.id === DESTACADO) ?? PRODUCTOS[0];
  const portadaDestacada = destacado.capturas?.[0];
  const resto = PRODUCTOS.filter((producto) => producto.id !== destacado.id);
  const enlaceDestacadoExterno = Boolean(destacado.enlace && !destacado.enlace.startsWith("#"));

  return (
    <>
      <SaltarContenido />
      <PortfolioNav />

      <main id="contenido" className="animate-fadeIn">
        {/* ─── 01 · MASTHEAD ─── */}
        <section id="sobre-mi" aria-labelledby="home-hero-title" className={ANCLA}>
          <div className={`${HOJA} pb-10 pt-10 sm:pb-12 sm:pt-14`}>
            <ITFlex
              align="center"
              justify="between"
              gap={4}
              wrap="wrap"
              className="it-reveal border-b border-slate-200 pb-4 dark:border-slate-800"
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
                </span>
                <ITText
                  as="span"
                  className="font-mono !text-[11px] uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400"
                >
                  {`${t("showcase.home.availableFullstack")} · ${t("showcase.home.location")}`}
                </ITText>
              </span>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono !text-[11px] uppercase !tracking-[0.14em] !text-primary-700 dark:!text-primary-500"
              >
                <FaLinkedin size={11} />
                LinkedIn
              </a>
            </ITFlex>

            <ITFlex align="center" className="it-reveal !mt-8">
              <AxzyLogo variante="wordmark" tamano={300} />
            </ITFlex>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
              <div className="min-w-0">
                <ITText
                  as="h1"
                  id="home-hero-title"
                  className="it-reveal font-display !text-[38px] !font-bold !leading-[1.06] -tracking-[0.015em] text-slate-900 dark:text-white sm:!text-[54px] lg:!text-[62px]"
                  style={reveal(60)}
                >
                  {t("showcase.home.heroLead")}{" "}
                  <span className="text-primary-600 dark:text-primary-400">
                    {t("showcase.home.heroAccent")}
                  </span>
                </ITText>

                <ITText
                  as="p"
                  className="it-reveal !mt-6 max-w-[62ch] !text-[15.5px] !leading-[1.75] text-slate-600 dark:text-slate-300 sm:!text-[17px]"
                  style={reveal(130)}
                >
                  {t("showcase.home.bio")}
                </ITText>

                <ITFlex
                  gap={3}
                  wrap="wrap"
                  align="center"
                  className="it-reveal !mt-8"
                  style={reveal(200)}
                >
                  <EnlaceBoton href={CV_URL} descargar icono={<FaDownload size={12} />}>
                    {t("showcase.home.downloadCv")}
                  </EnlaceBoton>
                  <EnlaceBoton href={GITHUB_URL} variante="text" icono={<FaGithub size={13} />}>
                    GitHub
                  </EnlaceBoton>
                  <EnlaceBoton href={SANDBOX_URL} variante="text" icono={<FaArrowRight size={12} />}>
                    {t("showcase.home.navUiSystem")}
                  </EnlaceBoton>
                </ITFlex>
              </div>

              {/* Retrato como documento: chico y con filete, sin tarjeta contenedora */}
              <div
                className="it-reveal flex items-start gap-4 lg:flex-col lg:gap-3 lg:self-end"
                style={reveal(260)}
              >
                <img
                  src="/personalFoto.jpg"
                  alt="Asael Amaro"
                  className="h-[150px] w-[120px] rounded-[10px] border border-slate-200 object-cover dark:border-slate-800 lg:h-[210px] lg:w-[168px]"
                />
                <div className="pt-0.5">
                  <ITText
                    as="p"
                    className="font-mono !text-[10px] uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400"
                  >
                    {t("showcase.home.role")}
                  </ITText>
                  <ITText as="p" className="!mt-1 !text-[11px] text-slate-500 dark:text-slate-400">
                    {t("showcase.home.location")}
                  </ITText>
                </div>
              </div>
            </div>
          </div>

          {/* Banda de métricas */}
          <div className={`border-y ${FILETE}`}>
            <dl
              aria-label={t("showcase.home.ariaStats")}
              className={`${HOJA} grid grid-cols-2 sm:grid-cols-4`}
            >
              {METRICAS.map((metrica, indice) => (
                <div
                  key={metrica.label}
                  className={`py-5 ${indice > 0 ? "sm:border-l sm:pl-6 " : ""}${
                    indice % 2 === 1 ? "border-l pl-6 " : ""
                  }border-slate-200 dark:border-slate-800`}
                >
                  <dt className={EYEBROW}>{metrica.label}</dt>
                  <dd className="mt-2 font-display text-[30px] font-bold leading-none tracking-[-0.02em] tabular-nums text-slate-900 dark:text-white">
                    {metrica.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── 02 · STACK (datasheet) ─── */}
        <section id="stack" className={ANCLA}>
          <div className={`${HOJA} py-12 sm:py-16`}>
            <SectionHeading
              index={1}
              label={t("showcase.home.eyebrowStack")}
              title={t("showcase.home.titleStack")}
              subtitle={t("showcase.home.subtitleStack")}
              actions={
                <div className="relative w-full sm:w-[260px]">
                  <FaSearch
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={11}
                  />
                  <input
                    type="search"
                    placeholder={t("showcase.home.searchTech")}
                    aria-label={t("showcase.home.searchTechAria")}
                    value={techSearch}
                    onChange={(e) => setTechSearch(e.target.value)}
                    className="w-full rounded-[10px] border border-slate-200 bg-white py-2 pl-8 pr-3 font-mono text-xs text-slate-800 outline-none transition-colors focus:border-primary-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              }
            />

            {filas.length > 0 ? (
              <dl className={`border-t ${FILETE}`}>
                {filas.map((fila) => (
                  <div
                    key={fila.category}
                    className={`grid gap-2 border-b py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6 ${FILETE}`}
                  >
                    <dt className="font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {t(fila.key)}
                    </dt>
                    <dd className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                      {fila.items.map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-2 text-[14px] text-slate-700 dark:text-slate-200"
                        >
                          <TechIconImg icon={tech.icon} alt={tech.name} />
                          {tech.name}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ITText
                as="p"
                className={`border-y py-10 text-center !text-sm text-slate-500 dark:text-slate-400 ${FILETE}`}
              >
                {t("showcase.home.noTech", { term: techSearch })}
              </ITText>
            )}

            <ITText
              as="p"
              className="mt-4 font-mono !text-[11px] uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400"
            >
              {t("showcase.home.techCount", { shown: visibles, total: TECH_STACK.length })}
            </ITText>
          </div>
        </section>

        {/* ─── 03 · PRODUCTOS ─── */}
        <section id="proyectos" className={ANCLA}>
          <div className={`${HOJA} border-t pb-14 pt-12 sm:pt-16 ${FILETE}`}>
            <SectionHeading
              index={2}
              label={t("showcase.home.eyebrowPortfolio")}
              title={t("showcase.home.titleProducts")}
              subtitle={t("showcase.home.subtitleProducts")}
            />

            {/* Destacado: copy a la izquierda, captura a la derecha */}
            <article className={`${CARD} overflow-hidden`}>
              <div className="grid lg:grid-cols-12">
                <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
                  <ITFlex align="center" gap={2.5} wrap="wrap">
                    <ITText as="span" className={EYEBROW}>
                      <span className="tabular-nums">
                        {numero(PRODUCTOS.findIndex((p) => p.id === destacado.id))}
                      </span>
                      {` — ${t("showcase.home.featuredLabel")}`}
                    </ITText>
                    <Etiqueta>{destacado.tipo}</Etiqueta>
                  </ITFlex>

                  <ITText
                    as="h3"
                    className="font-display !mt-4 !text-[26px] !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
                  >
                    {destacado.nombre}
                  </ITText>

                  <ITText
                    as="p"
                    className="!mt-3 !text-[14px] !leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    {destacado.descripcion}
                  </ITText>

                  {!!destacado.caracteristicas?.length && (
                    <ul className="mt-5 space-y-2.5">
                      {destacado.caracteristicas.slice(0, 3).map((caracteristica) => (
                        <li key={caracteristica} className="flex gap-2.5">
                          <FaCheck
                            size={10}
                            className="mt-1.5 shrink-0 text-primary-700 dark:text-primary-500"
                          />
                          <ITText
                            as="span"
                            className="!text-[13px] !leading-relaxed text-slate-600 dark:text-slate-300"
                          >
                            {caracteristica}
                          </ITText>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ITFlex gap={1.5} wrap="wrap" className="!mt-5">
                    {destacado.stack.map((tecnologia) => (
                      <span key={tecnologia} className={CHIP}>
                        {tecnologia}
                      </span>
                    ))}
                  </ITFlex>

                  <ITFlex gap={3} wrap="wrap" align="center" className="!mt-6">
                    <EnlaceBoton href={`#proyecto/${destacado.id}`} tamano="sm">
                      {t("showcase.home.viewDetail")}
                    </EnlaceBoton>
                    {destacado.enlace && (
                      <a
                        href={destacado.enlace}
                        {...(enlaceDestacadoExterno
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-1.5 !text-xs !font-semibold !text-primary-700 dark:!text-primary-500"
                      >
                        {enlaceDestacadoExterno && <FaExternalLinkAlt size={10} />}
                        {destacado.enlaceTexto ?? t("showcase.home.viewRepo")}
                      </a>
                    )}
                  </ITFlex>
                </div>

                {portadaDestacada && (
                  <figure className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 lg:col-span-7 lg:border-l lg:border-t-0">
                    <div className="p-3 sm:p-5">
                      <img
                        src={portadaDestacada.src}
                        alt={`${destacado.nombre}: ${portadaDestacada.titulo}`}
                        className="w-full rounded-[6px] border border-slate-200 object-cover object-top dark:border-slate-800"
                      />
                    </div>
                    <figcaption className="px-3 pb-4 font-mono text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 sm:px-5">
                      {portadaDestacada.titulo}
                    </figcaption>
                  </figure>
                )}
              </div>
            </article>

            {/* Resto: rejilla de tres */}
            <ITGrid container spacing={5} className="!mt-6">
              {resto.map((producto) => (
                <ITGrid item xs={12} md={6} lg={4} key={producto.id}>
                  <TarjetaProducto
                    producto={producto}
                    index={PRODUCTOS.findIndex((p) => p.id === producto.id)}
                  />
                </ITGrid>
              ))}
            </ITGrid>
          </div>
        </section>

        {/* ─── 04 · CONTACTO ─── */}
        <section id="contacto" className={ANCLA}>
          <div className={`${HOJA} border-t py-14 sm:py-16 ${FILETE}`}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="min-w-0">
                <ITText as="p" className={EYEBROW}>
                  <span className="tabular-nums">04</span>
                  {` — ${t("showcase.home.navContact")}`}
                </ITText>
                <ITText
                  as="h2"
                  className="font-display !mt-3 !text-[32px] !font-bold !leading-[1.08] -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-[44px]"
                >
                  {t("showcase.home.titleTogether")}
                </ITText>
                <ITText
                  as="p"
                  className="!mt-4 max-w-[58ch] !text-[15px] !leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  {t("showcase.home.subtitleTogether")}
                </ITText>
              </div>

              <ITFlex gap={3} wrap="wrap" align="center">
                <EnlaceBoton href={CV_URL} descargar icono={<FaDownload size={12} />}>
                  {t("showcase.home.downloadCv")}
                </EnlaceBoton>
                <EnlaceBoton
                  href={LINKEDIN_URL}
                  variante="outlined"
                  icono={<FaLinkedin size={12} />}
                >
                  LinkedIn
                </EnlaceBoton>
              </ITFlex>
            </div>

            <ITText
              as="p"
              className="!mt-8 font-mono !text-[11px] !tracking-[0.06em] text-slate-500 dark:text-slate-400"
            >
              {t("showcase.home.writingPrefix")}{" "}
              <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="!font-semibold !text-primary-700 dark:!text-primary-500"
              >
                Medium
              </a>{" "}
              {t("showcase.home.codeOn")}{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="!font-semibold !text-primary-700 dark:!text-primary-500"
              >
                GitHub
              </a>
              .
            </ITText>
          </div>
        </section>
      </main>

      {/* ─── PIE ─── */}
      <footer className={`border-t ${FILETE}`}>
        <div
          className={`${HOJA} flex flex-col items-start justify-between gap-3 py-7 sm:flex-row sm:items-center`}
        >
          <div className="flex items-center gap-4">
            <AxzyLogo variante="wordmark" tamano={190} />
            <span aria-hidden="true" className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <ITText
              as="p"
              className="font-mono !text-[11px] uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400"
            >
              {`Asael Amaro · ${t("showcase.home.role")}`}
            </ITText>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <ITText
              as="span"
              className="font-mono !text-[11px] uppercase !tracking-[0.14em] text-slate-500 dark:text-slate-400"
            >
              {t("showcase.home.badge")}
            </ITText>
            <a
              href={SANDBOX_URL}
              className="inline-flex items-center gap-1.5 font-mono !text-[11px] uppercase !tracking-[0.14em] text-slate-500 transition-colors hover:text-primary-700 dark:text-slate-400 dark:hover:text-primary-500"
            >
              {t("showcase.home.footerBuiltWith")}
              <FaArrowRight size={10} />
            </a>
          </div>
        </div>
      </footer>

      <VolverArriba />
    </>
  );
};
