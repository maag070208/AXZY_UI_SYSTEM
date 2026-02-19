export type TableVariants = "default" | "striped" | "bordered";

export type TableSize = "sm" | "md" | "lg";

export const variantStyles: Record<TableVariants, string> = {
  default: "",
  striped: "divide-y divide-gray-200",
  bordered: "border border-gray-200",
};

export const sizeStyles: Record<TableSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
};
