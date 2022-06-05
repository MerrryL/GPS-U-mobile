import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { FullTheme, makeStyles } from "react-native-elements";

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

interface FloatingButtonStackProps {
  children: JSX.Element[] | JSX.Element | undefined;
}

export const FloatingButtonStack = (props: FloatingButtonStackProps): JSX.Element => {
  const styles: StyleProps = useStyles();

  return <View style={styles.container}>{props.children && props.children}</View>;
};

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    zIndex: 1,
  },
}));
