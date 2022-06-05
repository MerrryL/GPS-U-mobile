import AddButton from "@/components/Elements/Buttons/AddButton";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import CollapseButton from "@/components/Elements/Buttons/CollapseButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { FieldGroup, Observation } from "@/types";
import { InputedField, InputType, yupPickerItem } from "@/types/utilityTypes";
import { getFieldTypesOptions } from "@/utils/getOptions";
import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import * as yup from "yup";
import { useCreateField } from "../hooks/useCreateField";

interface StyleProps {
  container: StyleProp<ViewStyle>;
  children: StyleProp<ViewStyle>;
}

interface FieldsAddProps {
  fieldGroup: FieldGroup;
  observation: Observation;
}

export function FieldsAdd({ fieldGroup, observation }: FieldsAddProps) {
  const fieldCreateMutation = useCreateField({ observationId: observation.id, fieldGroupId: fieldGroup.id });
  const styles: StyleProps = useStyles();

  const [isExpanded, toggle] = useState<boolean>(false);

  const newFieldForm: InputedField[] = [
    {
      name: "name",
      label: "nom",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      defaultValue: "",
    },
    {
      name: "type",
      label: "type",
      type: InputType.Select,
      schema: yupPickerItem(),
      defaultValue: undefined,
      options: getFieldTypesOptions() || [],
    },
    {
      name: "defaultValue",
      label: "Valeur par défaut",
      type: InputType.Text,
      schema: yup.string().min(0).defined(),
      defaultValue: "",
    },
    {
      name: "isRequired",
      label: "Champ obligatoire?",
      type: InputType.CheckBox,
      schema: yup.boolean().defined(),
      defaultValue: false,
    },
  ];

  const onSubmit = async (values: any) => {
    console.log("values", values);
    await fieldCreateMutation.mutateAsync({
      name: values.name,
      field_type_id: values.type.id,
      // options: values.options,
      defaultValue: values.defaultValue,
      isRequired: values.isRequired,
      observationId: observation.id,
      fieldGroupId: fieldGroup.id,
    });
  };

  return (
    <Card containerStyle={styles.container}>
      {isExpanded ? (
        <>
          <FloatingButtonStack>
            <CollapseButton callBack={() => toggle((prevState: boolean): boolean => !prevState)}></CollapseButton>
          </FloatingButtonStack>
          <View style={styles.children}>
            <FormBuilder title="Nouvelle question" description="Crée un nouvelle question" fields={newFieldForm} onSubmit={onSubmit} />
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
