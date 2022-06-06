import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Text, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <Text style={{ color: "blue", alignSelf: "center" }}>
        Ouvrir sur maps <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
      </Text>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {},
  coords: {
    color: "blue",
    alignSelf: "center",
  },
}));
