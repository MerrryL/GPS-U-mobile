import { useAuth } from "@/lib/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Text } from "@rneui/base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import { RegisterCredentials } from "./api";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  password: yup.string().min(4).required(),
});

export const RegisterForm = ():JSX.Element => {
  const { register, isRegistering } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values:RegisterCredentials) => {
    await register(values);
  };
  
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }): JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="user" size={24} color="black" />} placeholder="Prénom" textContentType="givenName" />}
        name="first_name"
        defaultValue=""
      />
      <Text>{errors.first_name?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }): JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="user" size={24} color="black" />} placeholder="Nom" textContentType="familyName" />}
        name="last_name"
        defaultValue=""
      />
      <Text>{errors.last_name?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }): JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="at" size={24} color="black" />} placeholder="Adresse e-mail" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" />}
        name="email"
        defaultValue=""
      />
      <Text>{errors.email?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }): JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="lock" size={24} color="black" />} placeholder="Mot de passe" secureTextEntry={true} textContentType="newPassword" />}
        name="password"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>

      {isRegistering && <ActivityIndicator size="small" />}
      <Button title="S'inscrire" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
