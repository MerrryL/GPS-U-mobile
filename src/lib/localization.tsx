import { axios } from "@/lib/axios";
import { Localization } from "@/types";
import { AxiosResponse } from "axios";
import * as Location from "expo-location";

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

interface LatLng {
  latitude: number;
  longitude: number;
}

export async function getAddressForCoordinates({ latitude, longitude }: LatLng) {
  return await axios.post<Localization>("/getAddressForCoordinates", {
    lat: latitude,
    lng: longitude,
  });
}

export async function getCoordinatesForAddress(formatted_address: string): Promise<AxiosResponse<LatLng, any>> {
  return await axios.post<LatLng>("/getCoordinatesForAddress", {
    formatted_address: formatted_address,
  });
}
