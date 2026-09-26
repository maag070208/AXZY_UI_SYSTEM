import { useCallback, useEffect, useState } from "react";
import { GROUP_SLUGS, groupBySlug, isValidItem } from "./navigation";

/** Top-level sandbox views. `home` is the untouched portfolio. */
export type SandboxView = "home" | "ui-system";

/** Parsed representation of `window.location.hash`. */
export interface HashRoute {
  /** Which top-level view the hash points at. */
  view: SandboxView;
  /** Internal group id (`forms`, `data`, …) or `null` on the landing. */
  group: string | null;
  /** Item id (`input`, `table`, …) or `null` for a group-only route. */
  item: string | null;
  /** Raw hash exactly as read from the URL (used by the 404 page). */
  raw: string;
  /** Whether the route resolved to a real page. `false` → render 404. */
  valid: boolean;
}

/**
 * Parse a location hash into a `HashRoute`.
 *
 * Rules:
 * - empty / first segment !== `ui-system` → portfolio (`home`).
 * - `#ui-system` → landing.
 * - `#ui-system/<group-slug>` → group landing (valid, `item` null).
 * - `#ui-system/<group-slug>/<item-id>` → page (valid) or 404 when unknown.
 * - more than 3 segments → 404.
 */
export function parseHash(hash: string): HashRoute {
  const raw = hash;
  const clean = hash.startsWith("#") ? hash.slice(1) : hash;
  const parts = clean.split("/").filter(Boolean);

  if (parts.length === 0 || parts[0] !== "ui-system") {
    return { view: "home", group: null, item: null, raw, valid: true };
  }

  if (parts.length === 1) {
    return { view: "ui-system", group: null, item: null, raw, valid: true };
  }

  if (parts.length === 2) {
    const group = groupBySlug(parts[1]);
    if (!group) {
      return { view: "ui-system", group: null, item: null, raw, valid: false };
    }
    return { view: "ui-system", group: group.id, item: null, raw, valid: true };
  }

  if (parts.length === 3) {
    const group = groupBySlug(parts[1]);
    if (!group || !isValidItem(group.id, parts[2])) {
      return {
        view: "ui-system",
        group: group?.id ?? null,
        item: null,
        raw,
        valid: false,
      };
    }
    return { view: "ui-system", group: group.id, item: parts[2], raw, valid: true };
  }

  return { view: "ui-system", group: null, item: null, raw, valid: false };
}

/** Build a hash for a group/item pair, translating the group id to its slug. */
export function buildHash(group: string, item?: string): string {
  const slug = GROUP_SLUGS[group] ?? group;
  return item ? `#ui-system/${slug}/${item}` : `#ui-system/${slug}`;
}

/** Navigation options shared by every `goTo*` helper. */
export interface GoToOptions {
  /** Replace the current history entry instead of pushing a new one. */
  replace?: boolean;
}

/** Result of `useHashRoute`. */
export interface UseHashRouteResult {
  /** Current parsed route. */
  route: HashRoute;
  /** Navigate to a component page. */
  goToItem: (group: string, item: string, options?: GoToOptions) => void;
  /** Navigate to the `#ui-system` landing. */
  goToLanding: (options?: GoToOptions) => void;
  /** Navigate back to the portfolio (strips the hash). */
  goToPortfolio: (options?: GoToOptions) => void;
}

/**
 * Zero-dependency hash router for the dev sandbox.
 *
 * Reads the initial hash on mount (deep links + refresh work), listens to both
 * `hashchange` and `popstate` (so back/forward work no matter how the entry was
 * created) and cleans both listeners up on unmount (StrictMode-safe).
 */
export function useHashRoute(): UseHashRouteResult {
  const [route, setRoute] = useState<HashRoute>(() =>
    parseHash(typeof window === "undefined" ? "" : window.location.hash),
  );

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const navigate = useCallback((hash: string, options?: GoToOptions) => {
    if (options?.replace) {
      window.history.replaceState(null, "", hash);
      setRoute(parseHash(hash));
      return;
    }
    window.location.hash = hash;
  }, []);

  const goToItem = useCallback(
    (group: string, item: string, options?: GoToOptions) => {
      navigate(buildHash(group, item), options);
    },
    [navigate],
  );

  const goToLanding = useCallback(
    (options?: GoToOptions) => {
      navigate("#ui-system", options);
    },
    [navigate],
  );

  const goToPortfolio = useCallback((options?: GoToOptions) => {
    const url = `${window.location.pathname}${window.location.search}`;
    if (options?.replace) {
      window.history.replaceState(null, "", url);
    } else {
      window.history.pushState(null, "", url);
    }
    setRoute(parseHash(""));
  }, []);

  return { route, goToItem, goToLanding, goToPortfolio };
}
