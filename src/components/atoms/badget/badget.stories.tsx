import type { Meta, StoryObj } from '@storybook/react';
import ITBadget from './badget';

const meta = {
  title: 'Components/Data Display/ITBadge',
  component: ITBadget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'],
    },
    variant: {
        control: 'select',
        options: ['filled', 'outlined'],
    },
    size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof ITBadget>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Filled (Default)
export const Filled: Story = {
  args: {
    label: 'Filled Badge',
    color: 'primary',
    variant: 'filled',
  },
};

// 2. Outlined
export const Outlined: Story = {
  args: {
    label: 'Outlined Badge',
    color: 'primary',
    variant: 'outlined',
  },
};

// 3. All Combinations (Matrix)
export const AllCombinations: Story = {
  render: (args) => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'];
    const variants = ['filled', 'outlined'];

    return (
      <div className="flex flex-col gap-8">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase text-gray-400">{variant}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {colors.map((color) => (
                <ITBadget
                  key={`${variant}-${color}`}
                  {...args}
                  color={color as any}
                  variant={variant as any}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  args: {},
};
