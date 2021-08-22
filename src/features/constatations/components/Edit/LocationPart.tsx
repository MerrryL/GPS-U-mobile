import React, { useState } from "react";
import { FAB, Text } from "react-native-elements";

//import { Localization } from "../types";
import { getCurrentLocation } from "@/lib/localization";

export function LocationPart({ constatationId = null }) {
  const [localization, setLocation] = useState({
    coords: {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: null,
    address: {
      lat: null,
      lng: null,
      accuracy: null,
      formatted_address: null,
      viewport: {},
      address_components: [],
      place_id: null,
    },
  });

  const updateLocation = async () => {
    const location = await getCurrentLocation();
    setLocation(location);
  };

  return (
    <>
      {/* <FAB title="Refresh" onPress={updateLocation} /> */}

      <Text>
        {localization?.coords?.latitude} - {localization?.coords?.longitude}
      </Text>
      <Text>{localization?.address?.formatted_address}</Text>
    </>
  );
}
