import React from "react";

import { Observation } from "@/types";
import { useNavigation } from "@react-navigation/native";

import {
  Card,
  Image,
  Button,
  Icon,
  Divider,
  Text,
} from "react-native-elements";

import { View } from "react-native";

type observationCardProps = {
  observation: Observation;
};

export function ObservationCard({ observation }: observationCardProps) {
  const navigation = useNavigation();

  //console.log(observation);
  return (
    <Card>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title="Edit"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Edition", { observationId: observation?.id })
          }
        />
        <Button
          title="Détails"
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate("Details", { observationId: observation?.id })
          }
        />
      </View>
      <Text>
        Article du R.G.P.
      </Text>
      <Text>
        n°123
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aliquid facilis sint necessitatibus repellat expedita laborum sed nesciunt eligendi enim maiores cumque ipsa, obcaecati fuga quas quidem repudiandae beatae minima?
        </Text>

    </Card>
  );
}
