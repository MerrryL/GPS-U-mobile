import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Text } from "@rneui/base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import { useCreateFieldGroup } from "../hooks/useCreateFieldGroup";

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
  constatationId: number;
};

export function FieldGroupsAdd({ constatationId }: FieldGroupAddProps) {
  const field_groupCreateMutation = useCreateFieldGroup({ constatationId });

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
      constatationId: constatationId,
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
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <Input onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Nom" />}
        name="name"
        defaultValue=""
      />
      <Text>{errors.name?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <Input onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Type" />}
        name="type"
        defaultValue=""
      />
      <Text>{errors.type?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <Input onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Opérateur logique" />}
        name="logical_operator"
        defaultValue=""
      />
      <Text>{errors.logical_operator?.message}</Text>

      <Button title="Nouveau Groupe" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
