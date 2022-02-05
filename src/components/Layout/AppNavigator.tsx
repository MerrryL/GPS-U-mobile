/* eslint-disable react/display-name */
import AboutScreen from "@/features/about";
import ConstatationStackScreen from "@/features/constatations/routes/Index";
import FollowupStackScreen from "@/features/followups/routes";
import HomeScreen from "@/features/home";
import ObservationStackScreen from "@/features/observations/routes";
import { ParametersScreen } from "@/features/parameters";
import TaskStackScreen from "@/features/tasks/routes";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";

export type RootStackParamList = {
  Feed: undefined;
  Constatations: undefined;
  Observations: undefined;
  Suivis: undefined;
  Tâches: undefined;
  Home: undefined;
  Parameters: undefined;
  About: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

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
          tabBarIcon: ({ color, focused }) => <AntDesign name="database" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Observations"
        component={ObservationStackScreen}
        options={{
          tabBarLabel: "Observations",
          tabBarIcon: ({ color, focused }) => <AntDesign name="database" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Suivis"
        component={FollowupStackScreen}
        options={{
          tabBarLabel: "Suivis",
          tabBarIcon: ({ color, focused }) => <AntDesign name="database" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Tâches"
        component={TaskStackScreen}
        options={{
          tabBarLabel: "Tâches",
          tabBarIcon: ({ color, focused }) => <AntDesign name="database" color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => <Ionicons name="home" color={color} focused={focused} />,
        }}
      />
      {/* <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{
          tabBarLabel: "Utilisateur",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="people-outline" color={color} focused={focused} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Parameters"
        component={ParametersScreen}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, focused }) => <Ionicons name="settings" color={color} focused={focused} />,
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "A propos",
          tabBarIcon: ({ color, focused }) => <Ionicons name="help-outline" color={color} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
