import { FaCube, FaNpm, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import ITFlex from "../components/atoms/flex/flex";
import ITGrid from "../components/atoms/grid/grid";
import {
  BloqueCodigo,
  BotonCopiar,
  EnlaceMono,
  EYEBROW,
  Etiqueta,
  FILETE,
  SectionHeading,
} from "@/sandbox/ui";
import { useITTranslation } from "@/i18n";

const INSTALL_CMD = "pnpm add @axzydev/axzy_ui_system";
const REPO_URL = "https://github.com/maag070208/AXZY_UI_SYSTEM";

/** Un paso del setup: título, apoyo, archivo y código. */
interface Paso {
  /** Ícono de la tecnología del paso. */
  icono: React.ReactNode;
  /** Clave i18n del título. */
  titleKey: string;
  /** Clave i18n del apoyo. */
  descKey: string;
  /** Archivo o etiqueta del bloque de código. */
  filename: string;
  /** Código del paso. */
  code: string;
}

const PASOS: Paso[] = [
  {
    icono: <FaNpm size={13} />,
    titleKey: "showcase.gettingStarted.step1Title",
    descKey: "showcase.gettingStarted.step1Desc",
    filename: "terminal",
    code: "pnpm add @axzydev/axzy_ui_system\npnpm add -D tailwindcss @tailwindcss/vite @vitejs/plugin-react-swc",
  },
  {
    icono: <SiVite size={13} />,
    titleKey: "showcase.gettingStarted.step2Title",
    descKey: "showcase.gettingStarted.step2Desc",
    filename: "vite.config.ts",
    code: `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss(), react()],
})`,
  },
  {
    icono: <SiTailwindcss size={13} />,
    titleKey: "showcase.gettingStarted.step3Title",
    descKey: "showcase.gettingStarted.step3Desc",
    filename: "src/index.css",
    code: `@import "tailwindcss";
@variant dark (&:is(.dark &));`,
  },
  {
    icono: <FaReact size={13} />,
    titleKey: "showcase.gettingStarted.step4Title",
    descKey: "showcase.gettingStarted.step4Desc",
    filename: "src/main.tsx",
    code: `import { ITThemeProvider } from "@axzydev/axzy_ui_system"
import "@axzydev/axzy_ui_system/dist/index.css"

<ITThemeProvider>
  <App />
</ITThemeProvider>`,
  },
  {
    icono: <SiTypescript size={13} />,
    titleKey: "showcase.gettingStarted.step5Title",
    descKey: "showcase.gettingStarted.step5Desc",
    filename: "src/vite-env.d.ts",
    code: `/// <reference types="vite/client" />

declare module "*.css" {
  const content: string
  export default content
}`,
  },
  {
    icono: <FaCube size={13} />,
    titleKey: "showcase.gettingStarted.step6Title",
    descKey: "showcase.gettingStarted.step6Desc",
    filename: "src/App.tsx",
    code: `import { ITButton } from "@axzydev/axzy_ui_system"

export default function App() {
  return <ITButton variant="rounded">Empezar</ITButton>
}`,
  },
];

const TEMA_CODE = `const myTheme = {
  colors: {
    primary: { 50: "#fef2f2", 500: "#ef4444" },
  },
}

<ITThemeProvider theme={myTheme}>
  <App />
</ITThemeProvider>`;

/**
 * Puesta en marcha (`#ui-system/general/getting-started`): masthead con el
 * comando de instalación y los seis pasos del setup como filas numeradas con
 * filete (sin tarjetas de colores ni degradados decorativos).
 *
 * @example
 * ```tsx
 * <GettingStartedShowcase />
 * ```
 */
export const GettingStartedShowcase = () => {
  const { t } = useITTranslation();

  return (
    <div className="animate-fadeIn pb-4">
      {/* ─── MASTHEAD ─── */}
      <header className={`border-b pb-8 ${FILETE}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className={EYEBROW}>{`v${__APP_VERSION__} · Tailwind v4 · TypeScript`}</p>
          <EnlaceMono href={REPO_URL}>Repositorio</EnlaceMono>
        </div>

        <h1 className="mt-6 font-display text-[36px] font-bold leading-[1.06] tracking-[-0.015em] text-slate-900 dark:text-white sm:text-[46px]">
          AXZY UI System
        </h1>
        <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.75] text-slate-600 dark:text-slate-300">
          {t("showcase.gettingStarted.heroDesc")}
        </p>

        <div
          className={`mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[10px] border px-4 py-2 ${FILETE}`}
        >
          <FaNpm size={15} className="shrink-0 text-primary-700 dark:text-primary-500" />
          <code className="font-mono text-xs text-slate-700 dark:text-slate-200">
            {INSTALL_CMD}
          </code>
          <span className={`border-l pl-3 ${FILETE}`}>
            <BotonCopiar texto={INSTALL_CMD} />
          </span>
        </div>
      </header>

      {/* ─── PASOS ─── */}
      <section className="pt-12">
        <SectionHeading
          index={0}
          label={t("showcase.landing.quickstartEyebrow")}
          title={t("showcase.gettingStarted.stepsTitle")}
          subtitle={t("showcase.gettingStarted.stepsSubtitle")}
          className="pb-7"
        />

        <ol className={`border-t ${FILETE}`}>
          {PASOS.map((paso, indice) => (
            <li
              key={paso.titleKey}
              className={`grid gap-4 border-b py-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10 ${FILETE}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="text-primary-700 dark:text-primary-500">{paso.icono}</span>
                  <h3 className="font-display text-[16px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
                    {t(paso.titleKey)}
                  </h3>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {t(paso.descKey)}
                </p>
              </div>

              <BloqueCodigo code={paso.code} filename={paso.filename} />
            </li>
          ))}
        </ol>
      </section>

      {/* ─── THEMING ─── */}
      <section className="pt-12">
        <div className={`border-t pt-10 ${FILETE}`}>
          <ITGrid container spacing={8}>
            <ITGrid item xs={12} lg={5}>
              <p className={EYEBROW}>{t("showcase.gettingStarted.themingTitle")}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
                {t("showcase.gettingStarted.themingDesc")}
              </p>
              <ITFlex align="center" gap={2} wrap="wrap" className="!mt-5">
                <Etiqueta>Tailwind v4</Etiqueta>
                <Etiqueta>Runtime</Etiqueta>
              </ITFlex>
            </ITGrid>

            <ITGrid item xs={12} lg={7}>
              <BloqueCodigo code={TEMA_CODE} filename="theme.ts" />
            </ITGrid>
          </ITGrid>
        </div>
      </section>

    </div>
  );
};
