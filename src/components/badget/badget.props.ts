import { badgeVariants } from "@/types/badget.types";
import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";

export interface ITBadgetProps {
  /** Text label displayed inside the badge. Overridden if `children` is provided. */
  label?: string;
  /** Custom content to render inside the badge. Takes precedence over `label`. */
  children?: React.ReactNode;
  /** Color theme key. Values come from the semantic color palette (e.g. `"primary"`, `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"purple"`, `"error"`, `"gray"`). @default "primary" */
  color?: ColorsTypes;
  /** Badge size. Valid values: `"small"`, `"medium"`, `"large"`. @default "medium" */
  size?: SizesTypes;
  /** Badge visual style. Valid values: `"filled"`, `"outlined"`. @default "filled" */
  variant?: keyof typeof badgeVariants;
  /** Additional CSS class names for the badge element. */
  className?: string;
}
