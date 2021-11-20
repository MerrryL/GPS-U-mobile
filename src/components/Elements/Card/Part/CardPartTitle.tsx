import { capitalize } from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";

type CardPartTitleProps = {
    title: string;
    containerStyle?: any;
    titleStyle?: any;
}
export default function CardPartTitle(props: CardPartTitleProps) {
  const { title, containerStyle, titleStyle } = props;
  const styles = useStyles();

  const kContainerStyle = {
    ...styles.container,
    ...containerStyle,
  };

  const kTitleStyle = {
    ...styles.title,
    ...titleStyle,
  };

  return (
    <View style={kContainerStyle}>
      <Text h4 style={kTitleStyle}>
        {capitalize(title) + ":"}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
  title: {},
}));
