import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import Details from "./Details";
import Create from "./Create";
import Edit from "./Edit";

const ConstatationsStack = createStackNavigator();

export default function ConstatationStackScreen() {
  return (
    <ConstatationsStack.Navigator>
      <ConstatationsStack.Screen name="Liste" component={List} />
      <ConstatationsStack.Screen name="Details" component={Details} />
      <ConstatationsStack.Screen name="Edition" component={Edit} />
      <ConstatationsStack.Screen name="Nouvelle" component={Create} />
    </ConstatationsStack.Navigator>
  );
}
