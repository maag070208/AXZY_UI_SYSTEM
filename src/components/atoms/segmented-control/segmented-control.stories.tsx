import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FaList, FaTh } from "react-icons/fa";
import ITSegmentedControl from "./segmented-control";

const meta: Meta<typeof ITSegmentedControl> = {
  title: "Components/Inputs/ITSegmentedControl",
  component: ITSegmentedControl,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITSegmentedControl>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("day");
    return (
      <ITSegmentedControl
        options={[
          { value: "day", label: "Día" },
          { value: "week", label: "Semana" },
          { value: "month", label: "Mes" },
        ]}
        value={val}
        onChange={setVal}
      />
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [val, setVal] = useState("list");
    return (
      <ITSegmentedControl
        options={[
          { value: "list", label: "Lista", icon: <FaList size={10} /> },
          { value: "grid", label: "Grid", icon: <FaTh size={10} /> },
        ]}
        value={val}
        onChange={setVal}
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [val, setVal] = useState("sm");
    return (
      <ITSegmentedControl
        size="sm"
        options={[
          { value: "sm", label: "Chico" },
          { value: "md", label: "Mediano" },
        ]}
        value={val}
        onChange={setVal}
      />
    );
  },
};
