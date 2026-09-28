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

/**
 * A titled group of sub-navigation items rendered under a parent menu.
 * Groups only add a visual heading: they are never clickable and never open
 * a third level (the sidebar supports exactly one level of nesting).
 */
export interface ITNavigationSubItemGroup {
  /** Unique identifier for the group. Used for the React key and the heading id. */
  id: string;
  /** Heading text rendered above the group's items. */
  label: string;
  /** Sub-items belonging to this group. Nesting a group inside a group is not supported. */
  items: ITNavigationSubItem[];
}

/**
 * A submenu entry: either a plain {@link ITNavigationSubItem} or a titled
 * {@link ITNavigationSubItemGroup}. Discriminate with `"items" in entry`.
 */
export type ITNavigationSubItemEntry =
  | ITNavigationSubItem
  | ITNavigationSubItemGroup;

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
  /**
   * Nested sub-navigation entries (renders as an expandable submenu).
   * Each entry is either a plain sub-item or a titled group of sub-items.
   * The field `items` is reserved for {@link ITNavigationSubItemGroup}.
   */
  subitems?: ITNavigationSubItemEntry[];
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
  /**
   * Optional content rendered above the navigation list (e.g. a wordmark).
   * Hidden while the sidebar is collapsed, so it only shows on hover.
   */
  header?: React.ReactNode;
}

