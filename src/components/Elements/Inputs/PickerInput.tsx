import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Text, makeStyles } from "react-native-elements";
import { useController } from "react-hook-form";
import { View } from "react-native";

export default function PickerInput({
  name,
  label,
  defaultValue,
  control,
  options,
}) {
  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue: defaultValue,
  });

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker style={styles.picker} {...field}>
        {options?.map((option) => {
          return (
            <Picker.Item
              label={option.item}
              value={option.id}
              key={option.id}
            />
          );
        })}
      </Picker>
      <Text style={styles.border}></Text>
      {/* <Text>{formState.isDirty ? "modifié" : "pas modifié"}</Text> */}
      {/* <Text>{fieldState?.errors[name]?.message}</Text> */}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginBottom: "10px",
  },
  label: { fontSize: 16, fontWeight: "bold", color: theme.colors.grey3 },
  picker: {
    fontSize: "18px",
    minHeight: "40px",
    borderColor: theme.colors.grey3,
    borderRadius: "10px",
  },
  pickerItem: { fontSize: "18px", minHeight: "40px" },
  border: {
    marginTop: "10px",
    borderBottomColor: theme.colors.grey3,
    borderBottomWidth: "1px",
  },
}));
