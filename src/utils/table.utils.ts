export const formatCurrencyMX = (value: number) => {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};

export const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * CSS selector matching any element that should swallow a row/card click
 * instead of letting it bubble up to the row activation handler. Covers native
 * interactive elements plus anything explicitly opted out with
 * `data-row-click-ignore`.
 */
export const ROW_CLICK_IGNORE_SELECTOR =
  'button, a, input, select, textarea, [role="button"], [role="link"], [data-row-click-ignore]';

/**
 * Returns `true` when the event target (or one of its ancestors) is an
 * interactive element that must not trigger the row/card `onRowClick` handler.
 *
 * @param target - The event target to inspect (usually `event.target`).
 * @param boundary - Optional activation container (usually `event.currentTarget`).
 *   When the matched interactive element is the boundary itself it is ignored,
 *   because the cards-view wrapper carries `role="button"` for accessibility and
 *   would otherwise swallow its own activation. Only interactive descendants
 *   block the handler.
 */
export function isInteractiveTarget(
  target: EventTarget | null,
  boundary: EventTarget | null = null
): boolean {
  if (!(target instanceof Element)) return false;
  const interactive = target.closest(ROW_CLICK_IGNORE_SELECTOR);
  if (!interactive) return false;
  if (boundary instanceof Node && interactive === boundary) return false;
  return true;
}

// ──────────────────────────────────────────────
//   PINNED (FROZEN) TABLE COLUMNS
// ──────────────────────────────────────────────

/** Horizontal edge a table column can be pinned to, used by `Column.pinned`. */
export type TablePinnedSide = "left" | "right";

/**
 * Structural shape required to compute pinned offsets. Kept loose (not tied to
 * `Column<T>`) so any column-like definition can be passed without importing
 * the table props module.
 */
type PinnableColumn = {
  /** Unique column key; also the map key in the returned metadata. */
  key: string;
  /** Edge the column is frozen to, if any. */
  pinned?: "left" | "right";
  /** Declared width; a pixel `number` / `"<n>px"` string drives the offset. */
  width?: number | string;
  /** Fallback offset width (px) when `width` is not a pixel value. */
  minWidth?: number;
};

/** Sticky metadata for one pinned column. */
export interface PinnedColumnMeta {
  /** Edge the column is frozen to. */
  side: TablePinnedSide;
  /** Distance (px) from that edge to the column's sticky position. */
  offset: number;
}

/**
 * Pixel width a pinned column contributes to the accumulated sticky offset.
 * Numbers are pixels; `"<n>px"` strings are parsed; every other length
 * (`%`, `rem`, `em`, …) falls back to `minWidth ?? 0`.
 */
function pinnedColumnWidth(col: PinnableColumn): number {
  if (typeof col.width === "number") return col.width;
  if (typeof col.width === "string" && /^\d+(\.\d+)?px$/.test(col.width.trim())) {
    return parseFloat(col.width);
  }
  return col.minWidth ?? 0;
}

/**
 * Computes the sticky `offset` for every pinned column in a table.
 *
 * Left-pinned columns accumulate forward in document order; right-pinned
 * columns accumulate backward. Only pinned columns appear in the returned map,
 * keyed by `col.key`. A column whose width is not resolvable to pixels
 * contributes `minWidth ?? 0`, so declare a pixel `width` on every pinned
 * column of the same side to keep offsets aligned.
 *
 * @param columns - Column definitions in render order.
 * @returns Map of pinned column `key` → `{ side, offset }`.
 */
export function getPinnedColumnMeta<T extends PinnableColumn>(
  columns: T[]
): Record<string, PinnedColumnMeta> {
  const meta: Record<string, PinnedColumnMeta> = {};

  // Left edge: walk forward, accumulating widths of preceding left-pinned columns.
  let leftOffset = 0;
  for (const col of columns) {
    if (col.pinned === "left") {
      meta[col.key] = { side: "left", offset: leftOffset };
      leftOffset += pinnedColumnWidth(col);
    }
  }

  // Right edge: walk backward, accumulating widths of preceding right-pinned columns.
  let rightOffset = 0;
  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i];
    if (col.pinned === "right") {
      meta[col.key] = { side: "right", offset: rightOffset };
      rightOffset += pinnedColumnWidth(col);
    }
  }

  return meta;
}
