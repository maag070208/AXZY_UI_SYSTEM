import type { Meta, StoryObj } from "@storybook/react";
import ITStack from "./stack";

const meta: Meta<typeof ITStack> = {
  title: "Layout/ITStack",
  component: ITStack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    spacing: { control: { type: "range", min: 0, max: 16, step: 1 } },
    alignItems: {
      control: "select",
      options: [undefined, "start", "end", "center", "stretch", "baseline"],
    },
    justifyContent: {
      control: "select",
      options: [undefined, "start", "end", "center", "between", "around", "evenly"],
    },
    flexWrap: {
      control: "select",
      options: [undefined, "nowrap", "wrap", "wrap-reverse"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ITStack>;

const Box = ({ children, className = "" }: { children: string; className?: string }) => (
  <div className={`bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium ${className}`}>
    {children}
  </div>
);

export const Vertical: Story = {
  args: { direction: "column", spacing: 2, children: null },
  render: (args) => (
    <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
  ),
};

export const Horizontal: Story = {
  args: { direction: "row", spacing: 2, children: null },
  render: (args) => (
    <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
  ),
};

export const WithDivider: Story = {
  args: { direction: "row", spacing: 2, divider: <div className="w-px bg-gray-300 self-stretch" /> },
  render: (args) => (
    <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
  ),
};

export const Centered: Story = {
  args: { direction: "row", spacing: 4, alignItems: "center", justifyContent: "center", className: "h-40 bg-gray-50 rounded-xl" },
  render: (args) => (
    <ITStack {...args}>
      <Box>Center</Box>
      <Box>Middle</Box>
    </ITStack>
  ),
};
