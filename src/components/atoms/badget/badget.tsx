// components/ITBadge.tsx
import clsx from "clsx";
import { ITBadgetProps } from "./badget.props";
import {
  badgeSizes,
} from "@/types/badget.types";
import { theme } from "@/theme/theme";
import ITText from "@/components/atoms/text/text";

/**
 * Small status tag or label with theme-based colors and filled/outlined variants.
 *
 * @example
 * <ITBadget label="Active" color="success" variant="filled" />
 *
 * @example
 * <ITBadget color="danger" variant="outlined" size="sm">
 *   <span className="flex items-center gap-1">3 new</span>
 * </ITBadget>
 */
export default function ITBadget({
  children,
  label,
  color = "primary",
  size = "md",
  variant = "filled",
  className,
}: ITBadgetProps) {
  // Access theme configuration
  const themeBadge = (theme as any).badge || {};
  const config = themeBadge[color] || themeBadge.primary || {};

  /**
   * El acento base de la paleta (`--color-primary`, cian por defecto) queda en
   * 2.4:1 con texto blanco y 3.3:1 como texto sobre blanco. Para `primary` el
   * color se resuelve con utilidades (`primary-700` en claro, `primary-500` en
   * oscuro) que sí pasan AA; el resto de colores del tema se respetan tal cual.
   */
  const esAcentoPrimario = color === "primary";
  const claseAcento = esAcentoPrimario
    ? variant === "filled"
      ? "bg-primary-700 text-white dark:bg-primary-500 dark:text-slate-950"
      : "border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-500"
    : "";

  const getStyle = () => {
    const style: React.CSSProperties = {
      fontWeight: config.fontWeight,
      borderRadius: config.borderRadius, // '9999px' in theme
      borderWidth: '1px', // Default border width for consistency
      borderStyle: 'solid',
      borderColor: 'transparent', // Default transparent
      transition: 'all 0.2s',
    };

    if (variant === "filled") {
      if (!esAcentoPrimario) {
        style.backgroundColor = config.backgroundColor;
        style.color = config.color;
      }
      style.borderColor = config.borderColor || 'transparent'; // Some filled badges might have subtle borders
    } else if (variant === "outlined") {
      style.backgroundColor = "transparent";
      if (!esAcentoPrimario) {
        // El tono del tema para texto y borde: legible sobre cualquier superficie.
        style.color = config.color;
        style.borderColor = config.color;
      }
    }

    return style;
  };

  return (
    <span
      className={clsx(
        claseAcento,
        "inline-flex items-center justify-center",
        // Apply size classes (padding/font-size)
        badgeSizes[size],
        className
      )}
      style={getStyle()}
    >
      {children || <ITText as="span" className={clsx("font-semibold")}>{label}</ITText>}
    </span>
  );
}
