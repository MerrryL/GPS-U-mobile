import formatDate from "@/utils/formatDate";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import NormalText from "./NormalText";

interface DateTextProps {
  boldText?: string;
  preDateText?: string;
  date: string;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function DateText({ boldText = "Date", preDateText = "Le ", date }: DateTextProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return (
    <>
      <NormalText boldText={boldText}></NormalText>
      {!date ? <NormalText text="Date non renseignée" /> : <NormalText text={preDateText + formatDate(date)} />}
    </>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
}));
