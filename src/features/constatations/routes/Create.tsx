import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { getAddressForCoordinates, getCurrentLocationFromSensors } from "@/lib/localization";
import { Constatation, Localization } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { getCurrentUserAsObserver, getObservationsOptions, getObserversOptions } from "@/utils/getOptions";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import { LocationObject } from "expo-location";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import * as yup from "yup";
import { ConstatationStackParamList } from "..";
import { CreateConstatationDTO, useCreateConstatation } from "../hooks/useCreateConstatation";
import { useUpdateLocalization } from "../subfeatures/localization/hooks/useUpdateLocalization";

interface CreateProps {
  navigation: StackNavigationProp<ConstatationStackParamList, "Nouvelle">;
  route: RouteProp<ConstatationStackParamList, "Nouvelle">;
}
interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export function Create({ route, navigation }: CreateProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const createConstatationMutation = useCreateConstatation();
  const updateLocalizationMutation = useUpdateLocalization();

  const constatationForm: InputedField[] = [
    {
      name: "description",
      label: "Description",
      type: InputType.Text,
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
      defaultValue: [],
      options: getObservationsOptions() || [],
    },
    {
      name: "observers",
      label: "témoins",
      type: InputType.Multiselect,
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
      defaultValue: getCurrentUserAsObserver(),
    },
  ];

  const onSubmit: SubmitHandler<CreateConstatationDTO> = async ({ description, observers, observations }: CreateConstatationDTO): Promise<void> => {
    await createConstatationMutation
      .mutateAsync({
        description,
        observers,
        observations,
      })
      .then(async (constatation: Constatation) => {
        let localization: LocationObject | Localization | undefined = await getCurrentLocationFromSensors();
        if (localization) {
          localization = { ...localization.coords, ...(await getAddressForCoordinates(localization.coords)) };
        }

        // const location: LocationObject | undefined  = await getCurrentLocationFromSensors();
        // const newConstatation: Constatation = await createConstatationMutation.mutateAsync();
        if (localization) {
          await updateLocalizationMutation
            .mutateAsync({
              constatationId: constatation.id,
              localization: localization,
            })
            .then((loc) => {
              navigation.navigate("Edition", { constatationId: constatation.id });
            });
        } else {
          navigation.navigate("Edition", {
            constatationId: constatation.id,
          });
        }
      });
  };

  return (
    <Card containerStyle={styles.container}>
      <FormBuilder title="Informations administratives" description="Informations minimales pour la rédaction d'une constatation" fields={constatationForm} onSubmit={onSubmit} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
  },
}));
