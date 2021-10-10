import { Layout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";
import { Button } from "react-native-elements";
import React from "react";

export default function Register({ navigation }) {
  return (
    <Layout title="Register your account">
      <Button
        title={"Déjà inscrit?"}
        onPress={() => navigation.navigate("Se connecter")}
      />
      <RegisterForm onSuccess={() => navigation.navigate("Home")} />
    </Layout>
  );
}
