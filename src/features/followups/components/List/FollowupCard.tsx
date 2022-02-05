import React from "react";

import { Followup } from "@/types";
import { useNavigation } from "@react-navigation/native";

import { Card, Image, Button, Icon, Divider, Text } from "react-native-elements";

import { View } from "react-native";
import { id } from "date-fns/locale";

type followupCardProps = {
  followup: Followup;
};

export function FollowupCard({ followup }: followupCardProps) {
  const navigation = useNavigation();

  const { constatation, created_at, deleted_at, description, followup_status, id, name, observation_id, supervisors, tasks, updated_at } = followup;

  //console.log(followup);
  return (
    <Card>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button title="Edit" style={{ marginRight: 10 }} onPress={() => navigation.navigate("Edition", { observationId: observation?.id })} />
        <Button title="Détails" style={{ marginRight: 10 }} onPress={() => navigation.navigate("Details", { observationId: observation?.id })} />
      </View>
      <View>
        <Text>Date de création: {created_at}</Text>
        <Text>Date de suppression: {deleted_at}</Text>
        <Text>Description:{description}</Text>
        {/* <Text>Statut: TODO{followup_status}</Text> */}
        <Text>Nom: {name}</Text>
        {/* <Text>Observation: TODO {observation_id}</Text> */}
        {/* <Text>Superviseurs: TODO{supervisors}</Text> */}
        {/* <Text>Taches: TODO{tasks}</Text> */}
        <Text>Date de mise à jour: {updated_at}</Text>
      </View>
    </Card>
  );
}
