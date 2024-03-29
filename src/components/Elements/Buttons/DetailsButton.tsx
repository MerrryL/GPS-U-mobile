import { FontAwesome5 } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles, useTheme } from "@rneui/themed";
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
  const { theme } = useTheme();

  return <Button icon={<FontAwesome5 name="eye" size={20} color={theme.colors.white} />} type="clear" color="secondary" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
