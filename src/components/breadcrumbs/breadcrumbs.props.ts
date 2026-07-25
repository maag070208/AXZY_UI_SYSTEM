import { ReactNode } from "react";

export interface ITBreadcrumbItem {
  /** Display text for the breadcrumb segment. */
  label: string;
  /** URL for the breadcrumb link. Renders an `<a>` tag. */
  href?: string;
  /** Click handler for the breadcrumb. Renders a `<button>` when no `href` is set. */
  onClick?: () => void;
}

export interface ITBreadcrumbsProps {
  /** Ordered array of breadcrumb items. The last item is rendered as plain text (current page). */
  items: ITBreadcrumbItem[];
  /** Custom separator element rendered between items. @default <FaChevronRight size={10} /> */
  separator?: ReactNode;
  /** Additional CSS class names for the `<nav>` container. */
  className?: string;
}
