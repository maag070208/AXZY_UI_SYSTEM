import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITRadioGroup from "./radio";
import ITStack from "../stack/stack";

const meta: Meta<typeof ITRadioGroup> = {
  title: "Components/Inputs/ITRadioGroup",
  component: ITRadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITRadioGroup>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("option1");
    return (
      <ITRadioGroup
        name="example"
        value={val}
        onChange={setVal}
        options={[
          { value: "option1", label: "Opción 1" },
          { value: "option2", label: "Opción 2" },
          { value: "option3", label: "Opción 3" },
        ]}
      />
    );
  },
};

export const Row: Story = {
  render: () => {
    const [val, setVal] = useState("sm");
    return (
      <ITRadioGroup
        name="size"
        value={val}
        onChange={setVal}
        direction="row"
        options={[
          { value: "sm", label: "Chico" },
          { value: "md", label: "Mediano" },
          { value: "lg", label: "Grande" },
        ]}
      />
    );
  },
};
