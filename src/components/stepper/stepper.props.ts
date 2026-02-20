import React from "react";

export type IconType = React.ReactNode;

export interface Step {
  label: string;
  content: React.ReactNode;
  icon?: IconType;
}

export interface ITStepperProps {
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
