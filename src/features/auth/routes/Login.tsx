import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";
import { Button } from "react-native-elements";
import React from "react";

export default function Login({ navigation }) {
  return (
    <Layout title="Log in to your account">
      <Button
        title={"Pas encore inscrit?"}
        onPress={() => navigation.navigate("S'inscrire")}
      />
      <LoginForm onSuccess={() => navigation.navigate("Home")} />
    </Layout>
  );
}
