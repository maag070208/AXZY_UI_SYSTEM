/** Visual styles available for {@link ITChip}. */
export const chipVariants = {
  soft: "soft",
  filled: "filled",
  outlined: "outlined",
} as const;

/** Padding / font-size scale shared by all chip sizes. */
export const chipSizes = {
  sm: "text-[11px] px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
  lg: "text-sm px-3 py-1.5 gap-2",
} as const;
