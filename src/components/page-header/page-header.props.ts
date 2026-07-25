import { ReactNode } from "react";
import { ITBreadcrumbItem } from "../breadcrumbs/breadcrumbs.props";

/** Props for the ITPageHeader component. */
export interface ITPageHeaderProps {
  /** Page title displayed as the main heading. */
  title: string;
  /** Optional description text shown below the title. */
  description?: string;
  /** Array of breadcrumb items for navigation context. */
  breadcrumbs?: ITBreadcrumbItem[];
  /** Action buttons or elements rendered on the right side. */
  actions?: ReactNode;
  /** Callback fired when the back button is clicked. */
  backAction?: () => void;
  /** Optional icon displayed next to the title. */
  icon?: ReactNode;
  /** Custom color for the icon. Accepts any valid CSS color value. */
  iconColor?: string;
  /** Additional CSS classes for the container. */
  className?: string;
}
