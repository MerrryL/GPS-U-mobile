import { Button } from "@rneui/base";
import React from "react";
import { LoginForm } from "../components/LoginForm";

export default function Login({ navigation }): JSX.Element {
  return (
    <>
      <Button title={"Pas encore inscrit?"} onPress={() => navigation.navigate("S'inscrire")} />
      <LoginForm onSuccess={() => navigation.navigate("Home")} />
    </>
  );
}
