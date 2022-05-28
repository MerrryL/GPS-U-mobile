import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Card } from "react-native-elements";
import { ObservationStackParamList } from "..";
import { ObservationEditCard } from "../components/Edit/ObservationEditCard";
import { useObservation } from "../hooks/useObservation";

interface ObservationEditProps {
  navigation: StackNavigationProp<ObservationStackParamList, "Edition">;
  route: RouteProp<ObservationStackParamList, "Edition">;
}

export default function Edit(props: ObservationEditProps) {
  const observationId = props.route.params.observationId;

  const observationQuery = useObservation({
    observationId: observationId,
  });
  const observation = observationQuery?.data;

  return observation !== undefined ? <ObservationEditCard observation={observation} /> : <Card>Error</Card>;
}
