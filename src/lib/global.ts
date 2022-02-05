import { RootStackParamList } from "@/components/Layout/AppNavigator";

export {};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
