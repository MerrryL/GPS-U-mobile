import { Header } from "@rneui/base";
import * as React from "react";

export const Layout: () => JSX.Element = (): JSX.Element => {
  const title = "Constat-à-l'heur";

  return (
    <>
      <Header
        centerComponent={{ text: title, style: { color: "#fff" } }}
      />
    </>
  );
};
