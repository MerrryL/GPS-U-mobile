import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DetailsButton from "@/components/Elements/Buttons/DetailsButton";
import EditButton from "@/components/Elements/Buttons/EditButton";
import DateText from "@/components/Elements/Text/DateText";
import { Constatation } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { ConstatationStackParamList } from "../..";
import ConstatationCover from "../elements/ConstatationCover";
import ConstatationAddress from "./elements/ConstatationAddress";
import ConstatationDescription from "./elements/ConstatationDescription";
import ConstatationObservations from "./elements/ConstatationObservations";
import ConstatationObservers from "./elements/ConstatationObservers";

interface ConstatationCardProps {
  constatation: Constatation;
}

interface StyleProps {
  cardTitle: StyleProp<TextStyle>;
  container: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
  headerInfos: StyleProp<ViewStyle>;
  details: StyleProp<ViewStyle>;
}

export function ConstatationListCard({ constatation }: ConstatationCardProps): JSX.Element {
  const styles: StyleProps = useStyles({ isValidated: constatation.isValidated, requiresValidation: constatation.requiresValidation });

  const navigation: StackNavigationProp<ConstatationStackParamList, keyof ConstatationStackParamList, undefined> = useNavigation<StackNavigationProp<ConstatationStackParamList>>();

  const { created_at, description, id, images, isValidated, localization, media, observations, observers, requiresValidation, requiresValidationDate, updated_at, validationDate } = constatation || {};

  const statusText = isValidated == 1 ? "Validée" : requiresValidation == 1 ? "A valider" : "Brouillon";

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <EditButton callBack={() => navigation.navigate("Edition", { constatationId: constatation.id })} />
        <DetailsButton callBack={() => navigation.navigate("Details", { constatationId: constatation.id })} />
      </FloatingButtonStack>

      <Card.FeaturedTitle style={styles.cardTitle}>Constatation n°{id}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>{statusText}</Card.FeaturedSubtitle>

      <View style={styles.body}>
        <ConstatationCover cover={media?.[0]} images={images} />
        <View style={styles.headerInfos}>
          <DateText date={created_at} />
          <ConstatationAddress localization={localization} />
          <DateText boldText="Dernière m-a-j" date={updated_at} dateStyle={{ alignSelf: "flex-end" }} containerStyle={{ flexDirection: "column", alignItems: "flex-end" }} />
        </View>
      </View>
      <ConstatationDescription description={description} />

      {/* <View style={styles.details}> */}
      <ConstatationObservations observations={observations} />
      <ConstatationObservers observers={observers} />
      {/* <ConstatationFields field_groups={field_groups} /> */}
      {/* </View> */}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme, props: { isValidated: number; requiresValidation: number }) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
    display: "flex",
    alignItems: "stretch",
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
    backgroundColor: props.isValidated == 1 ? theme?.colors?.success : props.requiresValidation == 1 ? theme?.colors?.warning : theme?.colors?.primary,
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
    alignItems: "stretch",
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
    alignItems: "stretch",
    flexGrow: 1,
  },
  cover: {
    alignSelf: "flex-start",
  },
}));
