import Map from "@/components/Address/Map";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import RefreshButton from "@/components/Elements/Buttons/RefreshButton";
import SaveButton from "@/components/Elements/Buttons/SaveButton";
import { getAddressForCoordinates, getCoordinatesForAddress, getCurrentLocationFromSensors } from "@/lib/localization";
import { Constatation, Localization } from "@/types";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Card, Text } from "@rneui/base";
import { AxiosResponse } from "axios";
import { LocationObject } from "expo-location";
import React, { useState } from "react";
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";
import LocalizationForm from "./LocalizationForm";

interface LocalizationPartProps {
  // localization?: Localization;
  constatation: Constatation;
}

export default function LocalizationPart({ constatation }: LocalizationPartProps): JSX.Element {
  console.dir(constatation.localization);
  const [coords, setCoords] = useState<Localization | undefined>(constatation.localization);

  // useEffect(() => {
  //   setCoords((prevCoords: Localization | undefined): Localization | undefined => (prevCoords ? { ...prevCoords, ...localization } : localization ? { ...localization } : undefined));
  //   console.dir(localization);
  // }, [localization]);

  const updateCoordsFromSensors = async () => {
    const updatedCoords: LocationObject | undefined = await getCurrentLocationFromSensors();

    setCoords((oldCoords: Localization | undefined): Localization | undefined => ({
      ...oldCoords,
      ...updatedCoords?.coords,
    }));

    if (updatedCoords) {
      updateAddressFromCoords(updatedCoords.coords);
      // getAddressForCoordinates({
      //   latitude: updatedCoords.coords.latitude,
      //   longitude: updatedCoords.coords.longitude,
      // }).then((newCoords) =>
      //   setCoords((prevCoords: Localization | undefined): Localization | undefined => ({
      //     ...prevCoords,
      //     ...newCoords,
      //   }))
      // );
    }
  };

  const updateAddressFromCoords = async (coords: LatLng) => {
    getAddressForCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }).then((newCoords: AxiosResponse<Localization>) =>
      setCoords((prevCoords: Localization | undefined): Localization | undefined => ({
        ...prevCoords,
        ...newCoords,
      }))
    );
  };

  const updateCoordsFromAddress = async () => {
    if (coords && coords.formatted_address) {
      await getCoordinatesForAddress(coords.formatted_address).then((newCoords) =>
        setCoords((prevCoords: Localization | undefined): Localization | undefined => ({
          ...prevCoords,
          ...newCoords,
        }))
      );
    }
  };

  const updateLocalizationMutation = useUpdateLocalization();

  async function onSubmit() {
    console.dir("here", coords);
    if (coords) {
      updateLocalizationMutation.mutateAsync({
        localization: coords,
        constatationId: constatation.id,
      });
    }
  }

  const onChange = (marker: LatLng) => {
    setCoords((prevCoords: Localization | undefined): Localization => ({ ...prevCoords, latitude: marker.latitude, longitude: marker.longitude }));
  };

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <RefreshButton callBack={updateCoordsFromSensors}></RefreshButton>
        <SaveButton callBack={onSubmit}></SaveButton>

        {/* <Button title="Génerer par l'appareil " onPress={() => updateCoordsFromSensors()} icon={<MaterialCommunityIcons name="cog-refresh" size={24} color="white" />} iconRight={true} /> */}
        {/* <Button title="Enregistrer " onPress={() => onSubmit()} icon={<AntDesign name="cloudupload" size={24} color="white" />} iconRight={true} /> */}
      </FloatingButtonStack>

      <View style={styles.form}>{coords && <LocalizationForm coords={coords} onSubmit={onSubmit} />}</View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button style={{ width: 200 }} icon={<FontAwesome name="hand-o-up" size={24} color="white" />} iconRight={true} disabled={coords?.latitude && coords?.longitude ? false : true} title="Maj adresse " onPress={() => updateAddressFromCoords({ latitude: coords?.latitude!, longitude: coords?.longitude! })} />
        <Button style={{ width: 200 }} icon={<FontAwesome name="hand-o-down" size={24} color="white" />} disabled={coords?.formatted_address ? false : true} title=" Maj coords" onPress={() => updateCoordsFromAddress()} />
      </View>

      {coords && coords.latitude && coords.longitude && (
        <TouchableOpacity onPress={() => Linking.openURL("https://www.google.com/maps/place/" + coords.latitude + "," + coords.longitude)}>
          <Text style={{ color: "blue", alignSelf: "center" }}>
            Ouvrir sur maps <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
          </Text>
        </TouchableOpacity>
      )}

      {/* <MapInfos /> */}
      <Map markers={coords && coords.latitude && coords.longitude ? [{ latitude: coords.latitude, longitude: coords.longitude }] : []} onChange={onChange} />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  form: {
    marginTop: "60px",
  },
  map: {
    width: 0.8 * Dimensions.get("window").width,
    height: 0.8 * Dimensions.get("window").width,
  },
});
