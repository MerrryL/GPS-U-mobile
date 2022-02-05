import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, FullTheme, makeStyles, Text } from "react-native-elements";
import * as yup from "yup";
import { useCodexes } from "../../hooks/useCodexes";
import { useObservation } from "../../hooks/useObservation";
import { useUpdateObservation } from "../../hooks/useUpdateObservation";

type ObservationValues = {
  name: string;
  short_description: string;
  description: string;
  fine_amount: string;
  codex_id: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  short_description: yup.string().required(),
  description: yup.string().required(),
  fine_amount: yup.string().required(),
  codex_id: yup.string().required(),
});

interface CardHeaderProps {
  observationId: string;
}

export function CardHeader({ observationId }: CardHeaderProps) {
  const observationQuery = useObservation({
    observationId: observationId,
  });
  const observation = observationQuery?.data;

  const codexQuery = useCodexes();
  const codexOptions = codexQuery?.data?.map((observer) => ({
    item: observer?.name,
    id: observer.id,
  }));

  const updateObservationMutation = useUpdateObservation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ObservationValues>({
    resolver: yupResolver(schema),
  });

  const styles = useStyles();

  const onSubmit = async (data: any) => {
    console.log("data", JSON.stringify(data));

    await updateObservationMutation.mutateAsync({
      data,
      observationId,
    });
  };
  return (
    <>
      <Text h3>{observation?.name}</Text>

      <View>
        {/* <PickerInput name="codex_id" defaultValue={observation?.codex?.id} label="Choix du codex" control={control} options={codexOptions} />
        <TextInput name="name" defaultValue={observation?.name} label="Nom" control={control} />
        <TextInput name="code" defaultValue={observation?.code} label="Code" control={control} />
        <TextInput name="short_description" defaultValue={observation?.short_description} label="Description courte" control={control} />
        <TextInput name="description" defaultValue={observation?.description} label="Description" control={control} />
        <TextInput name="fine_amount" defaultValue={observation?.fine_amount} label="Montant de l'amende" control={control} /> */}

        <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true} />
      </View>
    </>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
}));
