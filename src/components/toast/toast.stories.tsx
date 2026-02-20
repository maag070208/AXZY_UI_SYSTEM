import type { Meta, StoryObj } from "@storybook/react";
import ITToast from "./toast";
import { useState } from "react";
import ITButton from "../button/button";

const meta: Meta<typeof ITToast> = {
  title: "Components/Feedback/ITToast",
  component: ITToast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info", "primary", "danger"],
    },
    position: {
      control: "select",
      options: [
        "top-right",
        "top-center",
        "top-left",
        "bottom-right",
        "bottom-center",
        "bottom-left",
      ],
    },
    duration: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    message: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITToast>;

const ToastTrigger = (args: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center justify-center p-12">
      <ITButton
        variant="solid"
        color={args.type in ["success", "error", "warning", "info", "primary"] ? args.type : "primary"}
        onClick={() => {
          setShow(false);
          // Small delay to allow react to unmount and remount a fresh toast for demo purposes
          setTimeout(() => setShow(true), 10);
        }}
      >
        Show Toast ({args.type})
      </ITButton>
      
      {show && (
        <ITToast
          {...args}
          onClose={() => {
            setShow(false);
            if (args.onClose) args.onClose();
          }}
        />
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ToastTrigger {...args} />,
  args: {
    message: "This is a default information message.",
    type: "info",
    position: "top-right",
    duration: 3000,
  },
};

export const Success: Story = {
  render: (args) => <ToastTrigger {...args} />,
  args: {
    message: "Operation completed successfully!",
    type: "success",
    position: "top-right",
    duration: 3000,
  },
};

export const Error: Story = {
  render: (args) => <ToastTrigger {...args} />,
  args: {
    message: "There was a critical error processing your request.",
    type: "error", // Uses theme.colors.error or danger
    position: "top-center",
    duration: 5000,
  },
};

export const Warning: Story = {
  render: (args) => <ToastTrigger {...args} />,
  args: {
    message: "Please check your input values before proceeding.",
    type: "warning",
    position: "bottom-left",
    duration: 4000,
  },
};

/**
 * Multiple Toasts Preview
 * Note: A real implementation would manage multiple toasts via a Toast Provider Context. 
 * This just shows how the colors resolve visually.
 */
export const AllTypesPreview = () => {
  const types = ["primary", "success", "error", "warning", "info"] as const;
  
  return (
    <div className="flex flex-col gap-8 w-[400px]">
      <h3 className="text-gray-500 text-sm font-semibold mb-2">Static Preview (Not positioned fixed)</h3>
      <div className="flex flex-col gap-4 relative">
        {types.map((type) => (
          // We inline style it simply to bypass the fixed positioning just for this preview story block.
           <div key={type} className="relative z-0">
             <ITToast 
                message={`This is a ${type} notification message`} 
                type={type} 
                duration={999999} 
                position="top-right" 
             />
           </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">Note: Actual ITToasts are position: fixed and rendered at the edges of the screen according to their position prop.</p>
    </div>
  );
};
