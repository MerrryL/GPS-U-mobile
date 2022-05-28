import DetailsButton from "@/components/Elements/Buttons/DetailsButton";
import EditButton from "@/components/Elements/Buttons/EditButton";
import DateText from "@/components/Elements/Text/DateText";
import { Constatation } from "@/types";
import React from "react";
import { View } from "react-native";
import { Card, FullTheme, makeStyles, Text } from "react-native-elements";
import ConstatationCover from "../elements/ConstatationCover";
import ConstatationAddress from "./elements/ConstatationAddress";
import ConstatationDescription from "./elements/ConstatationDescription";
import ConstatationFields from "./elements/ConstatationFields";
import ConstatationObservations from "./elements/ConstatationObservations";
import ConstatationObservers from "./elements/ConstatationObservers";

type constatationCardProps = {
  constatation: Constatation;
};

export function ConstatationListCard(props: constatationCardProps) {
  const { constatation } = props;
  
  const { actions, created_at, description, dossiers, field_groups, id, images, isValidated, localization, media, modelType, observations, observers, requiresValidation, requiresValidationDate, updated_at, validationDate } = constatation || {};
  const styles = useStyles({isValidated:isValidated, requiresValidation:requiresValidation});

  const statusText = isValidated == 1 ? "Validée" : requiresValidation == 1 ? "A valider" : "Brouillon";

  return (
    <Card containerStyle={styles.container}>
      <View style={[styles.header]}>
        <Card.Title h4 style={styles.cardTitle}>
          Constatation n°{id}
        </Card.Title>
        <View style={styles.buttonContainer}>
          <EditButton constatationId={id} />
          <DetailsButton constatationId={id} />
        </View>
      </View>
      {/* //TODO: show it better */}
      <Text>{statusText}</Text>

      <Card.Divider />
      <View style={styles.body}>
        <ConstatationCover cover={media?.[0]} images={images} style={styles.cover} />
        <View style={styles.headerInfos}>
          <DateText date={created_at} />
          <ConstatationAddress localization={localization} />
        </View>
      </View>
      <ConstatationDescription description={description} />
      
      <View style={styles.details}>
        <ConstatationObservations observations={observations} />
        <ConstatationObservers observers={observers} />
        <ConstatationFields field_groups={field_groups} />
      </View>

      <DateText boldText="Dernière m-a-j" date={updated_at} dateStyle={{ alignSelf: "flex-end" }} containerStyle={{ flexDirection: "column", alignItems: "flex-end" }} />
    </Card>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>, props:{isValidated: number, requiresValidation:number}) => ({
  container: {
    // backgroundColor: theme.colors.ivory,
  },
  header: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
    padding: "10px",
    backGroundColor: props.isValidated == 1 ? theme.colors!.success : props.requiresValidation == 1 ? theme.colors!.error : theme.colors!.greyOutline,
  },
  cardTitle: {
    alignSelf: "stretch",
    marginBottom: 0
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  body: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
  },
  details: {
    // flexWrap: "wrap",
    // flexDirection: "row",
  },
  headerInfos: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cover: {
    alignSelf: "flex-start",
  },
}));
