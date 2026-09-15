import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITTextarea from "@/components/atoms/textarea/textarea";

const meta: Meta<typeof ITTextarea> = {
  title: "Components/Inputs/ITTextarea",
  component: ITTextarea,
};

export default meta;
type Story = StoryObj<typeof ITTextarea>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <ITTextarea value={val} onChange={setVal} label="Descripción" placeholder="Escribe aquí..." />;
  },
};

export const WithError: Story = {
  args: { label: "Comentarios", value: "Mal", error: "Debe tener al menos 10 caracteres" },
};

export const Disabled: Story = {
  args: { label: "Bloqueado", value: "No editable", disabled: true },
};
