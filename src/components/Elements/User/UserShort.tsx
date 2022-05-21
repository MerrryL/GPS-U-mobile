import { User } from "@/types";
import { capitalize } from "lodash";
import React from "react";
import { View } from "react-native";
import { FullTheme, makeStyles, Text } from "react-native-elements";

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
export default function UserShort(props: UserShortProps):JSX.Element {
  const { user, containerStyle, userNameStyle } = props;
  const styles = useStyles();

  const kContainerStyle = {
    ...styles.container,
    ...containerStyle,
  };

  const kUserNameStyle = {
    ...styles.userNameStyle,
    ...userNameStyle,
  };

  const name = capitalize(user?.lastName) + " " + capitalize(user?.firstName);

  return (
    <View style={kContainerStyle}>
      <Text style={kUserNameStyle}>{name}</Text>
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>) => ({
  container: {},
  userNameStyle: {},
}));
