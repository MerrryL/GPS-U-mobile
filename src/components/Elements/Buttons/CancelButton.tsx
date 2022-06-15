import { MaterialIcons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface CancelButtonProps {
  callBack: () => void;
  title?: string;
}

interface StyleProps {
  button: StyleProp<ViewStyle>;
}
export default function CancelButton({ callBack, title }: CancelButtonProps): JSX.Element {
  const styles: StyleProps = useStyles();

  return (
    <Button color="warning" buttonStyle={styles.button} onPress={() => callBack()} titleStyle={{ marginRight: 4 }}>
      {title}
      <MaterialIcons name="cancel" size={title ? 24 : 20} color="white" />
    </Button>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  button: {
    marginRight: 4,
  },
}));
