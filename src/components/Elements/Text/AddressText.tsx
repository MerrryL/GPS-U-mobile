import React from "react";
import NormalText from "./NormalText";

type AddressTextProps = {
  address?: string;
  containerStyle?: any;
  addressStyle?: any;
};
export default function AddressText(props: AddressTextProps) {
  const {
    address,
    containerStyle = { flexDirection: "row", alignItems: "baseline" },
    addressStyle = null,
  } = props;

  return (
    <NormalText
      boldText="Adresse"
      text={address ?? "Non précisée"}
      containerStyle={containerStyle}
      textStyle={addressStyle}
    />
  );
}
