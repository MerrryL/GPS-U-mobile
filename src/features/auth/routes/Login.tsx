import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";
import { Button } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/core";

export default function Login({ navigation }) {
  return (
    <Layout title="Connexion">
      <Button
        title={"Pas encore inscrit?"}
        onPress={() => navigation.navigate("S'inscrire")}
      />
      <LoginForm onSuccess={() => navigation.navigate("Home")} />
    </Layout>
  );
}
