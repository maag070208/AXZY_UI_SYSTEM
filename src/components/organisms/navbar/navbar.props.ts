// navbar.props.ts

/** Represents a navigation item in the sidebar. */
export interface ITNavigationItem {
  /** Unique identifier for the navigation item. */
  id: string;
  /** Display label for the navigation item. */
  label: string;
  /** Optional icon rendered next to the label. */
  icon?: React.ReactNode;
  /** Callback fired when the item is clicked. */
  action?: () => void;
  /** Whether the item is currently active and highlighted. */
  isActive?: boolean;
  /** Optional nested sub-navigation items. */
  subitems?: ITNavigationSubItem[];
}

/** Represents a sub-navigation item within a parent navigation item. */
export interface ITNavigationSubItem {
  /** Unique identifier for the sub-item. */
  id: string;
  /** Display label for the sub-item. */
  label: string;
  /** Callback fired when the sub-item is clicked. */
  action: () => void;
  /** Whether the sub-item is currently active and highlighted. */
  isActive?: boolean;
}

/** Props for the ITNavbar component. */
export interface ITNavbarProps {
  /** Logo element rendered in the sidebar header. */
  logo?: React.ReactNode;
  /** Text displayed next to the logo. */
  logoText?: string;
  /** Array of navigation items for the main sidebar menu. */
  navigationItems?: ITNavigationItem[];
  /** User menu configuration including avatar, name, email, and dropdown items. */
  userMenu?: {
    /** URL for the user's profile image. */
    userImage?: string;
    /** Display name of the user. */
    userName: string;
    /** Email address of the user. */
    userEmail: string;
    /** Dropdown menu items for the user menu. */
    menuItems: Array<{
      /** Display label for the menu item. */
      label: string;
      /** Callback fired when the menu item is clicked. */
      onClick: () => void;
    }>;
  };
  /** Content rendered in the main area next to the sidebar. */
  children?: React.ReactNode;
  /** Legacy navigation items. Use `navigationItems` instead.
   * @deprecated
   */
  navItems?: React.ReactNode;
  /** Legacy flag to show the sidebar.
   * @deprecated
   */
  showSidebar?: boolean;
  /** Legacy flag to show the sidebar on mobile devices.
   * @deprecated
   */
  showSidebarOnMobile?: boolean;
  /** Legacy sidebar items. Use `navigationItems` instead.
   * @deprecated
   */
  sidebarItems?: React.ReactNode;
}
