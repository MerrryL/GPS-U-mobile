import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import DetailsButton from "@/components/Elements/Buttons/DetailsButton";
import EditButton from "@/components/Elements/Buttons/EditButton";
import DateText from "@/components/Elements/Text/DateText";
import { useAuth } from "@/lib/auth";
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
import ConstatationDates from "./elements/ConstatationDates";
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
  const { user } = useAuth();
  const styles: StyleProps = useStyles({ is_validated: constatation.is_validated, requires_validation: constatation.requires_validation });

  const navigation: StackNavigationProp<ConstatationStackParamList, keyof ConstatationStackParamList, undefined> = useNavigation<StackNavigationProp<ConstatationStackParamList>>();

  const { created_at, description, id, images, is_validated, localization, media, observations, observers, requires_validation, requires_validation_date, updated_at, validation_date } = constatation;

  const statusText = is_validated == 1 ? "Validée" : requires_validation == 1 ? "A valider" : "Brouillon";

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        {user?.is_observer && constatation.observers.find( observer => observer.id === user.id) ? (
          <>
            <EditButton callBack={() => navigation.navigate("Edition", { constatationId: constatation.id })} />
            <DetailsButton callBack={() => navigation.navigate("Détails", { constatationId: constatation.id })} />
          </>
        ) : (
          <DetailsButton callBack={() => navigation.navigate("Détails", { constatationId: constatation.id })} />
        )}
      </FloatingButtonStack>

      <Card.FeaturedTitle style={styles.cardTitle}>Constatation n°{id}</Card.FeaturedTitle>
      <Card.FeaturedSubtitle style={styles.cardTitle}>{statusText}</Card.FeaturedSubtitle>

      <View style={styles.body}>
        <ConstatationCover cover={media?.[0]} images={images} />
        <View style={styles.headerInfos}>
          <ConstatationDates createdAt={created_at} updatedAt={updated_at}></ConstatationDates>
          <ConstatationAddress localization={localization} />
        </View>
      </View>
      <ConstatationDescription description={description} />
      <ConstatationObservations observations={observations} />
      <ConstatationObservers observers={observers} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme, props: { is_validated: number; requires_validation: number }) => ({
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
    backgroundColor: props.is_validated == 1 ? theme?.colors?.success : props.requires_validation == 1 ? theme?.colors?.warning : theme?.colors?.primary,
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
    alignContent: "stretch",
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
