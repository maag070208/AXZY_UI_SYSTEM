import { ColorsTypes } from "./colors.types";

export const badgeVariants = {
  filled: "filled",
  outlined: "outlined",
} as const;

export const badgeColors = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-secondary-500 text-white",
  success: "bg-success-500 text-white",
  danger: "bg-danger-500 text-white",
  warning: "bg-warning-500 text-black",
  purple: "bg-purple-500 text-white",
} as const;

export const outlinedBadgeColors = {
  primary: "bg-primary-200 border border-primary-500 text-primary-700",
  secondary: "bg-secondary-200 border border-secondary-500 text-secondary-700",
  success: "bg-success-200 border border-success-500 text-success-700",
  danger: "bg-danger-200 border border-danger-500 text-danger-700",
  warning: "bg-warning-200 border border-warning-500 text-warning-700",
  purple: "bg-purple-200 border border-purple-500 text-purple-700",
} as const;

export const badgeSizes = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-1.5",
  large: "text-base px-4 py-2",
} as const;

export const getBadgeColorClasses = (color: ColorsTypes, variant: keyof typeof badgeVariants) => {
  if (variant === "outlined") {
    return outlinedBadgeColors[color];
  }
  return badgeColors[color];
};