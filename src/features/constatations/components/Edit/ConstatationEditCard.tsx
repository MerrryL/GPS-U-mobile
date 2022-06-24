import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import DateText from "@/components/Elements/Text/DateText";
import { Constatation, Observation, User } from "@/types";
import { InputedField, InputType, PickerItem } from "@/types/utilityTypes";
import { getObservationsOptions, getObserversOptions } from "@/utils/getOptions";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import { AxiosError } from "axios";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { UseMutationResult } from "react-query";
import * as yup from "yup";
import { UpdateConstatationOptions } from "../../api";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";
import ConstatationValidationStatus from "./elements/ValidationStatus/ConstatationValidationStatus";

interface ConstatationEditCardProps {
  constatation: Constatation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  cardTitle: StyleProp<ViewStyle>;
  header: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
}

export function ConstatationEditCard({ constatation }: ConstatationEditCardProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const { created_at, description, fields, id, images, is_validated, localization, media, observations, observers, requires_validation, requires_validation_date, updated_at, validation_date } = constatation;

  const updateConstatationMutation: UseMutationResult<Constatation, AxiosError<any, any>, UpdateConstatationOptions, any> = useUpdateConstatation();

  const statusText = is_validated == 1 ? "Validée" : requires_validation == 1 ? "A valider" : "Brouillon";

  const constatationForm: InputedField[] = [
    {
      name: "description",
      label: "Description",
      type: InputType.Text,
      value: constatation?.description,
      schema: yup.string().min(10, "Minimum 10 caractères.").defined(),
      defaultValue: "",
    },
    {
      name: "observations",
      label: "observations",
      type: InputType.Multiselect,
      schema: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            item: yup.string().required(),
          })
        )
        .min(1, "Merci de choisir au moins une observation.")
        .defined(),
      value: constatation?.observations?.map((obs: Observation): PickerItem => {
        return { id: obs.id, item: obs.name };
      }),
      defaultValue: [],
      options: getObservationsOptions() || [],
    },
    {
      name: "observers",
      label: "témoins",
      type: InputType.Multiselect,
      value: constatation?.observers?.map((obs: User): PickerItem => {
        return { id: obs.id, item: obs.last_name + " " + obs.first_name };
      }),
      schema: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            item: yup.string().required(),
          })
        )
        .min(1, "Merci de choisir au moins un témoin.")
        .defined(),
      options: getObserversOptions() || [],
    },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async ({ description, observers, observations }: FieldValues): Promise<void> => {
    await updateConstatationMutation.mutateAsync({
      description,
      observers,
      observations,
      constatationId: id,
    });
  };
  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        {/* <EditButton callBack={() => navigation.navigate("Edition", { observationId: observation?.id })}></EditButton>
          <DetailsButton callBack={() => navigation.navigate("Détails", { observationId: observation?.id })}></DetailsButton> */}
        <ConstatationValidationStatus id={id} is_validated={is_validated} validation_date={validation_date} requires_validation={requires_validation} requires_validation_date={requires_validation_date} />
      </FloatingButtonStack>
      <Card.FeaturedTitle style={styles.cardTitle}>Constatation n°{id}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>{statusText}</Card.FeaturedSubtitle>

      <Card containerStyle={styles.body}>
        <DateText boldText="Création" date={created_at} />
        <DateText boldText="Dernière Modification" date={created_at} />
      </Card>

      <FormBuilder title="Informations administratives" description="Informations minimales pour la rédaction d'une constatation" fields={constatationForm} onSubmit={onSubmit} />

      {/* <View style={styles.images}>
        <ImagesPart cover={media?.[0]} images={images} constatationId={id} />
      </View> */}

      {/* <View style={styles.localization}><LocalizationPart localization={localization} constatationId={id} /></View> */}

      {/* <View style={styles.fields}><FieldPart fields={fields} constatationId={deleteid}/></View> */}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  header: {},
  cardTitle: {
    alignSelf: "stretch",
    padding: 2,
    marginBottom: 0,
    backgroundColor: theme?.colors?.primary,
  },
}));
