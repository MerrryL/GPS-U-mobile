import { PickerItem } from "@/types/utilityTypes";
import { useTheme } from "@rneui/themed";
import { xorBy } from "lodash";
import React, { useEffect, useState } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from "react-hook-form";
import SelectBox from "react-native-multi-selectbox-typescript";

interface MultiPickerInputProps {
  field: ControllerRenderProps<FieldValues>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  defaultValue?: PickerItem[];
  options: PickerItem[];
  label?: string;
  name: string;
}

export default function MultiPickerInput(props: MultiPickerInputProps): JSX.Element {
  const { theme } = useTheme();
  const { ref, ...rest } = props.field;

  const [currentSelection, setCurrentSelection] = useState(props.field?.value || []);

  useEffect((): void => {
    props.field.onChange(currentSelection);
  }, [currentSelection]);

  const containerStyle = {
    paddingLeft: 8,
  };

  const listOptionProps = {
    style: {
      maxHeight: "300px",
      flex: 1,
      fontSize: 12,
    },
  };

  const multiSelectInputFieldProps = {
    numColumns: 2,
    horizontal: false,
  };

  const inputConfig = {
    ...rest,
    label: "",
    options: props.options,
    selectedValues: currentSelection ?? props.defaultValue,
    onMultiSelect: onMultiChange(),
    onTapClose: onMultiChange(),
    inputPlaceholder: "Choisissez une/des " + props.label?.toLowerCase() ?? props.name.toLowerCase() + ".",
    listEmptyText: "Pas de résultats.",
    isMulti: true,
    listOptionProps: listOptionProps,
    multiOptionContainerStyle: { marginLeft: 20, backgroundColor: theme.colors.primary },
    listEmptyLabelStyle: { fontSize: 12 },
    inputFilterStyle: { marginLeft: 8 },
    optionsLabelStyle: { fontSize: 12, marginLeft: 8 },
    selectedItemStyle: { fontSize: 12, backgroundColor: theme.colors.primary, color: theme.colors.white },
    containerStyle: containerStyle,
    optionContainerStyle: { marginLeft: 8 },
    arrowIconColor: theme.colors.primary,
    searchIconColor: theme.colors.primary,
    toggleIconColor: theme.colors.primary,
    multiSelectInputFieldProps: multiSelectInputFieldProps,
  };

  return <SelectBox {...inputConfig} multiListEmptyLabelStyle={{ flexDirection: "column" }} />;

  function onMultiChange(): (item: { id: number | string; item: string }) => void {
    return (item: { id: number | string; item: string }): void => {
      setCurrentSelection(xorBy(currentSelection, [item], "id"));
    };
  }
}
