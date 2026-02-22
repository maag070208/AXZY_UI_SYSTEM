import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { ReactNode } from 'react';
import * as Yup from 'yup';

declare const buttonVariants: Record<string, string>;

/**
 * 2. Colores semánticos (qué representa cada color)
 */
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
        '50': "#ecfdf5";
        '100': "#d1fae5";
        '200': "#a7f3d0";
        '300': "#6ee7b7";
        '400': "#34d399";
        '500': "#10b981";
        '600': "#059669";
        '700': "#047857";
        '800': "#065f46";
        '900': "#064e3b";
        '950': "#022c22";
    };
    danger: {
        '50': "#fff1f2";
        '100': "#ffe4e6";
        '200': "#fecdd3";
        '300': "#fda4af";
        '400': "#fb7185";
        '500': "#f43f5e";
        '600': "#e11d48";
        '700': "#be123c";
        '800': "#9f1239";
        '900': "#881337";
        '950': "#4c0519";
    };
    warning: {
        '50': "#fffbeb";
        '100': "#fef3c7";
        '200': "#fde68a";
        '300': "#fcd34d";
        '400': "#fbbf24";
        '500': "#f59e0b";
        '600': "#d97706";
        '700': "#b45309";
        '800': "#92400e";
        '900': "#78350f";
        '950': "#451a03";
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
        '50': "#f5f3ff";
        '100': "#ede9fe";
        '200': "#ddd6fe";
        '300': "#c4b5fd";
        '400': "#a78bfa";
        '500': "#8b5cf6";
        '600': "#7c3aed";
        '700': "#6d28d9";
        '800': "#5b21b6";
        '900': "#4c1d95";
        '950': "#2e1065";
    };
    error: {
        '50': "#fff1f2";
        '100': "#ffe4e6";
        '200': "#fecdd3";
        '300': "#fda4af";
        '400': "#fb7185";
        '500': "#f43f5e";
        '600': "#e11d48";
        '700': "#be123c";
        '800': "#9f1239";
        '900': "#881337";
        '950': "#4c0519";
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

type SizesTypes = "small" | "medium" | "large";

interface ITButtonProps {
    label?: string;
    children?: React.ReactNode;
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

declare function ITButton({ children, label, onClick, type, color, size, disabled, className, variant, ariaLabel, title, }: ITButtonProps): react_jsx_runtime.JSX.Element;

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
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    disabled?: boolean;
}

declare const ITCalendar: React$1.FC<ITCalendarProps>;

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

/**
 * Componente de tarjeta (Card) personalizable.
 */
declare function ITCard({ title, image, alt, children, actions, className, imageClassName, titleClassName, contentClassName, actionClassName, onClick, }: ITCardProps): react_jsx_runtime.JSX.Element;

interface ITDatePickerProps {
    name: string;
    value?: Date;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date;
        };
    }) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement> | {
        target: {
            name: string;
            value: Date;
        };
    }) => void;
    variant?: ColorsTypes;
    size?: SizesTypes;
    className?: string;
    calendarClassName?: string;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    required?: boolean;
    touched?: boolean;
    error?: string;
    minDate?: Date;
    maxDate?: Date;
}

declare function ITDatePicker({ name, value, onChange, onBlur, variant, size, className, calendarClassName, disabled, label, touched, error, required, placeholder, minDate, maxDate, }: ITDatePickerProps): react_jsx_runtime.JSX.Element;

interface ITDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
    useFormHeader?: boolean;
}

declare function ITDialog({ isOpen, onClose, children, className, title, useFormHeader, }: ITDialogProps): react_jsx_runtime.JSX.Element;

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
    rightIcon?: React$1.ReactNode;
    leftIcon?: React$1.ReactNode;
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
    leftIcon?: React$1.ReactNode;
    rightIcon?: React$1.ReactNode;
    component?: React$1.ComponentType<any>;
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

interface ITInputProps {
    name: string;
    type?: "text" | "password" | "number" | "email" | "checkbox" | "radio" | "textarea";
    label?: string;
    currencyFormat?: boolean;
    placeholder?: string;
    value?: any;
    onChange: (event: any) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement, Element>) => void;
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
    error?: string;
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

declare function ITInput({ name, type, label, placeholder, value, onChange, onBlur, disabled, className, containerClassName, labelClassName, touched, error, formatNumber, required, autoFocus, onClick, iconLeft, iconRight, maxLength, minLength, checked, showHintLength, currencyFormat, rows, min, max, readOnly, focusContent }: ITInputProps): react_jsx_runtime.JSX.Element;

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
    error?: string;
    required?: boolean;
    autoFocus?: boolean;
    readOnly?: boolean;
}

/**
 * Componente de selección (select) con soporte para opciones personalizadas, validación y personalización de estilo.
 * Matches styles of ITInput.
 */
declare function ITSelect({ name, options, label, placeholder, valueField, labelField, value, onChange, onBlur, disabled, className, touched, required, error, readOnly, }: ITSelectProps): react_jsx_runtime.JSX.Element;

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

type TableVariants = "default" | "striped" | "bordered";
type TableSize = "sm" | "md" | "lg";

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

declare function ITTable<T extends Record<string, unknown>>({ columns, data, containerClassName, className, variant, size, itemsPerPageOptions, defaultItemsPerPage, title, }: ITTableProps<T>): react_jsx_runtime.JSX.Element;

interface ITToastProps {
    message: string;
    type?: "success" | "error" | "warning" | "info" | "primary" | "danger" | string;
    duration?: number;
    position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
    onClose?: () => void;
}

declare function ITToast({ message, type, duration, position, onClose, }: ITToastProps): react_jsx_runtime.JSX.Element;

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

declare function ITText({ children, className }: {
    children: any;
    className?: string;
}): react_jsx_runtime.JSX.Element;

declare const ITImage: ({ src, alt, className, fallbackSrc, }: {
    src: any;
    alt: any;
    className?: string;
    fallbackSrc?: string;
}) => react_jsx_runtime.JSX.Element;

declare const badgeVariants: {
    readonly filled: "filled";
    readonly outlined: "outlined";
};

interface ITBadgetProps {
    label?: string;
    children?: React.ReactNode;
    color?: ColorsTypes;
    size?: SizesTypes;
    variant?: keyof typeof badgeVariants;
    className?: string;
}

declare function ITBadget({ children, label, color, size, variant, className, }: ITBadgetProps): react_jsx_runtime.JSX.Element;

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

declare const createValidationSchema: (fields: FieldConfig[]) => Yup.ObjectSchema<{
    [x: string]: never;
}, Yup.AnyObject, {
    [x: string]: any;
}, "">;

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

interface ITNavigationSubItem {
    id: string;
    label: string;
    action: () => void;
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
    className?: string;
}

interface ITLayoutProps {
    topBar: ITTopBarProps;
    sidebar: ITSidebarProps;
    children: React.ReactNode;
    className?: string;
}

declare function ITLayout({ topBar, sidebar, children, className, }: ITLayoutProps): react_jsx_runtime.JSX.Element;

interface ITTimePickerProps {
    name: string;
    value?: string;
    label?: string;
    placeholder?: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
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
declare const ITDropfile: React$1.FC<ITDropfileProps>;

type IconType = React$1.ReactNode;
interface Step {
    label: string;
    content: React$1.ReactNode;
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

export { type Column, type FieldConfig, type FieldConfigV2, ITBadget, type ITBadgetProps, ITButton, type ITButtonProps, ITCalendar, type ITCalendarProps, ITCard, type ITCardProps, ITDatePicker, type ITDatePickerProps, ITDialog, type ITDialogProps, ITDropfile, ITFormBuilder, type ITFormBuilderProps, ITImage, ITInput, type ITInputProps, ITLayout, type ITLayoutProps, ITLoader, ITNavbar, type ITNavbarProps, ITPagination, ITSelect, type ITSelectProps, ITSlideToggle, type ITSlideToggleProps, ITStepper, ITTable, type ITTableProps, ITText, ITTimePicker, type ITTimePickerProps, ITToast, type ITToastProps, createValidationSchema };
