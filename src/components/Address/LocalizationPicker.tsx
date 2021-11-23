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

export default function LocalizationPicker({ localization, constatationId }: LocalizationPickerProps) {

    const [coords, setCoords] = useState<Localization>(localization  || {})
    return (
        <View>

        </View>
    )


}

