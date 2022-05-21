import { useAuth } from "@/lib/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";



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
        render={({ field: { onChange, onBlur, value } }):JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="user" size={24} color="black" />} placeholder="Prénom" textContentType="givenName" />}
        name="firstName"
        defaultValue=""
      />
      <Text>{errors.firstName?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }):JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="user" size={24} color="black" />} placeholder="Nom" textContentType="familyName" />}
        name="lastName"
        defaultValue=""
      />
      <Text>{errors.lastName?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }):JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="at" size={24} color="black" />} placeholder="Adresse e-mail" autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" />}
        name="email"
        defaultValue=""
      />
      <Text>{errors.email?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }):JSX.Element => <Input onBlur={onBlur} onChangeText={onChange} value={value} leftIcon={<Icon name="lock" size={24} color="black" />} placeholder="Mot de passe" secureTextEntry={true} textContentType="newPassword" />}
        name="password"
        defaultValue=""
      />
      <Text>{errors.password?.message}</Text>

      {isRegistering && <ActivityIndicator size="small" />}
      <Button title="S'inscrire" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
