import { useState, type ReactNode } from "react";
import {
  FaBook,
  FaBug,
  FaCheck,
  FaCheckCircle,
  FaClipboardList,
  FaExclamationTriangle,
  FaLifeRing,
  FaLightbulb,
  FaQuestionCircle,
  FaSyncAlt,
  FaTerminal,
  FaWrench,
} from "react-icons/fa";
import { ITAccordion, ITBadget, ITButton, ITCard, ITFlex, ITGrid, ITStack, ITText } from "../index";
import type { ITAccordionItem } from "../index";
import { useITTranslation } from "@/i18n";

const GITHUB_URL = "https://github.com/maag070208/AXZY_UI_SYSTEM";
const ISSUE_URL = `${GITHUB_URL}/issues/new`;

/** Clipboard button that flips to a "Copiado" confirmation for 2s. */
const CopyButton = ({ text }: { text: string }) => {
  const { t } = useITTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <ITButton
      variant="text"
      color="gray"
      size="sm"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      <ITFlex align="center" gap={1.5}>
        {copied ? <FaCheck size={10} className="text-emerald-400" /> : <FaClipboardList size={10} />}
        {copied ? t("showcase.common.copied") : t("showcase.common.copy")}
      </ITFlex>
    </ITButton>
  );
};

/** Terminal/code surface reused across the page. */
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
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200 whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

/** Result pill used to mark the fix of a common error. */
const FixPill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-100 dark:bg-success-950/40 px-2.5 py-0.5 text-[11px] font-semibold text-success-700 dark:text-success-400">
    <FaCheckCircle size={10} />
    {children}
  </span>
);

/** Body of one common-error accordion entry: symptom, cause and the fix. */
const ErrorBody = ({
  symptom,
  cause,
  fix,
  bad,
  good,
}: {
  symptom: string;
  cause: string;
  fix: ReactNode;
  bad?: string;
  good?: string;
}) => {
  const { t } = useITTranslation();
  return (
  <ITStack spacing={3} className="pt-1">
    <div className="flex items-start gap-2">
      <FaExclamationTriangle size={12} className="mt-0.5 shrink-0 text-danger-500" />
      <span className="text-xs text-slate-700 dark:text-slate-300">{symptom}</span>
    </div>
    <div className="flex items-start gap-2">
      <FaLightbulb size={12} className="mt-0.5 shrink-0 text-warning-500" />
      <span className="text-xs text-slate-500 dark:text-slate-400">{cause}</span>
    </div>
    <div className="flex items-start gap-2">
      <FaWrench size={12} className="mt-0.5 shrink-0 text-primary-500" />
      <span className="text-xs text-slate-700 dark:text-slate-300">{fix}</span>
    </div>
    {bad && (
      <CodeBlock
        filename={t("showcase.common.incorrect")}
        code={bad}
      />
    )}
    {good && (
      <CodeBlock
        filename={t("showcase.common.correct")}
        code={good}
      />
    )}
  </ITStack>
  );
};

const COMMON_ERRORS: ITAccordionItem[] = [
  {
    id: "dynamic-classes",
    title: "Tailwind no aplica clases construidas en runtime",
    content: (
      <ErrorBody
        symptom="Un elemento con `grid-cols-${n}` o `col-span-${n}` se renderiza sin columnas, aunque el valor sea correcto."
        cause="Tailwind v4 escanea el código de forma estática y no puede ver clases construidas con template strings."
        fix={
          <>
            Declara las clases en el safelist con <code>@source inline(...)</code> en{" "}
            <code>src/index.css</code>.
          </>
        }
        bad={`// grid.tsx\nclassName={\`grid-cols-\${columns}\`}`}
        good={`/* src/index.css */\n@source inline("grid-cols-1 grid-cols-2 ... col-span-full");`}
      />
    ),
  },
  {
    id: "col-span-full",
    title: "col-span-full pisa el span base de un item",
    content: (
      <ErrorBody
        symptom="Un grid item ocupa todo el ancho aunque tenga definido un `col-span-N`."
        cause="`col-span-full` se emite después de `col-span-N`, así que gana en la cascada cuando ambas están presentes."
        fix="No combines `col-span-full` con un span base en el mismo item: usa la clase solo cuando quieras el ancho completo."
      />
    ),
  },
  {
    id: "component-css",
    title: "El CSS de un componente no llega al bundle publicado",
    content: (
      <ErrorBody
        symptom="El estilo funciona en `pnpm dev` pero desaparece en `dist/index.css` tras `pnpm bundle`."
        cause="Los archivos `.css` por componente no se recogen al construir el paquete."
        fix={
          <>
            Mueve los keyframes estilos a <code>src/index.css</code> dentro de{" "}
            <code>@layer components</code>, con prefijo <code>it-</code> y selectores{" "}
            <code>:where(.it-*)</code>.
          </>
        }
      />
    ),
  },
  {
    id: "styles-missing",
    title: "Los componentes se ven sin estilos en mi app",
    content: (
      <ErrorBody
        symptom="El markup aparece pero sin colores, espaciados ni tipografía."
        cause="Falta la hoja de estilos del paquete o el plugin de Tailwind v4 en el consumidor."
        fix={
          <>
            Instala Tailwind v4, impórtalo con <code>@import "tailwindcss"</code> y carga{" "}
            <code>@axzydev/axzy_ui_system/dist/index.css</code>.
          </>
        }
        good={`import { ITThemeProvider } from "@axzydev/axzy_ui_system"\nimport "@axzydev/axzy_ui_system/dist/index.css"`}
      />
    ),
  },
  {
    id: "dark-mode",
    title: "El dark mode no reacciona al toggle",
    content: (
      <ErrorBody
        symptom="Los componentes mantienen los colores claros al cambiar de tema."
        cause="La variante `dark` de Tailwind v4 debe apuntar a la clase `.dark`, y la app debe estar envuelta en el provider."
        fix={
          <>
            Añade <code>@variant dark (&:is(.dark &));</code> a tu CSS y envuelve la app en{" "}
            <code>ITThemeProvider</code>.
          </>
        }
      />
    ),
  },
  {
    id: "atomic-deps",
    title: "`pnpm check:atomic` falla con un import hacia arriba",
    content: (
      <ErrorBody
        symptom="El check reporta que un átomo importa a una molécula (o similar)."
        cause="Las capas deben ser unidireccionales: `atoms < molecules < organisms < templates`."
        fix="Mueve el componente compartido a una capa inferior o resuelve la composición en el consumidor, no dentro del componente."
      />
    ),
  },
  {
    id: "hardcoded-colors",
    title: "Los colores no respetan el tema",
    content: (
      <ErrorBody
        symptom="Un componente ignora la paleta y muestra siempre los mismos colores."
        cause="Hay colores hexadecimales fijos en lugar de tokens del tema."
        fix={
          <>
            Usa <code>theme</code> desde <code>@/theme/theme</code> y clases semánticas (
            <code>text-primary-600</code>) en vez de valores hardcodeados.
          </>
        }
        bad={`style={{ color: "#3b82f6" }}`}
        good={`className="text-primary-600"`}
      />
    ),
  },
  {
    id: "lint-errors",
    title: "`pnpm lint` termina con errores",
    content: (
      <ErrorBody
        symptom="La verificación local no deja avanzar aunque los tests pasen."
        cause="ESLint, `check:atomic` o `check:css` detectan convenciones incumplidas."
        fix={
          <>
            Ejecuta <code>pnpm lint</code> y corrige hasta que termine con{" "}
            <code>0 errors</code>. Las advertencias de <code>no-explicit-any</code> son
            intencionales.
          </>
        }
      />
    ),
  },
];

const FAQ: ITAccordionItem[] = [
  {
    id: "faq-theme",
    title: "¿Cómo personalizo los colores?",
    content:
      "Pasa un objeto parcial a ITThemeProvider con la clave `colors`. Solo define lo que quieras sobrescribir; el resto se hereda.",
  },
  {
    id: "faq-dark",
    title: "¿Cómo activo el dark mode?",
    content:
      "ITThemeProvider gestiona la clase `dark` en el árbol. Asegúrate de añadir `@variant dark (&:is(.dark &));` en tu CSS de Tailwind v4.",
  },
  {
    id: "faq-examples",
    title: "¿Dónde están los ejemplos de cada componente?",
    content:
      "En el sandbox: ejecuta `pnpm dev` y navega a `#ui-system`. La superficie de ejemplos es el sandbox y la referencia por componente vive en `docs/`.",
  },
  {
    id: "faq-new-component",
    title: "¿Cómo agrego un componente nuevo?",
    content:
      "Crea `src/components/<layer>/<kebab-name>/` con `<name>.tsx` y `<name>.props.ts`. Documenta cada prop con JSDoc, regístralo en `src/index.ts` y actualiza `docs/<capa>/<nombre>.md` y el showcase correspondiente.",
  },
  {
    id: "faq-changes-not-visible",
    title: "¿Por qué mis cambios no se ven en el paquete?",
    content:
      "El consumidor usa `dist/`. Regenera con `pnpm bundle` (tsup + CSS) o `pnpm build:app` para el sandbox. No edites `dist/` a mano.",
  },
  {
    id: "faq-tree-shaking",
    title: "¿La librería es tree-shakeable?",
    content:
      "Sí. Importa named exports (`import { ITButton } from \"@axzydev/axzy_ui_system\"`) y el bundler descarta lo que no usas. No hay dependencias de UI de terceros.",
  },
  {
    id: "faq-examples-docs",
    title: "¿Dónde veo la documentación de un componente?",
    content:
      "En `docs/<capa>/<componente>.md` tienes props, defaults, ejemplo y notas. Los ejemplos vivos están en el sandbox (`pnpm dev` → `#ui-system`).",
  },
  {
    id: "faq-browser-support",
    title: "¿Qué navegadores están soportados?",
    content:
      "Navegadores modernos con soporte de variables CSS y `:where()`. El copy-to-clipboard incluye un fallback para contextos no seguros o webviews embebidos.",
  },
];

const REPORT_STEPS = [
  "Confirma que el bug ocurre en la última versión publicada y anota el número de versión.",
  "Reproduce el problema en una app mínima: elimina todo lo que no sea necesario para verlo.",
  "Revisa la consola del navegador y la terminal; copia el error completo con su stack.",
  "Registra el resultado de `pnpm lint` y `pnpm bundle` si el fallo es del build.",
  "Abre un issue con la plantilla y adjunta los pasos para reproducir.",
];

const REPORT_CHECKLIST = [
  "Versión de @axzydev/axzy_ui_system",
  "Pasos exactos para reproducir",
  "Resultado esperado vs. obtenido",
  "Sistema operativo, Node y gestor de paquetes",
  "Código o repo mínimo reproducible",
  "Capturas o mensajes de error completos",
];

const DIAGNOSTICS = `pnpm lint        # ESLint + check:atomic + check:css (debe dar 0 errors)
pnpm bundle      # regenera dist/ (tsup + CSS)
pnpm check:css   # valida prefijos it-, tokens --it-* y duplicados
pnpm check:atomic # valida la dirección de dependencias entre capas`;

/**
 * Página de ayuda del sandbox (`#ui-system/general/help`): resolución de bugs
 * frecuentes, preguntas frecuentes y guía para reportar incidencias.
 */
export const HelpShowcase = () => {
  const { t } = useITTranslation();
  return (
    <ITStack spacing={10} className="animate-fadeIn">
      {/* ─── HERO ─── */}
      <ITCard className="overflow-hidden border-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-primary-950/20 dark:via-slate-900 dark:to-purple-950/20 shadow-sm">
        <div className="relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
          <ITStack spacing={5} className="relative z-10">
            <ITStack spacing={2}>
              <ITBadget label={t("showcase.help.badge")} color="purple" variant="outlined" className="w-fit" />
              <ITText as="h1" className="!text-4xl !font-bold !tracking-tight">
                {t("showcase.help.title")}
              </ITText>
              <ITText as="p" muted className="!text-base !leading-relaxed max-w-2xl">
                {t("showcase.help.subtitle")}
              </ITText>
            </ITStack>
            <ITFlex gap={3} wrap="wrap" align="center">
              <ITButton
                variant="filled"
                color="primary"
                icon={<FaBug size={13} />}
                onClick={() => window.open(ISSUE_URL, "_blank", "noopener,noreferrer")}
              >
                {t("showcase.help.reportBug")}
              </ITButton>
              <ITButton
                variant="outlined"
                color="secondary"
                icon={<FaBook size={13} />}
                onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
              >
                {t("showcase.help.viewRepo")}
              </ITButton>
            </ITFlex>
          </ITStack>
        </div>
      </ITCard>

      {/* ─── DIAGNÓSTICO RÁPIDO ─── */}
      <section>
        <ITFlex align="center" gap={2.5} className="!mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <FaTerminal size={13} />
          </span>
          <ITStack spacing={0}>
            <ITText as="h2" className="!text-lg !font-bold">
              {t("showcase.help.quickDiagnosis")}
            </ITText>
            <ITText as="p" muted className="!text-xs">
              {t("showcase.help.quickDiagnosisHint")}
            </ITText>
          </ITStack>
        </ITFlex>
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <CopyButton text={DIAGNOSTICS} />
          </div>
          <CodeBlock filename="terminal" code={DIAGNOSTICS} />
        </div>
      </section>

      {/* ─── ERRORES COMUNES ─── */}
      <section>
        <ITFlex align="center" gap={2.5} className="!mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-100 dark:bg-danger-950/40 text-danger-600 dark:text-danger-400">
            <FaExclamationTriangle size={13} />
          </span>
          <ITStack spacing={0}>
            <ITText as="h2" className="!text-lg !font-bold">
              {t("showcase.help.commonErrors")}
            </ITText>
            <ITText as="p" muted className="!text-xs">
              {t("showcase.help.commonErrorsHint")}
            </ITText>
          </ITStack>
        </ITFlex>
        <ITAccordion items={COMMON_ERRORS} allowMultiple variant="separated" />
      </section>

      {/* ─── FAQ ─── */}
      <section>
        <ITFlex align="center" gap={2.5} className="!mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-info-100 dark:bg-info-950/40 text-info-600 dark:text-info-400">
            <FaQuestionCircle size={13} />
          </span>
          <ITStack spacing={0}>
            <ITText as="h2" className="!text-lg !font-bold">
              {t("showcase.help.faq")}
            </ITText>
            <ITText as="p" muted className="!text-xs">
              {t("showcase.help.faqHint")}
            </ITText>
          </ITStack>
        </ITFlex>
        <ITAccordion items={FAQ} allowMultiple variant="bordered" />
      </section>

      {/* ─── CÓMO REPORTAR UN BUG ─── */}
      <ITCard title={t("showcase.help.howToReport")} className="border-purple-200/60 dark:border-purple-800/60 shadow-sm">
        <ITStack spacing={6}>
          <ITText as="p" className="!text-sm" muted>
            {t("showcase.help.reportIntro")}
          </ITText>

          <ITGrid container spacing={6}>
            <ITGrid item xs={12} md={6}>
              <ITStack spacing={3}>
                <ITText as="h3" className="!text-[11px] !font-bold uppercase !tracking-wider text-slate-400 dark:text-slate-500">
                  {t("showcase.help.steps")}
                </ITText>
                {REPORT_STEPS.map((step, index) => (
                  <ITFlex key={step} align="start" gap={3}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-950/40 text-[11px] font-bold text-primary-600 dark:text-primary-400">
                      {index + 1}
                    </span>
                    <ITText as="p" className="!text-sm text-slate-600 dark:text-slate-300">
                      {step}
                    </ITText>
                  </ITFlex>
                ))}
              </ITStack>
            </ITGrid>

            <ITGrid item xs={12} md={6}>
              <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5">
                <ITText as="h3" className="!mb-4 !text-[11px] !font-bold uppercase !tracking-wider text-slate-400 dark:text-slate-500">
                  {t("showcase.help.includeInReport")}
                </ITText>
                <ul className="space-y-3">
                  {REPORT_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-100 dark:bg-success-950/40 text-success-600 dark:text-success-400">
                        <FaCheck size={10} />
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ITGrid>
          </ITGrid>

          <ITFlex align="center" justify="between" gap={4} wrap="wrap" className="border-t border-slate-200 dark:border-slate-800 pt-5">
            <ITFlex align="center" gap={2}>
              <FaLifeRing size={14} className="text-primary-500" />
              <ITText as="p" className="!text-xs" muted>
                {t("showcase.help.footerHint")}
              </ITText>
            </ITFlex>
            <ITFlex gap={3} wrap="wrap">
              <ITButton
                variant="filled"
                color="primary"
                icon={<FaBug size={13} />}
                onClick={() => window.open(ISSUE_URL, "_blank", "noopener,noreferrer")}
              >
                {t("showcase.help.openIssue")}
              </ITButton>
              <ITButton
                variant="outlined"
                color="secondary"
                icon={<FaSyncAlt size={13} />}
                onClick={() => window.open(`${GITHUB_URL}/blob/main/AGENTS.md`, "_blank", "noopener,noreferrer")}
              >
                {t("showcase.help.viewAgents")}
              </ITButton>
            </ITFlex>
          </ITFlex>

          <ITFlex align="center" gap={2} wrap="wrap">
            <FixPill>{t("showcase.help.fixPill")}</FixPill>
          </ITFlex>
        </ITStack>
      </ITCard>
    </ITStack>
  );
};
