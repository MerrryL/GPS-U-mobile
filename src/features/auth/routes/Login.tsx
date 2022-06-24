import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Button } from "@rneui/base";
import React from "react";
import { AuthRoutesTabParamList } from ".";
import { LoginForm } from "../components/LoginForm";

interface Props {
  navigation: BottomTabNavigationProp<AuthRoutesTabParamList, "Connection">
  route: RouteProp<AuthRoutesTabParamList, "Connection">
}

export default function Login({ navigation, route}:Props): JSX.Element {
  return (
    <>
      <Button title={"Pas encore inscrit?"} onPress={() => navigation.navigate("Inscription")} />
      <LoginForm/>
    </>
  );
}
