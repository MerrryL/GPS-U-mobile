import CheckBoxInput from "@/components/Elements/Inputs/CheckBoxInput";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { InputedField } from "@/types/utilityTypes";
import React from "react";
import { useController } from "react-hook-form";

type InputFromFieldProps = {
  f: InputedField;
  key: React.Key;
  control: any;
};

export default function InputSelector(props: InputFromFieldProps) {
  const { f, control } = props;

  const { field, fieldState, formState } = useController({
    control: control,
    name: f.name,
    defaultValue: f.value || f.defaultValue,
  });

  // console.log("F", f, field);

  const inputProps = {
    field: field,
    fieldState: fieldState,
    formState: formState,
    ...f,
  };

  if (["text", "password", "email"].includes(f.type)) {
    return <TextInput {...inputProps} />;
  }

  if (f.type === "select") {
    return <PickerInput {...inputProps} />;
  }

  if (f.type === "multi-select") {
    return <MultiPickerInput {...inputProps} />;
  }

  if (f.type === "checkbox") {
    return <CheckBoxInput {...inputProps} />;
  }

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

  return null;
}
