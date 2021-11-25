import LongText from "@/components/Elements/Text/LongText";
import Title from "@/components/Elements/Text/Title";
import { Dossier } from "@/types";
import React from "react";
import { View } from "react-native";
import { makeStyles, Text} from "react-native-elements";

type ConstatationDossiersProps = {
    dossiers: Dossier[];
}

//TODO : implement dossiers functionnality
//Create, add, delete, link

export default function ConstatationDossiers(props: ConstatationDossiersProps) {
  const { dossiers } = props;
  const styles = useStyles();
  
  return (
    <>
      { dossiers.length > 0 && 
        <View style={styles.container}>
        <Title title="Dossiers" />

        { dossiers.map ( (dossier, index) => 
          <Text key={index}>{dossier.name}</Text>
        )}
        
      </View>
    }
    </>
    
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));