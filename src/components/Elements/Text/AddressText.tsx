import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import NormalText from "./NormalText";

type AddressTextProps = {
  address?: string;
};
type StyleProps = {
  containerStyle?: StyleProp<ViewStyle>;
  addressStyle?:StyleProp<TextStyle>;
};
export default function AddressText({ address = "Non précisée", containerStyle = { flexDirection: "row", alignItems: "baseline" }, addressStyle = undefined }: AddressTextProps & StyleProps):JSX.Element {

  return <NormalText boldText="Adresse" text={address} containerStyle={containerStyle} textStyle={addressStyle} />;
}
