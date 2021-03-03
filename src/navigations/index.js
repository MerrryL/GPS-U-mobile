import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { withSanctum } from "react-sanctum";

import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import { Button } from 'react-native';
import apiClient from '../services/api';

const Stack = createStackNavigator();

function GPSUNavigation({ authenticated, user, signIn }) {

  const handleLogin = () => {
    const email = "amo168@gmail.com";
    const password = "1234";
    const remember = true;

    signIn(email, password, remember)
      .then(() => window.alert("Signed in!"))
      .catch((error) => {console.log("test" + error); window.alert("Incorrect email or password")});
  };

  const handleLoginBis = () => {
    const email = "amo168@gmail.com";
    const password = "1234";
    const remember = true;

    apiClient.get('/sanctum/csrf-cookie')
    .then(response => {
      console.log(response);


      apiClient.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
        })
    });
  };



  return (
    <NavigationContainer>
        {authenticated === true ? (
          <>
            <AppNavigator/>
          </>
        ) : (
          <>
          <Button onPress={handleLoginBis}>Se connecter</Button>
          </>
        )}
    </NavigationContainer>
  );
}

export default withSanctum(GPSUNavigation);