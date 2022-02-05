import DateText from "@/components/Elements/Text/DateText";
import { Constatation, User } from "@/types";
import { ConstatationValues, InputedField } from "@/types/utilityTypes";
import { getObservationsOptions, getObserversOptions } from "@/utils/getOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import * as yup from "yup";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";
import ConstatationValidationStatus from "./elements/ValidationStatus/ConstatationValidationStatus";

type ConstatationEditCardProps = {
  constatation: Constatation;
};

const schema = yup.object().shape({
  description: yup.string().defined(),
  observations: yup.array().min(1).defined(),
  observers: yup.array().min(1).defined(),
});

export function ConstatationEditCard({ constatation }: ConstatationEditCardProps) {
  const { actions, created_at, description, dossiers, field_groups, id, images, isValidated, localization, media, modelType, observations, observers, requiresValidation, requiresValidationDate, updated_at, validationDate } = constatation || {};

  const styles = useStyles();

  const updateConstatationMutation = useUpdateConstatation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConstatationValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ConstatationValues) => {
    console.log("values", values);

    const { description, observers, observations } = values;
    await updateConstatationMutation.mutateAsync({
      description,
      observers,
      observations,
      constatationId: id,
    });
  };

  // const fieldsss:InputedField[] = [
  //   {type:"text", name:"test", defaultValue:"lol", schema: yup.string().required() },
  //   {type:"text", name: "test3", schema: yup.string().required() }
  // ];

  const test: InputedField[] = [
    {
      name: "description",
      type: "text",
      value: constatation?.description,
      schema: yup.string().defined(),
      defaultValue: "",
    },
    {
      name: "observations",
      type: "multi-select",
      schema: yup.array().min(1).defined(),
      value: constatation?.observations?.map((obs) => {
        return { id: obs.id, item: obs.name };
      }),
      defaultValue: [1],
      options: getObservationsOptions(),
    },
    {
      name: "observers",
      type: "multi-select",
      value: constatation?.observers?.map((obs: User) => {
        return { id: obs.id, item: obs.lastName + " " + obs.firstName };
      }),
      schema: yup.array().min(1).defined(),
      options: getObserversOptions(),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title h2>Constatation n°{id}</Card.Title>
        <View style={styles.dateContainer}>
          <DateText boldText="Création" date={created_at} />
          <DateText boldText="Dernière Modification" date={created_at} />
          <ConstatationValidationStatus id={id} isValidated={isValidated} validationDate={validationDate} requiresValidation={requiresValidation} requiresValidationDate={requiresValidationDate} />
        </View>

        <Card.Divider />

        {/* <FormBuilder schema={schema} fields={test} onSubmit={onSubmit} /> */}
        {/* <FormBuilder title="test" description="test test" schema={schema} fieldgroups={test} onSubmit={onSubmit} /> */}

        {/* <View style={styles.body}>
          <MultiPickerInput name="observers" label="Constatateurs" options={getObserversOptions()} selectedValues={constatation?.observers} control={control}/>
          <MultiPickerInput name="observations" label="Observations" options={getObservationsOptions()} selectedValues={constatation?.observations} control={control}/>
          <TextInput name="description" defaultValue={constatation?.description} numberOfLines={5} label="Description" control={control} />

          <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />

        </View>

        <Card.Divider />

        <View style={styles.images}>
          <ImagesPart cover={media?.[0]} images={images} constatationId={id}/>
        </View> */}

        <Card.Divider />

        {/* <View style={styles.localization}>
          <LocalizationPart localization={localization} constatationId={id}/>
        </View> */}

        <Card.Divider />

        <View style={styles.fields}>{/* <FieldPart fields={fields} constatationId={id}/> */}</View>

        <Card.Divider />
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
