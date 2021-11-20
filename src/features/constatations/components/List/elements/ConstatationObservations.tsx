import CardPartLongText from "@/components/Elements/Card/Part/CardPartLongText";
import CardPartText from "@/components/Elements/Card/Part/CardPartText";
import CardPartTitle from "@/components/Elements/Card/Part/CardPartTitle";
import { Observation } from "@/types";
import React from "react";
import { View } from "react-native";
import { makeStyles, Text} from "react-native-elements";

type ConstatationObservationsProps = {
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

//TODO: add link and other functionnalities + extra checking etc

export default function ConstatationObservations(props: ConstatationObservationsProps) {
  const { observations } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
        <CardPartTitle title="Observations" />

        { observations && observations.map( (observation :Observation, index) => {
            return (
                <CardPartText key={index} boldText={observation?.codex?.precode + " " + observation?.code +" du "+ observation.codex.name} text={observation?.name}/>
                );
           })
        }  
    </View>
    
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));
