import React from 'react';
import { Sanctum, withSanctum } from "react-sanctum";

import {SafeAreaView, Text, TouchableHighlight, TextInput, Button} from 'react-native';
import GPSUNavigation from './src/navigations'

const sanctumConfig = {
  api_url: 'http://127.0.0.1:8000',
  csrf_cookie_route: "sanctum/csrf-cookie",
  signin_route: "login",
  signout_route: "logout",
  user_object_route: "user",
};

export default function App() {
  return (
    <Sanctum config={sanctumConfig}>
      <Text>Hello</Text>
      <GPSUNavigation/>
    </Sanctum>
  );
}
