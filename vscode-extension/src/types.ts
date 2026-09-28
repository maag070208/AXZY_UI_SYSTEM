/** A single documented prop of a component. */
export interface CatalogProp {
  /** Prop name, e.g. `variant`. */
  name: string;
  /** TypeScript type rendered as a string, e.g. `"sm" | "md" | "lg"`. */
  type: string;
  /** Whether the prop is required. */
  required: boolean;
  /** Value of the `@default` JSDoc tag, when present. */
  default: string;
  /** JSDoc description. */
  description: string;
}

/** A documented exported component. */
export interface CatalogComponent {
  /** Export name, e.g. `ITButton`. */
  name: string;
  /** Atomic layer: `atoms` | `molecules` | `organisms` | `templates` | `others`. */
  layer: string;
  /** Component JSDoc description. */
  description: string;
  /** JSDoc `@example` snippet, when present. */
  example: string;
  /** Repo-relative path of the declaring file. */
  source: string;
  /** Documented props. */
  props: CatalogProp[];
}

/** A documented exported hook. */
export interface CatalogHook {
  /** Hook name, e.g. `useTableState`. */
  name: string;
  /** Always `hooks`. */
  layer: string;
  /** Hook JSDoc description. */
  description: string;
  /** Rendered call signature. */
  signature: string;
  /** Repo-relative path of the declaring file. */
  source: string;
  /** JSDoc `@example` snippet, when present. */
  example: string;
}

/** Root shape of the generated `catalog.json`. */
export interface Catalog {
  /** ISO date the catalog was generated. */
  generatedAt: string;
  /** Library version the catalog was generated from. */
  libraryVersion: string;
  /** Mapping of layer id to display label. */
  layers: Record<string, string>;
  /** Documented components. */
  components: CatalogComponent[];
  /** Documented hooks. */
  hooks: CatalogHook[];
  /** Exported types/enums not represented as components. */
  otherExports: string[];
}
