import type { Meta, StoryObj } from "@storybook/react";
import ITStepper from "./stepper";
import { useState } from "react";
import { FaUser, FaIdCard, FaCheckCircle } from "react-icons/fa";

const meta: Meta<typeof ITStepper> = {
  title: "Components/Layout & Navigation/ITStepper",
  component: ITStepper,
  parameters: {
    layout: "padded", // Gives the stepper breathing room
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "purple"],
    },
    currentStep: {
      control: { type: "number", min: 0, max: 2 },
    },
    allowClickToJump: {
      control: "boolean",
    },
    useIcons: {
      control: "boolean",
    },
    scrollableContent: {
      control: "boolean",
    },
    disableNext: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITStepper>;

// --- MOCK CONTENT ---

const step1Content = (
  <div className="flex flex-col gap-4">
    <h3 className="text-lg font-bold">Personal Information</h3>
    <p className="text-gray-600">Please provide your basic details to get started.</p>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-gray-100 h-10 rounded animate-pulse"></div>
      <div className="bg-gray-100 h-10 rounded animate-pulse"></div>
      <div className="bg-gray-100 h-10 rounded animate-pulse col-span-2"></div>
    </div>
  </div>
);

const step2Content = (
  <div className="flex flex-col gap-4">
    <h3 className="text-lg font-bold">Address Details</h3>
    <p className="text-gray-600">Where should we send your documents?</p>
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="bg-gray-100 h-10 rounded animate-pulse col-span-3"></div>
      <div className="bg-gray-100 h-10 rounded animate-pulse col-span-2"></div>
      <div className="bg-gray-100 h-10 rounded animate-pulse"></div>
    </div>
  </div>
);

const step3Content = (
  <div className="flex flex-col gap-4 items-center justify-center h-full text-center py-8">
    <FaCheckCircle className="w-16 h-16 text-success-500 mb-4" />
    <h3 className="text-2xl font-bold">You're all set!</h3>
    <p className="text-gray-600 max-w-sm">Review your information before final submission. If everything looks good, click Finish.</p>
  </div>
);

const longScrollableContent = (
  <div className="flex flex-col gap-4">
    <h3 className="text-lg font-bold">Terms and Conditions</h3>
    {Array.from({ length: 15 }).map((_, i) => (
      <p key={i} className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    ))}
  </div>
);

const basicSteps = [
  { label: "Personal Info", content: step1Content },
  { label: "Address", content: step2Content },
  { label: "Confirmation", content: step3Content },
];

const iconSteps = [
  { label: "Account", icon: <FaUser />, content: step1Content },
  { label: "Identity", icon: <FaIdCard />, content: step2Content },
  { label: "Complete", icon: <FaCheckCircle />, content: step3Content },
];

const scrollableSteps = [
  { label: "Terms", content: longScrollableContent },
  { label: "Privacy Policy", content: longScrollableContent },
];


// --- INTERACTIVE WRAPPERS ---

const StepperWrapper = (args: any) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ITStepper
      {...args}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onFinish={() => alert("Stepper Finished!")}
    />
  );
};


// --- STORIES ---

export const Default: Story = {
  render: (args) => <StepperWrapper {...args} />,
  args: {
    steps: basicSteps,
    color: "primary",
    allowClickToJump: true,
  },
};

export const WithIcons: Story = {
  render: (args) => <StepperWrapper {...args} />,
  args: {
    steps: iconSteps,
    color: "purple",
    useIcons: true,
  },
};

export const StrictSequential: Story = {
  render: (args) => <StepperWrapper {...args} />,
  args: {
    steps: basicSteps,
    color: "danger",
    allowClickToJump: false, // User must use Next/Back buttons
  },
};

export const ScrollableContent: Story = {
  render: (args) => <StepperWrapper {...args} />,
  args: {
    steps: scrollableSteps,
    color: "info",
    scrollableContent: true,
    maxContentHeight: "300px", // Restricts height to demonstrate scrolling
  },
};
