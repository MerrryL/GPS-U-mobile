import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Login from "./Login";
import Register from "./Register";

const Tab = createMaterialBottomTabNavigator();

//TODO: register
export const AuthRoutes = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Se connecter"
          component={Login}
          options={{
            tabBarLabel: "Utilisateur",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="S'inscrire"
          component={Register}
          options={{
            tabBarLabel: "S'inscrire",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
