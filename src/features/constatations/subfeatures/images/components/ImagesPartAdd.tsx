import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Card, Button, Icon, Text, Input } from "react-native-elements";
import { useCreateImage } from "../hooks/useCreateImage";


type ImagesValues = {
    name: string;
};

const schema = yup.object().shape({
    name: yup.string().required(),
});


export function ImagesPartAdd({ constatationId }) {
    const imageCreateMutation = useCreateImage({ constatationId })

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<ImagesValues>({
        resolver: yupResolver(schema),
      });
    
    const onSubmit = async (values) => {
      
      console.log("values", values);
      await imageCreateMutation.mutateAsync({
        name: values.name,
        constatationId: constatationId,
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
                onBlur={onBlur }
                onChangeText={onChange }
                value={value}
                placeholder="Nom"
                multiline
                numberOfLines={4}
              />
            )}
            name="name"
            defaultValue=""
          />
          <Text>{errors.name?.message}</Text>
          <Button title="Nouvelle image" onPress={handleSubmit(onSubmit)} />
        </View>

    )
}