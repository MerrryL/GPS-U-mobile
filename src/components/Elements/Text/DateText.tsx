import formatDate from "@/utils/formatDate";
import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import NormalText from "./NormalText";

interface DateTextProps {
  boldText?: string;
  preDateText?: string;
  date: string;
  containerStyle?: StyleProp<ViewStyle>;
  dateStyle?: StyleProp<TextStyle>;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function DateText({ boldText = "Date", preDateText = "Le ", date, containerStyle = { flexDirection: "row" }, dateStyle = undefined }: DateTextProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Card containerStyle={styles.container}>{!date ? <NormalText boldText={boldText} text="Date non renseignée" containerStyle={containerStyle} textStyle={dateStyle} /> : <NormalText boldText={boldText} text={preDateText + formatDate(date)} containerStyle={containerStyle} textStyle={dateStyle} />}</Card>;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    padding: 3,
    margin: 3,
    // backgroundColor: theme.colors?.grey5,
  },
}));
