import CardPartLongText from "@/components/Elements/Card/Part/CardPartLongText";
import CardPartTitle from "@/components/Elements/Card/Part/CardPartTitle";
import { Action } from "@/types";
import React from "react";
import { View } from "react-native";
import { makeStyles, Text} from "react-native-elements";

type ConstatationActionsProps = {
    actions: Action[];
}

//TODO : implement actions functionnality
//Create, add, delete, link

export default function ConstatationActions(props: ConstatationActionsProps) {
  const { actions } = props;
  const styles = useStyles();
  
  return (
    <>
      { actions.length > 0 && 
        <View style={styles.container}>
        <CardPartTitle title="Actions" />

        { actions.map ( (action, index) => 
          <Text key={index}>{action.name}</Text>
        )}
        
      </View>
    }
    </>
    
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));
