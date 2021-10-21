import React from "react";

import { Card } from "react-native-elements/dist/card/Card";

import { useCreateObservation } from "../hooks/useCreateObservation";

export default function Create() {
  const createObservationMutation = useCreateObservation();

  return <Card></Card>;
}
