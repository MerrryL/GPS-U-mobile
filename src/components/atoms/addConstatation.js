import React, { useState } from "react";

import { Button } from "react-native-elements";

import { useMutation, useQueryClient } from "react-query";

import { createConstatation } from "../../my-api/constatations";

import getCurrentLocation from "../../services/getCurrentLocation";

export default function AddConstatation() {
  const [location, setLocation] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ["constatations", location],
    () => createConstatation(location),
    {
      onSuccess: () => {
        // Invalidate and refetch
        console.log("here");
        queryClient.invalidateQueries("constatations");
      }
    }
  );

  return (
    <Button
      title="Nouvelle constatation"
      onPress={async () => {
        //TODO: REALLY BAD BECAUSE OF ASYNCHRONICITY?
        const location = await getCurrentLocation();
        setLocation(location);
        mutation.mutate();
      }}
    ></Button>
  );
}
