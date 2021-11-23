import React from "react";

import { Card } from "react-native-elements/dist/card/Card";
import { ImagesPart } from "../subfeatures/images/components/ImagesPart";

import { LocalizationPart } from "../subfeatures/localization/components/LocalizationPart";
import { useCreateConstatation } from "../hooks/useCreateConstatation";

export default function Create() {
  const createConstatationMutation = useCreateConstatation();

  return (
    <Card>
      <ImagesPart />
      <LocationPart />
    </Card>
  );
}
