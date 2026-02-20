export interface ITSlideToggleProps {
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
