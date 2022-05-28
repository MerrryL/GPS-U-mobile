import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { Observation } from "@/types";
import { InputedField, InputType, yupPickerItem } from "@/types/utilityTypes";
import React from "react";
import { ScrollView } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import * as yup from "yup";
import { useCreateObservationFieldGroup } from "../hooks/useCreateObservationFieldGroup";

type FieldGroupsValues = {
  name: string;
  type: string;
  logical_operator: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  logical_operator: yup.string().required(),
});

interface FieldGroupAddProps {
  observation: Observation;
}

export function FieldGroupsAdd({ observation }: FieldGroupAddProps): JSX.Element {
  const fieldGroupCreateMutation = useCreateObservationFieldGroup();
  const styles = useStyles();

  const newFieldGroupForm: InputedField[] = [
    {
      name: "name",
      label: "nom",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
    {
      name: "type",
      label: "description du questionnaire",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
    {
      name: "logical_operator",
      label: "Conditions",
      type: InputType.Select,
      schema: yupPickerItem(),
      options: [{ id: 1, item: "Ou" }],
    },
  ];

  const onSubmit = async (values: any) => {
    await fieldGroupCreateMutation.mutateAsync({
      name: values.name,
      type: values.type,
      logical_operator: values.logical_operator.item,
      observationId: observation.id,
    });

    //onSuccess();
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <FormBuilder title="Nouveau questionnaire" description="Crée un nouveau questionnaire à populer de questions" fields={newFieldGroupForm} onSubmit={onSubmit} />
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
