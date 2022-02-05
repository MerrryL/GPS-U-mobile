import React from "react";
import { FAB, Card, Text, Button, Input } from "react-native-elements";
import { View } from "react-native";
import { Followup } from "@/types";
import { useFollowup } from "../hooks/useFollowup";
import { FieldCard } from "../../fieldgroups/subfeatures/fields/components/FieldCard";
import { useDeleteFollowup } from "../hooks/useDeleteFollowups";
import { TaskAdd } from "../subfeatures/tasks/components/TaskAdd";
import { TaskCard } from "../subfeatures/tasks/components/Task";

type FollowupCardProps = {
  followupId: string;
  observationId: string;
};

export function FollowupCard({ followupId, observationId }: FollowupCardProps) {
  const FollowupQuery = useFollowup({
    followupId: followupId,
    observationId: observationId,
  });
  const followup = FollowupQuery?.data;

  const followupDeleteMutation = useDeleteFollowup({
    observationId: observationId,
    followupId: followup.id,
  });

  const onDeleteSubmit = async () => {
    await followupDeleteMutation.mutateAsync({
      observationId: observationId,
      followupId: followupId,
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Button title="Supprimer le suivi" onPress={onDeleteSubmit} />
        <Card.Title>Suivi: {followup?.name}</Card.Title>
        <Text>Decription: {followup?.description}</Text>
        {/* <Text>Superviseur: {followup?.supervisor?.lastName + " " + followup?.supervisor?.firstName}</Text> */}
        <Text>Etat: {followup?.followup_status?.name}</Text>
        <TaskAdd observationId={observationId} followupId={followup?.id} />
        {followup?.tasks?.map((task) => (
          <TaskCard taskId={task?.id} observationId={observationId} followupId={task?.followup_id} key={task?.id} />
        ))}
      </Card>
    </View>
  );
}
