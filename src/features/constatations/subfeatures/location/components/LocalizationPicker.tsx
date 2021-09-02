import {
  getAddressForCoordinates,
  getCoordinatesForAddress,
  getCurrentLocationFromSensors,
} from "@/lib/localization";
import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";

import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Localization } from "../types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocalization } from "../hooks/useLocalization";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";

const schema = yup.object().shape({
  id: yup.string(),
  accuracy: yup.string(),
  address_components: yup.string(),
  altitude: yup.string(),
  altitudeAccuracy: yup.string(),
  constatation_id: yup.string(),
  formatted_address: yup.string(),
  given_name: yup.string(),
  heading: yup.string(),
  latitude: yup.string(),
  longitude: yup.string(),
  place_id: yup.string(),
  speed: yup.string(),
  viewport: yup.string(),
  created_at: yup.string(),
  updated_at: yup.string(),
});

type LocalizationPickerProps = {
  localization: Localization,
  constatationId: string,
}

export default function LocalizationPicker({ localization, constatationId }: LocalizationPickerProps) {

  const {
    register, handleSubmit, setValue, getValues,
    formState: { errors },
  } = useForm<Localization>({
    // defaultValues: { localization } as Localization,
    resolver: yupResolver(schema),
  });


  const initialRegion = {
    latitude: 50.509317,
    longitude: 3.590973,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001,
  };

  const [coords, setCoords] = useState({
    id: localization?.id ?? null,
    accuracy: localization?.accuracy ?? null,
    address_components: localization?.address_components ?? [],
    altitude: localization?.altitude ?? null,
    altitudeAccuracy: localization?.altitudeAccuracy ?? null,
    constatation_id: localization?.constatation_id ?? null,
    formatted_address: localization?.formatted_address ?? null,
    given_name: localization?.given_name ?? null,
    heading: localization?.heading ?? null,
    latitude: localization?.latitude ?? null,
    longitude: localization?.longitude ?? null,
    place_id: localization?.place_id ?? null,
    speed: localization?.speed ?? null,
    viewport: localization?.viewport ?? {},
    created_at: localization?.created_at ?? null,
    updated_at: localization?.updated_at ?? null,
  });

  const updateCoordsFromSensors = async () => {
    let updatedCoords = await getCurrentLocationFromSensors();
    console.log(coords);
    setCoords((prevCoords) => ({
      ...prevCoords,
      accuracy: updatedCoords?.coords?.accuracy,
      altitude: updatedCoords?.coords?.altitude,
      altitudeAccuracy: updatedCoords?.coords?.altitudeAccuracy,
      heading: updatedCoords?.coords?.heading,
      latitude: updatedCoords?.coords?.latitude,
      longitude: updatedCoords?.coords?.longitude,
      speed: updatedCoords?.coords?.speed,
    }));

    let updatedAddress = await getAddressForCoordinates({
      latitude: updatedCoords?.coords?.latitude,
      longitude: updatedCoords?.coords?.longitude,
    });
    setCoords((prevCoords) => ({
      ...prevCoords,
      accuracy: updatedAddress?.accuracy,
      address_components: updatedAddress?.address_components,
      formatted_address: updatedAddress.formatted_address,
      latitude: updatedAddress?.lat,
      place_id: updatedAddress?.place_id,
      longitude: updatedAddress?.lng,
      viewport: updatedAddress?.viewport,
    }));
  };

  const updateAddressFromCoords = async () => {
    let updatedAddress = await getAddressForCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setCoords((prevCoords) => ({
      ...prevCoords,
      accuracy: updatedAddress?.accuracy,
      address_components: updatedAddress?.address_components,
      formatted_address: updatedAddress.formatted_address,
      latitude: updatedAddress?.lat,
      place_id: updatedAddress?.place_id,
      longitude: updatedAddress?.lng,
      viewport: updatedAddress?.viewport,
    }));
  };

  const updateAddressFromInput = (newAddress) => {
    setCoords((prevCoords) => ({
      ...prevCoords,
      formatted_address: newAddress,
    }));
  };

  const updateGivenNameFromInput = (newGivenName) => {
    setCoords((prevCoords) => ({
      ...prevCoords,
      given_name: newGivenName,
    }));
  };

  const updateCoordsFromAddress = async () => {
    const newCoords = await getCoordinatesForAddress({
      formatted_address: coords.formatted_address,
    });
    setCoords((prevCoords) => ({
      ...prevCoords,
      latitude: newCoords.lat,
      longitude: newCoords.lng,
      accuracy: newCoords.accuracy,
      viewport: newCoords.viewport,
      address_components: newCoords.address_components,
    }));
  };

  const updateLocalizationMutation = useUpdateLocalization();

  async function onSubmit(values) {
    console.log("values", values);
    await updateLocalizationMutation.mutateAsync({
      id: values.id,
      latitude: values.latitude,
      longitude: values.longitude,
      formattedAddress: values.formattedAddress,
      constatationId: values.constatationId,
    });

    //onSuccess();
  };

  return (
    <>
      <Text>
        latitude: {coords?.latitude?.toFixed(6)} longitude:
        {coords?.longitude?.toFixed(6)}
      </Text>
      <Button title="updateLocFromSensors" onPress={updateCoordsFromSensors} />

      <Input
        {...register("id")}
        placeholder="id"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        defaultValue={localization?.id ?? ""}
      />
      <Text>{errors.id?.message}</Text>

      <Input
        {...register("accuracy")}
        placeholder="accuracy"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        defaultValue={localization?.accuracy ?? ""}
      />
      <Text>{errors.accuracy?.message}</Text>






      <Input
        {...register("formatted_address")}
        placeholder="Adresse"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        defaultValue={coords?.formatted_address ?? ""}
        onChangeText={(value) => updateAddressFromInput(value)}
      />
      <Text>{errors.formatted_address?.message}</Text>
      <Input
        placeholder="Lieu-dit"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        value={coords?.given_name ?? ""}
        onChangeText={(value) => updateGivenNameFromInput(value)}
      />
      <Button
        title="updateAddressFromCoords"
        onPress={updateAddressFromCoords}
      />
      <Button
        title="updateCoordsFromAddress"
        onPress={updateCoordsFromAddress}
      />

      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {/* <MapView.Marker
            coordinate={{
              latitude: parseFloat(coords?.latitude),
              longitude: parseFloat(coords?.longitude),
            }}
            draggable
            onDragEnd={(e) =>
              setCoords((prevCoords) => ({
                ...prevCoords,
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng(),
              }))
            }
            title="Ici"
            description="Vous êtes ici"
          /> */}
        </MapView>
      </View>
      <Button title="Envoyer au serveur" onPress={handleSubmit(onSubmit)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: "10",
  },
  map: {
    width: 0.8 * Dimensions.get("window").width,
    height: 0.8 * Dimensions.get("window").width,
  },
});
