import NormalText from "@/components/Elements/Text/NormalText";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card } from "@rneui/base";
import React from "react";
import { ObservationStackParamList } from "..";
import { ObservationListCard } from "../components/List/ObservationCard";
import { useObservation } from "../hooks/useObservation";

interface DetailsProps {
  navigation: StackNavigationProp<ObservationStackParamList, "Détails">;
  route: RouteProp<ObservationStackParamList, "Détails">;
}

export default function Details({ route, navigation }: DetailsProps): JSX.Element {
  const observationQuery = useObservation({
    observationId: route.params.observationId,
  });

  return observationQuery.data ? (
    <ObservationListCard observation={observationQuery.data} />
  ) : (
    <Card>
      <NormalText boldText="Erreur: il n'y a pas de constatation"></NormalText>
    </Card>
  );
}
