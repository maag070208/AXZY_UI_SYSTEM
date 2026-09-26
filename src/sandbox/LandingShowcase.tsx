import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FaCheck,
  FaCopy,
  FaCreditCard,
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
 * Literal per-index gradient classes for the family cards. Tailwind v4 cannot
 * see runtime-built class names, so every gradient is written out in full.
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
    <ITButton variant="text" color="gray" size="sm" onClick={handleCopy}>
      <ITFlex align="center" gap={1.5}>
        {copied ? (
          <FaCheck size={10} className="text-emerald-400" />
        ) : (
          <FaCopy size={10} />
        )}
        {copied ? "Copiado" : "Copiar"}
      </ITFlex>
    </ITButton>
  );
};

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

const STATS = [
  { label: "Componentes", value: `${TOTAL_ITEMS}`, hint: "páginas documentadas" },
  { label: "Familias", value: `${SANDBOX_GROUPS.length}`, hint: "grupos de navegación" },
  { label: "TypeScript", value: "100%", hint: "tipado estricto" },
  { label: "UI deps", value: "0", hint: "sin runtime extra" },
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
 */
export function LandingShowcase({
  onOpenItem,
  onOpenPortfolio,
}: LandingShowcaseProps) {
  return (
    <ITStack spacing={10} className="animate-fadeIn">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-primary-950/30 dark:via-slate-900 dark:to-purple-950/30 px-8 py-14 sm:px-14">
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

        <div className="relative z-10 max-w-3xl">
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
            className="it-landing-rise !mt-7 inline-flex items-center gap-2 rounded-xl border border-primary-200 dark:border-primary-800/50 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-950/30 dark:to-purple-950/30 px-4 py-2 shadow-sm"
            style={{ animationDelay: "280ms" }}
          >
            <FaNpm size={16} className="text-primary-500" />
            <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
              {INSTALL_CMD}
            </code>
            <CopyButton text={INSTALL_CMD} />
          </div>
        </div>
      </section>

      {/* ─── STAT STRIP ─── */}
      <ITGrid container spacing={4}>
        {STATS.map((stat) => (
          <ITGrid item xs={6} lg={3} key={stat.label}>
            <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <ITText
                as="span"
                className="block !text-3xl !font-extrabold !tracking-tight text-slate-900 dark:text-white"
              >
                {stat.value}
              </ITText>
              <ITText
                as="span"
                className="mt-1 block !text-sm !font-semibold text-primary-600 dark:text-primary-400"
              >
                {stat.label}
              </ITText>
              <ITText
                as="span"
                className="block !text-[11px] text-slate-400 dark:text-slate-500"
              >
                {stat.hint}
              </ITText>
            </div>
          </ITGrid>
        ))}
      </ITGrid>

      {/* ─── EXPLORE BY FAMILY ─── */}
      <section>
        <ITStack spacing={1} className="!mb-5">
          <ITText
            as="h2"
            className="!text-xl !font-bold !tracking-tight text-slate-900 dark:text-white"
          >
            Explora por familia
          </ITText>
          <ITText as="p" className="!text-sm text-slate-500 dark:text-slate-400">
            Cada tarjeta te lleva directo al primer componente del grupo.
          </ITText>
        </ITStack>

        <ITGrid container spacing={5}>
          {SANDBOX_GROUPS.map((group, index) => (
            <ITGrid item xs={12} sm={6} lg={4} key={group.id}>
              <button
                type="button"
                onClick={() => onOpenItem(group.id, group.subitems[0].id)}
                className="group flex h-full w-full flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                      GROUP_ACCENTS[index % GROUP_ACCENTS.length]
                    } text-white shadow-sm`}
                  >
                    {GROUP_ICONS[group.id]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <ITText
                      as="span"
                      className="block truncate !text-sm !font-semibold text-slate-900 dark:text-white"
                    >
                      {group.label}
                    </ITText>
                    <ITText
                      as="span"
                      className="block !text-[11px] text-slate-400 dark:text-slate-500"
                    >
                      {group.subitems.length} componentes
                    </ITText>
                  </span>
                  <ITBadget
                    label={`${group.subitems.length}`}
                    color="secondary"
                    variant="outlined"
                    size="sm"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
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
      <ITGrid container spacing={6}>
        <ITGrid item xs={12} lg={7}>
          <ITStack spacing={3}>
            <ITFlex align="center" justify="between" gap={3}>
              <ITText
                as="h2"
                className="!text-lg !font-bold !tracking-tight text-slate-900 dark:text-white"
              >
                Quickstart
              </ITText>
              <CopyButton text={QUICKSTART_CODE} />
            </ITFlex>
            <CodeBlock filename="src/App.tsx" code={QUICKSTART_CODE} />
          </ITStack>
        </ITGrid>

        <ITGrid item xs={12} lg={5}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
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

      {/* ─── LINKS ─── */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <ITFlex wrap="wrap" gap={4} justify="between" align="center">
          <ITStack spacing={1}>
            <ITText
              as="h3"
              className="!text-base !font-bold !tracking-tight text-slate-900 dark:text-white"
            >
              ¿Listo para construir?
            </ITText>
            <ITText
              as="p"
              className="!text-sm text-slate-500 dark:text-slate-400"
            >
              Revisa el portafolio, el código fuente o levanta Storybook.
            </ITText>
          </ITStack>

          <ITFlex gap={3} wrap="wrap" align="center">
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
        </ITFlex>

        <ITText
          as="p"
          className="!mt-5 !text-xs text-slate-400 dark:text-slate-500"
        >
          Ejecuta{" "}
          <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-slate-600 dark:text-slate-300">
            pnpm storybook
          </code>{" "}
          para ver cada componente aislado.
        </ITText>
      </div>
    </ITStack>
  );
}
