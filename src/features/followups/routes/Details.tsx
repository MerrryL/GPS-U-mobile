import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";
import { Card, Button, Icon, Text, Input } from "react-native-elements";


import { useObservation } from "../hooks/useObservation";


type Params = {
  observationId: string;
};

type DetailsProps = {
  route: Route;
};

type Route = {
  params: Params;
};

export default function Details({ route }: DetailsProps) {
  const observationQuery = useObservation({
    observationId: route.params.observationId,
  });

  const navigation = useNavigation();

  return (
    <Card>
      
    </Card>
  );
}
