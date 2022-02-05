import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, FullTheme, makeStyles } from "react-native-elements";

export default function EditButton(props) {
  const { constatationId } = props;
  const navigation = useNavigation();

  const styles = useStyles();

  return (
    <Button
      title="Editer"
      style={styles.button}
      onPress={() =>
        navigation.navigate("Edition", { constatationId: constatationId })
      }
    />
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
  },
}));
