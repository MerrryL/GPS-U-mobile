import React from "react";
import { Button } from "react-native-elements";
import { LoginForm } from "../components/LoginForm";

export default function Login({ navigation }):JSX.Element {
  return (
    <>
      <Button title={"Pas encore inscrit?"} onPress={() => navigation.navigate("S'inscrire")} />
      <LoginForm onSuccess={() => navigation.navigate("Home")} />
    </>
  );
}
