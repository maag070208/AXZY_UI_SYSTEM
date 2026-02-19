/**
 * 1. Paleta base (colores crudos) - Actualizada a tonos azules
 */
export declare const palette: {
    blue: {
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
    cyan: {
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
};
/**
 * 2. Colores semánticos (qué representa cada color)
 */
export declare const semanticColors: {
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
/**
 * 3. Tokens de componentes (heredan de semantic)
 */
export declare const components: {
    sidebar: {
        backgroundColor: string;
        label: {
            color: string;
            size: string;
            weight: string;
        };
        icon: {
            color: string;
            size: string;
        };
        hover: {
            backgroundColor: string;
        };
        active: {
            backgroundColor: string;
            borderLeft: string;
        };
    };
    button: {
        primary: {
            backgroundColor: string;
            color: string;
            hover: string;
            active: string;
            focus: string;
            borderRadius: string;
            padding: string;
            fontSize: string;
            fontWeight: string;
            transition: string;
        };
        secondary: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
            padding: string;
            fontSize: string;
            fontWeight: string;
        };
        success: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        danger: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        error: {
            backgroundColor: string;
            color: string;
            hover: string;
            borderRadius: string;
        };
        warning: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        info: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        purple: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        outline: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderWidth: string;
            hover: string;
            borderRadius: string;
        };
    };
    badge: {
        primary: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderRadius: string;
            padding: string;
            fontSize: string;
            fontWeight: string;
        };
        secondary: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderRadius: string;
        };
        success: {
            backgroundColor: "#d1fae5";
            color: "#065f46";
            borderColor: "#a7f3d0";
            borderRadius: string;
        };
        danger: {
            backgroundColor: "#ffe4e6";
            color: "#9f1239";
            borderColor: "#fecdd3";
            borderRadius: string;
        };
        warning: {
            backgroundColor: "#fef3c7";
            color: "#92400e";
            borderColor: "#fde68a";
            borderRadius: string;
        };
        info: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderRadius: string;
        };
        purple: {
            backgroundColor: "#ede9fe";
            color: "#5b21b6";
            borderColor: "#ddd6fe";
            borderRadius: string;
        };
        error: {
            backgroundColor: "#ffe4e6";
            color: "#9f1239";
            borderColor: "#fecdd3";
            borderRadius: string;
        };
    };
    card: {
        backgroundColor: string;
        borderRadius: string;
        borderColor: string;
        borderWidth: string;
        shadow: string;
        hover: {
            shadow: string;
        };
        header: {
            backgroundColor: string;
            borderBottom: string;
            padding: string;
            borderTopLeftRadius: string;
            borderTopRightRadius: string;
        };
        body: {
            padding: string;
        };
    };
    input: {
        backgroundColor: string;
        borderColor: string;
        borderRadius: string;
        padding: string;
        fontSize: string;
        focus: {
            borderColor: string;
            ring: string;
        };
        placeholder: string;
        disabled: {
            backgroundColor: string;
            borderColor: string;
        };
        error: {
            borderColor: "#f43f5e";
            ring: string;
        };
    };
    table: {
        header: {
            backgroundColor: string;
            color: string;
            fontSize: string;
            fontWeight: string;
            textTransform: string;
            letterSpacing: string;
        };
        row: {
            hover: string;
            borderBottom: string;
        };
        cell: {
            padding: string;
        };
    };
    alert: {
        info: {
            backgroundColor: string;
            borderColor: string;
            color: string;
            icon: string;
        };
        success: {
            backgroundColor: "#ecfdf5";
            borderColor: "#a7f3d0";
            color: "#065f46";
            icon: "#10b981";
        };
        warning: {
            backgroundColor: "#fffbeb";
            borderColor: "#fde68a";
            color: "#92400e";
            icon: "#f59e0b";
        };
        error: {
            backgroundColor: "#fff1f2";
            borderColor: "#fecdd3";
            color: "#9f1239";
            icon: "#f43f5e";
        };
    };
    modal: {
        overlay: {
            backgroundColor: string;
        };
        content: {
            backgroundColor: string;
            borderRadius: string;
            shadow: string;
        };
        header: {
            padding: string;
            borderBottom: string;
        };
        body: {
            padding: string;
        };
        footer: {
            padding: string;
            borderTop: string;
            backgroundColor: string;
        };
    };
};
/**
 * 4. Configuración global de tipografía y espaciado
 */
export declare const typography: {
    fontFamily: {
        sans: string[];
        mono: string[];
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
    };
    fontWeight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
    };
    lineHeight: {
        tight: string;
        normal: string;
        relaxed: string;
    };
};
/**
 * 5. Theme final exportado
 */
export declare const theme: {
    sidebar: {
        backgroundColor: string;
        label: {
            color: string;
            size: string;
            weight: string;
        };
        icon: {
            color: string;
            size: string;
        };
        hover: {
            backgroundColor: string;
        };
        active: {
            backgroundColor: string;
            borderLeft: string;
        };
    };
    button: {
        primary: {
            backgroundColor: string;
            color: string;
            hover: string;
            active: string;
            focus: string;
            borderRadius: string;
            padding: string;
            fontSize: string;
            fontWeight: string;
            transition: string;
        };
        secondary: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
            padding: string;
            fontSize: string;
            fontWeight: string;
        };
        success: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        danger: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        error: {
            backgroundColor: string;
            color: string;
            hover: string;
            borderRadius: string;
        };
        warning: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        info: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        purple: {
            backgroundColor: string;
            color: string;
            hover: string;
            focus: string;
            borderRadius: string;
        };
        outline: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderWidth: string;
            hover: string;
            borderRadius: string;
        };
    };
    badge: {
        primary: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderRadius: string;
            padding: string;
            fontSize: string;
            fontWeight: string;
        };
        secondary: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderRadius: string;
        };
        success: {
            backgroundColor: "#d1fae5";
            color: "#065f46";
            borderColor: "#a7f3d0";
            borderRadius: string;
        };
        danger: {
            backgroundColor: "#ffe4e6";
            color: "#9f1239";
            borderColor: "#fecdd3";
            borderRadius: string;
        };
        warning: {
            backgroundColor: "#fef3c7";
            color: "#92400e";
            borderColor: "#fde68a";
            borderRadius: string;
        };
        info: {
            backgroundColor: string;
            color: string;
            borderColor: string;
            borderRadius: string;
        };
        purple: {
            backgroundColor: "#ede9fe";
            color: "#5b21b6";
            borderColor: "#ddd6fe";
            borderRadius: string;
        };
        error: {
            backgroundColor: "#ffe4e6";
            color: "#9f1239";
            borderColor: "#fecdd3";
            borderRadius: string;
        };
    };
    card: {
        backgroundColor: string;
        borderRadius: string;
        borderColor: string;
        borderWidth: string;
        shadow: string;
        hover: {
            shadow: string;
        };
        header: {
            backgroundColor: string;
            borderBottom: string;
            padding: string;
            borderTopLeftRadius: string;
            borderTopRightRadius: string;
        };
        body: {
            padding: string;
        };
    };
    input: {
        backgroundColor: string;
        borderColor: string;
        borderRadius: string;
        padding: string;
        fontSize: string;
        focus: {
            borderColor: string;
            ring: string;
        };
        placeholder: string;
        disabled: {
            backgroundColor: string;
            borderColor: string;
        };
        error: {
            borderColor: "#f43f5e";
            ring: string;
        };
    };
    table: {
        header: {
            backgroundColor: string;
            color: string;
            fontSize: string;
            fontWeight: string;
            textTransform: string;
            letterSpacing: string;
        };
        row: {
            hover: string;
            borderBottom: string;
        };
        cell: {
            padding: string;
        };
    };
    alert: {
        info: {
            backgroundColor: string;
            borderColor: string;
            color: string;
            icon: string;
        };
        success: {
            backgroundColor: "#ecfdf5";
            borderColor: "#a7f3d0";
            color: "#065f46";
            icon: "#10b981";
        };
        warning: {
            backgroundColor: "#fffbeb";
            borderColor: "#fde68a";
            color: "#92400e";
            icon: "#f59e0b";
        };
        error: {
            backgroundColor: "#fff1f2";
            borderColor: "#fecdd3";
            color: "#9f1239";
            icon: "#f43f5e";
        };
    };
    modal: {
        overlay: {
            backgroundColor: string;
        };
        content: {
            backgroundColor: string;
            borderRadius: string;
            shadow: string;
        };
        header: {
            padding: string;
            borderBottom: string;
        };
        body: {
            padding: string;
        };
        footer: {
            padding: string;
            borderTop: string;
            backgroundColor: string;
        };
    };
    palette: {
        blue: {
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
        cyan: {
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
    };
    colors: {
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
    typography: {
        fontFamily: {
            sans: string[];
            mono: string[];
        };
        fontSize: {
            xs: string;
            sm: string;
            base: string;
            lg: string;
            xl: string;
            '2xl': string;
            '3xl': string;
            '4xl': string;
        };
        fontWeight: {
            normal: string;
            medium: string;
            semibold: string;
            bold: string;
        };
        lineHeight: {
            tight: string;
            normal: string;
            relaxed: string;
        };
    };
};
