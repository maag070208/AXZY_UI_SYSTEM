export interface ITTimePickerProps {
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
export default function ITTimePicker({ name, value, label, placeholder, onChange, onBlur, required, touched, error, disabled, className, size, variant, }: ITTimePickerProps): import("react/jsx-runtime").JSX.Element;
