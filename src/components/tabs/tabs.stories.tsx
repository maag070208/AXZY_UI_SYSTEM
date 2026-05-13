import type { Meta, StoryObj } from '@storybook/react';
import ITTabs from './tabs';

const meta: Meta<typeof ITTabs> = {
  title: 'Components/ITTabs',
  component: ITTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ITTabs>;

export const Line: Story = {
  args: {
    variant: 'line',
    items: [
      { id: '1', label: 'Tab 1', content: <div className="p-4">Content 1</div> },
      { id: '2', label: 'Tab 2', content: <div className="p-4">Content 2</div> },
      { id: '3', label: 'Disabled', content: <div>X</div>, disabled: true },
    ],
  },
};

export const Pill: Story = {
  args: {
    variant: 'pill',
    items: [
      { id: '1', label: 'Overview', content: <div className="p-4">Dashboard Overview</div> },
      { id: '2', label: 'Settings', content: <div className="p-4">Account Settings</div> },
    ],
  },
};
