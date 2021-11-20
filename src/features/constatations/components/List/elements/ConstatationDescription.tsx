import CardPartLongText from "@/components/Elements/Card/Part/CardPartLongText";
import CardPartTitle from "@/components/Elements/Card/Part/CardPartTitle";
import React from "react";
import { View } from "react-native";
import { makeStyles} from "react-native-elements";

type ConstatationDescriptionProps = {
    description:string;
}

export default function ConstatationDescription(props: ConstatationDescriptionProps) {
  const { description = "" } = props;
  const styles = useStyles();

  return (
    <>
      {description &&
      <View style={styles.container}>
        <CardPartTitle title="Description" />
        <CardPartLongText text={description} />
      </View>
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));
