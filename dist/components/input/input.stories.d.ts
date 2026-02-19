import { StoryObj } from '@storybook/react';
import { default as ITInput } from './input';
declare const meta: {
    title: string;
    component: typeof ITInput;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        type: {
            control: "select";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
        error: {
            control: "text";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithLabel: Story;
export declare const WithIcons: Story;
export declare const ClickableIcons: Story;
export declare const Password: Story;
export declare const WithError: Story;
export declare const Disabled: Story;
export declare const TextArea: Story;
export declare const NumberInput: Story;
