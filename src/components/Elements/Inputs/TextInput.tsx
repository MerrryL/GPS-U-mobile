import { RHFField, RHFFormState, RHFieldState } from "@/types/utilityTypes";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { FullTheme, Input, makeStyles, Text } from "react-native-elements";

type TextInputProps = {
  field: RHFField;
  fieldState: RHFieldState;
  formState: RHFFormState;
  label?: string;
};

interface StyleProps {
  container: StyleProp<ViewStyle>;
  picker: StyleProp<TextStyle>;
  pickerItem: StyleProp<TextStyle>;
  border: StyleProp<TextStyle>;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  let label: string = props.label ?? props.field.name ?? "Label";
  label = label.charAt(0).toUpperCase() + label.slice(1);

  const inputConfig = {
    ...props.field,
    label: label + ":",
    placeholder: label,
    onChangeText: props.field.onChange,
    autoCompleteType: "text",
  };
  const styles: StyleProps = useStyles();

  //TODO: change style, definitely
  //TODO: make custom error text
  return (
    <View style={styles.container}>
      <Input {...inputConfig} />
      <Text>{props.fieldState.error?.message}</Text>
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
