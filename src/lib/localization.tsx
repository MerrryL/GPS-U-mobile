import { axios } from "@/lib/axios";
import { Localization } from "@/types";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";

export async function getCurrentLocationFromSensors(): Promise<Location.LocationObject | undefined> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  } else {
    const location: Location.LocationObject = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      mayShowUserSettingsDialog: true,
    });
    return location;
  }
}

export async function getAddressForCoordinates({ latitude, longitude }: LatLng):Promise<Localization> {
  return await axios.post("/getAddressForCoordinates", {
    lat: latitude,
    lng: longitude,
  });
}

export async function getCoordinatesForAddress(formatted_address: string): Promise<LatLng> {
  return await axios.post("/getCoordinatesForAddress", {
    formatted_address: formatted_address,
  });
}
