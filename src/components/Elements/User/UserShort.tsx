import { User } from "@/types";
import { capitalize } from "lodash";
import React from "react";
import { View } from "react-native";
import { FullTheme, makeStyles } from "react-native-elements";
import NormalText from "../Text/NormalText";

type UserShortProps = {
  user: User;
  containerStyle?: any;
  userNameStyle?: any;
};

// firstName: string;
// lastName: string;
// email: string;
// role: 'ADMIN' | 'USER';
// teamId: string;
// bio: string;

//Todo: add functionnalities
export default function UserShort(props: UserShortProps): JSX.Element {
  const { user, containerStyle, userNameStyle } = props;
  const styles = useStyles();

  const kContainerStyle = {
    ...styles.container,
    ...containerStyle,
  };

  return (
    <View style={kContainerStyle}>
      <NormalText boldText={name} />
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
  userNameStyle: {},
}));
