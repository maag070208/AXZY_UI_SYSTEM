import { badgeVariants } from "@/types/badget.types";
import { ColorsTypes } from "@/types/colors.types";
import { SizesTypes } from "@/types/sizes.types";

export interface ITBadgetProps {
  label?: string;
  children?: React.ReactNode;
  color?: ColorsTypes;
  size?: SizesTypes;
  variant?: keyof typeof badgeVariants;
  className?: string;
}
