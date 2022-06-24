import NormalText from "@/components/Elements/Text/NormalText";
import { Constatation } from "@/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card } from "@rneui/base";
import React from "react";
import { UseQueryResult } from "react-query";
import { ConstatationStackParamList } from "..";
import { ConstatationListCard } from "../components/List/ConstatationListCard";
import { useConstatation } from "../hooks/useConstatation";

interface DetailsProps {
  navigation: StackNavigationProp<ConstatationStackParamList, "Détails">;
  route: RouteProp<ConstatationStackParamList, "Détails">;
}

export default function Details({ route, navigation }: DetailsProps): JSX.Element {
  const constatationQuery: UseQueryResult<Constatation> = useConstatation({
    constatationId: route.params.constatationId,
  });

  return constatationQuery.data ? (
    <ConstatationListCard constatation={constatationQuery.data} />
  ) : (
    <Card>
      <NormalText boldText="Erreur: il n'y a pas de constatation"></NormalText>
    </Card>
  );
}
