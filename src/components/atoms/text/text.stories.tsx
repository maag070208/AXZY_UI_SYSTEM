import type { Meta, StoryObj } from '@storybook/react';
import ITText from './text';

const meta = {
  title: 'Components/Layout & Navigation/ITText',
  component: ITText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small', 'strong', 'em', 'label'],
      description: 'HTML element to render',
    },
    children: { control: 'text', description: 'Text content' },
    muted: { control: 'boolean', description: 'Apply muted text color' },
    className: { control: 'text', description: 'Additional CSS classes' },
  },
} satisfies Meta<typeof ITText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
  args: {
    as: 'p',
    children: 'This is a paragraph of text rendered via ITText.',
    className: 'text-base',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-3">
      <ITText as="h1" className="text-4xl font-bold">Heading 1</ITText>
      <ITText as="h2" className="text-3xl font-bold">Heading 2</ITText>
      <ITText as="h3" className="text-2xl font-semibold">Heading 3</ITText>
      <ITText as="h4" className="text-xl font-semibold">Heading 4</ITText>
      <ITText as="h5" className="text-lg font-medium">Heading 5</ITText>
      <ITText as="h6" className="text-base font-medium">Heading 6</ITText>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    as: 'p',
    children: 'This text appears muted / secondary.',
    muted: true,
    className: 'text-sm',
  },
};

export const InlineElements: Story = {
  render: () => (
    <div className="space-y-2">
      <ITText as="p">
        This is <ITText as="strong" className="font-bold">bold</ITText>,{' '}
        <ITText as="em" className="italic">italic</ITText>, and{' '}
        <ITText as="small" className="text-xs">small</ITText> text.
      </ITText>
      <ITText as="p">
        A <ITText as="span" className="text-primary-600 font-mono">span</ITText> can be used for inline styling.
      </ITText>
    </div>
  ),
};
