import { Task } from "@/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-elements";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const {
    created_at,
    deleted_at,
    description,
    followup,
    followup_id,
    id,
    name,
    operators,
    realisation_date,
    report_date,
    report_periodicity,
    task_status,
    task_status_id,
    updated_at,
  } = task;
  const navigation = useNavigation();

  //console.log(task);
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
        <Text>Nom: {name}</Text>
        <Text>Description: {description}</Text>
        <Text>Etat TODO </Text>
        <Text>Suivi TODO</Text>
        <Text>Opérateurs TODO</Text>
        <Text>Date butoir: {report_date}</Text>
        <Text>Périodicité: {report_periodicity}</Text>
        <Text>Date de réalisation: {realisation_date}</Text>
        <Text>Dernière modification {updated_at}</Text>
      </View>
    </Card>
  );
}
