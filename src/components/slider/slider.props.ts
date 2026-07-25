/** Props for the ITSlider range slider component. */
export interface ITSliderProps {
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
