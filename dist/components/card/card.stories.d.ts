import { StoryObj } from '@storybook/react';
import { default as ITCard } from './card';
declare const meta: {
    title: string;
    component: typeof ITCard;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        onClick: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithImage: Story;
export declare const WithActions: Story;
export declare const Clickable: Story;
