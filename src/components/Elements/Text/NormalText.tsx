import { Text } from "@rneui/base";
import { capitalize } from "lodash";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";

interface NormalTextProps {
  boldText?: string;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  boldTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  boldText: StyleProp<TextStyle>;
  text: StyleProp<TextStyle>;
}

export default function NormalText({ boldText = undefined, text = undefined, containerStyle = undefined, boldTextStyle, textStyle = undefined }: NormalTextProps): JSX.Element {
  const styles: StyleProps = useStyles({
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

const useStyles = ({ containerStyle, boldTextStyle, textStyle }: any) => ({
  container: {
    alignItems: "baseline",
    paddingLeft: "10px",
    paddingRight: "10px",
    containerStyle,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "5px",
    // color: theme?.colors?.grey3,
    ...boldTextStyle,
  },
  text: {
    marginBottom: "5px",
    textStyle,
  },
});
