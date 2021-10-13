import Axios, { AxiosRequestConfig } from 'axios';

import Constants from "expo-constants";

import { useNotificationStore } from '@/hooks/useNotificationStore';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: Constants.manifest.extra.API_URL + "api/",
  //TODO:check
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  // },
  withCredentials: true
});


axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    const errors = error.response?.data?.errors || error.errors;

    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    })

    if(errors) {
      for (const [key, value] of Object.entries(errors)) {
        useNotificationStore.getState().addNotification({
          type: 'error',
          title: 'Error '+ key.toString(),
          message: value.toString(),
        })
      };
    }



    return Promise.reject(error);
  }
);
