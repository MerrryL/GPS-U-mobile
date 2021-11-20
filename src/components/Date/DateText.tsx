import formatDate from "@/utils/formatDate";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";
import CardPartText from "../Elements/Card/Part/CardPartText";

type DateTextProps = {
  boldText?:string;
  preDateText?: string;
  date: string;
  containerStyle?: any;
  dateStyle?: any;
}
export default function DateText(props: DateTextProps) {
  const { boldText = "Date", preDateText = "Le ", date, containerStyle = null, dateStyle = null} = props;

  if (!date) 
  {
    return (
      <CardPartText {...props} boldText={"boldText"} text={"Pas de date valide"} containerStyle={kContainerStyle} textStyle={kDateStyle}/>
    );
  }

  const text = preDateText + formatDate(date);

  const styles = useStyles();

  const kContainerStyle = {
    flexDirection: 'row',
    ...styles.container,
    ...containerStyle,
  };

  const kDateStyle = {
    ...styles.date,
    ...dateStyle,
  };

  return (
    <CardPartText {...props} boldText={boldText} text={text} containerStyle={kContainerStyle} textStyle={kDateStyle}/>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    
  },
  date: {
    // color: theme.colors.grey3
  },
}));
