import { AntDesign } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles, useTheme } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface DeleteButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function DeleteButton({ callBack }: DeleteButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const { theme } = useTheme();

  return <Button icon={<AntDesign name="delete" size={20} color={theme.colors.white} />} color="error" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
