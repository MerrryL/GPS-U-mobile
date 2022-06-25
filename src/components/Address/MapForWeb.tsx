import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { LatLng, Region } from "react-native-maps";
import MapView from "react-native-web-maps";

interface MapProps {
  markers?: LatLng[];
  onChange?: (coords: LatLng) => void;
}
export default function MapForWeb({ markers, onChange }: MapProps): JSX.Element {
  const styles = useStyles();

  const [markersState, setMarkers] = useState<LatLng[] | undefined>(markers);
  useEffect(() => {
    setMarkers(markers);
  }, [markers]);

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

  const onDragEnd = (marker: any) => {
   onChange && onChange({
      latitude: marker.latLng.lat() as number,
      longitude: marker.latLng.lng() as number,
    });
  };

  return (
    <Card containerStyle={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion} key={markers}>
        {markersState?.map(
          (marker: LatLng, index: number): JSX.Element => (
            <MapView.Marker key={index} coordinate={marker} draggable={onChange ? true : false} onDragEnd={onDragEnd} title="Ici" description="Vous êtes ici" />
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
