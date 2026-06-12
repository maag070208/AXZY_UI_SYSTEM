import clsx from "clsx";
import { ITAvatarProps, AvatarSize } from "./avatar.props";

const sizeMap: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]" },
  sm: { container: "w-8 h-8", text: "text-xs" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-12 h-12", text: "text-base" },
  xl: { container: "w-16 h-16", text: "text-xl" },
};

export default function ITAvatar({
  src,
  alt = "",
  initials,
  size = "md",
  color = "bg-primary-500",
  className,
  badge,
  onClick,
}: ITAvatarProps) {
  const { container, text } = sizeMap[size];

  return (
    <div
      className={clsx("relative inline-flex items-center justify-center rounded-full flex-shrink-0", container, className)}
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
        <div className={clsx("w-full h-full rounded-full flex items-center justify-center text-white font-semibold", text, color)}>
          {initials || alt.charAt(0).toUpperCase() || "?"}
        </div>
      )}
      {badge && (
        <div className="absolute -bottom-0.5 -right-0.5">
          {badge}
        </div>
      )}
    </div>
  );
}
