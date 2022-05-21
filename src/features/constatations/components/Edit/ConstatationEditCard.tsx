import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import DateText from "@/components/Elements/Text/DateText";
import { Constatation, Observation, User } from "@/types";
import { ConstatationValues, InputedField, InputType, PickerItem } from "@/types/utilityTypes";
import { getObservationsOptions, getObserversOptions } from "@/utils/getOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import React from "react";
import { UnpackNestedValue, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import { UseMutationResult } from "react-query";
import * as yup from "yup";
import { UpdateConstatationOptions } from "../../api";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";
import ConstatationValidationStatus from "./elements/ValidationStatus/ConstatationValidationStatus";

type ConstatationEditCardProps = {
  constatation: Constatation;
};

// const schema = yup.object().shape({
//   description: yup.string().defined(),
//   observations: yup.array().min(1).defined(),
//   observers: yup.array().min(1).defined(),
// });

// type ConstSchema = InferType<typeof schema>;

export function ConstatationEditCard({ constatation }: ConstatationEditCardProps):JSX.Element {
  const { actions, created_at, description, dossiers, field_groups, id, images, isValidated, localization, media, modelType, observations, observers, requiresValidation, requiresValidationDate, updated_at, validationDate } = constatation;

  const styles = useStyles();

  const updateConstatationMutation: UseMutationResult<Constatation, AxiosError<any, any>, UpdateConstatationOptions, any> = useUpdateConstatation();

  const constatationForm: InputedField[] = [
    {
      name: "description",
      type: InputType.Text,
      value: constatation?.description,
      schema: yup.string().min(50).defined(),
      defaultValue: "",
    },
    {
      name: "observations",
      type: InputType.Multiselect,
      schema: yup
        .array()
        .of(
          yup.object({
            id: yup.string().required(),
            item: yup.string().required(),
          })
        )
        .min(1)
        .defined(),
      value: constatation?.observations?.map((obs: Observation): PickerItem => {
        return { id: obs.id, item: obs.name };
      }),
      defaultValue: [],
      options: getObservationsOptions() || [],
    },
    {
      name: "observers",
      type: InputType.Multiselect,
      value: constatation?.observers?.map((obs: User): PickerItem => {
        return { id: obs.id, item: obs.lastName + " " + obs.firstName };
      }),
      schema: yup.array().min(1).defined(),
      options: getObserversOptions() || [],
    },
  ];
  const schema = yup.object().shape(constatationForm.reduce((a, iField: InputedField) => ({ ...a, [iField.name]: iField.schema }), {}));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConstatationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: (values: ConstatationValues) => Promise<void> = async ({ description, observers, observations }: UnpackNestedValue<ConstatationValues>): Promise<void> => {
    await updateConstatationMutation.mutateAsync({
      description,
      observers,
      observations,
      constatationId: id,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title h2>Constatation n°{id}</Card.Title>
        <View style={styles.dateContainer}>
          <DateText boldText="Création" date={created_at} />
          <DateText boldText="Dernière Modification" date={created_at} />
          <ConstatationValidationStatus id={id} isValidated={isValidated} validationDate={validationDate} requiresValidation={requiresValidation} requiresValidationDate={requiresValidationDate} />
        </View>

        <Card.Divider />

        <FormBuilder title="test" description="test test" schema={schema} fields={constatationForm} onSubmit={onSubmit} />

        <Card.Divider />

        <View style={styles.images}>{/* <ImagesPart cover={media?.[0]} images={images} constatationId={id} /> */}</View>

        <Card.Divider />

        <View style={styles.localization}>{/* <LocalizationPart localization={localization} constatationId={id} /> */}</View>

        <Card.Divider />

        <View style={styles.fields}>{/* <FieldPart fields={fields} constatationId={id}/> */}</View>

        <Card.Divider />
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
