import AddButton from "@/components/Elements/Buttons/AddButton";
import CancelButton from "@/components/Elements/Buttons/CancelButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import NormalText from "@/components/Elements/Text/NormalText";
import { Observation } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import * as yup from "yup";
import { useCreateObservationImage } from "../hooks/useCreateObservationImage";
import ImagePartSelector from "./ImagePartSelector";

interface ImagesPartAddProps {
  observation: Observation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  children: StyleProp<ViewStyle>;
}

export default function ImagesPartAdd({ observation }: ImagesPartAddProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const [isExpanded, toggle] = useState<boolean>(false);

  const imageCreateMutation = useCreateObservationImage();

  const newImageForm: InputedField[] = [
    {
      name: "name",
      label: "nom",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
    {
      name: "description",
      label: "description de l'image",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
  ];

  const onSubmit = async (values: any) => {
    console.log("values", values);
    await imageCreateMutation.mutateAsync({
      name: values.name,
      description: values.description,
      observationId: observation.id,
    });
  };

  return (
    <Card containerStyle={styles.container}>
      {isExpanded ? (
        <>
          <Card containerStyle={styles.children}>
            <NormalText boldText="Vous pouvez soit choisir une requète d'image déjà existante"></NormalText>
            <ImagePartSelector observation={observation}></ImagePartSelector>
          </Card>
          <Card containerStyle={styles.children}>
            <NormalText boldText="Soit en créer une nouvelle" />
            <FormBuilder title="Nouvelle image" description="Crée une nouvelle image d'illustration" fields={newImageForm} onSubmit={onSubmit} />
          </Card>
          <CancelButton callBack={() => toggle((prevState: boolean): boolean => !prevState)} title="Annuler" />
        </>
      ) : (
        <AddButton callBack={() => toggle((prevState: boolean): boolean => !prevState)}></AddButton>
      )}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    minHeight: "50px",
    padding: 3,
    margin: 3,
    marginTop: 10,
  },
  children: {
    backgroundColor: theme?.colors?.grey5,
    padding: 0,
    margin: 0,
    paddingTop: 8,
  },
}));
