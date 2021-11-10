import React from "react";
import { Text, Input } from "react-native-elements";
import { useController } from "react-hook-form";

export default function TextInput(props) {
  const {
    name,
    label = name,
    control,
    defaultValue = "",
    numberOfLines = null,
  } = props;

  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue,
  });

  const { ref, ...field2 } = field;

  const inputConfig = {
    ...field2,
    value: field.value ?? defaultValue,
    label: label,
    placeholder: label,
    onChangeText: field.onChange,
    autoCompleteType: "text",
    multiline: numberOfLines ? true : false,
    numberOfLines: numberOfLines ? numberOfLines : null,
  };

  //TODO: change style, definitely
  return (
    <>
      <Input {...inputConfig} />
      <Text>{fieldState?.error?.message}</Text>
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
    </>
  );
}
