import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button, FullTheme, makeStyles } from "react-native-elements";

interface AddButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function AddButton({ callBack }: AddButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<MaterialIcons name="playlist-add" size={18} color="green" />} type="outline" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
    borderColor: "green",
  },
}));
