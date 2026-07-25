import React from "react";

export type IconType = React.ReactNode;

export interface Step {
  label: string;
  content: React.ReactNode;
  icon?: IconType;
}

export interface ITStepperProps {
  /** Array of step objects defining label, content, and optional icon. */
  steps: Step[];
  /** Zero-based index of the currently active step. */
  currentStep: number;
  /** Called when the user clicks "Finish" on the last step. */
  onFinish?: () => void;
  /** Called whenever the active step changes, receiving the new index. */
  onStepChange?: (step: number) => void;
  /** Whether clicking on completed or current step indicators jumps to that step. */
  allowClickToJump?: boolean;
  /** When true, renders step icons (if provided) instead of numeric indicators. */
  useIcons?: boolean;
  /** Disables the "Next" / "Finish" button. */
  disableNext?: boolean;
  /** Additional CSS classes for the outermost wrapper. */
  containerClassName?: string;
  /** Additional CSS classes for the content panel. */
  stepClassName?: string;
  /** Makes the step content area vertically scrollable. */
  scrollableContent?: boolean;
  /** Maximum height of the scrollable content area (CSS value, e.g. "400px"). */
  maxContentHeight?: string;
  /**
   * Semantic theme color for active steps and buttons.
   * Default: 'primary'
   */
  color?: string;
}
