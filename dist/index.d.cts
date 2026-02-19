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
        '50': "#f0fdf4";
        '100': "#dcfce7";
        '200': "#bbf7d0";
        '300': "#86efac";
        '400': "#4ade80";
        '500': "#22c55e";
        '600': "#16a34a";
        '700': "#15803d";
        '800': "#166534";
        '900': "#14532d";
        '950': "#052e16";
    };
    danger: {
        '50': "#fef2f2";
        '100': "#fee2e2";
        '200': "#fecaca";
        '300': "#fca5a5";
        '400': "#f87171";
        '500': "#ef4444";
        '600': "#dc2626";
        '700': "#b91c1c";
        '800': "#991b1b";
        '900': "#7f1d1d";
        '950': "#450a0a";
    };
    warning: {
        '50': "#fefce8";
        '100': "#fef9c3";
        '200': "#fef08a";
        '300': "#fde047";
        '400': "#facc15";
        '500': "#eab308";
        '600': "#ca8a04";
        '700': "#a16207";
        '800': "#854d0e";
        '900': "#713f12";
        '950': "#422006";
    };
    info: {
        '50': "#f0f9ff";
        '100': "#e0f2fe";
        '200': "#bae6fd";
        '300': "#7dd3fc";
        '400': "#38bdf8";
        '500': "#0ea5e9";
        '600': "#0284c7";
        '700': "#0369a1";
        '800': "#075985";
        '900': "#0c4a6e";
        '950': "#082f49";
    };
    purple: {
        '50': "#faf5ff";
        '100': "#f3e8ff";
        '200': "#e9d5ff";
        '300': "#d8b4fe";
        '400': "#c084fc";
        '500': "#a855f7";
        '600': "#9333ea";
        '700': "#7e22ce";
        '800': "#6b21a8";
        '900': "#581c87";
        '950': "#3b0764";
    };
    error: {
        '50': "#fef2f2";
        '100': "#fee2e2";
        '200': "#fecaca";
        '300': "#fca5a5";
        '400': "#f87171";
        '500': "#ef4444";
        '600': "#dc2626";
        '700': "#b91c1c";
        '800': "#991b1b";
        '900': "#7f1d1d";
        '950': "#450a0a";
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

declare const Calendar: React$1.FC<ITCalendarProps>;

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
 *
 * Este componente permite crear una tarjeta con título, imagen, contenido y acciones personalizables.
 * Se puede personalizar el estilo mediante clases adicionales para cada sección de la tarjeta (imagen, título, contenido, acciones).
 *
 * @param title - El título de la tarjeta (opcional).
 * @param image - La URL de la imagen que se mostrará en la tarjeta (opcional).
 * @param alt - El texto alternativo para la imagen (opcional, por defecto es "Card Image").
 * @param children - El contenido principal de la tarjeta.
 * @param actions - Las acciones que se mostrarán en la parte inferior de la tarjeta (por ejemplo, botones de acción).
 * @param className - Clases adicionales que se aplican al contenedor principal de la tarjeta.
 * @param imageClassName - Clases adicionales que se aplican a la imagen.
 * @param titleClassName - Clases adicionales que se aplican al título de la tarjeta.
 * @param contentClassName - Clases adicionales que se aplican al contenido de la tarjeta.
 * @param actionClassName - Clases adicionales que se aplican a la sección de acciones.
 *
 * @returns Una tarjeta personalizada con los parámetros configurados.
 *
 * @example
 * ```tsx
 * import ITCard from './ITCard';
 *
 * function App() {
 *   return (
 *     <div>
 *       <ITCard
 *         title="Mi Tarjeta"
 *         image="https://via.placeholder.com/150"
 *         actions={<button>Acción</button>}
 *       >
 *         <p>Este es el contenido de la tarjeta</p>
 *       </ITCard>
 *     </div>
 *   );
 * }
 * ```
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

/**
 * Componente de diálogo modal que se muestra sobre el contenido de la página.
 *
 * Este componente permite mostrar un diálogo modal centrado en la pantalla.
 * El modal puede ser cerrado tanto mediante un botón de cierre como al presionar la tecla "Escape" cuando está abierto.
 *
 * @param isOpen - Booleano que indica si el modal está abierto o cerrado.
 * @param onClose - Función de callback que se ejecuta cuando el modal se cierra.
 * @param children - Contenido del modal que se pasa como `children`.
 *
 * @returns El componente de diálogo que se muestra sobre la pantalla.
 *
 * @example
 * ```tsx
 * import ITDialog from './ITDialog';
 *
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   const handleClose = () => {
 *     setIsOpen(false);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(true)}>Abrir modal</button>
 *       <ITDialog isOpen={isOpen} onClose={handleClose}>
 *         <h2>Este es un modal</h2>
 *         <p>Contenido del modal</p>
 *       </ITDialog>
 *     </div>
 *   );
 * }
 * ```
 */
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

interface ITFormBuilderProps {
    fields: FieldConfig[];
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
}

/**
 * Componente que construye un formulario dinámico utilizando Formik y Yup.
 *
 * Este componente toma una configuración de campos y genera un formulario con validación y manejo de estado.
 * El formulario puede ser flexible con tipos de campos como texto, selección y fecha.
 *
 * @param fields - Un arreglo de configuraciones de campos, donde cada campo contiene propiedades como nombre, tipo, etiqueta, opciones y validación.
 * @param columns - El número de columnas que debe tener el grid donde se distribuyen los campos del formulario.
 * @param values - Un objeto con los valores actuales de cada campo en el formulario.
 * @param handleChange - Función que se ejecuta cuando un campo cambia de valor.
 * @param handleBlur - Función que se ejecuta cuando un campo pierde el foco.
 * @param touched - Un objeto que indica qué campos han sido tocados (es decir, han sido visitados por el usuario).
 * @param errors - Un objeto que contiene los errores de validación de los campos, basado en Yup.
 *
 * @returns Un formulario dinámico renderizado que muestra los campos y sus errores de validación.
 *
 * @example
 * ```tsx
 * import ITFormBuilder from './ITFormBuilder';
 *
 * function App() {
 *   const [formValues, setFormValues] = useState({
 *     name: '',
 *     email: '',
 *   });
 *
 *   const handleFormChange = (event) => {
 *     const { name, value } = event.target;
 *     setFormValues((prev) => ({ ...prev, [name]: value }));
 *   };
 *
 *   return (
 *     <Formik
 *       initialValues={formValues}
 *       onSubmit={(values) => {
 *         //console.log(values);
 *       }}
 *     >
 *       {({ handleBlur, touched, errors }) => (
 *         <ITFormBuilder
 *           fields={[
 *             { name: 'name', label: 'Nombre', type: 'text', column: 6 },
 *             { name: 'email', label: 'Email', type: 'text', column: 6 },
 *           ]}
 *           columns={12}
 *           values={formValues}
 *           handleChange={handleFormChange}
 *           handleBlur={handleBlur}
 *           touched={touched}
 *           errors={errors}
 *         />
 *       )}
 *     </Formik>
 *   );
 * }
 * ```
 */
declare function ITFormBuilder({ fields, columns, values, handleChange, handleBlur, touched, errors, setFieldValue, }: ITFormBuilderProps): react_jsx_runtime.JSX.Element;

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
 *
 * Este componente crea un campo de selección con un conjunto de opciones, que puede ser personalizado con diferentes tamaños, variantes y estilos.
 * Además, maneja la validación de la entrada mostrando un mensaje de error si es necesario. El componente también incluye un icono a la derecha para indicar que es un campo de selección.
 *
 * @param name - Nombre único del campo de selección, utilizado tanto para el identificador como para el atributo `name`.
 * @param options - Lista de opciones que se mostrarán en el campo de selección. Cada opción debe tener los campos definidos por `valueField` y `labelField`.
 * @param label - Etiqueta del campo, que se muestra encima del campo de selección.
 * @param placeholder - Texto que aparece dentro del campo cuando no se ha seleccionado ninguna opción.
 * @param valueField - Nombre del campo en las opciones que se utilizará como valor de cada opción (por defecto es "value").
 * @param labelField - Nombre del campo en las opciones que se utilizará como texto visible de cada opción (por defecto es "label").
 * @param value - El valor seleccionado en el campo.
 * @param onChange - Función que se ejecuta cuando se cambia la opción seleccionada.
 * @param onBlur - Función que se ejecuta cuando el campo pierde el foco.
 * @param variant - Variación del estilo del campo (por defecto es "primary"). Se usa para diferenciar visualmente entre diferentes tipos de campos.
 * @param size - Tamaño del campo de selección (por defecto es "medium"). Puede ser "small", "medium" o "large".
 * @param disabled - Determina si el campo está deshabilitado (por defecto es `false`).
 * @param className - Clases CSS adicionales para aplicar al componente.
 * @param touched - Indica si el campo ha sido tocado por el usuario (por ejemplo, si se ha hecho foco en él).
 * @param error - Mensaje de error que se muestra si el campo tiene un error de validación.
 *
 * @returns Un campo de selección con opciones personalizadas, icono y validación de errores.
 *
 * @example
 * ```tsx
 * import ITSelect from './ITSelect';
 *
 * function App() {
 *   const [selectedOption, setSelectedOption] = useState('');
 *   const [touched, setTouched] = useState(false);
 *   const [error, setError] = useState('');
 *
 *   const handleChange = (event) => {
 *     setSelectedOption(event.target.value);
 *   };
 *
 *   const handleBlur = () => {
 *     setTouched(true);
 *     if (!selectedOption) {
 *       setError('Selecciona una opción');
 *     }
 *   };
 *
 *   const options = [
 *     { value: '1', label: 'Opción 1' },
 *     { value: '2', label: 'Opción 2' },
 *     { value: '3', label: 'Opción 3' },
 *   ];
 *
 *   return (
 *     <ITSelect
 *       name="options"
 *       label="Selecciona una opción"
 *       options={options}
 *       value={selectedOption}
 *       onChange={handleChange}
 *       onBlur={handleBlur}
 *       touched={touched}
 *       error={error}
 *       required
 *     />
 *   );
 * }
 * ```
 */
declare function ITSelect({ name, options, label, placeholder, valueField, labelField, value, onChange, onBlur, disabled, className, touched, required, error, readOnly, }: ITSelectProps): react_jsx_runtime.JSX.Element;

interface ITSlideToggleProps {
    onToggle?: (value: boolean) => void;
    initialState?: boolean;
    activeColor?: string;
    inactiveColor?: string;
}

/**
 * Componente de interruptor deslizante (toggle switch) que permite cambiar entre dos estados (activado o desactivado).
 *
 * Este componente simula un interruptor con dos estados visuales: activado y desactivado. El componente tiene soporte para un color personalizado cuando está activado (`activeColor`)
 * y cuando está desactivado (`inactiveColor`). También maneja un estado interno `isOn` que se puede controlar con la función `onToggle`, la cual se llama cada vez que el interruptor cambia de estado.
 *
 * @param onToggle - Función de callback que se ejecuta cada vez que el estado del interruptor cambia. Recibe el nuevo estado (`true` o `false`).
 * @param initialState - Estado inicial del interruptor. Si no se especifica, el valor por defecto es `false` (desactivado).
 * @param activeColor - Color de fondo cuando el interruptor está activado (por defecto es `bg-green-500`).
 * @param inactiveColor - Color de fondo cuando el interruptor está desactivado (por defecto es `bg-gray-400`).
 *
 * @returns Un componente que simula un interruptor deslizante, que puede alternar entre un estado activado y desactivado.
 *
 * @example
 * ```tsx
 * import ITSlideToggle from './ITSlideToggle';
 *
 * function App() {
 *   const handleToggle = (newState: boolean) => {
 *     //console.log(`El interruptor está ${newState ? 'activado' : 'desactivado'}`);
 *   };
 *
 *   return (
 *     <ITSlideToggle
 *       initialState={false}
 *       onToggle={handleToggle}
 *       activeColor="bg-slate-500"
 *       inactiveColor="bg-red-400"
 *     />
 *   );
 * }
 * ```
 */
declare function ITSlideToggle({ onToggle, initialState, activeColor, inactiveColor, }: ITSlideToggleProps): react_jsx_runtime.JSX.Element;

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
    type?: "success" | "error" | "warning" | "info";
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

declare function ITLoader({ size, variant, color, className, }: LoaderProps): react_jsx_runtime.JSX.Element;

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
    value: string;
    label?: string;
    placeholder?: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    touched?: boolean;
    error?: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary";
}
declare function ITTimePicker({ name, value, label, placeholder, onChange, onBlur, required, touched, error, disabled, className, size, variant, }: ITTimePickerProps): react_jsx_runtime.JSX.Element;

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
}
declare function ITStepper({ steps, currentStep, onFinish, onStepChange, allowClickToJump, useIcons, disableNext, containerClassName, stepClassName, scrollableContent, maxContentHeight, }: ITStepperProps): react_jsx_runtime.JSX.Element;

export { type Column, type FieldConfig, ITBadget, type ITBadgetProps, ITButton, type ITButtonProps, Calendar as ITCalendar, type ITCalendarProps, ITCard, type ITCardProps, ITDatePicker, type ITDatePickerProps, ITDialog, type ITDialogProps, ITDropfile, ITFormBuilder, type ITFormBuilderProps, ITImage, ITInput, type ITInputProps, ITLayout, type ITLayoutProps, ITLoader, ITNavbar, type ITNavbarProps, ITSelect, type ITSelectProps, ITSlideToggle, type ITSlideToggleProps, ITStepper, ITTable, type ITTableProps, ITText, ITTimePicker, type ITTimePickerProps, ITToast, type ITToastProps, createValidationSchema };
