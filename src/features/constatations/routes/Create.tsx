import React from "react";

import { Card } from "react-native-elements/dist/card/Card";
import { ImagesPart } from "../components/Edit/ImagesPart";

import { LocationPart } from "../components/Edit/LocationPart";
import { useCreateConstatation } from "../hooks/useCreateConstatation";

export function Create() {
  const createConstatationMutation = useCreateConstatation();

  return (
    <Card>
      <ImagesPart />
      <LocationPart />
    </Card>
  );
}
