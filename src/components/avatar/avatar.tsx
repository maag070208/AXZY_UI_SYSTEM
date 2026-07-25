import clsx from "clsx";
import { ITAvatarProps, AvatarSize } from "./avatar.props";
import ITText from "@/components/text/text";

const sizeMap: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]" },
  sm: { container: "w-8 h-8", text: "text-xs" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-12 h-12", text: "text-base" },
  xl: { container: "w-16 h-16", text: "text-xl" },
};

const DEFAULT_COLOR = "bg-primary-600";
const DEFAULT_BG = "var(--color-primary-600)";
const DEFAULT_SHADOW = "0 4px 14px 0 rgba(37, 99, 235, 0.35)";

/**
 * Circular avatar component with image, initials fallback, and optional badge overlay.
 *
 * @example
 * <ITAvatar src="/avatar.jpg" alt="John Doe" size="lg" badge={<span className="w-2.5 h-2.5 bg-success-500 rounded-full" />} />
 *
 * @example
 * <ITAvatar initials="JD" size="md" color="bg-purple-600" />
 */
export default function ITAvatar({
  src,
  alt = "",
  initials,
  size = "md",
  color = DEFAULT_COLOR,
  className,
  badge,
  onClick,
}: ITAvatarProps) {
  const { container, text } = sizeMap[size];
  const useInlineStyle = !color || color === DEFAULT_COLOR;

  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden text-white font-bold tracking-wide",
        container,
        !useInlineStyle && color,
        className,
      )}
      style={useInlineStyle ? { backgroundColor: DEFAULT_BG, boxShadow: DEFAULT_SHADOW } : undefined}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className={clsx("flex items-center justify-center w-full h-full", text)}>
          <ITText as="span" className="text-white">{initials || alt.charAt(0).toUpperCase() || "?"}</ITText>
        </span>
      )}
      {badge && (
        <div className="absolute -bottom-0.5 -right-0.5">
          {badge}
        </div>
      )}
    </div>
  );
}
