import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import NormalText from "./NormalText";

type AddressTextProps = {
  boldText?: string;
  address?: string;
};

type StyleProps = {
  containerStyle?: StyleProp<ViewStyle>;
  addressStyle?:StyleProp<TextStyle>;
};
export default function AddressText({boldText= "Adresse", address = "Non précisée", containerStyle = { flexDirection: "row", alignItems: "baseline" }, addressStyle = undefined }: AddressTextProps & StyleProps):JSX.Element {

    if (!address) {
    return <NormalText boldText={boldText} text="Adresse non renseignée" containerStyle={containerStyle} textStyle={addressStyle} />;
  }
  return <NormalText boldText={boldText} text={address} containerStyle={containerStyle} textStyle={addressStyle} />;
}
