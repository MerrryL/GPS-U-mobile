import { PickerItem, RHFField, RHFFormState, RHFieldState } from "@/types/utilityTypes";
import { xorBy } from "lodash";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";
import SelectBox from "react-native-multi-selectbox-typescript";
import NormalText from "../Text/NormalText";

type MultiPickerInputProps = {
  field: RHFField;
  fieldState: RHFieldState;
  formState: RHFFormState;
  label?: string;
  defaultValue?: PickerItem[];
  options: PickerItem[];
};

export default function MultiPickerInput({ field, fieldState, label = field.name, defaultValue = [], options }: MultiPickerInputProps):JSX.Element {
  const { ref, ...rest } = field;

  const styles = useStyles();

  const [currentSelection, setCurrentSelection] = useState(field?.value || []);

  useEffect((): void => {
    field.onChange(currentSelection);
  }, [currentSelection]);

  const containerStyle = {};

  const listOptionProps = {
    style: {
      maxHeight: "300px",
      flex: 1,
    },
  };

  const multiSelectInputFieldProps = {
    numColumns: 2,
    horizontal: false,
  };

  const inputConfig = {
    ...rest,
    label: "",
    options: options,
    selectedValues: currentSelection ?? defaultValue,
    onMultiSelect: onMultiChange(),
    onTapClose: onMultiChange(),
    inputPlaceholder: "Choisissez une/des " + label?.toLowerCase(),
    listEmptyText: "Pas de résultats",
    isMulti: true,
    listOptionProps: listOptionProps,
    containerStyle: containerStyle,
    multiSelectInputFieldProps: multiSelectInputFieldProps,
  };

  return (
    <View style={styles.container}>
      <NormalText boldText={label} />
      <SelectBox {...inputConfig} multiListEmptyLabelStyle={{ flexDirection: "column" }} />
      <Text>{fieldState?.error?.message}</Text>
      <Text style={styles.border}></Text>
    </View>
  );

  function onMultiChange():(item:PickerItem)=> void {
    return (item: PickerItem): void => {
      setCurrentSelection(xorBy(currentSelection, [item], "id"));
    };
  }
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    paddingRight: "10px",
    paddingLeft: "10px",
    marginBottom: "10px",
    flex: 1,
    flexDirection: "column",
    flexBasis: "auto",
  },
  label: { fontSize: 16, fontWeight: "bold", color: theme?.colors?.grey3 },
  border: {
    marginTop: "10px",
    borderBottomColor: theme?.colors?.grey3,
    borderBottomWidth: 1,
  },
}));
