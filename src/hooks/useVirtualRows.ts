import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from "react";

/** Options for {@link useVirtualRows}. */
export interface UseVirtualRowsOptions {
  /** Total number of rows in the dataset being windowed. */
  count: number;
  /** Assumed uniform row height in pixels. Values `<= 0` disable windowing. */
  rowHeight: number;
  /** Extra rows rendered above and below the viewport. @default 5 */
  overscan?: number;
  /** When `false`, no listeners are attached and the full range is returned. @default true */
  enabled?: boolean;
  /**
   * When this value changes, `scrollTop` is reset to `0` both in state and on
   * the scroll element. Pass a page/size signature so pagination resets scroll.
   */
  resetKey?: string | number;
}

/** Result of {@link useVirtualRows}. */
export interface UseVirtualRowsResult {
  /** Attach to the scrollable container that holds the rows. */
  scrollRef: RefObject<HTMLDivElement | null>;
  /** First row index (inclusive) that should be rendered. */
  startIndex: number;
  /** Last row index (inclusive) that should be rendered. */
  endIndex: number;
  /** Pixel height of the top spacer row. */
  topSpacerHeight: number;
  /** Pixel height of the bottom spacer row. */
  bottomSpacerHeight: number;
  /** Current scroll offset in pixels. */
  scrollTop: number;
  /** Imperatively resets scroll to the top. */
  scrollToTop: () => void;
}

/**
 * Zero-dependency row virtualizer for scroll containers. Tracks the scroll
 * offset and viewport height of the element referenced by `scrollRef`, then
 * computes the inclusive index window that must be rendered plus the spacer
 * heights that preserve the full scroll height.
 *
 * @example
 * const { scrollRef, startIndex, endIndex, topSpacerHeight, bottomSpacerHeight } =
 *   useVirtualRows({ count: rows.length, rowHeight: 44, overscan: 5, enabled: virtualized, resetKey: page });
 * // render rows.slice(startIndex, endIndex + 1) between spacer rows of the given heights
 */
export function useVirtualRows({
  count,
  rowHeight,
  overscan = 5,
  enabled = true,
  resetKey,
}: UseVirtualRowsOptions): UseVirtualRowsResult {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const scrollToTop = useCallback(() => {
    setScrollTop(0);
    const element = scrollRef.current;
    if (element) element.scrollTop = 0;
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    const element = scrollRef.current;
    if (!element) return;

    const onScroll = () => setScrollTop(element.scrollTop);
    const measure = () => setViewportHeight(element.clientHeight);

    measure();
    setScrollTop(element.scrollTop);

    element.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => {
      element.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled) return;
    const element = scrollRef.current;
    if (element) element.scrollTop = 0;
    setScrollTop(0);
  }, [resetKey, enabled]);

  const valid = enabled && rowHeight > 0 && count > 0;
  const safeScrollTop = valid ? scrollTop : 0;

  const startIndex = valid
    ? Math.min(count - 1, Math.max(0, Math.floor(safeScrollTop / rowHeight) - overscan))
    : 0;
  const endIndex = valid
    ? Math.min(
        count - 1,
        Math.ceil((safeScrollTop + viewportHeight) / rowHeight) + overscan
      )
    : Math.max(0, count - 1);

  const topSpacerHeight = valid ? startIndex * rowHeight : 0;
  const bottomSpacerHeight = valid
    ? Math.max(0, (count - 1 - endIndex) * rowHeight)
    : 0;

  return {
    scrollRef,
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
    scrollTop: safeScrollTop,
    scrollToTop,
  };
}

export default useVirtualRows;
