import clsx from "clsx";
import { ITChipProps } from "./chip.props";
import { chipSizes } from "@/types/chip.types";
import { theme } from "@/theme/theme";
import { FaTimes } from "react-icons/fa";
import ITText from "@/components/atoms/text/text";

/**
 * Compact tag / pill used for labels, active filters, and multi-value selections.
 *
 * Supports soft, filled, and outlined variants, an optional leading icon,
 * a removable (X) affordance, and a selected state for filter toggles.
 *
 * @example
 * <ITChip label="React" color="primary" />
 *
 * @example
 * <ITChip label="México" color="success" variant="outlined" removable onRemove={() => remove("MX")} />
 *
 * @example
 * <ITChip label="Activos" selected onClick={() => toggle()} />
 */
export default function ITChip({
  label,
  children,
  color = "secondary",
  size = "md",
  variant = "soft",
  icon,
  removable = false,
  onRemove,
  onClick,
  selected = false,
  disabled = false,
  className,
}: ITChipProps) {
  const palette = (theme.colors as Record<string, Record<number, string>>)[color]
    || theme.colors.secondary;

  const style: React.CSSProperties = {
    borderWidth: "1px",
    borderStyle: "solid",
    transition: "all 0.15s",
  };

  if (variant === "filled") {
    style.backgroundColor = palette[500];
    style.color = "#ffffff";
    style.borderColor = palette[500];
  } else if (variant === "outlined") {
    style.backgroundColor = "transparent";
    style.color = palette[700];
    style.borderColor = palette[400];
  } else {
    style.backgroundColor = palette[100];
    style.color = palette[700];
    style.borderColor = palette[200];
  }

  if (selected) {
    style.backgroundColor = palette[500];
    style.color = "#ffffff";
    style.borderColor = palette[500];
  }

  const interactive = Boolean(onClick) && !disabled;

  return (
    <span
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? selected : undefined}
      aria-disabled={disabled || undefined}
      onClick={interactive ? onClick : undefined}
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
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap align-middle",
        chipSizes[size],
        interactive && "cursor-pointer hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={style}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      {children ?? <ITText as="span" className="truncate">{label}</ITText>}
      {removable && (
        <button
          type="button"
          aria-label={label ? `Quitar ${label}` : "Quitar"}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="inline-flex items-center justify-center rounded-full opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-current -mr-0.5 shrink-0"
        >
          <FaTimes size={10} />
        </button>
      )}
    </span>
  );
}
