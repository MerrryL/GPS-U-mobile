import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button, FullTheme, makeStyles } from "react-native-elements";

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

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  button: {
    marginRight: "10px",
    borderColor: "blue",
  },
}));
