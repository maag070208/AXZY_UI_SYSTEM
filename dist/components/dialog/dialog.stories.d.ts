import { StoryObj } from '@storybook/react';
import { default as ITDialog } from './dialog';
declare const meta: {
    title: string;
    component: typeof ITDialog;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        isOpen: {
            control: "boolean";
        };
        onClose: {
            action: string;
        };
        title: {
            control: "text";
        };
        useFormHeader: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithFormHeader: Story;
export declare const LongContent: Story;
