import { StoryObj } from '@storybook/react';
import { default as ITDatePicker } from './datePicker';
declare const meta: {
    title: string;
    component: typeof ITDatePicker;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        value: {
            control: "date";
        };
        minDate: {
            control: "date";
        };
        maxDate: {
            control: "date";
        };
        onChange: {
            action: string;
        };
        onBlur: {
            action: string;
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
export declare const WithError: Story;
export declare const Disabled: Story;
