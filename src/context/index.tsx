import Spinner from "@/components/Elements/Spinner";
import { Layout } from "@/components/Layout/Layout";
import { Notifications } from "@/components/Notifications";
import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { Text, ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const ErrorFallback = (props: { error: Error }) => {
  // const navigation= useNavigation();
  return (
    <View>
      <Text h1>Il y a eu un accident!</Text>
      <Text h3>{props.error.toString()}</Text>

      {/* <Button onPress={() => props.resetError} title={'Réessayons'} /> */}
    </View>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const colorScheme = useColorScheme();

  const theme = {
    colors: {
      tifannyBlue: "#A0E7E5",
      mint: "#B4F8C8",
      hotPink: "#FFAEBC",
      yellow: "#FBE7C6",
      ivory: "#EEEDE7",
    },
  };
  const Context = React.createContext(null);

  return (
    <ThemeProvider theme={theme} useDark={colorScheme === "dark"}>
      <React.Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            {Constants?.manifest?.extra?.ENV === "test" && <ReactQueryDevtools initialIsOpen={false} />}
            <Notifications />
            <AuthProvider>
              <SafeAreaProvider>
                <NavigationContainer>
                  <Layout />

                  {children}
                </NavigationContainer>
              </SafeAreaProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </React.Suspense>
    </ThemeProvider>
  );
};
