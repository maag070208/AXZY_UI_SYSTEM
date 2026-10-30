import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/** Tono de superficie del mosaico: blanco por defecto o uno de marca. */
export type ITBentoTone = "plain" | "sea" | "lavender" | "mint" | "sun";

export interface ITBentoTileProps {
  /** Etiqueta superior; si se omite, la tarjeta se maqueta con `children`. */
  label?: ReactNode;
  /** Ícono de línea a la izquierda de la etiqueta. */
  icon?: ReactNode;
  /** Cuántas columnas del mosaico ocupa (1–12). */
  cols?: number;
  /** Cuántas filas de 84 px ocupa. */
  rows?: number;
  tone?: ITBentoTone;
  /** Valor principal, grande y tabular. */
  value?: ReactNode;
  /** Texto de apoyo junto al valor. */
  caption?: ReactNode;
  /** Contenido a la derecha del pie (p. ej. un segundo número). */
  aside?: ReactNode;
  /** Visual al centro (medidor, ola, segmentos…); crece para llenar la tarjeta. */
  children?: ReactNode;
  /** En pantallas chicas ocupa las 6 columnas en vez de 3. */
  wide?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Tarjeta del mosaico bento: superficie de radio 20 px con etiqueta, un visual
 * opcional que llena el centro y un pie con el valor grande y su contexto.
 * El tono elige la superficie (`sea` oscura, `lavender`, `mint`, `sun` o blanca);
 * el mosaico lo arma `ITBentoGrid`.
 */
export function ITBentoTile({
  label,
  icon,
  cols = 3,
  rows = 1,
  tone = "plain",
  value,
  caption,
  aside,
  children,
  wide = false,
  onClick,
  className,
  style,
}: ITBentoTileProps) {
  const interactive = typeof onClick === "function";
  return (
    <section
      className={clsx(
        "it-bento-tile",
        tone !== "plain" && `it-bento-tile--${tone}`,
        wide && "it-bento-tile--wide",
        interactive && "cursor-pointer transition-transform hover:-translate-y-0.5",
        className,
      )}
      style={{ gridColumn: `span ${cols}`, gridRow: `span ${rows}`, ...style }}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {label !== undefined && (
        <h3 className="it-bento-tile__label">
          {icon}
          {label}
        </h3>
      )}
      {children}
      {(value !== undefined || caption || aside) && (
        <div className="it-bento-tile__foot">
          {value !== undefined && <div className="it-bento-tile__value">{value}</div>}
          {caption && <small className="it-bento-tile__caption ml-auto">{caption}</small>}
          {aside}
        </div>
      )}
    </section>
  );
}

export interface ITBentoGridProps {
  children: ReactNode;
  className?: string;
}

/** Mosaico de 12 columnas con filas de 84 px (6 columnas y alto automático en móvil). */
export function ITBentoGrid({ children, className }: ITBentoGridProps) {
  return <div className={clsx("it-bento-grid", className)}>{children}</div>;
}

export interface ITBentoGaugeProps {
  /** Proporción 0..1 del arco. */
  value: number;
  color?: string;
  trackColor?: string;
  /** Ancho del SVG (el alto es proporcional). */
  size?: number;
  /** Tamaño del número de los deciles (para reducir el ruido). */
  strokeWidth?: number;
}

/** Medidor semicircular con el arco dibujándose al montar. */
export function ITBentoGauge({
  value,
  color = "var(--color-warning, #f2c14e)",
  trackColor = "rgb(255 255 255 / 0.14)",
  size = 200,
  strokeWidth = 13,
}: ITBentoGaugeProps) {
  const v = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  const [go, setGo] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <svg
      viewBox="0 0 200 108"
      width={size}
      height={size * 0.54}
      className="mx-auto block h-auto max-h-full w-full max-w-[230px]"
      aria-hidden="true"
    >
      <path
        d="M16 98 A84 84 0 0 1 184 98"
        fill="none"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={trackColor}
      />
      <path
        d="M16 98 A84 84 0 0 1 184 98"
        pathLength={100}
        fill="none"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        stroke={color}
        strokeDasharray={100}
        strokeDashoffset={go ? 100 - v * 100 : 100}
        style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1) .2s" }}
      />
    </svg>
  );
}

export interface ITBentoWavesProps {
  /** Proporción 0..1 que define la altura de las bandas. */
  level: number;
  color?: string;
  /** Altura de la zona de olas (%). */
  height?: number;
}

/** Dos bandas de agua animadas, ancladas al pie de la tarjeta. */
export function ITBentoWaves({ level, color = "var(--color-violet-400, #a895e0)", height = 62 }: ITBentoWavesProps) {
  const v = Math.min(1, Math.max(0, Number.isFinite(level) ? level : 0));
  const h = Math.max(18, Math.min(90, v * 100));
  return (
    <div className="it-bento-wave" style={{ height: `${Math.min(height, 30 + h)}%` }} aria-hidden="true">
      <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="it-bento-wave__b" style={{ opacity: 0.85 }}>
        <path d="M0 55 Q100 30 200 55 T400 55 T600 55 T800 55 V100 H0z" fill={color} />
      </svg>
      <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="it-bento-wave__a" style={{ opacity: 0.5 }}>
        <path d="M0 40 Q100 10 200 40 T400 40 T600 40 T800 40 V100 H0z" fill={color} />
      </svg>
    </div>
  );
}

export interface ITBentoSparkProps {
  /** Serie real de valores; con menos de 2 puntos no se dibuja. */
  data: number[];
  color?: string;
  height?: number;
}

/** Línea de tendencia que se dibuja al montar. */
export function ITBentoSpark({ data, color = "#c9951c", height = 44 }: ITBentoSparkProps) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 36 - ((d - min) / span) * 30;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ height, width: "100%" }} aria-hidden="true">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={drawn ? 0 : 100}
        style={{ transition: "stroke-dashoffset 1.4s ease .3s", vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

export interface ITBentoSegmentsProps {
  /** Total de segmentos. */
  total: number;
  /** Segmentos encendidos. */
  done: number;
  color?: string;
  idleColor?: string;
}

/** Tira de segmentos que se levantan uno tras otro (tareas, piezas, avance). */
export function ITBentoSegments({
  total,
  done,
  color = "var(--color-success, #2fa374)",
  idleColor = "color-mix(in srgb, currentColor 16%, transparent)",
}: ITBentoSegmentsProps) {
  const n = Math.max(1, Math.min(60, Math.round(total)));
  const on = Math.max(0, Math.min(n, Math.round(done)));
  return (
    <div className="it-bento-seg" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i
          key={i}
          className={i < on ? "is-on" : undefined}
          style={{ background: i < on ? color : idleColor, ["--it-bento-i" as string]: i }}
        />
      ))}
    </div>
  );
}

export interface ITBentoWeekBarsProps {
  items: { label: string; value: number; tone?: "today" | "future" | "past" }[];
  color?: string;
  todayColor?: string;
}

/** Barras por día de la semana; el día de hoy va en el color de acento. */
export function ITBentoWeekBars({
  items,
  color = "var(--it-bento-ink, #0c3b52)",
  todayColor = "var(--color-warning, #f2c14e)",
}: ITBentoWeekBarsProps) {
  const max = Math.max(1, ...items.map((i) => i.value));
  const BAR_MAX_PX = 52;
  return (
    <div className="mt-1 flex min-h-0 flex-1 items-end gap-1.5">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-1 flex-col items-center justify-end gap-1 text-[10px]" style={{ color: "var(--it-bento-muted)" }}>
          <i
            className="w-full rounded-t-[5px] rounded-b-[2px] transition-[height] duration-700"
            style={{
              height: `${item.value === 0 ? 12 : Math.max(18, Math.round((item.value / max) * BAR_MAX_PX))}px`,
              background:
                item.tone === "today" ? todayColor : item.tone === "future" ? "color-mix(in srgb, currentColor 14%, transparent)" : color,
              transitionDelay: `${i * 60 + 150}ms`,
            }}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}

export interface ITBentoDonutProps {
  segments: { label: string; value: number; color: string }[];
  /** Texto central y su bajada. */
  center?: ReactNode;
  caption?: string;
  size?: number;
}

/** Dona de segmentos con texto al centro (la leyenda va aparte). */
export function ITBentoDonut({ segments, center, caption, size = 112 }: ITBentoDonutProps) {
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  if (total <= 0) return null;
  const r = 38;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={caption}>
      <circle cx="50" cy="50" r={r} fill="none" strokeWidth={13} stroke="color-mix(in srgb, currentColor 10%, transparent)" />
      {segments.map((s) => {
        const len = (s.value / total) * circ;
        const el = (
          <circle
            key={s.label}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            strokeWidth={13}
            stroke={s.color}
            strokeLinecap="butt"
            strokeDasharray={`${Math.max(0, len - 1)} ${circ - Math.max(0, len - 1)}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 50 50)"
          />
        );
        offset += len;
        return el;
      })}
      {center !== undefined && (
        <text x="50" y="52" textAnchor="middle" fontSize="24" fontWeight={800} fill="currentColor">
          {center}
        </text>
      )}
      {caption && (
        <text x="50" y="65" textAnchor="middle" fontSize="7.5" fontWeight={500} fill="var(--it-bento-muted)">
          {caption}
        </text>
      )}
    </svg>
  );
}

export interface ITBentoFeedItem {
  id: string;
  /** Ícono dentro del cuadro de color. */
  icon?: ReactNode;
  title: string;
  meta?: string;
  tone?: "success" | "violet" | "neutral";
  href?: string;
}

export interface ITBentoFeedProps {
  groups: { key: string; label: string; items: ITBentoFeedItem[] }[];
  onItemClick?: (item: ITBentoFeedItem) => void;
  /** Alto máximo del hilo; hace scroll a partir de ahí. */
  maxHeight?: number;
}

/** Actividad agrupada por día, con cuadro de ícono y hora. */
export function ITBentoFeed({ groups, onItemClick, maxHeight = 330 }: ITBentoFeedProps) {
  const toneClass = {
    success: "bg-[var(--color-success-soft)] text-[color:var(--color-success)]",
    violet: "bg-[var(--color-primary-50)] text-[color:var(--color-primary-600)]",
    neutral: "bg-[var(--color-secondary-100)] text-[color:var(--color-text-muted)]",
  } as const;
  return (
    <ul className="m-0 list-none overflow-y-auto p-0" style={{ maxHeight }}>
      {groups.map((group) => (
        <li key={group.key} className="list-none">
          <p className="m-0 px-1.5 pb-1 pt-2.5 text-[11px] font-semibold" style={{ color: "var(--it-bento-muted)" }}>
            {group.label}
          </p>
          <ul className="m-0 list-none p-0">
            {group.items.map((item) => (
              <li key={item.id} className="list-none">
                <button
                  type="button"
                  onClick={() => onItemClick?.(item)}
                  className={clsx(
                    "flex w-full items-center gap-2.5 rounded-[11px] px-1.5 py-1.5 text-left",
                    onItemClick ? "cursor-pointer hover:bg-[color-mix(in_srgb,currentColor_6%,transparent)]" : "cursor-default",
                  )}
                >
                  <span className={clsx("grid h-7 w-7 shrink-0 place-items-center rounded-[9px]", toneClass[item.tone ?? "neutral"])}>
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold">{item.title}</span>
                    {item.meta && (
                      <span className="block text-[11px]" style={{ color: "var(--it-bento-muted)" }}>
                        {item.meta}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export interface ITBentoLiveProps {
  label: string;
  className?: string;
}

/** Píldora "En vivo" con punto que late. */
export function ITBentoLive({ label, className }: ITBentoLiveProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-soft)] px-2.5 py-1 text-[12px] font-semibold text-[color:var(--color-success)]",
        className,
      )}
    >
      <i
        className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]"
        style={{ boxShadow: "0 0 0 0 color-mix(in srgb, var(--color-success) 55%, transparent)", animation: "it-bento-pulse 2.4s ease-out infinite" }}
      />
      {label}
    </span>
  );
}

/** Contador que sube de 0 al valor al montar (para el número grande de la tarjeta). */
export function useITBentoCountUp(target: number, duration = 1400, decimals = 0) {
  const [shown, setShown] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    if (!Number.isFinite(target)) return;
    if (typeof window === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      ref.current = target * eased;
      setShown(Number(ref.current.toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setShown(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals]);
  return shown;
}
