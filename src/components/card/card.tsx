import clsx from "clsx";
import { ITCardProps } from "./card.props";
import { theme } from "@/theme/theme";
import { useState } from "react";

/**
 * Componente de tarjeta (Card) personalizable.
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
  const cardTheme = theme.card;

  const containerStyle: React.CSSProperties = {
    backgroundColor: cardTheme.backgroundColor,
    borderColor: cardTheme.borderColor,
    borderWidth: cardTheme.borderWidth,
    borderRadius: cardTheme.borderRadius,
    boxShadow: onClick ? (isHovered ? cardTheme.hover.shadow : cardTheme.shadow) : 'none',
    transition: onClick ? 'all 0.2s ease-in-out' : 'none',
    cursor: onClick ? 'pointer' : 'default',
  };

  const bodyStyle: React.CSSProperties = {
    padding: cardTheme.body.padding,
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onClick && setIsHovered(true)}
      onMouseLeave={() => onClick && setIsHovered(false)}
      className={clsx(
        "overflow-hidden flex flex-col",
        className
      )}
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
          <h3
            className={clsx(
              "text-xl font-semibold mb-2 text-gray-800",
              titleClassName
            )}
          >
            {title}
          </h3>
        )}
        <div className="text-gray-600">{children}</div>
      </div>
      {actions && (
        <div className={clsx("p-4 border-t border-gray-100 mt-auto", actionClassName)}>
          {actions}
        </div>
      )}
    </div>
  );
}
