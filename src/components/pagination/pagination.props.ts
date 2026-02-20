export interface ITPaginationProps {
  /**
   * Current active page (1-indexed).
   */
  currentPage: number;

  /**
   * Total number of pages available.
   */
  totalPages: number;

  /**
   * Callback fired when a page is clicked or next/prev is activated.
   */
  onPageChange: (page: number) => void;

  /**
   * Number of visible pages before and after the current page.
   * Default: 1
   */
  siblingCount?: number;

  /**
   * Semantic color from the theme (primary, secondary, success, danger, warning, info, purple).
   * Default: primary
   */
  color?: string;

  /**
   * Additional CSS classes for the container.
   */
  className?: string;

  /**
   * Options for items per page selector.
   */
  itemsPerPageOptions?: number[];

  /**
   * Current items per page value. Required if itemsPerPageOptions is provided.
   */
  itemsPerPage?: number;

  /**
   * Callback fired when items per page is changed.
   */
  onItemsPerPageChange?: (value: number) => void;

  /**
   * Total number of items across all pages. Used to render "1-10 of 50" text.
   */
  totalItems?: number;
}
