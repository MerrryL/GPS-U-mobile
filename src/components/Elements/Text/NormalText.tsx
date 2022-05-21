import { capitalize } from "lodash";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";

type TextProps = {
  boldText?: string;
  text?: string;
};

type StyleProps = {
  containerStyle?: StyleProp<ViewStyle>;
  boldTextStyle?: StyleProp<TextStyle>;
  textStyle?:StyleProp<TextStyle>;
};

export default function NormalText({ boldText = undefined, text = undefined, containerStyle = undefined, boldTextStyle = undefined, textStyle = undefined}:TextProps & StyleProps):JSX.Element {

  const styles = useStyles({
    containerStyle: containerStyle,
    textStyle: textStyle,
    boldTextStyle: boldTextStyle,
  });

  return (
    <View style={styles.container}>
      {boldText && <Text style={styles.boldText}>{capitalize(boldText + ": ")}</Text>}
      {text && <Text style={styles.text}>{capitalize(text)}</Text>}
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>, { containerStyle, boldTextStyle, textStyle}: StyleProps) => ({
  container: {
    alignItems: "baseline",
    paddingLeft: "10px",
    paddingRight: "10px",
    containerStyle,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "5px",
    color: theme?.colors?.grey3,
    boldTextStyle,
  },
  text: {
    marginBottom: "5px",
    textStyle,
  },
}));
