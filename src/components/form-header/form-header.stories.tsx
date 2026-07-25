import type { Meta, StoryObj } from '@storybook/react';
import ITFormHeader from './form-header';

const meta = {
  title: 'Components/Feedback/ITFormHeader',
  component: ITFormHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'The title displayed in the header' },
    onClose: { control: false, description: 'Optional close button handler' },
    className: { control: 'text', description: 'Additional CSS classes' },
  },
} satisfies Meta<typeof ITFormHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Form Header' },
  render: (args) => (
    <div className="w-80">
      <ITFormHeader {...args} />
    </div>
  ),
};

export const WithClose: Story = {
  args: { title: 'Editable Form' },
  render: (args) => (
    <div className="w-80">
      <ITFormHeader {...args} onClose={() => alert('Close clicked')} />
    </div>
  ),
};

export const LongTitle: Story = {
  args: { title: 'Confirmación de Auditoría de Expediente Clínico' },
  render: (args) => (
    <div className="w-80">
      <ITFormHeader {...args} />
    </div>
  ),
};

export const ShortTitle: Story = {
  args: { title: 'Edit' },
  render: (args) => (
    <div className="w-80">
      <ITFormHeader {...args} />
    </div>
  ),
};
