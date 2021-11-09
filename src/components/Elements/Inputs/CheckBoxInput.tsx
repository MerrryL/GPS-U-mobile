import React, { useState } from "react";
import { Text, CheckBox } from "react-native-elements";
import { useController } from "react-hook-form";

export default function CheckBoxInput(props) {
  const { name, label = name, defaultValue = false, control } = props;

  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue,
  });

  const [isSelected, setSelection] = useState(false);

  console.log(field.ref, "ref");

  const inputConfig = {
    ...field,
    defaultValue: defaultValue,
    checked: isSelected,
    title: label,
    placeholder: label,
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
