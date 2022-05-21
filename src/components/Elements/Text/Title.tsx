import { capitalize } from "lodash";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";

type TitleProps = {
  title?: string;
};

type StyleProps = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};


export default function Title({ title=undefined, containerStyle=undefined, titleStyle=undefined }: TitleProps & StyleProps):JSX.Element {
  const styles = useStyles({ containerStyle: containerStyle, titleStyle: titleStyle });

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {capitalize(title) + ":"}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>, { containerStyle, titleStyle }: StyleProps) => ({
  container: {
    paddingLeft: "10px",
    containerStyle,
  },
  title: {
    fontWeight: "bold",
    color: theme?.colors?.grey2,
    titleStyle,
  },
}));
