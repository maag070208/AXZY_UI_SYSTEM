import type { Meta, StoryObj } from "@storybook/react";
import ITFlex from "./flex";

const meta: Meta<typeof ITFlex> = {
  title: "Layout/ITFlex",
  component: ITFlex,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    align: {
      control: "select",
      options: [undefined, "start", "end", "center", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: [undefined, "start", "end", "center", "between", "around", "evenly"],
    },
    wrap: {
      control: "select",
      options: [undefined, "nowrap", "wrap", "wrap-reverse"],
    },
    gap: { control: { type: "range", min: 0, max: 16, step: 1 } },
    grow: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ITFlex>;

const Box = ({ children, className = "" }: { children: string; className?: string }) => (
  <div className={`bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium ${className}`}>
    {children}
  </div>
);

export const Row: Story = {
  args: { direction: "row", gap: 3 },
  render: (args) => (
    <ITFlex {...args}>
      <Box>Flex 1</Box>
      <Box>Flex 2</Box>
      <Box>Flex 3</Box>
    </ITFlex>
  ),
};

export const SpaceBetween: Story = {
  args: { justify: "between", align: "center", className: "w-full" },
  render: (args) => (
    <ITFlex {...args}>
      <Box>Left</Box>
      <Box>Center</Box>
      <Box>Right</Box>
    </ITFlex>
  ),
};

export const ColumnGrow: Story = {
  args: { direction: "column", gap: 2, className: "h-60" },
  render: (args) => (
    <ITFlex {...args}>
      <ITFlex grow className="bg-primary-100 rounded-lg p-4">
        <Box>Grow (flex: 1)</Box>
      </ITFlex>
      <Box className="w-full">Fixed height</Box>
    </ITFlex>
  ),
};
