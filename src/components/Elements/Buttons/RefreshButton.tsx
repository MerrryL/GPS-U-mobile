import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface RefreshButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function RefreshButton({ callBack }: RefreshButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<MaterialCommunityIcons name="web-refresh" size={18} color="blue" />} type="outline" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: "10px",
    borderColor: "blue",
  },
}));
