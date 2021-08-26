import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input, Switch} from "react-native-elements";
import { useCreateDossier } from "../hooks/useCreateDossier";


type DossiersValues = {
    name: string;
    type: string;
    isDefault:boolean;
    value: string;
};

const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    isDefault: yup.boolean().required(),
    value: yup.string().required(),
});

type DossiersAddProps = {
  dossierGroupId: string;
  constatationId: string;
}

export function DossiersAdd({ dossierGroupId, constatationId }: DossiersAddProps) {
  const dossierCreateMutation = useCreateDossier({constatationId});

  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<DossiersValues>({
      resolver: yupResolver(schema),
    });
  
  const onSubmit = async (values) => {
    
    console.log("values", values);
    await dossierCreateMutation.mutateAsync({
      name: values.name,
      type: values.type,
      value: values.value,
      isDefault: values.isDefault,
      constatationId: constatationId
    });
    
    //onSuccess();
  };
  
  return(
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin:"10px" }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nom"
          />
        )}
        name="name"
        defaultValue=""
      />
      <Text>{errors.name?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Type"
          />
        )}
        name="type"
        defaultValue=""
      />
      <Text>{errors.type?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Valeur"
          />
        )}
        name="value"
        defaultValue=""
      />
      <Text>{errors.value?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Switch
            onValueChange={onChange}
            value={value}
            // placeholder="isDefault"
          />
        )}
        name="isDefault"
        // defaultValue=""
      />
      <Text>{errors.isDefault?.message}</Text>


      <Button title="Nouveau Champ" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}