import type { Meta, StoryObj } from '@storybook/react';
import ITCard from './card';
import ITButton from '../button/button';

const meta = {
  title: 'Components/ITCard',
  component: ITCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ITCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'This is the body of the card. It has padding defined by the theme.',
    onClick: undefined,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    children: 'A nice gradient image above.',
    onClick: undefined,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    children: 'This card has a button action at the bottom.',
    actions: (
      <div className="flex justify-end gap-2">
         <ITButton variant="text" color="secondary" label="Cancel" />
         <ITButton variant="filled" color="primary" label="Save" />
      </div>
    ),
    onClick: undefined,
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    children: 'Hover over me! I should have a stronger shadow and a pointer cursor.',
    onClick: () => alert('Card clicked!'),
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
};
