import type { Meta, StoryObj } from '@storybook/react';
import ITTripleFilter from './tripleFilter';

const meta: Meta<typeof ITTripleFilter> = {
  title: 'Components/ITTripleFilter',
  component: ITTripleFilter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ITTripleFilter>;

export const Default: Story = {
  args: {
    value: 'all',
    options: [
      { label: 'Todos', value: 'all' },
      { label: 'Activos', value: 'active' },
      { label: 'Inactivos', value: 'inactive' },
    ],
  },
};

export const Boolean: Story = {
  args: {
    value: true,
    options: [
      { label: 'Sí', value: true },
      { label: 'No', value: false },
    ],
  },
};
