import type { Meta, StoryObj } from "@storybook/react";
import ITTooltip from "@/components/atoms/tooltip/tooltip";
import ITButton from "@/components/atoms/button/button";

const meta: Meta<typeof ITTooltip> = {
  title: "Components/Overlay/ITTooltip",
  component: ITTooltip,
};

export default meta;
type Story = StoryObj<typeof ITTooltip>;

export const Top: Story = {
  args: { content: "Tooltip arriba", position: "top", children: <ITButton label="Hover me" /> },
};

export const Bottom: Story = {
  args: { content: "Tooltip abajo", position: "bottom", children: <ITButton label="Hover me" /> },
};
