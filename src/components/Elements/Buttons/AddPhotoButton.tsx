import { MaterialIcons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles, useTheme } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface AddPhotoButtonProps {
  callBack: () => void;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function AddPhotoButton({ callBack }: AddPhotoButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const { theme } = useTheme();

  return <Button icon={<MaterialIcons name="add-a-photo" size={24} color={theme.colors.success} />} type="clear" buttonStyle={styles.button} onPress={() => callBack()} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
