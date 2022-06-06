import { AntDesign } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface SaveButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function SaveButton({ callBack }: SaveButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<AntDesign name="save" size={18} color="green" />} type="outline" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: "10px",
    borderColor: "green",
  },
}));
