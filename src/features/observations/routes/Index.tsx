import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import Details from "./Details";
import Create from "./Create";
import Edit from "./Edit";

const ObservationsStack = createStackNavigator();

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
