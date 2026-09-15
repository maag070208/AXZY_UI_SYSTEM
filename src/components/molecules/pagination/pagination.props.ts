/** Props for the ITPagination component. */
export interface ITPaginationProps {
  /** Current active page (1-indexed). */
  currentPage: number;

  /** Total number of pages available. */
  totalPages: number;

  /** Callback fired when a page is clicked or prev/next is activated. Receives the new page number. */
  onPageChange: (page: number) => void;

  /** Number of visible page siblings before and after the current page. Default: 1. */
  siblingCount?: number;

  /** Semantic color from the theme. Options: primary, secondary, success, danger, warning, info, purple. Default: "primary". */
  color?: string;

  /** Additional CSS classes for the container. */
  className?: string;

  /** Available options for the items-per-page selector dropdown. */
  itemsPerPageOptions?: number[];

  /** Current items per page value. Required if `itemsPerPageOptions` is provided. */
  itemsPerPage?: number;

  /** Callback fired when the items per page value is changed. */
  onItemsPerPageChange?: (value: number) => void;

  /** Total number of items across all pages. Used to render the "1-10 of 50" summary text. */
  totalItems?: number;
}
