import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ITMultiSelect from "@/components/molecules/multi-select/multi-select";
import { ITMultiSelectOption } from "./multi-select.props";

const meta: Meta<typeof ITMultiSelect> = {
  title: "Components/Form Elements/ITMultiSelect",
  component: ITMultiSelect,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ITMultiSelect>;

const options: ITMultiSelectOption[] = [
  { value: "mx", label: "México" },
  { value: "es", label: "España" },
  { value: "co", label: "Colombia" },
  { value: "ar", label: "Argentina" },
  { value: "pe", label: "Perú" },
  { value: "cl", label: "Chile" },
];

const Wrapper = (args: any) => {
  const [value, setValue] = useState<(string | number)[]>(args.value ?? []);
  return (
    <div className="w-[400px]">
      <ITMultiSelect {...args} value={value} onChange={(v) => setValue(v)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "countries", label: "Países", options, value: [] },
};

export const WithPreselected: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "countries", label: "Países", options, value: ["mx", "es", "co", "ar"] },
};

export const WithError: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    name: "countries",
    label: "Países",
    options,
    value: [],
    required: true,
    touched: true,
    error: true,
  },
};

export const Disabled: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { name: "countries", label: "Países", options, value: ["mx"], disabled: true },
};
