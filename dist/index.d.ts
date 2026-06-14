import * as Yup from 'yup';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default, { ReactNode, CSSProperties, ElementType, FocusEvent, HTMLAttributes } from 'react';

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

interface SearchColumn<T = any> {
    key: string;
    label: string;
    type: "string" | "number" | "boolean" | "date" | "actions" | "catalog";
    filter?: boolean | 'catalog';
    sortable?: boolean;
    editable?: boolean;
    inputType?: "text" | "number" | "select" | "checkbox" | "date";
    options?: {
        value: string | number;
        label: string;
    }[];
    validation?: (value: any, row?: any) => string | undefined;
    className?: string;
    currencyMX?: boolean;
    catalogOptions?: {
        data: Array<{
            id: string | number;
            name: string;
        }> | any[];
        key?: string;
        label?: string;
    };
    render?: (row: T) => React.ReactNode;
    actions?: (row: T, helpers: {
        onEdit: (row: T) => void;
    }) => React.ReactNode;
    saveActions?: (row: T, helpers: {
        onSave: (row: T) => void;
        onCancel: () => void;
        hasErrors: any;
    }) => React.ReactNode;
}
interface ITSearchTableProps<T> {
    columns: SearchColumn<T>[];
    containerClassName?: string;
    searchInputPlaceholder?: string;
    data: T[];
    variant?: TableVariants;
    className?: string;
    size?: TableSize;
    itemsPerPageOptions?: Array<number>;
    defaultItemsPerPage?: number;
    validationSchema?: Yup.ObjectSchema<any>;
    title?: string;
    pageIndex: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    onSortChange?: (sortConfig: {
        key: string;
        direction: "asc" | "desc";
    }) => void;
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

type AlertVariant = "info" | "success" | "warning" | "error";
interface ITAlertProps {
    variant?: AlertVariant;
    title?: string;
    children?: ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: ReactNode;
    className?: string;
}

declare function ITAlert({ variant, title, children, dismissible, onDismiss, icon, className, }: ITAlertProps): react_jsx_runtime.JSX.Element;

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
interface ITAvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    size?: AvatarSize;
    color?: string;
    className?: string;
    badge?: ReactNode;
    onClick?: () => void;
}

declare function ITAvatar({ src, alt, initials, size, color, className, badge, onClick, }: ITAvatarProps): react_jsx_runtime.JSX.Element;

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

type SizesTypes = "small" | "medium" | "large";

interface ITBadgetProps {
    label?: string;
    children?: React.ReactNode;
    color?: ColorsTypes;
    size?: SizesTypes;
    variant?: keyof typeof badgeVariants;
    className?: string;
}

declare function ITBadget({ children, label, color, size, variant, className, }: ITBadgetProps): react_jsx_runtime.JSX.Element;

interface ITBreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
interface ITBreadcrumbsProps {
    items: ITBreadcrumbItem[];
    separator?: ReactNode;
    className?: string;
}

declare function ITBreadcrumbs({ items, separator, className, }: ITBreadcrumbsProps): react_jsx_runtime.JSX.Element;

declare const buttonVariants: Record<string, string>;

interface ITButtonProps {
    label?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    color?: ColorsTypes;
    size?: SizesTypes;
    variant?: keyof typeof buttonVariants;
    disabled?: boolean;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined;
    ariaLabel?: string;
    title?: string;
}

declare function ITButton({ children, label, icon, onClick, type, color, size, disabled, className, variant, ariaLabel, title, }: ITButtonProps): react_jsx_runtime.JSX.Element;

interface CalendarEvent {
    id: string;
    title: string;
    start: Date | string;
    end: Date | string;
    color?: string;
    data?: any;
}
interface ITCalendarProps {
    events?: CalendarEvent[];
    mode?: 'week' | 'day' | 'month';
    onEventClick?: (event: CalendarEvent) => void;
    onSlotClick?: (date: Date) => void;
    onSlotHover?: (date: Date) => void;
    onSelectRange?: (start: Date, end: Date) => void;
    value?: Date;
    onChange?: (date: Date) => void;
    selectionMode?: 'single' | 'range';
    startDate?: Date;
    endDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    disabled?: boolean;
    variant?: ColorsTypes;
}

declare const ITCalendar: React__default.FC<ITCalendarProps>;

interface ITCardProps {
    onClick?: () => void;
    title?: string;
    image?: string;
    alt?: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
    imageClassName?: string;
    titleClassName?: string;
    contentClassName?: string;
    actionClassName?: string;
}

declare function ITCard({ title, image, alt, children, actions, className, imageClassName, titleClassName, contentClassName, actionClassName, onClick, }: ITCardProps): react_jsx_runtime.JSX.Element;

interface ITCheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: ReactNode;
    disabled?: boolean;
    indeterminate?: boolean;
    className?: string;
    name?: string;
}

declare function ITCheckbox({ checked, onChange, label, disabled, indeterminate, className, name, }: ITCheckboxProps): react_jsx_runtime.JSX.Element;

interface ITConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ColorsTypes;
    loading?: boolean;
}

declare function ITConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel, cancelLabel, variant, loading, }: ITConfirmDialogProps): react_jsx_runtime.JSX.Element;

type ColumnType = "string" | "date" | "number" | "boolean" | "actions" | "catalog";
interface CatalogOption {
    id: string | number;
    name: string;
}
interface Column<T = any> {
    key: string;
    label: string;
    className?: string;
    currencyMX?: boolean;
    actions?: (row: T) => React.ReactNode;
    filter?: boolean | "catalog";
    type: ColumnType;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
    editComponent?: (props: {
        value: any;
        onChange: (value: any) => void;
        rowData: T;
    }) => React.ReactNode;
    catalogOptions?: {
        data: CatalogOption[];
        loading?: boolean;
        error?: boolean;
    };
}
interface ITTableProps<T> {
    columns: Column<T>[];
    containerClassName?: string;
    data: T[];
    variant?: TableVariants;
    className?: string;
    size?: TableSize;
    itemsPerPageOptions?: Array<number>;
    defaultItemsPerPage?: number;
    title?: string;
}

interface ITDataTableFetchParams {
    page: number;
    limit: number;
    filters: Record<string, string | number | boolean | Date>;
    sort?: {
        key: string;
        direction: "asc" | "desc";
    };
}
interface ITDataTableResponse<T> {
    data: T[];
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
    containerClassName?: string;
    className?: string;
    variant?: "default" | "striped" | "bordered" | "minimal";
    size?: "sm" | "md" | "lg";
    itemsPerPageOptions?: number[];
    defaultItemsPerPage?: number;
    title?: string | ReactNode;
}

declare function ITDataTable<T extends Record<string, unknown>>({ columns, fetchData, debounceMs, externalFilters, loadingIndicator, fetchOnMount, reloadTrigger, containerClassName, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, }: ITDataTableProps<T>): react_jsx_runtime.JSX.Element;

interface ITDatePickerProps {
    name: string;
    value?: Date | [Date | null, Date | null];
    onChange: (event: React.ChangeEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date | [Date | null, Date | null];
        };
    }) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date | [Date | null, Date | null];
        };
    }) => void;
    range?: boolean;
    variant?: ColorsTypes;
    size?: SizesTypes;
    className?: string;
    calendarClassName?: string;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    required?: boolean;
    touched?: boolean;
    error?: string | boolean;
    minDate?: Date;
    maxDate?: Date;
}

declare function ITDatePicker({ name, value, onChange, onBlur, variant, size, className, calendarClassName, disabled, label, touched, error, required, placeholder, minDate, maxDate, range, }: ITDatePickerProps): react_jsx_runtime.JSX.Element;

interface ITDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
    useFormHeader?: boolean;
    fullScreen?: boolean;
}

declare function ITDialog({ isOpen, onClose, children, className, title, useFormHeader, fullScreen, }: ITDialogProps): React$1.ReactPortal;

type DividerOrientation = "horizontal" | "vertical";
interface ITDividerProps {
    orientation?: DividerOrientation;
    className?: string;
    color?: string;
    thickness?: string;
}

declare function ITDivider({ orientation, className, color, thickness, }: ITDividerProps): react_jsx_runtime.JSX.Element;

type DrawerPosition = "left" | "right";
interface ITDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    position?: DrawerPosition;
    size?: string;
    title?: ReactNode;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

declare function ITDrawer({ isOpen, onClose, position, size, title, children, className, style, }: ITDrawerProps): react_jsx_runtime.JSX.Element;

interface ITEmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

declare function ITEmptyState({ icon, title, description, action, className, }: ITEmptyStateProps): react_jsx_runtime.JSX.Element;

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexAlign = "start" | "end" | "center" | "stretch" | "baseline";
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
interface ITFlexProps {
    children?: ReactNode;
    direction?: FlexDirection;
    align?: FlexAlign;
    justify?: FlexJustify;
    wrap?: FlexWrap;
    gap?: number;
    grow?: boolean | number;
    shrink?: boolean | number;
    basis?: string | number;
    className?: string;
    style?: CSSProperties;
    as?: ElementType;
    onClick?: (e: React.MouseEvent) => void;
}

declare function ITFlex({ children, direction, align, justify, wrap, gap, grow, shrink, basis, className, style, as: Component, onClick, }: ITFlexProps): react_jsx_runtime.JSX.Element;

interface FieldConfig {
    name: string;
    label: string;
    type?: "text" | "select" | "date" | "password" | "number";
    currencyFormat?: boolean;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    validation?: Yup.AnySchema;
    column?: number | number[];
    options?: {
        value: string;
        label: string;
    }[];
    rightIcon?: React__default.ReactNode;
    leftIcon?: React__default.ReactNode;
    valueField?: string;
    showHintLength?: boolean;
    labelField?: string;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    formatNumber?: boolean;
    onChangeAction?: (value: any, setFieldValue: any) => void;
}
type FieldTypeV2 = "text" | "number" | "password" | "email" | "select" | "date" | "time" | "checkbox" | "radio" | "array" | "section" | "custom";
interface FieldContextV2 {
    values: Record<string, any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    setFieldError: (field: string, error: string) => void;
    setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
}
interface FieldConfigV2 {
    name: string;
    label?: string;
    type: FieldTypeV2;
    column?: number | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    fields?: FieldConfigV2[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    dependsOn?: string[];
    renderWhen?: (values: Record<string, any>) => boolean;
    dynamicProps?: (values: Record<string, any>) => Partial<FieldConfigV2>;
    validation?: Yup.AnySchema;
    asyncValidation?: (value: any, values: Record<string, any>) => Promise<string | null | undefined>;
    defaultValue?: any;
    placeholder?: string;
    disabled?: boolean | ((values: Record<string, any>) => boolean);
    readOnly?: boolean;
    required?: boolean | ((values: Record<string, any>) => boolean);
    options?: {
        value: string | number;
        label: string;
    }[] | (() => Promise<{
        value: string | number;
        label: string;
    }[]>);
    valueField?: string;
    labelField?: string;
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
    component?: React__default.ComponentType<any>;
    className?: string;
    currencyFormat?: boolean;
    showHintLength?: boolean;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    formatNumber?: boolean;
    onChangeAction?: (val: any, context: FieldContextV2) => void | Promise<void>;
}

interface ITFormBuilderProps {
    fields?: FieldConfig[];
    config?: FieldConfigV2[];
    columns?: number;
    values: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | {
        target: {
            name: string;
            value: any;
        };
    }) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement, Element> | React.FocusEvent<HTMLTextAreaElement, Element> | {
        target: {
            name: string;
            value: any;
        };
    }) => void;
    touched: any;
    errors: any;
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | any>;
    setFieldTouched?: (field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void | any>;
    setFieldError?: (field: string, message: string | undefined) => void;
    isSubmitting?: boolean;
}

declare function ITFormBuilder({ fields, config, columns, values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, }: ITFormBuilderProps): react_jsx_runtime.JSX.Element;

interface ITFormHeaderProps {
    title: string;
    onClose?: () => void;
    className?: string;
}

declare function ITFormHeader({ title, onClose, className, }: ITFormHeaderProps): react_jsx_runtime.JSX.Element;

interface ITGridProps {
    children?: ReactNode;
    container?: boolean;
    item?: boolean;
    spacing?: number;
    columns?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    className?: string;
    style?: CSSProperties;
    as?: ElementType;
}

declare function ITGrid({ children, container, item, spacing, columns, xs, sm, md, lg, xl, className, style, as: Component, }: ITGridProps): react_jsx_runtime.JSX.Element;

interface ITImageProps {
    src: string;
    alt?: string;
    className?: string;
    fallback?: string;
    onClick?: () => void;
}

declare const ITImage: ({ src, alt, className, fallback, }: ITImageProps) => react_jsx_runtime.JSX.Element;

interface ITInputProps {
    name: string;
    type?: "text" | "password" | "number" | "email" | "checkbox" | "radio" | "textarea";
    label?: string;
    currencyFormat?: boolean;
    placeholder?: string;
    value?: any;
    onChange: (event: any) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement, Element>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    showHintLength?: boolean;
    maxLength?: number;
    minLength?: number;
    variant?: ColorsTypes;
    size?: SizesTypes;
    disabled?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    className?: string;
    touched?: boolean;
    error?: string | boolean;
    required?: boolean;
    formatNumber?: boolean;
    autoFocus?: boolean;
    focusContent?: boolean;
    onClick?: () => void;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    checked?: boolean;
    rows?: number;
    min?: number;
    max?: number;
    readOnly?: boolean;
}

declare function ITInput({ name, type, label, placeholder, value, onChange, onBlur, disabled, className, containerClassName, labelClassName, touched, error, formatNumber, required, autoFocus, onClick, onKeyDown, iconLeft, iconRight, maxLength, minLength, checked, showHintLength, currencyFormat, rows, min, max, readOnly, focusContent }: ITInputProps): react_jsx_runtime.JSX.Element;

interface ITNavigationItem$1 {
    id: string;
    label: string;
    icon?: React.ReactNode;
    action?: () => void;
    isActive?: boolean;
    subitems?: ITNavigationSubItem$1[];
}
interface ITNavigationSubItem$1 {
    id: string;
    label: string;
    action: () => void;
    isActive?: boolean;
}
interface ITNavbarProps {
    logo?: React.ReactNode;
    logoText?: string;
    navigationItems?: ITNavigationItem$1[];
    userMenu?: {
        userImage?: string;
        userName: string;
        userEmail: string;
        menuItems: Array<{
            label: string;
            onClick: () => void;
        }>;
    };
    children?: React.ReactNode;
    navItems?: React.ReactNode;
    showSidebar?: boolean;
    showSidebarOnMobile?: boolean;
    sidebarItems?: React.ReactNode;
}

declare function ITNavbar({ logo, logoText, navigationItems, userMenu, children, navItems, showSidebar, showSidebarOnMobile, sidebarItems, }: ITNavbarProps): react_jsx_runtime.JSX.Element;

interface ITPageProps {
    title?: string;
    description?: string;
    breadcrumbs?: ITBreadcrumbItem[];
    actions?: ReactNode;
    backAction?: () => void;
    loading?: boolean;
    error?: string | null;
    errorTitle?: string;
    errorActionLabel?: string;
    onRetry?: () => void;
    empty?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: ReactNode;
    className?: string;
    children: ReactNode;
}

declare function ITPage(props: ITPageProps): react_jsx_runtime.JSX.Element;

interface ITPageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: ITBreadcrumbItem[];
    actions?: ReactNode;
    backAction?: () => void;
    className?: string;
}

declare function ITPageHeader({ title, description, breadcrumbs, actions, backAction, className, }: ITPageHeaderProps): react_jsx_runtime.JSX.Element;

interface ITPaginationProps {
    /**
     * Current active page (1-indexed).
     */
    currentPage: number;
    /**
     * Total number of pages available.
     */
    totalPages: number;
    /**
     * Callback fired when a page is clicked or next/prev is activated.
     */
    onPageChange: (page: number) => void;
    /**
     * Number of visible pages before and after the current page.
     * Default: 1
     */
    siblingCount?: number;
    /**
     * Semantic color from the theme (primary, secondary, success, danger, warning, info, purple).
     * Default: primary
     */
    color?: string;
    /**
     * Additional CSS classes for the container.
     */
    className?: string;
    /**
     * Options for items per page selector.
     */
    itemsPerPageOptions?: number[];
    /**
     * Current items per page value. Required if itemsPerPageOptions is provided.
     */
    itemsPerPage?: number;
    /**
     * Callback fired when items per page is changed.
     */
    onItemsPerPageChange?: (value: number) => void;
    /**
     * Total number of items across all pages. Used to render "1-10 of 50" text.
     */
    totalItems?: number;
}

declare function ITPagination({ currentPage, totalPages, onPageChange, siblingCount, color, className, itemsPerPageOptions, itemsPerPage, onItemsPerPageChange, totalItems, }: ITPaginationProps): react_jsx_runtime.JSX.Element;

type PopoverPosition = "top" | "bottom" | "left" | "right";
interface ITPopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    position?: PopoverPosition;
    isOpen?: boolean;
    onClose?: () => void;
    className?: string;
}

declare function ITPopover({ trigger, children, position, isOpen: controlledOpen, onClose, className, }: ITPopoverProps): react_jsx_runtime.JSX.Element;

interface ITProgressProps {
    value?: number;
    max?: number;
    variant?: "determinate" | "indeterminate";
    color?: ColorsTypes;
    size?: "sm" | "md" | "lg";
    className?: string;
    style?: CSSProperties;
}

declare function ITProgress({ value, max, variant, color, size, className, style, }: ITProgressProps): react_jsx_runtime.JSX.Element;

interface ITRadioOption {
    value: string;
    label: ReactNode;
}
interface ITRadioGroupProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: ITRadioOption[];
    disabled?: boolean;
    direction?: "row" | "column";
    className?: string;
}

declare function ITRadioGroup({ name, value, onChange, options, disabled, direction, className, }: ITRadioGroupProps): react_jsx_runtime.JSX.Element;

interface ITSearchSelectOption {
    label: string;
    value: string | number;
    [key: string]: any;
}
interface ITSearchSelectProps {
    /** Nombre del campo para integraciones con formularios */
    name?: string;
    /** Etiqueta que se muestra arriba del select */
    label?: string;
    /** Texto que se muestra cuando no hay nada seleccionado */
    placeholder?: string;
    /** Valor seleccionado */
    value?: string | number;
    /** Arreglo de opciones (Modo 1: Lista estática) */
    options?: ITSearchSelectOption[];
    /** Campo que se usará como valor (por defecto "value") */
    valueField?: string;
    /** Campo que se usará como etiqueta (por defecto "label") */
    labelField?: string;
    /** Callback cuando cambia el valor */
    onChange?: (value: string | number, option?: ITSearchSelectOption) => void;
    /** Callback cuando pierde el foco */
    onBlur?: (e: FocusEvent<any>) => void;
    /** Indica si el componente está deshabilitado */
    disabled?: boolean;
    /** Clase CSS adicional para el contenedor */
    className?: string;
    /** Indica si el campo ha sido tocado (para validaciones) */
    touched?: boolean;
    /** Indica si el campo es requerido */
    required?: boolean;
    /** Mensaje de error */
    error?: string | boolean;
    /** Indica si el campo es de solo lectura */
    readOnly?: boolean;
    /** Callback para búsqueda en servidor (Modo 2: Conexión con API) */
    onSearch?: (query: string) => void;
    /** Indica si se está cargando información desde la API */
    isLoading?: boolean;
    /** Mensaje cuando no hay resultados */
    noResultsMessage?: string;
}

/**
 * ITSearchSelect - Un componente de selección con buscador integrado.
 * Soporta filtrado local y búsqueda remota via API.
 */
declare function ITSearchSelect({ name, options, label, placeholder, valueField, labelField, value, onChange, onBlur, disabled, className, touched, required, error, readOnly, onSearch, isLoading, noResultsMessage, }: ITSearchSelectProps): react_jsx_runtime.JSX.Element;

interface OptionType {
    [key: string]: string;
}
interface ITSelectProps {
    name: string;
    options: OptionType[];
    valueField?: string;
    labelField?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    variant?: ColorsTypes;
    size?: SizesTypes;
    disabled?: boolean;
    className?: string;
    touched?: boolean;
    error?: string | boolean;
    required?: boolean;
    autoFocus?: boolean;
    readOnly?: boolean;
}

/**
 * Componente de selección (select) con soporte para opciones personalizadas, validación y personalización de estilo.
 * Matches styles of ITInput.
 */
declare function ITSelect({ name, options, label, placeholder, valueField, labelField, value, onChange, onBlur, disabled, className, touched, required, error, readOnly, }: ITSelectProps): react_jsx_runtime.JSX.Element;

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
declare function ITSearchTable<T extends Record<string, unknown>>({ columns, data, containerClassName, searchTermInitial, searchInputPlaceholder, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, pageIndex, totalCount, totalPages, hasPreviousPage, hasNextPage, onPageChange, onItemsPerPageChange, onSortChange, onFilterChange, sortConfig, editingRow, validationSchema, onClearSearch, onEdit, onSave, onCancel, }: CustomITSearchTableProps<T>): react_jsx_runtime.JSX.Element;

type SegmentedControlSize = "sm" | "md";
interface ISegmentedOption {
    value: string;
    label: string;
    icon?: ReactNode;
}
interface ITSegmentedControlProps {
    options: ISegmentedOption[];
    value: string;
    onChange: (value: string) => void;
    size?: SegmentedControlSize;
    className?: string;
    disabled?: boolean;
}

declare function ITSegmentedControl({ options, value, onChange, size, className, disabled, }: ITSegmentedControlProps): react_jsx_runtime.JSX.Element;

interface ITNavigationSubItem {
    id: string;
    label: string;
    action?: () => void;
    isActive?: boolean;
}
interface ITNavigationItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    action?: () => void;
    isActive?: boolean;
    subitems?: ITNavigationSubItem[];
    badge?: string;
}
interface ITSidebarProps {
    navigationItems: ITNavigationItem[];
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    visibleOnMobile?: boolean;
    onItemClick?: (item: ITNavigationItem) => void;
    onSubItemClick?: (subitem: ITNavigationSubItem) => void;
    subitemConnector?: 'dot' | '|' | 'none';
    className?: string;
}

declare function ITSidebar({ navigationItems, isCollapsed, onToggleCollapse, className, visibleOnMobile, onItemClick, onSubItemClick, subitemConnector, }: ITSidebarProps): react_jsx_runtime.JSX.Element;

type SkeletonVariant = "text" | "circular" | "rectangular";
interface ITSkeletonProps {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    count?: number;
    className?: string;
    style?: CSSProperties;
}

declare function ITSkeleton({ variant, width, height, count, className, style, }: ITSkeletonProps): react_jsx_runtime.JSX.Element;

interface ITSlideToggleProps {
    /**
     * Callback executed when the switch is toggled. Receives the new state.
     */
    onToggle?: (value: boolean) => void;
    /**
     * Controlled state. Use this to completely control the component externally.
     */
    isOn?: boolean;
    /**
     * Initial state for uncontrolled usage.
     * Default: false
     */
    initialState?: boolean;
    /**
     * Semantic theme color when activated (e.g., 'primary', 'success').
     * Default: 'success'
     */
    activeColor?: string;
    /**
     * Semantic theme color or hex when deactivated.
     * Default: '#9ca3af' (gray-400)
     */
    inactiveColor?: string;
    /**
     * Whether the switch is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the switch: sm, md, lg.
     * Default: md
     */
    size?: "sm" | "md" | "lg";
    /**
     * Additional container classes.
     */
    className?: string;
}

/**
 * Slide toggle switch component.
 * Supports fully controlled (`isOn`) or uncontrolled (`initialState`) modes.
 */
declare function ITSlideToggle({ onToggle, isOn: controlledIsOn, initialState, activeColor, inactiveColor, // default gray-400
disabled, size, className, }: ITSlideToggleProps): react_jsx_runtime.JSX.Element;

interface ITSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    disabled?: boolean;
    className?: string;
}

declare function ITSlider({ value, onChange, min, max, step, label, disabled, className, }: ITSliderProps): react_jsx_runtime.JSX.Element;

type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
type StackAlignment = "start" | "end" | "center" | "stretch" | "baseline";
type StackJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type StackWrap = "nowrap" | "wrap" | "wrap-reverse";
interface ITStackProps {
    children?: ReactNode;
    direction?: StackDirection;
    spacing?: number;
    alignItems?: StackAlignment;
    justifyContent?: StackJustify;
    flexWrap?: StackWrap;
    divider?: ReactNode;
    className?: string;
    style?: CSSProperties;
    as?: ElementType;
}

declare function ITStack({ children, direction, spacing, alignItems, justifyContent, flexWrap, divider, className, style, as: Component, }: ITStackProps): react_jsx_runtime.JSX.Element;

interface ITStatCardProps {
    label: string;
    value: string | number;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    icon?: ReactNode;
    color?: string;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

declare function ITStatCard({ label, value, trend, trendDirection, icon, color, className, style, onClick, }: ITStatCardProps): react_jsx_runtime.JSX.Element;

declare function ITTable<T extends Record<string, unknown>>({ columns, data, containerClassName, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, }: ITTableProps<T>): react_jsx_runtime.JSX.Element;

interface ITTextProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    className?: string;
    as?: ElementType;
    muted?: boolean;
    htmlFor?: string;
}

declare function ITText({ children, as: Tag, className, muted, style, ...rest }: ITTextProps & {
    style?: React.CSSProperties;
}): react_jsx_runtime.JSX.Element;

interface ITTextareaProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    error?: string;
    className?: string;
    name?: string;
    maxLength?: number;
    resize?: "none" | "vertical" | "horizontal" | "both";
}

declare function ITTextarea({ value, onChange, label, placeholder, rows, disabled, error, className, name, maxLength, resize, }: ITTextareaProps): react_jsx_runtime.JSX.Element;

interface ITTabItem {
    id: string;
    label: string;
    content: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
}
interface ITTabsProps {
    items: ITTabItem[];
    defaultActiveId?: string;
    onChange?: (id: string) => void;
    variant?: 'line' | 'pill';
    className?: string;
    containerClassName?: string;
}

declare const ITTabs: React__default.FC<ITTabsProps>;

interface ITTripleFilterOption<T> {
    label: string;
    value: T;
}
interface ITTripleFilterProps<T> {
    value: T;
    onChange: (value: T) => void;
    options: ITTripleFilterOption<T>[];
    color?: ColorsTypes;
    className?: string;
}

/**
 * @description Generic triple/segmented filter component with color support.
 */
declare const ITTripleFilter: <T extends string | boolean>({ value, onChange, options, color, className, }: ITTripleFilterProps<T>) => react_jsx_runtime.JSX.Element;

interface ITToastProps {
    message: string;
    type?: "success" | "error" | "warning" | "info" | "primary" | "danger" | string;
    duration?: number;
    position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
    onClose?: () => void;
}

declare function ITToast({ message, type, duration, position, onClose, }: ITToastProps): react_jsx_runtime.JSX.Element;

/** Enum con tipos de archivo permitidos */
declare enum FileTypeEnum {
    PDF = "application/pdf",
    XLS = "application/vnd.ms-excel",
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    CSV = "text/csv",
    PNG = "image/png",
    JPG = "image/jpg",
    JPEG = "image/jpeg"
}
/** Enum para el estado de subida */
declare enum UploadStatus {
    PENDING = "pendiente",
    UPLOADING = "subiendo",
    UPLOADED = "subido",
    ERROR = "error"
}
/** Props del componente */
interface ITDropfileProps {
    onFileSelect: (file: File | null) => void;
    onCancel?: () => void;
    onSubmit?: (file: File) => void;
    acceptedFileTypes?: FileTypeEnum[];
    contentClassName?: string;
    containerClassName?: string;
    showStatusBadge?: boolean;
    uploadStatus?: UploadStatus;
    onStatusChange?: (status: UploadStatus) => void;
    initialPreviewUrl?: string | null;
}
declare const ITDropfile: React__default.FC<ITDropfileProps>;

interface ITTopBarNavItem {
    id: string;
    label: string;
    icon?: any;
    action: () => void;
}
interface ITTopBarProps {
    logo?: any;
    logoText?: string;
    userMenu?: {
        userName: string;
        userEmail: string;
        userImage?: string;
        menuItems: {
            label: string;
            onClick: () => void;
        }[];
    };
    navItems?: ITTopBarNavItem[];
    onNavItemClick?: (id: string) => void;
    showMobileMenuButton?: boolean;
    onToggleMobileMenu?: () => void;
}

interface ITLayoutProps {
    topBar: ITTopBarProps;
    sidebar: ITSidebarProps;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

declare function ITLayout({ topBar, sidebar, children, className, contentClassName, }: ITLayoutProps): react_jsx_runtime.JSX.Element;

type LoaderSize = "sm" | "md" | "lg" | "xl";
type LoaderVariant = "spinner" | "dots" | "bar" | "pulse";

interface LoaderProps {
    size?: LoaderSize;
    variant?: LoaderVariant;
    color?: string;
    className?: string;
}

declare function ITLoader({ size, variant, color, // Default to semantic primary
className, }: LoaderProps): react_jsx_runtime.JSX.Element;

type IconType = React__default.ReactNode;
interface Step {
    label: string;
    content: React__default.ReactNode;
    icon?: IconType;
}
interface ITStepperProps {
    steps: Step[];
    currentStep: number;
    onFinish?: () => void;
    onStepChange?: (step: number) => void;
    allowClickToJump?: boolean;
    useIcons?: boolean;
    disableNext?: boolean;
    containerClassName?: string;
    stepClassName?: string;
    scrollableContent?: boolean;
    maxContentHeight?: string;
    /**
     * Semantic theme color for active steps and buttons.
     * Default: 'primary'
     */
    color?: string;
}

declare function ITStepper({ steps, currentStep, onFinish, onStepChange, allowClickToJump, useIcons, disableNext, containerClassName, stepClassName, scrollableContent, maxContentHeight, color, }: ITStepperProps): react_jsx_runtime.JSX.Element;

interface ITThemePalette {
    primary: string;
    secondary: string;
    ternary: string;
    danger: string;
    success: string;
    info: string;
    alert: string;
    warning: string;
    layout: {
        sidebarBg: string;
        sidebarText: string;
        navbarBg: string;
        navbarText: string;
    };
    table: {
        headerBg: string;
        headerText: string;
        rowBg: string;
        rowText: string;
    };
}
interface ITThemeProviderProps {
    theme?: Partial<ITThemePalette>;
    children: React.ReactNode;
    showFab?: boolean;
}

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
declare function ITThemeProvider({ children, theme, showFab, }: ITThemeProviderProps): react_jsx_runtime.JSX.Element;

interface ITTimePickerProps {
    name: string;
    value?: string;
    label?: string;
    placeholder?: string;
    onChange: (e: any) => void;
    onBlur?: (e: any) => void;
    required?: boolean;
    touched?: boolean;
    error?: string | boolean;
    disabled?: boolean;
    className?: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple";
    color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "purple" | string;
}

declare function ITTimePicker({ name, value, label, placeholder, onChange, onBlur, required, touched, error, disabled, className, size, variant, color, }: ITTimePickerProps): react_jsx_runtime.JSX.Element;

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
declare const resolveCssColor: (colorStr: string, palette?: ITThemePalette, isDarkMode?: boolean) => string;
/**
 * Obtiene la clase de color de texto óptima (blanca o gris oscuro) basado en el fondo.
 */
declare const getContrastTextColor: (bgColor: string, palette?: ITThemePalette, isDarkMode?: boolean) => "text-white" | "text-slate-800";

export { type Column, type FieldConfig, type FieldConfigV2, FileTypeEnum, ITAlert, type ITAlertProps, ITAvatar, type ITAvatarProps, ITBadget, type ITBadgetProps, type ITBreadcrumbItem, ITBreadcrumbs, type ITBreadcrumbsProps, ITButton, type ITButtonProps, ITCalendar, type ITCalendarProps, ITCard, type ITCardProps, ITCheckbox, type ITCheckboxProps, ITConfirmDialog, type ITConfirmDialogProps, ITDataTable, type ITDataTableFetchParams, type ITDataTableProps, type ITDataTableResponse, ITDatePicker, type ITDatePickerProps, ITDialog, type ITDialogProps, ITDivider, type ITDividerProps, ITDrawer, type ITDrawerProps, ITDropfile, ITEmptyState, type ITEmptyStateProps, ITFlex, type ITFlexProps, ITFormBuilder, type ITFormBuilderProps, ITFormHeader, type ITFormHeaderProps, ITGrid, type ITGridProps, ITImage, type ITImageProps, ITInput, type ITInputProps, ITLayout, type ITLayoutProps, ITLoader, type LoaderProps as ITLoaderProps, ITNavbar, type ITNavbarProps, type ITNavigationItem, type ITNavigationSubItem, ITPage, ITPageHeader, type ITPageHeaderProps, type ITPageProps, ITPagination, type ITPaginationProps, ITPopover, type ITPopoverProps, ITProgress, type ITProgressProps, ITRadioGroup, type ITRadioGroupProps, type ITRadioOption, ITSearchSelect, type ITSearchSelectProps, ITSearchTable, type ITSearchTableProps, ITSegmentedControl, type ITSegmentedControlProps, ITSelect, type ITSelectProps, ITSidebar, type ITSidebarProps, ITSkeleton, type ITSkeletonProps, ITSlideToggle, type ITSlideToggleProps, ITSlider, type ITSliderProps, ITStack, type ITStackProps, ITStatCard, type ITStatCardProps, ITStepper, type ITStepperProps, type ITTabItem, ITTable, type ITTableProps, ITTabs, type ITTabsProps, ITText, type ITTextProps, ITTextarea, type ITTextareaProps, type ITThemeConfig, type ITThemePalette, ITThemeProvider, type ITThemeProviderProps, ITTimePicker, type ITTimePickerProps, ITToast, type ITToastProps, ITTripleFilter, type ITTripleFilterOption, type ITTripleFilterProps, UploadStatus, type UseTableStateOptions, type UseTableStateResult, createValidationSchema, getContrastTextColor, isLightColor, resolveCssColor, useClickOutside, useDebouncedSearch, useEditableRow, useITTheme, useITThemeSafe, useTableState };
