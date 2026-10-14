# ITLineBarChart

|  |  |
| --- | --- |
| Capa | `molecules` |
| Carpeta | `src/components/molecules/line-bar-chart/` |
| Archivo | `line-bar-chart.tsx` |
| Props | `line-bar-chart.props.ts` |
| Import | `import { ITLineBarChart } from "@axzydev/axzy_ui_system"` |

Gráfico de barras + línea en SVG puro (sin librería de gráficos). Pensado para comparar dos series por periodo —ingresos contra gastos, cobrado contra proyectado—: las barras van al fondo y la línea con su área encima, con tooltip al pasar el cursor. El SVG escala con `viewBox`, así que el trazo y el texto no se deforman al cambiar el ancho del contenedor.

## Import

```tsx
import { ITLineBarChart } from "@axzydev/axzy_ui_system";
```

## Props

### `ITLineBarChartProps`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `data` | `ITLineBarDatum[]` | — | Puntos del gráfico. |
| `ariaLabel` | `string` | — | Etiqueta accesible del gráfico. |
| `lineLabel` | `string` | `"Serie A"` | Nombre de la serie de la línea (leyenda y tooltip). |
| `barLabel` | `string` | `"Serie B"` | Nombre de la serie de barras (leyenda y tooltip). |
| `lineColor` | `string` | `"#10b981"` | Color de la línea. |
| `barColor` | `string` | `"#3b82f6"` | Color de las barras. |
| `height` | `number` | `240` | Alto del SVG en píxeles. |
| `formatValue` | `(value: number) => string` | número con separadores `es-MX` | Formatea los valores del tooltip. |
| `formatAxis` | `(value: number) => string` | número compacto `es-MX` (`104 k`) | Texto del eje Y. |
| `className` | `string` | `""` | Clases CSS adicionales para el contenedor. |

### `ITLineBarDatum`

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Etiqueta del eje (p. ej. `"May"`). |
| `line` | `number` | — | Valor de la serie de la línea (ingresos). |
| `bar` | `number` | — | Valor de la serie de las barras (gastos). |

## Ejemplo

```tsx
import { ITLineBarChart } from "@axzydev/axzy_ui_system";

export default function IncomeVsExpenses() {
  return (
    <ITLineBarChart
      ariaLabel="Ingresos frente a gastos por mes"
      lineLabel="Ingresos"
      barLabel="Gastos"
      data={[
        { label: "Ene", line: 120000, bar: 90000 },
        { label: "Feb", line: 132000, bar: 98000 },
        { label: "Mar", line: 150000, bar: 105000 },
      ]}
    />
  );
}
```

## Notas

- El `<svg>` lleva `role="img"` y `aria-label={ariaLabel}`; usa `viewBox="0 0 720 ${height}"` con `width: 100%` y `height`.
- Geometría interna: ancho lógico fijo `720`, padding `{ top: 16, right: 16, bottom: 28, left: 52 }`, `step = plotWidth / data.length`, `barWidth = clamp(step * 0.42, 4, 26)`.
- Escala: `max` es el mayor valor entre `line` y `bar` (mínimo 1). La cuadrícula dibuja 5 líneas (0 → max); el eje Y usa `formatAxis(Math.round(value))`.
- Tooltip: aparece al entrar en la zona de cada punto (`onMouseEnter` del `<rect>` transparente) y desaparece al salir del SVG; es `role="status"`, fondo `#0f172a`, y se posiciona entre el 12 % y el 88 % del ancho para no salirse.
- Leyenda inferior con dos entradas (línea y barras) usando `lineColor` / `barColor`.
- `formatValue` por defecto usa `Intl.NumberFormat("es-MX")`; `formatAxis` usa `Intl.NumberFormat("es-MX", { notation: "compact", maximumFractionDigits: 1 })`.
- Con `data` vacío, `max` = 1 y no se dibujan barras, línea ni área.
- Con un único punto no se dibuja el área (el `areaPath` requiere más de un punto) pero sí el punto y la barra.
- Gotcha: los colores por defecto del gráfico están **hardcodeados** (`#10b981`, `#3b82f6`, `#e2e8f0`, `#94a3b8`, `#64748b`, `#0f172a`, `#ffffff`, `#93c5fd`) y no derivan de los tokens `--it-*` / `--color-*` del tema.
- No incluye archivos de Storybook (el repo ya no tiene Storybook).

## Textos (i18n)

| Key | es | en | Dónde |
| --- | --- | --- | --- |
| `lineBarChart.lineLabel` | `Serie A` | `Series A` | `line-bar-chart.tsx:25` (fallback de `lineLabel`) |
| `lineBarChart.barLabel` | `Serie B` | `Series B` | `line-bar-chart.tsx:26` (fallback de `barLabel`) |

`ariaLabel` y los `label` de los datos también entran por props; el formateo de números usa el locale fijo `es-MX`.
