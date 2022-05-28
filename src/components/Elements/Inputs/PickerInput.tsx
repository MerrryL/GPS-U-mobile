import { PickerItem } from "@/types/utilityTypes";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";
import NormalText from "../Text/NormalText";

type PickerInputProps = {
  field: ControllerRenderProps<FieldValues>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  label?: string;
  options: PickerItem[];
  defaultValue?: PickerItem;
};

interface StyleProps {
  container: StyleProp<ViewStyle>;
  picker: StyleProp<TextStyle>;
  pickerItem: StyleProp<TextStyle>;
  border: StyleProp<TextStyle>;
}
export default function PickerInput(props: PickerInputProps): JSX.Element {
  const [currentSelection, setCurrentSelection] = useState(props.field.value ?? props.defaultValue ?? props.options[0]);

  useEffect((): void => {
    props.field.onChange(currentSelection);
  }, [currentSelection]);

  //TODO: make it so width is 100% of parent? through picker.item width?
  //TODO: custom Text for error messages
  const styles: StyleProps = useStyles();

  return (
    <View style={styles.container}>
      <NormalText boldText={props.label ?? props.field.name} />
      <Picker style={styles.picker} selectedValue={currentSelection?.id} onValueChange={(itemValue: unknown, itemIndex: number) => setCurrentSelection(props.options.find((option: PickerItem): boolean => option.id == itemValue))}>
        {props.options?.map((option: PickerItem): JSX.Element => {
          return <Picker.Item label={option.item} value={option.id} key={option.id} />;
        })}
      </Picker>
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
      <Text>{props.fieldState?.error?.message}</Text>
      <Text style={styles.border}></Text>
    </View>
  );
}

const useStyles: (props?: unknown) => StyleProps = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginBottom: "10px",
    flex: 1,
    flexDirection: "column",
    flexBasis: "auto",
  },
  picker: {
    fontSize: 18,
    minHeight: "40px",
    borderColor: theme?.colors?.grey3,
    borderRadius: 10,
    marginTop: "10px",
  },
  pickerItem: { fontSize: 18, minHeight: "40px" },
  border: {
    marginTop: "10px",
    borderBottomColor: theme?.colors?.grey3,
    borderBottomWidth: 1,
  },
}));
