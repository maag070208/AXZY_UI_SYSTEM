export interface ITNavigationSubItem {
    id: string;
    label: string;
    action: () => void;
    isActive?: boolean;
}
export interface ITNavigationItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    action?: () => void;
    isActive?: boolean;
    subitems?: ITNavigationSubItem[];
    badge?: string;
}
export interface ITSidebarProps {
    navigationItems: ITNavigationItem[];
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    visibleOnMobile?: boolean;
    className?: string;
}
