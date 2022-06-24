import { useAuth } from "@/lib/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Text } from "@rneui/base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import * as yup from "yup";
import { LoginCredentials } from "./api";
import { Entypo } from "@expo/vector-icons";

const schema = yup.object().shape({
  email: yup.string().email().min(4).required(),
  password: yup.string().min(4).required(),
});


export const LoginForm = (): JSX.Element => {
  const { login, isLoggingIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginCredentials) => {
    await login(values);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }): JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} autoComplete="email" keyboardType="default" textContentType="emailAddress" leftIcon={<Entypo name="email" size={24} color="black" />} placeholder="Adresse e-mail" />}
        name="email"
        defaultValue=""
      />
      <Text>{errors.email?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }): JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} autoComplete="password" keyboardType="email-address" textContentType="password" secureTextEntry={true} leftIcon={<Entypo name="lock" size={24} color="black" />} placeholder="Mot de passe" />}
        name="password"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>
      {isLoggingIn && <ActivityIndicator size="small" />}
      <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
