import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button, FullTheme, makeStyles } from "react-native-elements";

interface EditButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function DeleteButton({ callBack }: EditButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<AntDesign name="close" size={24} color="white" />} type="outline" style={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
  },
}));
