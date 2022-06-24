import { Colors, Text, Theme } from "@rneui/base";
import { capitalize } from "lodash";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { makeStyles } from "@rneui/themed";

interface NormalTextProps {
  boldText?: string;
  text?: string;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  boldText: StyleProp<TextStyle>;
  text: StyleProp<TextStyle>;
}

export default function NormalText({ boldText = undefined, text = undefined }: NormalTextProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return (
    <View style={styles.container}>
      {boldText && <Text style={styles.boldText}>{capitalize(boldText + ": ")}</Text>}
      {text && <Text style={styles.text}>{capitalize(text)}</Text>}
    </View>
  );
}

const useStyles =makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    alignItems: "baseline",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingBottom: "8px"
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "4px",
    // color: theme?.colors?.grey3,
  },
  text: {
    marginBottom: "4px",
  },
}));
