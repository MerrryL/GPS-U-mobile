import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Create from "./Create";
import Details from "./Details";
import Edit from "./Edit";
import List from "./List";

export type ObservationStackParamList = {
  Liste: undefined;
  Details: { observationId: string };
  Edition: { observationId: string };
  Nouvelle: undefined;
};

const ObservationsStack = createStackNavigator<ObservationStackParamList>();

export default function ObservationStackScreen() {
  return (
    <ObservationsStack.Navigator>
      <ObservationsStack.Screen name="Liste" component={List} />
      <ObservationsStack.Screen name="Details" component={Details} />
      <ObservationsStack.Screen name="Edition" component={Edit} />
      <ObservationsStack.Screen name="Nouvelle" component={Create} />
    </ObservationsStack.Navigator>
  );
}
