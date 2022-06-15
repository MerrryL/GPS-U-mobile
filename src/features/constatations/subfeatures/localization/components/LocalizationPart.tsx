import Map from "@/components/Address/Map";
import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import RefreshButton from "@/components/Elements/Buttons/RefreshButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { getAddressForCoordinates, getCoordinatesForAddress, getCurrentLocationFromSensors } from "@/lib/localization";
import { Constatation, Localization } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Card, Colors, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import { AxiosResponse } from "axios";
import { LocationObject } from "expo-location";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { LatLng } from "react-native-maps";
import * as yup from "yup";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";

interface LocalizationPartProps {
  constatation: Constatation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
}

export default function LocalizationPart({ constatation }: LocalizationPartProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const updateLocalizationMutation = useUpdateLocalization();
  const [coords, setCoords] = useState<Localization>(constatation.localization);

  const updateCoords = (newCoords: Localization): void =>
    setCoords(
      (prevCoords: Localization): Localization => ({
        ...prevCoords,
        ...newCoords,
      })
    );

  // useEffect(() => {
  //   setCoords((prevCoords: Localization | undefined): Localization | undefined => (prevCoords ? { ...prevCoords, ...localization } : localization ? { ...localization } : undefined));
  //   console.dir(localization);
  // }, [localization]);

  const updateCoordsFromSensors = async () => {
    const updatedCoords: LocationObject | undefined = await getCurrentLocationFromSensors();

    if (updatedCoords) {
      updateCoords(updatedCoords.coords);
      updateAddressFromCoords(updatedCoords.coords);
    }
  };

  const updateAddressFromCoords = async (coords: LatLng) => {
    getAddressForCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    }).then((response: AxiosResponse<Localization>) => updateCoords(response.data));
  };

  const updateCoordsFromAddress = async () => {
    if (coords && coords.formatted_address) {
      await getCoordinatesForAddress(coords.formatted_address).then((response: AxiosResponse<LatLng>) => updateCoords(response.data));
    }
  };

  const onSubmit = async (data: any) => {
    console.dir("here", data);
    await updateLocalizationMutation.mutateAsync({
      localization: data,
      constatationId: constatation.id,
    });
  };

  const newLocalizationForm: InputedField[] = [
    {
      name: "given_name",
      label: "Lieu-dit",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      value: coords.given_name,
    },
    {
      name: "formatted_address",
      label: "Adresse",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      value: coords.formatted_address,
    },
    {
      name: "latitude",
      label: "latitude",
      type: InputType.Text,
      schema: yup.number().defined(),
      value: coords.latitude,
    },
    {
      name: "longitude",
      label: "longitude",
      type: InputType.Text,
      schema: yup.number().defined(),
      value: coords.longitude,
    },
  ];

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <RefreshButton callBack={updateCoordsFromSensors}></RefreshButton>
        {/* <SaveButton callBack={onSubmit}></SaveButton> */}
      </FloatingButtonStack>

      {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button style={{ width: 200 }} icon={<FontAwesome name="hand-o-up" size={24} color="white" />} iconRight={true} disabled={coords?.latitude && coords?.longitude ? false : true} title="Maj adresse " onPress={() => updateAddressFromCoords({ latitude: coords?.latitude!, longitude: coords?.longitude! })} />
        <Button style={{ width: 200 }} icon={<FontAwesome name="hand-o-down" size={24} color="white" />} disabled={coords?.formatted_address ? false : true} title=" Maj coords" onPress={() => updateCoordsFromAddress()} />
      </View> */}

      <Map
        markers={coords && coords.latitude && coords.longitude ? [{ latitude: +coords.latitude, longitude: +coords.longitude }] : []}
        onChange={(coords) => {
          console.log(coords);
          updateCoords(coords);
        }}
      />

      {/* {coords && coords.latitude && coords.longitude && (
        <TouchableOpacity onPress={() => Linking.openURL("https://www.google.com/maps/place/" + coords.latitude + "," + coords.longitude)}>
          <Text style={{ color: "blue", alignSelf: "center" }}>
            Ouvrir sur maps <MaterialCommunityIcons name="google-maps" size={24} color="blue" />
          </Text>
        </TouchableOpacity>
      )} */}

      <FormBuilder title="Localisation" description="Où la constatation a eu lieu" fields={newLocalizationForm} onSubmit={onSubmit} />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
  },
}));
