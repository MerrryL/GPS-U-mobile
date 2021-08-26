import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useCreateField } from "../hooks/useCreateField";


type FieldsValues = {
    name: string;
    type: string;
    isDefault:boolean;
    value: string;
};

const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    logical_operator: yup.string().required(),
});

type FieldsAddProps = {
  fieldGroupId: string;
  constatationId: string;
}

export function FieldsAdd({ fieldGroupId, constatationId }: FieldsAddProps) {
    const field_groupCreateMutation = useCreateField(constatationId, fieldGroupId )

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FieldsValues>({
        resolver: yupResolver(schema),
      });
    
    const onSubmit = async (values) => {
      
      console.log("values", values);
      await field_groupCreateMutation.mutateAsync({
        name: values.name,
        type: values.type,
        logical_operator: values.logical_operator,
        constatationId: constatationId,
        fieldGroupId: fieldGroupId
      });
      
      //onSuccess();
    };
    
    return(
        <View
          style={{
            flex: 1, alignItems: "center", justifyContent: "center", margin:"10px" }}>
        
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
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="isDefault"
              />
            )}
            name="isDefault"
            defaultValue=""
          />
          <Text>{errors.isDefault?.message}</Text>


          <Button title="Nouveau Champ" onPress={handleSubmit(onSubmit)} />
        </View>

    )
}