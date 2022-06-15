import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

interface FloatingButtonStackProps {
  children: (JSX.Element | undefined)[] | JSX.Element | undefined;
}

export const FloatingButtonStack = (props: FloatingButtonStackProps): JSX.Element => {
  const styles: StyleProps = useStyles();

  return <View style={styles.container}>{props.children && props.children}</View>;
};

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    position: "absolute",
    top: 4,
    right: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    zIndex: 1,
  },
}));
