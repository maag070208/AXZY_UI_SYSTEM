import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
import { translateLabel } from "./i18n";
import { useITTranslation } from "@/i18n";

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

const GITHUB_URL = "https://github.com/maag070208/AXZY_UI_SYSTEM";
const INSTALL_CMD = "pnpm add @axzydev/axzy_ui_system";

/** Shared stagger offset for the hero entrance cascade (`it-reveal`). */
const reveal = (delay: number): CSSProperties =>
  ({ "--it-delay": `${delay}ms` }) as CSSProperties;

/** Muted mono eyebrow used by every section heading and metadata label. */
const EYEBROW =
  "font-mono !text-[11px] !font-medium uppercase !tracking-[0.18em] text-slate-500 dark:text-slate-400";

/** Technical card surface: 1px border, 14px radius, shadow only on hover. */
const CARD =
  "rounded-[14px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900";

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
  const { t } = useITTranslation();
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
            <FaCheck size={10} className="text-emerald-500" />
          ) : (
            <FaCopy size={10} />
          )}
          {copied ? t("showcase.common.copied") : t("showcase.common.copy")}
        </ITFlex>
      </ITButton>
    </span>
  );
};

/**
 * Dark terminal surface with an optional filename strip. Signal cyan
 * (`cyan-400`) is used only here, per the blueprint spec.
 *
 * @example
 * <CodeBlock code="pnpm add pkg" filename="terminal" />
 */
const CodeBlock = ({ code, filename }: { code: string; filename?: string }) => (
  <div className="overflow-hidden rounded-[14px] border border-slate-800 bg-slate-950">
    {filename && (
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-400">
          ▍ {filename}
        </span>
      </div>
    )}
    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
      <code>{code}</code>
    </pre>
  </div>
);

/**
 * Uniform section heading: mono eyebrow (`//`) + display `<h2>` + subtitle.
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
 * Purely decorative library preview card shown in the hero on `xl` screens.
 * Hidden from assistive tech — it duplicates no real content.
 *
 * @example
 * <HeroLibraryPreview />
 */
const HeroLibraryPreview = () => {
  const { t } = useITTranslation();
  return (
    <div aria-hidden className="hidden w-[340px] shrink-0 justify-end xl:flex">
      <div
        className="it-reveal w-full overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        style={reveal(350)}
      >
        {/* fake toolbar */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
            {t("showcase.landing.previewBadge")}
          </span>
        </div>

        {/* mini table skeleton */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
            <span className="h-4 w-14 rounded-full bg-primary-100 dark:bg-primary-950/50" />
          </div>

          <div className="mt-4 space-y-3">
            {[68, 92, 54].map((width) => (
              <div key={width} className="flex items-center gap-3">
                <span className="h-6 w-6 flex-shrink-0 rounded-[6px] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950" />
                <span
                  className="h-2 rounded-full bg-slate-200 dark:bg-slate-700"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* fake action + status */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 px-4 py-3.5 dark:border-slate-800">
          <span className="inline-flex items-center rounded-[8px] bg-primary-600 px-3 py-1.5 font-mono text-[10px] font-medium text-white">
            ITButton
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success-500/40 px-2.5 py-1 font-mono text-[10px] font-medium text-success-600 dark:text-success-400">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            {t("showcase.landing.typed")}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * i18n keys for the "built in" feature list, rendered in order inside the
 * quickstart section.
 */
const FEATURE_KEYS = [
  "showcase.landing.featureTokens",
  "showcase.landing.featureA11y",
  "showcase.landing.featureDarkMode",
  "showcase.landing.featureTreeShakeable",
  "showcase.landing.featureNoDeps",
  "showcase.landing.featureDocumented",
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
 * hero, real derived stats, deep-linking family index, quickstart, and links.
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
  const { t } = useITTranslation();

  const stats = [
    {
      id: "components",
      label: t("showcase.landing.statComponents"),
      value: `${TOTAL_ITEMS}`,
      hint: t("showcase.landing.statComponentsHint"),
      icon: <FaLayerGroup />,
    },
    {
      id: "families",
      label: t("showcase.landing.statFamilies"),
      value: `${SANDBOX_GROUPS.length}`,
      hint: t("showcase.landing.statFamiliesHint"),
      icon: <FaFolderOpen />,
    },
    {
      id: "typescript",
      label: "TypeScript",
      value: "100%",
      hint: t("showcase.landing.statTypedHint"),
      icon: <FaCode />,
    },
    {
      id: "uiDeps",
      label: t("showcase.landing.statUiDeps"),
      value: "0",
      hint: t("showcase.landing.statUiDepsHint"),
      icon: <FaBoxOpen />,
    },
  ];

  return (
    <ITStack spacing={10} className="animate-fadeIn pb-5">
      {/* ─── HERO (split-screen) ─── */}
      <section
        aria-labelledby="ui-system-hero-title"
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-12 dark:border-slate-800 dark:bg-slate-900 sm:px-12 sm:py-16"
      >
        <div
          aria-hidden
          className="it-blueprint pointer-events-none absolute inset-0 text-slate-300 dark:text-slate-800"
        />

        <div className="relative z-10 flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-10">
          <div className="min-w-0 max-w-3xl flex-1 xl:max-w-2xl">
            <div className="it-reveal">
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
              className="it-reveal font-display !mt-5 !text-4xl !font-bold -tracking-[0.02em] text-slate-900 dark:text-white sm:!text-5xl"
              style={reveal(70)}
            >
              {t("showcase.landing.heroTitleLead")}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t("showcase.landing.heroTitleHighlight")}
              </span>
            </ITText>

            <ITText
              as="p"
              className="it-reveal !mt-4 max-w-xl !text-base !leading-relaxed text-slate-600 dark:text-slate-300"
              style={reveal(140)}
            >
              {t("showcase.landing.heroSubtitle", {
                pages: TOTAL_ITEMS,
                families: SANDBOX_GROUPS.length,
              })}
            </ITText>

            <ITFlex
              gap={3}
              wrap="wrap"
              align="center"
              className="it-reveal !mt-7"
              style={reveal(210)}
            >
              <ITButton
                variant="filled"
                color="primary"
                size="lg"
                icon={<FaRocket size={13} />}
                onClick={() => onOpenItem("general", "getting-started")}
              >
                {t("showcase.landing.exploreComponents")}
              </ITButton>
              <ITButton
                variant="outlined"
                color="secondary"
                size="lg"
                icon={<FaLayerGroup size={13} />}
                onClick={onOpenPortfolio}
              >
                {t("showcase.landing.viewPortfolio")}
              </ITButton>
            </ITFlex>

            <div
              className="it-reveal mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950"
              style={reveal(280)}
            >
              <FaNpm size={16} className="shrink-0 text-primary-600 dark:text-primary-400" />
              <code className="font-mono text-xs text-slate-700 dark:text-slate-200">
                {INSTALL_CMD}
              </code>
              <span className="inline-flex items-center rounded-[8px] border border-slate-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 dark:border-slate-800">
                <CopyButton text={INSTALL_CMD} />
              </span>
            </div>
          </div>

          <HeroLibraryPreview />
        </div>
      </section>

      {/* ─── STAT STRIP ─── */}
      <section aria-label={t("showcase.landing.ariaStats")}>
        <ITGrid container spacing={4}>
          {stats.map((stat) => (
            <ITGrid item xs={6} lg={3} key={stat.id}>
              <div
                className={`flex h-full flex-col gap-4 p-5 ${CARD} transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] dark:hover:border-primary-500`}
              >
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
                  <ITText
                    as="p"
                    className="!mt-1 !text-[11px] text-slate-500 dark:text-slate-400"
                  >
                    {stat.hint}
                  </ITText>
                </div>
              </div>
            </ITGrid>
          ))}
        </ITGrid>
      </section>

      {/* ─── EXPLORE BY FAMILY (index list) ─── */}
      <section>
        <SectionHeading
          eyebrow={t("showcase.structure.navCatalog")}
          title={t("showcase.landing.exploreTitle")}
          subtitle={t("showcase.landing.exploreSubtitle")}
          className="!mb-5"
        />

        <div className={CARD}>
          {SANDBOX_GROUPS.map((group, index) => (
            <button
              key={group.id}
              type="button"
              onClick={() => onOpenItem(group.id, group.subitems[0].id)}
              className={`group flex w-full flex-wrap items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:hover:bg-slate-950 ${
                index > 0 ? "border-t border-slate-200 dark:border-slate-800" : ""
              }`}
            >
              <span className="font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-slate-50 text-[13px] text-primary-600 dark:border-slate-800 dark:bg-slate-950 dark:text-primary-400">
                {GROUP_ICONS[group.id]}
              </span>
              <span className="min-w-0 flex-1">
                <ITText
                  as="span"
                  className="block font-display !text-[15px] !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
                >
                  {translateLabel(group.id, group.label, t)}
                </ITText>
                <span className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.subitems.slice(0, 4).map((sub) => (
                    <span
                      key={sub.id}
                      className="rounded-[6px] border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                    >
                      {translateLabel(sub.id, sub.label, t)}
                    </span>
                  ))}
                  {group.subitems.length > 4 && (
                    <span className="rounded-[6px] border border-primary-200 bg-primary-50 px-2 py-0.5 font-mono text-[10px] text-primary-600 dark:border-primary-900/50 dark:bg-primary-950/40 dark:text-primary-400">
                      {t("showcase.landing.moreItems", {
                        count: group.subitems.length - 4,
                      })}
                    </span>
                  )}
                </span>
              </span>
              <span className="ml-auto flex items-center gap-3">
                <span className="font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                  {group.subitems.length}
                </span>
                <FaArrowRight
                  size={12}
                  className="text-primary-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-primary-400"
                />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── QUICKSTART ─── */}
      <section>
        <SectionHeading
          eyebrow={t("showcase.landing.quickstartEyebrow")}
          title={t("showcase.landing.quickstartTitle")}
          subtitle={t("showcase.landing.quickstartSubtitle")}
          className="!mb-5"
        />

        <ITGrid container spacing={6}>
          <ITGrid item xs={12} lg={7}>
            <ITStack spacing={3}>
              <ITFlex align="center" justify="between" gap={3}>
                <ITText as="p" className={EYEBROW}>
                  {t("showcase.landing.minimalExample")}
                </ITText>
                <span className="inline-flex items-center rounded-[8px] focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
                  <CopyButton text={QUICKSTART_CODE} />
                </span>
              </ITFlex>
              <CodeBlock filename="src/App.tsx" code={QUICKSTART_CODE} />
            </ITStack>
          </ITGrid>

          <ITGrid item xs={12} lg={5}>
            <div className={`h-full p-6 ${CARD}`}>
              <ITText as="h3" className={`!mb-4 ${EYEBROW}`}>
                {t("showcase.landing.builtIn")}
              </ITText>
              <ul className="space-y-3">
                {FEATURE_KEYS.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[6px] border border-primary-200 text-primary-600 dark:border-primary-900/50 dark:text-primary-400">
                      <FaCheck size={10} />
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {t(featureKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ITGrid>
        </ITGrid>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div
          aria-hidden
          className="it-blueprint pointer-events-none absolute inset-0 text-slate-300 dark:text-slate-800"
        />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <SectionHeading
              eyebrow={t("showcase.home.eyebrowNext")}
              title={t("showcase.landing.ctaTitle")}
              subtitle={t("showcase.landing.ctaSubtitle")}
            />

            <ITFlex gap={3} wrap="wrap" align="center" className="shrink-0">
              <ITButton
                variant="filled"
                color="primary"
                icon={<FaLayerGroup size={13} />}
                onClick={onOpenPortfolio}
              >
                {t("sandbox.nav.portfolio")}
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
            {t("showcase.landing.footerRun")}{" "}
            <code className="rounded-[6px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              pnpm dev
            </code>{" "}
            {t("showcase.landing.footerOpen")}{" "}
            <code className="rounded-[6px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              #ui-system
            </code>{" "}
            {t("showcase.landing.footerSuffix")}
          </ITText>
        </div>
      </section>
    </ITStack>
  );
}
