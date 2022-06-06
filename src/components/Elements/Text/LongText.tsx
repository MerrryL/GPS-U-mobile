import { Text } from "@rneui/base";
import React, { useState } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NormalText from "./NormalText";

type LongTextProps = {
  boldText?: string;
  text: string;
  maxLength?: number;
};

type StyleProps = {
  containerStyle?: StyleProp<ViewStyle>;
  boldTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function LongText({ boldText = undefined, text, containerStyle = undefined, boldTextStyle = undefined, textStyle = undefined, maxLength }: LongTextProps & StyleProps): JSX.Element {
  const shortenedText = text?.substring(0, maxLength ?? 40) ?? null;
  const [seeMore, toggleSeeMore] = useState(true);

  return (
    <>
      <NormalText {...boldTextStyle} text={text !== shortenedText ? (seeMore ? shortenedText + "..." : text) : text} />
      {text !== shortenedText && (
        <TouchableOpacity onPress={(): void => toggleSeeMore(!seeMore)}>
          <Text
            style={{
              alignSelf: "flex-end",
              fontStyle: "italic",
              color: "blue",
            }}
            {...textStyle}
          >
            Voir {seeMore ? "plus" : "moins"}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
