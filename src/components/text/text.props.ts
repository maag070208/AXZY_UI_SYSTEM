import { ReactNode, ElementType, HTMLAttributes } from "react";

export interface ITTextProps extends HTMLAttributes<HTMLElement> {
  /** The content rendered inside the element. */
  children?: ReactNode;
  /** Additional CSS classes applied to the element. */
  className?: string;
  /** HTML element type to render (e.g. "p", "span", "h1", "label"). */
  as?: ElementType;
  /** Applies muted text color (--color-text-muted) when true. */
  muted?: boolean;
  /** Associates a label with a form element (rendered as `htmlFor` when `as` is "label"). */
  htmlFor?: string;
}
