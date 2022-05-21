import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { InputedField, InputType, MultiSelectInputedField, SelectInputedField, TextInputedField } from "@/types/utilityTypes";
import React from "react";
import { Control, FieldValues, useController, UseControllerReturn } from "react-hook-form";
import { View } from "react-native";

type InputFromFieldProps = {
  f: InputedField;
  key: React.Key;
  control: Control<FieldValues, object>;
};

export default function InputSelector({ f, control }: InputFromFieldProps):JSX.Element {
  const { field, fieldState, formState }:UseControllerReturn<FieldValues, string> = useController<FieldValues, string>({
    control: control,
    name: f.name,
    defaultValue: f.value || f.defaultValue,
  });

  const inputProps = {
    field: field,
    fieldState: fieldState,
    formState: formState,
  };

  if ([InputType.Text, InputType.Password, InputType.Email].includes(f.type)) {
    return <TextInput {...inputProps} {...f as TextInputedField}/>;
  }

  if (f.type === InputType.Select) {
    return <PickerInput {...inputProps} {...f as SelectInputedField}/>;
  }

  if (f.type === InputType.Multiselect) {
    return <MultiPickerInput {...inputProps} {...f as MultiSelectInputedField}/>;
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

  return <View>ERROR</View>
}
