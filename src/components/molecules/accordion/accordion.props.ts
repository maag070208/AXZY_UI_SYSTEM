import { ReactNode } from "react";

/** A single collapsible section inside {@link ITAccordionProps}. */
export interface ITAccordionItem {
  /** Unique identifier for the item. */
  id: string;
  /** Header content (usually text). */
  title: ReactNode;
  /** Body content revealed when the item is open. */
  content: ReactNode;
  /** Optional icon rendered before the title. */
  icon?: ReactNode;
  /** Disables toggling for this item. @default false */
  disabled?: boolean;
}

/** Props for the ITAccordion component. */
export interface ITAccordionProps {
  /** Sections to render. */
  items: ITAccordionItem[];
  /** Allows more than one section open at the same time. @default false */
  allowMultiple?: boolean;
  /** Ids open on first render (uncontrolled mode). */
  defaultOpenIds?: string[];
  /** Controlled list of open ids. When provided, the component is controlled. */
  openIds?: string[];
  /** Fired with the next list of open ids whenever a section toggles. */
  onChange?: (openIds: string[]) => void;
  /** Visual style. Valid values: `"default"`, `"separated"`, `"bordered"`. @default "separated" */
  variant?: "default" | "separated" | "bordered";
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Additional CSS classes applied to every item. */
  itemClassName?: string;
}
