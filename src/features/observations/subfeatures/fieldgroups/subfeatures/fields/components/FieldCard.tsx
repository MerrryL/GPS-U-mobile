import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import { Field } from "@/types";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles, Text } from "react-native-elements";
import { useDeleteField } from "../hooks/useDeleteField";
import { useField } from "../hooks/useField";

interface FieldCardProps {
  field: Field;
  fieldGroupId: number;
  observationId: number;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cardTitle: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
}

export function FieldCard({ field, fieldGroupId, observationId }: FieldCardProps) {
  const styles: StyleProps = useStyles();

  const FieldQuery = useField({ fieldId: field.id, observationId, fieldGroupId });
  const fieldDeleteMutation = useDeleteField({
    fieldId: field.id,
    observationId,
    fieldGroupId,
  });

  const onDeleteSubmit = async () => {
    //todo: pause
    await fieldDeleteMutation.mutateAsync({
      fieldId: field.id,
      observationId,
      fieldGroupId,
    });
  };
  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <DeleteButton callBack={onDeleteSubmit} />
      </FloatingButtonStack>
      <Card.FeaturedTitle style={styles.cardTitle}>{FieldQuery?.data?.name}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>Type: {FieldQuery?.data?.type}</Card.FeaturedSubtitle>
      <Text h4>{FieldQuery?.data?.isRequired ? "Champ obligatoire" : "Champ non obligatoire"}</Text>
    </Card>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.colors?.grey5,
  },
  cardTitle: {
    alignSelf: "stretch",
    padding: 2,
    marginBottom: 0,
    backgroundColor: theme.colors?.primary,
  },
  body: {},
}));
