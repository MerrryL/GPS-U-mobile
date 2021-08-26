import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { axios } from "@/lib/axios";

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    //setErrorMsg("Permission to access location was denied");
    return;
  } else {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    console.log("location", location);

    /*const address = await axios.post("/AdressFromCoordinates", {
      lat: "50.509345",
      lng: "3.591042",
    });

    location["address"] = address.data;

    console.log("locationmodded", location);*/

    return location;
  }
}

export async function getAddressFromCoords(latitude, longitude) {
  return await axios.post("/AdressFromCoordinates", {
    lat: latitude,
    lng: longitude,
  });
}