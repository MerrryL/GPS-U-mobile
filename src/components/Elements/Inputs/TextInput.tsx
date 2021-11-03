import React from "react";
import { Text, Input } from "react-native-elements";
import { useController } from "react-hook-form";

export default function TextInput({ name, label, defaultValue, control }) {
  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue: defaultValue,
  });

  //TODO: change style, definitely
  return (
    <>
      <Input
        {...field}
        autoCompleteType="text"
        label={label}
        onChangeText={field.onChange}
        placeholder={label}
      />
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
      <Text>{fieldState?.error?.message}</Text>
    </>
  );
}
