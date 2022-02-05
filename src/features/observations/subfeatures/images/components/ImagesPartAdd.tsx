import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Image, View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useCreateObservationImage } from "../hooks/useCreateObservationImage";
import TextInput from "@/components/Elements/Inputs/TextInput";

type ImagesValues = {
  name: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

export default function ImagesPartAdd({ observationId }) {
  const imageCreateMutation = useCreateObservationImage({ observationId });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ImagesValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    await imageCreateMutation.mutateAsync({
      name: values.name,
      description: values.description,
      observationId: observationId,
    });
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
      <TextInput name="description" defaultValue="" label="Description" control={control} />

      <Button title="Nouvelle image" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
