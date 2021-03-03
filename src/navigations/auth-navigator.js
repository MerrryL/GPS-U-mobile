import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../scenes/login';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}


export default AuthNavigator;