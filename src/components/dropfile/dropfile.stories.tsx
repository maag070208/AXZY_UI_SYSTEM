import type { Meta, StoryObj } from '@storybook/react';
import ITDropfile, { FileTypeEnum, UploadStatus } from './dropfile';
import { useState } from 'react';

const meta = {
  title: 'Components/Actions/ITDropfile',
  component: ITDropfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: { action: 'file selected' },
    onCancel: { action: 'cancelled' },
    onSubmit: { action: 'submitted' },
    showStatusBadge: { control: 'boolean' },
    uploadStatus: {
      control: 'select',
      options: Object.values(UploadStatus),
    },
  },
} satisfies Meta<typeof ITDropfile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for stateful file handling in story
const DropfileWrapper = (args: any) => {
    return <ITDropfile {...args} className="w-[500px]" />;
}

export const Default: Story = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    containerClassName: 'w-[400px]',
  },
};

export const WithImage: Story = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.UPLOADED,
    containerClassName: 'w-[400px]',
  },
    parameters: {
        docs: {
            description: {
                story: 'Simulates a pre-loaded image (e.g., editing an existing entry).'
            }
        }
    }
};

export const Uploading: Story = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.UPLOADING,
    containerClassName: 'w-[400px]',
  },
};

export const ErrorState: Story = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.ERROR,
    containerClassName: 'w-[400px]',
  },
};
