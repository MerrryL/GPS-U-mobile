import {
  getAddressForCoordinates,
  getCoordinatesForAddress,
  getCurrentLocationFromSensors,
} from "@/lib/localization";
//TODO:later replace addressinput
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useState, useEffect } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, View, Dimensions, Linking, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-web-maps";

import { Localization } from "@/types";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";

type LocalizationPickerProps = {
  localization: Localization,
  constatationId: string,
}

export default function LocalizationPickerWeb({ localization, constatationId }: LocalizationPickerProps) {
  //TODO:the initialRegion should adapt the latitude/long Delta?
  const defaultCoords = {
    latitude: 50.509317,
    longitude: 3.590973,
  };
  
  const initialRegion = {
    latitude: localization?.latitude ?? defaultCoords.latitude,
    longitude: localization?.longitude ?? defaultCoords.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001,
  };

  const [coords, setCoords] = useState<Localization| undefined>({
    id: localization?.id ?? null,
    accuracy: localization?.accuracy ?? null,
    address_components: localization?.address_components ?? [],
    altitude: localization?.altitude ?? null,
    altitudeAccuracy: localization?.altitudeAccuracy ?? null,
    constatation_id: localization?.constatation_id ?? null,
    formatted_address: localization?.formatted_address ?? null,
    given_name: localization?.given_name ?? null,
    heading: localization?.heading ?? null,
    latitude: localization?.latitude ?? initialRegion.latitude,
    longitude: localization?.longitude ?? initialRegion.longitude,
    place_id: localization?.place_id ?? null,
    speed: localization?.speed ?? null,
    viewport: localization?.viewport ?? {},
    created_at: localization?.created_at ?? null,
    updated_at: localization?.updated_at ?? null,
  });


  useEffect(() => setCoords(localization), [localization]);

  const updateCoordsFromSensors = async () => {
    let updatedCoords = await getCurrentLocationFromSensors();
     // console.table(coords);
     console.log("e", coords?.latitude, coords?.longitude);

    setCoords((oldCoords) => ({
      ...oldCoords,
      accuracy: updatedCoords?.coords?.accuracy,
      altitude: updatedCoords?.coords?.altitude,
      altitudeAccuracy: updatedCoords?.coords?.altitudeAccuracy,
      heading: updatedCoords?.coords?.heading,
      latitude: updatedCoords?.coords?.latitude,
      longitude: updatedCoords?.coords?.longitude,
      speed: updatedCoords?.coords?.speed,
    }));

    console.log("e", coords?.latitude, coords?.longitude);

    let updatedAddress = await getAddressForCoordinates({
      latitude: updatedCoords?.coords?.latitude,
      longitude: updatedCoords?.coords?.longitude,
    });
     // console.table(coords);
    setCoords((prevCoords) => ({
      ...prevCoords,
      accuracy: updatedAddress?.accuracy,
      address_components: updatedAddress?.address_components,
      formatted_address: updatedAddress.formatted_address,
      // latitude: updatedAddress?.lat,
      place_id: updatedAddress?.place_id,
      // longitude: updatedAddress?.lng,
      viewport: updatedAddress?.viewport,
    }));
  };

  const updateAddressFromCoords = async () => {
     // console.table(coords);
    let updatedAddress = await getAddressForCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setCoords((prevCoords) => ({
      ...prevCoords,
      accuracy: updatedAddress?.accuracy,
      address_components: updatedAddress?.address_components,
      formatted_address: updatedAddress.formatted_address,
      // latitude: updatedAddress?.lat,
      place_id: updatedAddress?.place_id,
      // longitude: updatedAddress?.lng,
      viewport: updatedAddress?.viewport,
    }));
  };

  const updateAddressFromInput = (newAddress) => {
     // console.table(coords);
    setCoords((prevCoords) => ({
      ...prevCoords,
      formatted_address: newAddress,
    }));
  };

  const updateGivenNameFromInput = (newGivenName) => {
     // console.table(coords);
    setCoords((prevCoords) => ({
      ...prevCoords,
      given_name: newGivenName,
    }));
  };

  const updateCoordsFromAddress = async () => {
    const newCoords = await getCoordinatesForAddress({
      formatted_address: coords.formatted_address,
    });
     // console.table(coords);
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

  async function onSubmit() {
    setCoords( (prevCoords) => {
       // console.table(prevCoords)
      updateLocalizationMutation.mutateAsync({
        localization: prevCoords,
        constatationId: constatationId,
      });
      return prevCoords;
    });

    //onSuccess();
  };
  
  return (
    <>
      <Input
        placeholder="Lieu-dit"
        leftIcon={<FontAwesome5 name="monument" size={24} color="black" />}
        value={coords?.given_name ?? ""}
        onChangeText={(value) => updateGivenNameFromInput(value)}
      />
      <Input
        placeholder="Adresse"
        leftIcon={{ type: "font-awesome", name: "location-arrow" }}
        value={coords?.formatted_address ?? ""}
        onChangeText={(value) => updateAddressFromInput(value)}
      />
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Button 
          style={{ width: 200 }}
          icon={<FontAwesome name="hand-o-up" size={24} color="white" />}
          iconRight={true}
          disabled={ coords?.latitude && coords?.longitude ? false : true }
          title="Maj adresse "
          onPress={() => updateAddressFromCoords()}
        />
        <Button
          style={{ width: 200 }}
          icon={<FontAwesome name="hand-o-down" size={24} color="white" />}
          disabled={ coords?.formatted_address ? false : true }
          title=" Maj coords"
          onPress={() => updateCoordsFromAddress()}
        />
      </View>
        <Input
          placeholder="Latitude"
          leftIcon={<MaterialCommunityIcons name="latitude" size={24} color="black" />}
          editable={false}
          value={parseFloat(coords?.latitude)?.toFixed(6)}
        />
        <Input
          placeholder="longitude"
          leftIcon={<MaterialCommunityIcons name="longitude" size={24} color="black" />}
          editable={false}
          value={parseFloat(coords?.longitude)?.toFixed(6)}      
        />

      
      <TouchableOpacity onPress={ () => Linking.openURL('https://www.google.com/maps/place/'+coords.latitude+','+coords.longitude)}>
        <Text style={{color: 'blue', alignSelf:"center"}} >
          Ouvrir sur maps <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
        </Text>
      </TouchableOpacity>

      

      


      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {
            typeof coords?.latitude != "undefined"  &&
              <MapView.Marker
              coordinate={{
                latitude: coords?.latitude != null ? parseFloat(coords?.latitude?.toString()) : initialRegion.latitude,
                longitude: coords?.longitude != null ? parseFloat(coords?.longitude?.toString()) : initialRegion.longitude,
              }}
              draggable
              onDragEnd={(e) =>
                setCoords((prevCoords) => ({
                  ...prevCoords,
                  latitude: e.latLng.lat() as number,
                  longitude: e.latLng.lng() as number,
                }))
              }
              title="Ici"
              description="Vous êtes ici"
            />
          }
        </MapView>
      </View>
      <Button title="Génerer par l'appareil " onPress={() => updateCoordsFromSensors()} icon={<MaterialCommunityIcons name="cog-refresh" size={24} color="white" />} iconRight={true}/>
      <Button title="Enregistrer " onPress={() => onSubmit()} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  map: {
    width: 0.8 * Dimensions.get("window").width,
    height: 0.8 * Dimensions.get("window").width,
  },
});
