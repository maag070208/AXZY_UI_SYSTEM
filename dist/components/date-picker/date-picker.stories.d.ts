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
export declare const Default: any;
export declare const WithError: any;
export declare const Disabled: any;
