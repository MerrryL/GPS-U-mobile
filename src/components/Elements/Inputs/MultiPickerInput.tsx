import { PickerItem } from "@/types/utilityTypes";
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
  label: string;
}

export default function MultiPickerInput(props: MultiPickerInputProps): JSX.Element {
  const { ref, ...rest } = props.field;

  const [currentSelection, setCurrentSelection] = useState(props.field?.value || []);

  useEffect((): void => {
    props.field.onChange(currentSelection);
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
    options: props.options,
    selectedValues: currentSelection ?? props.defaultValue,
    onMultiSelect: onMultiChange(),
    onTapClose: onMultiChange(),
    inputPlaceholder: "Choisissez une/des " + props.label?.toLowerCase(),
    listEmptyText: "Pas de résultats",
    isMulti: true,
    listOptionProps: listOptionProps,
    containerStyle: containerStyle,
    multiSelectInputFieldProps: multiSelectInputFieldProps,
  };

  return <SelectBox {...inputConfig} multiListEmptyLabelStyle={{ flexDirection: "column" }} />;

  function onMultiChange(): (item: { id: number | string; item: string }) => void {
    return (item: { id: number | string; item: string }): void => {
      setCurrentSelection(xorBy(currentSelection, [item], "id"));
    };
  }
}
