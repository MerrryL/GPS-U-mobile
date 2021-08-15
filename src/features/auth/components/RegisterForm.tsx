import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Icon from "react-native-vector-icons/FontAwesome";
import { View, ActivityIndicator } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { useForm } from "react-hook-form";

import { useAuth } from '@/lib/auth';

const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })

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
  const { inscribe, isRegistering } = useAuth();

  const { register, handleSubmit, formState:{ errors } } = useForm<RegisterValues>({
    resolver: zodResolver(schema)
  });



  const onSubmit = async (values) => {
    await inscribe(values);
    onSuccess();
  }


  return (
    <View>
       <Input {...register("firstName")} leftIcon={<Icon name="user" size={24} color="black" />}
            placeholder="Prénom" />
      <Text>{errors.firstName?.message}</Text>

       <Input {...register("lastName")} leftIcon={<Icon name="user" size={24} color="black" />}
            placeholder="Nom de famille" />
      <Text>{errors.lastName?.message}</Text>

      <Input {...register("email")} leftIcon={<Icon name="user" size={24} color="black" />}
            placeholder="Adresse e-mail" />
      <Text>{errors.email?.message}</Text>
        
      <Input {...register("password")} leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholder="Mot de passe" />
      <Text>{errors.password?.message}</Text>

      {isRegistering && <ActivityIndicator size="small" />}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
