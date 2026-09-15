import clsx from "clsx";
import { ITCardProps } from "./card.props";
import { useState } from "react";
import ITText from "@/components/text/text";

/**
 * Versatile card container with optional image, title, body content, and action footer. Supports interactive hover states.
 *
 * @example
 * <ITCard title="Welcome" image="/hero.jpg" actions={<ITButton label="Learn more" />}>
 *   This is the card content.
 * </ITCard>
 *
 * @example
 * <ITCard onClick={() => {}} className="max-w-sm">
 *   Clickable card with hover shadow.
 * </ITCard>
 */
export default function ITCard({
  title,
  image,
  alt = "Card Image",
  children,
  actions,
  className,
  imageClassName,
  titleClassName,
  contentClassName,
  actionClassName,
  onClick,
}: ITCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--card-bg, #ffffff)",
    borderColor: "var(--card-border, rgba(15, 23, 42, 0.06))",
    borderWidth: "1px",
    borderRadius: "var(--card-radius, var(--radius-2xl))",
    // Soft depth: every card floats a little at rest; interactive cards
    // gain visual weight on hover instead of appearing flat until clicked.
    boxShadow: onClick
      ? isHovered
        ? "var(--shadow-lg)"
        : "var(--shadow-sm)"
      : "var(--shadow-sm)",
    transition: onClick ? "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out" : "none",
    transform: onClick && isHovered ? "translateY(-2px)" : "translateY(0)",
    cursor: onClick ? "pointer" : "default",
  };

  const bodyStyle: React.CSSProperties = {
    padding: "1.25rem",
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onClick && setIsHovered(true)}
      onMouseLeave={() => onClick && setIsHovered(false)}
      className={clsx("overflow-hidden flex flex-col", className)}
      style={containerStyle}
    >
      {image && (
        <img
          src={image}
          alt={alt}
          className={clsx("w-full h-48 object-cover", imageClassName)}
        />
      )}

      <div className={clsx(contentClassName)} style={bodyStyle}>
        {title && (
          <ITText
            as="h3"
            className={clsx("text-xl font-semibold mb-2", titleClassName)}
          >
            {title}
          </ITText>
        )}
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

