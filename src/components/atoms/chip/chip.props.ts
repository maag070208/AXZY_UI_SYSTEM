import { chipVariants } from "@/types/chip.types";
import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";
import { ReactNode } from "react";

/** Props for the ITChip tag/pill component. */
export interface ITChipProps {
  /** Text label displayed inside the chip. Overridden if `children` is provided. */
  label?: string;
  /** Custom content rendered inside the chip. Takes precedence over `label`. */
  children?: ReactNode;
  /** Color theme key from the semantic palette (e.g. `"primary"`, `"success"`, `"danger"`). @default "secondary" */
  color?: ColorsTypes;
  /** Chip size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
  size?: SizesTypes;
  /** Visual style. Valid values: `"soft"`, `"filled"`, `"outlined"`. @default "soft" */
  variant?: keyof typeof chipVariants;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  /** Shows a remove (X) button at the end of the chip. @default false */
  removable?: boolean;
  /** Callback fired when the remove button is pressed. */
  onRemove?: () => void;
  /** Makes the chip clickable (filter/toggle usage). */
  onClick?: () => void;
  /** Highlights the chip as selected, using the `color` palette. @default false */
  selected?: boolean;
  /** Disables all chip interactions and reduces opacity. @default false */
  disabled?: boolean;
  /** Additional CSS classes for the chip element. */
  className?: string;
}
