import React, { useState, useEffect } from "react";
import { Card, Chip, Button, Icon, Text, Input } from "react-native-elements";
import { Image, View, Platform, ScrollView } from "react-native";
import { useDeleteObservationImage } from "../hooks/useDeleteObservationImage";
import { useObservationImage } from "../hooks/useObservationImage";
import { useNotificationStore } from "@/hooks/useNotificationStore";


type ImagesPartViewProps = {
  observationId: string;
  imageId: string;
  key: number;
};

export default function ImagesPartView({ observationId, imageId }:ImagesPartViewProps) {
  const { addNotification } = useNotificationStore();
  const imageQuery = useObservationImage({
      imageId: imageId,
      observationId: observationId,
  });

  const imageDeleteMutation = useDeleteObservationImage({imageId: imageId, observationId: imageQuery?.data?.observation_id});

  const onDeleteSubmit = async () => {
    await imageDeleteMutation.mutateAsync({
        observationId: imageQuery?.data?.observation_id,
        imageId: imageId,
    });
  };

  console.log(imageQuery?.data);

  return(
    <>
      <ScrollView >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin:"10px" }}>
          <View style={{ flex: 1, justifyContent: "space-between", alignItems: "stretch", flexDirection: "row", width: "100%" }}>
            <Text style={{ alignSelf: "center"}} h2>{imageQuery?.data?.name}</Text>
            <Chip style={{ alignSelf: "flex-end", margin: "auto"}} title="Annuler" onPress={onDeleteSubmit} />
          </View>
          <Text h5>{imageQuery?.data?.description}</Text>
        </View>
      </ScrollView>
    </>
  )
}