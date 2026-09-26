import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FaArrowRight,
  FaBoxOpen,
  FaCheck,
  FaCode,
  FaCopy,
  FaCreditCard,
  FaFolderOpen,
  FaGithub,
  FaHome,
  FaKeyboard,
  FaLayerGroup,
  FaNpm,
  FaRegBell,
  FaRocket,
  FaSlidersH,
  FaTable,
} from "react-icons/fa";
import ITBadget from "@/components/atoms/badget/badget";
import ITButton from "@/components/atoms/button/button";
import ITFlex from "@/components/atoms/flex/flex";
import ITGrid from "@/components/atoms/grid/grid";
import ITStack from "@/components/atoms/stack/stack";
import ITText from "@/components/atoms/text/text";
import {
  SANDBOX_GROUPS,
  TOTAL_ITEMS,
} from "./navigation";

/** Props for the sandbox landing page. */
export interface LandingShowcaseProps {
  /** Open a component page by group id + item id. */
  onOpenItem: (group: string, item: string) => void;
  /** Navigate back to the portfolio. */
  onOpenPortfolio: () => void;
}

/** Props for the local `SectionHeading` helper. */
interface SectionHeadingProps {
  /** Small uppercase kicker rendered above the title. */
  eyebrow: string;
  /** Section title, always rendered as an `<h2>`. */
  title: string;
  /** Optional supporting sentence rendered below the title. */
  subtitle?: string;
  /** Extra classes for the heading wrapper (spacing, etc.). */
  className?: string;
}

/** Icon per sandbox group id. */
const GROUP_ICONS: Record<string, ReactNode> = {
  general: <FaHome />,
  struc: <FaCreditCard />,
  forms: <FaKeyboard />,
  data: <FaTable />,
  nav: <FaSlidersH />,
  feed: <FaRegBell />,
};

/**
 * Literal per-index gradient classes for the family and stat tiles. Tailwind
 * v4 cannot see runtime-built class names, so every gradient is written out
 * in full and indexed by position.
 */
const GROUP_ACCENTS = [
  "from-primary-500 to-info-500",
  "from-purple-500 to-primary-500",
  "from-primary-600 to-purple-600",
  "from-info-500 to-purple-500",
  "from-purple-600 to-info-600",
  "from-primary-500 to-purple-500",
];

const GITHUB_URL = "https://github.com/axzydev/axzy_ui_system";
const INSTALL_CMD = "pnpm add @axzydev/axzy_ui_system";

/**
 * Copy text to the clipboard, falling back to a hidden textarea +
 * `execCommand` when the async Clipboard API is unavailable (non-secure
 * contexts, embedded webviews). Returns whether the copy succeeded.
 */
const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  let textarea: HTMLTextAreaElement | null = null;
  try {
    textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea?.remove();
  }
};

/**
 * Clipboard button that flips to a "Copiado" confirmation for 2s.
 *
 * `ITButton` writes `box-shadow` as an inline style on focus, so the visible
 * keyboard ring is owned by the wrapper element that uses `focus-within`
 * (see `LandingShowcase`) instead of a `focus-visible:` class here.
 *
 * @example
 * <CopyButton text="pnpm add @axzydev/axzy_ui_system" />
 */
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span aria-live="polite" className="inline-flex">
      <ITButton
        variant="text"
        color="gray"
        size="sm"
        onClick={handleCopy}
        className="!font-semibold"
      >
        <ITFlex align="center" gap={1.5}>
          {copied ? (
            <FaCheck size={10} className="text-emerald-400" />
          ) : (
            <FaCopy size={10} />
          )}
          {copied ? "Copiado" : "Copiar"}
        </ITFlex>
      </ITButton>
    </span>
  );
};

/**
 * Dark code surface with an optional filename strip.
 *
 * @example
 * <CodeBlock code="pnpm add pkg" filename="terminal" />
 */
const CodeBlock = ({ code, filename }: { code: string; filename?: string }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
    {filename && (
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
        <ITText as="span" className="!text-xs !font-mono !text-slate-400">
          {filename}
        </ITText>
      </div>
    )}
    <div className="relative bg-slate-950">
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

/**
 * Uniform section heading: uppercase eyebrow + `<h2>` title + subtitle.
 * Used by every section so the document outline stays consistent.
 *
 * @example
 * <SectionHeading eyebrow="Catálogo" title="Explora por familia" className="!mb-6" />
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) => (
  <ITStack spacing={1} className={className}>
    <ITText
      as="p"
      className="!text-[11px] !font-bold uppercase !tracking-wider text-primary-600 dark:text-primary-400"
    >
      {eyebrow}
    </ITText>
    <ITText
      as="h2"
      className="!text-xl !font-bold !tracking-tight text-slate-900 dark:text-white"
    >
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
 * Purely decorative library preview card shown in the hero on `xl` screens.
 * Hidden from assistive tech — it duplicates no real content.
 *
 * @example
 * <HeroLibraryPreview />
 */
const HeroLibraryPreview = () => (
  <div
    aria-hidden
    className="hidden w-[340px] shrink-0 justify-end xl:flex"
  >
    <div
      className="it-landing-float w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 shadow-xl backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/85"
      style={{ animationDelay: "0.8s" }}
    >
      {/* fake toolbar */}
      <div className="flex items-center gap-1.5 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/70">
        <span className="h-2.5 w-2.5 rounded-full bg-danger-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success-400/70" />
        <span className="ml-2 h-2 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* mini table skeleton */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          <span className="h-4 w-14 rounded-full bg-primary-100 dark:bg-primary-900/50" />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 flex-shrink-0 rounded-md bg-gradient-to-br from-primary-500 to-info-500 opacity-80" />
            <span className="h-2 w-[68%] rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 flex-shrink-0 rounded-md bg-gradient-to-br from-purple-500 to-primary-500 opacity-80" />
            <span className="h-2 w-[92%] rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 flex-shrink-0 rounded-md bg-gradient-to-br from-info-500 to-purple-500 opacity-80" />
            <span className="h-2 w-[54%] rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* fake action + status */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 px-4 py-3.5 dark:border-slate-700/70">
        <span className="inline-flex items-center rounded-lg bg-primary-500 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
          ITButton
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success-500/40 px-2.5 py-1 text-[10px] font-semibold text-success-600 dark:text-success-400">
          <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
          Tipado
        </span>
      </div>
    </div>
  </div>
);

const STATS = [
  {
    label: "Componentes",
    value: `${TOTAL_ITEMS}`,
    hint: "páginas documentadas",
    icon: <FaLayerGroup />,
  },
  {
    label: "Familias",
    value: `${SANDBOX_GROUPS.length}`,
    hint: "grupos de navegación",
    icon: <FaFolderOpen />,
  },
  {
    label: "TypeScript",
    value: "100%",
    hint: "tipado estricto",
    icon: <FaCode />,
  },
  {
    label: "UI deps",
    value: "0",
    hint: "sin runtime extra",
    icon: <FaBoxOpen />,
  },
];

const FEATURES = [
  "Tailwind CSS v4 con tokens de tema en runtime",
  "Accesibilidad: roles, foco y nombres accesibles",
  "Dark mode automático vía ITThemeProvider",
  "Tree-shakeable: solo importas lo que usas",
  "Sin dependencias de UI de terceros",
  "Documentado con ejemplos ejecutables",
];

const QUICKSTART_CODE = `import { ITThemeProvider, ITButton } from "@axzydev/axzy_ui_system"
import "@axzydev/axzy_ui_system/dist/index.css"

export default function App() {
  return (
    <ITThemeProvider>
      <ITButton variant="rounded">Empezar</ITButton>
    </ITThemeProvider>
  )
}`;

/**
 * Sandbox landing page (`#ui-system`): a dashboard-style entry point with a
 * hero, real derived stats, deep-linking family cards, quickstart, and links.
 *
 * @example
 * <LandingShowcase
 *   onOpenItem={(group, item) => setRoute(`${group}/${item}`)}
 *   onOpenPortfolio={() => setRoute("")}
 * />
 */
export function LandingShowcase({
  onOpenItem,
  onOpenPortfolio,
}: LandingShowcaseProps) {
  return (
    <ITStack spacing={10} className="animate-fadeIn pb-5">
      {/* ─── HERO ─── */}
      <section
        aria-labelledby="ui-system-hero-title"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-primary-950/30 dark:via-slate-900 dark:to-purple-950/30 px-8 py-14 sm:px-14"
      >
        <div
          aria-hidden
          className="it-landing-float pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="it-landing-float pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          aria-hidden
          className="it-landing-grid pointer-events-none absolute inset-0 text-slate-400/50 dark:text-slate-600/40"
        />

        <div className="relative z-10 flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-10">
          <div className="min-w-0 max-w-3xl flex-1 xl:max-w-2xl">
            <div
              className="it-landing-rise"
              style={{ animationDelay: "0ms" }}
            >
              <ITBadget
                label="v1.3.0 · Tailwind v4"
                color="primary"
                variant="outlined"
                className="w-fit"
              />
            </div>

            <ITText
              as="h1"
              id="ui-system-hero-title"
              className="it-landing-rise !mt-5 !text-4xl sm:!text-5xl !font-extrabold !tracking-tight text-slate-900 dark:text-white"
              style={{ animationDelay: "70ms" }}
            >
              Componentes para{" "}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-purple-500 bg-clip-text text-transparent">
                interfaces serias
              </span>
            </ITText>

            <ITText
              as="p"
              className="it-landing-rise !mt-4 !text-base !leading-relaxed max-w-xl text-slate-600 dark:text-slate-300"
              style={{ animationDelay: "140ms" }}
            >
              Una librería React + TypeScript con Tailwind CSS v4: accesible,
              temable y lista para producción. Explora {TOTAL_ITEMS} páginas en{" "}
              {SANDBOX_GROUPS.length} familias.
            </ITText>

            <ITFlex
              gap={3}
              wrap="wrap"
              align="center"
              className="it-landing-rise !mt-7"
              style={{ animationDelay: "210ms" }}
            >
              <ITButton
                variant="filled"
                color="primary"
                size="lg"
                icon={<FaRocket size={13} />}
                onClick={() => onOpenItem("general", "getting-started")}
              >
                Explorar componentes
              </ITButton>
              <ITButton
                variant="outlined"
                color="secondary"
                size="lg"
                icon={<FaLayerGroup size={13} />}
                onClick={onOpenPortfolio}
              >
                Ver portafolio
              </ITButton>
            </ITFlex>

            <div
              className="it-landing-rise mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-purple-50 px-4 py-2 shadow-sm dark:border-primary-800/50 dark:from-primary-950/30 dark:to-purple-950/30"
              style={{ animationDelay: "280ms" }}
            >
              <FaNpm size={16} className="shrink-0 text-primary-500" />
              <code className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {INSTALL_CMD}
              </code>
              <span className="inline-flex items-center rounded-lg border border-primary-200/90 bg-white/85 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 dark:border-primary-800/90 dark:bg-slate-900/70">
                <CopyButton text={INSTALL_CMD} />
              </span>
            </div>
          </div>

          <HeroLibraryPreview />
        </div>
      </section>

      {/* ─── STAT STRIP ─── */}
      <section aria-label="Métricas de la librería">
        <ITGrid container spacing={4}>
          {STATS.map((stat, index) => (
            <ITGrid item xs={6} lg={3} key={stat.label}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-700">
                <div className="flex items-start justify-between gap-3">
                  <ITText
                    as="p"
                    className="!text-3xl !font-extrabold !tracking-tight !leading-none tabular-nums text-slate-900 dark:text-white"
                  >
                    {stat.value}
                  </ITText>
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-[13px] text-white shadow-sm ${
                      GROUP_ACCENTS[index % GROUP_ACCENTS.length]
                    }`}
                  >
                    {stat.icon}
                  </span>
                </div>

                <div className="mt-auto">
                  <ITText
                    as="p"
                    className="!text-sm !font-semibold text-primary-600 dark:text-primary-400"
                  >
                    {stat.label}
                  </ITText>
                  <ITText
                    as="p"
                    className="!mt-0.5 !text-[11px] text-slate-400 dark:text-slate-500"
                  >
                    {stat.hint}
                  </ITText>
                </div>
              </div>
            </ITGrid>
          ))}
        </ITGrid>
      </section>

      {/* ─── EXPLORE BY FAMILY ─── */}
      <section>
        <SectionHeading
          eyebrow="Catálogo"
          title="Explora por familia"
          subtitle="Cada tarjeta te lleva directo al primer componente del grupo."
          className="!mb-5"
        />

        <ITGrid container spacing={5}>
          {SANDBOX_GROUPS.map((group, index) => (
            <ITGrid item xs={12} sm={6} lg={4} key={group.id}>
              <button
                type="button"
                onClick={() => onOpenItem(group.id, group.subitems[0].id)}
                className="group flex h-full w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-700 dark:hover:shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-[13px] text-white shadow-sm ${
                      GROUP_ACCENTS[index % GROUP_ACCENTS.length]
                    }`}
                  >
                    {GROUP_ICONS[group.id]}
                  </span>
                  <ITText
                    as="span"
                    className="min-w-0 flex-1 truncate !text-[15px] !font-bold !tracking-tight text-slate-900 dark:text-white"
                  >
                    {group.label}
                  </ITText>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {group.subitems.length}
                  </span>
                  <span className="flex w-4 shrink-0 items-center justify-center">
                    <FaArrowRight
                      size={12}
                      className="text-primary-500 opacity-0 -translate-x-1.5 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {group.subitems.slice(0, 4).map((sub) => (
                    <span
                      key={sub.id}
                      className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400"
                    >
                      {sub.label}
                    </span>
                  ))}
                  {group.subitems.length > 4 && (
                    <span className="rounded-md bg-primary-50 dark:bg-primary-950/40 px-2 py-0.5 text-[10px] font-semibold text-primary-600 dark:text-primary-400">
                      +{group.subitems.length - 4} más
                    </span>
                  )}
                </div>
              </button>
            </ITGrid>
          ))}
        </ITGrid>
      </section>

      {/* ─── QUICKSTART ─── */}
      <section>
        <SectionHeading
          eyebrow="Puesta en marcha"
          title="Quickstart"
          subtitle="Un provider de tema, una hoja de estilos y tu primer botón."
          className="!mb-5"
        />

        <ITGrid container spacing={6}>
          <ITGrid item xs={12} lg={7}>
            <ITStack spacing={3}>
              <ITFlex align="center" justify="between" gap={3}>
                <ITText
                  as="p"
                  className="!text-[11px] !font-bold uppercase !tracking-wider text-slate-400 dark:text-slate-500"
                >
                  Ejemplo mínimo
                </ITText>
                <span className="inline-flex items-center rounded-lg focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
                  <CopyButton text={QUICKSTART_CODE} />
                </span>
              </ITFlex>
              <CodeBlock filename="src/App.tsx" code={QUICKSTART_CODE} />
            </ITStack>
          </ITGrid>

          <ITGrid item xs={12} lg={5}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <ITText
                as="h3"
                className="!mb-4 !text-sm !font-bold uppercase !tracking-wider text-slate-400 dark:text-slate-500"
              >
                Incluido de fábrica
              </ITText>
              <ul className="space-y-3">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600 dark:bg-success-950/40 dark:text-success-400">
                      <FaCheck size={10} />
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ITGrid>
        </ITGrid>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="relative overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-purple-50 p-6 shadow-sm dark:border-primary-900/40 dark:from-primary-950/30 dark:via-slate-900 dark:to-purple-950/30 sm:p-7">
        <div
          aria-hidden
          className="it-landing-float pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary-400/20 blur-3xl"
        />
        <div
          aria-hidden
          className="it-landing-grid pointer-events-none absolute inset-0 text-slate-400/40 dark:text-slate-600/30"
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <SectionHeading
              eyebrow="Siguientes pasos"
              title="¿Listo para construir?"
              subtitle="Revisa el portafolio, el código fuente o levanta Storybook."
            />

            <ITFlex gap={3} wrap="wrap" align="center" className="shrink-0">
              <ITButton
                variant="filled"
                color="primary"
                icon={<FaLayerGroup size={13} />}
                onClick={onOpenPortfolio}
              >
                Portafolio
              </ITButton>
              <ITButton
                variant="outlined"
                color="secondary"
                icon={<FaGithub size={13} />}
                onClick={() =>
                  window.open(GITHUB_URL, "_blank", "noopener,noreferrer")
                }
              >
                GitHub
              </ITButton>
            </ITFlex>
          </div>

          <ITText
            as="p"
            className="!mt-6 !text-xs text-slate-500 dark:text-slate-400"
          >
            Ejecuta{" "}
            <code className="rounded bg-white/70 px-1.5 py-0.5 font-mono text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
              pnpm storybook
            </code>{" "}
            para ver cada componente aislado.
          </ITText>
        </div>
      </section>
    </ITStack>
  );
}
