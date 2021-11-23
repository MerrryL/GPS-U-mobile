import { capitalize } from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";

type TitleProps = {
    title: string;
    containerStyle?: any;
    titleStyle?: any;
}

type StyleProps = any;

export default function Title(props: TitleProps) {
  const { title, containerStyle, titleStyle } = props;
  const styles = useStyles({container: containerStyle, title: titleStyle});

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {capitalize(title) + ":"}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((theme, props:StyleProps) => ({
  container: {
    ...props.container
  },
  title: {
    fontWeight: "bold", 
    color: theme?.colors?.grey2,
    ...props.title
  },
}));
