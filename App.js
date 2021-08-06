import React from "react";

import { ThemeProvider, Text } from "react-native-elements";
import { AuthProvider } from "./src/context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GPSUNavigation from "./src/navigations";

import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const theme = {
    Button: {
      raised: true
    }
  };

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <Text h1>GPS-U</Text>
            <GPSUNavigation />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
