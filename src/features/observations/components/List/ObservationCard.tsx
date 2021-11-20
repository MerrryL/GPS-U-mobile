import React from "react";

import { Observation } from "@/types";
import { useNavigation } from "@react-navigation/native";

import {
  Card,
  Image,
  Button,
  Icon,
  Divider,
  Text,
} from "react-native-elements";

import { View } from "react-native";

type observationCardProps = {
  observation: Observation;
};

export function ObservationCard({ observation }: observationCardProps) {
  const navigation = useNavigation();
  //console.log("observation", observation);

  const {  code, codex, codex_id, created_at, deleted_at, description, field_groups,  fine_amount, followups, id, name, observation_type, observation_type_id, short_description, updated_at
  } = observation;


  return (
    <Card>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title="Edit"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Edition", { observationId: observation?.id })
          }
        />
        <Button
          title="Détails"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Details", { observationId: observation?.id })
          }
        />
      </View>
      <View>
        <Text>
          Nom: {name}
        </Text>
        <Text>Code: {code}</Text>
        {/* <Text>Codex: TODO{codex}</Text> */}
        <Text>Date de création{created_at}</Text>
        <Text>Date de suppression {deleted_at}</Text>
        <Text>Description: {description}</Text>
        {/* <Text>Groupes de champs TODO{field_groups}</Text> */}
        <Text>Montant de l'amende: {fine_amount}</Text>
        {/* <Text>Suivis: {followups}</Text> */}
        {/* <Text>Type d'observation TODO{observation_type}</Text> */}
        <Text>Description sommaire{short_description}</Text>
        <Text>Date de mise à jour{updated_at}</Text>
      </View>




    </Card>
  );
}
