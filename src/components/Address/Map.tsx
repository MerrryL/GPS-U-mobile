import React from "react";
import { Platform } from "react-native";

import { Marker } from "@/types";

import MapForMobile from "./MapForMobile";
import MapForWeb from "./MapForWeb";

//TODO: add type
type MapProps = {
  markers: Marker[];
  onChange: any;
};

export default function Map({ markers, onChange }: MapProps) {
  if (Platform.OS === "web") {
    return <MapForWeb markers={markers} onChange={onChange} />;
  } else {
    return <MapForMobile markers={markers} onChange={onChange} />;
  }
}
