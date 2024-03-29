import { Field } from "@/types";
import { Button, Card, Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import { useDeleteField } from "../hooks/useDeleteField";
import { useField } from "../hooks/useField";

type FieldCardProps = {
  field: Field;
  fieldGroupId: string;
  constatationId: number;
};

export function FieldCard({ field, fieldGroupId, constatationId }: FieldCardProps) {
  const FieldQuery = useField({ fieldId: field.id });
  const fieldDeleteMutation = useDeleteField({
    constatationId: constatationId,
    fieldGroupId: fieldGroupId,
    fieldId: field.id,
  });

  const onDeleteSubmit = async () => {
    //todo: pause
    await fieldDeleteMutation.mutateAsync({
      constatationId: constatationId,
      fieldGroupId: fieldGroupId,
      fieldId: field.id,
    });
  };
  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Card.Title>{FieldQuery?.data?.name}</Card.Title>
        <Text h4>Type: {FieldQuery?.data?.type}</Text>
        <Text>Valeur: {FieldQuery?.data?.value}</Text>
        <Button title="Supprimer le champ" onPress={onDeleteSubmit} />
      </Card>
    </View>
  );
}
