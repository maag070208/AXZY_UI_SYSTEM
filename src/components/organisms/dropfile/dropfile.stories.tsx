import type { Meta } from '@storybook/react';
import ITDropfile, { UploadStatus } from '@/components/organisms/dropfile/dropfile';

const meta = {
  title: 'Components/Actions/ITDropfile',
  component: ITDropfile,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onFileSelect: { action: 'file selected' },
    onCancel: { action: 'cancelled' },
    onSubmit: { action: 'submitted' },
    showStatusBadge: { control: 'boolean' },
    uploadStatus: {
      control: 'select',
      options: Object.values(UploadStatus),
    },
    view: {
      control: 'radio',
      options: ['drop', 'button'],
    },
  },
} satisfies Meta<typeof ITDropfile>;

export default meta;

// Wrapper for stateful file handling in story
const DropfileWrapper = (args: any) => {
    return <ITDropfile {...args} className="w-[500px]" />;
}

export const Default: any = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    containerClassName: 'w-[400px]',
  },
};

export const WithImage: any = {
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

export const Uploading: any = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.UPLOADING,
    containerClassName: 'w-[400px]',
  },
};

export const ButtonView: any = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    view: 'button',
    buttonLabel: 'Subir archivos',
    showStatusBadge: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact trigger button that opens the dropzone/preview inside a modal (`ITDialog`) — use this instead of wrapping `ITDropfile` in your own "open a modal" button.',
      },
    },
  },
};

export const ErrorState: any = {
  render: (args) => <DropfileWrapper {...args} />,
  args: {
    showStatusBadge: true,
    initialPreviewUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    uploadStatus: UploadStatus.ERROR,
    containerClassName: 'w-[400px]',
  },
};
