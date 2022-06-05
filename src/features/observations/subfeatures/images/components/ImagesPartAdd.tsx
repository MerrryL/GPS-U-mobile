import AddButton from "@/components/Elements/Buttons/AddButton";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import CollapseButton from "@/components/Elements/Buttons/CollapseButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { Observation } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
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
          <FloatingButtonStack>
            <CollapseButton callBack={() => toggle((prevState: boolean): boolean => !prevState)}></CollapseButton>
          </FloatingButtonStack>
          <ImagePartSelector observation={observation}></ImagePartSelector>
          <View style={styles.children}>
            <FormBuilder title="Nouvelle image" description="Crée une nouvelle image d'illustration" fields={newImageForm} onSubmit={onSubmit} />
          </View>
        </>
      ) : (
        <AddButton callBack={() => toggle((prevState: boolean): boolean => !prevState)}></AddButton>
      )}
    </Card>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    minHeight: "50px",
    padding: 3,
    margin: 3,
  },
  children: {
    minHeight: "50px",
    padding: 0,
    margin: 0,
    marginTop: "50px",
  },
}));
