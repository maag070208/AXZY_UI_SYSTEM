import type { Meta, StoryObj } from '@storybook/react';
import ITImage from './image';

const meta = {
  title: 'Components/Data Display/ITImage',
  component: ITImage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Image source URL' },
    alt: { control: 'text', description: 'Alternative text for accessibility' },
    fallback: { control: 'text', description: 'Fallback image URL shown when the primary src fails to load' },
    className: { control: 'text', description: 'Additional CSS classes for the wrapper' },
    onClick: { control: false, description: 'Click handler' },
  },
} satisfies Meta<typeof ITImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const containerStyle = { width: 256, height: 192 };

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/256/192',
    alt: 'Random image',
    className: 'rounded-lg overflow-hidden',
  },
  render: (args) => <div style={containerStyle}><ITImage {...args} /></div>,
};

export const WithFallbackError: Story = {
  args: {
    src: 'https://invalid-url/does-not-exist.jpg',
    alt: 'Broken image',
    fallback: 'https://picsum.photos/256/192?grayscale',
    className: 'rounded-lg overflow-hidden',
  },
  render: (args) => <div style={containerStyle}><ITImage {...args} /></div>,
};

export const SquareAspectRatio: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'Square image',
    className: 'rounded-full overflow-hidden',
  },
  render: (args) => <div style={{ width: 128, height: 128 }}><ITImage {...args} /></div>,
};
