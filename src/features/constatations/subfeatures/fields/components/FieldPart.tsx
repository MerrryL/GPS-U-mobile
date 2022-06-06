import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { Field, FieldGroup } from "@/types";
import { ConstatationValues } from "@/types/utilityTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Colors, makeStyles, Theme } from "@rneui/themed";
import React from "react";
import { useForm } from "react-hook-form";
// import { useUpdateField } from "../hooks/useUpdateField";
import { View } from "react-native";
import * as yup from "yup";
import useFieldGroupBy from "../utils/useFieldGroupBy";

type FieldPartProps = {
  fields: Field[];
  constatationId: number;
};

type Grouped = {
  fieldGroup: FieldGroup;
  fields: Field[];
};

type FieldValues = any;

// type StyleProps = {};

const schema = yup.object().shape({});

export function FieldPart(props: FieldPartProps) {
  const { fields, constatationId } = props;

  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ConstatationValues) => {
    console.log("here");
  };

  const groupedFields = useFieldGroupBy(fields);

  console.log("groups", groupedFields);

  return (
    <View style={styles.container}>
      {groupedFields?.length > 0 && <FormBuilder schema={schema} fields={groupedFields} onSubmit={onSubmit} />}
      {/* {
        groupedFields.map( ( groupedField : Grouped, index ) => (
          <View style={styles.groupedField} key={index}>
            <NormalText boldText={groupedField.fieldGroup.name} />
            { groupedField.fields.map( (field) => (
              <InputFromField f={field} control={control} key={field.id}/>
            ))}
          </View>
        ))

        
      } */}
    </View>
  );
}

const useStyles = makeStyles((theme:{ colors: Colors; } & Theme) => ({
  container: {},
  groupedField: {},
});
