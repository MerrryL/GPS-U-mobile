import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import DateText from "@/components/Elements/Text/DateText";
import { Constatation, Observation, User } from "@/types";
import { InputedField, InputType, PickerItem } from "@/types/utilityTypes";
import { getObservationsOptions, getObserversOptions } from "@/utils/getOptions";
import { AxiosError } from "axios";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { StyleProp, View, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
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
  body: StyleProp<ViewStyle>;
}

export function ConstatationEditCard({ constatation }: ConstatationEditCardProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const { actions, created_at, description, dossiers, field_groups, id, images, isValidated, localization, media, modelType, observations, observers, requiresValidation, requiresValidationDate, updated_at, validationDate } = constatation;

  const updateConstatationMutation: UseMutationResult<Constatation, AxiosError<any, any>, UpdateConstatationOptions, any> = useUpdateConstatation();

  const statusText = isValidated == 1 ? "Validée" : requiresValidation == 1 ? "A valider" : "Brouillon";

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
            id: yup.number().required(),
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
      schema: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            item: yup.string().required(),
          })
        )
        .min(1)
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
          <DetailsButton callBack={() => navigation.navigate("Details", { observationId: observation?.id })}></DetailsButton> */}
        <ConstatationValidationStatus id={id} isValidated={isValidated} validationDate={validationDate} requiresValidation={requiresValidation} requiresValidationDate={requiresValidationDate} />
      </FloatingButtonStack>
      <Card.FeaturedTitle style={styles.cardTitle}>Constatation n°{id}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>{statusText}</Card.FeaturedSubtitle>

      <View style={styles.body}>
        <DateText boldText="Création" date={created_at} />
        <DateText boldText="Dernière Modification" date={created_at} />
      </View>

      <Card.Divider />

      <FormBuilder title="Informations administratives" description="Informations minimales pour la rédaction d'une constatation" fields={constatationForm} onSubmit={onSubmit} />

      {/* <View style={styles.images}>
        <ImagesPart cover={media?.[0]} images={images} constatationId={id} />
      </View> */}

      {/* <View style={styles.localization}><LocalizationPart localization={localization} constatationId={id} /></View> */}

      {/* <View style={styles.fields}><FieldPart fields={fields} constatationId={deleteid}/></View> */}
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
