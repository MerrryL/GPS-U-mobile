import { useConstatations } from "@/features/constatations/hooks/useConstatations";
import { Constatation, Localization } from "@/types";
import { Button, Card, Colors, Input, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { ScrollView, StyleProp, TextStyle, ViewStyle } from "react-native";
import { LatLng } from "react-native-maps";
import { UseQueryResult } from "react-query";
import Map from "@/components/Address/Map";

interface StyleProps {
  container: StyleProp<ViewStyle>;
  buttons: StyleProp<ViewStyle>;
  coordsContainer: StyleProp<ViewStyle>;
  input: StyleProp<TextStyle>;
  coords: StyleProp<TextStyle>;
}

export function MapsScreen() {
  const styles: StyleProps = useStyles();
  const constatationsQuery: UseQueryResult<Constatation[]> = useConstatations();

  const markers: LatLng[] | undefined = constatationsQuery.data?.map((constatation: Constatation): Localization => constatation.localization).filter((loc: Localization) => !!loc.latitude && !!loc.longitude);

  return (
    <ScrollView>
      <Map
        markers={markers ? markers : []}
      />
    </ScrollView>
  );
}
const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
    display: "flex",
  },
  coordsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme?.colors?.white,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    flexGrow: 1,
    backgroundColor: theme?.colors?.white,
  },
  input: {
    fontSize: 12,
  },
  coords: {
    flexBasis: "50%",
  },
}));
