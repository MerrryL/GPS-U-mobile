import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, makeStyles } from "react-native-elements";

export default function DetailsButton(props) {
  const { constatationId } = props;
  const navigation = useNavigation();

  const styles = useStyles();

  return (
    <Button
      title="Détails"
      style={styles.button}
      onPress={() =>
        navigation.navigate("Details", { constatationId: constatationId })
      }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "10px",
  },
}));
