import { useCallback, useEffect, useState } from "react";
import { GROUP_SLUGS, groupBySlug, isValidItem } from "./navigation";
import { PRODUCTOS } from "../showcases/productos";

/** Top-level sandbox views. `home` is the portfolio, `producto` a project detail page. */
export type SandboxView = "home" | "ui-system" | "producto" | "demo";

/** Parsed representation of `window.location.hash`. */
export interface HashRoute {
  /** Which top-level view the hash points at. */
  view: SandboxView;
  /** Internal group id (`forms`, `data`, …) or `null` on the landing. */
  group: string | null;
  /** Item id (`input`, `table`, …) or `null` for a group-only route. */
  item: string | null;
  /** Product id when `view === "producto"`. */
  producto: string | null;
  /** Raw hash exactly as read from the URL (used by the 404 page). */
  raw: string;
  /** Parámetros `?clave=valor` del hash (filtros persistentes). */
  query: Record<string, string>;
  /** Whether the route resolved to a real page. `false` → render 404. */
  valid: boolean;
}

/** Whether a product id exists in the portfolio catalog. */
function isValidProducto(id: string): boolean {
  return PRODUCTOS.some((producto) => producto.id === id);
}

/**
 * Parse a location hash into a `HashRoute`.
 *
 * Rules:
 * - empty / first segment not in `{ui-system, proyecto}` → portfolio (`home`).
 * - `#ui-system` → landing.
 * - `#ui-system/<group-slug>` → group landing (valid, `item` null).
 * - `#ui-system/<group-slug>/<item-id>` → page (valid) or 404 when unknown.
 * - `#proyecto/<product-id>` → project detail page (valid) or 404 when unknown.
 * - more than 3 segments → 404.
 */
export function parseHash(hash: string): HashRoute {
  const raw = hash;
  const body = hash.startsWith("#") ? hash.slice(1) : hash;
  const [clean, queryString = ""] = body.split("?");
  const query: Record<string, string> = Object.fromEntries(
    queryString
      .split("&")
      .filter(Boolean)
      .map((par) => {
        const [clave, valor = ""] = par.split("=");
        return [decodeURIComponent(clave), decodeURIComponent(valor)];
      })
  );
  const parts = clean.split("/").filter(Boolean);

  if (parts[0] === "proyecto") {
    const producto = parts[1] ?? null;
    return {
      view: "producto",
      group: null,
      item: null,
      producto,
      raw,
      query,
      valid: Boolean(producto) && isValidProducto(producto as string),
    };
  }

  if (parts[0] === "demo") {
    if (parts[1] === "app") {
      return { view: "demo", group: "app", item: parts[2] ?? "inicio", producto: null, raw, query, valid: parts.length <= 3 };
    }
    return { view: "demo", group: null, item: null, producto: null, raw, query, valid: parts.length === 1 };
  }

  if (parts.length === 0 || parts[0] !== "ui-system") {
    return { view: "home", group: null, item: null, producto: null, raw, query, valid: true };
  }

  if (parts.length === 1) {
    return { view: "ui-system", group: null, item: null, producto: null, raw, query, valid: true };
  }

  if (parts.length === 2) {
    const group = groupBySlug(parts[1]);
    if (!group) {
      return { view: "ui-system", group: null, item: null, producto: null, raw, query, valid: false };
    }
    return { view: "ui-system", group: group.id, item: null, producto: null, raw, query, valid: true };
  }

  if (parts.length === 3) {
    const group = groupBySlug(parts[1]);
    if (!group || !isValidItem(group.id, parts[2])) {
      return {
        view: "ui-system",
        group: group?.id ?? null,
        item: null,
        producto: null,
        raw,
        query,
        valid: false,
      };
    }
    return { view: "ui-system", group: group.id, item: parts[2], producto: null, raw, query, valid: true };
  }

  return { view: "ui-system", group: null, item: null, producto: null, raw, query, valid: false };
}

/** Build a hash for a group/item pair, translating the group id to its slug. */
export function buildHash(group: string, item?: string): string {
  const slug = GROUP_SLUGS[group] ?? group;
  return item ? `#ui-system/${slug}/${item}` : `#ui-system/${slug}`;
}

/** Build the hash of a project detail page. */
export function buildProductoHash(id: string): string {
  return `#proyecto/${id}`;
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
  /** Navigate to a project detail page. */
  goToProducto: (id: string, options?: GoToOptions) => void;
  /** Navigate back to the portfolio (strips the hash). */
  goToPortfolio: (options?: GoToOptions) => void;
  /** Abre el portafolio de demostración pintado desde JSON (`#demo`). */
  goToDemo: (options?: GoToOptions) => void;
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

  const goToProducto = useCallback(
    (id: string, options?: GoToOptions) => {
      navigate(buildProductoHash(id), options);
    },
    [navigate],
  );

  const goToDemo = useCallback(
    (options?: GoToOptions) => {
      navigate("#demo", options);
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

  return { route, goToItem, goToLanding, goToProducto, goToPortfolio, goToDemo };
}
