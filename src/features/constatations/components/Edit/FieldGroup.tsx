import React from "react";

import { FlatList, View } from "react-native";
import {
  Card,
  Button,
  Icon,
  ThemeProvider,
  Text,
  Input,
} from "react-native-elements";

import { ValueList } from "./ValueList";

export function FieldGroup({ field_group }) {
  const group = field_group.item;

  return (
    <View>
      <Text>
        Groupe: {group.name} - {group.type}
      </Text>
      {group.constatation_field_values &&
        Object.keys(group.constatation_field_values).length > 0 && (
          <ValueList values={group.constatation_field_values} />
        )}
    </View>
  );
}
