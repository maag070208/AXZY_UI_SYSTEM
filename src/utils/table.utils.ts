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
