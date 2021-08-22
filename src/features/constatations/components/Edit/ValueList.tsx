import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";
import Field from "./Field";

export function ValueList({ values }) {
  const list = values.map((value) => <Field key={value.id} field={value} />);

  return <View>{list}</View>;
}
