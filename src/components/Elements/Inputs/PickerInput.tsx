import { PickerItem } from "@/types/utilityTypes";
import { Picker } from "@react-native-picker/picker";
import { Colors, Theme } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";
import { StyleProp, TextStyle } from "react-native";

interface PickerInputProps {
  field: ControllerRenderProps<FieldValues>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  options: PickerItem[];
  defaultValue?: PickerItem;
}

interface StyleProps {
  picker: StyleProp<TextStyle>;
  pickerItem: StyleProp<TextStyle>;
}
export default function PickerInput(props: PickerInputProps): JSX.Element {
  const [currentSelection, setCurrentSelection] = useState(props.field.value ?? props.defaultValue ?? props.options[0]);
  const { theme } = useTheme();

  useEffect((): void => {
    props.field.onChange(currentSelection);
  }, [currentSelection]);

  //TODO: make it so width is 100% of parent? through picker.item width?
  //TODO: custom Text for error messages
  const styles: StyleProps = useStyles();

  return (
    <>
      <Picker style={styles.picker} dropdownIconColor="blue" selectedValue={currentSelection?.id} onValueChange={(itemValue: unknown, itemIndex: number) => setCurrentSelection(props.options.find((option: PickerItem): boolean => option.id == itemValue))}>
        {props.options?.map((option: PickerItem): JSX.Element => {
          return <Picker.Item label={option.item} value={option.id} key={option.id} />;
        })}
      </Picker>
    </>
  );
}

const useStyles: (props?: unknown) => StyleProps = (theme: { colors: Colors } & Theme) => ({
  picker: {
    fontSize: 14,
    minHeight: "32px",
    // borderColor: theme?.colors?.grey3,
    // borderRadius: 10,
    border: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: "6px",
    borderBottomWidth: "1px",
    borderBottomColor: "#869E93",
    borderBottomStyle: "solid",
  },
  pickerItem: { fontSize: 14, minHeight: "32px" },
});
