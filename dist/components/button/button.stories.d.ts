import { StoryObj } from '@storybook/react';
import { default as ITButton } from './button';
declare const meta: {
    title: string;
    component: typeof ITButton;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        color: {
            control: "select";
            options: string[];
            description: string;
        };
        variant: {
            control: "select";
            options: string[];
            description: string;
        };
        size: {
            control: "select";
            options: string[];
            description: string;
        };
        label: {
            control: "text";
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Filled: Story;
export declare const Outlined: Story;
export declare const Raised: Story;
export declare const Rounded: Story;
export declare const Text: Story;
export declare const RaisedText: Story;
export declare const IconOnly: Story;
export declare const Link: Story;
export declare const AllColors: Story;
export declare const Disabled: Story;
export declare const AllCombinations: Story;
