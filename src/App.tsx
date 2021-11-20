import { registerRootComponent } from "expo";
import { AppearanceProvider } from "react-native-appearance";
import { AppProvider } from "@/context";
import { AppRoutes } from "@/routes";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <AppearanceProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AppearanceProvider>
    );
  }
}

registerRootComponent(App);
