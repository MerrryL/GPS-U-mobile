import formatDate from "@/utils/formatDate";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";
import NormalText from "./NormalText";

type DateTextProps = {
  boldText?:string;
  preDateText?: string;
  date: string;
  containerStyle?: any;
  dateStyle?: any;
}
export default function DateText(props: DateTextProps) {
  const { boldText = "Date", preDateText = "Le ", date, containerStyle = {flexDirection: 'row'}, dateStyle = null} = props;

  if (!date) 
  {
    return (
      <NormalText {...props} boldText="boldText" text="Pas de date valide" containerStyle={containerStyle} textStyle={dateStyle}/>
    );
  }

  const text = preDateText + formatDate(date);



  return (
    <NormalText {...props} boldText={boldText} text={text} containerStyle={containerStyle} textStyle={dateStyle}/>
  );
}