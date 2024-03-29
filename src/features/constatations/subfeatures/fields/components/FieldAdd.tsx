import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Switch, Text } from "@rneui/base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import { useCreateField } from "../hooks/useCreateField";

type FieldsValues = {
  name: string;
  type: string;
  isDefault: boolean;
  value: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  isDefault: yup.boolean().required(),
  value: yup.string().required(),
});

type FieldsAddProps = {
  fieldGroupId: string;
  constatationId: number;
};

export function FieldsAdd({ fieldGroupId, constatationId }: FieldsAddProps) {
  const fieldCreateMutation = useCreateField({ constatationId, fieldGroupId });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    await fieldCreateMutation.mutateAsync({
      name: values.name,
      type: values.type,
      value: values.value,
      isDefault: values.isDefault,
      constatationId: constatationId,
      fieldGroupId: fieldGroupId,
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
        render={({ field: { onChange, onBlur, value } }) => <Input onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Valeur" />}
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
  );
}
