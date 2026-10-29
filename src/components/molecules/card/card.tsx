import clsx from "clsx";
import { ITCardProps } from "./card.props";
import { useState } from "react";
import ITText from "@/components/atoms/text/text";
import { useITAppearance } from "@/theme/theme-context";
import { useITTranslation } from "@/i18n";

/**
 * Versatile card container with optional image, title, body content, and action footer. Supports interactive hover states
 * and pastel `tone` tiles. Follows the provider `appearance` (`soft`, `flat`, `bento`).
 *
 * @example
 * <ITCard title="Welcome" image="/hero.jpg" actions={<ITButton label="Learn more" />}>
 *   This is the card content.
 * </ITCard>
 *
 * @example
 * <ITCard tone="success" title="Revenue">+12.4%</ITCard>
 *
 * @example
 * <ITCard onClick={() => {}} className="max-w-sm">
 *   Clickable card with hover shadow.
 * </ITCard>
 */
export default function ITCard({
  title,
  tone,
  headerActions,
  image,
  alt,
  children,
  actions,
  className,
  imageClassName,
  titleClassName,
  contentClassName,
  actionClassName,
  onClick,
}: ITCardProps) {
  const { t } = useITTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const appearance = useITAppearance();
  const bento = appearance === "bento";
  const flat = appearance === "flat";
  const resolvedAlt = alt ?? t("card.imageAlt");

  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--it-card-bg, #ffffff)",
    borderColor: bento
      ? "transparent"
      : flat
        ? "var(--it-card-flat-border, var(--color-secondary-200))"
        : "var(--it-card-border, rgba(15, 23, 42, 0.06))",
    borderWidth: bento ? "0px" : "1px",
    borderStyle: "solid",
    borderRadius: bento
      ? "var(--it-card-radius, var(--it-bento-card-radius, var(--radius-2xl)))"
      : flat
        ? "var(--it-card-radius, var(--radius-lg))"
        : "var(--it-card-radius, var(--radius-2xl))",
    // Soft depth: every card floats a little at rest; interactive cards
    // gain visual weight on hover instead of appearing flat until clicked.
    // Flat appearance: the hairline border carries the surface, so a card
    // only gets a shadow as hover feedback when it is clickable.
    // Bento: borderless, a diffuse shadow at rest and a stronger one on hover.
    boxShadow: bento
      ? onClick && isHovered
        ? "var(--it-bento-card-shadow-hover, var(--shadow-lg))"
        : "var(--it-bento-card-shadow, var(--shadow-sm))"
      : flat
        ? onClick && isHovered
          ? "var(--shadow-sm)"
          : "none"
        : onClick
          ? isHovered
            ? "var(--shadow-lg)"
            : "var(--shadow-sm)"
          : "var(--shadow-sm)",
    transition: onClick ? "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out" : "none",
    transform: onClick && isHovered && !flat && !bento ? "translateY(-2px)" : "translateY(0)",
    cursor: onClick ? "pointer" : "default",
  };

  // Pastel tile: the soft token is translucent, so it is layered over the
  // regular surface (opaque tile, correct in light and dark).
  if (tone) {
    const soft = `var(--color-${tone}-soft)`;
    containerStyle.backgroundImage = `linear-gradient(${soft}, ${soft})`;
    if (!bento) containerStyle.borderColor = `var(--color-${tone}-soft-border)`;
  }

  const bodyStyle: React.CSSProperties = {
    padding: bento ? "var(--it-bento-card-padding, 1.5rem)" : "1.25rem",
  };

  const titleTypography = bento
    ? "text-lg font-bold"
    : flat
      ? "text-base font-semibold"
      : "text-xl font-semibold";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onClick && setIsHovered(true)}
      onMouseLeave={() => onClick && setIsHovered(false)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={clsx("overflow-hidden flex flex-col", className)}
      style={containerStyle}
    >
      {image && (
        <img
          src={image}
          alt={resolvedAlt}
          className={clsx("w-full h-48 object-cover", imageClassName)}
        />
      )}

      <div className={clsx(contentClassName)} style={bodyStyle}>
        {headerActions ? (
          <div className="mb-2 flex items-center justify-between gap-3">
            {title && (
              <ITText
                as="h3"
                className={clsx(titleTypography, titleClassName)}
              >
                {title}
              </ITText>
            )}
            {headerActions}
          </div>
        ) : title ? (
          <ITText
            as="h3"
            className={clsx(titleTypography, flat ? "mb-3" : bento ? "mb-4" : "mb-2", titleClassName)}
          >
            {title}
          </ITText>
        ) : null}
        <ITText as="div" className="text-secondary-600">{children}</ITText>
      </div>
      {actions && (
        <div
          className={clsx(
            "p-4 border-t border-secondary-100 mt-auto",
            actionClassName,
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}

