import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Overlay, Text, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";

import { loginUser, useAuthState, useAuthDispatch } from "../../context";
import { getCSRF } from "../../context/actions";

const LoginScreen = () => {
  const [error, setError] = useState(false);

  const dispatch = useAuthDispatch();
  const context = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setError(false);

    try {
      let response = await getCSRF(dispatch, data.email, data.password);
      if (!response) return;

      try {
        let response = await loginUser(dispatch, data.email, data.password);
        if (!response.user) return;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Overlay isVisible={context.loading}>
        <Text>
          Connection en cours {context.loading ? "testss" : "TODO"} test
        </Text>
      </Overlay>

      <Text h1>Se connecter à GPS-U</Text>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholder="Adresse e-mail"
          />
        )}
        name="email"
      />
      {errors.email && <Text>E-mail requis.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true
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
      />
      {errors.password && <Text>Mot de passe requis.</Text>}
      {error && <Text>Informations incorrectes.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </>
  );
};

export default LoginScreen;
