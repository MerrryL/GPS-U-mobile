import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React from "react";
import MapView, { LatLng, MapEvent, Marker, Region } from "react-native-maps";

interface MapProps {
  markers?: LatLng[];
  onChange?: (coords: LatLng) => void;
}

export default function MapForMobile({ markers, onChange }: MapProps): JSX.Element {
  const styles = useStyles();

  //TODO:the initialRegion should adapt the latitude/long Delta?
  const defaultCoords: LatLng = {
    latitude: 50.509317,
    longitude: 3.590973,
  };

  const initialRegion: Region = {
    latitude: markers ? markers.reduce((a, b) => a + b.latitude, 0) / markers.length : defaultCoords.latitude,
    longitude: markers ? markers.reduce((a, b) => a + b.longitude, 0) / markers.length : defaultCoords.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001,
  };

  const onDragEnd: (event: MapEvent) => void = (event: MapEvent): void => {
   onChange &&
     onChange({
       latitude: event.nativeEvent.coordinate.latitude,
       longitude: event.nativeEvent.coordinate.longitude,
     });
  };

  return (
    <Card containerStyle={styles.container}>
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
                draggable={onChange ? true : false}
                onDragEnd={onDragEnd}
                title="Ici"
                description="Vous êtes ici"
              />
            )
          )}
      </MapView>
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    // margin: 10,
    display: "flex",
    alignItems: "stretch",
  },
  map: {
    aspectRatio: 1 / 1,
    // width: 0.8 * Dimensions.get("window").width,
    // height: 0.8 * Dimensions.get("window").width,
  },
}));
