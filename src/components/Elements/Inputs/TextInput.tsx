import React from "react";
import { Text, Input } from "react-native-elements";
import NormalText from "../Text/NormalText";
import { InputedField, RHFField, RHFFormState, RHFieldState } from "@/types/utilityTypes";

type TextInputProps = {
  field: RHFField,
  fieldState: RHFieldState,
  formState: RHFFormState
}

export default function TextInput(props : TextInputProps) {
  const { field, fieldState, formState} = props;

  // console.log("field" + field.name, props);


  let label:string = field.label ? field.label : field.name || "Label";
  label = label.charAt(0).toUpperCase() + label.slice(1) ;

  const inputConfig = {
    ...field,
    label: label+ ":",
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
