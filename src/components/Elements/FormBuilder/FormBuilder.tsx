import { InputedField } from "@/types/utilityTypes";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { ObjectSchema } from "yup";
import NormalText from "../Text/NormalText";
import InputSelector from "./InputSelector";


type FormBuilderProps = {
  title: string;
  description: string;
  fields: InputedField[];
  onSubmit: SubmitHandler<FieldValues>;
  schema:  ObjectSchema<any>;
};

type FormValues = any;

//TODO:LATER
export default function FormBuilder({ title, description, fields, onSubmit, schema }: FormBuilderProps):JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  }:UseFormReturn = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <View>
      <View>
        <NormalText boldText={title} text={description} />

        {fields && 
          fields?.map((field: InputedField, index: React.Key):JSX.Element => <InputSelector f={field} key={index} control={control} />)}

      </View>
      <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true} />
    </View>
  );
}
