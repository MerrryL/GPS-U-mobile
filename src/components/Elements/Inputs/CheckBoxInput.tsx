import React, { useState } from "react";
import { Text, CheckBox } from "react-native-elements";
import { InputedField, RHFField, RHFFormState, RHFieldState } from "@/types/utilityTypes";

type CheckBoxInputType = {
  field: RHFField,
  fieldState: RHFieldState,
  formState: RHFFormState
}

export default function CheckBoxInput(props:CheckBoxInputType) {
  const { field, fieldState } = props;

  const [isSelected, setSelection] = useState(field.value || field.defaultValue || false);

  const { ref, ...field2 } = field;

  const inputConfig = {
    ...field2,
    checked: isSelected,
    title: field.label,
    placeholder: field.label,
    onPress: () => {
      setSelection(!isSelected);
      field.onChange(!isSelected);
    },
  };

  return (
    <>
      <CheckBox {...inputConfig} />
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
      <Text>{fieldState?.error?.message}</Text>
    </>
  );
}
