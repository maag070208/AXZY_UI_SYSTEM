import { ITTopBarProps } from '../topbar/topbar.props';
import { ITSidebarProps } from '../sidebar/sidebar.props';
export interface ITLayoutProps {
    topBar: ITTopBarProps;
    sidebar: ITSidebarProps;
    children: React.ReactNode;
    className?: string;
}
