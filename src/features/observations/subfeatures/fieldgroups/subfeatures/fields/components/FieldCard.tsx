import { Field } from "@/types";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import { useDeleteField } from "../hooks/useDeleteField";
import { useField } from "../hooks/useField";

type FieldCardProps = {
  field: Field;
  fieldGroupId: string;
  constatationId: number;
};

export function FieldCard({ fieldId, fieldGroupId, observationId }: FieldCardProps) {
  const FieldQuery = useField({ fieldId, observationId, fieldGroupId });
  const fieldDeleteMutation = useDeleteField({
    fieldId,
    observationId,
    fieldGroupId,
  });

  const onDeleteSubmit = async () => {
    //todo: pause
    await fieldDeleteMutation.mutateAsync({
      fieldId,
      observationId,
      fieldGroupId,
    });
  };
  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Card.Title>{FieldQuery?.data?.name}</Card.Title>
        <Text h4>Type: {FieldQuery?.data?.type}</Text>
        <Text h5>{FieldQuery?.data?.isDefault ? "Champ obligatoire" : "Champ non obligatoire"}</Text>
        <Button title="Supprimer le champ" onPress={onDeleteSubmit} />
      </Card>
    </View>
  );
}
