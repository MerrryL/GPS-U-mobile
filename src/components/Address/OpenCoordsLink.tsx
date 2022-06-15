import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { Linking } from "react-native";

type OpenCoordsProps = {
  latitude: string | number;
  longitude: string | number;
  containerStyle?: any;
  coordsStyle?: any;
};

export default function OpenCoords(props: OpenCoordsProps): JSX.Element {
  const { latitude, longitude, containerStyle = null, coordsStyle = null } = props;

  const url = "https://www.google.com/maps/place/" + latitude + "," + longitude;

  const styles = useStyles();

  const kContainerStyle = {
    flexDirection: "row",
    ...styles.container,
    ...containerStyle,
  };

  const kCoordsStyle = {
    ...styles.coords,
    ...coordsStyle,
  };

  return (
    <Button onPress={() => Linking.openURL(url)} type="outline">
      <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
    </Button>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
  coords: {
    color: "blue",
    alignSelf: "center",
  },
}));
