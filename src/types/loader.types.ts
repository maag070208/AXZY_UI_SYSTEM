export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderVariant = "spinner" | "dots" | "bar" | "pulse";

export const sizeClasses: Record<LoaderSize, string> = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};
