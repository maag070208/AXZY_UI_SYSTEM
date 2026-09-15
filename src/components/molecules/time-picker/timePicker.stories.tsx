import type { Meta, StoryObj } from "@storybook/react";
import ITTimePicker from "./timePicker";
import { useState } from "react";

const meta: Meta<typeof ITTimePicker> = {
  title: "Components/Form Elements/ITTimePicker",
  component: ITTimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "purple"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ITTimePicker>;

// Helper to wrap uncontrolled behavior
const TimePickerWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  const [touched, setTouched] = useState(false);

  return (
    <ITTimePicker
      {...args}
      value={value}
      touched={touched}
      onChange={(e) => {
        setValue(e.target.value);
        if (args.onChange) args.onChange(e);
      }}
      onBlur={(e) => {
        setTouched(true);
        if (args.onBlur) args.onBlur(e);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <TimePickerWrapper {...args} />,
  args: {
    name: "default_time",
    label: "Select Time",
    placeholder: "HH:MM",
    color: "primary",
  },
};

export const WithPredefinedValue: Story = {
  render: (args) => <TimePickerWrapper {...args} />,
  args: {
    name: "predefined_time",
    label: "Meeting Time",
    value: "14:30",
    color: "success",
  },
};

export const Disabled: Story = {
  render: (args) => <TimePickerWrapper {...args} />,
  args: {
    name: "disabled_time",
    label: "Unavailable Time",
    value: "09:00",
    disabled: true,
  },
};

export const Validation: Story = {
  render: (args) => <TimePickerWrapper {...args} />,
  args: {
    name: "validation_time",
    label: "End Time",
    value: "25:99", // Invalid time string to trigger intrinsic validation
    touched: true, // Force validation display
    error: "Custom error message if passed explicitly",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} size="small" label="Small TimePicker" name="sm" />
      <TimePickerWrapper {...args} size="medium" label="Medium TimePicker" name="md" />
      <TimePickerWrapper {...args} size="large" label="Large TimePicker" name="lg" />
    </div>
  ),
  args: {
    value: "10:15",
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <TimePickerWrapper {...args} color="primary" label="Primary Theme Highlight" name="c1" value="12:00" />
      <TimePickerWrapper {...args} color="danger" label="Danger Theme Highlight" name="c2" value="13:15" />
      <TimePickerWrapper {...args} color="purple" label="Purple Theme Highlight" name="c3" value="14:45" />
    </div>
  ),
};
