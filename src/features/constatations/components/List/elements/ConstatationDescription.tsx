import LongText from "@/components/Elements/Text/LongText";
import NormalText from "@/components/Elements/Text/NormalText";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

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

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    padding: 3,
    margin: 3,
    // backgroundColor: theme?.colors?.grey5,
  },
}));
