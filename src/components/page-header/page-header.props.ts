import { ReactNode } from "react";
import { ITBreadcrumbItem } from "../breadcrumbs/breadcrumbs.props";

export interface ITPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: ITBreadcrumbItem[];
  actions?: ReactNode;
  backAction?: () => void;
  icon?: ReactNode;
  iconColor?: string;
  className?: string;
}
