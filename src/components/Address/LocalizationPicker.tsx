import { Localization } from "@/types";
import React, { useState } from "react";
import { View } from "react-native";

type LocalizationPickerProps = {
  localization: Localization;
  constatationId: string;
};

export default function LocalizationPicker({ localization, constatationId }: LocalizationPickerProps) {
  const [coords, setCoords] = useState<Localization>(localization || {});
  return <View></View>;
}
