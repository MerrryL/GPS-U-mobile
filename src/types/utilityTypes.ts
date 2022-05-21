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
  // schema?: unknown;
}
export interface TextInputedField extends BaseInputField {
  type: InputType.Text;
  value?: string;
  multiline?: boolean;
  defaultValue?: string;
  schema: any;
}
export interface SelectInputedField extends BaseInputField {
  type: InputType.Select;
  value?: PickerItem;
  defaultValue?: PickerItem;
  options: PickerItem[];
  schema: any;
}

export interface MultiSelectInputedField extends BaseInputField {
  type: InputType.Multiselect;
  value?: PickerItem[];
  defaultValue?:  PickerItem[];
  options: PickerItem[];
  schema: any;
}

export type InputedField = MultiSelectInputedField | SelectInputedField | TextInputedField;

export type ConstatationValues = {
  description: string;
  observers: any;
  observations: any;
};

export type PickerItem = {
  id: string;
  item: string;
};

export type RHFField = any;
export type RHFieldState = any;
export type RHFFormState = any;
