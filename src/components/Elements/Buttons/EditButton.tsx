import { AntDesign } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface EditButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function EditButton({ callBack }: EditButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<AntDesign name="edit" size={18} color="brown" />} type="outline" buttonStyle={styles.button} onPress={() => callBack()} />;
}
const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: "10px",
    borderColor: "brown",
  },
}));
