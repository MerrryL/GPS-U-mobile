/* eslint-disable react/display-name */
import ConstatationStackScreen from "@/features/constatations/routes/Index";
import ObservationStackScreen from "@/features/observations/routes";
import { MapsScreen, ParametersScreen } from "@/features/parameters";
import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import React from "react";

export type AppStackParamList = {
  Constatations: undefined;
  Observations: undefined;
  Maps: undefined;
  // Parameters: undefined;
  // Tâches: undefined;
  // About: undefined;
};

interface TabBarIconProps {
  color?: string;
  focused?: boolean;
  size?: number;
}

const Tab = createBottomTabNavigator<AppStackParamList>();

function AppNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Constatations"
      screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
        tabBarActiveTintColor: "#e91e63",
        tabBarHideOnKeyboard: true,
        headerStyle: {
          height: "40px",
        },
      })}
    >
      <Tab.Screen
        name="Constatations"
        component={ConstatationStackScreen}
        options={{
          tabBarLabel: "Constatations",
          tabBarIcon: ({ color, focused, size }: TabBarIconProps): JSX.Element => <AntDesign name="mobile1" color={color} focused={focused} size={size} />,
        }}
      />
      <Tab.Screen
        name="Observations"
        component={ObservationStackScreen}
        options={{
          tabBarLabel: "Observations",
          tabBarIcon: ({ color, focused, size }: TabBarIconProps): JSX.Element => <Entypo name="colours" color={color} focused={focused} size={size} />,
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapsScreen}
        options={{
          tabBarLabel: "Maps",
          tabBarIcon: ({ color, focused, size }: TabBarIconProps): JSX.Element => <Fontisto name="map" color={color} focused={focused} size={size} />,
        }}
      />
      {/* <Tab.Screen
        name="Parameters"
        component={ParametersScreen}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, focused, size }: TabBarIconProps): JSX.Element => <Ionicons name="settings" color={color} focused={focused} size={size} />,
        }}
      /> */}

      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <Ionicons name="home" color={color} focused={focused} size={size} />,
        }}
      /> */}
      {/* <Tab.Screen
        name="Users"
        component={UserScreen}
        options={{
          tabBarLabel: "Utilisateur",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="people-outline" color={color} focused={focused} size={size}/>
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Parameters"
        component={ParametersScreen}
        options={{
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <Ionicons name="settings" color={color} focused={focused} size={size} />,
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: "A propos",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <Ionicons name="help-outline" color={color} focused={focused} size={size} />,
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default AppNavigator;
