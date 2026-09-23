import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITChipInput from "@/components/molecules/chip-input/chip-input";

const meta: Meta<typeof ITChipInput> = {
  title: "Components/Form Elements/ITChipInput",
  component: ITChipInput,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ITChipInput>;

const Wrapper = (args: any) => {
  const [value, setValue] = useState<string[]>(args.value ?? []);
  return (
    <div className="w-[420px]">
      <ITChipInput {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "tags", label: "Etiquetas", value: [] },
};

export const WithValues: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "tags", label: "Etiquetas", value: ["react", "typescript", "tailwind"] },
};

export const MaxTags: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "tags", label: "Máximo 3", value: ["uno", "dos"], maxTags: 3, helpText: "Máximo 3 etiquetas." },
};

export const WithValidation: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    name: "emails",
    label: "Correos",
    value: [],
    placeholder: "correo@dominio.com",
    validate: (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : "Correo inválido"),
  },
};

export const WithError: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "tags", label: "Etiquetas", value: [], required: true, touched: true, error: true },
};
