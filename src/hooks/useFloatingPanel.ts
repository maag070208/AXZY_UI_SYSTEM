import { CSSProperties, RefObject, useCallback, useLayoutEffect, useRef, useState } from "react";

/** Options for {@link useFloatingPanel}. */
export interface UseFloatingPanelOptions {
  /** Fallback panel height in px, used before the panel is measured. */
  estimatedHeight?: number;
  /** Gap in px between the anchor and the panel. */
  offset?: number;
  /** When true, the panel width matches the anchor width. */
  matchWidth?: boolean;
  /** Horizontal alignment relative to the anchor. @default "start" */
  align?: "start" | "end";
  /** Panel z-index. */
  zIndex?: number;
}

/**
 * Computes a fixed position for a floating panel anchored to an element.
 *
 * Positions are relative to the viewport, so the panel must be rendered
 * through a portal (e.g. into `document.body`) to escape ancestors with
 * `overflow: hidden` or `transform`, which otherwise clip or re-anchor it.
 * When there is not enough room below, the panel flips above and its bottom
 * edge is pinned to the anchor's top, so it always stays adjacent regardless
 * of its real height. Repositions on scroll, resize, and panel resize.
 *
 * @param anchorRef - Ref to the element the panel is anchored to.
 * @param isOpen - Whether the panel is currently open.
 * @param options - Sizing and placement options.
 * @returns `panelRef` to attach to the portaled panel and the `style` to apply.
 */
export function useFloatingPanel(
  anchorRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  {
    estimatedHeight = 300,
    offset = 4,
    matchWidth = true,
    align = "start",
    zIndex = 70,
  }: UseFloatingPanelOptions = {}
) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const update = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const panelHeight = panelRef.current?.offsetHeight || estimatedHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const flipAbove = spaceBelow < panelHeight + offset && spaceAbove > spaceBelow;

    const width = matchWidth ? rect.width : undefined;
    const panelWidth = panelRef.current?.offsetWidth ?? width ?? 0;
    let left =
      align === "end" && panelWidth
        ? rect.right - panelWidth
        : rect.left;
    if (panelWidth) {
      left = Math.max(8, Math.min(left, viewportWidth - panelWidth - 8));
    }

    setStyle({
      position: "fixed",
      left,
      width,
      zIndex,
      ...(flipAbove
        ? { top: "auto", bottom: viewportHeight - rect.top + offset }
        : { top: rect.bottom + offset, bottom: "auto" }),
    });
  }, [anchorRef, estimatedHeight, offset, matchWidth, align, zIndex]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    const observer = new ResizeObserver(update);
    if (panelRef.current) observer.observe(panelRef.current);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [isOpen, update]);

  return { panelRef, style };
}

export default useFloatingPanel;
