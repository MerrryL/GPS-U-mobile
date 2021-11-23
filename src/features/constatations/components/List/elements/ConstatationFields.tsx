import LongText from "@/components/Elements/Text/LongText";
import Title from "@/components/Elements/Text/Title";
import { Field } from "@/types";
import React from "react";
import { View } from "react-native";
import { makeStyles} from "react-native-elements";

type ConstatationFieldsProps = {
    fields: Field[];
}

//TODO : implement fields functionnality
//Create, add, delete, link

export default function ConstatationFields(props: ConstatationFieldsProps) {
  const { fields } = props;
  const styles = useStyles();
  
  //console.log("fields",  fields)

  return (
    <View style={styles.container}>
        <Title title="Champs" />

        { fields && fields.map( (field :Field, index) => {
            return (
                <LongText key={index} boldText={field.name} text={field?.pivot?.value?.toString() ?? "Indéfini"}/>
                );
           })
        }  
    </View>
    
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));
