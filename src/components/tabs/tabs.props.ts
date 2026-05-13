import { ReactNode } from "react";

export interface ITTabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface ITTabsProps {
  items: ITTabItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  variant?: 'line' | 'pill';
  className?: string;
  containerClassName?: string;
}
