import React from "react";

import { useFields } from "../hooks/useFields";
import { FieldCard } from "./FieldCard";
import { FieldsAdd } from "./FieldAdd";
import { useDeleteField } from "../hooks/useDeleteField";
import { Field, FieldGroup } from "@/types";
import { makeStyles } from "react-native-elements";
// import { useUpdateField } from "../hooks/useUpdateField";

import { View } from "react-native";
import LongText from "@/components/Elements/Text/LongText";
import NormalText from "@/components/Elements/Text/NormalText";
import useFieldGroupBy from "../utils/useFieldGroupBy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFromField from "./InputFromField";

type FieldPartProps = {
  fields: Field[];
  constatationId: string;
};

type Grouped = {
  fieldGroup: FieldGroup;
  fields: Field[];
}

type FieldValues = any;

const schema = yup.object().shape({
  description: yup.string().required(),
  observations: yup.array().min(1).required(),
  observers: yup.array().min(1).required(),
});

export function FieldPart(props: FieldPartProps) {
  const {fields, constatationId} = props;

  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });




  const groupedFields = useFieldGroupBy(fields);

  // console.log("groups", groupedFields);


  return (
    <View style={styles.container}>
      {
        groupedFields.map( ( groupedField : Grouped, index ) => (
          <View style={styles.groupedField} key={index}>
            <NormalText boldText={groupedField.fieldGroup.name} />
            { groupedField.fields.map( (field) => (
              <InputFromField f={field} control={control} key={field.id}/>
            ))}
          </View>
        ))

        
      }

    </View>
  );
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  container: {

  },
  groupedField:{

  }

}));


