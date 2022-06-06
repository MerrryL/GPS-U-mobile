import AddButton from "@/components/Elements/Buttons/AddButton";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import CollapseButton from "@/components/Elements/Buttons/CollapseButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { Observation } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import * as yup from "yup";
import { useCreateObservationFieldGroup } from "../hooks/useCreateObservationFieldGroup";

interface FieldGroupAddProps {
  observation: Observation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  children: StyleProp<ViewStyle>;
}

export function FieldGroupsAdd({ observation }: FieldGroupAddProps): JSX.Element {
  const fieldGroupCreateMutation = useCreateObservationFieldGroup();
  const styles: StyleProps = useStyles();

  const [isExpanded, toggle] = useState<boolean>(false);

  const newFieldGroupForm: InputedField[] = [
    {
      name: "name",
      label: "nom",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
    {
      name: "description",
      label: "description du questionnaire",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
  ];

  const onSubmit = async (values: any) => {
    await fieldGroupCreateMutation.mutateAsync({
      name: values.name,
      description: values.description,
      observationId: observation.id,
    });

    //onSuccess();
  };

  return (
    <Card containerStyle={styles.container}>
      {isExpanded ? (
        <>
          <FloatingButtonStack>
            <CollapseButton callBack={() => toggle((prevState: boolean): boolean => !prevState)}></CollapseButton>
          </FloatingButtonStack>
          <View style={styles.children}>
            <FormBuilder title="Nouveau questionnaire" description="Crée un nouveau questionnaire à populer de questions" fields={newFieldGroupForm} onSubmit={onSubmit} />
          </View>
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
  },
  children: {
    minHeight: "50px",
    padding: 0,
    margin: 0,
    marginTop: "50px",
  },
}));
