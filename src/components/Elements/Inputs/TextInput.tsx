import React from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";
import { Input } from "react-native-elements";

interface TextInputProps {
  field: ControllerRenderProps<FieldValues>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  label?: string;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  let label: string = props.label ?? props.field.name ?? "Label";
  label = label.charAt(0).toUpperCase() + label.slice(1);

  const inputConfig = {
    ...props.field,
    placeholder: label,
    inputStyle: { fontSize: 12 },
    onChangeText: props.field.onChange,
    autoCompleteType: "text",
  };

  //TODO: change style, definitely
  //TODO: make custom error text
  return <Input {...inputConfig} />;
}
