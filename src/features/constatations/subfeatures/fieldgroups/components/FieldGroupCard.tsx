import { FieldGroup } from "@/types";
import { Button, Card, Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import { FieldsAdd } from "../../fields/components/FieldAdd";
import { FieldCard } from "../../fields/components/FieldCard";
import { useFields } from "../../fields/hooks/useFields";
import { useDeleteFieldGroup } from "../hooks/useDeleteFieldGroups";
import { useFieldGroup } from "../hooks/useFieldGroup";

type FieldGroupCardProps = {
  fieldGroup: FieldGroup;
  constatationId: number;
};

export function FieldGroupCard({ fieldGroup, constatationId }: FieldGroupCardProps) {
  const FieldGroupQuery = useFieldGroup({
    fieldGroupId: fieldGroup.id,
  });
  const FieldQuery = useFields({
    fieldGroupId: fieldGroup.id,
  });

  const fieldDeleteMutation = useDeleteFieldGroup({
    constatationId: constatationId,
    fieldGroupId: fieldGroup.id,
  });

  const onDeleteSubmit = async () => {
    //todo: pause
    await fieldDeleteMutation.mutateAsync({
      constatationId: constatationId,
      fieldGroupId: fieldGroup.id,
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <Card>
        <Button title="Supprimer le groupe" onPress={onDeleteSubmit} />
        <Card.Title>Groupe: {fieldGroup.name}</Card.Title>
        <Text h4>Type: {fieldGroup.type}</Text>
        <Text>Opérateur logique: {fieldGroup.logical_operator}</Text>
        <FieldsAdd constatationId={constatationId} fieldGroupId={fieldGroup.id} />
        {FieldQuery?.data?.map((field) => (
          <FieldCard field={field} constatationId={constatationId} fieldGroupId={fieldGroup.id} key={field.id} />
        ))}
      </Card>
    </View>
  );
}
