import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import List from "./List";
import Details from "./Details";
import Create from "./Create";
import Edit from "./Edit";

const TasksStack = createStackNavigator();

export default function TaskStackScreen() {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen name="Liste" component={List} />
      <TasksStack.Screen name="Details" component={Details} />
      <TasksStack.Screen name="Edition" component={Edit} />
      <TasksStack.Screen name="Nouvelle" component={Create} />
    </TasksStack.Navigator>
  );
}
