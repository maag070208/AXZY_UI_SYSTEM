import { ReactNode } from "react";

export interface ITBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ITBreadcrumbsProps {
  items: ITBreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}
