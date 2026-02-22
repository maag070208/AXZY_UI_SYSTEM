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
export declare const Default: any;
export declare const WithFormHeader: any;
export declare const LongContent: any;
