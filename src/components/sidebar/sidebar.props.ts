/** A sub-navigation item nested under a parent menu. */
export interface ITNavigationSubItem {
  /** Unique identifier for the sub-item. */
  id: string;
  /** Display label. */
  label: string;
  /** Click handler. */
  action?: () => void;
  /** Whether this sub-item is currently active/highlighted. */
  isActive?: boolean;
}

/** A top-level navigation item, optionally with sub-items. */
export interface ITNavigationItem {
  /** Unique identifier. */
  id: string;
  /** Display label. */
  label: string;
  /** Icon component rendered left of the label. */
  icon?: React.ReactNode;
  /** Click handler for top-level items without submenus. */
  action?: () => void;
  /** Whether this item is currently active/highlighted. */
  isActive?: boolean;
  /** Nested sub-navigation items (renders as expandable submenu). */
  subitems?: ITNavigationSubItem[];
  /** Badge text displayed on the item (e.g. notification count). */
  badge?: string;
}

/** Props for the ITSidebar vertical navigation component. */
export interface ITSidebarProps {
  /** Navigation structure: top-level items with optional sub-items. */
  navigationItems: ITNavigationItem[];
  /** Whether the sidebar is collapsed to icon-only mode. */
  isCollapsed?: boolean;
  /** Callback when the user toggles collapse via the toggle button. */
  onToggleCollapse?: () => void;
  /** Force sidebar visible on mobile breakpoints. */
  visibleOnMobile?: boolean; 
  /** Callback when a top-level navigation item is clicked. Receives the item. */
  onItemClick?: (item: ITNavigationItem) => void;
  /** Callback when a sub-navigation item is clicked. Receives the sub-item. */
  onSubItemClick?: (subitem: ITNavigationSubItem) => void;
  /** Visual connector style for sub-items: "dot" | "|" | "none". Default: "dot". */
  subitemConnector?: 'dot' | '|' | 'none';
  /** Additional CSS classes on the sidebar `<aside>`. */
  className?: string;
}

