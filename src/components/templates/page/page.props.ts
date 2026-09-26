import { ReactNode } from "react";
import { ITBreadcrumbItem } from "@/components/molecules/breadcrumbs/breadcrumbs.props";

/** Props for the ITPage component. */
export interface ITPageProps {
  /** Page title passed to the header. */
  title?: string;
  /** Description text shown below the title. */
  description?: string;
  /** Array of breadcrumb items for navigation context. */
  breadcrumbs?: ITBreadcrumbItem[];
  /** Action buttons rendered in the header. */
  actions?: ReactNode;
  /** Callback fired when the back button is clicked. */
  backAction?: () => void;
  /** Optional icon displayed next to the title. */
  icon?: ReactNode;
  /** Custom color for the icon. Accepts any valid CSS color value. */
  iconColor?: string;
  /** Whether the page is in a loading state. Shows skeleton placeholders when true. */
  loading?: boolean;
  /** Error message to display. Shows an error state with retry button when provided. */
  error?: string | null;
  /** Custom title for the error state. Default: "Error". */
  errorTitle?: string;
  /** Label for the retry button in the error state. Default: "Reintentar". */
  errorActionLabel?: string;
  /** Callback fired when the retry button is clicked in the error state. */
  onRetry?: () => void;
  /** Whether the page is in an empty state. Shows a placeholder when true. */
  empty?: boolean;
  /** Custom title for the empty state. Default: "Sin datos". */
  emptyTitle?: string;
  /** Custom description for the empty state. */
  emptyDescription?: string;
  /** Custom action element for the empty state. */
  emptyAction?: ReactNode;
  /** Additional CSS classes for the page wrapper. */
  className?: string;
  /** Content rendered inside the page wrapper. */
  children: ReactNode;
  /** Maximum width of the page content. Options: "2xl", "3xl", "4xl", "5xl", "6xl", "7xl". Default: "7xl". */
  maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  /** Whether to remove default padding from the page wrapper. Overrides `horizontalPadding`. */
  noPadding?: boolean;
  /**
   * Tailwind classes for the page wrapper's horizontal padding. Pass `"px-0"`
   * for edge-to-edge content, or a responsive scale like `"px-2 sm:px-4"`.
   *
   * Must be written as a literal: Tailwind scans source files, so a value
   * assembled at runtime will not be generated into the stylesheet.
   *
   * @default "px-4 sm:px-6 lg:px-8"
   */
  horizontalPadding?: string;
}
