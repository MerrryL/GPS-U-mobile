import { capitalize } from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardPartText from "./CardPartText";

type CardPartLongTextProps = {
  boldText?:string;
  text: string;
  containerStyle?: any;
  boldTextStyle?: any;
  textStyle?: any;
  maxLength?: number;
}
export default function CardPartLongText(props: CardPartLongTextProps) {
  const { boldText = null, text, containerStyle = null, boldTextStyle = null, textStyle = null, maxLength} = props;

  const styles = useStyles();

  const shortText= text.substring(0,maxLength ?? 40);

  const [seeMore, toggleSeeMore] = useState(true);

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
      <>
        <CardPartText {...props} text={ 
          text !== shortText 
            ? seeMore 
              ? shortText + "..."
              : text 
            : text
          }
        />
        { text !== shortText &&
          <TouchableOpacity onPress={() => toggleSeeMore(!seeMore)}>
            <Text style={{alignSelf:"flex-end", fontStyle:"italic", color:"blue"}} >Voir {seeMore ? "plus" : "moins"}</Text>
          </TouchableOpacity>
        }
      </>
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
