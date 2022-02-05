import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, FullTheme, makeStyles } from "react-native-elements";

type DetailsButtonProps = {
  constatationId: number;
};
export default function DetailsButton({ constatationId }: DetailsButtonProps) {
  const navigation = useNavigation();

  const styles = useStyles();

  return <Button title="Détails" style={styles.button} onPress={() => navigation.navigate("Details", { constatationId: constatationId })} />;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
  },
}));
