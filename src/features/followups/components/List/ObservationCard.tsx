import React from "react";

import { Observation } from "@/types";
import { useNavigation } from "@react-navigation/native";

import {
  Card,
  Image,
  Button,
  Icon,
  Divider,
  Text,
} from "react-native-elements";

import { View } from "react-native";

type observationCardProps = {
  observation: Observation;
};

export function ObservationCard({ observation }: observationCardProps) {
  const navigation = useNavigation();

  //console.log(observation);
  return (
    <Card>

    </Card>
  );
}
