import { AuthUser, LoginCredentials, RegisterCredentials } from "@/features/auth";
import { useAuth } from "@/lib/auth";
import { lazyImport } from "@/utils/lazyImport";
import React from "react";
import { AuthContextValue } from "react-query-auth";

const { ProtectedRoutes } = lazyImport(() => import("./ProtectedRoutes"), "ProtectedRoutes");
const { PublicRoutes } = lazyImport(() => import("./PublicRoutes"), "PublicRoutes");

export const AppRoutes:()=>JSX.Element = ():JSX.Element => {
  const auth: AuthContextValue<AuthUser | null, unknown, LoginCredentials, RegisterCredentials> = useAuth();
  return auth.user && auth.user !== null && auth.user.is_user ? <ProtectedRoutes /> : <PublicRoutes />;
};
