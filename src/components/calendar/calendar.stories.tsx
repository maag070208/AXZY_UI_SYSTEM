import type { Meta, StoryObj } from '@storybook/react';
import ITCalendar from './calendar';
import { addHours, format, startOfDay, addDays } from 'date-fns';

const meta = {
  title: 'Components/ITCalendar',
  component: ITCalendar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
        control: 'select',
        options: ['month', 'week', 'day'],
        description: 'View mode of the calendar'
    },
    value: { control: 'date' },
    onEventClick: { action: 'event clicked' },
    onSlotClick: { action: 'slot clicked' },
    onSelectRange: { action: 'range selected' },
  },
} satisfies Meta<typeof ITCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const today = new Date();
const tomorrow = addDays(today, 1);

const sampleEvents = [
    {
        id: '1',
        title: 'Team Meeting',
        start: addHours(startOfDay(today), 9), // Today 9:00 AM
        end: addHours(startOfDay(today), 10.5), // Today 10:30 AM
        color: '#3b82f6', // Primary
    },
    {
        id: '2',
        title: 'Lunch Break',
        start: addHours(startOfDay(today), 13),
        end: addHours(startOfDay(today), 14),
        color: '#f97316', // Warning
    },
    {
        id: '3',
        title: 'Project Review',
        start: addHours(startOfDay(tomorrow), 11),
        end: addHours(startOfDay(tomorrow), 12.5),
        color: '#8b5cf6', // Purple
    }
];

export const WeekView: Story = {
  args: {
    mode: 'week',
    events: sampleEvents,
    className: 'h-[600px]',
  },
};

export const DayView: Story = {
  args: {
    mode: 'day',
    events: sampleEvents,
    className: 'h-[600px]',
  },
};

export const MonthView: Story = {
  args: {
    mode: 'month',
    value: today,
    onChange: (date) => console.log('Date selected:', date),
    className: 'h-[400px] max-w-md',
  },
};

export const WithInteractiveSelection: Story = {
  render: (args) => {
      // Mock interactivity could be complex in storybook args, 
      // but the component handles internal drag state for valid callbacks.
      return <ITCalendar {...args} onSelectRange={(start, end) => alert(`Selected: ${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`)} />;
  },
  args: {
      mode: 'week',
      className: 'h-[600px]',
      events: [],
  }
};
