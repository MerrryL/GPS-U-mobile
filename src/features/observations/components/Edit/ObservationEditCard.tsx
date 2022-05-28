import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import DateText from "@/components/Elements/Text/DateText";
import { Observation } from "@/types";
import { InputedField, InputType, yupPickerItem } from "@/types/utilityTypes";
import { getCodexesOptions, getObservationTypesOptions } from "@/utils/getOptions";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import { UseMutationResult } from "react-query";
import * as yup from "yup";
import { UpdateObservationOptions } from "../../api";
import { useUpdateObservation } from "../../hooks/useUpdateObservation";
import { FieldGroupsPart } from "../../subfeatures/fieldgroups/components/FieldGroupsPart";

type ObservationEditCardProps = {
  observation: Observation;
};

export function ObservationEditCard({ observation }: ObservationEditCardProps): JSX.Element {
  const styles = useStyles();

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
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title h2>Observation n°{observation.id}</Card.Title>
        <View style={styles.dateContainer}>
          <DateText boldText="Création" date={observation.created_at} />
          <DateText boldText="Dernière Modification" date={observation.updated_at} />
        </View>

        <Card.Divider />

        <FormBuilder title="Première étape" description="Remplissez les informations requises avant de poursuivre la paramétrisation de cette observation" fields={observationForm} onSubmit={onSubmit} />

        <Card.Divider />
        <FieldGroupsPart observation={observation}></FieldGroupsPart>
        {/* <FormBuilder title="Images" description="Quelles photos doivent être inclues dans cette observation" schema={schema} fields={imagesForm} onSubmit={onSubmit} /> */}
      </Card>
    </ScrollView>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
  dateContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  body: {},
  images: {},
  localization: {},
  fields: {},
}));
