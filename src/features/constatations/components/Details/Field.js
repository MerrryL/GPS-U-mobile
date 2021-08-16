import React from "react";

import { View } from "react-native";
import { Text } from "react-native-elements";

export default function Field(field) {
  const Field = (field) => {
    console.log("in Field");
    console.log(field);

    return (
      <View>
        <Text>Nom: {field.field}</Text>
        <Text>Type: {field.field.field_type.type}</Text>
        <Text>Valeur: {field.field.value}</Text>
      </View>
    );
  };

  return <>{Field(field)}</>;
}
