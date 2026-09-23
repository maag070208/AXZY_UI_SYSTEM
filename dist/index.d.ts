import * as Yup from 'yup';
import * as React$1 from 'react';
import React__default, { RefObject, CSSProperties, ReactNode, ElementType, FocusEvent, HTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const useClickOutside: (ref: React.RefObject<HTMLElement>, callback: () => void) => void;

interface UseDebouncedSearchOptions {
    initialValue?: string;
    debounceMs?: number;
    onSearch: (value: string) => void;
}
interface UseDebouncedSearchResult {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    handleSearchChange: (value: string) => void;
    handleClearSearch: () => void;
}
declare function useDebouncedSearch({ initialValue, debounceMs, onSearch, }: UseDebouncedSearchOptions): UseDebouncedSearchResult;

type TableVariants = "default" | "striped" | "bordered";
type TableSize = "sm" | "md" | "lg";

/** Definition of a single searchable, sortable, editable table column. */
interface SearchColumn<T = any> {
    /** Unique key used for data access and sorting/filtering. */
    key: string;
    /** Column header label displayed to the user. */
    label: string;
    /** Data type of the column: "string" | "number" | "boolean" | "date" | "actions" | "catalog". */
    type: "string" | "number" | "boolean" | "date" | "actions" | "catalog";
    /** Enables filtering on this column. Can be boolean or "catalog" for catalog-based filters. */
    filter?: boolean | 'catalog';
    /** Whether the column is sortable by clicking its header. */
    sortable?: boolean;
    /** Whether inline editing is allowed on this column. */
    editable?: boolean;
    /** Inline edit input type: "text" | "number" | "select" | "checkbox" | "date". */
    inputType?: "text" | "number" | "select" | "checkbox" | "date";
    /** Predefined select options when inputType is "select". */
    options?: {
        value: string | number;
        label: string;
    }[];
    /** Custom inline-edit validation. Return error string or undefined if valid. */
    validation?: (value: any, row?: any) => string | undefined;
    /** Additional CSS class on the column cells. */
    className?: string;
    /** Formats numeric values as Mexican pesos (MXN). */
    currencyMX?: boolean;
    /** Configuration for catalog-type columns: data array and optional key/label field names. */
    catalogOptions?: {
        data: Array<{
            id: string | number;
            name: string;
        }> | any[];
        key?: string;
        label?: string;
    };
    /** Custom render function for the cell. Receives the full row object. */
    render?: (row: T) => React.ReactNode;
    /** Custom action buttons rendered in the cell. Receives row and helper with onEdit. */
    actions?: (row: T, helpers: {
        onEdit: (row: T) => void;
    }) => React.ReactNode;
    /** Custom save/cancel action buttons in edit mode. Receives row and helpers. */
    saveActions?: (row: T, helpers: {
        onSave: (row: T) => void;
        onCancel: () => void;
        hasErrors: any;
    }) => React.ReactNode;
}
/** Props for the ITSearchTable server-side data table component. */
interface ITSearchTableProps<T> {
    /** Column definitions: key, label, type, filter, sortable, editable, etc. */
    columns: SearchColumn<T>[];
    /** Additional CSS class for the outer container wrapper. */
    containerClassName?: string;
    /** Placeholder text for the global search input field. */
    searchInputPlaceholder?: string;
    /** Array of row data objects (server-side paginated). */
    data: T[];
    /** Table visual variant: "default" | "striped" | "bordered". */
    variant?: TableVariants;
    /** Additional CSS class applied to the `<table>` element. */
    className?: string;
    /** Table row size: "sm" | "md" | "lg". */
    size?: TableSize;
    /** Available page-size options (e.g. [10, 20, 50, 100]). */
    itemsPerPageOptions?: Array<number>;
    /** Initial/default number of rows per page. */
    defaultItemsPerPage?: number;
    /** Yup validation schema for inline editing. */
    validationSchema?: Yup.ObjectSchema<any>;
    /** Title displayed in the table header bar (teal background). */
    title?: string;
    /** Current page index (0-based, server-side). */
    pageIndex: number;
    /** Total number of rows across all pages (server-side). */
    totalCount: number;
    /** Total number of available pages. */
    totalPages: number;
    /** Whether there is a previous page available. */
    hasPreviousPage: boolean;
    /** Whether there is a next page available. */
    hasNextPage: boolean;
    /** Callback when the user navigates to a different page. Receives the new page index. */
    onPageChange?: (page: number) => void;
    /** Callback when the user changes the page-size. Receives the new items-per-page value. */
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    /** Callback when sorting changes. Receives { key, direction: "asc" | "desc" }. */
    onSortChange?: (sortConfig: {
        key: string;
        direction: "asc" | "desc";
    }) => void;
    /** Callback when global search/filter text changes. Receives a key-value filters record. */
    onFilterChange?: (filters: Record<string, string | boolean | number>) => void;
}

interface UseEditableRowOptions<T> {
    row: T;
    columns: SearchColumn<T>[];
    getNestedValue: (obj: unknown, path: string) => unknown;
    validationSchema?: Yup.ObjectSchema<any>;
}
interface UseEditableRowResult<T> {
    editedRow: T;
    errors: Record<string, string>;
    isHovered: boolean;
    setIsHovered: (v: boolean) => void;
    hasErrors: boolean;
    handleEdit: (onEdit?: (row: T) => void) => Promise<void>;
    handleSave: (onSave?: (row: T) => void) => Promise<void>;
    handleCancel: (onCancel?: () => void) => void;
    handleChange: (key: string, value: any) => Promise<void>;
    reset: () => void;
}
declare function useEditableRow<T>({ row, columns, getNestedValue, validationSchema, }: UseEditableRowOptions<T>): UseEditableRowResult<T>;

/** Options for {@link useFloatingPanel}. */
interface UseFloatingPanelOptions {
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
declare function useFloatingPanel(anchorRef: RefObject<HTMLElement | null>, isOpen: boolean, { estimatedHeight, offset, matchWidth, align, zIndex, }?: UseFloatingPanelOptions): {
    panelRef: RefObject<HTMLDivElement>;
    style: CSSProperties;
};

interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}
interface UseTableStateOptions {
    defaultItemsPerPage?: number;
    initialSort?: SortConfig | null;
}
interface UseTableStateResult {
    currentPage: number;
    itemsPerPage: number;
    filters: Record<string, string | boolean | number>;
    sortConfig: SortConfig | null;
    totalPages: number;
    setTotalPages: (pages: number) => void;
    goToPage: (page: number) => void;
    handleItemsPerPageChange: (value: number) => void;
    handleFilterChange: (key: string, value: string | boolean | number | undefined) => void;
    handleSort: (key: string, sortable?: boolean) => void;
    resetPage: () => void;
    clearFilters: () => void;
}
declare function useTableState({ defaultItemsPerPage, initialSort, }?: UseTableStateOptions): UseTableStateResult;

/** A single collapsible section inside {@link ITAccordionProps}. */
interface ITAccordionItem {
    /** Unique identifier for the item. */
    id: string;
    /** Header content (usually text). */
    title: ReactNode;
    /** Body content revealed when the item is open. */
    content: ReactNode;
    /** Optional icon rendered before the title. */
    icon?: ReactNode;
    /** Disables toggling for this item. @default false */
    disabled?: boolean;
}
/** Props for the ITAccordion component. */
interface ITAccordionProps {
    /** Sections to render. */
    items: ITAccordionItem[];
    /** Allows more than one section open at the same time. @default false */
    allowMultiple?: boolean;
    /** Ids open on first render (uncontrolled mode). */
    defaultOpenIds?: string[];
    /** Controlled list of open ids. When provided, the component is controlled. */
    openIds?: string[];
    /** Fired with the next list of open ids whenever a section toggles. */
    onChange?: (openIds: string[]) => void;
    /** Visual style. Valid values: `"default"`, `"separated"`, `"bordered"`. @default "separated" */
    variant?: "default" | "separated" | "bordered";
    /** Additional CSS classes for the wrapper. */
    className?: string;
    /** Additional CSS classes applied to every item. */
    itemClassName?: string;
}

/**
 * Collapsible sections for FAQs, settings panels, and long content.
 *
 * Works uncontrolled (`defaultOpenIds`) or controlled (`openIds` + `onChange`).
 * Supports single-open (default) or multiple-open mode, and animates the body
 * with a CSS grid-rows transition (no JS height measurement).
 *
 * @example
 * <ITAccordion
 *   items={[
 *     { id: "a", title: "¿Qué es AXZY?", content: "Un sistema de componentes." },
 *     { id: "b", title: "¿Cómo instalo?", content: "pnpm add @axzydev/axzy_ui_system" },
 *   ]}
 *   defaultOpenIds={["a"]}
 * />
 */
declare function ITAccordion({ items, allowMultiple, defaultOpenIds, openIds, onChange, variant, className, itemClassName, }: ITAccordionProps): react_jsx_runtime.JSX.Element;

type AlertVariant = "info" | "success" | "warning" | "error";
interface ITAlertProps {
    /** Alert visual style. Valid values: `"info"`, `"success"`, `"warning"`, `"error"`. @default "info" */
    variant?: AlertVariant;
    /** Optional bold title text displayed above the message. */
    title?: string;
    /** Alert message content. */
    children?: ReactNode;
    /** Whether the alert can be dismissed by the user. @default false */
    dismissible?: boolean;
    /** Callback fired when the dismiss button is clicked. */
    onDismiss?: () => void;
    /** Custom icon element. Overrides the default variant icon. */
    icon?: ReactNode;
    /** Additional CSS class names for the alert container. */
    className?: string;
}

/**
 * Dismissible alert banner with 4 visual variants and optional custom icon.
 *
 * @example
 * <ITAlert variant="success" title="Success" dismissible onDismiss={() => {}}>
 *   Operation completed successfully.
 * </ITAlert>
 */
declare function ITAlert({ variant, title, children, dismissible, onDismiss, icon, className, }: ITAlertProps): react_jsx_runtime.JSX.Element;

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
interface ITAvatarProps {
    /** Image source URL for the avatar. When provided, displays an `<img>` element. */
    src?: string;
    /** Alt text for the avatar image. Also used as fallback initial when no `initials` or `src` is provided. */
    alt?: string;
    /** Initials to display when no image is available (max 2 characters recommended). */
    initials?: string;
    /** Avatar dimensions. Valid values: `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`. @default "md" */
    size?: AvatarSize;
    /**
     * Color de fondo para el fallback de iniciales. Acepta un valor de color
     * real (`"#8b5cf6"`, `"rgb(...)"`, `"hsl(...)"`, `"var(--...)"`) — se
     * aplica como `style` inline y SIEMPRE se renderiza — o una clase de
     * Tailwind (`"bg-purple-600"`) por compatibilidad con código existente.
     * Una clase de Tailwind solo se ve si esa clase exacta ya existe en el
     * CSS compilado que consume la app (esta librería se distribuye con un
     * CSS estático pre-compilado, ver scripts/build-css.mjs), así que para
     * cualquier color calculado en tiempo de ejecución (p.ej. un hash por
     * usuario) se recomienda pasar el valor de color directamente.
     * @default "bg-primary-600"
     */
    color?: string;
    /** Additional CSS class names for the avatar container. */
    className?: string;
    /** React node rendered as a badge overlay at the bottom-right corner. */
    badge?: ReactNode;
    /** Click handler. When provided, the avatar becomes interactive (role="button"). */
    onClick?: () => void;
}

/**
 * Circular avatar component with image, initials fallback, and optional badge overlay.
 *
 * @example
 * <ITAvatar src="/avatar.jpg" alt="John Doe" size="lg" badge={<span className="w-2.5 h-2.5 bg-success-500 rounded-full" />} />
 *
 * @example
 * <ITAvatar initials="JD" size="md" color="bg-purple-600" />
 *
 * @example
 * // Recomendado cuando el color se calcula en tiempo de ejecución (p.ej. un
 * // hash por usuario/etiqueta): pasa un valor de color real, no una clase.
 * <ITAvatar initials="JD" size="md" color="#8b5cf6" />
 */
declare function ITAvatar({ src, alt, initials, size, color, className, badge, onClick, }: ITAvatarProps): react_jsx_runtime.JSX.Element;

/** Escala única de tamaños del sistema: "sm" | "md" | "lg". */
type SizesTypes = "sm" | "md" | "lg";

declare const semanticColors: {
    primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    success: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    danger: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    warning: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    info: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    purple: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    error: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
};

type ColorsTypes = keyof typeof semanticColors;

declare const badgeVariants: {
    readonly filled: "filled";
    readonly outlined: "outlined";
};

interface ITBadgetProps {
    /** Text label displayed inside the badge. Overridden if `children` is provided. */
    label?: string;
    /** Custom content to render inside the badge. Takes precedence over `label`. */
    children?: React.ReactNode;
    /** Color theme key. Values come from the semantic color palette (e.g. `"primary"`, `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"purple"`, `"error"`, `"gray"`). @default "primary" */
    color?: ColorsTypes;
    /** Badge size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
    size?: SizesTypes;
    /** Badge visual style. Valid values: `"filled"`, `"outlined"`. @default "filled" */
    variant?: keyof typeof badgeVariants;
    /** Additional CSS class names for the badge element. */
    className?: string;
}

/**
 * Small status tag or label with theme-based colors and filled/outlined variants.
 *
 * @example
 * <ITBadget label="Active" color="success" variant="filled" />
 *
 * @example
 * <ITBadget color="danger" variant="outlined" size="sm">
 *   <span className="flex items-center gap-1">3 new</span>
 * </ITBadget>
 */
declare function ITBadget({ children, label, color, size, variant, className, }: ITBadgetProps): react_jsx_runtime.JSX.Element;

interface ITBreadcrumbItem {
    /** Display text for the breadcrumb segment. */
    label: string;
    /** URL for the breadcrumb link. Renders an `<a>` tag. */
    href?: string;
    /** Click handler for the breadcrumb. Renders a `<button>` when no `href` is set. */
    onClick?: () => void;
}
interface ITBreadcrumbsProps {
    /** Ordered array of breadcrumb items. The last item is rendered as plain text (current page). */
    items: ITBreadcrumbItem[];
    /** Custom separator element rendered between items. @default <FaChevronRight size={10} /> */
    separator?: ReactNode;
    /** Additional CSS class names for the `<nav>` container. */
    className?: string;
}

/**
 * Navigation breadcrumb trail with automatic link/button rendering and custom separator.
 *
 * @example
 * <ITBreadcrumbs
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Products", href: "/products" },
 *     { label: "Details" },
 *   ]}
 * />
 */
declare function ITBreadcrumbs({ items, separator, className, }: ITBreadcrumbsProps): react_jsx_runtime.JSX.Element;

declare const buttonVariants: Record<string, string>;

interface ITButtonProps {
    /** Button text label. Overridden if `children` is provided. */
    label?: string;
    /** Custom content to render inside the button. Takes precedence over `label`. */
    children?: React.ReactNode;
    /** Icon element rendered before the label. */
    icon?: React.ReactNode;
    /** Click handler for the button. */
    onClick?: () => void;
    /** Color theme key. Values come from the semantic color palette (e.g. `"primary"`, `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"purple"`, `"error"`, `"gray"`). @default "primary" */
    color?: ColorsTypes;
    /** Button size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
    size?: SizesTypes;
    /** Button visual style. Valid values: `"filled"`, `"outlined"`, `"raised"`, `"rounded"`, `"text"`, `"raised-text"`, `"icon-only"`, `"link"`. @default "filled" */
    variant?: keyof typeof buttonVariants;
    /** Disables the button interaction and applies reduced opacity. @default false */
    disabled?: boolean;
    /** Additional CSS class names for the button element. */
    className?: string;
    /** HTML button type attribute. Valid values: `"submit"`, `"reset"`, `"button"`. @default "button" */
    type?: "submit" | "reset" | "button" | undefined;
    /** Accessible label for screen readers. Falls back to `label` if not set. */
    ariaLabel?: string;
    /** HTML title attribute for native tooltip. Falls back to `ariaLabel` or `label`. */
    title?: string;
}

/**
 * Highly configurable action button supporting 8 visual variants, theme colors, 3 sizes, icons, and hover/focus states.
 *
 * @example
 * <ITButton label="Submit" color="primary" variant="filled" onClick={() => {}} />
 *
 * @example
 * <ITButton color="danger" variant="outlined" size="sm" icon={<FaTrash />}>
 *   Delete
 * </ITButton>
 */
declare function ITButton({ children, label, icon, onClick, type, color, size, disabled, className, variant, ariaLabel, title, }: ITButtonProps): react_jsx_runtime.JSX.Element;

interface CalendarEvent {
    /** Unique identifier for the event. */
    id: string;
    /** Event display title. */
    title: string;
    /** Event start date/time. Accepts a `Date` object or ISO 8601 string. */
    start: Date | string;
    /** Event end date/time. Accepts a `Date` object or ISO 8601 string. */
    end: Date | string;
    /** Event indicator color. Accepts a hex code or CSS color value. */
    color?: string;
    /** Arbitrary extra data passed through to event callbacks. */
    data?: any;
}
interface ITCalendarProps {
    /** Array of calendar events to display in the scheduler view. */
    events?: CalendarEvent[];
    /** Display mode. Valid values: `"week"`, `"day"`, `"month"`. Auto-detected as `"month"` when `onChange` is provided. */
    mode?: 'week' | 'day' | 'month';
    /** Callback fired when an event is clicked. */
    onEventClick?: (event: CalendarEvent) => void;
    /** Callback fired when an empty time slot is clicked. */
    onSlotClick?: (date: Date) => void;
    /** Callback fired when the mouse enters a time slot. */
    onSlotHover?: (date: Date) => void;
    /** Callback fired when a time range is selected via drag. */
    onSelectRange?: (start: Date, end: Date) => void;
    /** Currently selected date (date picker mode). */
    value?: Date;
    /** Callback fired when a date is selected in picker mode. */
    onChange?: (date: Date) => void;
    /** Selection mode for the date picker. Valid values: `"single"`, `"range"`. @default "single" */
    selectionMode?: 'single' | 'range';
    /** Start date for range selection. */
    startDate?: Date;
    /** End date for range selection. */
    endDate?: Date;
    /** Minimum selectable date (dates before this are disabled). */
    minDate?: Date;
    /** Maximum selectable date (dates after this are disabled). */
    maxDate?: Date;
    /** Additional CSS class names for the calendar container. */
    className?: string;
    /** Whether the calendar is in a disabled state. @default false */
    disabled?: boolean;
    /** Accent color theme for selection highlights. Uses semantic color keys. @default "primary" */
    variant?: ColorsTypes;
}

/**
 * Full-featured calendar and date picker with week/day/month views, event display, range selection, and drag-to-select.
 *
 * @example
 * <ITCalendar mode="month" onChange={(date) => console.log(date)} variant="primary" />
 *
 * @example
 * <ITCalendar
 *   mode="week"
 *   events={[{ id: "1", title: "Meeting", start: new Date(), end: new Date() }]}
 *   onEventClick={(evt) => console.log(evt)}
 * />
 */
declare const ITCalendar: React__default.FC<ITCalendarProps>;

interface ITCardProps {
    /** Click handler. When provided, the card becomes interactive with hover shadow effect. */
    onClick?: () => void;
    /** Card title displayed in the header area. */
    title?: string;
    /** Image source URL displayed at the top of the card. */
    image?: string;
    /** Alt text for the card image. @default "Card Image" */
    alt?: string;
    /** Card body content. Rendered below the title. */
    children?: React.ReactNode;
    /** Action elements rendered in a footer section separated by a border. */
    actions?: React.ReactNode;
    /** Additional CSS class names for the card container. */
    className?: string;
    /** Additional CSS class names for the image element. */
    imageClassName?: string;
    /** Additional CSS class names for the title element. */
    titleClassName?: string;
    /** Additional CSS class names for the content wrapper. */
    contentClassName?: string;
    /** Additional CSS class names for the actions footer. */
    actionClassName?: string;
}

/**
 * Versatile card container with optional image, title, body content, and action footer. Supports interactive hover states.
 *
 * @example
 * <ITCard title="Welcome" image="/hero.jpg" actions={<ITButton label="Learn more" />}>
 *   This is the card content.
 * </ITCard>
 *
 * @example
 * <ITCard onClick={() => {}} className="max-w-sm">
 *   Clickable card with hover shadow.
 * </ITCard>
 */
declare function ITCard({ title, image, alt, children, actions, className, imageClassName, titleClassName, contentClassName, actionClassName, onClick, }: ITCardProps): react_jsx_runtime.JSX.Element;

interface ITCheckboxProps {
    /** Controlled checked state. @default false */
    checked?: boolean;
    /** Callback fired when the checkbox value changes. Receives the new checked state. */
    onChange?: (checked: boolean) => void;
    /** Label text or element rendered next to the checkbox. */
    label?: ReactNode;
    /** Disables the checkbox interaction and applies reduced opacity. @default false */
    disabled?: boolean;
    /** Renders the checkbox in an indeterminate (dash) state. Has no effect when `checked` is `true`. @default false */
    indeterminate?: boolean;
    /** Additional CSS class names for the label wrapper. */
    className?: string;
    /** HTML name attribute for the native `<input>` element. */
    name?: string;
}

/**
 * Checkbox component with label, indeterminate state, and disabled support. Uses a visually hidden native input for accessibility.
 *
 * @example
 * <ITCheckbox label="Accept terms" checked={agreed} onChange={setAgreed} />
 *
 * @example
 * <ITCheckbox label="Select all" indeterminate={someChecked && !allChecked} onChange={toggleAll} />
 */
declare function ITCheckbox({ checked, onChange, label, disabled, indeterminate, className, name, }: ITCheckboxProps): react_jsx_runtime.JSX.Element;

/** Visual styles available for {@link ITChip}. */
declare const chipVariants: {
    readonly soft: "soft";
    readonly filled: "filled";
    readonly outlined: "outlined";
};

/** Props for the ITChip tag/pill component. */
interface ITChipProps {
    /** Text label displayed inside the chip. Overridden if `children` is provided. */
    label?: string;
    /** Custom content rendered inside the chip. Takes precedence over `label`. */
    children?: ReactNode;
    /** Color theme key from the semantic palette (e.g. `"primary"`, `"success"`, `"danger"`). @default "secondary" */
    color?: ColorsTypes;
    /** Chip size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
    size?: SizesTypes;
    /** Visual style. Valid values: `"soft"`, `"filled"`, `"outlined"`. @default "soft" */
    variant?: keyof typeof chipVariants;
    /** Icon rendered before the label. */
    icon?: ReactNode;
    /** Shows a remove (X) button at the end of the chip. @default false */
    removable?: boolean;
    /** Callback fired when the remove button is pressed. */
    onRemove?: () => void;
    /** Makes the chip clickable (filter/toggle usage). */
    onClick?: () => void;
    /** Highlights the chip as selected, using the `color` palette. @default false */
    selected?: boolean;
    /** Disables all chip interactions and reduces opacity. @default false */
    disabled?: boolean;
    /** Additional CSS classes for the chip element. */
    className?: string;
}

/**
 * Compact tag / pill used for labels, active filters, and multi-value selections.
 *
 * Supports soft, filled, and outlined variants, an optional leading icon,
 * a removable (X) affordance, and a selected state for filter toggles.
 *
 * @example
 * <ITChip label="React" color="primary" />
 *
 * @example
 * <ITChip label="México" color="success" variant="outlined" removable onRemove={() => remove("MX")} />
 *
 * @example
 * <ITChip label="Activos" selected onClick={() => toggle()} />
 */
declare function ITChip({ label, children, color, size, variant, icon, removable, onRemove, onClick, selected, disabled, className, }: ITChipProps): react_jsx_runtime.JSX.Element;

/** Props for the ITChipInput component. */
interface ITChipInputProps {
    /** Name attribute for form integrations. */
    name?: string;
    /** Label displayed above the control. */
    label?: string;
    /** Placeholder for the text input. @default "Escribe y presiona Enter" */
    placeholder?: string;
    /** Current list of tags (controlled). */
    value: string[];
    /** Fired with the next list of tags. */
    onChange?: (values: string[]) => void;
    /** Fired when the control loses focus. */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** Keys that commit the current text as a tag. @default ["Enter", ","] */
    delimiters?: string[];
    /** Maximum number of tags allowed. */
    maxTags?: number;
    /** Allows duplicated tags. @default false */
    allowDuplicates?: boolean;
    /** Returns an error string to reject the tag, or undefined if valid. */
    validate?: (value: string) => string | undefined;
    /** Color applied to the tag chips. @default "primary" */
    color?: ColorsTypes;
    /** Control size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
    size?: SizesTypes;
    /** Disables the control. @default false */
    disabled?: boolean;
    /** Marks the field as required (red asterisk). @default false */
    required?: boolean;
    /** Whether the field has been touched (form validation). */
    touched?: boolean;
    /** Error message or boolean indicating an error state. */
    error?: string | boolean;
    /** Helper text shown below the control when there is no error. */
    helpText?: string;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * Free-text input that turns entered values into removable tags (chips).
 *
 * Commits a tag on `Enter`/`,` (configurable via `delimiters`), on blur, or on
 * paste of delimited text. Supports `maxTags`, dedupe control, and per-tag
 * validation.
 *
 * @example
 * <ITChipInput
 *   label="Etiquetas"
 *   value={tags}
 *   onChange={setTags}
 *   placeholder="Agrega una etiqueta..."
 * />
 */
declare function ITChipInput({ name, label, placeholder, value, onChange, onBlur, delimiters, maxTags, allowDuplicates, validate, color, size, disabled, required, touched, error, helpText, className, }: ITChipInputProps): react_jsx_runtime.JSX.Element;

/** A single action inside {@link ITDropdownMenuProps}. */
interface ITDropdownMenuItem {
    /** Unique identifier for the item. */
    id: string;
    /** Item content (usually text). */
    label: ReactNode;
    /** Optional leading icon. */
    icon?: ReactNode;
    /** Optional shortcut hint rendered on the right (e.g. `"⌘K"`). */
    shortcut?: string;
    /** Click handler for the item. */
    onClick?: () => void;
    /** Disables the item. @default false */
    disabled?: boolean;
    /** Renders the item in the danger color (destructive actions). @default false */
    danger?: boolean;
    /** Draws a separator above this item. @default false */
    divider?: boolean;
}
/** Props for the ITDropdownMenu component. */
interface ITDropdownMenuProps {
    /** Menu actions. */
    items: ITDropdownMenuItem[];
    /** Custom trigger content. Defaults to a vertical ellipsis icon. */
    trigger?: ReactNode;
    /** Accessible label for the trigger button. @default "Abrir menú" */
    triggerLabel?: string;
    /** Placement of the menu relative to the trigger. Valid values: `"bottom-start"`, `"bottom-end"`, `"top-start"`, `"top-end"`. @default "bottom-end" */
    placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
    /** Fired after an item is activated, with its id and definition. */
    onSelect?: (id: string, item: ITDropdownMenuItem) => void;
    /** Disables the trigger. @default false */
    disabled?: boolean;
    /** Additional CSS classes for the trigger button. */
    className?: string;
    /** Additional CSS classes for the menu panel. */
    menuClassName?: string;
}

/**
 * Action menu with keyboard navigation and ARIA menu semantics.
 *
 * Renders the menu through a portal so it escapes `overflow: hidden` and
 * transformed ancestors, and flips above the trigger when there is no room
 * below.
 *
 * @example
 * <ITDropdownMenu
 *   items={[
 *     { id: "edit", label: "Editar", icon: <FaEdit />, onClick: edit },
 *     { id: "delete", label: "Eliminar", icon: <FaTrash />, danger: true, divider: true, onClick: remove },
 *   ]}
 * />
 */
declare function ITDropdownMenu({ items, trigger, triggerLabel, placement, onSelect, disabled, className, menuClassName, }: ITDropdownMenuProps): react_jsx_runtime.JSX.Element;

/** Props for the ITField form-field wrapper. */
interface ITFieldProps {
    /** Label rendered above the control. */
    label?: string;
    /** `id` of the control the label points to (`htmlFor`). */
    htmlFor?: string;
    /** Shows a red asterisk next to the label. @default false */
    required?: boolean;
    /** Validation error. Pass `true` for the generic message or a string for a custom one. */
    error?: string | boolean;
    /** Helper text shown below the control when there is no error. */
    helpText?: string;
    /** The form control (ITInput, ITSelect, ITTextarea, …). */
    children: ReactNode;
    /** Additional CSS classes for the wrapper. */
    className?: string;
    /** Additional CSS classes for the label. */
    labelClassName?: string;
    /** Additional CSS classes for the control container. */
    contentClassName?: string;
}

/**
 * Form-field wrapper that standardizes label, required marker, helper text,
 * and error message around any control.
 *
 * Keeps spacing and error styling consistent across forms so each control
 * does not re-implement label/error logic.
 *
 * @example
 * <ITField label="Email" htmlFor="email" required error={errors.email} helpText="We never share it.">
 *   <ITInput name="email" value={email} onChange={onChange} />
 * </ITField>
 */
declare function ITField({ label, htmlFor, required, error, helpText, children, className, labelClassName, contentClassName, }: ITFieldProps): react_jsx_runtime.JSX.Element;

interface ITMaskedInputProps {
    /** Unique name attribute for the underlying input element. */
    name: string;
    /**
     * Mask pattern. Tokens are filled by the user and everything else is an
     * auto-inserted literal.
     * - `9` — digit
     * - `A` — letter (stored uppercase)
     * - `a` — letter
     * - `x` — alphanumeric
     * - `*` — any character
     * - any other character ( `-`, `/`, `(`, `)`, ` `, `.` ) is a literal separator
     * @example "xxxx-xxxx-xxxx"
     * @example "(999) 999-9999"
     * @example "9999-9999-9999-9999"
     */
    mask: string;
    /** Clean value containing only the useful characters (no separators, no placeholders). */
    value?: string;
    /** Called when the masked value changes. `event.target.value` is the raw value without separators. */
    onChange: (event: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
    /** Called when the input loses focus. */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Fired when all token slots are filled with valid characters. */
    onComplete?: (value: string) => void;
    /** Optional regex full-matched against the raw value to validate the field (e.g. `/^\\d{16}$/`). */
    pattern?: RegExp;
    /** Character shown for empty token slots. @default "_" */
    placeholderChar?: string;
    /** Color variant matching the design system (ColorsTypes). @default "primary" */
    variant?: ColorsTypes;
    /** Size preset: "sm" | "md" | "lg". @default "md" */
    size?: SizesTypes;
    /** Label displayed above the input. */
    label?: string;
    /** Disables the input. @default false */
    disabled?: boolean;
    /** Marks the field as required. */
    required?: boolean;
    /** Visually indicates the field has been interacted with. */
    touched?: boolean;
    /** Error state — pass a string message or `true` for default styling. */
    error?: string | boolean;
    /** Additional CSS classes for the outer wrapper element. */
    className?: string;
    /** Additional CSS classes for the underlying input container. */
    containerClassName?: string;
    /** Icon element rendered on the left side of the input. */
    iconLeft?: ReactNode;
    /** Icon element rendered on the right side of the input. */
    iconRight?: ReactNode;
    /** Auto-focus the input on mount. @default false */
    autoFocus?: boolean;
}

/**
 * Text input that applies a formatting mask while the user types, exposing only
 * the clean (raw) value through `onChange`.
 *
 * The mask is defined by a pattern string. Tokens are filled by the user and
 * any other character acts as an auto-inserted literal separator. Empty slots
 * are painted with `placeholderChar`, so the mask is always visible.
 *
 * @example
 * ```tsx
 * <ITMaskedInput
 *   name="code"
 *   mask="xxxx-xxxx-xxxx"
 *   label="Código"
 *   onChange={(e) => setCode(e.target.value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ITMaskedInput
 *   name="phone"
 *   mask="(999) 999-9999"
 *   pattern={/^\d{10}$/}
 *   onChange={(e) => setPhone(e.target.value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ITMaskedInput
 *   name="card"
 *   mask="9999-9999-9999-9999"
 *   onComplete={(card) => validateCard(card)}
 * />
 * ```
 */
declare function ITMaskedInput({ name, mask, value, onChange, onBlur, onComplete, pattern, placeholderChar, variant, size, label, disabled, required, touched, error, className, containerClassName, iconLeft, iconRight, autoFocus, }: ITMaskedInputProps): react_jsx_runtime.JSX.Element;

/** Represents an option in the multi-select dropdown. */
interface ITMultiSelectOption {
    /** Display label for the option. */
    label: string;
    /** Value associated with the option. */
    value: string | number;
    /** Additional custom fields can be attached. */
    [key: string]: any;
}
/** Props for the ITMultiSelect component. */
interface ITMultiSelectProps {
    /** Name attribute for form integrations. */
    name?: string;
    /** Label displayed above the control. */
    label?: string;
    /** Placeholder shown when no value is selected. @default "Selecciona opciones" */
    placeholder?: string;
    /** Available options. */
    options: ITMultiSelectOption[];
    /** Selected values (controlled). */
    value: (string | number)[];
    /** Fired with the next selected values and their option objects. */
    onChange?: (values: (string | number)[], options: ITMultiSelectOption[]) => void;
    /** Fired when the control loses focus. */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** Field used as the option value. @default "value" */
    valueField?: string;
    /** Field used as the option display label. @default "label" */
    labelField?: string;
    /** Disables the control. @default false */
    disabled?: boolean;
    /** Read-only mode: chips shown, no editing. @default false */
    readOnly?: boolean;
    /** Marks the field as required (red asterisk). @default false */
    required?: boolean;
    /** Whether the field has been touched (form validation). */
    touched?: boolean;
    /** Error message or boolean indicating an error state. */
    error?: string | boolean;
    /** Control size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
    size?: SizesTypes;
    /** Maximum number of chips shown before collapsing into "+N". @default 3 */
    maxVisibleChips?: number;
    /** Shows a clear-all (X) button. @default true */
    clearable?: boolean;
    /** Enables the search input inside the control. @default true */
    searchable?: boolean;
    /** Callback for server-side search. Receives the query string. */
    onSearch?: (query: string) => void;
    /** Whether options are loading from an external source. @default false */
    isLoading?: boolean;
    /** Message shown when no options match. @default "No se encontraron resultados" */
    noResultsMessage?: string;
    /** Custom template for each dropdown option. */
    renderOption?: (option: ITMultiSelectOption, state: {
        isSelected: boolean;
        searchTerm: string;
    }) => ReactNode;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * Multi-value select with searchable dropdown, removable chips, and keyboard navigation.
 *
 * Supports local filtering and remote search (`onSearch`), a collapsed chip
 * summary (`maxVisibleChips`), and custom option templates (`renderOption`).
 * The dropdown is portaled so it is never clipped by cards or overflow ancestors.
 *
 * @example
 * <ITMultiSelect
 *   label="Skills"
 *   options={skills}
 *   value={selected}
 *   onChange={(values) => setSelected(values)}
 * />
 *
 * @example
 * <ITMultiSelect
 *   label="Etiquetas"
 *   options={tags}
 *   value={selected}
 *   onChange={(values) => setSelected(values)}
 *   maxVisibleChips={2}
 *   renderOption={(option, { isSelected }) => (
 *     <span className={isSelected ? "font-bold" : ""}>{option.label}</span>
 *   )}
 * />
 */
declare function ITMultiSelect({ name, label, placeholder, options, value, onChange, onBlur, valueField, labelField, disabled, readOnly, required, touched, error, size, maxVisibleChips, clearable, searchable, onSearch, isLoading, noResultsMessage, renderOption, className, }: ITMultiSelectProps): react_jsx_runtime.JSX.Element;

interface ITConfirmDialogProps {
    /** Controls whether the confirmation dialog is visible. */
    isOpen: boolean;
    /** Callback fired when the user cancels or closes the dialog. */
    onClose: () => void;
    /** Callback fired when the user confirms the destructive action. */
    onConfirm: () => void;
    /** Heading text displayed at the top of the dialog. @default "Confirmar acción" */
    title?: string;
    /** Body content — accepts plain strings or React nodes. @default "¿Estás seguro de que deseas continuar?" */
    message?: ReactNode;
    /** Label for the confirm button. @default "Confirmar" */
    confirmLabel?: string;
    /** Label for the cancel button. @default "Cancelar" */
    cancelLabel?: string;
    /** Color variant applied to the confirm button. Accepts any ColorsTypes value (e.g. "primary", "danger", "warning", "info"). @default "primary" */
    variant?: ColorsTypes;
    /** Disables all buttons and signals a loading state. @default false */
    loading?: boolean;
}

/**
 * Confirmation modal dialog for destructive or critical actions.
 *
 * Renders a centered overlay with a warning icon, title, message body, and
 * confirm/cancel buttons. The dialog auto-hides when `isOpen` is false.
 *
 * @example
 * ```tsx
 * <ITConfirmDialog
 *   isOpen={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={handleDelete}
 *   title="Delete record"
 *   message="This action is permanent and cannot be undone."
 *   variant="danger"
 *   loading={isDeleting}
 * />
 * ```
 */
declare function ITConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel, cancelLabel, variant, loading, }: ITConfirmDialogProps): react_jsx_runtime.JSX.Element;

/** Data type of a table column, controls default rendering, filter UI, and sort comparison. */
type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";
/** A single selectable entry for a `"catalog"`-type column's filter/value lookup. */
interface CatalogOption {
    /** Unique identifier matched against the row's field value. */
    id: string | number;
    /** Human-readable label shown in the filter dropdown and resolved cell display. */
    name: string;
}
/** Definition of a single column for ITTable. */
interface Column<T = any> {
    /** Field key on the row object this column reads from (supports dot-notation for nested values, e.g. `"address.city"`). */
    key: string;
    /** Column header text. */
    label: string;
    /** Additional CSS classes applied to both the header (`<th>`) and body (`<td>`) cells of this column. */
    className?: string;
    /** Formats numeric values as Mexican pesos (MXN) via `Intl`-based currency formatting. Only applies when `type` is `"number"`. @default false */
    currencyMX?: boolean;
    /** Custom action buttons/content rendered for a `"actions"`-type column. Receives the full row object. */
    actions?: (row: T) => React.ReactNode;
    /** Enables per-column filtering. Pass `true` for a text/number/boolean filter matching `type`, or `"catalog"` to filter against `catalogOptions`. @default false */
    filter?: boolean | "catalog";
    /** Column data type. Drives default cell rendering, filter UI, and sort comparison. */
    type: ColumnType;
    /** Whether clicking the header sorts by this column. Ignored for `type: "actions"`. @default false */
    sortable?: boolean;
    /** Custom cell renderer, takes precedence over the default type-based rendering. Receives the full row object. */
    render?: (row: T) => React.ReactNode;
    /** Custom inline-edit input renderer (used by table variants that support inline editing). */
    editComponent?: (props: {
        value: any;
        onChange: (value: any) => void;
        rowData: T;
    }) => React.ReactNode;
    /** Configuration for `type: "catalog"` columns: the lookup options plus loading/error state for async catalogs. */
    catalogOptions?: {
        /** Available catalog entries used to resolve/filter the raw id stored on the row. */
        data: CatalogOption[];
        /** Shows a loading spinner in the filter UI while the catalog is being fetched. @default false */
        loading?: boolean;
        /** Shows an error state in the filter UI when the catalog failed to load. @default false */
        error?: boolean;
    };
}
interface ITTableProps<T> {
    /** Column definitions: key, label, type, sortable behavior, filters, and custom rendering. */
    columns: Column<T>[];
    /** Additional CSS classes for the outermost container. */
    containerClassName?: string;
    /** The data array to render in the table body. */
    data: T[];
    /** Visual variant: "default", "striped", "bordered", "borderless". */
    variant?: TableVariants;
    /** Additional CSS classes for the root table wrapper. */
    className?: string;
    /** Row size preset: "sm" | "md" | "lg". */
    size?: TableSize;
    /** Available options for the per-page selector (e.g. [5, 10, 20]). */
    itemsPerPageOptions?: Array<number>;
    /** Default number of rows shown per page. */
    defaultItemsPerPage?: number;
    /** Optional title rendered above the table in the header section. */
    title?: string;
    /** Custom card renderer for mobile/tablet responsive view. Receives the row data. */
    renderCard?: (row: T) => React.ReactNode;
    /** Initial view mode. Defaults to "table". */
    defaultView?: "table" | "cards";
    /** Whether to show vertical borders between columns. Defaults to true. */
    showVerticalBorder?: boolean;
    /** Custom class for vertical borders (overrides the default subtle gray). */
    verticalBorderClassname?: string;
}

/** Parameters passed to `fetchData` every time pagination, filters, or sorting change. */
interface ITDataTableFetchParams {
    /** 1-indexed current page number. */
    page: number;
    /** Number of rows requested per page. */
    limit: number;
    /** Active per-column filter values (from `Column.filter`), keyed by column `key`. */
    filters: Record<string, string | number | boolean | Date>;
    /** Active sort, present only when the user has clicked a sortable column header. */
    sort?: {
        /** Column `key` currently sorted by. */
        key: string;
        /** Sort direction. */
        direction: "asc" | "desc";
    };
}
/** Expected shape of the Promise returned by `fetchData`. */
interface ITDataTableResponse<T> {
    /** Rows for the requested page. */
    data: T[];
    /** Total row count across all pages (used to compute the paginator's total pages). */
    total: number;
}
interface ITDataTableProps<T extends Record<string, unknown>> {
    /**
     * The column configuration array matching ITTable but adapted for Server-Side processing
     */
    columns: Column<T>[];
    /**
     * Async callback that the component will trigger whenever pagination, filtering or sorting changes.
     * It must return a Promise with `data` array and the `total` items matching the query.
     */
    fetchData: (params: ITDataTableFetchParams) => Promise<ITDataTableResponse<T>>;
    /**
     * The amount of milliseconds to wait after internal `filters` state changes
     * before triggering `fetchData`. Helpful to avoid spamming the backend while typing.
     * @default 400
     */
    debounceMs?: number;
    /**
     * Filters managed outside of the ITDataTable (e.g. a date range picker).
     * These will be merged with the internal column filters before calling fetchData.
     */
    externalFilters?: Record<string, string | number | boolean | Date>;
    /**
     * Custom element to display instead of the default spinner while `isLoading` is true.
     */
    loadingIndicator?: ReactNode;
    /**
     * Re-fetches the table automatically upon mounting.
     * @default true
     */
    fetchOnMount?: boolean;
    /**
     * External hook to force the component to re-fetch the current page.
     * Example: trigger after a successful modal form submission.
     */
    reloadTrigger?: number | string | boolean;
    /** Additional CSS classes for the outer wrapper element. */
    containerClassName?: string;
    /** Additional CSS classes applied directly to the `<table>` element. */
    className?: string;
    /** Visual style variant: "default" | "striped" | "bordered" | "minimal". @default "default" */
    variant?: "default" | "striped" | "bordered" | "minimal";
    /** Row density preset: "sm" | "md" | "lg". @default "md" */
    size?: "sm" | "md" | "lg";
    /** Selectable page-size options for the paginator. @default [5, 10, 20] */
    itemsPerPageOptions?: number[];
    /** Initial number of rows per page. @default 10 */
    defaultItemsPerPage?: number;
    /** Optional heading displayed above the table. */
    title?: string | ReactNode;
    /** Custom card renderer for mobile/tablet responsive view. Receives the row data. */
    renderCard?: (row: T) => React.ReactNode;
    /** Initial view mode. Defaults to "table". */
    defaultView?: "table" | "cards";
    /** Whether to show vertical borders between columns. Defaults to true. */
    showVerticalBorder?: boolean;
    /** Custom class for vertical borders (overrides the default subtle gray). */
    verticalBorderClassname?: string;
}

/**
 * Async server-side data table with sorting, filtering, and pagination.
 *
 * Fetches data via the `fetchData` callback whenever pagination, sorting, or
 * filters change. Supports column-level text/catalog/boolean filters, sortable
 * columns, and a loading overlay. Built on-top of internal table hooks for
 * automatic state coordination.
 *
 * @example
 * ```tsx
 * <ITDataTable
 *   columns={[
 *     { key: "name", label: "Name", sortable: true, filter: true },
 *     { key: "status", label: "Status", type: "boolean", filter: true },
 *   ]}
 *   fetchData={async (params) => api.fetchItems(params)}
 *   title="Users"
 *   variant="bordered"
 * />
 * ```
 */
declare function ITDataTable<T extends Record<string, unknown>>({ columns, fetchData, debounceMs, externalFilters, loadingIndicator, fetchOnMount, reloadTrigger, containerClassName, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, renderCard, defaultView, showVerticalBorder, verticalBorderClassname, }: ITDataTableProps<T>): react_jsx_runtime.JSX.Element;

interface ITDatePickerProps {
    /** Unique name attribute for the underlying input element. */
    name: string;
    /** Selected date. Accepts a single Date or a tuple `[startDate, endDate]` when `range` is true. */
    value?: Date | [Date | null, Date | null];
    /** Called when the selected date changes. The event object carries `name` and `value` in its target. */
    onChange: (event: React.ChangeEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date | [Date | null, Date | null];
        };
    }) => void;
    /** Called when the input loses focus. */
    onBlur?: (event: React.FocusEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date | [Date | null, Date | null];
        };
    }) => void;
    /** Enables date-range selection mode. When true, `value` is treated as a start-end tuple. @default false */
    range?: boolean;
    /** Color variant matching the design system (ColorsTypes). @default "primary" */
    variant?: ColorsTypes;
    /** Size preset: "sm" | "md" | "lg". @default "md" */
    size?: SizesTypes;
    /** Additional CSS classes for the wrapper element. */
    className?: string;
    /** Additional CSS classes for the calendar popover. */
    calendarClassName?: string;
    /** Disables the date picker. @default false */
    disabled?: boolean;
    /** Placeholder text shown when no date is selected. */
    placeholder?: string;
    /** Accessible label rendered above the input. */
    label?: string;
    /** Marks the field as required. */
    required?: boolean;
    /** Visually indicates the field has been interacted with. */
    touched?: boolean;
    /** Error state — pass a string message or `true` for default styling. */
    error?: string | boolean;
    /** Earliest selectable date. */
    minDate?: Date;
    /** Latest selectable date. */
    maxDate?: Date;
}

/**
 * Date picker component with single-date and date-range modes.
 *
 * Supports manual text input (DD/MM/YYYY format) and a calendar popover.
 * In range mode the user selects a start date then an end date; the calendar
 * highlights the interval. Position-aware popover flips above the input when
 * near the bottom of the viewport.
 *
 * @example
 * ```tsx
 * <ITDatePicker
 *   name="birthDate"
 *   label="Date of birth"
 *   value={date}
 *   onChange={(e) => setDate(e.target.value)}
 *   maxDate={new Date()}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ITDatePicker
 *   name="travelRange"
 *   label="Travel dates"
 *   range
 *   value={[startDate, endDate]}
 *   onChange={(e) => setRange(e.target.value)}
 * />
 * ```
 */
declare function ITDatePicker({ name, value, onChange, onBlur, variant, size, className, calendarClassName, disabled, label, touched, error, required, placeholder, minDate, maxDate, range, }: ITDatePickerProps): react_jsx_runtime.JSX.Element;

interface ITDialogProps {
    /** Controls whether the dialog is visible. */
    isOpen: boolean;
    /** Callback fired when the overlay or close button is clicked, or Escape is pressed. */
    onClose: () => void;
    /** Content rendered inside the dialog body. */
    children: React.ReactNode;
    /** Additional CSS classes for the dialog panel. */
    className?: string;
    /** Optional heading displayed at the top of the dialog. */
    title?: string;
    /** When true and `title` is provided, renders an ITFormHeader instead of the default title bar. @default false */
    useFormHeader?: boolean;
    /** Makes the dialog fill the entire viewport. @default false */
    fullScreen?: boolean;
}

/**
 * Modal dialog rendered via React portal with overlay backdrop.
 *
 * Supports Escape-key dismissal, click-outside-to-close, optional title bar
 * (plain or ITFormHeader), and a full-screen variant. Content is portaled to
 * `document.body` so it sits above all other page layers.
 *
 * @example
 * ```tsx
 * <ITDialog
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="User details"
 *   useFormHeader
 * >
 *   <UserForm />
 * </ITDialog>
 * ```
 *
 * @example
 * ```tsx
 * <ITDialog isOpen={open} onClose={close} fullScreen>
 *   <FullPageEditor />
 * </ITDialog>
 * ```
 */
declare function ITDialog({ isOpen, onClose, children, className, title, useFormHeader, fullScreen, }: ITDialogProps): React$1.ReactPortal;

/** Direction the divider flows: "horizontal" | "vertical". */
type DividerOrientation = "horizontal" | "vertical";
interface ITDividerProps {
    /** Layout direction. @default "horizontal" */
    orientation?: DividerOrientation;
    /** Additional CSS classes for the divider element. */
    className?: string;
    /** Tailwind background color class(es). @default "bg-slate-200 dark:bg-slate-700" */
    color?: string;
    /** Tailwind width/height utility (e.g. "h-px", "h-1", "w-px"). Auto-set based on orientation if omitted. */
    thickness?: string;
}

/**
 * Horizontal or vertical separator line.
 *
 * Renders a thin full-width (horizontal) or full-height (vertical) bar using
 * Tailwind utility classes. Supports custom color and thickness overrides.
 *
 * @example
 * ```tsx
 * <ITDivider />
 * ```
 *
 * @example
 * ```tsx
 * <ITDivider orientation="vertical" color="bg-danger-500" thickness="w-1" />
 * ```
 */
declare function ITDivider({ orientation, className, color, thickness, }: ITDividerProps): react_jsx_runtime.JSX.Element;

/** Screen edge from which the drawer slides in: "left" | "right". */
type DrawerPosition = "left" | "right";
interface ITDrawerProps {
    /** Controls whether the drawer is visible. */
    isOpen: boolean;
    /** Callback fired when the overlay is clicked or the close button is pressed. */
    onClose: () => void;
    /** Edge the drawer attaches to. @default "right" */
    position?: DrawerPosition;
    /** Tailwind width class (e.g. "w-80", "w-96"). @default "w-80" */
    size?: string;
    /** Optional heading rendered in the drawer header. */
    title?: ReactNode;
    /** Content displayed in the drawer body. */
    children?: ReactNode;
    /** Additional CSS classes for the drawer panel. */
    className?: string;
    /** Inline styles for the drawer panel. */
    style?: CSSProperties;
}

/**
 * Sliding panel drawer from the left or right screen edge.
 *
 * Renders an overlay backdrop with a horizontally-anchored panel that slides
 * in. Includes an optional title bar with close button and a scrollable body
 * area. Uses the `useClickOutside` hook for overlay dismissal.
 *
 * @example
 * ```tsx
 * <ITDrawer
 *   isOpen={menuOpen}
 *   onClose={() => setMenuOpen(false)}
 *   title="Navigation"
 *   position="left"
 *   size="w-72"
 * >
 *   <NavMenu />
 * </ITDrawer>
 * ```
 */
declare function ITDrawer({ isOpen, onClose, position, size, title, children, className, style, }: ITDrawerProps): react_jsx_runtime.JSX.Element;

interface ITEmptyStateProps {
    /** Icon or illustration displayed above the title. @default <FaInbox size={40} /> */
    icon?: ReactNode;
    /** Primary heading text (required). */
    title: string;
    /** Secondary explanatory text shown below the title. */
    description?: string;
    /** Action element (typically a button) rendered below the description. */
    action?: ReactNode;
    /** Additional CSS classes for the wrapper element. */
    className?: string;
}

/**
 * Placeholder display for empty data sets.
 *
 * Shows a large icon, a title, an optional description, and an optional
 * call-to-action element (usually a button). Centered vertically and
 * horizontally within its container.
 *
 * @example
 * ```tsx
 * <ITEmptyState
 *   title="No results found"
 *   description="Try adjusting your search or filters."
 *   action={<ITButton label="Clear filters" variant="outlined" onClick={clearFilters} />}
 * />
 * ```
 */
declare function ITEmptyState({ icon, title, description, action, className, }: ITEmptyStateProps): react_jsx_runtime.JSX.Element;

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexAlign = "start" | "end" | "center" | "stretch" | "baseline";
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
interface ITFlexProps {
    /** Child elements to render inside the flex container */
    children?: ReactNode;
    /** Main axis direction: "row" | "column" | "row-reverse" | "column-reverse" */
    direction?: FlexDirection;
    /** Cross-axis alignment: "start" | "end" | "center" | "stretch" | "baseline" */
    align?: FlexAlign;
    /** Main-axis justification: "start" | "end" | "center" | "between" | "around" | "evenly" */
    justify?: FlexJustify;
    /** Wrapping behavior: "nowrap" | "wrap" | "wrap-reverse" */
    wrap?: FlexWrap;
    /** Gap between children in units of 0.25rem */
    gap?: number;
    /** Flex grow factor. Pass `true` for 1, `false` for 0, or a number */
    grow?: boolean | number;
    /** Flex shrink factor. Pass `true` for 1, `false` for 0, or a number */
    shrink?: boolean | number;
    /** Flex basis value. Numbers are multiplied by 0.25rem; strings used as-is */
    basis?: string | number;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles */
    style?: CSSProperties;
    /** Custom HTML element type to render instead of the default `div` */
    as?: ElementType;
    /** Click handler */
    onClick?: (e: React.MouseEvent) => void;
}

/**
 * A complete flexbox container with all alignment and spacing options.
 *
 * @example
 * <ITFlex direction="row" justify="between" align="center" gap={4}>
 *   <div>Left</div>
 *   <div>Right</div>
 * </ITFlex>
 *
 * @example
 * <ITFlex direction="column" gap={2} as="section">
 *   <header>Title</header>
 *   <main>Content</main>
 * </ITFlex>
 */
declare function ITFlex({ children, direction, align, justify, wrap, gap, grow, shrink, basis, className, style, as: Component, onClick, }: ITFlexProps): react_jsx_runtime.JSX.Element;

/** @deprecated Legacy (V1) field definition consumed by `ITFormBuilder`'s `fields` prop. Prefer `FieldConfigV2` via the `config` prop for new forms. */
interface FieldConfig {
    /** Field name, matches the key in Formik's `values`/`errors`/`touched` objects. */
    name: string;
    /** Label text rendered above the field. */
    label: string;
    /** Input type. @default "text" */
    type?: "text" | "select" | "date" | "password" | "number";
    /** Formats a numeric field with thousands separators/currency styling as the user types. @default false */
    currencyFormat?: boolean;
    /** Placeholder text shown when the field is empty. */
    placeholder?: string;
    /** Disables the field. @default false */
    disabled?: boolean;
    /** Marks the field as required (shows an asterisk and enables the built-in required message). @default false */
    required?: boolean;
    /** Yup schema used to validate this field. */
    validation?: Yup.AnySchema;
    /** Grid column span (1-12), or `[sm, md, lg]` breakpoint-specific spans. */
    column?: number | number[];
    /** Options for `type: "select"`. */
    options?: {
        value: string;
        label: string;
    }[];
    /** Icon element rendered on the right side of the field. */
    rightIcon?: React__default.ReactNode;
    /** Icon element rendered on the left side of the field. */
    leftIcon?: React__default.ReactNode;
    /** Key read from each option object as its value. @default "value" */
    valueField?: string;
    /** Shows a live character-count hint below the field. @default false */
    showHintLength?: boolean;
    /** Key read from each option object as its display label. @default "label" */
    labelField?: string;
    /** Maximum character length allowed. */
    maxLength?: number;
    /** Minimum character length required. */
    minLength?: number;
    /** Number of visible text rows for a multi-line field. */
    rows?: number;
    /** Applies number formatting (thousand separators) as the user types. @default false */
    formatNumber?: boolean;
    /** Custom side-effect fired on change, in addition to the normal Formik update. Receives the new value and Formik's `setFieldValue`. */
    onChangeAction?: (value: any, setFieldValue: any) => void;
}
/** Supported field kinds for `FieldConfigV2`. */
type FieldTypeV2 = "text" | "number" | "password" | "email" | "select" | "date" | "time" | "checkbox" | "radio" | "array" | "section" | "custom";
/** Form state/helpers passed into `dynamicProps`, `renderWhen`, and `onChangeAction` callbacks for `FieldConfigV2`. */
interface FieldContextV2 {
    /** Current values for every field in the form, keyed by field `name`. */
    values: Record<string, any>;
    /** Programmatically sets a field's value (mirrors Formik's `setFieldValue`). */
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    /** Programmatically sets a field-level error message. */
    setFieldError: (field: string, error: string) => void;
    /** Programmatically marks a field as touched, e.g. to surface its validation error. */
    setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
}
/**
 * V2 field definition consumed by `ITFormBuilder`'s `config` prop. Supports
 * conditional rendering/props, nested sections and repeatable arrays, async
 * options, and custom-component injection.
 */
interface FieldConfigV2 {
    /** Field name, matches the key in Formik's `values`/`errors`/`touched` objects. For `type: "array"`/`"section"`, this is the key under which the nested `fields` values are grouped. */
    name: string;
    /** Label text rendered above the field (or as the section/array heading). */
    label?: string;
    /** Field kind. Determines which input is rendered and which of the props below apply. */
    type: FieldTypeV2;
    /** Grid column span (1-12), or an object with per-breakpoint spans (`sm`/`md`/`lg`/`xl`). */
    column?: number | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    /** Nested field definitions. Required when `type` is `"array"` (the repeatable item shape) or `"section"` (the grouped fields). */
    fields?: FieldConfigV2[];
    /** For `type: "section"`, allows the section to be collapsed/expanded by the user. @default false */
    collapsible?: boolean;
    /** For a `collapsible` section, whether it starts collapsed. @default false */
    defaultCollapsed?: boolean;
    /** Sibling field names this field depends on; changes to any of them re-evaluate `renderWhen`/`dynamicProps`. */
    dependsOn?: string[];
    /** Determines whether this field is rendered (and included in submission) based on current form values. Re-evaluated when any field in `dependsOn` changes. Field is shown when omitted. */
    renderWhen?: (values: Record<string, any>) => boolean;
    /** Computes a partial override of this field's own config from current form values (e.g. make it `required` once another field exceeds a threshold). Re-evaluated when any field in `dependsOn` changes. */
    dynamicProps?: (values: Record<string, any>) => Partial<FieldConfigV2>;
    /** Yup schema used to validate this field. */
    validation?: Yup.AnySchema;
    /** Async validator (e.g. a uniqueness check against an API). Return an error string when invalid, or `null`/`undefined` when valid. */
    asyncValidation?: (value: any, values: Record<string, any>) => Promise<string | null | undefined>;
    /** Initial value used when the form is first initialized/reset. */
    defaultValue?: any;
    /** Placeholder text shown when the field is empty. */
    placeholder?: string;
    /** Disables the field, either statically or computed from current form values. @default false */
    disabled?: boolean | ((values: Record<string, any>) => boolean);
    /** Renders the field as read-only (visible but not editable). @default false */
    readOnly?: boolean;
    /** Marks the field as required, either statically or computed from current form values. @default false */
    required?: boolean | ((values: Record<string, any>) => boolean);
    /** Options for `"select"`/`"radio"` fields: a static array, or an async loader function called once the field mounts. */
    options?: {
        value: string | number;
        label: string;
    }[] | (() => Promise<{
        value: string | number;
        label: string;
    }[]>);
    /** Key read from each option object as its value. @default "value" */
    valueField?: string;
    /** Key read from each option object as its display label. @default "label" */
    labelField?: string;
    /** Icon element rendered on the left side of the field. */
    leftIcon?: React__default.ReactNode;
    /** Icon element rendered on the right side of the field. */
    rightIcon?: React__default.ReactNode;
    /** Custom component rendered instead of a built-in input when `type` is `"custom"`. */
    component?: React__default.ComponentType<any>;
    /** Additional CSS class applied to the field's container. */
    className?: string;
    /** Formats a numeric field with thousands separators/currency styling as the user types. @default false */
    currencyFormat?: boolean;
    /** Shows a live character-count hint below the field. @default false */
    showHintLength?: boolean;
    /** Maximum character length allowed. */
    maxLength?: number;
    /** Minimum character length required. */
    minLength?: number;
    /** Number of visible text rows for a multi-line field. */
    rows?: number;
    /** Applies number formatting (thousand separators) as the user types. @default false */
    formatNumber?: boolean;
    /** Custom side-effect fired whenever this field's value changes. Receives the new value and the shared `FieldContextV2` helpers. */
    onChangeAction?: (val: any, context: FieldContextV2) => void | Promise<void>;
}

/**
 * A single field change event, mirroring the Formik public API surface so any
 * standard Formik binding (`formik.handleChange`) can be passed through.
 */
type ITFormBuilderChangeEvent = React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | {
    target: {
        name: string;
        value: any;
    };
};
/**
 * A single field blur event, mirroring the Formik public API surface so any
 * standard Formik binding (`formik.handleBlur`) can be passed through.
 */
type ITFormBuilderBlurEvent = React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement, Element> | React.FocusEvent<HTMLTextAreaElement, Element> | {
    target: {
        name: string;
        value: any;
    };
};
/**
 * Form-level values keyed by field `name`. Kept as `Record<string, unknown>` so
 * the builder does not impose a concrete domain shape on consumers.
 */
type ITFormBuilderValues = Record<string, unknown>;
/**
 * Validation errors keyed by field `name`.
 */
type ITFormBuilderErrors = Record<string, string | undefined>;
/**
 * Touch state keyed by field `name`.
 */
type ITFormBuilderTouched = Record<string, boolean>;
/**
 * Props for {@link ITFormBuilder}. The component accepts either a legacy V1
 * `fields` array (kept for backward compatibility with projects that adopted
 * the original API) or the richer V2 `config` array. If both are supplied the
 * V2 `config` takes precedence; if neither is supplied the component renders
 * nothing.
 */
interface ITFormBuilderProps {
    /**
     * Legacy V1 field definitions.
     *
     * @deprecated Prefer the `config` prop (V2). V1 is preserved for backward
     * compatibility and supports a reduced subset of features (no rules engine,
     * no `section`, no `custom`, no async options).
     */
    fields?: FieldConfig[];
    /**
     * V2 field configuration array. The recommended entry point. Supports the
     * rules engine (`renderWhen` / `dynamicProps` / `dependsOn`), nested
     * `sections`, custom renderers via `type: "custom"`, async option loaders, and
     * per-field `validation` / `asyncValidation`.
     *
     * When this prop is supplied it shadows any `fields` prop.
     */
    config?: FieldConfigV2[];
    /**
     * Number of grid columns used by the responsive layout. Allowed range is
     * 1..12; values outside the supported grid map fall back to a 12-column
     * layout. @default 12
     */
    columns?: number;
    /** Current form values keyed by field `name`. */
    values: ITFormBuilderValues;
    /**
     * Change handler invoked by every rendered input/select/textarea. Designed
     * to receive the native `event` from a controlled child, so a Formik
     * `handleChange` can be passed directly.
     */
    handleChange: (event: ITFormBuilderChangeEvent) => void;
    /**
     * Blur handler invoked by every rendered input/select/textarea. Designed
     * to receive the native `event` from a controlled child, so a Formik
     * `handleBlur` can be passed directly.
     */
    handleBlur: (event: ITFormBuilderBlurEvent) => void;
    /** Touch state keyed by field `name`. */
    touched: ITFormBuilderTouched;
    /** Validation errors keyed by field `name`. */
    errors: ITFormBuilderErrors;
    /**
     * Programmatically sets a field value. Mirrors Formik's
     * `setFieldValue(field, value, shouldValidate?)` so it can be passed through.
     * Required to enable V2 features such as `onChangeAction` and
     * `dynamicProps` side effects. Defaults to a no-op.
     */
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | any>;
    /**
     * Programmatically marks a field as touched. Mirrors Formik's
     * `setFieldTouched(field, touched?, shouldValidate?)`. Defaults to a no-op.
     */
    setFieldTouched?: (field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void | any>;
    /**
     * Programmatically sets a field-level error message (Formik parity). Defaults
     * to a no-op.
     */
    setFieldError?: (field: string, message: string | undefined) => void;
    /** True while the parent form is submitting. Surfaced via the form context. */
    isSubmitting?: boolean;
    /**
     * Optional children rendered **inside** the V2 `ITFormBuilderProvider`,
     * after the field grid. Useful for custom submit buttons or progress
     * badges that read live state via {@link useFormBuilder} /
     * `useITFormBuilderContext`. Ignored in the V1 (legacy) path because
     * no provider is mounted there.
     */
    children?: React.ReactNode;
}

/**
 * `ITFormBuilder` is a declarative form generator. It renders a responsive
 * grid of inputs from either a legacy V1 `fields` array or the richer V2
 * `config` array and wires every rendered input/select/date to the supplied
 * Formik-style `handleChange`/`handleBlur`/`setFieldValue` callbacks.
 *
 * **V2 features (recommended):**
 * - Rules engine: `renderWhen`, `dynamicProps`, `dependsOn`.
 * - Section grouping with `type: "section"`.
 * - Custom renderers with `type: "custom"`.
 * - Async option loaders via `options: () => Promise<...>`.
 * - Per-field `onChangeAction` for derived fields and side effects.
 * - Nested sections and grids via `fields?: FieldConfigV2[]`.
 *
 * **V1 (legacy):**
 * The `fields` prop accepts a simpler shape (`text` / `number` / `password` /
 * `select` / `date`) without rules, sections, or async options. Kept for
 * backward compatibility.
 *
 * The component is fully controlled: it does not own form state. Wrap it in a
 * Formik `<Formik>` (or any state holder of your choice) and forward its
 * `values`, `handleChange`, `handleBlur`, `touched`, `errors`, and
 * `setFieldValue` props.
 *
 * @example Minimal login form (V1)
 * ```tsx
 * <ITFormBuilder
 *   fields={[
 *     { name: "email", label: "Email", type: "text", required: true, column: 12 },
 *     { name: "password", label: "Password", type: "password", required: true, column: 12 },
 *   ]}
 *   values={formik.values}
 *   handleChange={formik.handleChange}
 *   handleBlur={formik.handleBlur}
 *   touched={formik.touched}
 *   errors={formik.errors}
 * />
 * ```
 *
 * @example Conditional RFC field with derived total (V2)
 * ```tsx
 * const config: FieldConfigV2[] = [
 *   { name: "country", label: "País", type: "select", required: true,
 *     options: [{ value: "MX", label: "México" }, { value: "US", label: "USA" }] },
 *   { name: "rfc", label: "RFC", type: "text", required: true,
 *     dependsOn: ["country"], renderWhen: (v) => v.country === "MX" },
 *   { name: "subtotal", label: "Subtotal", type: "number", currencyFormat: true,
 *     onChangeAction: (val, ctx) => ctx.setFieldValue("total", (Number(val) * 1.16).toFixed(2)) },
 *   { name: "total", label: "Total", type: "number", currencyFormat: true, disabled: true },
 * ];
 *
 * <ITFormBuilder
 *   config={config}
 *   values={formik.values}
 *   handleChange={formik.handleChange}
 *   handleBlur={formik.handleBlur}
 *   touched={formik.touched}
 *   errors={formik.errors}
 *   setFieldValue={formik.setFieldValue}
 * />
 * ```
 *
 * @example Reading form progress from a custom submit button
 * ```tsx
 * const SubmitButton = () => {
 *   const { progress } = useFormBuilder();
 *   return <button disabled={progress < 100}>Submit ({progress}%)</button>;
 * };
 *
 * <ITFormBuilder config={config} values={...} ... />
 * <SubmitButton />
 * ```
 */
declare function ITFormBuilder({ fields, config, columns, values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, children, }: ITFormBuilderProps): react_jsx_runtime.JSX.Element;

interface ITFormHeaderProps {
    /** Header title text */
    title: string;
    /** Optional close button click handler. If omitted, no close button is rendered */
    onClose?: () => void;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Colored header bar for modals and forms with an optional close button.
 * Uses the theme's primary color as the background and automatically
 * calculates a contrasting text color for readability.
 *
 * @example
 * <ITFormHeader title="Create User" onClose={() => setOpen(false)} />
 *
 * @example
 * <ITFormHeader title="Details" className="rounded-none" />
 */
declare function ITFormHeader({ title, onClose, className, }: ITFormHeaderProps): react_jsx_runtime.JSX.Element;

interface ITGridProps {
    /** Child elements */
    children?: ReactNode;
    /** Render as a grid container (CSS grid parent) */
    container?: boolean;
    /** Render as a grid item (CSS grid child). If neither `container` nor `item` is set, renders a plain div */
    item?: boolean;
    /** Gap between grid children in units of 0.25rem. Only applies when `container` is true */
    spacing?: number;
    /** Number of grid columns (1-12). Only applies when `container` is true */
    columns?: number;
    /** Column span at the base breakpoint (mobile). Falls back to `sm` if not set */
    xs?: number;
    /** Column span at the `sm` breakpoint */
    sm?: number;
    /** Column span at the `md` breakpoint */
    md?: number;
    /** Column span at the `lg` breakpoint */
    lg?: number;
    /** Column span at the `xl` breakpoint */
    xl?: number;
    /** Additional CSS classes */
    className?: string;
    /** Inline styles */
    style?: CSSProperties;
    /** Custom HTML element type to render instead of the default `div` */
    as?: ElementType;
}

/**
 * Responsive 12-column CSS grid layout system.
 * Renders as a grid container when `container` is true, as a column-spanning
 * item when `item` is true. Supports breakpoint-aware column spans and
 * configurable spacing between items.
 *
 * @example
 * <ITGrid container columns={12} spacing={4}>
 *   <ITGrid item xs={12} md={6}>Sidebar</ITGrid>
 *   <ITGrid item xs={12} md={6}>Content</ITGrid>
 * </ITGrid>
 *
 * @example
 * <ITGrid container columns={3} spacing={2} as="section">
 *   <ITGrid item>Card 1</ITGrid>
 *   <ITGrid item>Card 2</ITGrid>
 *   <ITGrid item>Card 3</ITGrid>
 * </ITGrid>
 */
declare function ITGrid({ children, container, item, spacing, columns, xs, sm, md, lg, xl, className, style, as: Component, }: ITGridProps): react_jsx_runtime.JSX.Element;

interface ITImageProps {
    /** Source URL of the image */
    src: string;
    /** Alt text for accessibility */
    alt?: string;
    /** Additional CSS classes */
    className?: string;
    /** Fallback image URL shown when the primary `src` fails to load */
    fallback?: string;
    /** Click handler */
    onClick?: () => void;
}

/**
 * Image component with automatic fallback on load error.
 * Displays the primary `src` image and gracefully switches to the
 * `fallback` image if loading fails.
 *
 * @example
 * <ITImage
 *   src="https://example.com/photo.jpg"
 *   fallback="/images/placeholder.png"
 *   alt="User photo"
 * />
 *
 * @example
 * <ITImage
 *   src="/assets/logo.svg"
 *   alt="Company Logo"
 *   className="w-32 h-32 rounded-full"
 * />
 */
declare const ITImage: ({ src, alt, className, fallback, }: ITImageProps) => react_jsx_runtime.JSX.Element;

interface ITInputProps {
    /** Field name used for form identification */
    name: string;
    /** Input type: "text" | "password" | "number" | "email" | "checkbox" | "radio" | "textarea" */
    type?: "text" | "password" | "number" | "email" | "checkbox" | "radio" | "textarea";
    /** Label displayed above the input */
    label?: string;
    /** Enable currency formatting for number inputs (MX locale) */
    currencyFormat?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Current input value */
    value?: any;
    /** Change event handler */
    onChange: (event: any) => void;
    /** Blur event handler */
    onBlur?: (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement, Element>) => void;
    /** Keydown event handler */
    onKeyDown?: (event: React.KeyboardEvent) => void;
    /** Show character count hint below the input */
    showHintLength?: boolean;
    /** Maximum allowed character length */
    maxLength?: number;
    /** Minimum allowed character length */
    minLength?: number;
    /** Color variant from the theme palette */
    variant?: ColorsTypes;
    /** Size preset: "sm" | "md" | "lg". @default "md" */
    size?: SizesTypes;
    /** Disable the input */
    disabled?: boolean;
    /** Additional CSS classes for the outer container */
    containerClassName?: string;
    /** Additional CSS classes for the label */
    labelClassName?: string;
    /** Additional CSS classes for the input element */
    className?: string;
    /** Whether the field has been touched by the user */
    touched?: boolean;
    /** Validation error message. Pass `true` for a generic error, or a string for a custom message */
    error?: string | boolean;
    /** Mark the field as required */
    required?: boolean;
    /** Enable number formatting on blur */
    formatNumber?: boolean;
    /** Auto-focus the input on mount */
    autoFocus?: boolean;
    /** Select all content on click */
    focusContent?: boolean;
    /** Click handler for the input */
    onClick?: () => void;
    /** Icon element rendered on the left side of the input */
    iconLeft?: ReactNode;
    /** Icon element rendered on the right side of the input */
    iconRight?: ReactNode;
    /** Checked state for checkbox and radio types */
    checked?: boolean;
    /** Number of visible rows for textarea type */
    rows?: number;
    /** Minimum numeric value for number inputs */
    min?: number;
    /** Maximum numeric value for number inputs */
    max?: number;
    /** Render the input in read-only mode */
    readOnly?: boolean;
}

/**
 * Text input component with label, validation error display, icon slots,
 * and helper text. Supports text, password, email, number (with currency
 * and thousand formatting), checkbox, radio, and textarea types.
 *
 * @example
 * <ITInput
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   value={email}
 *   onChange={handleChange}
 *   error={errors.email}
 *   required
 * />
 *
 * @example
 * <ITInput
 *   name="amount"
 *   label="Amount"
 *   type="number"
 *   currencyFormat
 *   iconLeft={<FaDollarSign />}
 *   value={amount}
 *   onChange={handleChange}
 *   maxLength={10}
 * />
 */
declare function ITInput({ name, type, label, placeholder, value, onChange, onBlur, disabled, className, containerClassName, labelClassName, touched, error, formatNumber, required, autoFocus, onClick, onKeyDown, iconLeft, iconRight, maxLength, minLength, checked, showHintLength, currencyFormat, rows, min, max, readOnly, focusContent, size }: ITInputProps): react_jsx_runtime.JSX.Element;

/** Represents a navigation item in the sidebar. */
interface ITNavigationItem$1 {
    /** Unique identifier for the navigation item. */
    id: string;
    /** Display label for the navigation item. */
    label: string;
    /** Optional icon rendered next to the label. */
    icon?: React.ReactNode;
    /** Callback fired when the item is clicked. */
    action?: () => void;
    /** Whether the item is currently active and highlighted. */
    isActive?: boolean;
    /** Optional nested sub-navigation items. */
    subitems?: ITNavigationSubItem$1[];
}
/** Represents a sub-navigation item within a parent navigation item. */
interface ITNavigationSubItem$1 {
    /** Unique identifier for the sub-item. */
    id: string;
    /** Display label for the sub-item. */
    label: string;
    /** Callback fired when the sub-item is clicked. */
    action: () => void;
    /** Whether the sub-item is currently active and highlighted. */
    isActive?: boolean;
}
/** Props for the ITNavbar component. */
interface ITNavbarProps {
    /** Logo element rendered in the sidebar header. */
    logo?: React.ReactNode;
    /** Text displayed next to the logo. */
    logoText?: string;
    /** Array of navigation items for the main sidebar menu. */
    navigationItems?: ITNavigationItem$1[];
    /** User menu configuration including avatar, name, email, and dropdown items. */
    userMenu?: {
        /** URL for the user's profile image. */
        userImage?: string;
        /** Display name of the user. */
        userName: string;
        /** Email address of the user. */
        userEmail: string;
        /** Dropdown menu items for the user menu. */
        menuItems: Array<{
            /** Display label for the menu item. */
            label: string;
            /** Callback fired when the menu item is clicked. */
            onClick: () => void;
        }>;
    };
    /** Content rendered in the main area next to the sidebar. */
    children?: React.ReactNode;
    /** Legacy navigation items. Use `navigationItems` instead.
     * @deprecated
     */
    navItems?: React.ReactNode;
    /** Legacy flag to show the sidebar.
     * @deprecated
     */
    showSidebar?: boolean;
    /** Legacy flag to show the sidebar on mobile devices.
     * @deprecated
     */
    showSidebarOnMobile?: boolean;
    /** Legacy sidebar items. Use `navigationItems` instead.
     * @deprecated
     */
    sidebarItems?: React.ReactNode;
}

/**
 * Full sidebar navigation shell with collapsible submenus, user menu dropdown, and themed styling.
 *
 * @example
 * ```tsx
 * <ITNavbar
 *   logo={<LogoIcon />}
 *   logoText="My App"
 *   navigationItems={[
 *     { id: 'home', label: 'Home', icon: <FaHome />, isActive: true },
 *     {
 *       id: 'settings',
 *       label: 'Settings',
 *       icon: <FaCog />,
 *       subitems: [{ id: 'profile', label: 'Profile', action: () => {} }],
 *     },
 *   ]}
 *   userMenu={{
 *     userName: 'John Doe',
 *     userEmail: 'john@example.com',
 *     menuItems: [{ label: 'Logout', onClick: () => {} }],
 *   }}
 * >
 *   <ITPage title="Dashboard">...</ITPage>
 * </ITNavbar>
 * ```
 */
declare function ITNavbar({ logo, logoText, navigationItems, userMenu, children, navItems, showSidebar, showSidebarOnMobile, sidebarItems, }: ITNavbarProps): react_jsx_runtime.JSX.Element;

/** Props for the ITPage component. */
interface ITPageProps {
    /** Page title passed to the header. */
    title?: string;
    /** Description text shown below the title. */
    description?: string;
    /** Array of breadcrumb items for navigation context. */
    breadcrumbs?: ITBreadcrumbItem[];
    /** Action buttons rendered in the header. */
    actions?: ReactNode;
    /** Callback fired when the back button is clicked. */
    backAction?: () => void;
    /** Optional icon displayed next to the title. */
    icon?: ReactNode;
    /** Custom color for the icon. Accepts any valid CSS color value. */
    iconColor?: string;
    /** Whether the page is in a loading state. Shows skeleton placeholders when true. */
    loading?: boolean;
    /** Error message to display. Shows an error state with retry button when provided. */
    error?: string | null;
    /** Custom title for the error state. Default: "Error". */
    errorTitle?: string;
    /** Label for the retry button in the error state. Default: "Reintentar". */
    errorActionLabel?: string;
    /** Callback fired when the retry button is clicked in the error state. */
    onRetry?: () => void;
    /** Whether the page is in an empty state. Shows a placeholder when true. */
    empty?: boolean;
    /** Custom title for the empty state. Default: "Sin datos". */
    emptyTitle?: string;
    /** Custom description for the empty state. */
    emptyDescription?: string;
    /** Custom action element for the empty state. */
    emptyAction?: ReactNode;
    /** Additional CSS classes for the page wrapper. */
    className?: string;
    /** Content rendered inside the page wrapper. */
    children: ReactNode;
    /** Maximum width of the page content. Options: "2xl", "3xl", "4xl", "5xl", "6xl", "7xl". Default: "7xl". */
    maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    /** Whether to remove default padding from the page wrapper. */
    noPadding?: boolean;
}

/**
 * Page template combining a page header and content area with built-in states for loading, error, and empty.
 *
 * @example
 * ```tsx
 * <ITPage
 *   title="Dashboard"
 *   description="Overview of your account"
 *   breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
 *   actions={<ITButton label="Refresh" />}
 *   loading={isLoading}
 *   error={errorMessage}
 *   onRetry={fetchData}
 * >
 *   <ITCard>Dashboard content</ITCard>
 * </ITPage>
 * ```
 */
declare function ITPage(props: ITPageProps): react_jsx_runtime.JSX.Element;

/** Props for the ITPageHeader component. */
interface ITPageHeaderProps {
    /** Page title displayed as the main heading. */
    title: string;
    /** Optional description text shown below the title. */
    description?: string;
    /** Array of breadcrumb items for navigation context. */
    breadcrumbs?: ITBreadcrumbItem[];
    /** Action buttons or elements rendered on the right side. */
    actions?: ReactNode;
    /** Callback fired when the back button is clicked. */
    backAction?: () => void;
    /** Optional icon displayed next to the title. */
    icon?: ReactNode;
    /** Custom color for the icon. Accepts any valid CSS color value. */
    iconColor?: string;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * Page title bar with breadcrumbs, description, back button, and action buttons.
 *
 * @example
 * ```tsx
 * <ITPageHeader
 *   title="Users"
 *   description="Manage all system users"
 *   breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
 *   backAction={() => history.back()}
 *   actions={<ITButton label="Add User" />}
 *   icon={<FaUsers />}
 * />
 * ```
 */
declare function ITPageHeader({ title, description, breadcrumbs, actions, backAction, icon, iconColor, className, }: ITPageHeaderProps): react_jsx_runtime.JSX.Element;

/** Props for the ITPagination component. */
interface ITPaginationProps {
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

/**
 * Page navigation controls with previous/next buttons, page number display, and optional items-per-page selector.
 *
 * @example
 * ```tsx
 * <ITPagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 *   color="primary"
 *   itemsPerPageOptions={[10, 25, 50]}
 *   itemsPerPage={10}
 *   onItemsPerPageChange={(value) => setItemsPerPage(value)}
 *   totalItems={95}
 * />
 * ```
 */
declare function ITPagination({ currentPage, totalPages, onPageChange, siblingCount, color, className, itemsPerPageOptions, itemsPerPage, onItemsPerPageChange, totalItems, }: ITPaginationProps): react_jsx_runtime.JSX.Element;

/** Available positions for the popover relative to the trigger element. */
type PopoverPosition = "top" | "bottom" | "left" | "right";
/** Props for the ITPopover component. */
interface ITPopoverProps {
    /** Element that triggers the popover when clicked. */
    trigger: ReactNode;
    /** Content rendered inside the popover panel. */
    children: ReactNode;
    /** Position of the popover relative to the trigger. Options: "top", "bottom", "left", "right". Default: "bottom". */
    position?: PopoverPosition;
    /** Controlled open state. When provided, the component acts in controlled mode. */
    isOpen?: boolean;
    /** Callback fired when the popover is closed in controlled mode. */
    onClose?: () => void;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * Floating content panel triggered by click on a trigger element, with position control and click-outside dismissal.
 *
 * @example
 * ```tsx
 * <ITPopover trigger={<ITButton label="Options" />} position="bottom">
 *   <ul>
 *     <li><button onClick={handleEdit}>Edit</button></li>
 *     <li><button onClick={handleDelete}>Delete</button></li>
 *   </ul>
 * </ITPopover>
 * ```
 */
declare function ITPopover({ trigger, children, position, isOpen: controlledOpen, onClose, className, }: ITPopoverProps): react_jsx_runtime.JSX.Element;

/** Props for the ITProgress component. */
interface ITProgressProps {
    /** Current progress value. Default: 0. */
    value?: number;
    /** Maximum progress value. Default: 100. */
    max?: number;
    /** Progress variant. "determinate" shows a fixed-width fill, "indeterminate" shows an animated pulsing bar. Default: "determinate". */
    variant?: "determinate" | "indeterminate";
    /** Semantic color from the theme. Options: primary, secondary, success, danger, warning, info, purple, error, gray. Default: "primary". */
    color?: ColorsTypes;
    /** Size of the progress bar. Options: "sm", "md", "lg". Default: "md". */
    size?: "sm" | "md" | "lg";
    /** Additional CSS classes for the container. */
    className?: string;
    /** Inline styles applied to the container. */
    style?: CSSProperties;
}

/**
 * Progress bar indicator with support for determinate and indeterminate variants, themed colors, and multiple sizes.
 *
 * @example
 * ```tsx
 * <ITProgress value={75} max={100} color="success" size="lg" />
 * <ITProgress variant="indeterminate" color="primary" />
 * ```
 */
declare function ITProgress({ value, max, variant, color, size, className, style, }: ITProgressProps): react_jsx_runtime.JSX.Element;

/** Represents a single radio option within a group. */
interface ITRadioOption {
    /** Value of the radio option. */
    value: string;
    /** Display label for the radio option. */
    label: ReactNode;
}
/** Props for the ITRadioGroup component. */
interface ITRadioGroupProps {
    /** Name attribute for the radio input group. Used for form accessibility. */
    name: string;
    /** Currently selected value. */
    value: string;
    /** Callback fired when a radio option is selected. Receives the selected value. */
    onChange: (value: string) => void;
    /** Array of radio options to render. */
    options: ITRadioOption[];
    /** Whether the entire radio group is disabled. */
    disabled?: boolean;
    /** Layout direction of the radio options. Options: "row", "column". Default: "column". */
    direction?: "row" | "column";
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * Radio button group with configurable layout direction and themed selection styling.
 *
 * @example
 * ```tsx
 * <ITRadioGroup
 *   name="color"
 *   value={selectedColor}
 *   onChange={(value) => setSelectedColor(value)}
 *   options={[
 *     { value: 'red', label: 'Red' },
 *     { value: 'blue', label: 'Blue' },
 *     { value: 'green', label: 'Green' },
 *   ]}
 *   direction="row"
 * />
 * ```
 */
declare function ITRadioGroup({ name, value, onChange, options, disabled, direction, className, }: ITRadioGroupProps): react_jsx_runtime.JSX.Element;

/** Represents an option in the search-select dropdown. */
interface ITSearchSelectOption {
    /** Display label for the option. */
    label: string;
    /** Value associated with the option. */
    value: string | number;
    /** Additional custom fields can be attached. */
    [key: string]: any;
}
/** Props for the ITSearchSelect component. */
interface ITSearchSelectProps {
    /** Name attribute for form integrations. */
    name?: string;
    /** Label displayed above the select input. */
    label?: string;
    /** Placeholder text shown when no value is selected. */
    placeholder?: string;
    /** Currently selected value. */
    value?: string | number;
    /** Array of options for static mode (Mode 1: local client-side filtering). */
    options?: ITSearchSelectOption[];
    /** Field used as the option value. Default: "value". */
    valueField?: string;
    /** Field used as the option display label. Default: "label". */
    labelField?: string;
    /** Callback fired when the selected value changes. Receives the value and the full option object. */
    onChange?: (value: string | number, option?: ITSearchSelectOption) => void;
    /** Callback fired when the input loses focus. */
    onBlur?: (e: FocusEvent<any>) => void;
    /** Whether the component is disabled. */
    disabled?: boolean;
    /** Additional CSS classes for the container. */
    className?: string;
    /** Whether the field has been touched (for form validation). */
    touched?: boolean;
    /** Whether the field is required. Shows a red asterisk on the label. */
    required?: boolean;
    /** Error message or boolean indicating an error state. */
    error?: string | boolean;
    /** Whether the field is read-only. */
    readOnly?: boolean;
    /** Size preset: "sm" | "md" | "lg". @default "md" */
    size?: SizesTypes;
    /** Callback for server-side search (Mode 2: API connection). Receives the search query string. */
    onSearch?: (query: string) => void;
    /** Whether options are being loaded from an external API. */
    isLoading?: boolean;
    /** Message displayed when no results are found. Default: "No se encontraron resultados". */
    noResultsMessage?: string;
    /** Custom template for each option in the dropdown list. Receives the option and its state (`isSelected`, `searchTerm`). */
    renderOption?: (option: ITSearchSelectOption, state: {
        isSelected: boolean;
        searchTerm: string;
    }) => ReactNode;
    /** Shows a clear (X) button inside the input. Default: true. */
    clearable?: boolean;
    /** Callback fired when the clear button is pressed. */
    onClear?: () => void;
}

/**
 * Searchable dropdown select with local client-side filtering and server-side search via API.
 *
 * @example
 * ```tsx
 * // Static options (Mode 1)
 * <ITSearchSelect
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'mx', label: 'Mexico' },
 *   ]}
 *   value={selectedCountry}
 *   onChange={(value) => setSelectedCountry(value)}
 * />
 *
 * // API search (Mode 2)
 * <ITSearchSelect
 *   label="User"
 *   placeholder="Search users..."
 *   onSearch={(query) => searchUsers(query)}
 *   options={apiResults}
 *   isLoading={isSearching}
 *   value={selectedUser}
 *   onChange={(value) => setSelectedUser(value)}
 * />
 *
 * // Custom option template + clear button
 * <ITSearchSelect
 *   label="User"
 *   options={users}
 *   value={selectedUser}
 *   onChange={(value) => setSelectedUser(value)}
 *   onClear={() => console.log("cleared")}
 *   renderOption={(option, { isSelected }) => (
 *     <span className={isSelected ? "font-bold" : ""}>{option.label}</span>
 *   )}
 * />
 * ```
 */
declare function ITSearchSelect({ name, options, label, placeholder, valueField, labelField, value, onChange, onBlur, disabled, className, touched, required, error, readOnly, onSearch, isLoading, noResultsMessage, size, renderOption, clearable, onClear, }: ITSearchSelectProps): react_jsx_runtime.JSX.Element;

/** A generic key-value option: e.g. { value: "mx", label: "Mexico" }. */
interface OptionType {
    [key: string]: string;
}
/** Props for the ITSelect native-like dropdown component. */
interface ITSelectProps {
    /** Name attribute for the underlying `<select>` element. */
    name: string;
    /** Array of option objects with value/label key-value pairs. */
    options: OptionType[];
    /** Key in each option object used as the option value. Default: "value". */
    valueField?: string;
    /** Key in each option object used as the display label. Default: "label". */
    labelField?: string;
    /** Label text rendered above the select. */
    label?: string;
    /** Placeholder text for the default empty option. */
    placeholder?: string;
    /** Currently selected value (controlled). */
    value?: string;
    /** Callback fired on selection change. Receives the native change event. */
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    /** Callback fired on blur. Receives the native focus event. */
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    /** Theme color variant (e.g. "primary", "success", "danger"). */
    variant?: ColorsTypes;
    /** Control size: "sm" | "md" | "lg". */
    size?: SizesTypes;
    /** Whether the select is disabled. */
    disabled?: boolean;
    /** Additional CSS classes on the `<select>` element. */
    className?: string;
    /** Marks the field as touched (for validation display). */
    touched?: boolean;
    /** Error message string or true for a default required error. */
    error?: string | boolean;
    /** Whether the field is required. Shows a red asterisk and default error. */
    required?: boolean;
    /** Autofocus the select on mount. */
    autoFocus?: boolean;
    /** Read-only mode: shows the current value as a single disabled option. */
    readOnly?: boolean;
}

declare function ITSelect({ name, options, label, placeholder, valueField, labelField, value, onChange, onBlur, disabled, className, touched, required, error, readOnly, size, }: ITSelectProps): react_jsx_runtime.JSX.Element;

interface CustomITSearchTableProps<T> extends ITSearchTableProps<T> {
    editingRow?: number | null;
    searchTermInitial?: string;
    onClearSearch?: () => void;
    onEdit?: (row: T, index: number) => void;
    onSave?: (row: T, index: number) => void;
    onCancel?: () => void;
    sortConfig?: {
        key: string;
        direction: "asc" | "desc";
    };
}
/**
 * Server-side data table with global search, column sorting, inline editing, and pagination.
 *
 * @example
 * ```tsx
 * <ITSearchTable
 *   columns={[
 *     { key: "name", label: "Name", type: "string", sortable: true, editable: true },
 *     { key: "status", label: "Status", type: "string", filter: true },
 *   ]}
 *   data={rows}
 *   title="Users"
 *   pageIndex={0}
 *   totalCount={100}
 *   totalPages={10}
 *   hasPreviousPage={false}
 *   hasNextPage={true}
 *   onPageChange={(p) => fetchPage(p)}
 *   onSortChange={(s) => sortData(s)}
 *   onFilterChange={(f) => filterData(f)}
 * />
 * ```
 */
declare function ITSearchTable<T extends Record<string, unknown>>({ columns, data, containerClassName, searchTermInitial, searchInputPlaceholder, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, pageIndex, totalCount, totalPages, hasPreviousPage, hasNextPage, onPageChange, onItemsPerPageChange, onSortChange, onFilterChange, sortConfig, editingRow, validationSchema, onClearSearch, onEdit, onSave, onCancel, }: CustomITSearchTableProps<T>): react_jsx_runtime.JSX.Element;

/** Available sizes for the segmented control: "sm" | "md". */
type SegmentedControlSize = "sm" | "md";
/** A single option within the segmented control. */
interface ISegmentedOption {
    /** Unique value for the option. */
    value: string;
    /** Display label for the option. */
    label: string;
    /** Optional icon rendered alongside the label. */
    icon?: ReactNode;
}
/** Props for the ITSegmentedControl component. */
interface ITSegmentedControlProps {
    /** Array of mutually exclusive options: { label, value, icon? }. */
    options: ISegmentedOption[];
    /** Currently selected value (controlled). */
    value: string;
    /** Callback fired when the user selects a different option. Receives the new value. */
    onChange: (value: string) => void;
    /** Control size: "sm" | "md". Default: "md". */
    size?: SegmentedControlSize;
    /** Additional CSS classes on the container. */
    className?: string;
    /** Whether the entire control is disabled. */
    disabled?: boolean;
}

/**
 * iOS-style segmented toggle for switching between mutually exclusive options.
 *
 * @example
 * ```tsx
 * <ITSegmentedControl
 *   options={[
 *     { value: "day", label: "Day" },
 *     { value: "week", label: "Week", icon: <FaCalendar /> },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * ```
 */
declare function ITSegmentedControl({ options, value, onChange, size, className, disabled, }: ITSegmentedControlProps): react_jsx_runtime.JSX.Element;

/** A sub-navigation item nested under a parent menu. */
interface ITNavigationSubItem {
    /** Unique identifier for the sub-item. */
    id: string;
    /** Display label. */
    label: string;
    /** Click handler. */
    action?: () => void;
    /** Whether this sub-item is currently active/highlighted. */
    isActive?: boolean;
}
/** A top-level navigation item, optionally with sub-items. */
interface ITNavigationItem {
    /** Unique identifier. */
    id: string;
    /** Display label. */
    label: string;
    /** Icon component rendered left of the label. */
    icon?: React.ReactNode;
    /** Click handler for top-level items without submenus. */
    action?: () => void;
    /** Whether this item is currently active/highlighted. */
    isActive?: boolean;
    /** Nested sub-navigation items (renders as expandable submenu). */
    subitems?: ITNavigationSubItem[];
    /** Badge text displayed on the item (e.g. notification count). */
    badge?: string;
}
/** Props for the ITSidebar vertical navigation component. */
interface ITSidebarProps {
    /** Navigation structure: top-level items with optional sub-items. */
    navigationItems: ITNavigationItem[];
    /** Whether the sidebar is collapsed to icon-only mode. */
    isCollapsed?: boolean;
    /** Callback when the user toggles collapse via the toggle button. */
    onToggleCollapse?: () => void;
    /** Force sidebar visible on mobile breakpoints. */
    visibleOnMobile?: boolean;
    /** Callback when a top-level navigation item is clicked. Receives the item. */
    onItemClick?: (item: ITNavigationItem) => void;
    /** Callback when a sub-navigation item is clicked. Receives the sub-item. */
    onSubItemClick?: (subitem: ITNavigationSubItem) => void;
    /** Visual connector style for sub-items: "dot" | "|" | "none". Default: "dot". */
    subitemConnector?: 'dot' | '|' | 'none';
    /** Additional CSS classes on the sidebar `<aside>`. */
    className?: string;
}

/**
 * Vertical navigation sidebar with submenu expand/collapse, hover tooltips in collapsed mode,
 * and glassmorphism styling.
 *
 * @example
 * ```tsx
 * <ITSidebar
 *   navigationItems={[
 *     { id: "dashboard", label: "Dashboard", icon: <FaHome />, isActive: true },
 *     {
 *       id: "settings", label: "Settings", icon: <FaCog />,
 *       subitems: [
 *         { id: "profile", label: "Profile", action: () => navigate("/profile") },
 *         { id: "billing", label: "Billing", isActive: true },
 *       ],
 *     },
 *   ]}
 *   isCollapsed={collapsed}
 *   onToggleCollapse={() => setCollapsed(!collapsed)}
 * />
 * ```
 */
declare function ITSidebar({ navigationItems, isCollapsed, className, visibleOnMobile, onItemClick, onSubItemClick, subitemConnector, }: ITSidebarProps): react_jsx_runtime.JSX.Element;

/** Skeleton shape variant: "text" (line) | "circular" (avatar/icon) | "rectangular" (card/image). */
type SkeletonVariant = "text" | "circular" | "rectangular";
/** Props for the ITSkeleton content placeholder loader component. */
interface ITSkeletonProps {
    /** Skeleton shape: "text" | "circular" | "rectangular". Default: "text". */
    variant?: SkeletonVariant;
    /** Explicit width (CSS value or number in px). Text variant defaults to random 60%-90%. */
    width?: string | number;
    /** Explicit height (CSS value or number in px). */
    height?: string | number;
    /** Number of skeleton items to render. Default: 1. */
    count?: number;
    /** Additional CSS classes on each skeleton item. */
    className?: string;
    /** Inline style object applied to each skeleton item. */
    style?: CSSProperties;
}

/**
 * Content placeholder loader with pulse animation for text, circles, and rectangles.
 *
 * @example
 * ```tsx
 * <ITSkeleton variant="circular" width={40} height={40} />
 * <ITSkeleton variant="text" count={3} />
 * <ITSkeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
declare function ITSkeleton({ variant, width, height, count, className, style, }: ITSkeletonProps): react_jsx_runtime.JSX.Element;

/** Props for the ITSlideToggle iOS-style toggle switch. */
interface ITSlideToggleProps {
    /** Callback executed when the switch is toggled. Receives the new boolean state. */
    onToggle?: (value: boolean) => void;
    /** Controlled state. Use this to fully control the component externally. */
    isOn?: boolean;
    /** Initial state for uncontrolled usage. Default: false. */
    initialState?: boolean;
    /**
     * Semantic theme color when activated (e.g. "primary", "success", "danger").
     * Can also be a hex value. Default: "success".
     */
    activeColor?: string;
    /**
     * Semantic theme color or hex value when deactivated.
     * Default: '#9ca3af' (gray-400).
     */
    inactiveColor?: string;
    /** Whether the switch is disabled. */
    disabled?: boolean;
    /** Size of the switch: "sm" | "md" | "lg". Default: "md". */
    size?: "sm" | "md" | "lg";
    /** Additional CSS classes on the container. */
    className?: string;
}

/**
 * iOS-style toggle switch with theme color support.
 * Supports fully controlled (`isOn`) or uncontrolled (`initialState`) modes.
 *
 * @example
 * ```tsx
 * // Controlled
 * <ITSlideToggle isOn={enabled} onToggle={setEnabled} activeColor="primary" />
 *
 * // Uncontrolled with initial state
 * <ITSlideToggle initialState onToggle={(v) => console.log(v)} />
 * ```
 */
declare function ITSlideToggle({ onToggle, isOn: controlledIsOn, initialState, activeColor, inactiveColor, // default gray-400
disabled, size, className, }: ITSlideToggleProps): react_jsx_runtime.JSX.Element;

/** Props for the ITSlider range slider component. */
interface ITSliderProps {
    /** Current slider value (controlled). */
    value: number;
    /** Callback fired when the value changes. Receives the new numeric value. */
    onChange: (value: number) => void;
    /** Minimum allowed value. Default: 0. */
    min?: number;
    /** Maximum allowed value. Default: 100. */
    max?: number;
    /** Step increment. Default: 1. */
    step?: number;
    /** Label displayed above the slider. Also shows the current value. */
    label?: string;
    /** Whether the slider is disabled. */
    disabled?: boolean;
    /** Additional CSS classes on the container. */
    className?: string;
}

/**
 * Range slider control with min/max/step and optional label displaying the current value.
 *
 * @example
 * ```tsx
 * <ITSlider
 *   label="Volume"
 *   value={volume}
 *   onChange={setVolume}
 *   min={0}
 *   max={100}
 *   step={5}
 * />
 * ```
 */
declare function ITSlider({ value, onChange, min, max, step, label, disabled, className, }: ITSliderProps): react_jsx_runtime.JSX.Element;

/** Flex direction: "row" | "column" | "row-reverse" | "column-reverse". */
type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
/** Cross-axis alignment: "start" | "end" | "center" | "stretch" | "baseline". */
type StackAlignment = "start" | "end" | "center" | "stretch" | "baseline";
/** Main-axis justification: "start" | "end" | "center" | "between" | "around" | "evenly". */
type StackJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
/** Flex wrap behaviour: "nowrap" | "wrap" | "wrap-reverse". */
type StackWrap = "nowrap" | "wrap" | "wrap-reverse";
/** Props for the ITStack flex layout component. */
interface ITStackProps {
    /** Stack children elements. */
    children?: ReactNode;
    /** Flex direction. Default: "column". */
    direction?: StackDirection;
    /** Spacing between children in 0.25rem units (0–12). Default: 0. */
    spacing?: number;
    /** Cross-axis alignment. */
    alignItems?: StackAlignment;
    /** Main-axis justification. */
    justifyContent?: StackJustify;
    /** Whether children should wrap. */
    flexWrap?: StackWrap;
    /** Optional divider element inserted between children. */
    divider?: ReactNode;
    /** Additional CSS classes on the container. */
    className?: string;
    /** Inline styles on the container. */
    style?: CSSProperties;
    /** HTML element type to render as. Default: "div". */
    as?: ElementType;
}

/**
 * Simplified flex stack with consistent spacing (gap) for arranging children in a row or column.
 * Supports an optional divider element between children.
 *
 * @example
 * ```tsx
 * <ITStack direction="row" spacing={4} alignItems="center">
 *   <ITButton>Cancel</ITButton>
 *   <ITButton variant="primary">Save</ITButton>
 * </ITStack>
 * ```
 *
 * @example
 * ```tsx
 * <ITStack direction="column" spacing={2} divider={<hr />}>
 *   <p>Item 1</p>
 *   <p>Item 2</p>
 *   <p>Item 3</p>
 * </ITStack>
 * ```
 */
declare function ITStack({ children, direction, spacing, alignItems, justifyContent, flexWrap, divider, className, style, as: Component, }: ITStackProps): react_jsx_runtime.JSX.Element;

interface ITStatCardProps {
    /** The metric label displayed above the value. */
    label: string;
    /** The primary numeric or string value shown in the card. */
    value: string | number;
    /** Optional trend indicator text (e.g. "+12%", "-3"). */
    trend?: string;
    /** Direction of the trend, used to color the trend badge. */
    trendDirection?: "up" | "down" | "neutral";
    /** Icon element rendered next to the label in the top-right corner. */
    icon?: ReactNode;
    /** Background color class for the card (e.g. "bg-primary-50 dark:bg-primary-950/20"). */
    color?: string;
    /** Additional CSS classes for the outermost wrapper. */
    className?: string;
    /** Inline styles applied to the card container. */
    style?: CSSProperties;
    /** Click handler — when provided the card gains button semantics. */
    onClick?: () => void;
}

/**
 * A metric card displaying a value with an optional trend indicator and icon.
 * Automatically detects trend direction from the trend string prefix.
 *
 * @example
 * <ITStatCard label="Revenue" value="$12,430" trend="+12%" trendDirection="up" icon={<FaDollarSign />} />
 *
 * @example
 * <ITStatCard label="Users" value={1042} trend="-3%" trendDirection="down" onClick={() => navigate("/users")} />
 */
declare function ITStatCard({ label, value, trend, trendDirection, icon, color, className, style, onClick, }: ITStatCardProps): react_jsx_runtime.JSX.Element;

/**
 * A feature-rich data table with per-column filtering, sortable columns,
 * pagination, boolean/catalog type support, and currency formatting.
 *
 * @example
 * <ITTable
 *   columns={[
 *     { key: "name", label: "Name", type: "string", sortable: true },
 *     { key: "active", label: "Active", type: "boolean", filter: true },
 *     { key: "actions", label: "", type: "actions", actions: (row) => <ITButton>Edit</ITButton> },
 *   ]}
 *   data={users}
 *   title="User List"
 *   size="sm"
 * />
 */
declare function ITTable<T extends Record<string, unknown>>({ columns, data, containerClassName, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, renderCard, defaultView, showVerticalBorder, verticalBorderClassname, }: ITTableProps<T>): react_jsx_runtime.JSX.Element;

interface ITTextProps extends HTMLAttributes<HTMLElement> {
    /** The content rendered inside the element. */
    children?: ReactNode;
    /** Additional CSS classes applied to the element. */
    className?: string;
    /** HTML element type to render (e.g. "p", "span", "h1", "label"). */
    as?: ElementType;
    /** Applies muted text color (--color-text-muted) when true. */
    muted?: boolean;
    /** Associates a label with a form element (rendered as `htmlFor` when `as` is "label"). */
    htmlFor?: string;
}

/**
 * Semantic typography wrapper that renders any HTML element.
 * Supports muted styling via the `muted` prop and passes through all standard HTML attributes.
 *
 * @example
 * <ITText as="h1" className="text-2xl font-bold">Welcome</ITText>
 *
 * @example
 * <ITText as="label" htmlFor="email" muted>Email Address</ITText>
 */
declare function ITText({ children, as: Tag, className, muted, style, ...rest }: ITTextProps & {
    style?: React.CSSProperties;
}): react_jsx_runtime.JSX.Element;

interface ITTextareaProps {
    /** Controlled value of the textarea. */
    value?: string;
    /** Callback fired when the value changes, receiving the new string. */
    onChange?: (value: string) => void;
    /** Label text rendered above the textarea. */
    label?: string;
    /** Placeholder text shown when the textarea is empty. */
    placeholder?: string;
    /** Number of visible text rows (default 4). */
    rows?: number;
    /** Disables the textarea when true. */
    disabled?: boolean;
    /** Validation error message displayed below the textarea. */
    error?: string;
    /** Additional CSS classes for the wrapper. */
    className?: string;
    /** Name attribute for form submission and label association via `htmlFor`. */
    name?: string;
    /** Maximum number of characters allowed. */
    maxLength?: number;
    /** Resize behavior of the textarea: "none" | "vertical" | "horizontal" | "both". */
    resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * Multi-line text input with optional label, validation error display,
 * character limit, and configurable resize behavior.
 *
 * @example
 * <ITTextarea
 *   name="bio"
 *   label="Biography"
 *   value={bio}
 *   onChange={setBio}
 *   maxLength={500}
 *   rows={6}
 *   resize="vertical"
 *   error={bio.length > 500 ? "Max 500 characters" : undefined}
 * />
 */
declare function ITTextarea({ value, onChange, label, placeholder, rows, disabled, error, className, name, maxLength, resize, }: ITTextareaProps): react_jsx_runtime.JSX.Element;

interface ITTabItem {
    /** Unique identifier for the tab. */
    id: string;
    /** Display label shown on the tab button. */
    label: string;
    /** Content rendered when this tab is active. */
    content: ReactNode;
    /** Optional icon rendered beside the label. */
    icon?: ReactNode;
    /** Whether the tab is disabled and non-interactive. */
    disabled?: boolean;
}
interface ITTabsProps {
    /** Array of tab definitions: id, label, content, icon, and disabled state. */
    items: ITTabItem[];
    /** The id of the tab active by default (first item if omitted). */
    defaultActiveId?: string;
    /** Callback fired when the active tab changes, receiving the new tab id. */
    onChange?: (id: string) => void;
    /** Visual variant: "line" (underline indicator) or "pill" (rounded background). */
    variant?: 'line' | 'pill';
    /** Additional CSS classes for the tab header row. */
    className?: string;
    /** Additional CSS classes for the outermost wrapper. */
    containerClassName?: string;
}

/**
 * Tabbed navigation component with "line" and "pill" visual variants.
 * Manages its own active state internally via a defaultActiveId.
 *
 * @example
 * <ITTabs
 *   items={[
 *     { id: "tab1", label: "General", content: <GeneralPanel /> },
 *     { id: "tab2", label: "Settings", content: <SettingsPanel />, disabled: true },
 *   ]}
 *   defaultActiveId="tab1"
 *   onChange={(id) => console.log("Active tab:", id)}
 * />
 */
declare const ITTabs: React__default.FC<ITTabsProps>;

interface ITTripleFilterOption<T> {
    /** Display label for the filter button. */
    label: string;
    /** The value associated with this option (string or boolean). */
    value: T;
}
interface ITTripleFilterProps<T> {
    /** Currently selected value. Must match one of the option values. */
    value: T;
    /** Called when the user selects a different option. Receives the new value. */
    onChange: (value: T) => void;
    /** Array of filter options to render (typically 2-4 items, e.g. All / Active / Inactive). */
    options: ITTripleFilterOption<T>[];
    /** Color theme for the active indicator. One of "primary", "secondary", "success", "danger", "warning", "info", "purple", "error", "gray". @default "primary" */
    color?: ColorsTypes;
    /** Additional CSS classes applied to the outermost container. */
    className?: string;
}

/**
 * ITTripleFilter — generic segmented toggle filter bar for quick data filtering.
 *
 * Renders a row of pill-shaped buttons where exactly one is active at a time.
 * Supports any string or boolean value type and configurable color theming.
 * Commonly used for "All / Active / Inactive" or similar tri-state filters.
 *
 * @example
 * // Boolean triple filter
 * <ITTripleFilter<boolean>
 *   value={showActive}
 *   onChange={setShowActive}
 *   options={[
 *     { label: "All", value: false },
 *     { label: "Active", value: true },
 *   ]}
 * />
 *
 * @example
 * // String triple filter with danger color
 * <ITTripleFilter<string>
 *   value={status}
 *   onChange={setStatus}
 *   options={[
 *     { label: "Pending", value: "pending" },
 *     { label: "Approved", value: "approved" },
 *     { label: "Rejected", value: "rejected" },
 *   ]}
 *   color="danger"
 *   className="my-4"
 * />
 */
/**
 * @description Generic triple/segmented filter component with color support.
 */
declare const ITTripleFilter: <T extends string | boolean>({ value, onChange, options, color, className, }: ITTripleFilterProps<T>) => react_jsx_runtime.JSX.Element;

interface ITToastProps {
    /** Toast message text to display. */
    message: string;
    /** Severity type determining icon and background color. One of "success", "error", "warning", "info", "primary", or "danger". @default "info" */
    type?: "success" | "error" | "warning" | "info" | "primary" | "danger" | string;
    /** Auto-dismiss duration in milliseconds. @default 1500 */
    duration?: number;
    /** On-screen placement. One of "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left". @default "top-right" */
    position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
    /** Callback invoked after the toast finishes its dismiss transition animation. */
    onClose?: () => void;
}

/**
 * ITToast — floating notification with automatic dismiss and severity-based styling.
 *
 * Renders a positioned alert with an icon, message, and close button.
 * Supports "success", "error", "warning", "info", "primary", and "danger" types.
 * Auto-dismisses after the configured duration and calls `onClose` on completion.
 *
 * @example
 * // Basic info toast
 * <ITToast message="Item saved" type="success" />
 *
 * @example
 * // Error toast with custom position and duration
 * <ITToast
 *   message="Something went wrong"
 *   type="error"
 *   position="bottom-center"
 *   duration={5000}
 *   onClose={() => console.log("dismissed")}
 * />
 */
declare function ITToast({ message, type, duration, position, onClose, }: ITToastProps): react_jsx_runtime.JSX.Element;

/** Toolbar actions supported by ITWysiwyg. */
type ToolbarAction = "bold" | "italic" | "underline" | "highlight" | "ul" | "ol" | "clear";
interface ITWysiwygProps {
    /** Controlled HTML value rendered inside the editor. Overrides the visible content only while the editor is not focused (avoids caret jumps). */
    value?: string;
    /** Callback fired with the editor's HTML whenever the content changes. */
    onChange?: (html: string) => void;
    /** Label text rendered above the editor. */
    label?: string;
    /** Placeholder text shown when the editor is empty. */
    placeholder?: string;
    /** Validation error message displayed below the editor. */
    error?: string;
    /** Disables the editor and toolbar when true. @default false */
    disabled?: boolean;
    /** Renders content in read-only mode (not editable, toolbar disabled). @default false */
    readOnly?: boolean;
    /** Name attribute for form submission and label association via `htmlFor`. */
    name?: string;
    /** Editor size: controls padding and font size. Valid values: `"sm"`, `"md"`, `"lg"`. @default "md" */
    size?: SizesTypes;
    /** Minimum height in pixels of the editable area. @default 128 */
    minHeight?: number;
    /** Background color used by the marker tool (yellow highlight). @default "#fde68a" */
    highlightColor?: string;
    /** Subset of toolbar actions to render. @default all actions */
    toolbar?: ToolbarAction[];
    /** Additional CSS classes for the wrapper. */
    className?: string;
}

/**
 * Lightweight WYSIWYG editor (no external rich-text dependency). Provides bold,
 * italic, underline, a yellow marker highlight and ordered/unordered lists.
 * Formatting is applied manually over the Selection/Range API (no deprecated
 * `document.execCommand`), toggling elements by wrapping/unwrapping text nodes.
 *
 * The component is uncontrolled at the DOM level: it renders `value` lazily and
 * only re-syncs it when the editor is not focused (`onChange` reports the HTML).
 *
 * @example
 * <ITWysiwyg
 *   label="Descripción"
 *   value={content}
 *   onChange={setContent}
 *   placeholder="Escribe aquí..."
 * />
 *
 * @example
 * <ITWysiwyg size="lg" highlightColor="#fef08a" toolbar={["bold", "ul"]} />
 */
declare function ITWysiwyg({ value, onChange, label, placeholder, error, disabled, readOnly, name, size, minHeight, highlightColor, toolbar, className, }: ITWysiwygProps): react_jsx_runtime.JSX.Element;

/** Allowed file MIME types for the dropzone */
declare enum FileTypeEnum {
    PDF = "application/pdf",
    XLS = "application/vnd.ms-excel",
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    CSV = "text/csv",
    PNG = "image/png",
    JPG = "image/jpg",
    JPEG = "image/jpeg",
    MP4 = "video/mp4",
    MOV = "video/quicktime",
    AVI = "video/x-msvideo",
    MKV = "video/x-matroska",
    VIDEO_3GPP = "video/3gpp",
    WEBM = "video/webm"
}
/** Upload lifecycle status */
declare enum UploadStatus {
    PENDING = "pendiente",
    UPLOADING = "subiendo",
    UPLOADED = "subido",
    ERROR = "error"
}
interface ITDropfileProps {
    /** Called when a file is selected or cleared. */
    onFileSelect: (file: File | null) => void;
    /** Called when the user cancels the current selection. */
    onCancel?: () => void;
    /** Called when the user confirms and submits the file. */
    onSubmit?: (file: File) => void;
    /** List of accepted MIME types. */
    acceptedFileTypes?: FileTypeEnum[];
    /** Additional classes for the preview/content area. */
    contentClassName?: string;
    /** Additional classes for the outermost container. */
    containerClassName?: string;
    /** Whether to show the status badge (pending/uploading/uploaded/error). */
    showStatusBadge?: boolean;
    /** Externally controlled upload status. */
    uploadStatus?: UploadStatus;
    /** Callback when upload status changes. */
    onStatusChange?: (status: UploadStatus) => void;
    /** An initial preview URL to display before any file is selected. */
    initialPreviewUrl?: string | null;
    /**
     * Presentation mode. `"drop"` renders the dropzone/preview inline (default,
     * current behavior, unaffected by anything below). `"button"` renders a
     * compact trigger button instead — clicking it opens the same
     * dropzone/preview UI inside an `ITDialog`, so callers don't need to build
     * their own "open a modal" button around `ITDropfile`. Meant for repeated
     * uploads (e.g. an attachments list): ~900ms after a successful confirm,
     * the modal closes AND the selection resets, so the trigger goes back to
     * `buttonLabel` ready for the next file — same effect callers previously
     * got by remounting `ITDropfile` with a changing `key`.
     * @default "drop"
     */
    view?: "drop" | "button";
    /** Label for the trigger button when `view="button"` and no file is selected yet. @default "Subir archivo" */
    buttonLabel?: string;
    /** Title of the modal opened when `view="button"`. Defaults to `buttonLabel`. */
    modalTitle?: string;
}

/**
 * Drag-and-drop file uploader with preview, status tracking, and confirmation flow.
 *
 * Supports configurable accepted file types (PDF, Excel, CSV, images), visual
 * drag-active feedback, image previews, and a three-step workflow: select →
 * confirm → upload. Upload status is tracked internally or controlled
 * externally via the `uploadStatus` prop. Re-exports `FileTypeEnum` and
 * `UploadStatus` enums for consuming code.
 *
 * @example
 * ```tsx
 * <ITDropfile
 *   onFileSelect={(file) => setSelectedFile(file)}
 *   onSubmit={(file) => uploadToServer(file)}
 *   acceptedFileTypes={[FileTypeEnum.PDF, FileTypeEnum.XLSX]}
 *   showStatusBadge
 * />
 * ```
 *
 * @example
 * Compact trigger button that opens the dropzone in a modal — no need to
 * build your own "open a modal" button around `ITDropfile`:
 * ```tsx
 * <ITDropfile
 *   view="button"
 *   buttonLabel="Subir archivos"
 *   onFileSelect={(file) => setSelectedFile(file)}
 * />
 * ```
 */
declare const ITDropfile: React__default.FC<ITDropfileProps>;

interface ITTopBarNavItem {
    /** Unique identifier for the navigation item. */
    id: string;
    /** Display label shown in the navigation bar. */
    label: string;
    /** Optional icon element rendered beside the label. */
    icon?: any;
    /** Click handler for this navigation item (legacy, prefer onNavItemClick). */
    action: () => void;
}
interface ITTopBarProps {
    /** Optional logo element (e.g. an `<img>` or SVG component). */
    logo?: any;
    /** Text displayed next to the logo. */
    logoText?: string;
    /** User dropdown configuration including name, email, avatar, and menu items. */
    userMenu?: {
        /** Display name shown in the trigger button and dropdown header. */
        userName: string;
        /** User email shown in the trigger button and dropdown header. */
        userEmail: string;
        /** Optional avatar image URL. Falls back to a user-circle icon when omitted. */
        userImage?: string;
        /** Array of dropdown menu actions: `{ label: string, onClick: () => void }`. Items containing "salir", "cerrar", or "logout" are styled as destructive. */
        menuItems: {
            label: string;
            onClick: () => void;
        }[];
    };
    /** Desktop navigation items rendered beside the logo. */
    navItems?: ITTopBarNavItem[];
    /** Callback fired when a navigation item is clicked. Receives the item's `id`. */
    onNavItemClick?: (id: string) => void;
    /** Whether to show the mobile hamburger menu toggle button. @default false */
    showMobileMenuButton?: boolean;
    /** Callback fired when the mobile menu toggle button is clicked. */
    onToggleMobileMenu?: () => void;
}

interface ITLayoutProps {
    /** Top bar configuration and props */
    topBar: ITTopBarProps;
    /** Sidebar configuration and props */
    sidebar: ITSidebarProps;
    /** Main content rendered in the center area */
    children: React.ReactNode;
    /** Additional CSS classes for the outermost wrapper */
    className?: string;
    /** Additional CSS classes for the content container */
    contentClassName?: string;
}

/**
 * Main application shell with sidebar, topbar, and content area.
 * Provides a responsive layout with a collapsible desktop sidebar,
 * a sliding mobile sidebar overlay, and a scrollable main content region.
 *
 * @example
 * <ITLayout
 *   topBar={{ title: "Dashboard", userMenu: [...] }}
 *   sidebar={{ items: [...], activeKey: "overview" }}
 * >
 *   <p>Page content goes here</p>
 * </ITLayout>
 *
 * @example
 * <ITLayout
 *   topBar={{ title: "Settings" }}
 *   sidebar={{ items: navItems }}
 *   className="min-h-screen"
 *   contentClassName="max-w-5xl"
 * >
 *   <SettingsPage />
 * </ITLayout>
 */
declare function ITLayout({ topBar, sidebar, children, className, contentClassName, }: ITLayoutProps): react_jsx_runtime.JSX.Element;

type LoaderSize = "sm" | "md" | "lg" | "xl";
type LoaderVariant = "spinner" | "dots" | "bar" | "pulse";

interface LoaderProps {
    /** Loader size: "sm" | "md" | "lg" | "xl" */
    size?: LoaderSize;
    /** Animation variant: "spinner" | "dots" | "bar" | "pulse" */
    variant?: LoaderVariant;
    /** Color value. Can be a theme semantic color key, hex string, rgb string, or CSS class */
    color?: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Loading indicators with multiple animation types: spinner, dots, pulse,
 * and bar. Supports configurable size, color (theme semantic or custom),
 * and inline/padded rendering.
 *
 * @example
 * <ITLoader variant="spinner" size="lg" color="primary" />
 *
 * @example
 * <ITLoader variant="dots" size="md" color="#06b6d4" />
 *
 * @example
 * <ITLoader variant="bar" size="sm" color="secondary" className="w-48" />
 *
 * @example
 * <ITLoader variant="pulse" size="xl" color="red-500" />
 */
declare function ITLoader({ size, variant, color, // Default to semantic primary
className, }: LoaderProps): react_jsx_runtime.JSX.Element;

type IconType = React__default.ReactNode;
/** A single step in an `ITStepper` flow. */
interface Step {
    /** Label shown next to the step indicator. */
    label: string;
    /** Content rendered in the panel while this step is active. */
    content: React__default.ReactNode;
    /** Custom icon shown in the step indicator when the stepper's `useIcons` is true. */
    icon?: IconType;
}
interface ITStepperProps {
    /** Array of step objects defining label, content, and optional icon. */
    steps: Step[];
    /** Zero-based index of the currently active step. */
    currentStep: number;
    /** Called when the user clicks "Finish" on the last step. */
    onFinish?: () => void;
    /** Called whenever the active step changes, receiving the new index. */
    onStepChange?: (step: number) => void;
    /** Whether clicking on completed or current step indicators jumps to that step. */
    allowClickToJump?: boolean;
    /** When true, renders step icons (if provided) instead of numeric indicators. */
    useIcons?: boolean;
    /** Disables the "Next" / "Finish" button. */
    disableNext?: boolean;
    /** Additional CSS classes for the outermost wrapper. */
    containerClassName?: string;
    /** Additional CSS classes for the content panel. */
    stepClassName?: string;
    /** Makes the step content area vertically scrollable. */
    scrollableContent?: boolean;
    /** Maximum height of the scrollable content area (CSS value, e.g. "400px"). */
    maxContentHeight?: string;
    /**
     * Semantic theme color for active steps and buttons.
     * Default: 'primary'
     */
    color?: string;
}

/**
 * A step-by-step wizard / progress indicator with animated content transitions,
 * clickable step navigation, and configurable icons.
 *
 * @example
 * <ITStepper
 *   steps={[
 *     { label: "Details", content: <StepOneForm /> },
 *     { label: "Review", content: <StepTwoReview />, icon: <FaClipboardCheck /> },
 *   ]}
 *   currentStep={0}
 *   onStepChange={setStep}
 *   onFinish={() => alert("Done!")}
 * />
 */
declare function ITStepper({ steps, currentStep, onFinish, onStepChange, allowClickToJump, useIcons, disableNext, containerClassName, stepClassName, scrollableContent, maxContentHeight, color, }: ITStepperProps): react_jsx_runtime.JSX.Element;

interface ITThemePalette$1 {
    /** Main brand accent color (hex). Drives primary buttons, active nav items, focus rings, links, and the `--color-primary` CSS variable. @default "#06b6d4" */
    primary: string;
    /** Secondary/neutral accent color (hex). Used for less prominent actions and secondary badges/buttons. @default "#6b7280" */
    secondary: string;
    /** Tertiary accent color (hex), used for a third level of emphasis (e.g. alternate badges, chart accents). @default "#8b5cf6" */
    ternary: string;
    /** Semantic color for destructive/error states (hex): delete buttons, error badges, invalid form fields. @default "#ef4444" */
    danger: string;
    /** Semantic color for success/confirmation states (hex): success badges, completed steps, positive stats. @default "#22c55e" */
    success: string;
    /** Semantic color for informational states (hex): info banners/badges, neutral notices. @default "#3b82f6" */
    info: string;
    /** Semantic color for alert/caution states (hex), distinct from `warning`. Used by components that need a stronger visual cue than warning. @default "#f97316" */
    alert: string;
    /** Semantic color for warning states (hex): warning badges/banners, pending states. @default "#eab308" */
    warning: string;
    /** Colors for the app shell's sidebar and top navbar (ITSidebar, ITNavbar, ITTopbar, ITLayout). */
    layout: {
        /** Background color of the sidebar (hex). @default "#ffffff" */
        sidebarBg: string;
        /** Text/icon color used on the sidebar. @default "#334155" */
        sidebarText: string;
        /** Background color of the top navigation bar (hex). @default "#ffffff" */
        navbarBg: string;
        /** Text/icon color used on the top navigation bar. @default "#1e293b" */
        navbarText: string;
    };
    /** Colors for ITTable/ITDataTable/ITSearchTable header and rows. */
    table: {
        /** Background color of the table header row (hex). @default "#f8fafc" */
        headerBg: string;
        /** Text color of the table header row. @default "#334155" */
        headerText: string;
        /** Background color of table body rows (hex). @default "#ffffff" */
        rowBg: string;
        /** Text color of table body rows. @default "#1e293b" */
        rowText: string;
    };
}
interface ITThemeProviderProps {
    /** Partial palette overrides merged (deep merge) with the default theme. Supports primary, secondary, ternary, danger, success, info, alert, warning, layout, and table colors. Persisted to `localStorage` under `"it-theme-palette"` once the user edits it via the FAB/drawer. */
    theme?: Partial<ITThemePalette$1>;
    /** The subtree that receives the theme context and CSS variables. Must wrap your entire app (or the portion that uses AXZY UI System components) once, near the root. */
    children: React.ReactNode;
    /** Whether to render the floating action button (bottom-right) that opens the live theme-designer drawer, letting end users tweak colors and persist their choice. Set to `false` to hide the FAB in production and only theme via the `theme` prop. @default true */
    showFab?: boolean;
    /** Global density/compactness factor. Values below 1 shrink the UI's base sizes, above 1 grow them (e.g. `0.8` = 80%: smaller fonts, paddings, gaps, spacing). Applied by scaling the root font-size so every `rem`-based token in Tailwind components compacts together, keeping the layout fluid (no empty margins, unlike CSS zoom). Clamped to `0.5`–`1.5`. @default 1 */
    density?: number;
    /** Global border radius in pixels applied to the entire rounding scale (`rounded-sm/md/lg/xl/2xl/…`). `radius={2}` ⇒ 2px corners (near-square), `8` ⇒ 8px, `0` ⇒ completely square. Every `rounded-*` utility resolves to a `--radius-*` variable, so this reshapes inputs, buttons, cards, dialogs and tables system-wide with no per-component changes. @default 0 (no override, Tailwind defaults) */
    radius?: number;
    /** Global shadow strength level. `0` ⇒ no shadows, `1` ⇒ subtle, `2` ⇒ default current look, `3` ⇒ pronounced. Shadows are injected as `--shadow-*`/`.shadow-*` overrides so cards, dropdowns and dialogs follow the level. @default 2 (keeps current default when omitted) */
    shadow?: number;
}

type ColorScale = {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950?: string;
};
interface ITThemePalette {
    /** Main brand accent color (hex). Drives primary buttons, active nav items, focus rings, links, and the `--color-primary` CSS variable. @default "#06b6d4" */
    primary: string;
    /** Secondary/neutral accent color (hex). Used for less prominent actions and secondary badges/buttons. @default "#6b7280" */
    secondary: string;
    /** Tertiary accent color (hex), used for a third level of emphasis (e.g. alternate badges, chart accents). @default "#8b5cf6" */
    ternary: string;
    /** Semantic color for destructive/error states (hex): delete buttons, error badges, invalid form fields. @default "#ef4444" */
    danger: string;
    /** Semantic color for success/confirmation states (hex): success badges, completed steps, positive stats. @default "#22c55e" */
    success: string;
    /** Semantic color for informational states (hex): info banners/badges, neutral notices. @default "#3b82f6" */
    info: string;
    /** Semantic color for alert/caution states (hex), distinct from `warning`. Used by components that need a stronger visual cue than warning. @default "#f97316" */
    alert: string;
    /** Semantic color for warning states (hex): warning badges/banners, pending states. @default "#eab308" */
    warning: string;
    /** Colors for the app shell's sidebar and top navbar (ITSidebar, ITNavbar, ITTopbar, ITLayout). */
    layout: {
        /** Background color of the sidebar (hex). @default "#ffffff" */
        sidebarBg: string;
        /** Text/icon color used on the sidebar. @default "#334155" */
        sidebarText: string;
        /** Background color of the top navigation bar (hex). @default "#ffffff" */
        navbarBg: string;
        /** Text/icon color used on the top navigation bar. @default "#1e293b" */
        navbarText: string;
    };
    /** Colors for ITTable/ITDataTable/ITSearchTable header and rows. */
    table: {
        /** Background color of the table header row (hex). @default "#f8fafc" */
        headerBg: string;
        /** Text color of the table header row. @default "#334155" */
        headerText: string;
        /** Background color of table body rows (hex). @default "#ffffff" */
        rowBg: string;
        /** Text color of table body rows. @default "#1e293b" */
        rowText: string;
    };
}
type SemanticThemeColors = {
    primary?: ColorScale;
    secondary?: ColorScale;
    success?: ColorScale;
    danger?: ColorScale;
    warning?: ColorScale;
    info?: ColorScale;
    purple?: ColorScale;
};
interface ITThemeConfig {
    colors: SemanticThemeColors;
    layout?: {
        backgroundColor?: string;
        contentPadding?: string;
    };
    topbar?: {
        backgroundColor?: string;
        borderColor?: string;
        iconColor?: string;
        iconHoverColor?: string;
        shadow?: string;
        textColor?: string;
        textHoverColor?: string;
        userMenu?: {
            backgroundColor?: string;
            hoverBackground?: string;
            textColor?: string;
            subtitleColor?: string;
            dropdown?: {
                backgroundColor?: string;
                borderColor?: string;
                itemHoverBackground?: string;
            };
        };
    };
    sidebar?: {
        backgroundColor?: string;
        borderColor?: string;
        label?: {
            color?: string;
            size?: string;
            weight?: string;
        };
        icon?: {
            color?: string;
            size?: string;
        };
        hover?: {
            backgroundColor?: string;
        };
        active?: {
            backgroundColor?: string;
            color?: string;
            iconColor?: string;
        };
        badge?: {
            backgroundColor?: string;
            color?: string;
        };
    };
    calendar?: {
        backgroundColor?: string;
        borderColor?: string;
        header?: {
            textColor?: string;
            hoverBackground?: string;
        };
        days?: {
            textColor?: string;
            weekendColor?: string;
            outsideMonthColor?: string;
        };
        selection?: {
            selectedColor?: string;
            selectedBackground?: string;
            rangeBackground?: string;
            todayBackground?: string;
            todayColor?: string;
        };
    };
}

/**
 * Contexto de theming compartido por ITThemeProvider y componentes que lo
 * consumen (p.ej. ITFormHeader). Vive en @/theme para que ninguna capa
 * atómica dependa de otra a través del provider.
 */
interface ITThemeContextType {
    palette: ITThemePalette;
    colors: ITThemePalette;
    setPalette: (newPalette: ITThemePalette) => void;
    updateColor: (key: string, value: string) => void;
    resetTheme: () => void;
    applyPreset: (colors: ITThemePalette) => void;
    resolvedTheme: "light" | "dark";
    darkModeMode: "light" | "dark" | "system";
    setDarkModeMode: (mode: "light" | "dark" | "system") => void;
}
declare const useITTheme: () => ITThemeContextType;
/**
 * Versión segura de useITTheme que retorna undefined
 * si se usa fuera de ITThemeProvider (no lanza error).
 */
declare const useITThemeSafe: () => ITThemeContextType | undefined;

/**
 * Root theme context provider that injects CSS custom properties for all components,
 * supports custom color palettes, dark/light mode, and an optional in-app theme designer FAB.
 *
 * @example
 * <ITThemeProvider theme={{ primary: "#3b82f6", danger: "#ef4444" }}>
 *   <App />
 * </ITThemeProvider>
 *
 * @example
 * <ITThemeProvider showFab={false}>
 *   <Dashboard />
 * </ITThemeProvider>
 */
declare function ITThemeProvider({ children, theme, showFab, density, radius, shadow, }: ITThemeProviderProps): react_jsx_runtime.JSX.Element;

interface ITTimePickerProps {
    /** Form field name attribute and key for the change event. */
    name: string;
    /** Controlled time value in "HH:MM" format. */
    value?: string;
    /** Label text displayed above the input. */
    label?: string;
    /** Placeholder text when no value is set (default "HH:MM"). */
    placeholder?: string;
    /** Callback fired on valid time selection, receives event-like object with `target.name` and `target.value`. */
    onChange: (e: any) => void;
    /** Callback fired when the input loses focus. */
    onBlur?: (e: any) => void;
    /** Marks the field as required. */
    required?: boolean;
    /** Whether the input has been touched (interacted with). */
    touched?: boolean;
    /** Validation error message or boolean to show error state. */
    error?: string | boolean;
    /** Disables the time picker when true. */
    disabled?: boolean;
    /** Additional CSS classes for the wrapper. */
    className?: string;
    /** Size preset: "sm" | "md" | "lg". @default "md" */
    size?: SizesTypes;
    /** Style variant for the input: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple". */
    variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple";
    /** Theme color used for the dropdown highlight and confirm button. Accepts semantic keys or raw hex. */
    color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple" | string;
}

/**
 * Time selection input with a dual-column dropdown (hours / minutes).
 * Supports manual typing with auto-formatting, validation, and keyboard-friendly picker.
 *
 * @example
 * <ITTimePicker
 *   name="startTime"
 *   label="Start Time"
 *   value={startTime}
 *   onChange={(e) => setStartTime(e.target.value)}
 *   color="primary"
 * />
 *
 * @example
 * <ITTimePicker
 *   name="endTime"
 *   value={endTime}
 *   onChange={(e) => setEndTime(e.target.value)}
 *   error={isInvalid ? "Invalid time range" : undefined}
 * />
 */
declare function ITTimePicker({ name, value, label, placeholder, onChange, onBlur, required, touched, error, disabled, className, size, variant, color, }: ITTimePickerProps): react_jsx_runtime.JSX.Element;

declare const createValidationSchema: (fields: FieldConfig[]) => Yup.ObjectSchema<{
    [x: string]: never;
}, Yup.AnyObject, {
    [x: string]: any;
}, "">;

/**
 * Determina si un color hexadecimal es claro.
 */
declare const isLightColor: (hex: string) => boolean;
/**
 * Traduce un valor de color de CSS (hexadecimal o variable var(--...)) a hexadecimal absoluto.
 */
declare const resolveCssColor: (colorStr: string, palette?: ITThemePalette$1, isDarkMode?: boolean) => string;
/**
 * Obtiene la clase de color de texto óptima (blanca o gris oscuro) basado en el fondo.
 */
declare const getContrastTextColor: (bgColor: string, palette?: ITThemePalette$1, isDarkMode?: boolean) => "text-white" | "text-slate-800";

export { type Column, type FieldConfig, type FieldConfigV2, FileTypeEnum, ITAccordion, type ITAccordionItem, type ITAccordionProps, ITAlert, type ITAlertProps, ITAvatar, type ITAvatarProps, ITBadget, type ITBadgetProps, type ITBreadcrumbItem, ITBreadcrumbs, type ITBreadcrumbsProps, ITButton, type ITButtonProps, ITCalendar, type ITCalendarProps, ITCard, type ITCardProps, ITCheckbox, type ITCheckboxProps, ITChip, ITChipInput, type ITChipInputProps, type ITChipProps, ITConfirmDialog, type ITConfirmDialogProps, ITDataTable, type ITDataTableFetchParams, type ITDataTableProps, type ITDataTableResponse, ITDatePicker, type ITDatePickerProps, ITDialog, type ITDialogProps, ITDivider, type ITDividerProps, ITDrawer, type ITDrawerProps, ITDropdownMenu, type ITDropdownMenuItem, type ITDropdownMenuProps, ITDropfile, ITEmptyState, type ITEmptyStateProps, ITField, type ITFieldProps, ITFlex, type ITFlexProps, ITFormBuilder, type ITFormBuilderProps, ITFormHeader, type ITFormHeaderProps, ITGrid, type ITGridProps, ITImage, type ITImageProps, ITInput, type ITInputProps, ITLayout, type ITLayoutProps, ITLoader, type LoaderProps as ITLoaderProps, ITMaskedInput, type ITMaskedInputProps, ITMultiSelect, type ITMultiSelectOption, type ITMultiSelectProps, ITNavbar, type ITNavbarProps, type ITNavigationItem, type ITNavigationSubItem, ITPage, ITPageHeader, type ITPageHeaderProps, type ITPageProps, ITPagination, type ITPaginationProps, ITPopover, type ITPopoverProps, ITProgress, type ITProgressProps, ITRadioGroup, type ITRadioGroupProps, type ITRadioOption, ITSearchSelect, type ITSearchSelectProps, ITSearchTable, type ITSearchTableProps, ITSegmentedControl, type ITSegmentedControlProps, ITSelect, type ITSelectProps, ITSidebar, type ITSidebarProps, ITSkeleton, type ITSkeletonProps, ITSlideToggle, type ITSlideToggleProps, ITSlider, type ITSliderProps, ITStack, type ITStackProps, ITStatCard, type ITStatCardProps, ITStepper, type ITStepperProps, type ITTabItem, ITTable, type ITTableProps, ITTabs, type ITTabsProps, ITText, type ITTextProps, ITTextarea, type ITTextareaProps, type ITThemeConfig, type ITThemePalette$1 as ITThemePalette, ITThemeProvider, type ITThemeProviderProps, ITTimePicker, type ITTimePickerProps, ITToast, type ITToastProps, ITTripleFilter, type ITTripleFilterOption, type ITTripleFilterProps, ITWysiwyg, type ITWysiwygProps, UploadStatus, type UseTableStateOptions, type UseTableStateResult, createValidationSchema, getContrastTextColor, isLightColor, resolveCssColor, useClickOutside, useDebouncedSearch, useEditableRow, useFloatingPanel, useITTheme, useITThemeSafe, useTableState };
