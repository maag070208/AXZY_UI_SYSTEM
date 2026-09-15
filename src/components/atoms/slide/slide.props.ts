/** Props for the ITSlideToggle iOS-style toggle switch. */
export interface ITSlideToggleProps {
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
