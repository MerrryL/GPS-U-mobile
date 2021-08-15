import { initReactQueryAuth } from 'react-query-auth';
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  loginWithEmailAndPassword,
  getUserProfile,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentials,
  RegisterCredentials,
  AuthUser,
} from '@/features/auth';
import React from 'react';
import { axios } from '@/lib/axios';

async function handleUserResponse(data: UserResponse) {
  const { token, user } = data;
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch(e) {
    // remove error
  }
  axios.defaults.headers["Authorization"] = "Bearer " + JSON.stringify(token);
  return user;
}

async function loadUser() {
  if (await AsyncStorage.getItem('token')) {
    const data = await getUserProfile();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentials) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function inscribeFn(data: RegisterCredentials) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  try {
    await AsyncStorage.removeItem('token');
  } catch(e) {
    // remove error
  }
}

const authConfig = {
  loadUser,
  loginFn,
  inscribeFn,
  logoutFn,
  LoaderComponent() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentials,
  RegisterCredentials
>(authConfig);
