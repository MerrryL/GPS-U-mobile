import Spinner from "@/components/Elements/Spinner";
import { AuthUser, getUserProfile, LoginCredentials, loginWithEmailAndPassword, RegisterCredentials, registerWithEmailAndPassword, UserResponse } from "@/features/auth";
import { axios } from "@/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { initReactQueryAuth } from "react-query-auth";


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
  if ((await AsyncStorage.getItem("token")) && (await AsyncStorage.getItem("token")) === null) {
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
    // remove error
  }
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent():JSX.Element {
    return <Spinner />;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<AuthUser | null, unknown, LoginCredentials, RegisterCredentials>(authConfig);
