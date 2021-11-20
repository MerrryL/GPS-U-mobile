/* eslint-disable react/display-name */
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "@/features/home";
import ConstatationStackScreen from "@/features/constatations/routes/Index";
import { ParametersScreen } from "@/features/parameters";
import AboutScreen from "@/features/about";
import ObservationStackScreen from "@/features/observations/routes";
import FollowupStackScreen from "@/features/followups/routes";
import TaskStackScreen from "@/features/tasks/routes";

const Tab = createMaterialBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Constatations"
        component={ConstatationStackScreen}
        options={{
          tabBarLabel: "Constatations",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Observations"
        component={ObservationStackScreen}
        options={{
          tabBarLabel: "Observations",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Suivis"
        component={FollowupStackScreen}
        options={{
          tabBarLabel: "Suivis",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tâches"
        component={TaskStackScreen}
        options={{
          tabBarLabel: "Tâches",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{
          tabBarLabel: "Utilisateur",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Parameters"
        component={ParametersScreen}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "A propos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
