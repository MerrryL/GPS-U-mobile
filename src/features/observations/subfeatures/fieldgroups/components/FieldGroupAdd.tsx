import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useCreateObservationFieldGroup } from "../hooks/useCreateObservationFieldGroup";
import TextInput from "@/components/Elements/Inputs/TextInput";

type FieldGroupsValues = {
  name: string;
  type: string;
  logical_operator: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  logical_operator: yup.string().required(),
});

type FieldGroupAddProps = {
  observationId: string;
};

export function FieldGroupsAdd({ observationId }: FieldGroupAddProps) {
  const field_groupCreateMutation = useCreateObservationFieldGroup({
    observationId,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldGroupsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    await field_groupCreateMutation.mutateAsync({
      name: values.name,
      type: values.type,
      logical_operator: values.logical_operator,
      observationId: observationId,
    });

    //onSuccess();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <TextInput name="name" defaultValue="" label="Nom" control={control} />

      <TextInput name="type" defaultValue="" label="Type" control={control} />

      <TextInput name="logical_operator" defaultValue="" label="Opérateur logique" control={control} />

      {/* <Controller
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
                placeholder="Opérateur logique"
              />
            )}
            name="logical_operator"
            defaultValue=""
          />
          <Text>{errors.logical_operator?.message}</Text>
 */}

      <Button title="Nouveau Groupe" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
