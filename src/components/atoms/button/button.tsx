import {
  buttonIconPadding,
  buttonIconSizes,
  buttonSizes,
  buttonVariants,
} from "@/types/button.types";
import clsx from "clsx";
import { useState } from "react";
import { theme } from "@/theme/theme";
import { ITButtonProps } from "./button.props";
import ITText from "@/components/atoms/text/text";

/**
 * Highly configurable action button supporting 8 visual variants, theme colors, 3 sizes, icons, and hover/focus states.
 *
 * @example
 * <ITButton label="Submit" color="primary" variant="filled" onClick={() => {}} />
 *
 * @example
 * <ITButton color="danger" variant="outlined" size="sm" icon={<FaTrash />}>
 *   Delete
 * </ITButton>
 */
export default function ITButton({
  children,
  label,
  icon,
  onClick,
  type = "button",
  color = "primary",
  size = "md",
  disabled = false,
  className,
  variant = "filled",
  ariaLabel,
  title,
}: ITButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  /** La variante `icon-only` siempre es un cuadrado con padding simétrico. */
  const isIconOnly = variant === "icon-only";

  /**
   * Contenido "solo icono": hay `icon` y no hay `children`.
   * En ese caso NO se envuelve el icono en el wrapper con `gap-1.5` ni en un `ITText` vacío,
   * que lo desplazaban a la izquierda del centro.
   */
  const isIconOnlyContent = isIconOnly && Boolean(icon) && !children;
  
  // Get specific button config from theme
  const themeBtn = theme.button as any;
  const themeConfig = themeBtn[color] || themeBtn.primary;
  
  // Determine if the button should look "filled" (solid bg) or "outlined/text" (transparent/white bg)
  const isSolid = ["filled", "raised", "rounded", "icon-only"].includes(variant || "filled");
  const isOutlined = variant === "outlined";
  const isText = variant === "text" || variant === "link";
  const isRaisedText = variant === "raised-text";

  const getStyle = () => {
    // if (disabled) return {}; // Removed to allow styles to render with opacity

    const mainColor = themeConfig.backgroundColor; // The vibrant color
    const textColor = themeConfig.color; // Usually white for filled

    const style: React.CSSProperties = {
      // fontSize: themeConfig.fontSize, // Removed to allow size prop to control font size
      fontWeight: themeConfig.fontWeight,
      // padding: themeConfig.padding, // Removed to allow size prop to control padding
      borderRadius: themeConfig.borderRadius, // Default from theme
      transition: themeConfig.transition || 'all 0.2s',
    };

    if (variant === "rounded") {
      style.borderRadius = "9999px";
    }

    if (isIconOnly) {
      // Padding simétrico explícito: con `aspect-square` define un cuadrado exacto
      // y evita que las utilidades `px-*`/`py-*` de `buttonSizes` desalineen el icono.
      style.padding = buttonIconPadding[size] ?? "0.5rem";
      style.lineHeight = 1;
    }

    if (isSolid) {
      style.backgroundColor = (isHovered && !disabled) ? themeConfig.hover : mainColor;
      style.color = textColor;
    } else if (isOutlined) {
      style.backgroundColor = "transparent";
      style.color = mainColor;
      style.borderColor = mainColor;
      if (isHovered && !disabled) {
         style.backgroundColor = `${mainColor}10`; // 10% opacity
      }
    } else if (isText) {
      style.backgroundColor = (isHovered && !disabled) ? `${mainColor}10` : "transparent";
      style.color = mainColor;
    } else if (isRaisedText) {
      style.backgroundColor = "var(--it-card-bg, #ffffff)";
      style.color = mainColor;
      if (isHovered && !disabled) style.backgroundColor = "var(--it-card-header-bg, #f8fafc)"; 
    }

    // Apply focus style from theme (box-shadow ring)
    if (isFocused && themeConfig.focus && !disabled) {
        style.boxShadow = themeConfig.focus;
    }

    return style;
  };

  return (
    <button
      type={type}
      className={clsx(
        "focus:outline-none", // Removed focus:ring-2 focus:ring-offset-2 to use theme style
        // Apply variant base styles (border, shadow, rounded-full)
        buttonVariants[variant || "filled"],
        // Apply size classes (padding/font-size)
        isIconOnly ? buttonIconSizes[size] : buttonSizes[size],
        className,
        { "opacity-50 cursor-not-allowed": disabled }
      )}
      style={getStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      title={title || ariaLabel || label}
    >
      {children || (
        isIconOnlyContent ? (
          // Icono solo: sin wrapper con `gap` ni `ITText` vacío, que lo desplazaban a la izquierda.
          <span className="inline-flex items-center justify-center leading-none">{icon}</span>
        ) : (
          <span className={clsx("inline-flex items-center gap-1.5 font-semibold", { "opacity-50": disabled })}>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <ITText as="span">{label}</ITText>
          </span>
        )
      )}
    </button>
  );
}
