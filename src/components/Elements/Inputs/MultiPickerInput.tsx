import React, { useEffect, useState } from "react";
import SelectBox from "react-native-multi-selectbox";
import { Text, makeStyles } from "react-native-elements";
import { useController } from "react-hook-form";
import { xorBy } from "lodash";
import { View } from "react-native";

export default function MultiPickerInput(props) {
  const {
    name,
    label = name,
    defaultValue = null,
    selectedValues = [],
    control,
    options,
  } = props;

  const { field, fieldState, formState } = useController({
    control,
    name,
    defaultValue,
  });

  const styles = useStyles();

  const [currentSelection, setCurrentSelection] = useState(selectedValues);

  useEffect(() => {
    field.onChange(currentSelection);
  }, [currentSelection]);

  const inputConfig = {
    ...field,
    label: "",
    options: options,
    selectedValues: currentSelection,
    onMultiSelect: onMultiChange,
    onTapClose: onMultiChange,
    listEmptyText: "Pas de résultats",
    isMulti: true,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectBox {...inputConfig} />
      <Text>{fieldState?.error?.message}</Text>
      <Text style={styles.border}></Text>
    </View>
  );

  function onMultiChange() {
    return (item) => {
      setCurrentSelection(xorBy(currentSelection, [item], "id"));
      //   field.onChange(currentSelection);
    };
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginBottom: "10px",
    flex: 1,
    flexDirection: "column",
  },
  label: { fontSize: 16, fontWeight: "bold", color: theme.colors.grey3 },
  border: {
    marginTop: "10px",
    borderBottomColor: theme.colors.grey3,
    borderBottomWidth: "1px",
  },
}));
