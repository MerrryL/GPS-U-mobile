import { FontAwesome5 } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles, useTheme } from "@rneui/themed";
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
  const { theme } = useTheme();

  return <Button icon={<FontAwesome5 name="edit" size={20} color={theme.colors.white} />} type="clear" color="warning" buttonStyle={styles.button} onPress={() => callBack()} />;
}
const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
