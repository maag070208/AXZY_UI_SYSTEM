import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaBoxOpen,
  FaChartLine,
  FaFileAlt,
  FaBell,
  FaCode,
  FaCheck,
  FaPlayCircle,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import {
  ITCard,
  ITButton,
  ITInput,
  ITAvatar,
  ITFlex,
  ITSlideToggle,
  ITText,
  ITNavbar,
  ITLayout,
  ITStack,
  ITStatCard,
  ITGrid,
  ITPageHeader,
  ITBadget,
  ITDivider,
  ITProgress,
  ITSelect,
} from "../index";
import { ShowcaseLayout, CodeViewer } from "./ShowcaseLayout";

// ─────────────────────────────────────────
// 1. ITCard Showcase
// ─────────────────────────────────────────

const CARD_PATTERN_CODES = {
  course: `<ITCard
  title="Advanced TypeScript Patterns"
  image="/courses/typescript.jpg"
  onClick={() => resume(course.id)}
  actions={
    <ITButton label="Continue lesson 8" variant="filled" color="primary" size="small" />
  }
>
  <ITFlex align="center" gap={3} className="mb-3">
    <ITText muted className="text-xs">12 lessons</ITText>
    <ITDivider orientation="vertical" className="h-3" />
    <ITText muted className="text-xs font-mono">4h 32m</ITText>
    <ITDivider orientation="vertical" className="h-3" />
    <ITBadget label="★ 4.9" color="warning" size="small" variant="outlined" />
  </ITFlex>
  <ITProgress value={66} color="primary" size="md" />
  <ITFlex justify="between" align="center" className="mt-2">
    <ITText muted className="text-xs">66% complete</ITText>
    <ITText muted className="text-xs">Lesson 8 of 12</ITText>
  </ITFlex>
</ITCard>`,
  pricing: `<div className="relative">
  <ITBadget
    label="Most popular"
    color="primary"
    size="small"
    className="absolute -top-2 left-4 z-10 shadow-md"
  />
  <ITCard
    title="Scale"
    className="ring-2 ring-primary-500/30"
    actions={
      <ITButton label="Start 14-day free trial"
        variant="filled" color="primary" size="medium" className="w-full" />
    }
  >
    <ITFlex align="baseline" gap={1}>
      <ITText as="span" className="text-4xl font-extrabold font-mono">$79</ITText>
      <ITText muted as="span" className="text-xs">/ month</ITText>
    </ITFlex>
    <ITText muted as="span" className="text-xs mt-1 block">Billed annually · Up to 25 seats</ITText>
    <ITDivider className="my-4" />
    <ITStack spacing={2}>
      {FEATURES.map(f => (
        <ITFlex align="center" gap={2}>
          <FaCheck className="text-primary-500 shrink-0" />
          <ITText as="span" className="text-sm text-slate-700">{f}</ITText>
        </ITFlex>
      ))}
    </ITStack>
  </ITCard>
</div>`,
  activity: `<ITCard
  actions={
    <ITFlex gap={2}>
      <ITButton label="Reply" variant="text" color="primary" size="small" />
      <ITButton label="Mute" variant="text" color="gray" size="small" />
    </ITFlex>
  }
>
  <ITFlex align="start" gap={3}>
    <ITAvatar initials="DK" size="md" />
    <div className="min-w-0 flex-1">
      <ITText className="text-sm leading-relaxed">
        <ITText as="span" className="font-semibold">Daniela Klein</ITText>
        {' '}deployed{' '}
        <ITBadget label="v2.4.1" color="primary" size="small" variant="outlined" />
        {' '}to <ITText as="span" className="font-semibold">production</ITText>.
      </ITText>
      <ITText muted className="text-xs mt-1.5 block">3 minutes ago · api-service</ITText>
      <ITFlex align="center" gap={2} className="mt-3">
        <ITFlex align="center" gap={1}>
          <FaPlayCircle size={10} />
          <ITText muted as="span" className="text-xs">4 reactions</ITText>
        </ITFlex>
        <ITDivider orientation="vertical" className="h-3" />
        <ITFlex align="center" gap={1}>
          <FaFileAlt size={10} />
          <ITText muted as="span" className="text-xs">2 comments</ITText>
        </ITFlex>
      </ITFlex>
    </div>
  </ITFlex>
</ITCard>`,
  teamMember: `<ITCard
  title="Mariana Reyes"
  image="/team/cover.jpg"
  imageClassName="h-32"
  onClick={() => openProfile(user.id)}
  actions={
    <ITFlex gap={2}>
      <ITButton label="Message" variant="filled" color="primary" size="small" />
      <ITButton label="View profile" variant="outlined" color="gray" size="small" />
    </ITFlex>
  }
>
  <ITFlex align="center" gap={3} className="mb-3">
    <ITAvatar initials="MR" size="md" />
    <div>
      <ITText as="span" className="text-sm font-semibold block">Engineering Lead</ITText>
      <ITText muted as="span" className="text-xs">Madrid · 142 commits / month</ITText>
    </div>
  </ITFlex>
  <ITText className="text-sm leading-relaxed">
    Building resilient distributed systems and mentoring the platform team across 4 time zones.
  </ITText>
  <ITFlex gap={1} wrap="wrap" className="mt-3">
    {['TypeScript', 'Distributed systems', 'Open source'].map(t => (
      <ITBadget key={t} label={t} color="primary" size="small" variant="outlined" />
    ))}
  </ITFlex>
</ITCard>`,
  release: `<ITCard
  title="Midnight Frequencies"
  image="/albums/midnight.jpg"
  imageClassName="h-40"
  onClick={() => play(album.id)}
  actions={
    <ITButton label="Play album" variant="filled" color="primary" size="small" />
  }
>
  <ITFlex justify="between" gap={3}>
    <div className="min-w-0">
      <ITText as="span" className="text-sm font-semibold block">Aurelia Sound</ITText>
      <ITText muted as="span" className="text-xs">Released Mar 2026</ITText>
    </div>
    <ITStack spacing={0} align="end">
      <ITText as="span" className="text-xs font-mono font-semibold">9 tracks</ITText>
      <ITText muted as="span" className="text-[10px] font-mono">38 min</ITText>
    </ITStack>
  </ITFlex>
  <ITFlex align="center" gap={1} className="mt-3">
    {Array.from({length: 5}).map((_, i) => (
      <FaPlay key={i} size={7}
        className={i < 4 ? 'text-primary-500' : 'text-slate-300'} />
    ))}
    <ITText muted as="span" className="text-[10px] font-mono ml-1.5">4.7 · 12.4k plays</ITText>
  </ITFlex>
</ITCard>`,
};

const TEXT_PATTERN_CODES = {
  articleHeader: `<ITFlex align="center" gap={2} className="mb-3">
  <ITBadget label="ENGINEERING" color="primary" size="small" variant="outlined" />
  <ITText muted as="span" className="text-[11px] uppercase tracking-wider font-semibold">
    Featured
  </ITText>
</ITFlex>
<ITText as="h2" className="text-2xl font-bold leading-tight mb-2 block">
  How we cut bundle size by 38% in two weeks
</ITText>
<ITText as="p" className="text-sm leading-relaxed mb-3 block">
  A pragmatic walkthrough of our lazy-loading rollout…
</ITText>
<ITFlex align="center" gap={3}>
  <ITAvatar initials="MR" size="sm" />
  <ITText as="span" className="text-xs font-semibold">Mariana Reyes</ITText>
  <ITDivider orientation="vertical" className="h-3" />
  <ITText muted as="span" className="text-xs">Nov 14, 2025</ITText>
  <ITDivider orientation="vertical" className="h-3" />
  <ITText muted as="span" className="text-xs font-mono">8 min read</ITText>
</ITFlex>`,
  sectionHeading: `<ITFlex justify="between" align="start" gap={4} className="mb-2">
  <ITText as="h2" className="text-xl font-bold">Recent activity</ITText>
  <ITButton label="View all →" variant="text" color="primary" size="small" />
</ITFlex>
<ITText as="p" muted className="text-sm leading-relaxed">
  Latest commits, deployments and reviews from your team this week.
</ITText>`,
  emptyState: `<ITStack spacing={3} alignItems="center" className="text-center">
  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700">
    <FaBell className="text-white" />
  </div>
  <ITText as="h3" className="text-lg font-bold">You're all caught up</ITText>
  <ITText as="p" className="text-sm">
    No new notifications.
  </ITText>
  <ITText as="p" muted className="text-xs">
    Last checked 2 minutes ago
  </ITText>
</ITStack>`,
  inlineContent: `<ITText as="p" className="text-sm leading-relaxed">
  <ITText as="span" className="font-semibold">Daniela Klein</ITText>
  {' '}pushed commit{' '}
  <ITText as="code" className="px-1.5 py-0.5 rounded bg-slate-100
    text-primary-600 font-mono text-[11px]">a3f9c2e</ITText>
  {' '}to <ITText as="span" className="font-semibold">main</ITText>.
</ITText>`,
  formLabels: `<ITText as="label" className="text-sm font-semibold block mb-1">
  Workspace name <ITText as="span" className="text-danger-500">*</ITText>
</ITText>
<ITInput name="ws_name" placeholder="my-awesome-project" />
<ITText muted as="span" className="text-[11px] mt-1 block">
  Lowercase letters, numbers and hyphens only.
</ITText>`,
};

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

export const CardShowcase = () => {
  const [title, setTitle] = useState("Monthly revenue");
  const [showActions, setShowActions] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [clickable, setClickable] = useState(false);

  const buildCode = () => {
    const lines = [`<ITCard`];
    if (title) lines.push(`  title="${title}"`);
    if (showImage) lines.push(`  image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop"`);
    if (clickable) lines.push(`  onClick={() => openDetails()}`);
    if (showActions) lines.push(`  actions={<ITButton label="View" variant="filled" color="primary" size="small" />}`);
    lines.push(`>`);
    lines.push(`  <p className="text-3xl font-bold">$48,230</p>`);
    lines.push(`  <p className="text-xs text-emerald-600">↑ 12.4% vs last month</p>`);
    lines.push(`</ITCard>`);
    return lines.join("\n");
  };

  return (
    <ShowcaseLayout
      title="ITCard"
      description="Contenedor multipropósito con cabecera opcional, imagen, contenido y pie de acciones. Se vuelve interactivo con `onClick` (efecto hover)."
      code={buildCode()}
      demo={
        <div className="w-full max-w-xl flex flex-col">
          <div className="min-h-[360px]">
            <ITCard
              title={title || undefined}
              image={showImage ? "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop" : undefined}
              actions={showActions ? (
                <ITButton label="View details" variant="filled" color="primary" size="small" />
              ) : undefined}
              onClick={clickable ? () => {} : undefined}
              className="max-w-sm mx-auto"
            >
              <p className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">$48,230</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <span>↑</span> 12.4% vs last month
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Total revenue across all active subscriptions for the current billing cycle.
              </p>
            </ITCard>
          </div>

          {/* Fixed footer with active-property badges */}
          <div className="sticky bottom-0 mt-4 -mx-6 -mb-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mr-1">Active:</span>
            {title && <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">title</span>}
            {showImage && <span className="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">image</span>}
            {showActions && <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">actions</span>}
            {clickable && <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">onClick</span>}
          </div>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <ITInput
            name="title_ctrl"
            label="Title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            onBlur={() => { }}
            placeholder="Leave empty to hide"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Show image</span>
            <ITSlideToggle isOn={showImage} onToggle={setShowImage} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Show actions</span>
            <ITSlideToggle isOn={showActions} onToggle={setShowActions} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interactive (onClick)</span>
            <ITSlideToggle isOn={clickable} onToggle={setClickable} size="sm" />
          </div>
        </ITStack>
      }
      gallery={
        <ITStack spacing={8}>
          <GallerySection
            title="Real UI cases"
            subtitle="Production-ready card layouts built with ITCard"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* 1. Course progress — ITProgress + ITBadget + ITDivider + ITText */}
              <PatternCard
                title="Course progress"
                desc="ITProgress + ITBadget + ITDivider + ITText"
                code={CARD_PATTERN_CODES.course}
              >
                <div className="max-w-sm mx-auto">
                  <ITCard
                    title="Advanced TypeScript Patterns"
                    image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=200&fit=crop"
                    onClick={() => {}}
                    actions={
                      <ITButton label="Continue lesson 8" variant="filled" color="primary" size="small" />
                    }
                  >
                    <ITFlex align="center" gap={3} className="mb-3">
                      <ITText muted className="text-xs">12 lessons</ITText>
                      <ITDivider orientation="vertical" className="h-3" />
                      <ITText muted className="text-xs font-mono">4h 32m</ITText>
                      <ITDivider orientation="vertical" className="h-3" />
                      <ITBadget label="★ 4.9" color="warning" size="small" variant="outlined" />
                    </ITFlex>
                    <ITProgress value={66} color="primary" size="md" />
                    <ITFlex justify="between" align="center" className="mt-2">
                      <ITText muted className="text-xs">66% complete</ITText>
                      <ITText muted className="text-xs">Lesson 8 of 12</ITText>
                    </ITFlex>
                    <ITText className="text-xs mt-2 block">
                      Next up: <ITText as="span" className="font-semibold text-slate-700">Conditional types deep dive</ITText>
                    </ITText>
                  </ITCard>
                </div>
              </PatternCard>

              {/* 2. Featured pricing plan — ITBadget outside + ITFlex + ITStack + ITDivider */}
              <PatternCard
                title="Featured pricing plan"
                desc="ITBadget + ITDivider + ITStack with ITFlex items"
                code={CARD_PATTERN_CODES.pricing}
              >
                <div className="max-w-sm mx-auto pt-3">
                  <div className="relative">
                    <ITBadget
                      label="Most popular"
                      color="primary"
                      size="small"
                      className="absolute -top-2 left-4 z-10 shadow-md"
                    />
                    <ITCard
                      title="Scale"
                      className="ring-2 ring-primary-500/30"
                      actions={
                        <ITButton label="Start 14-day free trial" variant="filled" color="primary" size="medium" className="w-full" />
                      }
                    >
                      <ITFlex align="baseline" gap={1}>
                        <ITText as="span" className="text-4xl font-extrabold font-mono text-slate-800">$79</ITText>
                        <ITText muted as="span" className="text-xs">/ month</ITText>
                      </ITFlex>
                      <ITText muted as="span" className="text-xs mt-1 block">Billed annually · Up to 25 seats</ITText>
                      <ITDivider className="my-4" />
                      <ITStack spacing={2}>
                        {['Unlimited projects', 'Advanced analytics', 'Priority support', 'SSO & audit logs', 'Custom integrations'].map((f) => (
                          <ITFlex key={f} align="center" gap={2}>
                            <FaCheck size={11} className="text-primary-500 shrink-0" />
                            <ITText as="span" className="text-sm text-slate-700">{f}</ITText>
                          </ITFlex>
                        ))}
                      </ITStack>
                    </ITCard>
                  </div>
                </div>
              </PatternCard>

              {/* 3. Activity feed item — ITText + ITBadget for commit hash + ITDivider separators */}
              <PatternCard
                title="Activity feed item"
                desc="ITText + ITBadget (commit hash) + ITDivider separators"
                code={CARD_PATTERN_CODES.activity}
              >
                <div className="max-w-md mx-auto">
                  <ITCard
                    actions={
                      <ITFlex gap={2}>
                        <ITButton label="Reply" variant="text" color="primary" size="small" />
                        <ITButton label="Mute" variant="text" color="gray" size="small" />
                      </ITFlex>
                    }
                  >
                    <ITFlex align="start" gap={3}>
                      <ITAvatar initials="DK" size="md" />
                      <div className="min-w-0 flex-1">
                        <ITText className="text-sm leading-relaxed text-slate-700">
                          <ITText as="span" className="font-semibold">Daniela Klein</ITText>
                          {' '}deployed{' '}
                          <ITBadget label="v2.4.1" color="primary" size="small" variant="outlined" />
                          {' '}to <ITText as="span" className="font-semibold">production</ITText>.
                        </ITText>
                        <ITText muted className="text-xs mt-1.5 block">3 minutes ago · api-service</ITText>
                        <ITFlex align="center" gap={2} className="mt-3">
                          <ITFlex align="center" gap={1}>
                            <FaPlayCircle size={10} className="text-slate-500" />
                            <ITText muted as="span" className="text-xs">4 reactions</ITText>
                          </ITFlex>
                          <ITDivider orientation="vertical" className="h-3" />
                          <ITFlex align="center" gap={1}>
                            <FaFileAlt size={10} className="text-slate-500" />
                            <ITText muted as="span" className="text-xs">2 comments</ITText>
                          </ITFlex>
                        </ITFlex>
                      </div>
                    </ITFlex>
                  </ITCard>
                </div>
              </PatternCard>

              {/* 4. Team member profile — ITFlex + ITBadget for skills + ITText throughout */}
              <PatternCard
                title="Team member profile"
                desc="ITFlex + ITBadget skills + ITText throughout"
                code={CARD_PATTERN_CODES.teamMember}
              >
                <div className="max-w-sm mx-auto">
                  <ITCard
                    title="Mariana Reyes"
                    image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=200&fit=crop"
                    imageClassName="h-32"
                    onClick={() => {}}
                    actions={
                      <ITFlex gap={2}>
                        <ITButton label="Message" variant="filled" color="primary" size="small" />
                        <ITButton label="View profile" variant="outlined" color="gray" size="small" />
                      </ITFlex>
                    }
                  >
                    <ITFlex align="center" gap={3} className="mb-3">
                      <ITAvatar initials="MR" size="md" />
                      <div className="min-w-0">
                        <ITText as="span" className="text-sm font-semibold text-slate-800 block">Engineering Lead</ITText>
                        <ITText muted as="span" className="text-xs">Madrid · 142 commits / month</ITText>
                      </div>
                    </ITFlex>
                    <ITText className="text-sm leading-relaxed text-slate-600">
                      Building resilient distributed systems and mentoring the platform team across 4 time zones.
                    </ITText>
                    <ITFlex gap={1} wrap="wrap" className="mt-3">
                      {['TypeScript', 'Distributed systems', 'Open source'].map((t) => (
                        <ITBadget key={t} label={t} color="primary" size="small" variant="outlined" />
                      ))}
                    </ITFlex>
                  </ITCard>
                </div>
              </PatternCard>
            </div>
          </GallerySection>
        </ITStack>
      }
    />
  );
};

// 2. ITText Showcase
export const TextShowcase = () => {
  const [element, setElement] = useState("p");
  const [size, setSize] = useState("text-base");
  const [bold, setBold] = useState(false);
  const [muted, setMuted] = useState(false);
  const [maxLength, setMaxLength] = useState<string>("0");
  const [lineClamp, setLineClamp] = useState(0);
  const [breakLength, setBreakLength] = useState<string>("0");

  const FULL_SAMPLE =
    "AXZY UI System provee una capa tipográfica consistente sobre React, permitiendo que cada componente respire con la misma jerarquía visual sin importar el tema o el contexto.";

  const maxLengthNum = maxLength === "" ? 0 : Number(maxLength) || 0;
  const breakLengthNum = breakLength === "" ? 0 : Number(breakLength) || 0;

  const buildCode = () => {
    const lines = [`<ITText`];
    if (element !== "p") lines.push(`  as="${element}"`);
    if (muted) lines.push(`  muted`);
    const cls = [
      bold ? "font-bold" : "",
      size,
      lineClamp > 0 ? `line-clamp-${lineClamp}` : "",
      "text-slate-800 dark:text-white",
    ].filter(Boolean).join(" ");
    lines.push(`  className="${cls.trim()}"`);
    if (maxLengthNum > 0) lines.push(`  // truncated at ${maxLengthNum} chars`);
    if (breakLengthNum > 0) lines.push(`  // wrap hint every ${breakLengthNum} chars`);
    lines.push(`>`);
    lines.push(`  ${FULL_SAMPLE.slice(0, 80)}${FULL_SAMPLE.length > 80 ? "…" : ""}`);
    lines.push(`</ITText>`);
    return lines.join("\n");
  };

  const processedText = (() => {
    let t = FULL_SAMPLE;
    if (maxLengthNum > 0 && t.length > maxLengthNum) t = t.slice(0, maxLengthNum).trimEnd() + "…";
    return t;
  })();

  const renderWithBreaks = (text: string) => {
    if (!breakLengthNum || breakLengthNum <= 0) return text;
    const parts: string[] = [];
    for (let i = 0; i < text.length; i += breakLengthNum) {
      parts.push(text.slice(i, i + breakLengthNum));
    }
    return parts.join("\u200B");
  };

  const clampClass = lineClamp > 0 ? `line-clamp-${lineClamp}` : "";

  return (
    <ShowcaseLayout
      title="ITText"
      description="Wrapper tipográfico semántico. Renderiza cualquier elemento HTML, con soporte para truncado por caracteres, clamp de líneas y corte programático."
      code={buildCode()}
      demo={
        <div className="w-full flex flex-col">
          <div className="min-h-[360px] flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 shadow-sm">
              {/* BIG element indicator — makes the `as` change unmissable */}
              <ITStack spacing={2} alignItems="center" className="mb-5 text-center">
                <ITText muted as="span" className="text-[10px] uppercase tracking-wider font-bold">
                  Rendering as
                </ITText>
                <code
                  key={element}
                  className="inline-block px-3 py-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-mono text-sm font-bold shadow-sm"
                >
                  &lt;{element}&gt;
                </code>
              </ITStack>

              <div key={`wrap-${element}`} className="text-center">
                <ITText
                  key={element}
                  as={element as any}
                  muted={muted}
                  className={`${bold ? "font-bold" : ""} ${size} ${clampClass} text-slate-800 dark:text-white block break-words`}
                >
                  {element === "code" ? "const axzy = 'design-system';" : renderWithBreaks(processedText)}
                </ITText>
              </div>
            </div>
          </div>

          {/* Fixed footer with active-property badges */}
          <div className="sticky bottom-0 mt-4 -mx-6 -mb-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mr-1">Active:</span>
            {element !== "p" && <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">as=&quot;{element}&quot;</span>}
            <span className="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{size}</span>
            {bold && <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">font-bold</span>}
            {muted && <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">muted</span>}
            {maxLengthNum > 0 && <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">max {maxLengthNum}c</span>}
            {lineClamp > 0 && <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">clamp-{lineClamp}</span>}
            {breakLengthNum > 0 && <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300">break@{breakLengthNum}c</span>}
          </div>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <ITSelect
            name="elem_ctrl"
            label="Elemento HTML (as)"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            options={[
              { label: "Párrafo (p)", value: "p" },
              { label: "Encabezado H1", value: "h1" },
              { label: "Encabezado H2", value: "h2" },
              { label: "Encabezado H3", value: "h3" },
              { label: "Span inline", value: "span" },
              { label: "Etiqueta (label)", value: "label" },
              { label: "Código (code)", value: "code" },
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label="Tamaño"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            options={[
              { label: "XS (12px)", value: "text-xs" },
              { label: "SM (14px)", value: "text-sm" },
              { label: "Base (16px)", value: "text-base" },
              { label: "LG (18px)", value: "text-lg" },
              { label: "XL (20px)", value: "text-xl" },
              { label: "2XL (24px)", value: "text-2xl" },
            ]}
          />
          <ITSelect
            name="clamp_ctrl"
            label="Número de líneas (lineClamp)"
            value={String(lineClamp)}
            onChange={(e) => setLineClamp(Number(e.target.value))}
            options={[
              { label: "Sin límite", value: "0" },
              { label: "1 línea", value: "1" },
              { label: "2 líneas", value: "2" },
              { label: "3 líneas", value: "3" },
              { label: "4 líneas", value: "4" },
            ]}
          />
          <ITInput
            name="max_ctrl"
            label="Texto máximo (caracteres)"
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            placeholder="0 = sin límite"
          />
          <ITFlex justify="between" align="center">
            <ITText muted as="span" className="text-[10px]">
              Trunca con "…" al superar (0 = desactivado).
            </ITText>
            <ITButton variant="text" color="primary" size="small" onClick={() => setMaxLength("0")}>
              Reset
            </ITButton>
          </ITFlex>
          <ITInput
            name="break_ctrl"
            label="Salto de línea después de (caracteres)"
            type="number"
            value={breakLength}
            onChange={(e) => setBreakLength(e.target.value)}
            placeholder="0 = sin salto"
          />
          <ITFlex justify="between" align="center">
            <ITText muted as="span" className="text-[10px]">
              Inserta un &lt;br /&gt; al superar el límite.
            </ITText>
            <ITButton variant="text" color="primary" size="small" onClick={() => setBreakLength("0")}>
              Reset
            </ITButton>
          </ITFlex>
          <div>
            <ITText as="label" htmlFor="break_ctrl" className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              breakLengthWrap (corte cada N caracteres)
            </ITText>
            <input
              id="break_ctrl"
              type="number"
              min={0}
              step={5}
              value={breakLength}
              onChange={(e) => setBreakLength(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="0 = sin corte"
            />
            <ITFlex justify="between" align="center" className="mt-1.5">
              <ITText muted as="span" className="text-[10px]">
                Inserta oportunidades de corte cada N chars (0 = desactivado).
              </ITText>
              <button
                type="button"
                onClick={() => setBreakLength("0")}
                className="text-[10px] font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Reset
              </button>
            </ITFlex>
          </div>
          <div className="flex items-center justify-between pt-1">
            <ITText as="span" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Negrita (font-bold)</ITText>
            <ITSlideToggle isOn={bold} onToggle={setBold} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <ITText as="span" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Muted color</ITText>
            <ITSlideToggle isOn={muted} onToggle={setMuted} size="sm" />
          </div>
        </ITStack>
      }
      gallery={
        <ITStack spacing={8}>
          <GallerySection
            title="Real UI cases"
            subtitle="Production-ready typography patterns built with ITText"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* 1. Article header — eyebrow + title + meta */}
              <PatternCard
                title="Article header"
                desc="eyebrow tag + h1 title + author/date/read-time meta"
                code={TEXT_PATTERN_CODES.articleHeader}
              >
                <div className="max-w-md">
                  <ITFlex align="center" gap={2} className="mb-3">
                    <ITBadget label="ENGINEERING" color="primary" size="small" variant="outlined" />
                    <ITText muted as="span" className="text-[11px] uppercase tracking-wider font-semibold">Featured</ITText>
                  </ITFlex>
                  <ITText as="h2" className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight mb-2 block">
                    How we cut bundle size by 38% in two weeks
                  </ITText>
                  <ITText as="p" className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3 block">
                    A pragmatic walkthrough of our lazy-loading rollout, route-level code splitting, and the metrics that proved it worked.
                  </ITText>
                  <ITFlex align="center" gap={3}>
                    <ITAvatar initials="MR" size="sm" />
                    <ITText as="span" className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Mariana Reyes</ITText>
                    <ITDivider orientation="vertical" className="h-3" />
                    <ITText muted as="span" className="text-xs">Nov 14, 2025</ITText>
                    <ITDivider orientation="vertical" className="h-3" />
                    <ITText muted as="span" className="text-xs font-mono">8 min read</ITText>
                  </ITFlex>
                </div>
              </PatternCard>

              {/* 2. Section heading — h2 + description + action link */}
              <PatternCard
                title="Section heading"
                desc="h2 title + description + action link on the right"
                code={TEXT_PATTERN_CODES.sectionHeading}
              >
                <div>
                  <ITFlex justify="between" align="start" gap={4} className="mb-2">
                    <ITText as="h2" className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      Recent activity
                    </ITText>
                    <ITButton label="View all →" variant="text" color="primary" size="small" />
                  </ITFlex>
                  <ITText as="p" muted className="text-sm leading-relaxed">
                    Latest commits, deployments and reviews from your team this week. Updates every 30 seconds.
                  </ITText>
                </div>
              </PatternCard>

              {/* 3. Empty state — big title + description + muted helper */}
              <PatternCard
                title="Empty state"
                desc="big title + description + muted helper text"
                code={TEXT_PATTERN_CODES.emptyState}
              >
                <ITStack spacing={3} alignItems="center" className="text-center py-2">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)',
                      boxShadow: '0 8px 24px 0 rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    <FaBell className="text-white text-xl" />
                  </div>
                  <ITText as="h3" className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    You're all caught up
                  </ITText>
                  <ITText as="p" className="text-sm text-slate-600 dark:text-slate-300 max-w-xs">
                    No new notifications. We'll let you know when something important happens.
                  </ITText>
                  <ITText as="p" muted className="text-xs">
                    Last checked 2 minutes ago
                  </ITText>
                </ITStack>
              </PatternCard>

              {/* 4. Inline content — paragraph with bold name + inline code + muted meta */}
              <PatternCard
                title="Inline content"
                desc="paragraph with bold name + inline code + muted timestamp"
                code={TEXT_PATTERN_CODES.inlineContent}
              >
                <div className="max-w-md">
                  <ITText as="p" className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    <ITText as="span" className="font-semibold">Daniela Klein</ITText>
                    {' '}pushed commit{' '}
                    <ITText as="code" className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 font-mono text-[11px]">
                      a3f9c2e
                    </ITText>
                    {' '}to{' '}
                    <ITText as="span" className="font-semibold">main</ITText>
                    {' '}with the message{' '}
                    <ITText as="span" className="italic">"fix: race condition in cache invalidation"</ITText>.
                  </ITText>
                  <ITFlex align="center" gap={2} className="mt-3">
                    <ITText muted as="span" className="text-[11px]">12 minutes ago</ITText>
                    <ITDivider orientation="vertical" className="h-3" />
                    <ITText muted as="span" className="text-[11px] font-mono">api-service</ITText>
                    <ITDivider orientation="vertical" className="h-3" />
                    <ITBadget label="+124 -38" color="success" size="small" variant="outlined" />
                  </ITFlex>
                </div>
              </PatternCard>

              {/* 5. Form labels — label + helper text */}
              <PatternCard
                title="Form labels"
                desc="label + required asterisk + muted helper text"
                code={TEXT_PATTERN_CODES.formLabels}
              >
                <ITStack spacing={4} className="max-w-sm">
                  <div>
                    <ITText as="label" className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                      Workspace name <ITText as="span" className="text-danger-500">*</ITText>
                    </ITText>
                    <ITInput
                      name="ws_name"
                      value=""
                      onChange={() => {}}
                      onBlur={() => {}}
                      placeholder="my-awesome-project"
                    />
                    <ITText muted as="span" className="text-[11px] mt-1 block">
                      Lowercase letters, numbers and hyphens only.
                    </ITText>
                  </div>
                  <div>
                    <ITText as="label" className="text-sm font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                      Description
                    </ITText>
                    <ITInput
                      name="ws_desc"
                      value=""
                      onChange={() => {}}
                      onBlur={() => {}}
                      placeholder="A short summary of what your team is building"
                    />
                    <ITText muted as="span" className="text-[11px] mt-1 block">
                      Optional. Max 140 characters.
                    </ITText>
                  </div>
                </ITStack>
              </PatternCard>
            </div>
          </GallerySection>
        </ITStack>
      }
    />
  );
};



// 3. ITLayout & ITNavbar Showcase
export const LayoutShowcase = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");
  const [navActiveId, setNavActiveId] = useState<string | null>("1");

  const topBar = {
    logo: <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">A</div>,
    logoText: "AXZY Console",
    navItems: [
      { id: "home", label: "Inicio", icon: <FaHome />, action: () => setActiveId("home") },
      { id: "docs", label: "Documentos", icon: <FaFileAlt />, action: () => setActiveId("docs") },
      { id: "alerts", label: "Alertas", icon: <FaBell />, action: () => setActiveId("alerts") },
    ],
    onNavItemClick: (id: string) => setActiveId(id),
    userMenu: {
      userName: "Auditor AXZY",
      userEmail: "auditor@axzy.dev",
      menuItems: [
        { label: "Ajustes", onClick: () => {} },
        { label: "Cerrar sesión", onClick: () => {} },
      ],
    },
  };

  const sidebar = {
    navigationItems: [
      { id: "dashboard", label: "Dashboard", icon: <FaChartLine />, isActive: activeId === "dashboard", action: () => setActiveId("dashboard") },
      { id: "users", label: "Usuarios", icon: <FaUsers />, isActive: activeId === "users", action: () => setActiveId("users") },
      {
        id: "sales",
        label: "Ventas",
        icon: <FaShoppingCart />,
        isActive: activeId === "sales" || activeId === "orders",
        subitems: [
          { id: "orders", label: "Órdenes", action: () => setActiveId("orders") },
          { id: "invoices", label: "Facturas", action: () => setActiveId("invoices") },
        ],
      },
      { id: "products", label: "Productos", icon: <FaBoxOpen />, isActive: activeId === "products", action: () => setActiveId("products"), badge: "3" },
      { id: "settings", label: "Configuración", icon: <FaCog />, isActive: activeId === "settings", action: () => setActiveId("settings") },
    ],
    isCollapsed: collapsed,
    onToggleCollapse: () => setCollapsed(v => !v),
  };

  const code = `<ITLayout
  topBar={{
    logo: <Logo />,
    logoText: "AXZY Console",
    userMenu: { userName, userEmail, menuItems }
  }}
  sidebar={{
    navigationItems: [...],
    isCollapsed: ${collapsed},
    onToggleCollapse: () => setCollapsed(v => !v)
  }}
>
  {/* Tu contenido */}
</ITLayout>`;

  const navbarItems = [
    { id: "1", label: "Inicio", icon: <FaHome />, isActive: navActiveId === "1", action: () => setNavActiveId("1") },
    { id: "2", label: "Documentos", icon: <FaFileAlt />, isActive: navActiveId === "2", action: () => setNavActiveId("2") },
    { id: "3", label: "Alertas", icon: <FaBell />, isActive: navActiveId === "3", action: () => setNavActiveId("3") },
  ];

  const navbarCode = `<ITNavbar
  logoText="AXZY"
  navigationItems={[
    { id: "1", label: "Inicio", icon: <FaHome />, isActive: true },
    { id: "2", label: "Documentos", icon: <FaFileAlt /> },
    { id: "3", label: "Alertas", icon: <FaBell /> }
  ]}
  userMenu={{
    userName: "Auditor AXZY",
    userEmail: "auditor@axzy.dev",
    menuItems: [{ label: "Ajustes", onClick: () => {} }]
  }}
/>`;

  return (
    <ShowcaseLayout
      title="ITLayout & ITNavbar"
      description="Chasis estructural del portal con barra superior y lateral colapsable. Totalmente responsivo con drawer móvil."
      code={code}
      demo={
        <div className="w-full h-[640px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
          <ITLayout topBar={topBar} sidebar={sidebar}>
            <ITStack spacing={5}>
              <ITPageHeader
                title="Dashboard"
                description="Resumen general del sistema"
                icon={<FaChartLine size={20} />}
                iconColor="#6366f1"
              />
              <ITGrid container spacing={3}>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Usuarios" value="1,245" trend="+12%" trendDirection="up" />
                </ITGrid>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Ventas Hoy" value="$4,320" trend="+5.4%" trendDirection="up" color="bg-blue-50 dark:bg-blue-950/20" />
                </ITGrid>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Órdenes" value="89" trend="-2.1%" trendDirection="down" color="bg-amber-50 dark:bg-amber-950/20" />
                </ITGrid>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Tickets" value="12" trend="-8%" trendDirection="down" color="bg-rose-50 dark:bg-rose-950/20" />
                </ITGrid>
              </ITGrid>
              <ITCard title="Actividad reciente">
                <ITText className="text-sm text-slate-600 dark:text-slate-300">
                  El layout se adapta al colapsar/expandir el sidebar y muestra un drawer en móvil.
                </ITText>
              </ITCard>
            </ITStack>
          </ITLayout>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sidebar colapsado</span>
            <ITSlideToggle isOn={collapsed} onToggle={setCollapsed} size="sm" />
          </div>
          <div className="text-xs text-slate-500">
            En móvil (&lt;lg) el sidebar se abre como drawer con un fondo oscuro. Usa el botón ☰ del topbar.
          </div>
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">ITNavbar (standalone)</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden h-[420px]">
              <ITNavbar
                logoText="AXZY"
                navigationItems={navbarItems}
                userMenu={{
                  userName: "Auditor AXZY",
                  userEmail: "auditor@axzy.dev",
                  menuItems: [
                    { label: "Ajustes", onClick: () => {} },
                    { label: "Cerrar sesión", onClick: () => {} },
                  ],
                }}
              >
                <div className="p-8 text-center text-slate-500 text-sm">
                  {navActiveId ? `Item activo: "${navbarItems.find(i => i.isActive)?.label}"` : "Selecciona un item en la navegación"}
                </div>
              </ITNavbar>
            </div>
            <div className="mt-3">
              <CodeViewer code={navbarCode} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">ITNavbar con submenús</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden h-[420px]">
              <ITNavbar
                logoText="Admin"
                navigationItems={[
                  { id: "u", label: "Usuarios", icon: <FaUsers /> },
                  {
                    id: "s",
                    label: "Ventas",
                    icon: <FaShoppingCart />,
                    subitems: [
                      { id: "o", label: "Órdenes", action: () => {} },
                      { id: "i", label: "Facturas", action: () => {} },
                    ],
                  },
                  { id: "c", label: "Configuración", icon: <FaCog /> },
                ]}
                userMenu={{
                  userName: "Admin",
                  userEmail: "admin@axzy.dev",
                  menuItems: [{ label: "Salir", onClick: () => {} }],
                }}
              >
                <div className="p-8 text-center text-slate-500 text-sm">
                  Haz clic en "Ventas" para expandir/colapsar el submenú
                </div>
              </ITNavbar>
            </div>
          </div>
        </ITStack>
      }
    />
  );
};
