import { Button } from "@rneui/base";
import React from "react";
import { RegisterForm } from "../components/RegisterForm";

export default function Register({ navigation }): JSX.Element {
  return (
    <>
      <Button title={"Déjà inscrit?"} onPress={() => navigation.navigate("Se connecter")} />
      <RegisterForm onSuccess={() => navigation.navigate("Home")} />
    </>
  );
}
