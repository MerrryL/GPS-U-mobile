import React from "react";
import { Platform } from "react-native";
import { LatLng } from "react-native-maps";
import MapForMobile from "./MapForMobile";
import MapForWeb from "./MapForWeb";

//TODO: add type
type MapProps = {
  markers: LatLng[];
  onChange?: (coords: LatLng) => void;
};

export default function Map({ markers, onChange }: MapProps): JSX.Element {
  if (Platform.OS === "web") {
    return <MapForWeb markers={markers} onChange={onChange} />;
  } else {
    return <MapForMobile markers={markers} onChange={onChange} />;
  }
}
