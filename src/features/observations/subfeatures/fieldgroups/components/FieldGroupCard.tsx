import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import { Observation } from "@/types";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { useDeleteObservationFieldGroup } from "../hooks/useDeleteObservationFieldGroups";
import { useObservationFieldGroup } from "../hooks/useObservationFieldGroup";

type ObservationFieldGroupCardProps = {
  fieldGroupId: number;
  observation: Observation;
};

export function FieldGroupCard({ fieldGroupId, observation }: ObservationFieldGroupCardProps) {
  const ObservationFieldGroupQuery = useObservationFieldGroup({ observationId: observation.id, fieldGroupId });
  const fieldGroup = ObservationFieldGroupQuery.data;

  const fieldGroupDeleteMutation = useDeleteObservationFieldGroup({
    observationId: observation.id,
    fieldGroupId: fieldGroupId,
  });

  const onDeleteSubmit = async () => {
    await fieldGroupDeleteMutation.mutateAsync({
      observationId: observation.id,
      fieldGroupId: fieldGroupId,
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <Card>
        <DeleteButton callBack={onDeleteSubmit} />
        <Card.Title>Groupe: {fieldGroup?.name}</Card.Title>
        <Text>Type: {fieldGroup?.type}</Text>
        <Text>Opérateur logique: {fieldGroup?.logical_operator}</Text>
        {/* <FieldsAdd observation={observation} fieldGroup={fieldGroup} />
        {fieldGroup?.fields?.map((field) => (
          <FieldCard fieldId={field?.id} observationId={observationId} fieldGroupId={field?.field_group_id} key={field?.id} />
        ))} */}
      </Card>
    </View>
  );
}
