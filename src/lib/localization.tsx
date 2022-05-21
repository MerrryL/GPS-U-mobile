import { axios } from "@/lib/axios";
import { AxiosResponse } from "axios";
import * as Location from "expo-location";

export async function getCurrentLocationFromSensors(): Promise<Location.LocationObject | undefined> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    //setErrorMsg("Permission to access location was denied");
    return;
  } else {
    const location: Location.LocationObject = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    return location;
  }
}

interface LatLng {
  latitude: number,
  longitude: number,
}

export async function getAddressForCoordinates({ latitude, longitude }:LatLng) {
  return await axios.post("/getAddressForCoordinates", {
    lat: latitude,
    lng: longitude,
  });
}

export async function getCoordinatesForAddress(formatted_address:string): Promise<AxiosResponse<LatLng, any>> {
  return await axios.post<LatLng>("/getCoordinatesForAddress", {
    formatted_address: formatted_address,
  });
}
