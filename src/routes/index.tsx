import { useAuth } from "@/lib/auth";
import { lazyImport } from "@/utils/lazyImport";
import React from "react";

const { ProtectedRoutes } = lazyImport(() => import("./ProtectedRoutes"), "ProtectedRoutes");
const { PublicRoutes } = lazyImport(() => import("./PublicRoutes"), "PublicRoutes");

export const AppRoutes = () => {
  const auth = useAuth();
  return auth.user && auth.user !== null ? <ProtectedRoutes /> : <PublicRoutes />;
};
