import OpenCoords from "@/components/Address/OpenCoordsLink";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import NormalText from "@/components/Elements/Text/NormalText";
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
      {localization && localization.latitude && localization.longitude && (
        <FloatingButtonStack>
          <OpenCoords latitude={localization.latitude} longitude={localization.longitude} />
        </FloatingButtonStack>
      )}
      <NormalText boldText="Adresse" text={localization?.formatted_address ?? "Non renseigné"} />
      <NormalText boldText="Lieu-dit" text={localization?.given_name ?? "Non renseigné"} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    padding: 3,
    margin: 3,
  },
}));
