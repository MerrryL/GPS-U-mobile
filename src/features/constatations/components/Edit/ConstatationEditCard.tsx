import React, {useState} from "react";
import { Card, Switch, Icon, Button, Text, Input, makeStyles } from "react-native-elements";
import { ScrollView } from "react-native";

import { format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { View } from "react-native";
import { useConstatation } from "../../hooks/useConstatation";
import { useUpdateConstatation } from "../../hooks/useUpdateConstatation";
import imageURL from "../../utils/ImageURL";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRefuseValidationConstatation } from "../../hooks/useRefuseValidationConstatation";
import { useRequireValidationConstatation } from "../../hooks/useRequireValidationConstatation";
import { useValidateConstatation } from "../../hooks/useValidateConstatation";
import MultiPickerInput from "@/components/Elements/Inputs/MultiPickerInput";
import TextInput from "@/components/Elements/Inputs/TextInput";
import { getObservationsOptions, getObserversOptions } from "@/utils/getOptions";
import ConstatationCover from "../elements/ConstatationCover";
import ConstatationIsValidated from "./elements/ValidationStatus/ConstatationIsValidated";
import ConstatationHasRequiredValidation from "./elements/ValidationStatus/ConstatationHasRequiredValidation";
import ConstatationIsDraft from "./elements/ValidationStatus/ConstatationIsDraft";
import ConstatationValidationStatus from "./elements/ValidationStatus/ConstatationValidationStatus";
import DateText from "@/components/Date/DateText";
import { ImagesPart } from "../../subfeatures/images/components/ImagesPart";

type ConstatationValues = {
  description: string;
  observers: any;
  observations: any;
};

const schema = yup.object().shape({
  description: yup.string().required(),
  observations: yup.array().min(1).required(),
  observers: yup.array().min(1).required(),
});

export function ConstatationEditCard(props) {
  const { constatation } = props;
  const { 
    actions,
    created_at,
    description,
    dossiers,
    fields,
    id,
    images,
    isValidated,
    localization,
    media,
    modelType,
    observations,
    observers,
    requiresValidation,
    requiresValidationDate,
    updated_at,
    validationDate 
  } = constatation || {};

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
    
    const { description, observers, observations} = values;
    await updateConstatationMutation.mutateAsync({
      description, observers, observations, constatationId:id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title h2>Constatation n°{id}</Card.Title>
        <View style={styles.dateContainer} >
          <DateText boldText="Création" date={created_at}/>
          <DateText boldText="Dernière Modification" date={created_at}/>
          <ConstatationValidationStatus id={id} isValidated={isValidated} validationDate={validationDate} requiresValidation={requiresValidation} requiresValidationDate={requiresValidationDate}/>
        </View>

        <Card.Divider />


        <View style={styles.body}>

          <MultiPickerInput name="observers" label="Constatateurs" options={getObserversOptions()} selectedValues={constatation?.observers} control={control}/>
          <MultiPickerInput name="observations" label="Observations" options={getObservationsOptions()} selectedValues={constatation?.observations} control={control}/>

          <TextInput name="description" defaultValue={constatation?.description} numberOfLines={5} label="Description" control={control} />
          
          <Button title="Enregistrer " onPress={handleSubmit(onSubmit)} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />

        </View>

        <Card.Divider />

        <View style={styles.header}>
          <ConstatationCover cover={media?.[0]} images={images} style={styles.cover}/>
          <ImagesPart constatationId={id}/>
        </View>



      </Card>
    </ScrollView>

  );
}

const useStyles = makeStyles((theme) => ({
  container:{

  },
  dateContainer:{
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: "row",
    height: "auto",
    borderBottomWidth: 1,
    padding: 10,
  },
  cover: {
    alignSelf: "flex-start" 
  },
  body: {

  }
}));