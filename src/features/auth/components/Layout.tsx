import * as React from 'react';
import { View } from "react-native";
import { Header } from "react-native-elements";



type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
    <Header
  leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
  centerComponent={{ text: {title}, style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
     <View>{children}</View>
    </>
  );
};
