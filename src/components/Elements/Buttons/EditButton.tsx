import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, Text, makeStyles } from "react-native-elements";

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

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "10px",
  },
}));
