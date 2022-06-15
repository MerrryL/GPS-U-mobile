import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { Observation } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Colors, Text, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import { useCodexes } from "../../hooks/useCodexes";
import { useObservation } from "../../hooks/useObservation";
import { useUpdateObservation } from "../../hooks/useUpdateObservation";

type ObservationValues = {
  name: string;
  short_description: string;
  description: string;
  fine_amount: string;
  codex_id: number;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  short_description: yup.string().required(),
  description: yup.string().required(),
  fine_amount: yup.string().required(),
  codex_id: yup.string().required(),
});

interface CardHeaderProps {
  observationId: number;
}

export function CardHeader({ observationId }: CardHeaderProps) {
  const observationQuery = useObservation({
    observationId: observationId,
  });
  const observation: Observation | undefined = observationQuery?.data;

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

  // <TextInput name="name" defaultValue={observation?.name} label="Nom" control={control} />
  // <TextInput name="code" defaultValue={observation?.code} label="Code" control={control} />
  // <TextInput name="short_description" defaultValue={observation?.short_description} label="Description courte" control={control} />
  // <TextInput name="description" defaultValue={observation?.description} label="Description" control={control} />
  // <TextInput name="fine_amount" defaultValue={observation?.fine_amount} label="Montant de l'amende" control={control} /> */}
  const observationForm: InputedField[] = [
    {
      name: "Nom",
      type: InputType.Text,
      value: observation?.name,
      schema: yup.string().required(),
    },
    {
      name: "Code",
      type: InputType.Text,
      value: observation?.code,
      schema: yup.string().required(),
    },
    // {
    //   name: "Choix du codex",
    //   type: InputType.Select,
    //   value: getCodex(observation?.codex_id),
    //   schema: yup.string().required(),
    // },
    { name: "Description", type: InputType.Text, value: observation?.short_description, schema: yup.string().required(), defaultValue: "" },
    { name: "Description Courte", type: InputType.Text, value: observation?.short_description, schema: yup.string().required(), defaultValue: "" },
    { name: "Montant de l'amende", type: InputType.Text, value: observation?.fine_amount, schema: yup.string().required() },
    // { name: "Type d'observation", type: InputType.Select, value: observation?.observation_type, schema: yup.string().required()}
  ];

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
        <FormBuilder title="Edition de l'observation" description="Faut bien décrire" fields={observationForm} onSubmit={onSubmit}></FormBuilder>
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

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
}));
