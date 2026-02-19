import { buttonVariants } from "@/types/button.types";
import { ColorsTypes } from "@app/types/colors.types";
import { SizesTypes } from "@app/types/sizes.types";

export interface ITButtonProps {
  label?: string
  children?: React.ReactNode;
  onClick?: () => void;
  color?: ColorsTypes;
  size?: SizesTypes;
  variant?: keyof typeof buttonVariants;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  ariaLabel?: string;
  title?: string;
}
