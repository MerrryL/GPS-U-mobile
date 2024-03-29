import { User } from "@/types";
import * as React from "react";
import { useAuth } from "./auth";



export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  "comment:delete": (user: User):boolean => {
    if (user.role === "ADMIN") {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error("User does not exist!");
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }):boolean => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }

      return true;
    },
    [user.role]
  );

  return { checkAccess, role: user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({ policyCheck, allowedRoles, forbiddenFallback = null, children }: AuthorizationProps):JSX.Element => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
