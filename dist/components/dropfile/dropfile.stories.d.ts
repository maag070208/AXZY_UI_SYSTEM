import { UploadStatus } from './dropfile';
declare const meta: {
    title: string;
    component: import('react').FC<import('./dropfile').ITDropfileProps>;
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
export declare const Default: any;
export declare const WithImage: any;
export declare const Uploading: any;
export declare const ErrorState: any;
