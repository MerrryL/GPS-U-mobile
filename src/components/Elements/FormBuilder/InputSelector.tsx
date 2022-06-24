// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import CheckBoxInput from "@/components/Elements/Inputs/CheckboxInput";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Card, Text, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { Control, useController } from "react-hook-form";
import NormalText from "../Text/NormalText";

interface InputFromFieldProps<TFieldValues> {
  f: InputedField;
  key: React.Key;
  control: Control<TFieldValues>;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  errorText: StyleProp<TextStyle>;
  border: StyleProp<TextStyle>;
}

export default function InputSelector<TFieldValues>({ f, control }: InputFromFieldProps<TFieldValues>): JSX.Element {
  const styles: StyleProps = useStyles();

  const { field, fieldState, formState } = useController({
    control: control,
    name: f.name,
    defaultValue: f.value ?? f.defaultValue,
  });

  const inputProps = {
    field: field,
    fieldState: fieldState,
    formState: formState,
    ...f,
  };

  return (
    <Card containerStyle={styles.container}>
      <NormalText boldText={f.label ?? field.name} />

      {[InputType.Text, InputType.Password, InputType.Email].includes(f.type) && <TextInput {...inputProps} {...f} />}
      {f.type === InputType.Select && <PickerInput {...inputProps} />}
      {f.type === InputType.Multiselect && <MultiPickerInput {...inputProps} />}
      {f.type === InputType.CheckBox && <CheckBoxInput {...inputProps} />}

      {fieldState.error?.message && <Text style={styles.errorText}>{fieldState.error.message}</Text>}
    </Card>
  );
}
const useStyles: (props?: unknown) => StyleProps = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors.white,
    marginBottom: "6px",
    padding: 3,
    margin: 3,
  },
  errorText: {
    color: theme?.colors.error,
    paddingLeft: 8
  },
}));
