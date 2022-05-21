import { PickerItem, RHFField, RHFFormState, RHFieldState } from "@/types/utilityTypes";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";
import NormalText from "../Text/NormalText";

type PickerInputProps = {
  field: RHFField;
  fieldState: RHFieldState;
  formState: RHFFormState;
};

export default function PickerInput(props: PickerInputProps):JSX.Element {
  const { field, fieldState } = props;

  const { name, label, defaultValue, control, options } = field;

  //TODO: make it so width is 100% of parent? through picker.item width?
  //TODO: custom Text for error messages
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <NormalText boldText={label} />
      <Picker style={styles.picker} {...field}>
        {field.options?.map((option: PickerItem):JSX.Element => {
          return <Picker.Item label={option.item} value={option.id} key={option.id} />;
        })}
      </Picker>
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
      <Text>{fieldState?.error?.message}</Text>
      <Text style={styles.border}></Text>
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginBottom: "10px",
  },
  picker: {
    fontSize: "18px",
    minHeight: "40px",
    borderColor: theme?.colors?.grey3,
    borderRadius: 10,
    marginTop: "10px",
  },
  pickerItem: { fontSize: "18px", minHeight: "40px" },
  border: {
    marginTop: "10px",
    borderBottomColor: theme?.colors?.grey3,
    borderBottomWidth: 1,
  },
}));
