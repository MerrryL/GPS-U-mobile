import { Card } from "@rneui/base";
import React from "react";
import { ConstatationEditCard } from "../components/Edit/ConstatationEditCard";
// import { ImagesPart } from "../subfeatures/images/components/ImagesPart";
// import { LocalizationPart } from "../subfeatures/localization/components/LocalizationPart";
import { useCreateConstatation } from "../hooks/useCreateConstatation";

export default function Create() {
  const createConstatationMutation = useCreateConstatation();

  return (
    <Card>
      <ConstatationEditCard />
      {/* <ImagesPart /> */}
      {/* <LocationPart /> */}
    </Card>
  );
}
