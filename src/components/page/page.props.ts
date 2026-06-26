import { ReactNode } from "react";
import { ITBreadcrumbItem } from "../breadcrumbs/breadcrumbs.props";

export interface ITPageProps {
  title?: string;
  description?: string;
  breadcrumbs?: ITBreadcrumbItem[];
  actions?: ReactNode;
  backAction?: () => void;
  icon?: ReactNode;
  iconColor?: string;
  loading?: boolean;
  error?: string | null;
  errorTitle?: string;
  errorActionLabel?: string;
  onRetry?: () => void;
  empty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  className?: string;
  children: ReactNode;
  maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  noPadding?: boolean;
}
