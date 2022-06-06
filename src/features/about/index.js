import { useAuth } from "@/lib/auth";
import { useNavigation } from "@react-navigation/core";
import { Button } from "@rneui/base";
import React from "react";
import { Text } from "react-native";

function AboutScreen() {
  const { logout } = useAuth();
  const navigation = useNavigation();
  return (
    <>
      <Text>Hello</Text>
      <Button onPress={() => logout().then(() => navigation.navigate("Home"))} title="Se déconnecter"></Button>
    </>
  );
}

export default AboutScreen;
