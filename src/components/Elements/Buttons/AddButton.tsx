import { MaterialIcons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";

import React from "react";
import { StyleProp, ViewStyle } from "react-native";

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

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: "10px",
    borderColor: "green",
  },
}));
