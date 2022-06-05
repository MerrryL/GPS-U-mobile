import { PickerItem } from "@/types/utilityTypes";
import React, { useEffect, useState } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { CheckBox, FullTheme, makeStyles } from "react-native-elements";

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
const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  checkbox: {},
}));
