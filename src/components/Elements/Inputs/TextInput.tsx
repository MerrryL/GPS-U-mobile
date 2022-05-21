import { RHFField, RHFFormState, RHFieldState } from "@/types/utilityTypes";
import React from "react";
import { Input, Text } from "react-native-elements";

type TextInputProps = {
  field: RHFField;
  fieldState: RHFieldState;
  formState: RHFFormState;
};

export default function TextInput({ field, fieldState, formState }: TextInputProps):JSX.Element {
  let label: string = field.label ? field.label : field.name || "Label";
  label = label.charAt(0).toUpperCase() + label.slice(1);

  const inputConfig = {
    ...field,
    label: label + ":",
    placeholder: label,
    onChangeText: field.onChange,
    autoCompleteType: "text",
  };

  //TODO: change style, definitely
  //TODO: make custom error text
  return (
    <>
      <Input {...inputConfig} />
      <Text>{fieldState?.error?.message}</Text>
    </>
  );
}
