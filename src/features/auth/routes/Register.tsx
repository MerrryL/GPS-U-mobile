import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Button } from "@rneui/base";
import React from "react";
import { AuthRoutesTabParamList } from ".";
import { RegisterForm } from "../components/RegisterForm";

interface Props {
  navigation: BottomTabNavigationProp<AuthRoutesTabParamList, "Inscription">;
  route: RouteProp<AuthRoutesTabParamList, "Inscription">;
}

export default function Register({ navigation, route }:Props): JSX.Element {
  return (
    <>
      <Button title={"Déjà inscrit?"} onPress={() => navigation.navigate("Connection")} />
      <RegisterForm />
    </>
  );
}
