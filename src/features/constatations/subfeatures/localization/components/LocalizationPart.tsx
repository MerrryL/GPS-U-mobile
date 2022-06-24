import Map from "@/components/Address/Map";
import RefreshButton from "@/components/Elements/Buttons/RefreshButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { getAddressForCoordinates, getCoordinatesForAddress, getCurrentLocationFromSensors } from "@/lib/localization";
import { Constatation, Localization } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Button, Card, Colors, Input, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import { LocationObject } from "expo-location";
import React, { useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { LatLng } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import { useUpdateLocalization } from "../hooks/useUpdateLocalization";

interface LocalizationPartProps {
  constatation: Constatation;
}

interface StyleProps {
  container: StyleProp<ViewStyle>;
  buttons: StyleProp<ViewStyle>;
  coordsContainer: StyleProp<ViewStyle>;
  input: StyleProp<TextStyle>;
  coords: StyleProp<TextStyle>;
}

interface LocForm {
  given_name: string;
  formatted_address: string;
}

export default function LocalizationPart({ constatation }: LocalizationPartProps): JSX.Element {
  const styles: StyleProps = useStyles();
  const updateLocalizationMutation = useUpdateLocalization();
  const [coords, setCoords] = useState<Localization>(constatation.localization);
  const [form, setForm] = useState<LocForm>({ given_name: constatation.localization.given_name ?? "", formatted_address: constatation.localization.formatted_address ?? "" });

  const updateCoords = (newCoords: Localization): void =>{
    console.warn(newCoords.formatted_address);
    setCoords( (prevCoords: Localization): Localization => ( {...prevCoords, ...newCoords}));      
      console.log("coords", coords.formatted_address);
  };

  const updateCoordsFromSensors = async () => {
    const updatedCoords: LocationObject | undefined = await getCurrentLocationFromSensors();

    if (updatedCoords) {
      updateCoords(updatedCoords.coords);
      updateAddressFromCoords(updatedCoords.coords);
    }
  };

  const updateAddressFromCoords = async (newCoords: LatLng) => {
    getAddressForCoordinates({
      latitude: newCoords.latitude,
      longitude: newCoords.longitude,
    }).then((response: Localization) => {
      updateCoords(response);
    });
  };

  const updateCoordsFromAddress = async () => {
    if (coords && coords.formatted_address) {
      await getCoordinatesForAddress(coords.formatted_address).then((response: LatLng) => updateCoords(response));
    }
  };

  const onSubmit = async (data: LocForm) => {
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
      schema: yup.string().defined(),
      value: coords.given_name,
    },
    {
      name: "formatted_address",
      label: "Adresse",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      value: coords.formatted_address,
    },
  ];

  const onWatch = (watch: UseFormWatch<LocForm>) => {
    // setForm((previousValue) => ({...previousValue,...watch()}));
    console.log("hey", watch());
    // setForm(watch());
  };

  return (
    <Card containerStyle={styles.container}>

      <Card containerStyle={styles.buttons}>
        <RefreshButton callBack={updateCoordsFromSensors}></RefreshButton>
        <Button icon={<FontAwesome name="hand-o-down" size={24} color="white" />} disabled={coords?.formatted_address ? false : true} title=" Maj coords" onPress={() => updateCoordsFromAddress()} />
        <Button icon={<FontAwesome name="hand-o-up" size={24} color="white" />} iconRight={true} disabled={coords?.latitude && coords?.longitude ? false : true} title="Maj adresse " onPress={() => updateAddressFromCoords({ latitude: coords?.latitude!, longitude: coords?.longitude! })} />
      </Card>

      <Card wrapperStyle={styles.coordsContainer}>
        <Input containerStyle={styles.coords} inputStyle={styles.input} label="Longitude" disabled value={coords.longitude?.toString()} />
        <Input containerStyle={styles.coords} inputStyle={styles.input} label="Latitude" disabled value={coords.latitude?.toString()} />
      </Card>

      <FormBuilder title="Localisation" description="Où la constatation a eu lieu" fields={newLocalizationForm} onSubmit={onSubmit} onWatch={onWatch} />

      <Map
        markers={coords && coords.latitude && coords.longitude ? [{ latitude: +coords.latitude, longitude: +coords.longitude }] : []}
        onChange={(coords: LatLng): void => {
          updateCoords(coords);
        }}
      />
    </Card>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme?.colors?.grey5,
    display: "flex",
  },
  coordsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme?.colors?.white,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: theme?.colors?.white,
  },
  input: {
    fontSize: 12,
  },
  coords: {
    flexBasis: "50%",
  },
}));
