import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import DateText from "@/components/Elements/Text/DateText";
import { Observation } from "@/types";
import { InputedField, InputType, yupPickerItem } from "@/types/utilityTypes";
import { getCodexesOptions, getObservationTypesOptions } from "@/utils/getOptions";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { StyleProp, View, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import { UseMutationResult } from "react-query";
import * as yup from "yup";
import { UpdateObservationOptions } from "../../api";
import { useUpdateObservation } from "../../hooks/useUpdateObservation";

interface ObservationEditCardProps {
  observation: Observation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cardTitle: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
}

export function ObservationEditCard({ observation }: ObservationEditCardProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const updateObservationMutation: UseMutationResult<Observation, AxiosError<any, any>, UpdateObservationOptions, any> = useUpdateObservation();

  const observationForm: InputedField[] = [
    {
      name: "name",
      label: "nom",
      type: InputType.Text,
      value: observation.name,
      schema: yup.string().min(3).defined(),
      defaultValue: "",
    },
    {
      name: "description",
      type: InputType.Text,
      value: observation.description,
      schema: yup.string().min(50).defined(),
      defaultValue: "",
    },
    {
      name: "short_description",
      label: "description courte",
      type: InputType.Text,
      value: observation.short_description,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
    {
      name: "code",
      type: InputType.Text,
      value: observation.code,
      schema: yup.string().min(2).defined(),
      defaultValue: "",
    },
    {
      name: "fine_amount",
      label: "amende",
      type: InputType.Text,
      value: observation.fine_amount,
      schema: yup.string().min(2).defined(),
      defaultValue: "",
    },
    {
      name: "codex",
      type: InputType.Select,
      schema: yupPickerItem(),
      value: observation.codex ? { id: observation.codex.id, item: observation.codex.name } : undefined,
      defaultValue: undefined,
      options: getCodexesOptions() || [],
    },
    {
      name: "observation_type",
      label: "Type d'observation",
      type: InputType.Select,
      schema: yupPickerItem(),
      value: observation.observation_type ? { id: observation.observation_type.id, item: observation.observation_type.name } : undefined,
      defaultValue: undefined,
      options: getObservationTypesOptions() || [],
    },
  ];

  const onSubmit: SubmitHandler<Observation> = async (data: Observation): Promise<void> => {
    await updateObservationMutation.mutateAsync({
      data: { ...data, codex_id: data.codex.id, observation_type_id: data.observation_type.id },
      observationId: observation.id,
    });
  };
  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        {/* <EditButton callBack={() => navigation.navigate("Edition", { observationId: observation?.id })}></EditButton>
        <DetailsButton callBack={() => navigation.navigate("Details", { observationId: observation?.id })}></DetailsButton> */}
      </FloatingButtonStack>
      {/* <Card.FeaturedTitle style={styles.cardTitle}>Observation</Card.FeaturedTitle> */}

      <View style={styles.body}>
        <DateText boldText="Création" date={observation.created_at} />
        <DateText boldText="Dernière Modification" date={observation.created_at} />
      </View>

      <Card.Divider />

      <FormBuilder title="Informations administratives" description="Informations minimales pour la rédaction d'une observation" fields={observationForm} onSubmit={onSubmit} />
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
