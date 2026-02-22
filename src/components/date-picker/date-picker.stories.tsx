import type { Meta, StoryObj } from '@storybook/react';
import ITDatePicker from './datePicker';
import { useState } from 'react';

const meta = {
  title: 'Components/Form Elements/ITDatePicker',
  component: ITDatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'date' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof ITDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for controlled component state
const DatePickerWrapper = (args: any) => {
  const [date, setDate] = useState<Date>(args.value || new Date());
  
  const handleChange = (e: any) => {
      // Handle both event types the component might emit
      if (e.target && e.target.value) {
          setDate(e.target.value instanceof Date ? e.target.value : new Date(e.target.value));
      }
      args.onChange(e);
  };

  return <ITDatePicker {...args} value={date} onChange={handleChange} />;
};

export const Default: any = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    name: 'birthdate',
    label: 'Select Date',
    placeholder: 'DD/MM/YYYY',
  } as any,
};

export const WithError: any = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    name: 'error_date',
    label: 'Invalid Date',
    error: 'This field is required',
    touched: true,
  } as any,
};

export const Disabled: any = {
  args: {
    name: 'disabled_date',
    label: 'Disabled Input',
    value: new Date(),
    disabled: true,
  } as any,
};
