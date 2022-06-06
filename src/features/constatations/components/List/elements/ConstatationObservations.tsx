import NormalText from "@/components/Elements/Text/NormalText";
import { Observation } from "@/types";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface ConstatationObservationsProps {
  observations: Observation[];
}

// name: string;
// code: string;
// short_description: string;
// description: string;
// fine_amount: string;
// codex: Codex;
// observation_type: ObservationType;
// field_groups: FieldGroup[];
// images
interface StyleProps {
  container: StyleProp<ViewStyle>;
}
//TODO: add link and other functionnalities + extra checking etc

export default function ConstatationObservations({ observations }: ConstatationObservationsProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return (
    <Card containerStyle={styles.container}>
      <NormalText boldText="Observations" boldTextStyle={{ fontSize: 18 }}></NormalText>

      {observations &&
        observations.map((observation: Observation, index): JSX.Element => {
          return <NormalText key={index} boldText={observation?.codex?.precode + " " + observation?.code + " du " + observation.codex.name} text={observation?.name} />;
        })}
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    padding: 3,
    margin: 3,
    // backgroundColor: theme?.colors?.grey5,
  },
}));
