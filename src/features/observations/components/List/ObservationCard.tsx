import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DetailsButton from "@/components/Elements/Buttons/DetailsButton";
import EditButton from "@/components/Elements/Buttons/EditButton";
import DateText from "@/components/Elements/Text/DateText";
import NormalText from "@/components/Elements/Text/NormalText";
import { Observation } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { ObservationStackParamList } from "../..";
import ObservationDates from "./ObservationDates";

interface ObservationListCardProps {
  observation: Observation;
}

interface StyleProps {
  cardTitle: StyleProp<TextStyle>;
  container: StyleProp<ViewStyle>;
  summary: StyleProp<ViewStyle>;
  description: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
  fineAmount: StyleProp<ViewStyle>;
  headerInfos: StyleProp<ViewStyle>;
  details: StyleProp<ViewStyle>;
}

export function ObservationListCard({ observation }: ObservationListCardProps): JSX.Element {
  const styles: StyleProps = useStyles();

  const navigation: StackNavigationProp<ObservationStackParamList, keyof ObservationStackParamList, undefined> = useNavigation<StackNavigationProp<ObservationStackParamList, "Liste">>();

  const { code, codex, codex_id, created_at, description, field_groups, fine_amount, id, name, observation_type, observation_type_id, short_description, updated_at } = observation;

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <EditButton callBack={() => navigation.navigate("Edition", { observationId: observation.id })}></EditButton>
        <DetailsButton callBack={() => navigation.navigate("Détails", { observationId: observation.id })}></DetailsButton>
      </FloatingButtonStack>

      <Card.FeaturedTitle style={styles.cardTitle}>Observation {code}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>{name}</Card.FeaturedSubtitle>

      <View style={styles.body}>
        <Card containerStyle={styles.summary}>
          <NormalText boldText="Résumé"></NormalText>
          <Card.Divider></Card.Divider>
          <NormalText text={short_description}></NormalText>
        </Card>
        <View style={styles.headerInfos}>
          <ObservationDates createdAt={created_at} updatedAt={updated_at} />
        </View>
      </View>
      <Card>
        <NormalText boldText="Montant de l'amende"></NormalText>
        <Card.Divider></Card.Divider>
        <NormalText text={fine_amount}></NormalText>
      </Card>
      <Card>
        <NormalText boldText="Description"></NormalText>
        <Card.Divider></Card.Divider>
        <NormalText text={description}></NormalText>
      </Card>
      {/* <Text>Codex: TODO{codex}</Text> */}
      {/* <Text>Groupes de champs TODO{field_groups}</Text> */}
      {/* <Text>Type d'observation TODO{observation_type}</Text> */}
    </Card>
  );
}

const useStyles = makeStyles(
  (
    theme: {
      colors: Colors;
    } & Theme
  ) => ({
    container: {
      backgroundColor: theme?.colors?.grey5,
      display: "flex",
      alignItems: "stretch",
    },
    summary: {
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "stretch",
      display: "flex",
      // borderRadius: 20,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: "black",
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
    fineAmount: {
      padding: 3,
      margin: 3,
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
      alignContent: "stretch",
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
    description: {
      flexDirection: "column",
      alignItems: "stretch",
      flexGrow: 1,
      // padding: 0,
      margin: 0,
      marginTop: 8,
    },
    cover: {
      alignSelf: "flex-start",
    },
  })
);
