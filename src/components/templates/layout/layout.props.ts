import { ITTopBarProps } from "@/components/organisms/topbar/topbar.props";
import { ITSidebarProps } from "@/components/organisms/sidebar/sidebar.props";

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
  /**
   * App-shell arrangement. `false` (default): the top bar spans the full width
   * and the sidebar sits below it. `true`: the sidebar spans the full viewport
   * height and shows the brand (`topBar.logo` + `topBar.logoText`) at its top,
   * while the top bar covers only the content column and drops the logo from
   * the `lg` breakpoint up. Mobile is unchanged. @default false
   */
  sidebarFullHeight?: boolean;
} 