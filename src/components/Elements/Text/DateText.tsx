import formatDate from "@/utils/formatDate";
import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import NormalText from "./NormalText";

type DateTextProps = {
  boldText?: string;
  preDateText?: string;
  date: string;
};

type StyleProps = {
  containerStyle?: StyleProp<ViewStyle>;
  dateStyle?:StyleProp<TextStyle>;
};

export default function DateText({ boldText = "Date", preDateText = "Le ", date, containerStyle = { flexDirection: "row" }, dateStyle = undefined }: DateTextProps & StyleProps):JSX.Element {

  if (!date) {
    return <NormalText boldText={boldText} text="Date non renseignée" containerStyle={containerStyle} textStyle={dateStyle} />;
  }

  return <NormalText boldText={boldText} text={ preDateText + formatDate(date)} containerStyle={containerStyle} textStyle={dateStyle} />;
}
