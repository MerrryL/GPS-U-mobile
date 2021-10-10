import { registerRootComponent } from "expo";
import { AppProvider } from "@/context";
import { AppRoutes } from "@/routes";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    );
  }
}

registerRootComponent(App);
