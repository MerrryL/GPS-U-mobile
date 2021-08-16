import React, { useState } from "react";
import Select from "react-select";

import { Button, FAB, Text, ButtonGroup } from "react-native-elements";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { createConstatation, importModels, importCopies } from "../api";

import getCurrentLocation from "../utils/getCurrentLocation";

export function AddConstatation() {
  const [location, setLocation] = useState({
    coords: {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: null,
    address: {
      lat: null,
      lng: null,
      accuracy: null,
      formatted_address: null,
      viewport: {},
      address_components: [],
      place_id: null,
    },
  });
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => {
    !isVisible && updateLocation();
    !isVisible && fetchOptions(useQuery("options", importOptions));
    setVisible(!isVisible);
  };

  const [options, fetchOptions] = useState({ models: [], copies: [] });

  const updateLocation = async () => {
    const location = await getCurrentLocation();
    setLocation(location);
  };

  const queryClient = useQueryClient();

  const buttons = ["blank", "Model", "Copy"];
  const [selectedIndex, updateIndex] = useState(0);

  const mutation = useMutation(
    ["constatations", location],
    () => createConstatation(location),
    {
      onSuccess: () => {
        // Invalidate and refetch
        console.log("here");
        queryClient.invalidateQueries("constatations");
      },
    }
  );

  return (
    <>
      {isVisible && (
        <>
          <Select options={options}></Select>
          <ButtonGroup
            onPress={updateIndex.bind(this)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 100 }}
          />
          <FAB title="Refresh" onPress={updateLocation} />
          <Text>
            {location?.coords?.latitude} - {location?.coords?.longitude}
          </Text>
          <Text>{location?.address?.formatted_address}</Text>

          <Button
            title="Nouvelle constatation"
            onPress={() => {
              mutation.mutate();
            }}
          ></Button>
        </>
      )}

      <FAB title="+" onPress={toggleVisibility} />
    </>
  );
}
