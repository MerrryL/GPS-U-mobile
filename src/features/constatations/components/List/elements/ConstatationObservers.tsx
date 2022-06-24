import NormalText from "@/components/Elements/Text/NormalText";
import { Observer, User } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import { capitalize } from "lodash";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

interface ConstatationObserversProps {
  observers: Observer[];
}

//TODO : implement observers functionnality
//Create, add, delete, link

export default function ConstatationObservers(props: ConstatationObserversProps): JSX.Element {
  const { observers } = props;
  const styles: StyleProps = useStyles();

  const getName = (user: User): string => capitalize(user?.last_name) + " " + capitalize(user?.first_name);

  return (
    <Card containerStyle={styles.container}>
      <NormalText boldText="Constatateurs"></NormalText>
      <Card.Divider></Card.Divider>

      {observers &&
        observers.map((observer: Observer, index: number): JSX.Element => {
          return <NormalText key={index} text={getName(observer)} />;
        })}
      {observers.length === 0 && <NormalText text="Aucun constatateur renseigné." />}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {

  },
}));
