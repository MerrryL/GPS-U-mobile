import { AntDesign } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles, useTheme } from "@rneui/themed";
import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

interface SaveButtonProps {
  callBack: (data?:any) => void | Promise<void>;
  title?: string;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
  titleStyle: StyleProp<TextStyle>;
}
export default function SaveButton({ callBack, title }: SaveButtonProps): JSX.Element {
  const styles: StyleProps = useStyles(title);
  const { theme } = useTheme();

  return <Button title={title} icon={<AntDesign name="save" size={title ? 24 : 20} color={title ? theme.colors.white : theme.colors.success} />} iconPosition="right" buttonStyle={styles.button} onPress={() => callBack()} titleStyle={styles.titleStyle} type={title ? "solid" : "clear"} color="success"></Button>;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme, title?: string) => ({
  button: {
    marginRight: 4,
    color: title ? theme?.colors.white : theme?.colors?.success,
  },
  titleStyle: {
    marginRight: 4,
    color: title ? theme?.colors.white : theme?.colors?.success,
  },
}));
