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
export declare const Default: any;
export declare const WithLabel: any;
export declare const WithIcons: any;
export declare const ClickableIcons: any;
export declare const Password: any;
export declare const WithError: any;
export declare const Disabled: any;
export declare const TextArea: any;
export declare const NumberInput: any;
