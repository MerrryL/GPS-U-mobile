import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import NormalText from "@/components/Elements/Text/NormalText";
import { Field } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
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

  const fieldQuery = useField({ fieldId: field.id, observationId, fieldGroupId });
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
      <NormalText boldText={fieldQuery?.data?.name} text={fieldQuery?.data?.isRequired ? "Champ obligatoire" : "Champ non obligatoire"} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.white,
  },
  cardTitle: {
    alignSelf: "stretch",
    padding: 2,
    marginBottom: 0,
    backgroundColor: theme?.colors?.primary,
  },
  body: {},
}));
