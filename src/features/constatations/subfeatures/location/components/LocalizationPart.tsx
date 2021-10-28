import React from "react";
import { Platform } from "react-native";
import { Text } from "react-native-elements";

import { useLocalization } from "../hooks/useLocalization";
import LocalizationPicker from "./LocalizationPicker";
import LocalizationPickerWeb from "./LocalizationPickerWeb";

//TODO: add type
export function LocalizationPart({ constatationId }) {
  const LocalizationQuery = useLocalization({
    constatationId: constatationId,
  });

  if (Platform.OS === "web") {
    return (
      <>
        <LocalizationPickerWeb
          localization={LocalizationQuery?.data}
          constatationId={constatationId}
        />
      </>
    );
  } else {
    return (
      <>
        <Text>This feature is coming soon for mobile!</Text>
        {/* <LocalizationPicker
          localization={LocalizationQuery?.data}
          constatationId={constatationId}
        /> */}
      </>
    );
  }
}
