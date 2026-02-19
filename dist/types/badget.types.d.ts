import { ColorsTypes } from './colors.types';
export declare const badgeVariants: {
    readonly filled: "filled";
    readonly outlined: "outlined";
};
export declare const badgeColors: {
    readonly primary: "bg-primary-500 text-white";
    readonly secondary: "bg-secondary-500 text-white";
    readonly success: "bg-success-500 text-white";
    readonly danger: "bg-danger-500 text-white";
    readonly warning: "bg-warning-500 text-black";
    readonly purple: "bg-purple-500 text-white";
};
export declare const outlinedBadgeColors: {
    readonly primary: "bg-primary-200 border border-primary-500 text-primary-700";
    readonly secondary: "bg-secondary-200 border border-secondary-500 text-secondary-700";
    readonly success: "bg-success-200 border border-success-500 text-success-700";
    readonly danger: "bg-danger-200 border border-danger-500 text-danger-700";
    readonly warning: "bg-warning-200 border border-warning-500 text-warning-700";
    readonly purple: "bg-purple-200 border border-purple-500 text-purple-700";
};
export declare const badgeSizes: {
    readonly small: "text-xs px-2 py-1";
    readonly medium: "text-sm px-3 py-1.5";
    readonly large: "text-base px-4 py-2";
};
export declare const getBadgeColorClasses: (color: ColorsTypes, variant: keyof typeof badgeVariants) => any;
