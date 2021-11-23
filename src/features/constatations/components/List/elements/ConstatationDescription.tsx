import LongText from "@/components/Elements/Text/LongText";
import Title from "@/components/Elements/Text/Title";
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
        <Title title="Description" />
        <LongText text={description} />
      </View>
      }
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {},
}));
