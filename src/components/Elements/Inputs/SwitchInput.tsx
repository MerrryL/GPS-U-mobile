import React, { useState } from "react";
import { Text, CheckBox } from "react-native-elements";
import { useController } from "react-hook-form";

export default function CheckBoxInput({ name, label, defaultValue, control }) {
  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue,
  });

  const [isSelected, setSelection] = useState(false);

  return (
    <>
      <CheckBox
        {...field}
        checked={isSelected}
        onPress={() => {
          setSelection(!isSelected);
          field.onChange(!isSelected);
        }}
        title={label}
      />
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
      <Text>{fieldState?.error?.message}</Text>
    </>
  );
}
