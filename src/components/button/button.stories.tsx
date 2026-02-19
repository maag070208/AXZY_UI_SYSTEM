import type { Meta, StoryObj } from '@storybook/react';
import ITButton from './button';

const meta = {
  title: 'Components/ITButton',
  component: ITButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'],
      description: 'The semantic color of the button',
    },
    variant: {
        control: 'select',
        options: ['filled', 'outlined', 'raised', 'rounded', 'text', 'raised-text', 'icon-only', 'link'],
        description: 'The visual style variant',
    },
    size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
        description: 'Button size (padding/font)',
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ITButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Filled (Default)
export const Filled: Story = {
  args: {
    label: 'Filled Button',
    color: 'primary',
    variant: 'filled',
  },
};

// 2. Outlined
export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    color: 'primary',
    variant: 'outlined',
  },
};

// 3. Raised (Shadow)
export const Raised: Story = {
  args: {
    label: 'Raised Button',
    color: 'primary',
    variant: 'raised',
  },
};

// 4. Rounded (Pill)
export const Rounded: Story = {
  args: {
    label: 'Rounded Button',
    color: 'success',
    variant: 'rounded',
  },
};

// 5. Text (Ghost)
export const Text: Story = {
  args: {
    label: 'Text Button',
    color: 'info',
    variant: 'text',
  },
};

// 6. Raised Text (Elevated White)
export const RaisedText: Story = {
  args: {
    label: 'Raised Text',
    color: 'warning',
    variant: 'raised-text',
  },
};

// 7. Icon Only
export const IconOnly: Story = {
  args: {
    color: 'danger',
    variant: 'icon-only',
    children: <span style={{ fontSize: '1.2em' }}>★</span>, // Simple inline icon representation
    ariaLabel: 'Favorite',
  },
};

// 8. Link
export const Link: Story = {
  args: {
    label: 'Link Button',
    color: 'primary',
    variant: 'link',
  },
};

// 9. All Colors Showcase (Kitchen Sink for colors)
export const AllColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'].map((color) => (
        <ITButton key={color} {...args} color={color as any} label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
  args: {
    variant: 'filled',
  },
};

// 9. Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    color: 'primary',
    variant: 'filled',
  },
};

// 10. All Combinations (Matrix)
export const AllCombinations: Story = {
  render: (args) => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'purple', 'info'];
    const variants = ['filled', 'outlined', 'raised', 'rounded', 'text', 'raised-text', 'icon-only', 'link'];

    return (
      <div className="flex flex-col gap-8">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase text-gray-400">{variant}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {colors.map((color) => (
                <ITButton
                  key={`${variant}-${color}`}
                  {...args}
                  color={color as any}
                  variant={variant as any}
                  label={variant === 'icon-only' ? undefined : (color.charAt(0).toUpperCase() + color.slice(1))}
                  ariaLabel={variant === 'icon-only' ? color : undefined}
                >
                  {variant === 'icon-only' ? <span style={{ fontSize: '1.2em' }}>★</span> : undefined}
                </ITButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  args: {},
};

