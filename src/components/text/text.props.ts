import { ReactNode, ElementType, HTMLAttributes } from "react";

export interface ITTextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  muted?: boolean;
  htmlFor?: string;
}
