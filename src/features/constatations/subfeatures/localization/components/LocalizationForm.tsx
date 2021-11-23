import React, { useState } from "react";
import { View } from "react-native";
import { makeStyles } from "react-native-elements";

import TextInput from "@/components/Elements/Inputs/TextInput";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


type LocalizationValues = {
    given_name: string;
    address:string;
    latitude:string;
    longitude:string;
    observations: any;
};
  
const schema = yup.object().shape({
    given_name: yup.string().required(),
    address: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
});

export default function LocalizationForm({coords}) {
    console.log("coords", coords);
    const styles = useStyles();

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<LocalizationValues>({
        resolver: yupResolver(schema),
      });



    return (
        <View>
            <TextInput name="given_name" defaultValue={coords.given_name} label="Lieu-dit" control={control}/>
            <TextInput name="address" defaultValue={coords.given_name} label="Adresse" control={control}/>
            <View style={styles.coords}>
                <TextInput
                    name="latitude"
                    label="Lat"
                    leftIcon={<MaterialCommunityIcons name="latitude" size={24} color="black" />}
                    editable={false}
                    defaultValue={coords.latitude || ""}
                    control={control}
                />
                <TextInput
                    name="longitude"
                    label="Lng"
                    leftIcon={<MaterialCommunityIcons name="longitude" size={24} color="black" />}
                    editable={false}
                    defaultValue={coords.longitude || ""} 
                    control={control}    
                />

            </View>
            
            

        </View>
    )
}
const useStyles = makeStyles((theme, props) => ({
    container: {
        
    },
    coords:{
        
    },
}));
  

{/* <Input
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
  ); */}
