import { capitalize } from "lodash";
import React from "react";
import { View } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";

type NormalTextProps = {
  boldText?: string;
  text?: string;
  containerStyle?: any;
  boldTextStyle?: any;
  textStyle?: any;
};

type StyleProps = any;

export default function NormalText(props: NormalTextProps) {
  const { boldText = null, text = null, containerStyle = null, boldTextStyle = null, textStyle = null } = props;

  const styles = useStyles({
    container: containerStyle,
    text: textStyle,
    boldText: boldTextStyle,
  });

  return (
    <View style={styles.container}>
      {boldText && <Text style={styles.boldText}>{capitalize(boldText + ": ")}</Text>}
      {text && <Text style={styles.text}>{capitalize(text)}</Text>}
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>, props: StyleProps) => ({
  container: {
    alignItems: "baseline",
    paddingLeft: "10px",
    paddingRight: "10px",
    ...props.container,
  },
  boldText: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "5px",
    color: theme?.colors?.grey3,
    ...props.boldText,
  },
  text: {
    marginBottom: "5px",
    ...props.text,
  },
}));
