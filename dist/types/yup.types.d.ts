import { FieldConfig } from './field.types';
import * as Yup from "yup";
export declare const createValidationSchema: (fields: FieldConfig[]) => Yup.ObjectSchema<{
    [x: string]: never;
}, Yup.AnyObject, {
    [x: string]: any;
}, "">;
