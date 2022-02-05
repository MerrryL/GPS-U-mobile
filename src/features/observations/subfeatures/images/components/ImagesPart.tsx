import React, { useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Dimensions } from "react-native";

import { Button, Card, Chip, Input, ListItem, Text, Tile } from "react-native-elements";

import ImagesPartAdd from "./ImagesPartAdd";
import ImagesPartView from "./ImagesPartView";
import { useImages } from "../hooks/useObservationImages";

type ImagesPartProps = {
  observationId: string;
};

export function ImagesPart({ observationId }: ImagesPartProps) {
  const ImagesQuery = useImages({
    observationId: observationId,
  });

  return (
    <View>
      <View>
        <ImagesPartAdd observationId={observationId} />
      </View>
      {ImagesQuery?.data?.map((image, index) => (
        <ImagesPartView observationId={observationId} imageId={image.id} key={index} />
      ))}
    </View>
  );
}
