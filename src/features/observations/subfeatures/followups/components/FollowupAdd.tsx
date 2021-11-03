import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View, Platform } from "react-native";

import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useCreateFollowup } from "../hooks/useCreateFollowUp";
import TextInput from "@/components/Elements/Inputs/TextInput";


type FollowupsValues = {
    name: string;
    type: string;
    logical_operator: string;
};

const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
});

type FollowupAddProps= {
  observationId: string;
}

export function FollowupsAdd({ observationId }: FollowupAddProps) {
    const followupCreateMutation = useCreateFollowup({observationId})

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FollowupsValues>({
        resolver: yupResolver(schema),
      });
    
    const onSubmit = async (values) => {
      
      console.log("values", values);
      await followupCreateMutation.mutateAsync({
        name: values.name,
        description: values.description,
        observationId: observationId,
      });
      
      //onSuccess();
    };
    
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", margin:"10px" }}>
        
          <TextInput name="name" defaultValue="" label="Nom" control={control} />
          <TextInput name="description" defaultValue="" label="Description" control={control} />

          <Button title="Nouveau Suivi" onPress={handleSubmit(onSubmit)} />
        </View>

    )
}