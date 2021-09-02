import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, Input } from "react-native-elements";

import { ListDossiers } from "@/features/dossiers/routes/List";

const ParametersStack = createStackNavigator();

export function ParametersScreen() {
  return (
    <>
      <ParametersStack.Navigator>
        <ParametersStack.Screen name="ListeDossiers" component={ListDossiers} />
      </ParametersStack.Navigator>
    </>
  );
}
