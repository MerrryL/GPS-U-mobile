import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DetailsButton from "@/components/Elements/Buttons/DetailsButton";
import EditButton from "@/components/Elements/Buttons/EditButton";
import DateText from "@/components/Elements/Text/DateText";
import NormalText from "@/components/Elements/Text/NormalText";
import { Observation } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import { ObservationStackParamList } from "../..";

interface ObservationCardProps {
  observation: Observation;
}

interface StyleProps {
  cardTitle: StyleProp<TextStyle>;
  container: StyleProp<ViewStyle>;
  description: StyleProp<ViewStyle>;
  body: StyleProp<ViewStyle>;
  fineAmount: StyleProp<ViewStyle>;
  headerInfos: StyleProp<ViewStyle>;
  details: StyleProp<ViewStyle>;
}

export function ObservationCard({ observation }: ObservationCardProps) {
  const styles: StyleProps = useStyles();

  const navigation: StackNavigationProp<ObservationStackParamList, keyof ObservationStackParamList, undefined> = useNavigation<StackNavigationProp<ObservationStackParamList, "Liste">>();

  const { code, codex, codex_id, created_at, description, field_groups, fine_amount, id, name, observation_type, observation_type_id, short_description, updated_at } = observation;

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <EditButton callBack={() => navigation.navigate("Edition", { observationId: observation?.id })}></EditButton>
        <DetailsButton callBack={() => navigation.navigate("Details", { observationId: observation?.id })}></DetailsButton>
      </FloatingButtonStack>

      <Card.FeaturedTitle style={styles.cardTitle}>Observation {code}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>{name}</Card.FeaturedSubtitle>

      <View style={styles.body}>
        <Card containerStyle={styles.description}>
          <NormalText boldText="Résumé" text={short_description}></NormalText>
        </Card>
        <View style={styles.headerInfos}>
          <DateText date={created_at} />
          <Card containerStyle={styles.fineAmount}>
            <NormalText boldText="Montant de l'amende" text={fine_amount}></NormalText>
          </Card>
          {/* <ConstatationAddress localization={localization} /> */}
          <DateText boldText="Dernière m-a-j" date={updated_at} dateStyle={{ alignSelf: "flex-end" }} containerStyle={{ flexDirection: "column", alignItems: "flex-end" }} />
        </View>
        <Card containerStyle={styles.fineAmount}>
          <NormalText boldText="Description" text={description}></NormalText>
        </Card>
        {/* <Text>Codex: TODO{codex}</Text> */}
        {/* <Text>Groupes de champs TODO{field_groups}</Text> */}
        {/* <Text>Type d'observation TODO{observation_type}</Text> */}
      </View>
    </Card>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    backgroundColor: theme.colors?.grey5,
  },
  description: {
    width: 180,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    padding: 5,
    margin: 5,
    marginRight: 15,
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
    backgroundColor: theme.colors?.primary,
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
