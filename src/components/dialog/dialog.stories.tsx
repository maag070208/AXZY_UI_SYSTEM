import type { Meta, StoryObj } from '@storybook/react';
import ITDialog from './dialog';
import { useState } from 'react';
import ITButton from '../button/button';

const meta = {
  title: 'Components/ITDialog',
  component: ITDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    title: { control: 'text' },
    useFormHeader: { control: 'boolean' },
  },
} satisfies Meta<typeof ITDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to handle open/close state
const DialogWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
       <ITButton onClick={() => setIsOpen(true)}>Open Dialog</ITButton>
       <ITDialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
         {args.children}
       </ITDialog>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Basic Dialog',
    children: <p className="text-gray-600">This is a simple dialog usage standard headers.</p>,
    useFormHeader: false,
    className: 'w-96',
  },
};

export const WithFormHeader: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Form Header Dialog',
    children: (
        <div className="space-y-4">
            <p className="text-gray-600">This dialog uses the standard form header styling.</p>
            <div className="flex justify-end">
                <ITButton variant="primary">Confirm</ITButton>
            </div>
        </div>
    ),
    useFormHeader: true,
    className: 'w-[500px]',
  },
};

export const LongContent: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Terms of Service',
    children: (
        <div className="h-64 overflow-y-auto text-sm text-gray-600">
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p className="mb-4">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        </div>
    ),
    useFormHeader: true,
    className: 'w-[600px]',
  },
};
