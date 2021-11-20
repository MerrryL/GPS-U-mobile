
import React, { useState } from "react";
import { Linking } from "react-native";
import { Text, makeStyles } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';


type OpenCoordsProps = {
  latitude: string | number;
  longitude: string | number;
  containerStyle?: any;
  coordsStyle?: any;
}

export default function OpenCoords(props: OpenCoordsProps) {
  const {latitude, longitude, containerStyle = null, coordsStyle = null} = props;

  const url = 'https://www.google.com/maps/place/' + latitude.toString() + ',' + longitude.toString();

  const styles = useStyles();

  const kContainerStyle = {
    flexDirection: 'row',
    ...styles.container,
    ...containerStyle,
  };

  const kCoordsStyle = {
    ...styles.coords,
    ...coordsStyle,
  };
  
  return (
    <TouchableOpacity onPress={ () => Linking.openURL(url)}>
      <Text style={{color: 'blue', alignSelf:"center"}} >
        Ouvrir sur maps <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
      </Text>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    
  },
  coords: {
    color: 'blue', alignSelf:"center"
  },
}));
