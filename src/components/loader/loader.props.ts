import { LoaderSize, LoaderVariant } from "@/types/loader.types";

export interface LoaderProps {
  /** Loader size: "sm" | "md" | "lg" | "xl" */
  size?: LoaderSize;
  /** Animation variant: "spinner" | "dots" | "bar" | "pulse" */
  variant?: LoaderVariant;
  /** Color value. Can be a theme semantic color key, hex string, rgb string, or CSS class */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}
