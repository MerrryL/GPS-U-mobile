import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import React from "react";
import Login from "./Login";
import Register from "./Register";

interface TabBarIconProps {
  color?: string;
  focused?: boolean;
  size?: number;
}


export type AuthRoutesTabParamList = {
  Connection: undefined;
  Inscription: undefined;
};

const Tab = createBottomTabNavigator<AuthRoutesTabParamList>();

export const AuthRoutes: () => JSX.Element = (): JSX.Element => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Connection"
        screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
          tabBarActiveTintColor: "#e91e63",
          tabBarHideOnKeyboard: true,
          headerStyle: {
            height: "40px",
          },
        })}
      >
        <Tab.Screen
          name="Connection"
          component={Login}
          options={{
            tabBarLabel: "Utilisateur",
            tabBarIcon: ({ color, size }: TabBarIconProps): JSX.Element => <Ionicons name="people-outline" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Inscription"
          component={Register}
          options={{
            tabBarLabel: "S'inscrire",
            tabBarIcon: ({ color, size }: TabBarIconProps): JSX.Element => <Ionicons name="settings" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
