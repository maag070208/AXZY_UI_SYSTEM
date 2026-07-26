import { FaNpm, FaReact, FaCheck } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import { useState } from "react";
import ITBadget from "../components/badget/badget";
import ITButton from "../components/button/button";
import ITCard from "../components/card/card";
import ITDivider from "../components/divider/divider";
import ITFlex from "../components/flex/flex";
import ITGrid from "../components/grid/grid";
import ITStack from "../components/stack/stack";
import ITText from "../components/text/text";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <ITButton
      variant="text"
      color="gray"
      size="small"
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
    >
      <ITFlex align="center" gap={1.5}>
        {copied ? <FaCheck size={10} className="text-emerald-400" /> : <FaNpm size={10} />}
        {copied ? "Copiado" : "Copiar"}
      </ITFlex>
    </ITButton>
  );
};

const CodeBlock = ({ code, filename, color }: { code: string; filename?: string; color?: string }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
    {filename && (
      <div className={`px-4 py-2 border-b border-slate-200 dark:border-slate-700 ${color || "bg-slate-50 dark:bg-slate-800/80"}`}>
        <ITText as="span" className="!text-xs !font-mono !text-slate-400">{filename}</ITText>
      </div>
    )}
    <div className="relative bg-slate-950">
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const codeFileColors = [
  "bg-emerald-50 dark:bg-emerald-950/30",
  "bg-blue-50 dark:bg-blue-950/30",
  "bg-cyan-50 dark:bg-cyan-950/30",
  "bg-violet-50 dark:bg-violet-950/30",
  "bg-amber-50 dark:bg-amber-950/30",
  "bg-rose-50 dark:bg-rose-950/30",
];

const stepStyles = [
  { iconBg: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
  { iconBg: "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" },
  { iconBg: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400" },
  { iconBg: "bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400" },
  { iconBg: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
  { iconBg: "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400" },
];

const steps = [
  {
    icon: <FaNpm size={14} />,
    title: "Instalar dependencias",
    desc: "Tailwind v4 y su plugin para Vite.",
    filename: "terminal",
    code: "npm install @axzydev/axzy_ui_system\nnpm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react-swc",
  },
  {
    icon: <SiVite size={14} />,
    title: "Configurar Vite",
    desc: "Agrega Tailwind como plugin de Vite.",
    filename: "vite.config.ts",
    code: `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [tailwindcss(), react()],
})`,
  },
  {
    icon: <SiTailwindcss size={14} />,
    title: "Agregar Tailwind",
    desc: "Importa Tailwind en tu archivo CSS.",
    filename: "src/index.css",
    code: `@import "tailwindcss";
@variant dark (&:is(.dark &));`,
  },
  {
    icon: <FaReact size={14} />,
    title: "Importar estilos",
    desc: "Envuelve tu app con el provider.",
    filename: "src/main.tsx",
    code: `import { ITThemeProvider } from "@axzydev/axzy_ui_system"
import "@axzydev/axzy_ui_system/dist/index.css"

<ITThemeProvider>
  <App />
</ITThemeProvider>`,
  },
  {
    icon: <SiTypescript size={14} />,
    title: "Declaración de tipos",
    desc: "Para que TS acepte imports CSS.",
    filename: "src/vite-env.d.ts",
    code: `/// <reference types="vite/client" />

declare module "*.css" {
  const content: string
  export default content
}`,
  },
  {
    icon: <FaReact size={14} />,
    title: "Primer componente",
    desc: "Ya puedes usar cualquier componente.",
    filename: "src/App.tsx",
    code: `import { ITButton } from "@axzydev/axzy_ui_system"

export default function App() {
  return <ITButton variant="rounded">Empezar</ITButton>
}`,
  },
];

export const GettingStartedShowcase = () => {
  return (
    <ITStack spacing={10}>
      {/* ─── HERO ─── */}
      <ITCard className="overflow-hidden border-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-primary-950/20 dark:via-slate-900 dark:to-purple-950/20 shadow-sm">
        <div className="relative">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

          <ITStack spacing={5} className="relative z-10">
            <ITStack spacing={2}>
              <ITBadget label="v1.0.0" color="primary" variant="outlined" className="w-fit" />
              <ITText as="h1" className="!text-4xl !font-bold !tracking-tight">
                AXZY UI System
              </ITText>
              <ITText as="p" muted className="!text-base !leading-relaxed max-w-xl">
                Librería de componentes React con Tailwind CSS v4. Diseñada para apps enterprise con experiencia de desarrollo fluida.
              </ITText>
            </ITStack>

            <ITFlex gap={3} wrap="wrap" align="center">
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-950/30 dark:to-purple-950/30 border border-primary-200 dark:border-primary-800/50 shadow-sm">
                <ITFlex align="center" gap={2}>
                  <FaNpm size={16} className="text-primary-500" />
                  <code className="text-sm font-mono text-slate-800 dark:text-slate-200">npm install @axzydev/axzy_ui_system</code>
                  <CopyButton text="npm install @axzydev/axzy_ui_system" />
                </ITFlex>
              </div>
            </ITFlex>
          </ITStack>
        </div>
      </ITCard>

      {/* ─── SETUP STEPS ─── */}
      <ITGrid container spacing={6}>
        {steps.map((step, i) => (
          <ITGrid item xs={12} md={6} key={i}>
            <ITCard className="border-slate-200/60 dark:border-slate-800/60 shadow-sm h-full">
              <ITStack spacing={4}>
                <ITFlex align="center" gap={2.5}>
                  <div className={`w-8 h-8 rounded-lg ${stepStyles[i].iconBg} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <div>
                    <ITText as="p" className="!text-sm !font-semibold">{step.title}</ITText>
                    <ITText as="p" className="!text-xs !text-slate-400">{step.desc}</ITText>
                  </div>
                </ITFlex>
                <CodeBlock code={step.code} filename={step.filename} color={codeFileColors[i]} />
              </ITStack>
            </ITCard>
          </ITGrid>
        ))}
      </ITGrid>

      {/* ─── THEMING ─── */}
      <ITCard title="Theming" className="border-purple-200/60 dark:border-purple-800/60 shadow-sm">
        <ITStack spacing={4}>
          <ITText as="p" className="!text-sm" muted>
            Personaliza colores en runtime. Solo necesitas los que quieras cambiar.
          </ITText>
          <div className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 dark:from-purple-950/20 dark:via-fuchsia-950/20 dark:to-pink-950/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800/30">
            <CodeBlock
              code={`const myTheme = {
  colors: {
    primary: { 50: "#fef2f2", 500: "#ef4444" },
  },
}

<ITThemeProvider theme={myTheme}>
  <App />
</ITThemeProvider>`}
            />
          </div>
        </ITStack>
      </ITCard>
    </ITStack>
  );
};
