import SwitchInput from "@/components/Elements/Inputs/CheckBoxInput";
import PickerInput from "@/components/Elements/Inputs/PickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { useFieldTypes } from "@/hooks/useFieldTypes";
import { FieldGroup, Observation } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-elements";
import * as yup from "yup";
import { useCreateField } from "../hooks/useCreateField";

type FieldsValues = {
  name: string;
  type_id: string;
  options: string;
  defaultValue: string;
  isRequired: boolean;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  type_id: yup.string().required(),
  options: yup.string().required(),
  defaultValue: yup.string().required(),
  isRequired: yup.boolean().required(),
});

type FieldsAddProps = {
  fieldGroup: FieldGroup;
  observation: Observation;
};

export function FieldsAdd({ fieldGroup, observation }: FieldsAddProps) {
  const fieldCreateMutation = useCreateField({ observationId: observation.id, fieldGroupId: fieldGroup.id });

  const fieldTypesOptions = useFieldTypes()?.data?.map((field) => {
    return { item: field.name, id: field.id };
  });

  console.log("field_types", fieldTypesOptions);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    await fieldCreateMutation.mutateAsync({
      name: values.name,
      type_id: values.type_id,
      options: values.options,
      defaultValue: values.defaultValue,
      isRequired: values.isRequired,
      observationId: observation.id,
      fieldGroupId: fieldGroup.id,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <TextInput name="name" defaultValue="" label="Nom" control={control} />
      <TextInput name="options" defaultValue="" label="Nom" control={control} />
      <PickerInput name="type_id" defaultValue={0} label="Type" options={fieldTypesOptions} control={control} />

      <SwitchInput name="isDefault" defaultValue={false} label="Champ obligatoire?" control={control} />

      <Button title="Nouveau Champ" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
