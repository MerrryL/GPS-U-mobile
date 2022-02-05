import React, { useState } from "react";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import NormalText from "./NormalText";

type LongTextProps = {
  boldText?: string;
  text: string;
  containerStyle?: any;
  boldTextStyle?: any;
  textStyle?: any;
  maxLength?: number;
};

export default function LongText(props: LongTextProps) {
  const { boldText = null, text, containerStyle = null, boldTextStyle = null, textStyle = null, maxLength } = props;

  const shortenedText = text?.substring(0, maxLength ?? 40) ?? null;

  const [seeMore, toggleSeeMore] = useState(true);

  return (
    <>
      <NormalText {...props} text={text !== shortenedText ? (seeMore ? shortenedText + "..." : text) : text} />
      {text !== shortenedText && (
        <TouchableOpacity onPress={() => toggleSeeMore(!seeMore)}>
          <Text
            style={{
              alignSelf: "flex-end",
              fontStyle: "italic",
              color: "blue",
            }}
          >
            Voir {seeMore ? "plus" : "moins"}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
