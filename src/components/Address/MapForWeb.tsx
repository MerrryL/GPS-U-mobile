import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { FullTheme, makeStyles } from "react-native-elements";
import { LatLng, Region } from "react-native-maps";
import MapView from "react-native-web-maps";

interface MapProps {
  markers?: LatLng[];
  onChange: (coords: LatLng) => void;
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
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001,
  };

  const onDragEnd = (marker: any) => {
    onChange({
      latitude: marker.latLng.lat() as number,
      longitude: marker.latLng.lng() as number,
    });
  };

  return (
    <View style={styles.container}>
      {/* {JSON.stringify(markers)} */}
      <MapView style={styles.map} initialRegion={initialRegion} key={markers}>
        {markersState?.map((marker: LatLng, index: number): JSX.Element => {
          // console.warn("here", marker);
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              draggable
              onDragEnd={onDragEnd}
              title="Ici"
              description="Vous êtes ici"
            />
          );
        })}
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
