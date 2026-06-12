import type { Meta, StoryObj } from "@storybook/react";
import ITTooltip from "./tooltip";
import ITButton from "../button/button";

const meta: Meta<typeof ITTooltip> = {
  title: "Components/Overlay/ITTooltip",
  component: ITTooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITTooltip>;

export const Top: Story = {
  args: { content: "Tooltip arriba", position: "top", children: <ITButton label="Hover me" /> },
};

export const Bottom: Story = {
  args: { content: "Tooltip abajo", position: "bottom", children: <ITButton label="Hover me" /> },
};
