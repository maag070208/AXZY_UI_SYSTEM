import type { Meta, StoryObj } from "@storybook/react";
import ITLoader from "./loader";

const meta: Meta<typeof ITLoader> = {
  title: "Components/Feedback/ITLoader",
  component: ITLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the loader",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "bar", "pulse"],
      description: "Visual style of the loader",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "purple"],
      description: "Semantic color from theme",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITLoader>;

export const Spinner: Story = {
  args: {
    variant: "spinner",
    color: "primary",
    size: "md",
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
    color: "secondary",
    size: "md",
  },
};

export const Pulse: Story = {
  args: {
    variant: "pulse",
    color: "danger",
    size: "lg",
  },
};

export const Bar: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <ITLoader {...args} />
    </div>
  ),
  args: {
    variant: "bar",
    color: "success",
    size: "md",
  },
};

export const AllColors: Story = {
  render: (args) => (
    <div className="flex gap-4 items-center">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple'] as const).map((color) => (
        <ITLoader key={color} {...args} color={color} />
      ))}
    </div>
  ),
  args: {
    variant: "spinner",
    size: "md",
  },
};

export const AllVariants: Story = {
    render: (args) => (
      <div className="flex flex-col gap-8 items-center">
        <div className="flex gap-4 items-center">
             <span className="w-20 text-sm font-bold text-gray-500">Spinner</span>
             <ITLoader variant="spinner" color="primary" />
        </div>
        <div className="flex gap-4 items-center">
             <span className="w-20 text-sm font-bold text-gray-500">Dots</span>
             <ITLoader variant="dots" color="primary" />
        </div>
        <div className="flex gap-4 items-center">
             <span className="w-20 text-sm font-bold text-gray-500">Pulse</span>
             <ITLoader variant="pulse" color="primary" />
        </div>
         <div className="flex gap-4 items-center w-[300px]">
             <span className="w-20 text-sm font-bold text-gray-500">Bar</span>
             <ITLoader variant="bar" color="primary" />
        </div>
      </div>
    ),
  };
