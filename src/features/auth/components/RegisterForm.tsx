import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Icon from "react-native-vector-icons/FontAwesome";
import { View, ActivityIndicator } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";

import { useAuth } from "@/lib/auth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
});

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    await register(values);
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
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholder="Prénom"
          />
        )}
        name="firstName"
        defaultValue=""
      />
      <Text>{errors.firstName?.message}</Text>

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
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholder="Nom"
          />
        )}
        name="lastName"
        defaultValue=""
      />
      <Text>{errors.lastName?.message}</Text>

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
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholder="Adresse e-mail"
          />
        )}
        name="email"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>

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
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholder="Mot de passe"
          />
        )}
        name="password"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>

      {isRegistering && <ActivityIndicator size="small" />}
      <Button title="S'inscrire" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
