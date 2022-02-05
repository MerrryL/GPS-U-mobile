import React from "react";
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from "react-native";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Task } from "@/types";
import { useTask } from "../hooks/useTask";

type TaskCardProps = {
  task: Task;
  followupId: string;
  constatationId: string;
};

export function TaskCard({ taskId, followupId, observationId }: TaskCardProps) {
  const TaskQuery = useTask({ taskId, observationId, followupId });
  const taskDeleteMutation = useDeleteTask({
    taskId,
    observationId,
    followupId,
  });

  const onDeleteSubmit = async () => {
    //todo: pause
    await taskDeleteMutation.mutateAsync({ taskId, observationId, followupId });
  };
  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Card.Title>{TaskQuery?.data?.name}</Card.Title>
        <Text h4>Nom: {TaskQuery?.data?.name}</Text>
        <Text h4>Description: {TaskQuery?.data?.description}</Text>
        <Text h4>Date de réalisation: {TaskQuery?.data?.realisation_date}</Text>
        <Text h4>Date butoir: {TaskQuery?.data?.report_date}</Text>
        <Text h4>Périodicité: {TaskQuery?.data?.report_periodicity}</Text>
        <Text h4>Statut: {TaskQuery?.data?.task_status_id}</Text>
        <Button title="Supprimer le champ" onPress={onDeleteSubmit} />
      </Card>
    </View>
  );
}
