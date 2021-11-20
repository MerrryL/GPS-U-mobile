import React from "react";
import { Constatation } from "@/types";
import {
  Card,
  Image,
  Button,
  Icon,
  Divider,
  Text,
  makeStyles
} from "react-native-elements";

import { View } from "react-native";
import EditButton from "@/components/Elements/Buttons/EditButton";
import DetailsButton from "@/components/Elements/Buttons/DetailsButton";
import ConstatationCover from "../elements/ConstatationCover";

import ConstatationDescription from "./elements/ConstatationDescription";
import ConstatationDossiers from "./elements/ConstatationDossiers";
import ConstatationObservations from "./elements/ConstatationObservations";
import ConstatationObservers from "./elements/ConstatationObservers";
import ConstatationFields from "./elements/ConstatationFields";
import ConstatationActions from "./elements/ConstatationActions";
import DateText from "@/components/Date/DateText";
import ConstatationAddress from "./elements/ConstatationAddress";

type constatationCardProps = {
  constatation: Constatation;
};

export function ConstatationListCard(props: constatationCardProps) {
  const { constatation } = props;
  const styles = useStyles();

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

  const backGroundColor = isValidated == 1 ? "#d6ffdb" : requiresValidation == 1 ? "#ffd7d6" : "#aaa" ;
  const statusText = isValidated == 1 ? "Validée" : requiresValidation == 1 ? "A valider" : "Brouillon" ;

  return (
    <Card containerStyle={styles.container}>
      <View style={[styles.header,  {backgroundColor:backGroundColor}]}>
        <Card.Title h2 style={styles.cardTitle}>
            Constatation n°{id}
        </Card.Title>
        <View style={styles.buttonContainer} >

          <EditButton constatationId={id}/>
          <DetailsButton constatationId={id}/>
        </View>
      </View>
      {/* //TODO: show it better */}
      <Text>
        {statusText}
      </Text>

      <Card.Divider />
      <View style={styles.body}>
        <ConstatationCover cover={media?.[0]} images={images} style={styles.cover}/>
        <View style={styles.headerInfos}>
          <DateText date={created_at}/>
          <ConstatationAddress localization={localization} />
        </View>
      </View>
      <ConstatationDescription description={description}/>



      {/* TODO: Not implemented
      <ConstatationActions actions={actions} />
      <ConstatationDossiers dossiers={dossiers} /> */}
      <View style={styles.details}>
        <ConstatationObservations observations={observations} />   
        <ConstatationObservers observers={observers} /> 
        <ConstatationFields fields={fields}/>
      </View>

      <DateText boldText="Dernière m-a-j" date={updated_at} dateStyle={{alignSelf: "flex-end"}} containerStyle={{ flexDirection: "column", alignItems: "flex-end"}} />

    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  container:{
    // backgroundColor: theme.colors.ivory,
  },
  header:{
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
    padding: "10px"
  },
  cardTitle:{ 
    alignSelf: "stretch"
  },
  buttonContainer:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf:"center"
  },
  body: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
  },
  details:{
    // flexWrap: "wrap",
    // flexDirection: "row",
  },
  headerInfos:{
    flexDirection: "column",
    alignItems: "flex-end",
  },
  cover: {
    alignSelf: "flex-start" 
  },
  cardTitle: { 
    alignSelf: "flex-start" 
  },

}));
