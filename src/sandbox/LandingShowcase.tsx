import { type CSSProperties } from "react";
import { FaArrowRight, FaCheck, FaGithub, FaLayerGroup, FaNpm, FaRocket } from "react-icons/fa";
import ITGrid from "../components/atoms/grid/grid";
import {
  BloqueCodigo,
  BotonAccion,
  BotonCopiar,
  CHIP,
  EnlaceMono,
  EYEBROW,
  Etiqueta,
  FILETE,
  SectionHeading,
} from "@/sandbox/ui";
import { SANDBOX_GROUPS, TOTAL_ITEMS } from "./navigation";
import { GROUP_ICONS } from "./icons";
import { translateLabel } from "./i18n";
import { useITTranslation } from "@/i18n";

export interface LandingShowcaseProps {
  /** Abre la página de un componente del sandbox. */
  onOpenItem: (group: string, item: string) => void;
  /** Vuelve al portafolio (`/`). */
  onOpenPortfolio: () => void;
}

const GITHUB_URL = "https://github.com/maag070208/AXZY_UI_SYSTEM";
const NPM_URL = "https://www.npmjs.com/package/@axzydev/axzy_ui_system";
const INSTALL_CMD = "pnpm add @axzydev/axzy_ui_system";

/** Shared stagger offset for the masthead entrance cascade (`it-reveal`). */
const reveal = (delay: number): CSSProperties =>
  ({ "--it-delay": `${delay}ms` }) as CSSProperties;

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
 * Landing del sandbox (`#ui-system`): hoja técnica con masthead, banda de
 * métricas derivadas, índice del catálogo por familia, quickstart y cierre.
 *
 * Es la misma lengua visual que el portafolio (filetes de 1px, mono para
 * metadatos, un solo acento) para que las dos superficies se lean como un
 * sistema y no como dos proyectos distintos.
 *
 * @example
 * ```tsx
 * <LandingShowcase onOpenItem={goToItem} onOpenPortfolio={goToPortfolio} />
 * ```
 */
export function LandingShowcase({ onOpenItem, onOpenPortfolio }: LandingShowcaseProps) {
  const { t } = useITTranslation();

  const metricas = [
    { label: t("showcase.landing.statComponents"), value: `${TOTAL_ITEMS}` },
    { label: t("showcase.landing.statFamilies"), value: `${SANDBOX_GROUPS.length}` },
    { label: "TypeScript", value: "100%" },
    { label: t("showcase.landing.statUiDeps"), value: "0" },
  ];

  return (
    <div className="animate-fadeIn pb-4">
      {/* ─── 01 · MASTHEAD ─── */}
      <section aria-labelledby="ui-system-hero-title">
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${FILETE}`}>
          <span className={`it-reveal ${EYEBROW}`}>
            {`v${__APP_VERSION__} · Tailwind v4 · MIT`}
          </span>
          <div className="flex items-center gap-5">
            <EnlaceMono href={GITHUB_URL} icono={<FaGithub size={11} />}>
              GitHub
            </EnlaceMono>
            <EnlaceMono href={NPM_URL} icono={<FaNpm size={12} />}>
              npm
            </EnlaceMono>
          </div>
        </div>

        <div className="pb-10 pt-10 sm:pt-12">
          <h1
            id="ui-system-hero-title"
            className="it-reveal font-display text-[38px] font-bold leading-[1.06] tracking-[-0.015em] text-slate-900 dark:text-white sm:text-[52px]"
            style={reveal(60)}
          >
            {t("showcase.landing.heroTitleLead")}{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {t("showcase.landing.heroTitleHighlight")}
            </span>
          </h1>

          <p
            className="it-reveal mt-6 max-w-[64ch] text-[15.5px] leading-[1.75] text-slate-600 dark:text-slate-300 sm:text-[17px]"
            style={reveal(130)}
          >
            {t("showcase.landing.heroSubtitle", {
              pages: TOTAL_ITEMS,
              families: SANDBOX_GROUPS.length,
            })}
          </p>

          <div className="it-reveal mt-8 flex flex-wrap items-center gap-3" style={reveal(200)}>
            <BotonAccion
              variante="filled"
              icono={<FaRocket size={12} />}
              onClick={() => onOpenItem("general", "getting-started")}
            >
              {t("showcase.landing.exploreComponents")}
            </BotonAccion>
            <BotonAccion
              variante="outlined"
              icono={<FaLayerGroup size={12} />}
              onClick={onOpenPortfolio}
            >
              {t("showcase.landing.viewPortfolio")}
            </BotonAccion>
          </div>

          <div
            className={`it-reveal mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[10px] border px-4 py-2 ${FILETE}`}
            style={reveal(260)}
          >
            <FaNpm size={15} className="shrink-0 text-primary-700 dark:text-primary-500" />
            <code className="font-mono text-xs text-slate-700 dark:text-slate-200">
              {INSTALL_CMD}
            </code>
            <span className={`border-l pl-3 ${FILETE}`}>
              <BotonCopiar texto={INSTALL_CMD} />
            </span>
          </div>
        </div>
      </section>

      {/* ─── BANDA DE MÉTRICAS ─── */}
      <section aria-label={t("showcase.landing.ariaStats")}>
        <dl className={`grid grid-cols-2 border-b sm:grid-cols-4 ${FILETE}`}>
          {metricas.map((metrica, indice) => (
            <div
              key={metrica.label}
              className={`py-6 ${indice > 0 ? "sm:border-l sm:pl-6 " : ""}${
                indice % 2 === 1 ? "border-l pl-6 " : ""
              }${FILETE}`}
            >
              <dt className={EYEBROW}>{metrica.label}</dt>
              <dd className="mt-2 font-display text-[30px] font-bold leading-none tracking-[-0.02em] tabular-nums text-slate-900 dark:text-white">
                {metrica.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ─── 02 · CATÁLOGO ─── */}
      <section className="pt-12 sm:pt-14">
        <SectionHeading
          index={1}
          label={t("showcase.structure.navCatalog")}
          title={t("showcase.landing.exploreTitle")}
          subtitle={t("showcase.landing.exploreSubtitle")}
          className="pb-7"
        />

        <div className={`border-t ${FILETE}`}>
          {SANDBOX_GROUPS.map((group, index) => (
            <button
              key={group.id}
              type="button"
              onClick={() => onOpenItem(group.id, group.subitems[0].id)}
              className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b py-4 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500/60 dark:hover:bg-slate-900/60 ${FILETE}`}
            >
              <span className="font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="flex items-center gap-2.5">
                  <span className="text-primary-700 dark:text-primary-500">
                    {GROUP_ICONS[group.id]}
                  </span>
                  <span className="font-display text-[16px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
                    {translateLabel(group.id, group.label, t)}
                  </span>
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {group.subitems.slice(0, 5).map((sub) => (
                    <span key={sub.id} className={CHIP}>
                      {translateLabel(sub.id, sub.label, t)}
                    </span>
                  ))}
                  {group.subitems.length > 5 && (
                    <span className={CHIP}>
                      {t("showcase.landing.moreItems", { count: group.subitems.length - 5 })}
                    </span>
                  )}
                </span>
              </span>

              <span className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                {group.subitems.length}
                <FaArrowRight
                  size={10}
                  className="text-slate-300 transition-colors group-hover:text-primary-700 dark:text-slate-600 dark:group-hover:text-primary-500"
                />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── 03 · QUICKSTART ─── */}
      <section className="pt-12 sm:pt-14">
        <SectionHeading
          index={2}
          label={t("showcase.landing.quickstartEyebrow")}
          title={t("showcase.landing.quickstartTitle")}
          subtitle={t("showcase.landing.quickstartSubtitle")}
          className="pb-7"
        />

        <ITGrid container spacing={8}>
          <ITGrid item xs={12} lg={7}>
            <BloqueCodigo code={QUICKSTART_CODE} filename="App.tsx" />
          </ITGrid>

          <ITGrid item xs={12} lg={5}>
            <p className={EYEBROW}>{t("showcase.landing.builtIn")}</p>
            <ul className={`mt-4 border-t ${FILETE}`}>
              {FEATURE_KEYS.map((key) => (
                <li key={key} className={`flex gap-3 border-b py-3 ${FILETE}`}>
                  <FaCheck
                    size={10}
                    className="mt-1.5 shrink-0 text-primary-700 dark:text-primary-500"
                  />
                  <span className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </ITGrid>
        </ITGrid>
      </section>

      {/* ─── 04 · CIERRE ─── */}
      <section className={`mt-12 border-t pt-12 sm:mt-14 ${FILETE}`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className={EYEBROW}>
              <span className="tabular-nums">03</span>
              {` — ${t("showcase.landing.ctaTitle")}`}
            </p>
            <h2 className="mt-3 font-display text-[30px] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 dark:text-white sm:text-[40px]">
              {t("showcase.landing.ctaSubtitle")}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              {t("showcase.landing.footerRun")}{" "}
              <code className="rounded-[6px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[12px] text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                pnpm dev
              </code>{" "}
              {t("showcase.landing.footerOpen")}{" "}
              <code className="rounded-[6px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[12px] text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                #ui-system
              </code>{" "}
              {t("showcase.landing.footerSuffix")}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Etiqueta>{`v${__APP_VERSION__}`}</Etiqueta>
            <BotonAccion variante="neutral" onClick={onOpenPortfolio}>
              {t("showcase.landing.viewPortfolio")}
            </BotonAccion>
          </div>
        </div>
      </section>
    </div>
  );
}
