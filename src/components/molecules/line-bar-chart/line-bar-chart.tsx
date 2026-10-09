import { useId, useMemo, useState } from "react";
import type { ITLineBarChartProps } from "./line-bar-chart.props";

/** Número compacto para los ejes (`104 k`). */
const compact = (value: number): string =>
  new Intl.NumberFormat("es-MX", { notation: "compact", maximumFractionDigits: 1 }).format(value);

const plain = (value: number): string => new Intl.NumberFormat("es-MX").format(value);

/**
 * Barras + línea en SVG puro (sin librería de gráficas). Pensado para comparar
 * dos series por periodo —ingresos contra gastos, cobrado contra proyectado—:
 * las barras van al fondo y la línea con su área encima, con tooltip al pasar
 * el cursor. El SVG escala con `viewBox`, así que el trazo y el texto no se
 * deforman al cambiar el ancho del contenedor.
 */
export function ITLineBarChart({
  data,
  ariaLabel,
  lineLabel = "Serie A",
  barLabel = "Serie B",
  lineColor = "#10b981",
  barColor = "#3b82f6",
  height = 240,
  formatValue = plain,
  formatAxis = compact,
  className = "",
}: ITLineBarChartProps) {
  const gradientId = useId().replace(/[:]/g, "");
  const [hover, setHover] = useState<number | null>(null);

  const width = 720;
  const padding = { top: 16, right: 16, bottom: 28, left: 52 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const max = useMemo(
    () => Math.max(...data.flatMap((d) => [d.line, d.bar]), 1),
    [data]
  );
  const gridValues = [0, 0.25, 0.5, 0.75, 1].map((f) => max * f);
  const step = data.length > 0 ? plotWidth / data.length : plotWidth;
  const barWidth = Math.max(Math.min(step * 0.42, 26), 4);

  const x = (index: number) => padding.left + step * index + step / 2;
  const y = (value: number) => padding.top + plotHeight - (value / max) * plotHeight;

  const linePoints = data.map((d, i) => `${x(i)},${y(d.line)}`).join(" ");
  const areaPath =
    data.length > 0
      ? `M ${x(0)} ${y(data[0].line)} ` +
        data
          .slice(1)
          .map((d, i) => `L ${x(i + 1)} ${y(d.line)}`)
          .join(" ") +
        ` L ${x(data.length - 1)} ${padding.top + plotHeight} L ${x(0)} ${padding.top + plotHeight} Z`
      : "";

  const active = hover !== null ? data[hover] : null;

  /** Posición del tooltip en % del ancho, para que siga al punto sin salir del gráfico. */
  const tooltipLeft = (() => {
    if (hover === null) return 0;
    const center = (x(hover) / width) * 100;
    return Math.min(Math.max(center, 12), 88);
  })();

  return (
    <div className={`relative flex flex-col gap-3 ${className}`.trim()}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${width} ${height}`}
        style={{ height, width: "100%" }}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`area-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridValues.map((value, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y(value)}
              y2={y(value)}
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray={i === 0 ? undefined : "3 4"}
            />
            <text x={padding.left - 8} y={y(value) + 3} textAnchor="end" fontSize={10} fill="#94a3b8">
              {formatAxis(Math.round(value))}
            </text>
          </g>
        ))}

        {data.map((d, i) => (
          <rect
            key={`bar-${d.label}`}
            x={x(i) - barWidth / 2}
            y={y(d.bar)}
            width={barWidth}
            height={Math.max(padding.top + plotHeight - y(d.bar), 1)}
            rx={3}
            fill={barColor}
            opacity={hover === null || hover === i ? 0.85 : 0.35}
          />
        ))}

        {areaPath && <path d={areaPath} fill={`url(#area-${gradientId})`} />}
        {data.length > 0 && (
          <polyline
            points={linePoints}
            fill="none"
            stroke={lineColor}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {data.map((d, i) => (
          <circle
            key={`dot-${d.label}`}
            cx={x(i)}
            cy={y(d.line)}
            r={hover === i ? 4.5 : 3}
            fill="#ffffff"
            stroke={lineColor}
            strokeWidth={2}
          />
        ))}

        {data.map((d, i) => (
          <g key={`hit-${d.label}`} onMouseEnter={() => setHover(i)}>
            <rect x={padding.left + step * i} y={padding.top} width={step} height={plotHeight} fill="transparent" />
            <text x={x(i)} y={height - 8} textAnchor="middle" fontSize={10} fill="#64748b">
              {d.label}
            </text>
          </g>
        ))}

      </svg>

      {active && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg px-2.5 py-1.5 shadow-lg"
          style={{ left: `${tooltipLeft}%`, top: 4, background: "#0f172a", opacity: 0.94, minWidth: 132 }}
          role="status"
        >
          <p className="text-[10px] font-semibold" style={{ color: "#e2e8f0" }}>{active.label}</p>
          <p className="text-[11px] tabular-nums" style={{ color: lineColor }}>
            {lineLabel}: {formatValue(active.line)}
          </p>
          <p className="text-[11px] tabular-nums" style={{ color: "#93c5fd" }}>
            {barLabel}: {formatValue(active.bar)}
          </p>
        </div>
      )}

      <ul className="flex flex-wrap items-center gap-4 text-[11px]" style={{ color: "#475569" }}>
        <li>
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: lineColor }} aria-hidden />
          {lineLabel}
        </li>
        <li>
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: barColor }} aria-hidden />
          {barLabel}
        </li>
      </ul>
    </div>
  );
}

export default ITLineBarChart;
