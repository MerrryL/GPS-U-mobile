import { Card } from "@rneui/base";
import React from "react";
import { useCreateObservation } from "../hooks/useCreateObservation";

export default function Create() {
  const createObservationMutation = useCreateObservation();

  return <Card></Card>;
}
