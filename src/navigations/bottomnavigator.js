/* eslint-disable react/display-name */
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../scenes/home";
import UserScreen from "../scenes/user";
import ConstatationsScreen from "../scenes/constatationListViewer";
import ParametersScreen from "../scenes/parameters";
import AboutScreen from "../scenes/about";

const Tab = createMaterialBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: "#e91e63"
      }}
    >
      <Tab.Screen
        name="Constatations"
        component={ConstatationsScreen}
        options={{
          tabBarLabel: "Constatations",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{
          tabBarLabel: "Utilisateur",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Parameters"
        component={ParametersScreen}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "A propos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-outline" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
