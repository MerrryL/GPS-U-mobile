import { InputedField } from "@/types/utilityTypes";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-elements";
import * as yup from "yup";
import NormalText from "../Text/NormalText";
import InputSelector from "./InputSelector";

type FormBuilderProps<TFieldValues> = {
  title: string;
  description: string;
  fields: InputedField[];
  onSubmit: SubmitHandler<TFieldValues>;
};

//TODO:LATER
export default function FormBuilder<TFieldValues>({ title, description, fields, onSubmit }: FormBuilderProps<TFieldValues>): JSX.Element {
  const schema = yup.object().shape(fields.reduce((a, iField: InputedField) => ({ ...a, [iField.name]: iField.schema }), {}));

  const {
    control,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<TFieldValues> = useForm<TFieldValues>({
    resolver: yupResolver(schema),
  });

  return (
    <View>
      <View>
        <NormalText boldText={title} text={description} />

        {fields && fields.map((field: InputedField, index: React.Key): JSX.Element => <InputSelector f={field} key={index} control={control} />)}
      </View>
      <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true} />
      {/* <NormalText text={JSON.stringify(errors)}></NormalText> */}
    </View>
  );
}
