import { FieldValues } from "react-hook-form";
import * as yup from "yup";

export enum InputType {
  Text = "text",
  Number="number",
  Password = "password",
  Email = "email",
  Select = "select",
  Multiselect = "multiselect",
  CheckBox = "checkbox",
}

interface BaseInputField {
  name: string;
  is_required?: boolean;
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
export interface NumberInputedField extends BaseInputField {
  type: InputType.Text;
  value?: number;
  defaultValue?: number;
  schema:  yup.SchemaOf<number>;
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

export interface CheckBoxInputedField extends BaseInputField {
  type: InputType.CheckBox;
  value?: boolean;
  defaultValue?: boolean;
  schema:   yup.BooleanSchema
}

export type InputedField = MultiSelectInputedField | SelectInputedField | TextInputedField |  NumberInputedField | CheckBoxInputedField;

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
