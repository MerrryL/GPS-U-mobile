import { FontAwesome } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles, useTheme } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface StarButtonProps {
  callBack:( () => void) | Promise<void> | (() =>Promise<void>);
  isFavorite?: true;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function StarButton({ callBack, isFavorite }: StarButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const { theme } = useTheme();

  return <Button icon={isFavorite ? <FontAwesome name="star" size={20} color={theme.colors.warning} /> : <FontAwesome name="star-o" size={20} color={theme.colors.warning} />} type="clear" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
