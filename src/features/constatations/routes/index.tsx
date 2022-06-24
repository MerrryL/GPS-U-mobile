import { ParamListBase, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Create } from "./Create";
import Details from "./Details";
import Edit from "./Edit";
import List from "./List";

export type ConstatationStackParamList = {
  Liste: undefined;
  Détails: { constatationId: number };
  Edition: { constatationId: number };
  Nouvelle: undefined;
};

const ConstatationsStack = createStackNavigator<ConstatationStackParamList>();

export default function ConstatationStackScreen(): JSX.Element {
  return (
    <ConstatationsStack.Navigator
      screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
        tabBarHideOnKeyboard: true,
        headerStyle: {
          height: "40px",
        },
      })}
    >
      <ConstatationsStack.Screen name="Liste" component={List} />
      <ConstatationsStack.Screen name="Détails" component={Details} />
      <ConstatationsStack.Screen name="Edition" component={Edit} />
      <ConstatationsStack.Screen name="Nouvelle" component={Create} />
    </ConstatationsStack.Navigator>
  );
}
