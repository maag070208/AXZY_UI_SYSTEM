import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITStack from "./stack";

const meta: Meta<typeof ITStack> = {
  title: "Layout/ITStack",
  component: ITStack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Flex direction. Default: column.",
    },
    spacing: {
      control: { type: "range", min: 0, max: 16, step: 1 },
      description: "Gap between children in 0.25rem units. Default: 0.",
    },
    alignItems: {
      control: "select",
      options: [undefined, "start", "end", "center", "stretch", "baseline"],
      description: "Cross-axis alignment.",
    },
    justifyContent: {
      control: "select",
      options: [undefined, "start", "end", "center", "between", "around", "evenly"],
      description: "Main-axis justification.",
    },
    flexWrap: {
      control: "select",
      options: [undefined, "nowrap", "wrap", "wrap-reverse"],
      description: "Flex wrap behavior.",
    },
    as: {
      control: "select",
      options: ["div", "section", "nav", "ul", "ol", "main", "article", "header", "footer", "aside", "form"],
      description: "HTML element to render.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITStack>;

const Box = ({ children, className = "" }: { children: string; className?: string }) => (
  <div className={`bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium ${className}`}>
    {children}
  </div>
);

// ── Basic direction examples ──

export const Vertical: Story = {
  args: { direction: "column", spacing: 2 },
  render: (args) => (
    <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
  ),
};

export const Horizontal: Story = {
  args: { direction: "row", spacing: 2 },
  render: (args) => (
    <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
  ),
};

// ── All direction variants ──

export const AllDirections: Story = {
  render: () => (
    <ITStack spacing={6}>
      {(["column", "row", "column-reverse", "row-reverse"] as const).map((dir) => (
        <div key={dir}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{dir}</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-dashed border-slate-200 dark:border-slate-700">
            <ITStack direction={dir} spacing={2}>
              <Box>First</Box>
              <Box>Second</Box>
              <Box>Third</Box>
            </ITStack>
          </div>
        </div>
      ))}
    </ITStack>
  ),
};

// ── Spacing variants ──

export const SpacingVariants: Story = {
  render: () => (
    <ITStack spacing={4}>
      {[0, 1, 2, 4, 6, 8, 10, 12].map((gap) => (
        <div key={gap}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">spacing={gap} — {gap * 0.25}rem</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <ITStack direction="row" spacing={gap}>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 3</Box>
            </ITStack>
          </div>
        </div>
      ))}
    </ITStack>
  ),
};

// ── Justify Content showcase ──

export const JustifyContent: Story = {
  render: () => (
    <ITStack spacing={2}>
      {(["start", "center", "end", "between", "around", "evenly"] as const).map((j) => (
        <div key={j}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">{j}</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <ITStack direction="row" spacing={2} justifyContent={j} className="w-full">
              <div className="w-10 h-10 rounded-lg bg-primary-400/60" />
              <div className="w-10 h-10 rounded-lg bg-cyan-400/60" />
              <div className="w-10 h-10 rounded-lg bg-violet-400/60" />
            </ITStack>
          </div>
        </div>
      ))}
    </ITStack>
  ),
};

// ── Align Items showcase ──

export const AlignItems: Story = {
  render: () => (
    <ITStack spacing={2}>
      {(["start", "center", "end", "stretch", "baseline"] as const).map((a) => (
        <div key={a}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">{a}</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <ITStack direction="row" spacing={2} alignItems={a} className="h-20 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
              <div className="w-10 h-6 rounded bg-primary-400/60" />
              <div className="w-10 h-12 rounded bg-cyan-400/60" />
              <div className="w-10 h-8 rounded bg-violet-400/60" />
            </ITStack>
          </div>
        </div>
      ))}
    </ITStack>
  ),
};

// ── With interactive controls ──

export const Playground: Story = {
  render: function PlaygroundStory() {
    const [direction, setDirection] = useState<"row" | "column">("column");
    const [spacing, setSpacing] = useState(3);
    const [showDivider, setShowDivider] = useState(false);

    return (
      <ITStack spacing={6}>
        <ITStack direction="row" spacing={3} flexWrap="wrap">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Direction:</span>
            <select value={direction} onChange={(e) => setDirection(e.target.value as any)} className="rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800">
              <option value="column">Column</option>
              <option value="row">Row</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Spacing:</span>
            <input type="range" min={0} max={12} value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} className="w-24" />
            <span className="text-xs font-mono">{spacing}</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showDivider} onChange={(e) => setShowDivider(e.target.checked)} />
            <span className="text-slate-500">Divider</span>
          </label>
        </ITStack>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-dashed border-slate-200 dark:border-slate-700">
          <ITStack
            direction={direction}
            spacing={spacing}
            divider={showDivider ? <div className={`${direction === "row" ? "w-px h-8" : "h-px w-full"} bg-slate-300 dark:bg-slate-600 self-center`} /> : undefined}
          >
            <Box>Item 1</Box>
            <Box>Item 2</Box>
            <Box>Item 3</Box>
          </ITStack>
        </div>
        <pre className="text-xs bg-slate-950 text-slate-200 rounded-lg p-3 overflow-x-auto">
{`<ITStack direction="${direction}" spacing={${spacing}}${showDivider ? `\n  divider={${direction === "row" ? '<div className="w-px h-8" />' : '<div className="h-px w-full" />'}}` : ""}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</ITStack>`}
        </pre>
      </ITStack>
    );
  },
};

// ── Real-world examples ──

export const ToolbarExample: Story = {
  render: () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-lg">
      <ITStack direction="row" spacing={2} justifyContent="between" alignItems="center">
        <ITStack direction="row" spacing={1} alignItems="center">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Document</p>
          <span className="text-xs text-slate-400">• Saved</span>
        </ITStack>
        <ITStack direction="row" spacing={1}>
          <div className="px-3 py-1.5 rounded-md bg-primary-500 text-white text-xs font-medium cursor-pointer">Save</div>
          <div className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs cursor-pointer">Cancel</div>
        </ITStack>
      </ITStack>
    </div>
  ),
};

export const FormRowExample: Story = {
  render: () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-xl">
      <ITStack direction="row" spacing={3} flexWrap="wrap">
        {["First Name", "Last Name", "Email"].map((label) => (
          <div key={label} className="flex-1 min-w-[140px]">
            <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
            <input className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 text-sm" placeholder={label} readOnly />
          </div>
        ))}
      </ITStack>
    </div>
  ),
};

export const TagCloudExample: Story = {
  render: () => {
    const tags = ["React", "TypeScript", "Tailwind CSS", "Vite", "Storybook", "CSS Variables", "Flexbox", "Accessibility", "Dark Mode", "Theming", "Responsive"];
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-lg">
        <ITStack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
              {tag}
            </span>
          ))}
        </ITStack>
      </div>
    );
  },
};

export const SectionWithDividers: Story = {
  render: () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm">
      <ITStack spacing={0} divider={<div className="h-px bg-slate-100 dark:bg-slate-700" />}>
        {["Profile Settings", "Security & Privacy", "Notifications", "Billing & Plans", "API Keys"].map((item, i) => (
          <div key={item} className="flex items-center justify-between py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
            <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
            <span className="text-slate-300 dark:text-slate-600">→</span>
          </div>
        ))}
      </ITStack>
    </div>
  ),
};

export const CenteredHero: Story = {
  render: () => (
    <ITStack spacing={4} alignItems="center" justifyContent="center" className="h-64 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Select a workspace to continue</p>
      <div className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium cursor-pointer">Get Started</div>
    </ITStack>
  ),
};
