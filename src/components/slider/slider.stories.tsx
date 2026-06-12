import type { Meta, StoryObj } from "@storybook/react";
import ITSlider from "./slider";
import { useState } from "react";

const meta: Meta<typeof ITSlider> = {
  title: "Components/Inputs/ITSlider",
  component: ITSlider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITSlider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(50);
    return <ITSlider value={val} onChange={setVal} min={0} max={100} label="Volume" />;
  },
};

export const WithRange: Story = {
  render: () => {
    const [val, setVal] = useState(3);
    return <ITSlider value={val} onChange={setVal} min={1} max={10} step={1} label="Items per page" />;
  },
};

export const Disabled: Story = {
  render: () => <ITSlider value={40} onChange={() => {}} disabled label="Disabled" />,
};
