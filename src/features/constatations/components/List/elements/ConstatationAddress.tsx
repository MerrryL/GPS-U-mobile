import OpenCoords from "@/components/Address/OpenCoordsLink";
import AddressText from "@/components/Elements/Text/AddressText";
import { Localization } from "@/types";
import React from "react";
import { View } from "react-native";
import { makeStyles } from "react-native-elements";

type ConstatationAddressProps = {
  localization: Localization;
};

//TODO : implement addresss functionnality
//Create, add, delete, link

export default function ConstatationAddress(props: ConstatationAddressProps) {
  const { localization } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AddressText address={localization?.formatted_address} />
      {localization && localization.latitude && localization.longitude && (
        <OpenCoords
          latitude={localization.latitude}
          longitude={localization.longitude}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
}));
