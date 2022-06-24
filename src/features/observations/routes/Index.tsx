import { ParamListBase, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Create from "./Create";
import Details from "./Details";
import Edit from "./Edit";
import List from "./List";

export type ObservationStackParamList = {
  Liste: undefined;
  Détails: { observationId: number };
  Edition: { observationId: number };
  Nouvelle: undefined;
};

const ObservationsStack = createStackNavigator<ObservationStackParamList>();

export default function ObservationStackScreen() {
  return (
    <ObservationsStack.Navigator
      screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
        tabBarHideOnKeyboard: true,
        headerStyle: {
          height: "40px",
        },
      })}
    >
      <ObservationsStack.Screen name="Liste" component={List} />
      <ObservationsStack.Screen name="Détails" component={Details} />
      <ObservationsStack.Screen name="Edition" component={Edit} />
      <ObservationsStack.Screen name="Nouvelle" component={Create} />
    </ObservationsStack.Navigator>
  );
}
