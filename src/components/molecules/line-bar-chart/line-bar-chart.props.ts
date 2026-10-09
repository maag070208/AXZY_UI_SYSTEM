export interface ITLineBarDatum {
  /** Etiqueta del eje (p. ej. «May»). */
  label: string;
  /** Serie de la línea (ingresos). */
  line: number;
  /** Serie de las barras (gastos). */
  bar: number;
}

export interface ITLineBarChartProps {
  data: ITLineBarDatum[];
  /** Etiqueta accesible del gráfico. */
  ariaLabel: string;
  /** Nombre de la serie de la línea (leyenda y tooltip). */
  lineLabel?: string;
  /** Nombre de la serie de barras (leyenda y tooltip). */
  barLabel?: string;
  /** Color de la línea (por defecto el verde de la casa). */
  lineColor?: string;
  /** Color de las barras. */
  barColor?: string;
  height?: number;
  /** Formatea los valores del tooltip; por defecto número con separadores. */
  formatValue?: (value: number) => string;
  /** Texto del eje Y; por defecto número compacto. */
  formatAxis?: (value: number) => string;
  className?: string;
}
