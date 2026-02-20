import type { Meta, StoryObj } from "@storybook/react";
import ITSlideToggle from "./slide";
import { useState } from "react";

const meta: Meta<typeof ITSlideToggle> = {
  title: "Components/Form Elements/ITSlideToggle",
  component: ITSlideToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    activeColor: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "purple"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    isOn: {
      control: "boolean",
    },
    initialState: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITSlideToggle>;

export const Default: Story = {
  args: {
    activeColor: "success",
    size: "md",
  },
};

export const CheckedUncontrolled: Story = {
  args: {
    initialState: true,
    activeColor: "primary",
  },
};

const ControlledSlideWrapper = (args: any) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="flex flex-col gap-4 items-center">
      <ITSlideToggle {...args} isOn={isOn} onToggle={setIsOn} />
      <span className="text-sm font-medium text-gray-500">
        External State: {isOn ? "ON" : "OFF"}
      </span>
    </div>
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledSlideWrapper {...args} />,
  args: {
    activeColor: "info",
    size: "lg",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-500 font-bold">Small</span>
        <ITSlideToggle {...args} size="sm" initialState={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-500 font-bold">Medium</span>
        <ITSlideToggle {...args} size="md" initialState={true} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-500 font-bold">Large</span>
        <ITSlideToggle {...args} size="lg" initialState={true} />
      </div>
    </div>
  ),
  args: {
     activeColor: "primary"
  }
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-gray-500">Off</span>
        <ITSlideToggle {...args} initialState={false} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-gray-500">On</span>
        <ITSlideToggle {...args} initialState={true} />
      </div>
    </div>
  ),
  args: {
    disabled: true,
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map((col) => (
        <div key={col} className="flex items-center gap-4">
          <span className="w-24 text-sm text-gray-500 font-bold capitalize">{col}</span>
          <ITSlideToggle {...args} activeColor={col} initialState={true} />
        </div>
      ))}
    </div>
  ),
};
