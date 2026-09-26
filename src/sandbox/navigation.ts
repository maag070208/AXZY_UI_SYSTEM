/**
 * Sandbox navigation catalog (dev-only, NOT part of the published package).
 *
 * Plain data only — no JSX, no icons. Icons live in the consumer (`App.tsx`)
 * keyed by group id so this module stays serializable and router-friendly.
 */

/** A single component page inside a sandbox group. */
export interface SandboxSubItem {
  /** Stable item id used in the hash route (`#ui-system/<group>/<id>`). */
  id: string;
  /** Human-readable label shown in the sidebar and landing. */
  label: string;
}

/** A family of component pages (e.g. forms, data visualization). */
export interface SandboxGroup {
  /** Stable group id used internally and by `GROUP_SLUGS`. */
  id: string;
  /** Human-readable group label. */
  label: string;
  /** Pages belonging to this group. */
  subitems: SandboxSubItem[];
}

/** All sandbox groups and their pages, transcribed from the legacy App catalog. */
export const SANDBOX_GROUPS: SandboxGroup[] = [
  {
    id: "general",
    label: "General",
    subitems: [
      { id: "getting-started", label: "Getting Started" },
      { id: "sizes", label: "Medidas · sm / md / lg" },
    ],
  },
  {
    id: "struc",
    label: "Estructura & Layout",
    subitems: [
      { id: "layout", label: "ITLayout & ITNavbar" },
      { id: "stack", label: "ITStack" },
      { id: "flex", label: "ITFlex" },
      { id: "grid", label: "ITGrid" },
      { id: "card", label: "ITCard" },
      { id: "text", label: "ITText" },
      { id: "accordion", label: "ITAccordion" },
      { id: "pageheader", label: "ITPageHeader" },
      { id: "page", label: "ITPage" },
      { id: "screen-dashboard", label: "Dashboard Ejemplo" },
      { id: "screen-form", label: "Formulario Ejemplo" },
    ],
  },
  {
    id: "forms",
    label: "Formularios & Inputs",
    subitems: [
      { id: "button", label: "ITButton" },
      { id: "input", label: "ITInput" },
      { id: "select", label: "ITSelect" },
      { id: "searchselect", label: "ITSearchSelect" },
      { id: "multiselect", label: "ITMultiSelect" },
      { id: "chipinput", label: "ITChipInput" },
      { id: "field", label: "ITField" },
      { id: "datepicker", label: "ITDatePicker" },
      { id: "timepicker", label: "ITTimePicker" },
      { id: "maskedinput", label: "ITMaskedInput" },
      { id: "calendar", label: "ITCalendar" },
      { id: "slidetoggle", label: "ITSlideToggle" },
      { id: "dropfile", label: "ITDropfile" },
      { id: "wysiwyg", label: "ITWysiwyg" },
      { id: "formbuilder", label: "ITFormBuilder" },
    ],
  },
  {
    id: "data",
    label: "Visualización Datos",
    subitems: [
      { id: "table", label: "ITTable" },
      { id: "datatable", label: "ITDataTable" },
      { id: "badget", label: "ITBadget" },
      { id: "chip", label: "ITChip" },
      { id: "image", label: "ITImage" },
    ],
  },
  {
    id: "nav",
    label: "Navegación & Control",
    subitems: [
      { id: "tabs", label: "ITTabs" },
      { id: "stepper", label: "ITStepper" },
      { id: "pagination", label: "ITPagination" },
      { id: "triplefilter", label: "ITTripleFilter" },
      { id: "dropdownmenu", label: "ITDropdownMenu" },
    ],
  },
  {
    id: "feed",
    label: "Feedback & Sistema",
    subitems: [
      { id: "dialog", label: "ITDialog" },
      { id: "toast", label: "ITToast" },
      { id: "loader", label: "ITLoader" },
      { id: "themeprovider", label: "ITThemeProvider" },
    ],
  },
];

/** Readable group-id → URL-slug map. */
export const GROUP_SLUGS: Record<string, string> = {
  general: "general",
  struc: "structure",
  forms: "forms",
  data: "viewdata",
  nav: "navigation",
  feed: "feedback",
};

/** Inverse of `GROUP_SLUGS`: URL-slug → group-id. */
export const SLUG_TO_GROUP: Record<string, string> = Object.fromEntries(
  Object.entries(GROUP_SLUGS).map(([id, slug]) => [slug, id]),
);

/** Look up a group by its internal id. Returns `null` when unknown. */
export function groupById(id: string): SandboxGroup | null {
  return SANDBOX_GROUPS.find((group) => group.id === id) ?? null;
}

/** Look up a group by its URL slug. Returns `null` when unknown. */
export function groupBySlug(slug: string): SandboxGroup | null {
  const id = SLUG_TO_GROUP[slug];
  return id ? groupById(id) : null;
}

/** First item id of a group, or `null` when the group is unknown/empty. */
export function firstItemOf(groupId: string): string | null {
  return groupById(groupId)?.subitems[0]?.id ?? null;
}

/** Whether `itemId` exists inside `groupId`. */
export function isValidItem(groupId: string, itemId: string): boolean {
  return groupById(groupId)?.subitems.some((sub) => sub.id === itemId) ?? false;
}

/** Total number of pages across every group (derived — never hardcoded). */
export const TOTAL_ITEMS = SANDBOX_GROUPS.reduce(
  (total, group) => total + group.subitems.length,
  0,
);
