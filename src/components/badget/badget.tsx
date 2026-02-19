// components/ITBadge.tsx
import clsx from "clsx";
import { ITBadgetProps } from "./badget.props";
import {
  badgeSizes,
} from "@/types/badget.types";
import { theme } from "@/theme/theme";

export default function ITBadget({
  children,
  label,
  color = "primary",
  size = "medium",
  variant = "filled",
  className,
}: ITBadgetProps) {
  // Access theme configuration
  const themeBadge = (theme as any).badge || {};
  const config = themeBadge[color] || themeBadge.primary || {};

  const getStyle = () => {
    const style: React.CSSProperties = {
      fontSize: config.fontSize,
      fontWeight: config.fontWeight,
      padding: config.padding,
      borderRadius: config.borderRadius, // '9999px' in theme
      borderWidth: '1px', // Default border width for consistency
      borderStyle: 'solid',
      borderColor: 'transparent', // Default transparent
      transition: 'all 0.2s',
    };

    if (variant === "filled") {
      style.backgroundColor = config.backgroundColor;
      style.color = config.color;
      style.borderColor = config.borderColor || 'transparent'; // Some filled badges might have subtle borders
    } else if (variant === "outlined") {
      style.backgroundColor = "transparent";
      // Use the dark text color for both text and border to ensure high contrast
      style.color = config.color; 
      style.borderColor = config.color;
    }

    return style;
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center",
        // Fallback size if theme doesn't have it (though theme does have it for primary)
        !config.padding ? badgeSizes[size] : "", 
        className
      )}
      style={getStyle()}
    >
      {children || <span className={clsx("font-semibold")}>{label}</span>}
    </span>
  );
}
