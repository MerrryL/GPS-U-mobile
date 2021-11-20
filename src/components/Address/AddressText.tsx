
import React, { useState } from "react";
import { View } from "react-native";
import { Text, makeStyles } from "react-native-elements";
import CardPartText from "../Elements/Card/Part/CardPartText";

type AddressTextProps = {
  address?: string;
  containerStyle?: any;
  addressStyle?: any;
}
export default function AddressText(props: AddressTextProps) {
  const {address, containerStyle = null, addressStyle = null} = props;

  const noAddress = "Non précisée";

  const text = address;

  const styles = useStyles();

  const kContainerStyle = {
    flexDirection: 'row',
    ...styles.container,
    ...containerStyle,
  };

  const kAddressStyle = {
    ...styles.address,
    ...addressStyle,
  };
  
  return (
    <CardPartText {...props} boldText="Adresse" text={address ?? noAddress} containerStyle={kContainerStyle} textStyle={kAddressStyle}/>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    
  },
  address: {
  },
}));
