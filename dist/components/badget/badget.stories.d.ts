import { StoryObj } from '@storybook/react';
import { default as ITBadget } from './badget';
declare const meta: {
    title: string;
    component: typeof ITBadget;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        color: {
            control: "select";
            options: string[];
        };
        variant: {
            control: "select";
            options: string[];
        };
        size: {
            control: "select";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Filled: Story;
export declare const Outlined: Story;
export declare const AllCombinations: Story;
