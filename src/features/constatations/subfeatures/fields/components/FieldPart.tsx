import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import NormalText from "@/components/Elements/Text/NormalText";
import { Constatation, Field, FieldGroup } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Colors, makeStyles, Theme } from "@rneui/base";
import React, { Fragment } from "react";
// import { useUpdateField } from "../hooks/useUpdateField";
import { StyleProp, View, ViewStyle } from "react-native";
import * as yup from "yup";

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

  const onSubmit = async (values: any) => {
    console.log("here");
  };

  const groupIds: number[] = [...new Set(constatation.fields.map((field: Field) => field.field_group_id))];
  const groupedFields: Field[][] = groupIds.map((fieldGroupId: number): Field[] => constatation.fields.filter((field: Field) => field.field_group_id === fieldGroupId));

  const fieldToInputedField = (fields: Field[]): InputedField[] => {
    return fields.map((field: Field): InputedField => {
      // console.log("field", field);
      return {
        name: field.name,
        label: field.name,
        type: InputType.Text,
        value: field.pivot.value,
        defaultValue: field.defaultValue,
        schema: yup.string().min(3).defined(),
      };
    });
  };

  return (
    <View style={styles.container}>
      {groupedFields.map(
        (groupedField: Field[], key: number): JSX.Element => (
          <Fragment key={key}>
            <NormalText boldText={"Observation " + groupedField[0].field_group.observation.code + ": " + groupedField[0].field_group.observation.name} />
            <FormBuilder title={groupedField[0].field_group.name} description={groupedField[0].field_group.description} fields={fieldToInputedField(groupedField)} onSubmit={onSubmit} />
          </Fragment>
        )
      )}
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
  groupedField: {},
}));
