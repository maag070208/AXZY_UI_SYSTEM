export interface ITTopBarNavItem {
  id: string;
  label: string;
  icon?: any;
  action: () => void;
}

export interface ITTopBarProps {
  logo?: any;
  logoText?: string;
  userMenu?: {
    userName: string;
    userEmail: string;
    userImage?: string;
    menuItems: { label: string; onClick: () => void }[];
  };
  navItems?: ITTopBarNavItem[];
  onNavItemClick?: (id: string) => void;
  showMobileMenuButton?: boolean;
  onToggleMobileMenu?: () => void;
}
