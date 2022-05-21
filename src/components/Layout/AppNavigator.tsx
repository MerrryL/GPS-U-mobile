/* eslint-disable react/display-name */
import AboutScreen from "@/features/about";
import ConstatationStackScreen from "@/features/constatations/routes/Index";
import FollowupStackScreen from "@/features/followups/routes";
import ObservationStackScreen from "@/features/observations/routes";
import { ParametersScreen } from "@/features/parameters";
import TaskStackScreen from "@/features/tasks/routes";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
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
interface TabBarIconProps{ color?:string, focused?:boolean, size?:number }
// type NavigationProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const Tab = createBottomTabNavigator();

function AppNavigator():JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }: { route: RouteProp<ParamListBase> }) => ({
        tabBarActiveTintColor: "#e91e63",
      })}
    >
      <Tab.Screen
        name="Constatations"
        component={ConstatationStackScreen}
        options={{
          tabBarLabel: "Constatations",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <AntDesign name="database" color={color} focused={focused} size={size} />,
        }}
      />
      <Tab.Screen
        name="Observations"
        component={ObservationStackScreen}
        options={{
          tabBarLabel: "Observations",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <AntDesign name="database" color={color} focused={focused} size={size} />,
        }}
      />
      <Tab.Screen
        name="Suivis"
        component={FollowupStackScreen}
        options={{
          tabBarLabel: "Suivis",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <AntDesign name="database" color={color} focused={focused} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tâches"
        component={TaskStackScreen}
        options={{
          tabBarLabel: "Tâches",
          tabBarIcon: ({ color, focused, size }:TabBarIconProps):JSX.Element => <AntDesign name="database" color={color} focused={focused} size={size} />,
        }}
      />
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
      <Tab.Screen
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
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
