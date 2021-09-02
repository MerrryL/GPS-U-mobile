import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import Details from "./Details";
import Create from "./Create";
import Edit from "./Edit";

const DossiersStack = createStackNavigator();

export default function DossiersStackScreen() {
  return (
    <DossiersStack.Navigator>
      <DossiersStack.Screen name="Liste" component={List} />
      <DossiersStack.Screen name="Details" component={Details} />
      <DossiersStack.Screen name="Edition" component={Edit} />
      <DossiersStack.Screen name="Nouvelle" component={Create} />
    </DossiersStack.Navigator>
  );
}
