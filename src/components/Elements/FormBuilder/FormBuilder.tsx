import { InputedField } from "@/types/utilityTypes";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-elements";
import NormalText from "../Text/NormalText";
import InputSelector from "./InputSelector";

type FieldGroup = {
  title: string;
  description: string;
  fields: InputedField[];
};

type FormBuilderProps = {
  title: string;
  description: string;
  fields: InputedField[];
  fieldGroups: FieldGroup[];
  onSubmit: any;
  schema: any;
};

type FormValues = any;

//TODO:LATER
export default function FormBuilder({ title, description, fields, fieldGroups, onSubmit, schema }: FormBuilderProps) {
  // const defaultValues = fields?.map( field => {return {field.name: field?.defaultValue}) || {};
  // const schemas = fields.map( field => field.schema);

  // console.log("fields",  yup.object().shape(schemas));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: yupResolver(yup.object().shape(schemas)),.
    resolver: yupResolver(schema),
  });

  // fields.forEach(field => {
  //     setValue(field.name, field.value);
  // });

  const renderFields = ({ title, description, fields }: FieldGroup) => {
    return (
      <View>
        <NormalText boldText={title} text={description} />
        {fields && fields?.map((field: InputedField, index: React.Key) => <InputSelector f={field} key={index} control={control} />)}
      </View>
    );
  };

  return (
    <View>
      {fields && renderFields({ title, description, fields })}

      {fieldGroups &&
        fieldGroups.map((group) =>
          renderFields({
            title: group.title,
            description: group.description,
            fields: group.fields,
          })
        )}

      <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true} />
    </View>
  );
}
