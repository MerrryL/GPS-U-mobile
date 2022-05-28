import { FieldValues } from "react-hook-form";
import * as yup from "yup";
import { RequiredNumberSchema } from "yup/lib/number";
import { RequiredObjectSchema } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

export enum InputType {
  Text = "text",
  Password = "password",
  Email = "email",
  Select = "select",
  Multiselect = "multiselect",
  CheckBox = "checkbox",
}

interface BaseInputField {
  name: string;
  isRequired?: boolean;
  label?: string;
  schema?:  yup.AnySchema;
}
export interface TextInputedField extends BaseInputField {
  type: InputType.Text;
  value?: string;
  multiline?: boolean;
  defaultValue?: string;
  schema:  yup.SchemaOf<string>;
}
export interface SelectInputedField extends BaseInputField {
  type: InputType.Select;
  value?: PickerItem;
  defaultValue?: PickerItem;
  options: PickerItem[];
  schema:  yup.SchemaOf<PickerItem>;
}

export interface MultiSelectInputedField extends BaseInputField {
  type: InputType.Multiselect;
  value?: PickerItem[];
  defaultValue?:  PickerItem[];
  options: PickerItem[];
  schema:   yup.SchemaOf<PickerItem[]>
}

export type InputedField = MultiSelectInputedField | SelectInputedField | TextInputedField;

export interface ConstatationValues extends FieldValues {
  description: string;
  observers: PickerItem[];
  observations: PickerItem[];
};

export function yupPickerItem(){
  return yup.object({
        id: yup.number().required(),
        item: yup.string().required(),
      }).required();
}

export type PickerItem = {
  id: number;
  item: string;
};

export type RHFField = any;
export type RHFieldState = any;
export type RHFFormState = any;
