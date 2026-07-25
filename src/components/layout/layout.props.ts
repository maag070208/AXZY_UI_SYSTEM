import { ITTopBarProps } from "../topbar/topbar.props";
import { ITSidebarProps } from "../sidebar/sidebar.props";

export interface ITLayoutProps {
  /** Top bar configuration and props */
  topBar: ITTopBarProps;
  /** Sidebar configuration and props */
  sidebar: ITSidebarProps;
  /** Main content rendered in the center area */
  children: React.ReactNode;
  /** Additional CSS classes for the outermost wrapper */
  className?: string;
  /** Additional CSS classes for the content container */
  contentClassName?: string;
} 