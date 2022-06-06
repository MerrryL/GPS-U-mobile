import { Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { Dimensions, View } from "react-native";
import MapView, { LatLng, MapEvent, Marker, Region } from "react-native-maps";

interface MapProps {
  markers?: LatLng[];
  onChange: (coords: LatLng) => void;
}

export default function MapForMobile({ markers, onChange }: MapProps): JSX.Element {
  const styles = useStyles();

  //TODO:the initialRegion should adapt the latitude/long Delta?
  const defaultCoords: LatLng = {
    latitude: 50.509317,
    longitude: 3.590973,
  };

  const initialRegion: Region = {
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001,
  };

  const onDragEnd: (event: MapEvent) => void = (event: MapEvent): void => {
    onChange({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers &&
          markers.map(
            (marker: LatLng, index: number): JSX.Element => (
              <Marker
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
            )
          )}
      </MapView>
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
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
