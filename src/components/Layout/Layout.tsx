import { useAuth } from "@/lib/auth";
import { Header } from "@rneui/base";
import * as React from "react";

export const Layout: () => JSX.Element = (): JSX.Element => {
  const { user } = useAuth();
  const title = user?.first_name ? "Bien le bonjour " + user?.first_name : "Constat-à-l'heur";

  return (
    <>
      <Header centerComponent={{ text: title, style: { color: "#fff" } }} />
    </>
  );
};
