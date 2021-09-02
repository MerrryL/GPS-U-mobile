import React, { useState } from "react";
import { FAB, Text, Button, Input } from "react-native-elements";

//import { Localization } from "../types";

import { useLocalization } from "../hooks/useLocalization";
import LocalizationPicker from "./LocalizationPicker";

export function LocalizationPart({ constatationId = null }) {
  const LocalizationQuery = useLocalization({
    constatationId: constatationId,
  });

  console.log(LocalizationQuery?.data);

  return (
    <>
      <LocalizationPicker
        localization={LocalizationQuery?.data}
        constatationId={constatationId}
      />
    </>
  );
}
