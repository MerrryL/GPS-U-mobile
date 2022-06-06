import { Ionicons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface DetailsButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}

export default function DetailsButton({ callBack }: DetailsButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<Ionicons name="eye-outline" size={18} color="blue" />} type="outline" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: "10px",
  },
}));
