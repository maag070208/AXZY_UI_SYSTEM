import React, { useState, ReactNode } from "react";
import { FaCode, FaTimes } from "react-icons/fa";
import ITStack from "../components/stack/stack";
import ITFlex from "../components/flex/flex";
import ITGrid from "../components/grid/grid";
import ITCard from "../components/card/card";
import ITButton from "../components/button/button";
import ITStatCard from "../components/stat-card/stat-card";
import ITAvatar from "../components/avatar/avatar";
import ITSlider from "../components/slider/slider";
import ITSegmentedControl from "../components/segmented-control/segmented-control";
import ITSlideToggle from "../components/slide/slide";
import ITSelect from "../components/select/select";
import ITInput from "../components/input/input";
import ITText from "../components/text/text";
import { ShowcaseLayout, CodeViewer } from "./ShowcaseLayout";

const DemoBox = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg p-3 text-center text-sm font-medium ${className}`}>
    {children}
  </div>
);

const DemoCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm ${className}`}>
    <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/50 mb-3" />
    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{children}</p>
    <p className="text-xs text-slate-400 mt-1">Descripción del item</p>
  </div>
);

// ─────────────────────────────────────────
// 1. ITStack Showcase
// ─────────────────────────────────────────

const alignOptions: { value: string; label: string }[] = [
  { value: "start", label: "Start" },
  { value: "center", label: "Center" },
  { value: "end", label: "End" },
  { value: "stretch", label: "Stretch" },
  { value: "baseline", label: "Baseline" },
];

const justifyOptions: { value: string; label: string }[] = [
  { value: "start", label: "Start" },
  { value: "center", label: "Center" },
  { value: "end", label: "End" },
  { value: "between", label: "Between" },
  { value: "around", label: "Around" },
  { value: "evenly", label: "Evenly" },
];

// Cleaner demo box using inline gradient + soft shadow + numbered
const StackDemoItem = ({ index, size = "md" }: { index: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "min-w-[48px] h-10 px-3 text-xs",
    md: "min-w-[64px] h-14 px-4 text-sm",
    lg: "min-w-[80px] h-20 px-5 text-base",
  };
  return (
    <div
      className={`${sizeClasses[size]} rounded-xl text-white font-semibold flex items-center justify-center`}
      style={{
        background: 'linear-gradient(135deg, var(--color-primary-500, #3b82f6) 0%, var(--color-primary-700, #1d4ed8) 100%)',
        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
      }}
    >
      Item {index}
    </div>
  );
};

// Soft chip-like demo for tag-cloud style
const StackChip = ({ label, color = "primary" }: { label: string; color?: "primary" | "success" | "warning" | "info" }) => {
  const palettes = {
    primary: "bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-800",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    info: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
  };
  return (
    <span className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${palettes[color]}`}>
      {label}
    </span>
  );
};

export const StackShowcase = () => {
  const [direction, setDirection] = useState<"row" | "column">("column");
  const [spacing, setSpacing] = useState(3);
  const [withDivider, setWithDivider] = useState(false);
  const [align, setAlign] = useState<string>("start");
  const [justify, setJustify] = useState<string>("start");
  const [wrapMode, setWrapMode] = useState<string>("nowrap");

  const PATTERN_CODES = {
    pageHeader: `<ITStack
  direction="row"
  spacing={3}
  justifyContent="between"
  alignItems="center"
>
  <div>
    <p className="text-sm font-bold">Patient Records</p>
    <p className="text-xs text-slate-500">128 active records</p>
  </div>
  <ITStack direction="row" spacing={2}>
    <button className="px-3 py-1.5 rounded-lg border ...">
      Export
    </button>
    <button className="px-3 py-1.5 rounded-lg bg-primary-600 ...">
      + New Record
    </button>
  </ITStack>
</ITStack>`,
    tagCloud: `<ITStack
  direction="row"
  spacing={2}
  flexWrap="wrap"
>
  {tags.map((tag) => (
    <span
      key={tag}
      className="px-3 py-1.5 rounded-lg border ..."
    >
      {tag}
    </span>
  ))}
</ITStack>`,
    sectionList: `<ITStack
  spacing={0}
  divider={
    <div className="h-px bg-slate-200 dark:bg-slate-700 mx-3" />
  }
>
  {users.map((user) => (
    <div
      key={user.email}
      className="flex items-center gap-3 py-3 px-4 ..."
    >
      <div className="w-9 h-9 rounded-full ...">{user.initial}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold ...">{user.name}</p>
        <p className="text-xs ...">{user.email}</p>
      </div>
      <span className="...">{user.status}</span>
    </div>
  ))}
</ITStack>`,
    notification: `<ITStack
  direction="row"
  spacing={3}
  alignItems="center"
  className="p-4"
>
  <div className="w-9 h-9 rounded-full bg-emerald-500 ... shrink-0">
    ✓
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-semibold ...">Deployment successful</p>
    <p className="text-xs ...">Your changes are live in production.</p>
  </div>
  <button className="w-7 h-7 ... shrink-0">×</button>
</ITStack>`,
    statsRow: `<ITStack direction="row" spacing={3}>
  {stats.map((stat) => (
    <div
      key={stat.label}
      className="flex-1 min-w-0 rounded-xl p-3 ..."
    >
      <p className="text-[10px] uppercase ...">{stat.label}</p>
      <p className="text-xl font-bold font-mono">{stat.value}</p>
      <p className="text-[10px] ...">{stat.delta}</p>
    </div>
  ))}
</ITStack>`,
  };

  const buildCode = () => {
    const props = [`direction="${direction}"`, `spacing={${spacing}}`];
    if (align !== "start") props.push(`alignItems="${align}"`);
    if (justify !== "start") props.push(`justifyContent="${justify}"`);
    if (wrapMode !== "nowrap") props.push(`flexWrap="${wrapMode}"`);
    if (withDivider) props.push(`divider={<hr className="border-slate-200 dark:border-slate-700" />}`);
    return `<ITStack\n  ${props.join("\n  ")}\n>\n  <Card>Item 1</Card>\n  <Card>Item 2</Card>\n  <Card>Item 3</Card>\n</ITStack>`;
  };

  return (
    <ShowcaseLayout
      title="ITStack"
      description="Layout basado en flexbox con dirección, spacing uniforme, alineación y distribución. Ideal para secciones verticales, toolbars horizontales, listas de items y form rows."
      code={buildCode()}
      doc={{
        summary:
          "ITStack is a simplified flexbox layout primitive that controls direction, spacing, alignment, and justification in a single component. Supports optional dividers between children and renders as any HTML element.",
        description:
          "Use ITStack everywhere you need consistent vertical or horizontal spacing. The gap is measured in 0.25rem units (Tailwind spacing scale). Combine with align and justify for centering, space-between distribution, or baseline alignment. Wrap mode enables responsive wrapping for tag clouds, filter chips, or toolbar buttons.",
        examples: [
          "<ITStack direction=\"row\" spacing={2} alignItems=\"center\">\n  <ITButton>Cancel</ITButton>\n  <ITButton color=\"primary\">Save</ITButton>\n</ITStack>",
          "<ITStack spacing={4} divider={<hr />}>\n  <div>Section A</div>\n  <div>Section B</div>\n</ITStack>",
          "<ITStack direction=\"row\" spacing={1} flexWrap=\"wrap\">\n  {tags.map(t => <ITBadget key={t} label={t} />)}\n</ITStack>",
          "<ITStack direction=\"row\" spacing={4} justifyContent=\"between\" alignItems=\"center\" className=\"w-full\">\n  <h2>Page Title</h2>\n  <ITButton label=\"Action\" />\n</ITStack>",
        ],
        props: [
          { name: "children", type: "ReactNode", description: "Stack children elements." },
          { name: "direction", type: '"row" | "column" | "row-reverse" | "column-reverse"', default: '"column"', description: "Flex direction." },
          { name: "spacing", type: "number", default: "0", description: "Gap between children in 0.25rem units (0–12)." },
          { name: "alignItems", type: '"start" | "end" | "center" | "stretch" | "baseline"', description: "Cross-axis (vertical in row, horizontal in column) alignment." },
          { name: "justifyContent", type: '"start" | "end" | "center" | "between" | "around" | "evenly"', description: "Main-axis distribution of children." },
          { name: "flexWrap", type: '"nowrap" | "wrap" | "wrap-reverse"', default: '"nowrap"', description: "Whether children wrap to the next line." },
          { name: "divider", type: "ReactNode", description: "Optional element rendered between each pair of children." },
          { name: "className", type: "string", description: "Additional CSS classes on the container." },
          { name: "style", type: "CSSProperties", description: "Inline styles on the container." },
          { name: "as", type: "ElementType", default: '"div"', description: "HTML element to render as (e.g. \"section\", \"nav\", \"ul\")." },
        ],
        notes: [
          "Spacing is multiplied by 0.25rem internally — spacing={4} equals gap: 1rem.",
          "The container is always display: flex — use direction to switch between vertical and horizontal.",
          "Divider is cloned between children via React.cloneElement — it must be a single valid React element.",
          "Set as=\"ul\" and wrap children in <li> for semantic list layouts.",
          "For complex multi-axis layouts, use ITFlex instead of ITStack.",
        ],
      }}
      demo={
        <div className="w-full max-w-xl flex flex-col">
          <div className="min-h-[360px]">
            <ITStack
              direction={direction as any}
              spacing={spacing}
              className="w-full"
              alignItems={align as any}
              justifyContent={justify as any}
              flexWrap={wrapMode as any}
              divider={withDivider ? <div className={`${direction === "row" ? "w-px h-8" : "h-px w-full"} bg-slate-200 dark:bg-slate-700 self-stretch`} /> : undefined}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="min-w-[80px] h-8 px-3 rounded-lg text-white text-xs font-semibold flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary-500, #3b82f6) 0%, var(--color-primary-700, #1d4ed8) 100%)',
                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
                  }}
                >
                  Item {i}
                </div>
              ))}
            </ITStack>
          </div>

          {/* Fixed footer with active-property badges */}
          <div className="sticky bottom-0 mt-4 -mx-6 -mb-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mr-1">Active:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">{direction}</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">gap:{spacing}</span>
            {align !== "start" && <span className="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">align:{align}</span>}
            {justify !== "start" && <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">justify:{justify}</span>}
            {wrapMode !== "nowrap" && <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">{wrapMode}</span>}
            {withDivider && <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">divider</span>}
          </div>
        </div>
      }
      controls={
        <>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Direction</p>
            <ITSegmentedControl
              options={[
                { value: "column", label: "Column" },
                { value: "row", label: "Row" },
                { value: "row-reverse", label: "Row ↩" },
                { value: "column-reverse", label: "Column ↩" },
              ]}
              value={direction}
              onChange={(v) => setDirection(v as any)}
            />
          </div>
          <ITSlider label="Spacing (0.25rem units)" value={spacing} onChange={setSpacing} min={0} max={12} />
          <ITSelect
            name="align_items"
            label="Align Items"
            value={align}
            onChange={(e) => setAlign(e.target.value)}
            options={alignOptions}
          />
          <ITSelect
            name="justify_content"
            label="Justify Content"
            value={justify}
            onChange={(e) => setJustify(e.target.value)}
            options={justifyOptions}
          />
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Flex Wrap</p>
            <ITSegmentedControl
              options={[
                { value: "nowrap", label: "Nowrap" },
                { value: "wrap", label: "Wrap" },
                { value: "wrap-reverse", label: "Reverse" },
              ]}
              value={wrapMode}
              onChange={(v) => setWrapMode(v as string)}
            />
          </div>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Show divider</span>
            <ITSlideToggle isOn={withDivider} onToggle={setWithDivider} size="sm" />
          </ITFlex>
        </>
      }
      gallery={
        <ITStack spacing={8}>
          {/* ── Section 1: Spacing Scale ── */}
          <GallerySection
            title="Spacing Scale"
            subtitle="Try different gap values to feel the rhythm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { gap: 1, label: "Tight", desc: "Compact UI" },
                { gap: 3, label: "Default", desc: "Comfortable" },
                { gap: 6, label: "Relaxed", desc: "Breathing room" },
                { gap: 10, label: "Spacious", desc: "Hero sections" },
              ].map((s) => (
                <div key={s.gap} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{s.label}</span>
                    <span className="text-[10px] font-mono text-slate-400">spacing={s.gap} • {(s.gap * 0.25).toFixed(2)}rem</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-4">{s.desc}</p>
                  <ITStack direction="row" spacing={s.gap}>
                    <StackDemoItem index={1} size="sm" />
                    <StackDemoItem index={2} size="sm" />
                    <StackDemoItem index={3} size="sm" />
                  </ITStack>
                </div>
              ))}
            </div>
          </GallerySection>

          {/* ── Section 2: Justify Content ── */}
          <GallerySection
            title="Justify Content"
            subtitle="How children are distributed along the main axis"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "start", desc: "Children packed at the start" },
                { label: "center", desc: "Children centered on the axis" },
                { label: "end", desc: "Children packed at the end" },
                { label: "between", desc: "First/last at edges, rest spread evenly" },
                { label: "around", desc: "Equal space around each child" },
                { label: "evenly", desc: "Equal space everywhere" },
              ].map((j) => (
                <div key={j.label} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-xs font-mono font-bold text-primary-600 dark:text-primary-400">justifyContent="{j.label}"</code>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">{j.desc}</p>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-dashed border-slate-200 dark:border-slate-700">
                    <ITStack direction="row" spacing={2} justifyContent={j.label as any} className="w-full">
                      <StackDemoItem index={1} size="sm" />
                      <StackDemoItem index={2} size="sm" />
                      <StackDemoItem index={3} size="sm" />
                    </ITStack>
                  </div>
                </div>
              ))}
            </div>
          </GallerySection>

          {/* ── Section 3: Align Items ── */}
          <GallerySection
            title="Align Items"
            subtitle="How children are aligned on the cross axis"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "start", desc: "Aligned to top (in row)" },
                { label: "center", desc: "Centered on cross axis" },
                { label: "end", desc: "Aligned to bottom (in row)" },
                { label: "stretch", desc: "Children fill cross axis" },
                { label: "baseline", desc: "Text baselines align" },
              ].map((a) => (
                <div key={a.label} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">alignItems="{a.label}"</code>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">{a.desc}</p>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-dashed border-slate-200 dark:border-slate-700">
                    <ITStack direction="row" spacing={3} alignItems={a.label as any} className="h-24">
                      <StackDemoItem index={1} size="sm" />
                      <div className="min-w-[64px] h-14 px-4 text-white rounded-xl flex items-center justify-center font-semibold text-sm"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-success-500, #10b981) 0%, var(--color-success-700, #047857) 100%)',
                          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        Mid
                      </div>
                      <StackDemoItem index={3} size="sm" />
                    </ITStack>
                  </div>
                </div>
              ))}
            </div>
          </GallerySection>

          {/* ── Section 4: Real UI cases ── */}
          <GallerySection
            title="Real UI cases"
            subtitle="Production-ready UI built entirely with ITStack"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Page header with actions */}
              <PatternCard title="Page Header" desc="Title + actions on the right" code={PATTERN_CODES.pageHeader}>
                <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <ITStack direction="row" spacing={3} justifyContent="between" alignItems="center">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Patient Records</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">128 active records</p>
                    </div>
                    <ITStack direction="row" spacing={2}>
                      <ITButton variant="outlined" color="gray" size="small">
                        Export
                      </ITButton>
                      <ITButton variant="filled" color="primary" size="small">
                        + New Record
                      </ITButton>
                    </ITStack>
                  </ITStack>
                </div>
              </PatternCard>

              {/* Tag cloud */}
              <PatternCard title="Tag Cloud" desc="Wrap enabled for flowing tags" code={PATTERN_CODES.tagCloud}>
                <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <ITStack direction="row" spacing={2} flexWrap="wrap">
                    <StackChip label="React" color="primary" />
                    <StackChip label="TypeScript" color="success" />
                    <StackChip label="Tailwind" color="info" />
                    <StackChip label="Storybook" color="warning" />
                    <StackChip label="Vite" color="primary" />
                    <StackChip label="CSS Vars" color="info" />
                    <StackChip label="Flexbox" color="success" />
                    <StackChip label="Accessibility" color="warning" />
                  </ITStack>
                </div>
              </PatternCard>

              {/* Section list with dividers */}
              <PatternCard title="Section List" desc="Subtle divider between items" code={PATTERN_CODES.sectionList}>
                <div className="rounded-xl p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <ITStack spacing={0} divider={<div className="h-px bg-slate-200 dark:bg-slate-700 mx-3" />}>
                    {[
                      { initial: "JD", name: "John Doe", email: "john@axzy.dev", status: "Active", color: "primary" },
                      { initial: "AS", name: "Anna Smith", email: "anna@axzy.dev", status: "Pending", color: "warning" },
                      { initial: "MK", name: "Mike Kim", email: "mike@axzy.dev", status: "Active", color: "success" },
                    ].map((user) => (
                      <div key={user.email} className="flex items-center gap-3 py-3 px-4 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-lg transition-colors">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-primary-500, #3b82f6) 0%, var(--color-primary-700, #1d4ed8) 100%)',
                            boxShadow: '0 2px 8px 0 rgba(59, 130, 246, 0.25)',
                          }}
                        >
                          {user.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                          user.color === "primary" ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300" :
                          user.color === "warning" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" :
                          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </ITStack>
                </div>
              </PatternCard>

              {/* Notification banner */}
              <PatternCard title="Notification banner" desc="Icon + message + dismiss" code={PATTERN_CODES.notification}>
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/50 overflow-hidden bg-emerald-50 dark:bg-emerald-950/40">
                  <ITStack direction="row" spacing={3} alignItems="center" className="p-4">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <span className="text-base font-bold leading-none">✓</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Deployment successful</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Your changes are live in production.</p>
                    </div>
                    <ITButton variant="icon-only" color="gray" size="small">
                      <span className="text-lg leading-none">×</span>
                    </ITButton>
                  </ITStack>
                </div>
              </PatternCard>

              {/* Stats row */}
              <PatternCard title="Stats row" desc="3 metric cards in one row" code={PATTERN_CODES.statsRow}>
                <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <ITStack direction="row" spacing={3}>
                    {[
                      { label: "Revenue", value: "$48.2k", delta: "+12.4%", color: "emerald" },
                      { label: "Active users", value: "2,847", delta: "+5.1%", color: "primary" },
                      { label: "Conversion", value: "3.24%", delta: "−0.8%", color: "amber" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex-1 min-w-0 bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1 font-mono">{stat.value}</p>
                        <p className={`text-[10px] font-semibold mt-0.5 ${
                          stat.color === "emerald" ? "text-emerald-600 dark:text-emerald-400" :
                          stat.color === "amber" ? "text-amber-600 dark:text-amber-400" :
                          "text-primary-600 dark:text-primary-400"
                        }`}>{stat.delta}</p>
                      </div>
                    ))}
                  </ITStack>
                </div>
              </PatternCard>
            </div>
          </GallerySection>
        </ITStack>
      }
    />
  );
};

// ── Helper components ──

const GallerySection = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div>
    <div className="mb-5">
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-primary-500 to-primary-700" />
        {title}
      </h3>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-3">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const PatternCard = ({ title, desc, code, children }: { title: string; desc?: string; code?: string; children: React.ReactNode }) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex items-start justify-between gap-2 p-4 pb-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
          {desc && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>}
        </div>
        {code && (
          <ITButton variant="outlined" color="gray" size="small" onClick={() => setShowCode(!showCode)}>
            <ITFlex align="center" gap={1}>
              <FaCode size={9} />
              {showCode ? "Hide code" : "Code"}
            </ITFlex>
          </ITButton>
        )}
      </div>
      <div className="px-4 pb-4">{children}</div>
      {showCode && code && (
        <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-3">
          <CodeViewer code={code} compact />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// 2. ITFlex Showcase
// ─────────────────────────────────────────

const FLEX_PATTERN_CODES = {
  spaceBetween: `<ITFlex
  direction="row"
  justify="between"
  align="center"
  gap={3}
>
  <ITFlex direction="column" gap={0}>
    <p>Document.pdf</p>
    <p>Last edited 2 min ago</p>
  </ITFlex>
  <ITFlex direction="row" gap={2}>
    <ITButton label="Cancel" variant="outlined" color="gray" size="small" />
    <ITButton label="Save" variant="filled" color="primary" size="small" />
  </ITFlex>
</ITFlex>`,
  growItems: `<ITFlex direction="row" gap={3}>
  <ITFlex grow direction="column" className="...">
    Sidebar
  </ITFlex>
  <ITFlex grow direction="column" className="...">
    Content
  </ITFlex>
  <div className="...">Fixed</div>
</ITFlex>`,
  centeredCard: `<ITFlex
  direction="column"
  justify="center"
  align="center"
  gap={3}
  className="min-h-56 text-center px-6 py-6"
>
  <div className="w-14 h-14 rounded-2xl ...">✦</div>
  <div>
    <p className="text-lg font-bold ...">All set!</p>
    <p className="text-xs ...">Your workspace is ready to use.</p>
  </div>
  <ITButton label="Get started" variant="filled" color="primary" size="small" />
</ITFlex>`,
  formRowWrap: `<ITFlex
  direction="row"
  wrap="wrap"
  gap={3}
>
  {fields.map((f) => (
    <ITFlex
      key={f.label}
      grow
      basis={56}
      direction="column"
      gap={1}
    >
      <label>{f.label}</label>
      <input />
    </ITFlex>
  ))}
</ITFlex>`,
  stretchColumn: `<ITFlex
  direction="column"
  align="stretch"
  gap={0}
  className="h-full"
>
  <div className="h-12 ...">Header</div>
  <ITFlex grow align="center" justify="center" direction="column">
    Main content
  </ITFlex>
  <div className="h-12 ...">Footer</div>
</ITFlex>`,
};

export const FlexShowcase = () => {
  const [direction, setDirection] = useState<"row" | "column" | "row-reverse" | "column-reverse">("row");
  const [justify, setJustify] = useState("start");
  const [align, setAlign] = useState("center");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState(3);

  const justifyOptions = [
    { value: "start", label: "Start" },
    { value: "center", label: "Center" },
    { value: "end", label: "End" },
    { value: "between", label: "Between" },
    { value: "around", label: "Around" },
    { value: "evenly", label: "Evenly" },
  ];

  const buildCode = () => {
    const props = [`direction="${direction}"`];
    if (justify !== "start") props.push(`justify="${justify}"`);
    if (align !== "stretch") props.push(`align="${align}"`);
    if (wrap !== "nowrap") props.push(`wrap="${wrap}"`);
    if (gap !== 0) props.push(`gap={${gap}}`);
    return `<ITFlex\n  ${props.join("\n  ")}\n>\n  <Box>Item 1</Box>\n  <Box>Item 2</Box>\n  <Box>Item 3</Box>\n</ITFlex>`;
  };

  return (
    <ShowcaseLayout
      title="ITFlex"
      description="Contenedor flexbox completo con control total sobre alineación, distribución y gap. Para layouts complejos que requieren más control que ITStack."
      code={buildCode()}
      demo={
        <div className="w-full max-w-xl flex flex-col">
          <div className="min-h-[360px]">
            <ITFlex
              direction={direction as any}
              justify={justify as any}
              align={align as any}
              wrap={wrap as any}
              gap={gap}
              className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-dashed border-slate-200 dark:border-slate-700"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="min-w-[80px] h-8 px-3 rounded-lg text-white text-xs font-semibold flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary-500, #3b82f6) 0%, var(--color-primary-700, #1d4ed8) 100%)',
                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
                  }}
                >
                  Item {i}
                </div>
              ))}
            </ITFlex>
          </div>

          {/* Fixed footer with active-property badges */}
          <div className="sticky bottom-0 mt-4 -mx-6 -mb-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mr-1">Active:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">{direction}</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">gap:{gap}</span>
            {justify !== "start" && <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">justify:{justify}</span>}
            {align !== "stretch" && <span className="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">align:{align}</span>}
            {wrap !== "nowrap" && <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">{wrap}</span>}
          </div>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Direction</p>
            <ITSegmentedControl
              options={[
                { value: "row", label: "Row" },
                { value: "column", label: "Column" },
                { value: "row-reverse", label: "Row ↩" },
                { value: "column-reverse", label: "Col ↩" },
              ]}
              value={direction}
              onChange={(v) => setDirection(v as any)}
              size="sm"
            />
          </div>
          <ITSelect
            name="flex_justify"
            label="Justify Content"
            value={justify}
            onChange={(e) => setJustify(e.target.value)}
            options={justifyOptions}
          />
          <ITSelect
            name="flex_align"
            label="Align Items"
            value={align}
            onChange={(e) => setAlign(e.target.value)}
            options={[
              { label: "Start", value: "start" },
              { label: "Center", value: "center" },
              { label: "End", value: "end" },
              { label: "Stretch", value: "stretch" },
              { label: "Baseline", value: "baseline" },
            ]}
          />
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Flex Wrap</p>
            <ITSegmentedControl
              options={[
                { value: "nowrap", label: "Nowrap" },
                { value: "wrap", label: "Wrap" },
                { value: "wrap-reverse", label: "Reverse" },
              ]}
              value={wrap}
              onChange={(v) => setWrap(v as string)}
            />
          </div>
          <ITSlider label="Gap (0.25rem units)" value={gap} onChange={setGap} min={0} max={12} />
        </ITStack>
      }
      gallery={
        <ITStack spacing={8}>
          {/* ── Section 1: Real UI cases ── */}
          <GallerySection
            title="Real UI cases"
            subtitle="Production-ready UI built entirely with ITFlex"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Space-between row */}
              <PatternCard title="Toolbar row" desc="justify-between + nested actions" code={FLEX_PATTERN_CODES.spaceBetween}>
                <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700 overflow-x-auto bg-slate-50 dark:bg-slate-800/80">
                  <ITFlex direction="row" justify="between" align="center" gap={3}>
                    <ITFlex direction="column" gap={0}>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Document.pdf</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Last edited 2 min ago</p>
                    </ITFlex>
                    <ITFlex direction="row" gap={2}>
                      <ITButton label="Cancel" variant="outlined" color="gray" size="small" />
                      <ITButton label="Save" variant="filled" color="primary" size="small" />
                    </ITFlex>
                  </ITFlex>
                </div>
              </PatternCard>

              {/* Grow items */}
              <PatternCard title="Grow layout" desc="flex-grow distributes remaining space" code={FLEX_PATTERN_CODES.growItems}>
                <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <ITFlex direction="row" gap={3}>
                    <ITFlex grow direction="column" gap={1} className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">Sidebar</p>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Navigation</p>
                    </ITFlex>
                    <ITFlex grow direction="column" gap={1} className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-4">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">Content</p>
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Main area</p>
                    </ITFlex>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Fixed</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">100px</p>
                    </div>
                  </ITFlex>
                </div>
              </PatternCard>

              {/* Centered card */}
              <PatternCard title="Centered hero" desc="justify-center + align-center" code={FLEX_PATTERN_CODES.centeredCard}>
                <div className="rounded-xl border border-primary-100 dark:border-primary-800/40 overflow-x-auto bg-blue-50 dark:bg-blue-950/30">
                  <ITFlex direction="column" justify="center" align="center" gap={3} className="min-h-56 text-center px-6 py-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary-500, #3b82f6) 0%, var(--color-primary-700, #1d4ed8) 100%)',
                        boxShadow: '0 8px 24px 0 rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      ✦
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-100">All set!</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your workspace is ready to use.</p>
                    </div>
                    <ITButton label="Get started" variant="filled" color="primary" size="small" />
                  </ITFlex>
                </div>
              </PatternCard>

              {/* Form row with wrap */}
              <PatternCard title="Responsive form" desc="wrap + grow + basis" code={FLEX_PATTERN_CODES.formRowWrap}>
                <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <ITFlex direction="row" wrap="wrap" gap={3}>
                    {[
                      { label: "First name", value: "John" },
                      { label: "Last name", value: "Doe" },
                      { label: "Email", value: "john@axzy.dev" },
                    ].map((field) => (
                      <ITFlex key={field.label} grow basis={56} direction="column" gap={1}>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{field.label}</label>
                        <div className="h-9 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 flex items-center text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                          {field.value}
                        </div>
                      </ITFlex>
                    ))}
                  </ITFlex>
                </div>
              </PatternCard>

              {/* Stretch column */}
              <PatternCard title="Full-height layout" desc="column + stretch + grow" code={FLEX_PATTERN_CODES.stretchColumn}>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden h-72 bg-slate-50 dark:bg-slate-800/80">
                  <ITFlex direction="column" align="stretch" gap={0} className="h-full">
                    <div className="h-12 px-4 flex items-center justify-between bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">App Header</p>
                      <span className="text-[10px] text-slate-500">v1.0</span>
                    </div>
                    <ITFlex grow align="center" justify="center" direction="column" gap={2} className="bg-white dark:bg-slate-900/40">
                      <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Main content</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">flex-grow fills remaining space</p>
                    </ITFlex>
                    <div className="h-12 px-4 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-[10px] text-slate-500">App Footer</p>
                    </div>
                  </ITFlex>
                </div>
              </PatternCard>
            </div>
          </GallerySection>
        </ITStack>
      }
    />
  );
};

// ─────────────────────────────────────────
// 3. ITGrid Showcase
// ─────────────────────────────────────────

const GRID_PATTERN_CODES = {
  appDashboard: `// App shell: sidebar + main area, stacks on mobile
<ITGrid container spacing={4}>
  <ITGrid item xs={12} md={3}>
    <NavSidebar />
  </ITGrid>
  <ITGrid item xs={12} md={9}>
    <MainPanel />
  </ITGrid>
</ITGrid>`,
  userProfile: `// Profile: avatar card + content area
<ITGrid container spacing={4}>
  <ITGrid item xs={12} md={4}>
    <ProfileCard user={user} />
  </ITGrid>
  <ITGrid item xs={12} md={8}>
    <ActivityFeed activities={user.activity} />
  </ITGrid>
</ITGrid>`,
  settingsPage: `// Settings: section nav + form panels
<ITGrid container spacing={4}>
  <ITGrid item xs={12} md={3}>
    <SettingsNav />
  </ITGrid>
  <ITGrid item xs={12} md={9}>
    <SettingsPanel section={current} />
  </ITGrid>
</ITGrid>`,
  articleLayout: `// Article + sidebar with metadata
<ITGrid container spacing={6}>
  <ITGrid item xs={12} md={8}>
    <Article />
  </ITGrid>
  <ITGrid item xs={12} md={4}>
    <ArticleMeta author={author} tags={tags} />
  </ITGrid>
</ITGrid>`,
  pricingTiers: `// 3-column pricing comparison
<ITGrid container spacing={4}>
  {plans.map((plan) => (
    <ITGrid key={plan.id} item xs={12} md={4}>
      <PricingCard plan={plan} highlighted={plan.featured} />
    </ITGrid>
  ))}
</ITGrid>`,
};

export const GridShowcase = () => {
  const [spacing, setSpacing] = useState(3);
  const [columns, setColumns] = useState(3);

  const buildCode = () => {
    const md = Math.floor(12 / columns);
    return `<ITGrid container spacing={${spacing}}>\n  {items.map((item) => (\n    <ITGrid item xs={12} md={${md}}>\n      <Card>{item.name}</Card>\n    </ITGrid>\n  ))}\n</ITGrid>`;
  };

  const items = Array.from({ length: columns * 2 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  return (
    <ShowcaseLayout
      title="ITGrid"
      description="Sistema de grid responsivo de 12 columnas. Ideal para dashboards, galerías, y layouts de página completos."
      code={buildCode()}
      demo={
        <div className="w-full max-w-xl flex flex-col">
          <div className="min-h-[360px]">
            <ITGrid container spacing={spacing}>
              {items.map((item) => (
                <ITGrid key={item.id} item xs={12} md={Math.floor(12 / columns)}>
                  <div
                    className="h-16 rounded-lg flex items-center justify-center text-white text-sm font-semibold font-mono"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary-500, #3b82f6) 0%, var(--color-primary-700, #1d4ed8) 100%)',
                      boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {item.name}
                  </div>
                </ITGrid>
              ))}
            </ITGrid>
          </div>

          {/* Fixed footer with active-property badges */}
          <div className="sticky bottom-0 mt-4 -mx-6 -mb-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mr-1">Active:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">cols:{columns}</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">gap:{spacing}</span>
            <span className="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">md:{Math.floor(12 / columns)}</span>
          </div>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <ITSlider label="Columns" value={columns} onChange={setColumns} min={1} max={6} />
          <ITSlider label="Spacing (0.25rem units)" value={spacing} onChange={setSpacing} min={0} max={8} />
        </ITStack>
      }
      gallery={
        <ITStack spacing={8}>
          <GallerySection
            title="Real UI cases"
            subtitle="Production-ready layouts built with ITGrid"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* 1. App dashboard — sidebar (3) + main (9) */}
              <PatternCard
                title="App dashboard"
                desc="md=3 + md=9 → stacks on mobile"
                code={GRID_PATTERN_CODES.appDashboard}
              >
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                  <ITGrid container spacing={0}>
                    <ITGrid item xs={12} md={3}>
                      <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-5 border-r border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)' }}
                          >
                            A
                          </div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Acme</p>
                        </div>
                        <div className="space-y-1">
                          {[
                            { label: "Overview", active: true },
                            { label: "Projects", active: false },
                            { label: "Team", active: false },
                            { label: "Reports", active: false },
                            { label: "Settings", active: false },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className={`text-xs font-medium px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                                item.active
                                  ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                              }`}
                            >
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ITGrid>
                    <ITGrid item xs={12} md={9}>
                      <div className="p-4">
                        <ITFlex direction="row" justify="between" align="center" className="mb-4">
                          <div>
                            <p className="text-base font-bold text-slate-800 dark:text-slate-100">Overview</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Last 30 days</p>
                          </div>
                          <ITButton label="+ New project" variant="filled" color="primary" size="small" />
                        </ITFlex>
                        <ITGrid container spacing={2}>
                          {[
                            { label: "Revenue", value: "$48.2k", tone: "emerald" },
                            { label: "Active users", value: "2,847", tone: "primary" },
                            { label: "Pending tasks", value: "12", tone: "amber" },
                          ].map((s) => (
                            <ITGrid key={s.label} item xs={12} sm={4}>
                              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-slate-50/50 dark:bg-slate-800/30">
                                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-100 font-mono mt-0.5">{s.value}</p>
                              </div>
                            </ITGrid>
                          ))}
                        </ITGrid>
                      </div>
                    </ITGrid>
                  </ITGrid>
                </div>
              </PatternCard>

              {/* 2. User profile — avatar card (4) + activity (8) */}
              <PatternCard
                title="User profile"
                desc="md=4 + md=8 with nested activity"
                code={GRID_PATTERN_CODES.userProfile}
              >
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                  <ITGrid container spacing={0}>
                    <ITGrid item xs={12} md={4}>
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 p-5 border-r border-slate-200 dark:border-slate-700 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)',
                            boxShadow: '0 8px 24px 0 rgba(59, 130, 246, 0.35)',
                          }}
                        >
                          SC
                        </div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Sofía Castillo</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Product Designer</p>
                        <div className="flex justify-center gap-2 mt-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-600 text-white">Design</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Figma</span>
                        </div>
                        <ITButton label="Follow" variant="outlined" color="primary" size="small" className="mt-4 w-full" />
                      </div>
                    </ITGrid>
                    <ITGrid item xs={12} md={8}>
                      <div className="p-5">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">Recent activity</p>
                        <ITStack spacing={3} divider={<div className="h-px bg-slate-100 dark:bg-slate-800" />}>
                          {[
                            { action: "Shipped", target: "Onboarding redesign", time: "2h ago", color: "emerald" },
                            { action: "Reviewed PR", target: "#482 — Token system refactor", time: "Yesterday", color: "primary" },
                            { action: "Started", target: "Q1 design system audit", time: "3 days ago", color: "info" },
                          ].map((a) => (
                            <div key={a.target} className="flex items-start gap-3 py-2">
                              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                a.color === "emerald" ? "bg-emerald-500" :
                                a.color === "info" ? "bg-sky-500" :
                                "bg-primary-500"
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-700 dark:text-slate-200">
                                  <span className="font-semibold">{a.action}</span> <span className="text-slate-500 dark:text-slate-400">{a.target}</span>
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{a.time}</p>
                              </div>
                            </div>
                          ))}
                        </ITStack>
                      </div>
                    </ITGrid>
                  </ITGrid>
                </div>
              </PatternCard>

              {/* 3. Settings page — section nav (3) + form panels (9) */}
              <PatternCard
                title="Settings"
                desc="md=3 nav + md=9 form panels"
                code={GRID_PATTERN_CODES.settingsPage}
              >
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                  <ITGrid container spacing={0}>
                    <ITGrid item xs={12} md={3}>
                      <div className="px-4 py-5 border-r border-slate-200 dark:border-slate-700 space-y-1">
                        {[
                          { label: "Profile", active: false },
                          { label: "Account", active: true },
                          { label: "Notifications", active: false },
                          { label: "Billing", active: false },
                          { label: "API keys", active: false },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className={`text-xs font-medium px-2.5 py-1.5 rounded-lg cursor-pointer ${
                              s.active
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            }`}
                          >
                            {s.label}
                          </div>
                        ))}
                      </div>
                    </ITGrid>
                    <ITGrid item xs={12} md={9}>
                      <div className="p-5 space-y-4">
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Account</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Manage how your account appears and behaves.</p>
                        </div>
                        <ITGrid container spacing={3}>
                          <ITGrid item xs={12} md={6}>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Username</label>
                            <div className="h-9 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 flex items-center text-sm text-slate-700 dark:text-slate-200">@sofia.castillo</div>
                          </ITGrid>
                          <ITGrid item xs={12} md={6}>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Email</label>
                            <div className="h-9 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 flex items-center text-sm text-slate-700 dark:text-slate-200">sofia@axzy.dev</div>
                          </ITGrid>
                          <ITGrid item xs={12}>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">Language</label>
                            <div className="h-9 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 flex items-center text-sm text-slate-700 dark:text-slate-200">English (US)</div>
                          </ITGrid>
                        </ITGrid>
                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <ITButton label="Cancel" variant="outlined" color="gray" size="small" />
                          <ITButton label="Save changes" variant="filled" color="primary" size="small" />
                        </div>
                      </div>
                    </ITGrid>
                  </ITGrid>
                </div>
              </PatternCard>

              {/* 4. Article layout — body (8) + meta (4) */}
              <PatternCard
                title="Article layout"
                desc="md=8 body + md=4 sticky meta"
                code={GRID_PATTERN_CODES.articleLayout}
              >
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                  <ITGrid container spacing={0}>
                    <ITGrid item xs={12} md={8} className="border-r border-slate-200 dark:border-slate-700">
                      <article className="p-5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary-600 dark:text-primary-400">Engineering</span>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1.5 leading-tight">
                          How we cut bundle size by 38% with route-level splitting
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span>8 min read</span>
                          <span>·</span>
                          <span>Nov 14, 2025</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                          A few weeks ago we shipped lazy loading for all non-critical routes. The result was a 38% drop in our initial JS payload and a measurable improvement in time-to-interactive…
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                          The strategy was simple: defer everything the user doesn't see on first paint, and split the rest by route. Below is what we measured.
                        </p>
                      </article>
                    </ITGrid>
                    <ITGrid item xs={12} md={4}>
                      <div className="p-5 space-y-4 bg-slate-50/50 dark:bg-slate-800/30">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">Written by</p>
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-300 text-xs font-bold">EM</div>
                            <div>
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Elena Martínez</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">Staff Engineer</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">Tags</p>
                          <div className="flex flex-wrap gap-1">
                            {["Performance", "Webpack", "React"].map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">{t}</span>
                            ))}
                          </div>
                        </div>
                        <ITButton label="Share article" variant="outlined" color="primary" size="small" className="w-full" />
                      </div>
                    </ITGrid>
                  </ITGrid>
                </div>
              </PatternCard>

              {/* 5. Pricing tiers — 3 equal columns */}
              <PatternCard
                title="Pricing comparison"
                desc="md=4 × 3 → comparison table"
                code={GRID_PATTERN_CODES.pricingTiers}
              >
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 p-4">
                  <ITGrid container spacing={3}>
                    {[
                      {
                        name: "Starter",
                        price: "$0",
                        desc: "For personal projects",
                        features: ["1 project", "Community support", "Basic analytics"],
                        cta: "Get started",
                        featured: false,
                      },
                      {
                        name: "Pro",
                        price: "$29",
                        desc: "For growing teams",
                        features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"],
                        cta: "Start trial",
                        featured: true,
                      },
                      {
                        name: "Enterprise",
                        price: "Custom",
                        desc: "For large organizations",
                        features: ["SSO + SAML", "Dedicated CSM", "99.99% SLA", "Audit logs"],
                        cta: "Contact sales",
                        featured: false,
                      },
                    ].map((plan) => (
                      <ITGrid key={plan.name} item xs={12} md={4}>
                        <div className={`h-full rounded-xl p-4 border ${
                          plan.featured
                            ? "border-primary-400 dark:border-primary-600 bg-primary-50/50 dark:bg-primary-900/20"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        }`}>
                          {plan.featured && (
                            <span className="inline-block px-2 py-0.5 rounded-full bg-primary-600 text-white text-[9px] font-bold uppercase tracking-wider mb-2">
                              Most popular
                            </span>
                          )}
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{plan.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{plan.desc}</p>
                          <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-mono mt-3">
                            {plan.price}
                            {plan.price !== "Custom" && <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> /mo</span>}
                          </p>
                          <ul className="mt-3 space-y-1.5">
                            {plan.features.map((f) => (
                              <li key={f} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                                <span className={`mt-0.5 shrink-0 ${plan.featured ? "text-primary-600 dark:text-primary-400" : "text-emerald-500"}`}>✓</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <ITButton
                            label={plan.cta}
                            variant={plan.featured ? "filled" : "outlined"}
                            color={plan.featured ? "primary" : "gray"}
                            size="small"
                            className="w-full mt-4"
                          />
                        </div>
                      </ITGrid>
                    ))}
                  </ITGrid>
                </div>
              </PatternCard>
            </div>
          </GallerySection>
        </ITStack>
      }
    />
  );
};

// ─────────────────────────────────────────
// 4. Composite Screen Examples
// ─────────────────────────────────────────
const SectionTitle = ({ children }: { children: string }) => (
  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{children}</h3>
);

const SectionDesc = ({ children }: { children: string }) => (
  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{children}</p>
);

export const ScreenDashboardShowcase = () => {
  const code = `// Dashboard completo en 30 líneas
<ITStack spacing={6}>
  {/* Header row */}
  <ITFlex justify="between" align="center">
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-500">Resumen de actividad</p>
    </div>
    <ITButton label="Exportar" variant="outlined" />
  </ITFlex>

  {/* Stats cards grid */}
  <ITGrid container spacing={4}>
    {stats.map(stat => (
      <ITGrid item xs={12} sm={6} lg={3} key={stat.title}>
        <ITCard>
          <StatCard {...stat} />
        </ITCard>
      </ITGrid>
    ))}
  </ITGrid>

  {/* Charts section */}
  <ITGrid container spacing={4}>
    <ITGrid item xs={12} lg={8}>
      <ITCard title="Gráfico Principal">...</ITCard>
    </ITGrid>
    <ITGrid item xs={12} lg={4}>
      <ITCard title="Actividad Reciente">
        <ITStack spacing={3}>
          {items.map(item => <ActivityRow key={item.id} {...item} />)}
        </ITStack>
      </ITCard>
    </ITGrid>
  </ITGrid>
</ITStack>`;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Pantallas Compuestas</h1>
        <p className="text-slate-500 mt-1.5 text-sm md:text-base">
          Ejemplos reales combinando ITStack + ITFlex + ITGrid para construir pantallas completas en minutos.
        </p>
      </div>

      {/* Dashboard Example */}
      <ITCard title="Dashboard de Métricas" className="overflow-hidden">
        <ITStack spacing={6}>
          <ITFlex justify="between" align="center">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
              <p className="text-xs text-slate-400">Resumen de actividad del sistema</p>
            </div>
            <ITButton label="Exportar" variant="outlined" size="small" />
          </ITFlex>

          <ITGrid container spacing={3}>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Usuarios Activos" value="1,245" trend="+12%" trendDirection="up" />
            </ITGrid>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Ventas Hoy" value="$4,320" trend="+5.4%" trendDirection="up" color="bg-blue-50 dark:bg-blue-950/20" />
            </ITGrid>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Órdenes" value="89" trend="-2.1%" trendDirection="down" color="bg-amber-50 dark:bg-amber-950/20" />
            </ITGrid>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Tickets Abiertos" value="12" trend="-8%" trendDirection="down" color="bg-rose-50 dark:bg-rose-950/20" />
            </ITGrid>
          </ITGrid>

          <ITGrid container spacing={3}>
            <ITGrid item xs={12} lg={8}>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                <ITFlex justify="between" align="center" className="mb-4">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Gráfico de Ventas</span>
                  <span className="text-xs text-slate-400">Últimos 30 días</span>
                </ITFlex>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary-500/60 dark:bg-primary-400/40 rounded-t-md hover:bg-primary-500 transition-all" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </ITGrid>
            <ITGrid item xs={12} lg={4}>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800 h-full">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 block">Actividad Reciente</span>
                <ITStack spacing={3}>
                  {[
                    { user: "Ana López", action: "creó un reporte" },
                    { user: "Carlos Ruiz", action: "aprobó la orden #1234" },
                    { user: "María García", action: "actualizó el perfil" },
                  ].map((item, i) => (
                    <ITFlex key={i} gap={3} align="center">
                      <ITAvatar initials={item.user.split(" ").map(w => w[0]).join("")} size="sm" color="bg-primary-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{item.user}</p>
                        <p className="text-[10px] text-slate-400 truncate">{item.action}</p>
                      </div>
                    </ITFlex>
                  ))}
                </ITStack>
              </div>
            </ITGrid>
          </ITGrid>
        </ITStack>
      </ITCard>

      <CodeViewer code={code} />
    </div>
  );
};

export const ScreenFormShowcase = () => {
  const formCode = `// Formulario responsivo en 20 líneas
<ITStack spacing={6}>
  <div>
    <h1 className="text-2xl font-bold">Nuevo Usuario</h1>
    <p className="text-sm text-slate-500">Completa los campos</p>
  </div>

  <ITGrid container spacing={4}>
    <ITGrid item xs={12} md={6}>
      <Input label="Nombre" />
    </ITGrid>
    <ITGrid item xs={12} md={6}>
      <Input label="Apellido" />
    </ITGrid>
    <ITGrid item xs={12}>
      <Input label="Email" />
    </ITGrid>
    <ITGrid item xs={12} md={6}>
      <Select label="Rol" />
    </ITGrid>
    <ITGrid item xs={12} md={6}>
      <Select label="Departamento" />
    </ITGrid>
    <ITGrid item xs={12}>
      <ITFlex justify="end" gap={3}>
        <Button variant="outlined">Cancelar</Button>
        <Button>Guardar</Button>
      </ITFlex>
    </ITGrid>
  </ITGrid>
</ITStack>`;

  return (
    <ITCard title="Formulario Responsivo">
      <ITStack spacing={6}>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Nuevo Usuario</h2>
          <p className="text-xs text-slate-400">Completa los campos para registrar un nuevo usuario</p>
        </div>

        <ITGrid container spacing={4}>
          <ITGrid item xs={12} md={6}>
            <ITInput
              name="nombre"
              label="Nombre"
              placeholder="Ej: Juan"
              onChange={() => {}}
            />
          </ITGrid>
          <ITGrid item xs={12} md={6}>
            <ITInput
              name="apellido"
              label="Apellido"
              placeholder="Ej: Pérez"
              onChange={() => {}}
            />
          </ITGrid>
          <ITGrid item xs={12}>
            <ITInput
              name="email"
              label="Email"
              placeholder="ej: usuario@correo.com"
              onChange={() => {}}
            />
          </ITGrid>
          <ITGrid item xs={12} md={6}>
            <ITSelect
              name="rol"
              label="Rol"
              options={[
                { label: "Seleccionar...", value: "" },
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
                { label: "Usuario", value: "usuario" },
              ]}
            />
          </ITGrid>
          <ITGrid item xs={12} md={6}>
            <ITSelect
              name="departamento"
              label="Departamento"
              options={[
                { label: "Seleccionar...", value: "" },
                { label: "Ingeniería", value: "ingenieria" },
                { label: "Diseño", value: "diseno" },
                { label: "Ventas", value: "ventas" },
              ]}
            />
          </ITGrid>
          <ITGrid item xs={12}>
            <ITFlex justify="end" gap={3}>
              <ITButton label="Cancelar" variant="outlined" size="small" />
              <ITButton label="Guardar" size="small" />
            </ITFlex>
          </ITGrid>
        </ITGrid>
      </ITStack>
      <div className="mt-6">
        <CodeViewer code={formCode} />
      </div>
    </ITCard>
  );
};

