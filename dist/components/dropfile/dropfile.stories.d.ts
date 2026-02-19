import { StoryObj } from '@storybook/react';
import { UploadStatus } from './dropfile';
declare const meta: {
    title: string;
    component: import('../../../node_modules/react').FC<import('./dropfile').ITDropfileProps>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        onFileSelect: {
            action: string;
        };
        onCancel: {
            action: string;
        };
        onSubmit: {
            action: string;
        };
        showStatusBadge: {
            control: "boolean";
        };
        uploadStatus: {
            control: "select";
            options: UploadStatus[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithImage: Story;
export declare const Uploading: Story;
export declare const ErrorState: Story;
