import {
  buttonSizes,
  buttonVariants,
} from "@app/types/button.types";
import clsx from "clsx";
import { useState } from "react";
import { theme } from "@/theme/theme";
import { ITButtonProps } from "./button.props";

export default function ITButton({
  children,
  label,
  onClick,
  type = "button",
  color = "primary",
  size = "medium",
  disabled = false,
  className,
  variant = "filled",
  ariaLabel,
  title,
}: ITButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
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

    let style: React.CSSProperties = {
      // fontSize: themeConfig.fontSize, // Removed to allow size prop to control font size
      fontWeight: themeConfig.fontWeight,
      // padding: themeConfig.padding, // Removed to allow size prop to control padding
      borderRadius: themeConfig.borderRadius, // Default from theme
      transition: themeConfig.transition || 'all 0.2s',
    };

    if (variant === "rounded") {
      style.borderRadius = "9999px";
    }

    if (variant === "icon-only") {
      style.padding = "0.5rem"; // Square padding override
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
      style.backgroundColor = "#ffffff";
      style.color = mainColor;
      if (isHovered && !disabled) style.backgroundColor = "#f8fafc"; 
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
        buttonSizes[size],
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
        <span className={clsx("font-semibold", { "opacity-50": disabled })}>
          {label}
        </span>
      )}
    </button>
  );
}
