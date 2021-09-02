import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { axios } from "@/lib/axios";

export async function getCurrentLocationFromSensors() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    //setErrorMsg("Permission to access location was denied");
    return;
  } else {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    return location;
  }
}

export async function getAddressForCoordinates({ latitude, longitude }) {
  return await axios.post("/getAddressForCoordinates", {
    lat: latitude,
    lng: longitude,
  });
}

export async function getCoordinatesForAddress({ formatted_address }) {
  return await axios.post("/getCoordinatesForAddress", {
    formatted_address: formatted_address,
  });
}
