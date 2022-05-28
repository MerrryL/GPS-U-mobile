// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { InputedField, InputType } from "@/types/utilityTypes";
import React from "react";
import { Control, useController } from "react-hook-form";
import { View } from "react-native";

type InputFromFieldProps<TFieldValues> = {
  f: InputedField;
  key: React.Key;
  control: Control<TFieldValues>;
};

export default function InputSelector<TFieldValues>({ f, control }: InputFromFieldProps<TFieldValues>): JSX.Element {
  const { field, fieldState, formState } = useController({
    control: control,
    name: f.name,
    defaultValue: f.value ?? f.defaultValue,
  });

  const inputProps = {
    field: field,
    fieldState: fieldState,
    formState: formState,
  };

  if ([InputType.Text, InputType.Password, InputType.Email].includes(f.type)) {
    return <TextInput {...inputProps} {...f} />;
  }

  if (f.type === InputType.Select) {
    return <PickerInput {...inputProps} {...f} />;
  }

  if (f.type === InputType.Multiselect) {
    return <MultiPickerInput {...inputProps} {...f} />;
  }

  // if (f.type === InputType.CheckBox) {
  //   return <CheckBoxInput {...inputProps} />;
  // }

  // if (f.type === 'radio') {
  //     return (
  //     )
  // }

  //Todo: image picker?
  // if (f.type === 'image') {
  //     return (
  //     )
  // }

  // if(f.type.value = 'date'){
  //     return (
  //         <DatePicker

  //         />
  //     )
  // }

  return <View>ERROR</View>;
}
