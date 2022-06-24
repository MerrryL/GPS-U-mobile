import DateText from "@/components/Elements/Text/DateText";
import NormalText from "@/components/Elements/Text/NormalText";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
createdAt: string;
updatedAt: string;
};

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function ConstatationDates({createdAt, updatedAt}: Props): JSX.Element {
  const styles: StyleProps = useStyles();

  return (
    <Card containerStyle={styles.container}>
      <NormalText boldText="Dates"></NormalText>
      <Card.Divider></Card.Divider>
      <DateText boldText="Création" date={createdAt} />
      <DateText boldText="Dernière Modification" date={updatedAt} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
  },
}));
