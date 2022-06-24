import { axios } from "@/lib/axios";

export type LoginCredentials = {
  email: string;
  password: string;
  device_name: string;
  token_name: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type AuthUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  role: "ADMIN" | "USER";
};

export type UserResponse = {
  token: string;
  user: AuthUser;
};

export const loginWithEmailAndPassword = (data: LoginCredentials): Promise<UserResponse> => {
  return axios.post("/login", data);
};

export const registerWithEmailAndPassword = (data: RegisterCredentials): Promise<UserResponse> => {
  return axios.post("/register", data);
};

export const getUserProfile = (): Promise<AuthUser> => {
  return axios.get("/me");
};
