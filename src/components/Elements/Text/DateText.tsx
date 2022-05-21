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

export default function DateText({ boldText = "Date", preDateText = "Le ", date, containerStyle = { flexDirection: "row" }, dateStyle = null }: DateTextProps & StyleProps):JSX.Element {

  if (!date) {
    return <NormalText boldText="boldText" text="Pas de date valide" containerStyle={containerStyle} textStyle={dateStyle} />;
  }

  const text = preDateText + formatDate(date);

  return <NormalText boldText={boldText} text={preDateText + text} containerStyle={containerStyle} textStyle={dateStyle} />;
}
