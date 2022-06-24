import { InputedField } from "@/types/utilityTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormReturn, UseFormWatch } from "react-hook-form";
import { ScrollView, StyleProp, TextStyle, ViewStyle } from "react-native";
import * as yup from "yup";
import { fr } from "yup-locales";
import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import NormalText from "../Text/NormalText";
import InputSelector from "./InputSelector";

interface FormBuilderProps<TFieldValues> {
  title: string;
  description: string;
  fields: InputedField[];
  onSubmit: SubmitHandler<TFieldValues>;
  onCancel?: () => void;
  onWatch?: (watch: UseFormWatch<TFieldValues>) => void;
  setValue?: any
}

interface StyleProps {
  cardTitle: StyleProp<TextStyle>;
  container: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
  headerInfos: StyleProp<ViewStyle>;
  details: StyleProp<ViewStyle>;
}
//TODO:LATER
export default function FormBuilder<TFieldValues>({ title, description, fields, onSubmit, onCancel, onWatch, setValue }: FormBuilderProps<TFieldValues>): JSX.Element {
  const styles: StyleProps = useStyles();
  yup.setLocale(fr);

  const schema = yup.object().shape(fields.reduce((a, iField: InputedField) => ({ ...a, [iField.name]: iField.schema }), {}));

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  }: UseFormReturn<TFieldValues> = useForm<TFieldValues>({
    resolver: yupResolver(schema),
  });
  
  onWatch && onWatch(watch);

  return (
    <ScrollView>
      <Card containerStyle={styles.container}>
        <NormalText boldText={title} text={description} />

        {fields && fields.map((field: InputedField, index: React.Key): JSX.Element => <InputSelector f={field} key={index} control={control} />)}
        {/* <NormalText text={JSON.stringify(errors)}></NormalText> */}

        <SaveButton callBack={handleSubmit<TFieldValues>(onSubmit)} title="Sauvegarder" />
        {onCancel && <CancelButton callBack={onCancel} title="Annuler" />}
      </Card>
    </ScrollView>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.white,
    // padding: 0,
    // margin: 0,
  },
  header: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
  },
  cardTitle: {
    alignSelf: "stretch",
    padding: 2,
    marginBottom: 0,
    backgroundColor: theme?.colors?.primary,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  body: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    height: "auto",
    marginTop: 5,
  },
  details: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  headerInfos: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cover: {
    alignSelf: "flex-start",
  },
}));
