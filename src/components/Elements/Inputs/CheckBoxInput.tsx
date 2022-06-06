import { PickerItem } from "@/types/utilityTypes";
import { CheckBox, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

interface CheckBoxInputProps {
  field: ControllerRenderProps<FieldValues>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  label?: string;
  options: PickerItem[];
  defaultValue?: PickerItem;
}

interface StyleProps {
  checkbox: StyleProp<ViewStyle>;
}
export default function CheckBoxInput(props: CheckBoxInputProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const [isChecked, toggle] = useState<boolean>(props.field.value || props.defaultValue || false);

  useEffect((): void => {
    props.field.onChange(isChecked);
  }, [isChecked]);

  return <CheckBox checked={isChecked} style={styles.checkbox} onPress={() => toggle((prevState: boolean): boolean => !prevState)} />;
}
const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  checkbox: {},
}));
