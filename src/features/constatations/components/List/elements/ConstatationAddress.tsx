import OpenCoords from "@/components/Address/OpenCoordsLink";
import AddressText from "@/components/Elements/Text/AddressText";
import { Localization } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

type ConstatationAddressProps = {
  localization: Localization;
};

//TODO : implement addresss functionnality
//Create, add, delete, link
interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function ConstatationAddress(props: ConstatationAddressProps): JSX.Element {
  const { localization } = props;
  const styles: StyleProps = useStyles();

  return (
    <Card containerStyle={styles.container}>
      <AddressText address={localization?.formatted_address} />
      {localization && localization.latitude && localization.longitude && <OpenCoords latitude={localization.latitude} longitude={localization.longitude} />}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    padding: 3,
    margin: 3,
  },
}));
