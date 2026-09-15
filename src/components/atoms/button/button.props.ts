import { buttonVariants } from "@/types/button.types";
import { ColorsTypes } from "@app/types/colors.types";
import { SizesTypes } from "@app/types/sizes.types";

export interface ITButtonProps {
  /** Button text label. Overridden if `children` is provided. */
  label?: string
  /** Custom content to render inside the button. Takes precedence over `label`. */
  children?: React.ReactNode;
  /** Icon element rendered before the label. */
  icon?: React.ReactNode;
  /** Click handler for the button. */
  onClick?: () => void;
  /** Color theme key. Values come from the semantic color palette (e.g. `"primary"`, `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"purple"`, `"error"`, `"gray"`). @default "primary" */
  color?: ColorsTypes;
  /** Button size. Valid values: `"small"`, `"medium"`, `"large"`. @default "medium" */
  size?: SizesTypes;
  /** Button visual style. Valid values: `"filled"`, `"outlined"`, `"raised"`, `"rounded"`, `"text"`, `"raised-text"`, `"icon-only"`, `"link"`. @default "filled" */
  variant?: keyof typeof buttonVariants;
  /** Disables the button interaction and applies reduced opacity. @default false */
  disabled?: boolean;
  /** Additional CSS class names for the button element. */
  className?: string;
  /** HTML button type attribute. Valid values: `"submit"`, `"reset"`, `"button"`. @default "button" */
  type?: "submit" | "reset" | "button" | undefined;
  /** Accessible label for screen readers. Falls back to `label` if not set. */
  ariaLabel?: string;
  /** HTML title attribute for native tooltip. Falls back to `ariaLabel` or `label`. */
  title?: string;
}
