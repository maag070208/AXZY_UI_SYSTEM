import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITProgress from "./progress";
import ITButton from "../button/button";

const meta: Meta<typeof ITProgress> = {
  title: "Components/Feedback/ITProgress",
  component: ITProgress,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITProgress>;

export const Determinate: Story = {
  render: () => {
    const [val, setVal] = useState(0);
    return (
      <div className="space-y-3">
        <ITProgress value={val} />
        <ITButton label="+10%" onClick={() => setVal(v => Math.min(v + 10, 100))} />
      </div>
    );
  },
};

export const Indeterminate: Story = {
  args: { variant: "indeterminate" },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-3">
      <ITProgress value={70} color="primary" />
      <ITProgress value={70} color="success" />
      <ITProgress value={70} color="danger" />
      <ITProgress value={70} color="warning" />
    </div>
  ),
};
