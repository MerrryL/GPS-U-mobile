import * as yup from "yup";
import type { Asserts } from 'yup';
import schema from "yup/lib/schema";


export type InputedField = {
    type: string;
    name: string;
    label?: string;
    value? : any;
    defaultValue?: any;
    isRequired?: boolean;
    multiline?: boolean;
    options?: SelectOption[];
    selectedValues?: number[];
    schema: unknown;
    // schema: Lazy<any, unknown> | AnyObjectSchema;
};

export type SelectOption = any;

export type RHFField = any;
export type RHFieldState = any;
export type RHFFormState = any
