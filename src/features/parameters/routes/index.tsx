import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const ParametersStack = createStackNavigator();

export function ParametersScreen() {
  return (
    <>
      <ParametersStack.Navigator>{/* <ParametersStack.Screen name="ListeDossiers" component={ListDossiers} /> */}</ParametersStack.Navigator>
    </>
  );
}
