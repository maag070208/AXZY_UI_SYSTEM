import clsx from "clsx";
import { ITSkeletonProps, SkeletonVariant } from "./skeleton.props";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded-md h-4 w-full",
  circular: "rounded-full",
  rectangular: "rounded-lg",
};

export default function ITSkeleton({
  variant = "text",
  width,
  height,
  count = 1,
  className,
  style,
}: ITSkeletonProps) {
  const baseStyle: React.CSSProperties = {
    ...(width ? { width } : variant === "text" ? {} : width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={clsx(
            "animate-pulse bg-slate-200 dark:bg-slate-700",
            variantClasses[variant],
            variant === "text" && count > 1 && i < count - 1 && "mb-2",
            className
          )}
          style={{
            ...baseStyle,
            width: variant === "text" && width === undefined ? `${Math.random() * 30 + 60}%` : width,
          }}
        />
      ))}
    </>
  );
}
