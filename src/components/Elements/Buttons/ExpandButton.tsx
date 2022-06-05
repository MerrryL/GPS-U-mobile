import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button, FullTheme, makeStyles } from "react-native-elements";

interface ExpandButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function ExpandButton({ callBack }: ExpandButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<Ionicons name="expand-outline" size={18} color="blue" />} type="outline" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
  },
}));
