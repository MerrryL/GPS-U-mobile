import * as React from 'react';
import { View } from "react-native";
import { Header } from "react-native-elements";



type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = () => {
  const title ="testss";

  return (
    <>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
        centerComponent={{ text: title, style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    </>
  );
};
