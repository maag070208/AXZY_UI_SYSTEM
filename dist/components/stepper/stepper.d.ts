import { default as React } from '../../../node_modules/react';
type IconType = React.ReactNode;
interface Step {
    label: string;
    content: React.ReactNode;
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
export default function ITStepper({ steps, currentStep, onFinish, onStepChange, allowClickToJump, useIcons, disableNext, containerClassName, stepClassName, scrollableContent, maxContentHeight, }: ITStepperProps): import("react/jsx-runtime").JSX.Element;
export {};
