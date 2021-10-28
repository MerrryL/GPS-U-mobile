import { initReactQueryAuth } from "react-query-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loginWithEmailAndPassword,
  getUserProfile,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentials,
  RegisterCredentials,
  AuthUser,
} from "@/features/auth";
import React from "react";
import { axios } from "@/lib/axios";
import Spinner from "@/components/Elements/Spinner";

async function handleUserResponse(data: UserResponse) {
  const { token, user } = data;
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch (e) {
    // remove error
  }
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    // remove error
  }
  axios.defaults.headers["Authorization"] = "Bearer " + JSON.stringify(token);
  return user;
}

//TODO: user is already set in previous method
async function loadUser() {
  if (await AsyncStorage.getItem("token") && await AsyncStorage.getItem("token") === null) {
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

async function registerFn(data: RegisterCredentials) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  try {
    await AsyncStorage.multiRemove(["user", "token"]);
  } catch (e) {
    console.log("error", e);
    // remove error
  }
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <Spinner/>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentials,
  RegisterCredentials
>(authConfig);
