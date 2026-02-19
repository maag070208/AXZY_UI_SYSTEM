export interface ITSlideToggleProps {
    onToggle?: (value: boolean) => void;
    initialState?: boolean;
    activeColor?: string;
    inactiveColor?: string;
}
