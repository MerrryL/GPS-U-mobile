import LongText from "@/components/Elements/Text/LongText";
import NormalText from "@/components/Elements/Text/NormalText";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, FullTheme, makeStyles } from "react-native-elements";

type ConstatationDescriptionProps = {
  description: string;
};

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function ConstatationDescription(props: ConstatationDescriptionProps) {
  const { description = "" } = props;
  const styles: StyleProps = useStyles();

  return (
    <>
      {description && (
        <Card containerStyle={styles.container}>
          <NormalText boldText="Description" boldTextStyle={{ fontSize: 18 }}></NormalText>
          <LongText text={description} />
        </Card>
      )}
    </>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {
    padding: 3,
    margin: 3,
    // backgroundColor: theme.colors?.grey5,
  },
}));
