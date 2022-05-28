import { Constatation } from "@/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Card } from "react-native-elements/dist/card/Card";
import { ConstatationStackParamList } from "..";
import { ConstatationEditCard } from "../components/Edit/ConstatationEditCard";
import { useConstatation } from "../hooks/useConstatation";

interface ConstatationEditProps {
  navigation: StackNavigationProp<ConstatationStackParamList, "Edition">;
  route: RouteProp<ConstatationStackParamList, "Edition">;
};

export default function Edit(props: ConstatationEditProps):JSX.Element {
  const constatationId = props.route?.params?.constatationId;

  const constatation:Constatation | undefined = useConstatation({
    constatationId: constatationId,
  })?.data;

  return constatation !== undefined ? <ConstatationEditCard constatation={constatation} /> : <Card>Error</Card>;
}
