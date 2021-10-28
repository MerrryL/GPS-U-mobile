import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Constants from "expo-constants";

import { ActivityIndicator, DevSettings, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Notifications } from '@/components/Notifications';
import Spinner from '@/components/Elements/Spinner';
import { Layout } from '@/components/Layout/Layout';

import { useNotificationStore } from "@/hooks/useNotificationStore";


const ErrorFallback = (props: { error: Error }) => {
  // const navigation= useNavigation();
  return (
    <View>
    <Text h1>Il y a eu un accident!</Text>
    <Text h3>{props.error.toString()}</Text>
    
    {/* <Button onPress={() => props.resetError} title={'Réessayons'} /> */}
  </View>

  )
}

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        
          <Spinner />
        
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
            {Constants.manifest.extra.ENV === 'test' && <ReactQueryDevtools initialIsOpen={false} />}
            <Notifications/>
            <AuthProvider>
            <SafeAreaProvider>
            <Layout title="test"/>
            <NavigationContainer>
              
                {children}
            </NavigationContainer>
            </SafeAreaProvider>
              
            </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
