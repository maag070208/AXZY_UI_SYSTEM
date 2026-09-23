import type { Meta, StoryObj } from "@storybook/react";
import ITChip from "@/components/atoms/chip/chip";

const meta: Meta<typeof ITChip> = {
  title: "Components/Data Display/ITChip",
  component: ITChip,
  parameters: { layout: "centered" },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "purple"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["soft", "filled", "outlined"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    removable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ITChip>;

export const Default: Story = {
  args: { label: "React", color: "primary" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ITChip label="Soft" variant="soft" color="primary" />
      <ITChip label="Filled" variant="filled" color="primary" />
      <ITChip label="Outlined" variant="outlined" color="primary" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {["primary", "secondary", "success", "danger", "warning", "info", "purple"].map((c) => (
        <ITChip key={c} label={c} color={c as never} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ITChip label="Small" size="sm" />
      <ITChip label="Medium" size="md" />
      <ITChip label="Large" size="lg" />
    </div>
  ),
};

export const Removable: Story = {
  args: { label: "México", color: "success", removable: true },
};

export const Selected: Story = {
  args: { label: "Activos", color: "primary", selected: true, onClick: () => {} },
};
