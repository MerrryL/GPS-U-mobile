import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input, Switch} from "react-native-elements";
import { useCreateField } from "../hooks/useCreateField";
import SwitchInput from "@/components/Elements/Inputs/CheckBoxInput";
import TextInput from "@/components/Elements/Inputs/TextInput";


type FieldsValues = {
    name: string;
    type: string;
    isDefault:boolean;
};

const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    isDefault: yup.boolean().required(),
});

type FieldsAddProps = {
  fieldGroupId: string;
  observationId: string;
}

export function FieldsAdd({ fieldGroupId, observationId }: FieldsAddProps) {
  const fieldCreateMutation = useCreateField({observationId, fieldGroupId});

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
      type: values.type,
      value: values.value,
      isDefault: values.isDefault,
      observationId: observationId,
      fieldGroupId: fieldGroupId
    });
      };
  
  return(
    <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center", margin:"10px" }}>

      <TextInput name="name" defaultValue="" label="Nom" control={control} />
      <TextInput name="type" defaultValue="" label="Type" control={control} />
      <SwitchInput name="isDefault" defaultValue={false} label="Champ obligatoire?" control={control} />

      <Button title="Nouveau Champ" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}