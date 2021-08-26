import React, { useState } from "react";
import { FAB, Text } from "react-native-elements";

//import { Localization } from "../types";
import { getCurrentLocalization } from "@/lib/localization";
import { useLocalizations } from "../hooks/useLocalizations";

export function LocalizationRefreshPart({  }) {
  // const [localization, setLocalization] = useState({
  //   coords: {
  //     latitude: null,
  //     longitude: null,
  //     altitude: null,
  //     accuracy: null,
  //     altitudeAccuracy: null,
  //     heading: null,
  //     speed: null,
  //   },
  //   timestamp: null,
  //   address: {
  //     lat: null,
  //     lng: null,
  //     accuracy: null,
  //     formatted_address: null,
  //     viewport: {},
  //     address_components: [],
  //     place_id: null,
  //   },
  // });

  // const updateLocalization = async () => {
  //   const localization = await getCurrentLocalization();
  //   setLocalization(localization);
  // };
  

  return (
    <>
        <Text> test</Text>

    </>
  );
}
