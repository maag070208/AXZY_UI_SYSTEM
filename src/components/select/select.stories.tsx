import type { Meta, StoryObj } from "@storybook/react";
import ITSelect from "./select";
import { useState } from "react";

const meta: Meta<typeof ITSelect> = {
  title: "Components/ITSelect",
  component: ITSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ITSelect>;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const SelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  const [touched, setTouched] = useState(false);

  return (
    <div className="w-[300px]">
      <ITSelect
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        touched={touched}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    name: "select",
    options: options,
    placeholder: "Select an option",
  },
};

export const WithLabel: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select Label",
    options: options,
    placeholder: "Select an option",
  },
};

export const WithError: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Select with Error",
    options: options,
    placeholder: "Select an option",
    error: "This field is required",
    touched: true, // Force touched to show error immediately
  },
};

export const Disabled: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    name: "select",
    label: "Disabled Select",
    options: options,
    placeholder: "Select an option",
    disabled: true,
  },
};
