import React from "react";
import { Text, Input } from "react-native-elements";
import { useController } from "react-hook-form";
import NormalText from "../Text/NormalText";



export default function TextInput({
  name,
  label = name,
  control,
  defaultValue = "",
  numberOfLines = null,
} : TextInputProps) {

  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue,
  });

  // console.log("field", field);

  const { ref, ...field2 } = field;

  const inputConfig = {
    ...field2,
    value: field.value ?? defaultValue,
    label: label + ":",
    placeholder: label,
    onChangeText: field.onChange,
    autoCompleteType: "text",
    multiline: numberOfLines ? true : false,
    numberOfLines: numberOfLines ? numberOfLines : null,
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

type TextInputProps = any;