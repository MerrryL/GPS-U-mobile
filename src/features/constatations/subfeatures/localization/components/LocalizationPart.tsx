import { FloatingButtonStack } from "@/components/Elements/Buttons/ButtonStack";
import RefreshButton from "@/components/Elements/Buttons/RefreshButton";
import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { CoordsDTO, getAddressForCoordinates, getCoordinatesForAddress, getCurrentLocationFromSensors } from "@/lib/localization";
import { Constatation, Localization } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import { Button, Card, Colors, Input, Theme } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import { LocationObject } from "expo-location";
import React, { useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { LatLng } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import Map from "@/components/Address/Map";
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

  const updateCoords = (newCoords: Localization): void => {
    setCoords((prevCoords: Localization): Localization => ({ ...prevCoords, ...newCoords }));
  };

  const updateCoordsFromSensors = async () => {
    const updatedCoords: LocationObject | undefined = await getCurrentLocationFromSensors();

    if (updatedCoords) {
      updateCoords(updatedCoords.coords);
      updateAddressFromCoords();
    }
  };

  let mySetValue: UseFormSetValue<LocForm> | undefined = undefined;
  const updateAddressFromCoords = async () => {
    if (mySetValue && coords.latitude && coords.longitude) {
      getAddressForCoordinates({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }).then((response: Localization) => {
        mySetValue && mySetValue('formatted_address', response.formatted_address ?? "");
      });
    }
  };
  let myGetValues: UseFormGetValues<LocForm> | undefined = undefined;

  const updateCoordsFromAddress = async () => {
    if (myGetValues) {
      await getCoordinatesForAddress(myGetValues()["formatted_address"]).then((response: CoordsDTO) => updateCoords({ ...response, latitude: response.lat, longitude: response.lng }));
    }
  };

  const onSubmit = async (data: LocForm) => {
    await updateLocalizationMutation.mutateAsync({
      localization: {...coords, ...data},
      constatationId: constatation.id,
    });
  };

  const newLocalizationForm: InputedField[] = [
    {
      name: "given_name",
      label: "Lieu-dit",
      type: InputType.Text,
      schema: yup.string().min(1).defined(),
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

  return (
    <Card containerStyle={styles.container}>
      <FloatingButtonStack>
        <RefreshButton callBack={updateCoordsFromSensors}></RefreshButton>
      </FloatingButtonStack>
      <Card wrapperStyle={styles.coordsContainer}>
        <Input containerStyle={styles.coords} inputStyle={styles.input} label="Longitude" disabled value={coords.longitude?.toString()} />
        <Input containerStyle={styles.coords} inputStyle={styles.input} label="Latitude" disabled value={coords.latitude?.toString()} />
      </Card>

      <Card wrapperStyle={styles.buttons}>
        <Button icon={<FontAwesome name="hand-o-up" size={24} color="white" />} disabled={coords?.formatted_address ? false : true} title=" Maj coords" onPress={updateCoordsFromAddress} />
        <Button icon={<FontAwesome name="hand-o-down" size={24} color="white" />} iconRight={true} disabled={coords?.latitude && coords?.longitude ? false : true} title="Maj adresse " onPress={updateAddressFromCoords} />
      </Card>

      <FormBuilder title="Localisation" description="Où la constatation a eu lieu" fields={newLocalizationForm} onSubmit={onSubmit} read={(getValues) => (myGetValues = getValues)} update={(setValue) => (mySetValue = setValue)} />

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
    alignContent: "space-between",
    justifyContent: "space-between",
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
