export interface ITNavigationItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    action?: () => void;
    isActive?: boolean;
    subitems?: ITNavigationSubItem[];
}
export interface ITNavigationSubItem {
    id: string;
    label: string;
    action: () => void;
    isActive?: boolean;
}
export interface ITNavbarProps {
    logo?: React.ReactNode;
    logoText?: string;
    navigationItems?: ITNavigationItem[];
    userMenu?: {
        userImage?: string;
        userName: string;
        userEmail: string;
        menuItems: Array<{
            label: string;
            onClick: () => void;
        }>;
    };
    children?: React.ReactNode;
    navItems?: React.ReactNode;
    showSidebar?: boolean;
    showSidebarOnMobile?: boolean;
    sidebarItems?: React.ReactNode;
}
