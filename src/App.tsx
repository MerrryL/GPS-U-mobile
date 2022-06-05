import { AppProvider } from "@/context";
import { AppRoutes } from "@/routes";
import { registerRootComponent } from "expo";
import { InitialProps } from "expo/build/launch/withExpoRoot.types";
import React from "react";

class App extends React.Component<InitialProps> {
  render() {
    return (
      // <AppearanceProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      // </AppearanceProvider>
    );
  }
}

registerRootComponent(App);
