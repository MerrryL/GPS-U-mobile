import React from "react";
import { Dimensions, View } from "react-native";
import { FullTheme, makeStyles } from "react-native-elements";
import { LatLng, Region } from "react-native-maps";
import MapView, { Marker } from "react-native-web-maps";

type Marker = {
  latitude: string | number;
  longitude: string | number;
};

type MapProps = {
  markers?: Marker[];
  onChange: (coords:LatLng)=>void;
};
export default function MapForWeb({ markers, onChange }: MapProps) {
  const styles = useStyles();

  //TODO:the initialRegion should adapt the latitude/long Delta?
  const defaultCoords:LatLng = {
    latitude: 50.509317,
    longitude: 3.590973,
  };

  const initialRegion:Region = {
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001,
  };

  const onDragEnd = (marker) => {
    onChange({
      latitude: marker.latLng.lat() as number,
      longitude: marker.latLng.lng() as number,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers &&
          markers.map((marker:Marker, index:number):JSX.Element => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.latitude != null ? marker.latitude : initialRegion.latitude,
                longitude: marker.longitude != null ? marker.longitude : initialRegion.longitude,
              }}
              draggable
              onDragEnd={onDragEnd}
              title="Ici"
              description="Vous êtes ici"
            />
          ))}
      </MapView>
    </View>
  );
}

const useStyles = makeStyles((theme: Partial<FullTheme>, props) => ({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  map: {
    width: 0.8 * Dimensions.get("window").width,
    height: 0.8 * Dimensions.get("window").width,
  },
}));
