import { capitalize } from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";

type CardPartTextProps = {
  boldText?:string;
  text?: string;
  containerStyle?: any;
  boldTextStyle?: any;
  textStyle?: any;
}
export default function CardPartText(props: CardPartTextProps) {
  const { boldText = null, text = null, containerStyle = null, boldTextStyle = null, textStyle = null} = props;

  const styles = useStyles();

  const kContainerStyle = {
    flexDirection: 'row',
    ...styles.container,
    ...containerStyle,
  };

  const kBoldTextStyle = {
    fontWeight: 'bold',
    ...styles.boldText,
    ...boldTextStyle,
  };

  const kTextStyle = {
    ...styles.text,
    ...textStyle,
  };
  
  return (
    <View style={kContainerStyle}>
      { boldText && 
        <Text style={kBoldTextStyle}>
        {capitalize(boldText+ ": ")}
        </Text>
      }
      { text && 
        <Text style={kTextStyle}>
          {capitalize(text)}
        </Text>
      }
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    
  },
  boldText:{
    
  },
  text: {
    // color: theme.colors.grey3
  },
}));
