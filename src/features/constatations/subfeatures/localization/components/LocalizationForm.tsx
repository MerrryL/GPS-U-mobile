import FormBuilder from "@/components/Elements/FormBuilder/FormBuilder";
import { Localization } from "@/types";
import { InputedField, InputType } from "@/types/utilityTypes";
import React from "react";
import { Card, FullTheme, makeStyles } from "react-native-elements";
import * as yup from "yup";

interface LocalizationValues {
  given_name: string;
  address: string;
  latitude: string;
  longitude: string;
  observations: any;
}

interface LocalizationFormProps {
  coords: Localization;
  onSubmit: () => void;
}

export default function LocalizationForm({ coords, onSubmit }: LocalizationFormProps): JSX.Element {
  // console.log("coords1", coords);
  const styles = useStyles();

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
      schema: yup.string().min(5).defined(),
      value: coords.latitude?.toString(),
    },
    {
      name: "longitude",
      label: "longitude",
      type: InputType.Text,
      schema: yup.string().min(5).defined(),
      value: coords.longitude?.toString(),
    },
  ];
  return (
    <Card containerStyle={styles.container}>
      {coords ? (
        <>
          <FormBuilder title="Localisation" description="Où la constatation a eu lieu" fields={newLocalizationForm} onSubmit={onSubmit} />

          {/* <TextInput name="given_name" defaultValue={coords.given_name} label="Lieu-dit" control={control} />
          <TextInput name="address" defaultValue={coords.given_name} label="Adresse" control={control} />
          <View style={styles.coords}>
            <TextInput name="latitude" label="Lat" leftIcon={<MaterialCommunityIcons name="latitude" size={24} color="black" />} editable={false} defaultValue={coords.latitude || ""} control={control} />
            <TextInput name="longitude" label="Lng" leftIcon={<MaterialCommunityIcons name="longitude" size={24} color="black" />} editable={false} defaultValue={coords.longitude || ""} control={control} />
          </View> */}
        </>
      ) : (
        <Card.FeaturedTitle>Pas de coordonnées</Card.FeaturedTitle>
      )}
    </Card>
  );
}
const useStyles = makeStyles((theme: Partial<FullTheme>, props) => ({
  container: {
    minHeight: "50px",
    padding: 3,
    margin: 3,
  },
  coords: {},
}));

{
  /* <Input
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
    </>
  ); */
}
