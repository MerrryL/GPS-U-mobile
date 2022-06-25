import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import NormalText from "@/components/Elements/Text/NormalText";
import { Constatation, Field, FieldGroup } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Card, Colors, makeStyles, Theme } from "@rneui/base";
import React, { Fragment } from "react";
// import { useUpdateField } from "../hooks/useUpdateField";
import { StyleProp, View, ViewStyle } from "react-native";
import * as yup from "yup";
import { useUpdateConstatationFields } from "../hooks/useUpdateConstatationFields";

interface FieldPartProps {
  constatation: Constatation;
}

interface Grouped {
  fieldGroup: FieldGroup;
  fields: Field[];
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  groupedField: StyleProp<ViewStyle>;
}

export function FieldPart({ constatation }: FieldPartProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const updateConstatationFieldsMutation = useUpdateConstatationFields();

  const onSubmit = async (values:Record<number, string>) => {
    await updateConstatationFieldsMutation.mutateAsync({
      data: Object.entries(values),
      constatationId: constatation.id,
    });
  };

  const groupIds: number[] = [...new Set(constatation.fields.map((field: Field) => field.field_group_id))];
  const groupedFields: Field[][] = groupIds.map((fieldGroupId: number): Field[] => constatation.fields.filter((field: Field) => field.field_group_id === fieldGroupId));

  const fieldToInputedField = (fields: Field[]): InputedField[] => {
    return fields.map((field: Field): InputedField => {
      return {
        name: field.id + "",
        label: field.name,
        type: InputType.Text,
        value: field.pivot.value,
        defaultValue: field.default_value,
        schema: field.is_required ? yup.string().required() : yup.string().defined(),
      };
    });
  };

  return (
    <Card containerStyle={styles.container}>
      {groupedFields.map(
        (groupedField: Field[], key: number): JSX.Element => (
          <Fragment key={key}>
            <FormBuilder title={"Observation " + groupedField[0].field_group.observation.code + ": " + groupedField[0].field_group.observation.name + ": " + groupedField[0].field_group.name} description={groupedField[0].field_group.description} fields={fieldToInputedField(groupedField)} onSubmit={onSubmit} />
          </Fragment>
        )
      )}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
  },
  groupedField: {},
}));
