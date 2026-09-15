export interface ITTopBarNavItem {
  /** Unique identifier for the navigation item. */
  id: string;
  /** Display label shown in the navigation bar. */
  label: string;
  /** Optional icon element rendered beside the label. */
  icon?: any;
  /** Click handler for this navigation item (legacy, prefer onNavItemClick). */
  action: () => void;
}

export interface ITTopBarProps {
  /** Optional logo element (e.g. an `<img>` or SVG component). */
  logo?: any;
  /** Text displayed next to the logo. */
  logoText?: string;
  /** User dropdown configuration including name, email, avatar, and menu items. */
  userMenu?: {
    /** Display name shown in the trigger button and dropdown header. */
    userName: string;
    /** User email shown in the trigger button and dropdown header. */
    userEmail: string;
    /** Optional avatar image URL. Falls back to a user-circle icon when omitted. */
    userImage?: string;
    /** Array of dropdown menu actions: `{ label: string, onClick: () => void }`. Items containing "salir", "cerrar", or "logout" are styled as destructive. */
    menuItems: { label: string; onClick: () => void }[];
  };
  /** Desktop navigation items rendered beside the logo. */
  navItems?: ITTopBarNavItem[];
  /** Callback fired when a navigation item is clicked. Receives the item's `id`. */
  onNavItemClick?: (id: string) => void;
  /** Whether to show the mobile hamburger menu toggle button. @default false */
  showMobileMenuButton?: boolean;
  /** Callback fired when the mobile menu toggle button is clicked. */
  onToggleMobileMenu?: () => void;
}
