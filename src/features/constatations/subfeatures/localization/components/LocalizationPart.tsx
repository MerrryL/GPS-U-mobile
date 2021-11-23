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
import Map from "@/components/Address/Map";
import LocalizationForm from "./LocalizationForm";

type LocalizationPartProps = {
  localization: Localization,
  constatationId: string,
}

export default function LocalizationPart({ localization, constatationId }: LocalizationPartProps) {
  

  const [coords, setCoords] = useState<Localization>(localization || {});

  useEffect(() => {
    //TODO: not working and can't make it work ffs
    //console.log("triggered", localization, "coords", coords);
    setCoords((prevCoords) => ({...prevCoords, localization}));

  }, [localization]);

  const updateCoordsFromSensors = async () => {
    let updatedCoords = await getCurrentLocationFromSensors();
    console.log("up", updatedCoords.coords);
    setCoords((oldCoords) => ({
      ...oldCoords,
      ...updatedCoords.coords
    }));


    getAddressForCoordinates({
      latitude: updatedCoords?.coords?.latitude,
      longitude: updatedCoords?.coords?.longitude,
    }).then(((newCoords) => (
        setCoords((prevCoords) => ({
          ...prevCoords,
          ...newCoords
        }))
      ))
    );
    
  };

  const updateAddressFromCoords = async () => {
    getAddressForCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }).then(((newCoords) => (
        setCoords((prevCoords) => ({
          ...prevCoords,
          ...newCoords
        }))
      ))
    );
  };

  const updateCoordsFromAddress = async () => {
    const newCoords = await getCoordinatesForAddress({
      formatted_address: coords.formatted_address,
    }).then(((newCoords) => (
      setCoords((prevCoords) => ({
        ...prevCoords,
        ...newCoords
      }))
    )));
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

  const onChange = (marker) =>{
    console.log("here", marker);
    setCoords((prevCoords) => ({ ...prevCoords, latitude: marker.latitude, longitude: marker.longitude}));
  };
  
  return (
    <>
      <Button title="Génerer par l'appareil " onPress={() => updateCoordsFromSensors()} icon={<MaterialCommunityIcons name="cog-refresh" size={24} color="white" />} iconRight={true}/>
      <Button title="Enregistrer " onPress={() => onSubmit()} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true}  />

      <LocalizationForm coords={coords}/>

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

      
      <TouchableOpacity onPress={ () => Linking.openURL('https://www.google.com/maps/place/'+coords.latitude+','+coords.longitude)}>
        <Text style={{color: 'blue', alignSelf:"center"}} >
          Ouvrir sur maps <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
        </Text>
      </TouchableOpacity>

      {/* <MapInfos /> */}
      <Map markers={[{latitude: coords.latitude, longitude: coords.longitude}]} onChange={onChange} />

      

      


      
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
