import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Icon from "react-native-vector-icons/FontAwesome";
import { View, ActivityIndicator } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/lib/auth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    await login(values);
    onSuccess();
  };

  return (
    <View>
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
            autoCompleteType="email"
            keyboardType="default"
            textContentType="emailAddress"
            leftIcon={<Icon name="at" size={24} color="black" />}
            placeholder="Adresse e-mail"
          />
        )}
        name="email"
        defaultValue=""
      />
      <Text>{errors.email?.message}</Text>

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
            autoCompleteType="password"
            keyboardType="email-address"
            textContentType="password"
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholder="Mot de passe"
          />
        )}
        name="password"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>
      {isLoggingIn && <ActivityIndicator size="small" />}
      <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
