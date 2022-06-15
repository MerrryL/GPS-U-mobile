import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface CollapseButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}

export default function CollapseButton({ callBack }: CollapseButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return <Button icon={<MaterialCommunityIcons name="arrow-collapse" size={20} color="white" />} color="primary" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
