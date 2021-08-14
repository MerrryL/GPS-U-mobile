import * as Location from "expo-location";
import apiClient from "./api";

export default async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    //setErrorMsg("Permission to access location was denied");
    return;
  } else {
    // let location = {
    //   coords: {
    //     latitude: null,
    //     longitude: null,
    //     altitude: null,
    //     accuracy: null,
    //     altitudeAccuracy: null,
    //     heading: null,
    //     speed: null
    //   },
    //   timestamp: null,
    //   address: {
    //     lat: null,
    //     lng: null,
    //     accuracy: null,
    //     formatted_address: null,
    //     viewport: {},
    //     address_components: [],
    //     place_id: null
    //   }
    // };
    let location = await Location.getCurrentPositionAsync({});

    let address = await apiClient.post("/AdressFromCoordinates", {
      lat: "50.509345",
      lng: "3.591042"
    });

    location["address"] = address.data;

    console.log("locationmodded", location);

    return location;
  }
}
