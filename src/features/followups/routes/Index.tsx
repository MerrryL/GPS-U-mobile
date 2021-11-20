import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import Details from "./Details";
import Create from "./Create";
import Edit from "./Edit";

const FollowupsStack = createStackNavigator();

export default function FollowupStackScreen() {
  return (
    <FollowupsStack.Navigator>
      <FollowupsStack.Screen name="Liste" component={List} />
      <FollowupsStack.Screen name="Details" component={Details} />
      <FollowupsStack.Screen name="Edition" component={Edit} />
      <FollowupsStack.Screen name="Nouvelle" component={Create} />
    </FollowupsStack.Navigator>
  );
}
