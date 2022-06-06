import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DeleteButton from "@/components/Elements/Buttons/DeleteButton";
import NormalText from "@/components/Elements/Text/NormalText";
import { Field, FieldGroup, Observation } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useDeleteObservationFieldGroup } from "../hooks/useDeleteObservationFieldGroups";
import { useObservationFieldGroup } from "../hooks/useObservationFieldGroup";
import { FieldsAdd } from "../subfeatures/fields/components/FieldAdd";
import { FieldCard } from "../subfeatures/fields/components/FieldCard";

interface ObservationFieldGroupCardProps {
  fieldGroupId: number;
  observation: Observation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cardTitle: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
}

export function FieldGroupCard({ fieldGroupId, observation }: ObservationFieldGroupCardProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const ObservationFieldGroupQuery = useObservationFieldGroup({ observationId: observation.id, fieldGroupId });
  const fieldGroup: FieldGroup | undefined = ObservationFieldGroupQuery.data;

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
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <DeleteButton callBack={onDeleteSubmit} />
      </FloatingButtonStack>
      <Card.FeaturedTitle style={styles.cardTitle}>Questionnaire: {fieldGroup?.name}</Card.FeaturedTitle>
      <NormalText text={fieldGroup?.description} />

      {fieldGroup?.fields?.map(
        (field: Field): JSX.Element => (
          <FieldCard field={field} observationId={observation.id} fieldGroupId={fieldGroup.id} key={field?.id} />
        )
      )}

      {fieldGroup?.fields.length === 0 && <Card.Title>Aucune question définie actuellement</Card.Title>}

      {fieldGroup && <FieldsAdd observation={observation} fieldGroup={fieldGroup} />}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
  },
  cardTitle: {
    alignSelf: "stretch",
    padding: 8,
    marginBottom: 0,
    backgroundColor: theme?.colors?.primary,
  },
  body: {},
}));
