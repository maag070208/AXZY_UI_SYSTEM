import { ReactNode } from "react";

export interface ITEmptyStateProps {
  /** Icon or illustration displayed above the title. @default <FaInbox size={40} /> */
  icon?: ReactNode;
  /** Primary heading text (required). */
  title: string;
  /** Secondary explanatory text shown below the title. */
  description?: string;
  /** Action element (typically a button) rendered below the description. */
  action?: ReactNode;
  /** Additional CSS classes for the wrapper element. */
  className?: string;
}
